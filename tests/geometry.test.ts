import { describe, expect, it } from 'vitest'
import { borderPoint, edgePoints, labelRect, midpoint, rectsOverlap, segmentHitsRect, type Rect } from '../src/lib/geometry.ts'

describe('diagram geometry', () => {
  const a: Rect = { x: 0, y: 0, w: 100, h: 50 }
  const b: Rect = { x: 300, y: 0, w: 100, h: 50 }

  it('anchors edges on the facing borders with a small gap', () => {
    const [x, y] = borderPoint(a, [350, 25], 0)
    expect(x).toBeCloseTo(100)
    expect(y).toBeCloseTo(25)
    const pts = edgePoints({ from: 'a', to: 'b' }, new Map([['a', a], ['b', b]]))!
    expect(pts[0][0]).toBeCloseTo(102)
    expect(pts[1][0]).toBeCloseTo(296)
  })

  it('routes through via points and finds the midpoint by length', () => {
    const pts = edgePoints({ from: 'a', to: 'b', via: [[50, 200], [350, 200]] }, new Map([['a', a], ['b', b]]))!
    expect(pts).toHaveLength(4)
    const [mx, my] = midpoint(pts)
    expect(Math.abs(mx - 200)).toBeLessThan(3)
    expect(my).toBeCloseTo(200)
  })

  it('detects segments crossing a rectangle but not ones passing beside it', () => {
    const box: Rect = { x: 150, y: 0, w: 50, h: 50 }
    expect(segmentHitsRect([100, 25], [300, 25], box)).toBe(true)
    expect(segmentHitsRect([100, 80], [300, 80], box)).toBe(false)
    expect(segmentHitsRect([100, 25], [140, 25], box)).toBe(false)
  })

  it('sizes label pills like the renderer and tests overlap', () => {
    const r = labelRect('Entra ID', [200, 25])
    expect(r.w).toBeCloseTo(8 * 6.4 + 14)
    expect(r.h).toBe(20)
    expect(rectsOverlap(r, b)).toBe(false)
    expect(rectsOverlap(labelRect('a very very long label here', [250, 25]), b)).toBe(true)
  })
})
