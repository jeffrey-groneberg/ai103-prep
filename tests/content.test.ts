import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { Ajv2020 } from 'ajv/dist/2020.js'
import type { CaseFile, QuestionFile } from '../src/lib/types.ts'
import { validateContent } from '../src/content/validate.ts'
import { cases, lessons, questions } from '../src/content/index.ts'
import { hasSourceTitle, sourceLabel } from '../src/content/sources.ts'
import questionSchema from '../src/content/schema/question-file.schema.json'
import caseSchema from '../src/content/schema/case-file.schema.json'
import modelLifecycle from '../src/content/model-lifecycle.json'
import type { ModelLifecycle } from '../src/content/model-currency.ts'

const dir = join(process.cwd(), 'src', 'content')
const questionFiles = readdirSync(join(dir, 'questions'))
  .filter((f) => f.endsWith('.json'))
  .map((f) => ({ file: f, data: JSON.parse(readFileSync(join(dir, 'questions', f), 'utf8')) as QuestionFile }))
const caseFiles = readdirSync(join(dir, 'cases'))
  .filter((f) => f.endsWith('.json'))
  .map((f) => ({ file: f, data: JSON.parse(readFileSync(join(dir, 'cases', f), 'utf8')) as CaseFile }))

describe('real content', () => {
  it('conforms to the JSON schemas', () => {
    const ajv = new Ajv2020({ allErrors: true, strict: false })
    const checkQ = ajv.compile(questionSchema)
    const checkC = ajv.compile(caseSchema)
    const problems: string[] = []
    for (const { file, data } of questionFiles) if (!checkQ(data)) problems.push(`${file}: ${ajv.errorsText(checkQ.errors)}`)
    for (const { file, data } of caseFiles) if (!checkC(data)) problems.push(`${file}: ${ajv.errorsText(checkC.errors)}`)
    expect(problems).toEqual([])
  })

  it('passes the content validator including full coverage', () => {
    const report = validateContent(
      {
        files: questionFiles,
        cases: caseFiles.flatMap((c) => c.data.cases),
        lessons: lessons.map((lesson) => ({ file: `${lesson.module}.ts`, lesson })),
      },
      { today: '2026-11-09', modelLifecycle: modelLifecycle as ModelLifecycle },
    )
    expect(report.errors.map((e) => `${e.where}: ${e.message}`)).toEqual([])
  })

  it('has at least 200 original questions weighted like the exam', () => {
    expect(questions.length).toBeGreaterThanOrEqual(200)
    const share = (d: string) => (questions.filter((q) => q.domain === d).length / questions.length) * 100
    expect(share('D1')).toBeGreaterThanOrEqual(22)
    expect(share('D2')).toBeGreaterThanOrEqual(27)
    for (const d of ['D3', 'D4', 'D5']) expect(share(d)).toBeGreaterThanOrEqual(8)
  })

  it('mixes all question types and includes case studies', () => {
    const types = new Set(questions.map((q) => q.type))
    expect([...types].sort()).toEqual(['code', 'match', 'multi', 'order', 'single'])
    expect(cases.length).toBeGreaterThanOrEqual(3)
  })

  it('loads one lesson per module through the app loader', () => {
    expect(lessons).toHaveLength(31)
  })
})

describe('source labels', () => {
  it('uses the fetched page title with its doc set', () => {
    expect(sourceLabel('https://learn.microsoft.com/en-us/agent-framework/concepts/agents/conversations/session?pivots=programming-language-python')).toBe('Agent Framework: Session')
    expect(sourceLabel('https://learn.microsoft.com/en-us/azure/foundry/what-is-foundry')).toMatch(/^What is Microsoft Foundry/)
  })

  it('falls back to the URL slug for unknown pages', () => {
    expect(sourceLabel('https://learn.microsoft.com/en-us/azure/search/some-new-page')).toBe('AI Search: some new page')
  })

  it('has a title for every cited question source', () => {
    const missing = questions.flatMap((q) => q.sources).filter((u) => !hasSourceTitle(u))
    expect(missing).toEqual([])
  })
})
