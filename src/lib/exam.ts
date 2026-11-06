import type { CaseStudy, DomainId, Question } from './types.ts'
import { createRng, shuffle } from './random.ts'
import { scoreQuestion, type Answer } from './scoring.ts'

export const DOMAIN_IDS: DomainId[] = ['D1', 'D2', 'D3', 'D4', 'D5']

/** Official weight ranges (percent) from the study guide, skills measured as of April 16, 2026. */
export const DOMAIN_WEIGHTS: Record<DomainId, [number, number]> = {
  D1: [25, 30],
  D2: [30, 35],
  D3: [10, 15],
  D4: [10, 15],
  D5: [10, 15],
}

/** Associate role-based exams without labs: 100 minutes exam time; most exams have 40–60 questions. */
export const EXAM_DEFAULTS = { questions: 50, minutes: 100, passPercent: 70 } as const

/**
 * Splits `total` questions across domains proportionally to the midpoint of each weight
 * range, using the largest-remainder method so the quotas always sum to `total`.
 */
export function domainQuotas(total: number, weights: Record<DomainId, [number, number]> = DOMAIN_WEIGHTS): Record<DomainId, number> {
  const mids = DOMAIN_IDS.map((d) => (weights[d][0] + weights[d][1]) / 2)
  const sum = mids.reduce((a, b) => a + b, 0)
  const raw = mids.map((m) => (m / sum) * total)
  const floors = raw.map(Math.floor)
  let remaining = total - floors.reduce((a, b) => a + b, 0)
  const order = raw
    .map((r, i) => ({ i, frac: r - Math.floor(r), mid: mids[i] }))
    .sort((a, b) => b.frac - a.frac || b.mid - a.mid || a.i - b.i)
  for (const { i } of order) {
    if (remaining <= 0) break
    floors[i] += 1
    remaining -= 1
  }
  return Object.fromEntries(DOMAIN_IDS.map((d, i) => [d, floors[i]])) as Record<DomainId, number>
}

export interface ExamPlan {
  seed: number
  questionIds: string[]
  /** Case study questions are appended as their own section, like on the real exam. */
  caseId: string | null
  caseQuestionIds: string[]
  minutes: number
  quotas: Record<DomainId, number>
}

export interface BuildExamOptions {
  total?: number
  minutes?: number
  seed?: number
  includeCase?: boolean
}

/**
 * Builds an exam weighted by domain. Picks one case study (if any has ≥ 3 questions),
 * then fills each domain's remaining quota round-robin across skills-outline bullets so a
 * simulation samples the breadth of the outline instead of clustering on one topic.
 */
export function buildExam(questions: Question[], cases: CaseStudy[], options: BuildExamOptions = {}): ExamPlan {
  const total = Math.min(options.total ?? EXAM_DEFAULTS.questions, questions.length)
  const seed = options.seed ?? Math.floor(Math.random() * 2 ** 31)
  const rng = createRng(seed)
  const quotas = domainQuotas(total)
  const remaining = { ...quotas }

  let caseId: string | null = null
  let caseQuestionIds: string[] = []
  if (options.includeCase !== false) {
    const eligible = cases.filter((c) => questions.filter((q) => q.caseId === c.id).length >= 3)
    if (eligible.length) {
      const chosen = eligible[Math.floor(rng() * eligible.length)]
      const caseQs = questions.filter((q) => q.caseId === chosen.id).slice(0, Math.max(3, Math.floor(total / 8)))
      caseId = chosen.id
      caseQuestionIds = caseQs.map((q) => q.id)
      for (const q of caseQs) remaining[q.domain] = Math.max(0, remaining[q.domain] - 1)
    }
  }

  const used = new Set(caseQuestionIds)
  const picked: string[] = []
  for (const d of DOMAIN_IDS) {
    const pool = shuffle(
      questions.filter((q) => q.domain === d && !q.caseId && !used.has(q.id)),
      rng,
    )
    const byBullet = new Map<string, Question[]>()
    for (const q of pool) byBullet.set(q.skill, [...(byBullet.get(q.skill) ?? []), q])
    const buckets = shuffle([...byBullet.values()], rng)
    let need = remaining[d]
    while (need > 0 && buckets.some((b) => b.length)) {
      for (const b of buckets) {
        if (need <= 0) break
        const q = b.shift()
        if (q) {
          picked.push(q.id)
          used.add(q.id)
          need--
        }
      }
    }
    remaining[d] = need
  }

  // Domains without enough questions: top up from any unused non-case question.
  let shortfall = DOMAIN_IDS.reduce((a, d) => a + remaining[d], 0)
  if (shortfall > 0) {
    const extra = shuffle(questions.filter((q) => !used.has(q.id) && !q.caseId), rng)
    for (const q of extra) {
      if (shortfall <= 0) break
      picked.push(q.id)
      used.add(q.id)
      shortfall--
    }
  }

  return {
    seed,
    questionIds: shuffle(picked, rng),
    caseId,
    caseQuestionIds,
    minutes: options.minutes ?? EXAM_DEFAULTS.minutes,
    quotas,
  }
}

export interface DomainResult {
  domain: DomainId
  earned: number
  possible: number
  percent: number
}

export interface ExamSummary {
  earned: number
  possible: number
  percent: number
  passed: boolean
  correctCount: number
  byDomain: DomainResult[]
}

export function summarizeExam(
  questionIds: string[],
  questionById: Map<string, Question>,
  answers: Record<string, Answer | undefined>,
  passPercent: number = EXAM_DEFAULTS.passPercent,
): ExamSummary {
  const byDomain = new Map<DomainId, { earned: number; possible: number }>(DOMAIN_IDS.map((d) => [d, { earned: 0, possible: 0 }]))
  let earned = 0
  let correctCount = 0
  for (const id of questionIds) {
    const q = questionById.get(id)
    if (!q) continue
    const r = scoreQuestion(q, answers[id])
    earned += r.score
    if (r.correct) correctCount++
    const slot = byDomain.get(q.domain)!
    slot.earned += r.score
    slot.possible += 1
  }
  const possible = questionIds.filter((id) => questionById.has(id)).length
  const percent = possible ? Math.round((earned / possible) * 1000) / 10 : 0
  return {
    earned: Math.round(earned * 100) / 100,
    possible,
    percent,
    passed: percent >= passPercent,
    correctCount,
    byDomain: DOMAIN_IDS.map((d) => {
      const s = byDomain.get(d)!
      return { domain: d, earned: Math.round(s.earned * 100) / 100, possible: s.possible, percent: s.possible ? Math.round((s.earned / s.possible) * 100) : 0 }
    }),
  }
}

export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const mm = String(m).padStart(2, '0')
  const ss = String(sec).padStart(2, '0')
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}
