import { describe, expect, it } from 'vitest'
import { lessons } from '../src/content/index.ts'

// AI-103 shows an official Azure Architecture Icon on every diagram node (the engine makes icons optional).
describe('AI-103 diagrams', () => {
  it('put an official Azure icon on every node', () => {
    const missing = lessons.flatMap((l) => l.diagrams.flatMap((d) => d.nodes.filter((n) => !n.icon).map((n) => `${l.module}: ${d.id}/${n.id}`)))
    expect(missing).toEqual([])
  })
})
