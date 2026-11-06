import type { DiagramEdge } from './types.ts'

export interface Rect {
  x: number
  y: number
  w: number
  h: number
}
export type Pt = [number, number]

export function center(r: Rect): Pt {
  return [r.x + r.w / 2, r.y + r.h / 2]
}

/** Point where the ray from the rect's center toward `p` leaves the rect, pushed out by `gap`. */
export function borderPoint(r: Rect, p: Pt, gap = 3): Pt {
  const [cx, cy] = center(r)
  const dx = p[0] - cx
  const dy = p[1] - cy
  if (dx === 0 && dy === 0) return [cx, cy]
  const t = Math.min(dx !== 0 ? r.w / 2 / Math.abs(dx) : Infinity, dy !== 0 ? r.h / 2 / Math.abs(dy) : Infinity)
  const len = Math.hypot(dx, dy)
  return [cx + dx * t + (dx / len) * gap, cy + dy * t + (dy / len) * gap]
}

/** Polyline of an edge exactly as the renderer draws it. */
export function edgePoints(e: Pick<DiagramEdge, 'from' | 'to' | 'via'>, rects: Map<string, Rect>): Pt[] | null {
  const a = rects.get(e.from)
  const b = rects.get(e.to)
  if (!a || !b) return null
  const via = (e.via ?? []) as Pt[]
  const first = via[0] ?? center(b)
  const last = via[via.length - 1] ?? center(a)
  return [borderPoint(a, first, 2), ...via, borderPoint(b, last, 4)]
}

export function midpoint(pts: Pt[]): Pt {
  let total = 0
  for (let i = 1; i < pts.length; i++) total += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])
  let half = total / 2
  for (let i = 1; i < pts.length; i++) {
    const seg = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])
    if (half <= seg) {
      const t = seg ? half / seg : 0
      return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t]
    }
    half -= seg
  }
  return pts[0]
}

/** Box of an edge label pill centered on the edge midpoint (matches the renderer). */
export function labelRect(text: string, mid: Pt): Rect {
  const w = Math.max(28, text.length * 6.4 + 14)
  return { x: mid[0] - w / 2, y: mid[1] - 10, w, h: 20 }
}

export function rectsOverlap(a: Rect, b: Rect, pad = 0): boolean {
  return a.x < b.x + b.w + pad && b.x < a.x + a.w + pad && a.y < b.y + b.h + pad && b.y < a.y + a.h + pad
}

/** Liang–Barsky clip test: does segment p→q pass through the (shrunk) rectangle? */
export function segmentHitsRect(p: Pt, q: Pt, r: Rect, inset = 2): boolean {
  const x0 = r.x + inset
  const y0 = r.y + inset
  const x1 = r.x + r.w - inset
  const y1 = r.y + r.h - inset
  if (x1 <= x0 || y1 <= y0) return false
  const dx = q[0] - p[0]
  const dy = q[1] - p[1]
  let t0 = 0
  let t1 = 1
  const clip = (pp: number, qq: number) => {
    if (pp === 0) return qq >= 0
    const t = qq / pp
    if (pp < 0) {
      if (t > t1) return false
      if (t > t0) t0 = t
    } else {
      if (t < t0) return false
      if (t < t1) t1 = t
    }
    return true
  }
  return clip(-dx, p[0] - x0) && clip(dx, x1 - p[0]) && clip(-dy, p[1] - y0) && clip(dy, y1 - p[1]) && t0 < t1
}
