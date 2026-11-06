import type { CardState } from './srs.ts'
import type { DomainId, Question } from './types.ts'
import { shuffle } from './random.ts'
import { questionById, questions } from '../content/index.ts'
import { bulletById } from '../content/domains.ts'

/** Domains a module touches, derived from its skills-outline bullets. */
export function moduleDomains(skills: string[]): DomainId[] {
  const set = new Set<DomainId>()
  for (const s of skills) {
    const b = bulletById.get(s)
    if (b) set.add(b.domain as DomainId)
  }
  return [...set].sort()
}

/**
 * Builds a practice list from URL parameters:
 * ids, modul, skill, domain, schwierigkeit, typ, falsch=1, neu=1, runde=N.
 */
export function selectQuestions(params: URLSearchParams, cards: Record<string, CardState | undefined>): Question[] {
  const list = (k: string) => (params.get(k) ?? '').split(',').filter(Boolean)
  const ids = list('ids')
  if (ids.length) return ids.map((id) => questionById.get(id)).filter((q): q is Question => Boolean(q))
  let pool = questions
  const mods = list('modul')
  if (mods.length) pool = pool.filter((q) => mods.includes(q.module))
  const skills = list('skill')
  if (skills.length) pool = pool.filter((q) => skills.includes(q.skill) || (q.skills ?? []).some((s) => skills.includes(s)))
  const doms = list('domain')
  if (doms.length) pool = pool.filter((q) => doms.includes(q.domain))
  const diffs = list('schwierigkeit').map(Number)
  if (diffs.length) pool = pool.filter((q) => diffs.includes(q.difficulty))
  const types = list('typ')
  if (types.length) pool = pool.filter((q) => types.includes(q.type))
  if (params.get('falsch') === '1') pool = pool.filter((q) => cards[q.id] && cards[q.id]!.lastScore < 1)
  if (params.get('neu') === '1') {
    const fresh = pool.filter((q) => !cards[q.id])
    if (fresh.length) pool = fresh
  }
  const n = Number(params.get('runde')) || pool.length
  // Keep a module's own order when practicing one module; otherwise mix.
  const ordered = mods.length === 1 ? pool : shuffle(pool)
  return ordered.slice(0, n)
}
