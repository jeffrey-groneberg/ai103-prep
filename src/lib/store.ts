import { useSyncExternalStore } from 'react'
import type { Lang } from './types.ts'
import type { Answer } from './scoring.ts'
import { applyResult, type CardState } from './srs.ts'
import type { ExamSummary } from './exam.ts'

export interface ExamSession {
  id: string
  startedAt: string
  /** Epoch ms when the timer runs out. */
  endsAt: number
  questionIds: string[]
  caseId: string | null
  caseQuestionIds: string[]
  answers: Record<string, Answer>
  marked: string[]
  current: number
  minutes: number
}

export interface ExamRecord {
  id: string
  finishedAt: string
  minutesUsed: number
  minutes: number
  questionIds: string[]
  answers: Record<string, Answer>
  summary: ExamSummary
}

export interface ProgressState {
  version: 1
  lang: Lang
  cards: Record<string, CardState>
  lessonsRead: Record<string, string>
  exams: ExamRecord[]
  activeExam: ExamSession | null
}

const KEY = 'ai103-prep:v1'

export function initialState(): ProgressState {
  return { version: 1, lang: 'de', cards: {}, lessonsRead: {}, exams: [], activeExam: null }
}

function load(): ProgressState {
  try {
    const raw = globalThis.localStorage?.getItem(KEY)
    if (!raw) return initialState()
    const parsed = JSON.parse(raw) as Partial<ProgressState>
    if (parsed.version !== 1) return initialState()
    return { ...initialState(), ...parsed }
  } catch {
    return initialState()
  }
}

let state: ProgressState = load()
const listeners = new Set<() => void>()

function persist() {
  try {
    globalThis.localStorage?.setItem(KEY, JSON.stringify(state))
  } catch {
    // Storage full or blocked (private mode): keep working in memory.
  }
}

function set(next: ProgressState) {
  state = next
  persist()
  listeners.forEach((l) => l())
}

export const store = {
  get: () => state,
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  setLang(lang: Lang) {
    set({ ...state, lang })
  },
  recordAnswer(questionId: string, score: number, now: Date = new Date()) {
    set({ ...state, cards: { ...state.cards, [questionId]: applyResult(state.cards[questionId], score, now) } })
  },
  markLessonRead(moduleId: string, read = true) {
    const lessonsRead = { ...state.lessonsRead }
    if (read) lessonsRead[moduleId] = new Date().toISOString()
    else delete lessonsRead[moduleId]
    set({ ...state, lessonsRead })
  },
  startExam(session: ExamSession) {
    set({ ...state, activeExam: session })
  },
  updateExam(patch: Partial<ExamSession>) {
    if (!state.activeExam) return
    set({ ...state, activeExam: { ...state.activeExam, ...patch } })
  },
  abandonExam() {
    set({ ...state, activeExam: null })
  },
  finishExam(record: ExamRecord, scores: Record<string, number>, now: Date = new Date()) {
    const cards = { ...state.cards }
    for (const [id, score] of Object.entries(scores)) cards[id] = applyResult(cards[id], score, now)
    set({ ...state, cards, activeExam: null, exams: [record, ...state.exams].slice(0, 30) })
  },
  reset() {
    set({ ...initialState(), lang: state.lang })
  },
  exportJson(): string {
    return JSON.stringify(state, null, 2)
  },
  importJson(json: string): boolean {
    try {
      const parsed = JSON.parse(json) as ProgressState
      if (parsed.version !== 1 || typeof parsed.cards !== 'object') return false
      set({ ...initialState(), ...parsed, activeExam: null })
      return true
    } catch {
      return false
    }
  },
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(store.subscribe, store.get, store.get)
}

export function useLang(): Lang {
  return useProgress().lang
}
