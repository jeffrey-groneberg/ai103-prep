import { readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { lessons } from '../src/content/index.ts'
import { DIAGRAM_ICONS, type DiagramIconId } from '../src/content/diagram-icons.ts'

const dir = new URL('../src/assets/azure-icons/', import.meta.url)
const files = readdirSync(dir).filter((f) => f.endsWith('.svg'))
const ids = Object.keys(DIAGRAM_ICONS) as DiagramIconId[]

describe('official diagram icons', () => {
  it('ships exactly one SVG per registered icon id', () => {
    expect(files.map((f) => f.replace(/\.svg$/, '')).sort()).toEqual([...ids].sort())
    for (const f of files) expect(readFileSync(new URL(f, dir), 'utf8')).toMatch(/^\s*(<\?xml[^>]*>\s*)?<svg[\s>]/)
  })

  it('lists every icon with its source file in NOTICE.md', () => {
    const notice = readFileSync(new URL('NOTICE.md', dir), 'utf8')
    for (const id of ids) expect(notice).toContain(DIAGRAM_ICONS[id].source.split('/').pop()!)
  })

  it('uses every registered icon in at least one diagram', () => {
    const used = new Set(lessons.flatMap((l) => l.diagrams.flatMap((d) => d.nodes.map((n) => n.icon))))
    expect(ids.filter((id) => !used.has(id))).toEqual([])
  })
})
