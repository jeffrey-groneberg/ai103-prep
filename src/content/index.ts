import type { CaseFile, CaseStudy, Lesson, Question, QuestionFile } from '../lib/types.ts'
import { modules, learningPaths } from './course.ts'

const questionFiles = import.meta.glob<QuestionFile>('./questions/*.json', { eager: true, import: 'default' })
const caseFiles = import.meta.glob<CaseFile>('./cases/*.json', { eager: true, import: 'default' })
const lessonFiles = import.meta.glob<{ lesson: Lesson }>('./lessons/*.ts', { eager: true })

const moduleOrder = new Map(learningPaths.flatMap((p) => p.modules).map((id, i) => [id, i]))

export const questions: Question[] = Object.values(questionFiles)
  .flatMap((f) => f.questions)
  .sort((a, b) => (moduleOrder.get(a.module) ?? 99) - (moduleOrder.get(b.module) ?? 99) || a.id.localeCompare(b.id))

export const questionById = new Map(questions.map((q) => [q.id, q]))

export const cases: CaseStudy[] = Object.values(caseFiles).flatMap((f) => f.cases)
export const caseById = new Map(cases.map((c) => [c.id, c]))

export const lessons: Lesson[] = Object.entries(lessonFiles)
  .filter(([path]) => !path.split('/').pop()!.startsWith('_'))
  .map(([, mod]) => mod.lesson)
  .filter(Boolean)
export const lessonByModule = new Map(lessons.map((l) => [l.module, l]))

/** Modules in official course order (learning path order). */
export const orderedModules = learningPaths.flatMap((p) => p.modules).map((id) => modules.find((m) => m.id === id)!)

export function questionsForModule(moduleId: string): Question[] {
  return questions.filter((q) => q.module === moduleId)
}

export function questionsForBullet(bulletId: string): Question[] {
  return questions.filter((q) => q.skill === bulletId)
}
