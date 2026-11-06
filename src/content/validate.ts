import type {
  CaseStudy,
  CourseModule,
  Diagram,
  L10n,
  Lesson,
  Question,
  QuestionFile,
  Text,
} from '../lib/types.ts'
import { edgePoints, labelRect, midpoint, rectsOverlap, segmentHitsRect, type Rect } from '../lib/geometry.ts'
import { allBullets, bulletById } from './domains.ts'
import { moduleById, modules } from './course.ts'
import { findOutdatedModels, scanText, type ModelLifecycle } from './model-currency.ts'

export interface Issue {
  level: 'error' | 'warning'
  where: string
  message: string
}

export interface CoverageRow {
  bullet: string
  domain: string
  text: string
  modules: string[]
  lessons: string[]
  primary: number
  secondary: number
}

export interface ValidationReport {
  issues: Issue[]
  errors: Issue[]
  warnings: Issue[]
  coverage: CoverageRow[]
  moduleCounts: Record<string, number>
  domainCounts: Record<string, number>
  typeCounts: Record<string, number>
  difficultyCounts: Record<string, number>
}

export interface ContentBundle {
  files: Array<{ file: string; data: QuestionFile }>
  cases: CaseStudy[]
  lessons: Array<{ file: string; lesson: Lesson }>
}

export interface ValidateOptions {
  /** Restrict per-item checks to these module ids and skip global coverage checks. */
  only?: string[]
  /** ISO date used to reject lastVerified dates in the future. */
  today?: string
  minPerBullet?: number
  minPerModule?: number
  /** Snapshot of Learn's model retirement schedule; enables the model-currency check. */
  modelLifecycle?: ModelLifecycle
}

const LEARN_URL = /^https:\/\/learn\.microsoft\.com\/(?:[a-z]{2}-[a-z]{2}\/)?[a-z]/
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

/**
 * Names that were renamed or retired. They may only appear when the text explicitly
 * frames them as former names (e.g. "formerly", "classic").
 */
export const LEGACY_NAMES: Array<{ pattern: RegExp; current: string }> = [
  { pattern: /\bAzure AI Studio\b/, current: 'Microsoft Foundry' },
  { pattern: /\bAzure OpenAI Studio\b/, current: 'Microsoft Foundry portal' },
  { pattern: /\bAzure AI Foundry\b/, current: 'Microsoft Foundry' },
  { pattern: /\bAI Foundry Agent Service\b/, current: 'Foundry Agent Service' },
  { pattern: /\bCognitive Services\b(?!(?: [A-Z][A-Za-z]+)* (?:User|Contributor|Reader|Writer|Owner)\b)/, current: 'Foundry Tools' },
  { pattern: /\bAzure AI services\b/, current: 'Foundry Tools' },
  { pattern: /\bForm Recognizer\b/, current: 'Azure Document Intelligence in Foundry Tools' },
  { pattern: /\bLUIS\b|\bLanguage Understanding \(LUIS\)/, current: 'conversational language understanding' },
  { pattern: /\bQnA Maker\b/, current: 'question answering' },
  { pattern: /\bAssistants API\b/, current: 'Responses API (Agents v2)' },
  { pattern: /\bprompt flow\b/i, current: 'workflows / Agent Framework' },
  { pattern: /\bAzure AI (?:User|Owner|Account Owner|Project Manager)\b/, current: 'Foundry User / Foundry Owner / Foundry Account Owner / Foundry Project Manager' },
]
const LEGACY_FRAMING = /formerly|previously|renamed|retired|deprecated|classic|legacy|ehemals|früher|umbenannt|eingestellt|veraltet|Vorgänger|predecessor/i

function textOf(t: Text | undefined): string[] {
  if (t === undefined) return []
  return typeof t === 'string' ? [t] : [t.en, t.de]
}

function checkL10n(issues: Issue[], where: string, field: string, v: L10n | undefined, opts?: { minLen?: number }) {
  if (!v || typeof v !== 'object') {
    issues.push({ level: 'error', where, message: `${field}: missing localized text` })
    return
  }
  const min = opts?.minLen ?? 2
  for (const lang of ['en', 'de'] as const) {
    const s = v[lang]
    if (typeof s !== 'string' || s.trim().length < min) {
      issues.push({ level: 'error', where, message: `${field}.${lang}: missing or too short` })
    }
  }
  if (typeof v.en === 'string' && typeof v.de === 'string' && v.en.trim() === v.de.trim()) {
    const prose = v.en.replace(/`[^`]*`/g, '').replace(/[^A-Za-zÄÖÜäöüß ]/g, '').trim()
    if (prose.split(/\s+/).filter((w) => w.length > 3).length >= 6) {
      issues.push({ level: 'warning', where, message: `${field}: German text identical to English (untranslated?)` })
    }
  }
}

function checkLegacy(issues: Issue[], where: string, strings: string[]) {
  for (const s of strings) {
    for (const { pattern, current } of LEGACY_NAMES) {
      if (pattern.test(s) && !LEGACY_FRAMING.test(s)) {
        issues.push({ level: 'error', where, message: `outdated name ${pattern} — use "${current}" (or frame it as a former name)` })
      }
    }
  }
}

function checkModels(issues: Issue[], where: string, value: unknown, lifecycle: ModelLifecycle | undefined, today: string) {
  if (!lifecycle) return
  for (const f of findOutdatedModels(scanText(value), lifecycle, today)) {
    issues.push({ level: 'error', where, message: `${f.status} model "${f.model}" (${f.detail}) — use a current model, or frame it as retired/deprecated` })
  }
}

function checkSources(issues: Issue[], where: string, urls: string[] | undefined) {
  if (!Array.isArray(urls) || urls.length === 0) {
    issues.push({ level: 'error', where, message: 'needs at least one learn.microsoft.com source URL' })
    return
  }
  for (const u of urls) {
    if (!LEARN_URL.test(u)) issues.push({ level: 'error', where, message: `source must be a learn.microsoft.com documentation URL: ${u}` })
  }
}

function uniqueIds(issues: Issue[], where: string, label: string, ids: string[]) {
  const seen = new Set<string>()
  for (const id of ids) {
    if (seen.has(id)) issues.push({ level: 'error', where, message: `duplicate ${label} id "${id}"` })
    seen.add(id)
  }
}

function questionStrings(q: Question): string[] {
  const out = [...textOf(q.stem), ...textOf(q.explanation)]
  if (q.type === 'single' || q.type === 'multi') q.options.forEach((o) => out.push(...textOf(o.text), ...textOf(o.why)))
  if (q.type === 'order') q.items.forEach((o) => out.push(...textOf(o.text), ...textOf(o.why)))
  if (q.type === 'match') {
    q.prompts.forEach((p) => out.push(...textOf(p.prompt), ...textOf(p.why)))
    q.targets.forEach((t) => out.push(...textOf(t.text)))
  }
  if (q.type === 'code') q.blanks.forEach((b) => b.options.forEach((o) => out.push(...textOf(o.why))))
  return out
}

export function validateQuestion(q: Question, issues: Issue[], ctx: { file: string; fileModule: string; caseIds: Set<string>; today: string }) {
  const where = `${ctx.file} › ${q.id ?? '(no id)'}`
  if (!q.id || !/^q-[a-z0-9-]+$/.test(q.id)) issues.push({ level: 'error', where, message: 'id must match ^q-[a-z0-9-]+$' })
  if (q.module !== ctx.fileModule) issues.push({ level: 'error', where, message: `module "${q.module}" differs from file module "${ctx.fileModule}"` })
  if (!moduleById.has(q.module)) issues.push({ level: 'error', where, message: `unknown module "${q.module}"` })
  const bullet = bulletById.get(q.skill)
  if (!bullet) issues.push({ level: 'error', where, message: `unknown skill bullet "${q.skill}"` })
  else if (bullet.domain !== q.domain) issues.push({ level: 'error', where, message: `skill ${q.skill} belongs to ${bullet.domain}, not ${q.domain}` })
  for (const s of q.skills ?? []) if (!bulletById.has(s)) issues.push({ level: 'error', where, message: `unknown secondary skill "${s}"` })
  if (![1, 2, 3].includes(q.difficulty)) issues.push({ level: 'error', where, message: 'difficulty must be 1, 2 or 3' })
  if (q.caseId && !ctx.caseIds.has(q.caseId)) issues.push({ level: 'error', where, message: `unknown caseId "${q.caseId}"` })
  checkL10n(issues, where, 'stem', q.stem, { minLen: 15 })
  checkL10n(issues, where, 'explanation', q.explanation, { minLen: 15 })
  checkSources(issues, where, q.sources)
  if (!ISO_DATE.test(q.lastVerified ?? '')) issues.push({ level: 'error', where, message: 'lastVerified must be YYYY-MM-DD' })
  else if (q.lastVerified > ctx.today) issues.push({ level: 'error', where, message: `lastVerified ${q.lastVerified} is in the future` })

  switch (q.type) {
    case 'single':
    case 'multi': {
      const opts = q.options ?? []
      uniqueIds(issues, where, 'option', opts.map((o) => o.id))
      const correct = opts.filter((o) => o.correct === true).length
      if (q.type === 'single') {
        if (opts.length < 3 || opts.length > 6) issues.push({ level: 'error', where, message: 'single choice needs 3–6 options' })
        if (correct !== 1) issues.push({ level: 'error', where, message: `single choice needs exactly one correct option (has ${correct})` })
      } else {
        if (opts.length < 4 || opts.length > 6) issues.push({ level: 'error', where, message: 'multiple select needs 4–6 options' })
        if (correct < 2) issues.push({ level: 'error', where, message: `multiple select needs at least two correct options (has ${correct})` })
        if (correct >= opts.length) issues.push({ level: 'error', where, message: 'multiple select needs at least one incorrect option' })
      }
      opts.forEach((o) => {
        checkL10n(issues, where, `option ${o.id}.text`, o.text)
        checkL10n(issues, where, `option ${o.id}.why`, o.why, { minLen: 10 })
      })
      break
    }
    case 'order': {
      const items = q.items ?? []
      if (items.length < 3 || items.length > 7) issues.push({ level: 'error', where, message: 'ordering needs 3–7 items' })
      uniqueIds(issues, where, 'item', items.map((o) => o.id))
      items.forEach((o) => {
        checkL10n(issues, where, `item ${o.id}.text`, o.text)
        checkL10n(issues, where, `item ${o.id}.why`, o.why, { minLen: 10 })
      })
      break
    }
    case 'match': {
      const prompts = q.prompts ?? []
      const targets = q.targets ?? []
      if (prompts.length < 2 || prompts.length > 6) issues.push({ level: 'error', where, message: 'matching needs 2–6 prompts' })
      if (targets.length < 2) issues.push({ level: 'error', where, message: 'matching needs at least two targets' })
      uniqueIds(issues, where, 'prompt', prompts.map((p) => p.id))
      uniqueIds(issues, where, 'target', targets.map((t) => t.id))
      const targetIds = new Set(targets.map((t) => t.id))
      prompts.forEach((p) => {
        if (!targetIds.has(p.answer)) issues.push({ level: 'error', where, message: `prompt ${p.id} answer "${p.answer}" is not a target` })
        checkL10n(issues, where, `prompt ${p.id}.prompt`, p.prompt)
        checkL10n(issues, where, `prompt ${p.id}.why`, p.why, { minLen: 10 })
      })
      targets.forEach((t) => checkL10n(issues, where, `target ${t.id}.text`, t.text))
      break
    }
    case 'code': {
      const blanks = q.blanks ?? []
      if (blanks.length < 1 || blanks.length > 4) issues.push({ level: 'error', where, message: 'code completion needs 1–4 blanks' })
      uniqueIds(issues, where, 'blank', blanks.map((b) => b.id))
      const placeholders = [...(q.template ?? '').matchAll(/\{\{([a-z0-9]+)\}\}/g)].map((m) => m[1])
      const blankIds = new Set(blanks.map((b) => b.id))
      for (const p of placeholders) if (!blankIds.has(p)) issues.push({ level: 'error', where, message: `template placeholder {{${p}}} has no blank` })
      for (const p of new Set(placeholders)) {
        if (placeholders.filter((x) => x === p).length > 1) issues.push({ level: 'error', where, message: `template uses placeholder {{${p}}} more than once` })
      }
      for (const b of blanks) {
        if (!placeholders.includes(b.id)) issues.push({ level: 'error', where, message: `blank ${b.id} missing from template` })
        const correct = b.options.filter((o) => o.correct === true).length
        if (correct !== 1) issues.push({ level: 'error', where, message: `blank ${b.id} needs exactly one correct option (has ${correct})` })
        if (b.options.length < 3 || b.options.length > 5) issues.push({ level: 'error', where, message: `blank ${b.id} needs 3–5 options` })
        uniqueIds(issues, where, `blank ${b.id} option`, b.options.map((o) => o.id))
        b.options.forEach((o) => {
          if (!o.code?.trim()) issues.push({ level: 'error', where, message: `blank ${b.id} option ${o.id} has no code` })
          checkL10n(issues, where, `blank ${b.id} option ${o.id}.why`, o.why, { minLen: 10 })
        })
      }
      break
    }
    default:
      issues.push({ level: 'error', where, message: `unknown question type "${(q as { type: string }).type}"` })
  }
  checkLegacy(issues, where, questionStrings(q))
}

export function validateDiagram(d: Diagram, issues: Issue[], where: string) {
  const w = `${where} › diagram ${d.id}`
  checkL10n(issues, w, 'title', d.title)
  if (!(d.width > 0 && d.height > 0)) issues.push({ level: 'error', where: w, message: 'width/height must be positive' })
  if ((d.nodes ?? []).length < 2) issues.push({ level: 'error', where: w, message: 'needs at least two nodes' })
  const ids = [...(d.nodes ?? []).map((n) => n.id), ...(d.groups ?? []).map((g) => g.id), ...(d.edges ?? []).map((e) => e.id)]
  uniqueIds(issues, w, 'element', ids)
  const known = new Set(ids)
  const nodeOrGroup = new Set([...(d.nodes ?? []).map((n) => n.id), ...(d.groups ?? []).map((g) => g.id)])
  for (const n of d.nodes ?? []) {
    if (n.x < 0 || n.y < 0 || n.x + n.w > d.width || n.y + n.h > d.height) {
      issues.push({ level: 'error', where: w, message: `node ${n.id} lies outside the ${d.width}×${d.height} canvas` })
    }
    if (n.w < 60 || n.h < 30) issues.push({ level: 'error', where: w, message: `node ${n.id} is too small (min 60×30)` })
    for (const line of textOf(n.label).flatMap((s) => s.split('\n'))) {
      const capacity = Math.floor((n.w - 16 - (n.shape === 'actor' ? 26 : 0)) / 7.4)
      if (line.length > capacity) issues.push({ level: 'error', where: w, message: `node ${n.id} label line "${line}" is too long for width ${n.w} (max ~${capacity} chars)` })
    }
    for (const line of textOf(n.sub).flatMap((s) => s.split('\n'))) {
      const capacity = Math.floor((n.w - 16 - (n.shape === 'actor' ? 26 : 0)) / 6.2)
      if (line.length > capacity) issues.push({ level: 'error', where: w, message: `node ${n.id} sub line "${line}" is too long for width ${n.w} (max ~${capacity} chars)` })
    }
  }
  const nodes = d.nodes ?? []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (rectsOverlap(nodes[i], nodes[j])) issues.push({ level: 'error', where: w, message: `nodes ${nodes[i].id} and ${nodes[j].id} overlap` })
    }
  }
  for (const g of d.groups ?? []) {
    if (g.x < 0 || g.y < 0 || g.x + g.w > d.width || g.y + g.h > d.height) {
      issues.push({ level: 'error', where: w, message: `group ${g.id} lies outside the canvas` })
    }
  }
  for (const e of d.edges ?? []) {
    if (!nodeOrGroup.has(e.from)) issues.push({ level: 'error', where: w, message: `edge ${e.id} starts at unknown node "${e.from}"` })
    if (!nodeOrGroup.has(e.to)) issues.push({ level: 'error', where: w, message: `edge ${e.id} ends at unknown node "${e.to}"` })
  }

  // Geometry exactly as rendered: arrows must not run through other nodes, labels should not sit on nodes.
  const rects = new Map<string, Rect>()
  for (const g of d.groups ?? []) rects.set(g.id, g)
  for (const n of nodes) rects.set(n.id, n)
  for (const e of d.edges ?? []) {
    const pts = edgePoints(e, rects)
    if (!pts) continue
    for (const n of nodes) {
      if (n.id === e.from || n.id === e.to) continue
      for (let i = 1; i < pts.length; i++) {
        if (segmentHitsRect(pts[i - 1], pts[i], n)) {
          issues.push({ level: 'error', where: w, message: `edge ${e.id} (${e.from} → ${e.to}) runs through node ${n.id}; move nodes or add via points` })
          break
        }
      }
    }
    if (e.label) {
      for (const text of new Set(textOf(e.label))) {
        const box = labelRect(text, midpoint(pts))
        const hit = nodes.find((n) => rectsOverlap(box, n))
        if (hit) issues.push({ level: 'warning', where: w, message: `label "${text}" of edge ${e.id} overlaps node ${hit.id}` })
      }
    }
  }
  if ((d.steps ?? []).length < 2) issues.push({ level: 'error', where: w, message: 'needs at least two steps for the step-through' })
  ;(d.steps ?? []).forEach((s, i) => {
    checkL10n(issues, w, `step ${i + 1}.title`, s.title)
    checkL10n(issues, w, `step ${i + 1}.text`, s.text, { minLen: 15 })
    if (!s.focus?.length) issues.push({ level: 'error', where: w, message: `step ${i + 1} has no focus ids` })
    for (const f of s.focus ?? []) if (!known.has(f)) issues.push({ level: 'error', where: w, message: `step ${i + 1} focuses unknown id "${f}"` })
  })
}

export function validateLesson(lesson: Lesson, issues: Issue[], file: string) {
  const where = `${file} › lesson ${lesson.module}`
  if (!moduleById.has(lesson.module)) issues.push({ level: 'error', where, message: `unknown module "${lesson.module}"` })
  checkL10n(issues, where, 'summary', lesson.summary, { minLen: 40 })
  checkL10n(issues, where, 'examFocus', lesson.examFocus, { minLen: 30 })
  if (!lesson.diagrams?.length) issues.push({ level: 'error', where, message: 'needs at least one diagram' })
  uniqueIds(issues, where, 'diagram', (lesson.diagrams ?? []).map((d) => d.id))
  for (const d of lesson.diagrams ?? []) validateDiagram(d, issues, where)
  if ((lesson.concepts ?? []).length < 3) issues.push({ level: 'error', where, message: 'needs at least three concepts' })
  for (const c of lesson.concepts ?? []) {
    if (!c.term?.trim()) issues.push({ level: 'error', where, message: 'concept without term' })
    checkL10n(issues, where, `concept ${c.term}`, c.text, { minLen: 30 })
  }
  if (lesson.comparison) {
    const cols = lesson.comparison.columns.length
    checkL10n(issues, where, 'comparison.title', lesson.comparison.title)
    lesson.comparison.columns.forEach((c, i) => checkL10n(issues, where, `comparison.column ${i + 1}`, c))
    lesson.comparison.rows.forEach((r, i) => {
      if (r.length !== cols) issues.push({ level: 'error', where, message: `comparison row ${i + 1} has ${r.length} cells, expected ${cols}` })
    })
  }
  if (!lesson.code?.length) issues.push({ level: 'error', where, message: 'needs at least one code sample' })
  for (const c of lesson.code ?? []) {
    checkL10n(issues, where, 'code.title', c.title)
    if (!c.code?.trim()) issues.push({ level: 'error', where, message: 'empty code sample' })
    c.notes?.forEach((n, i) => checkL10n(issues, where, `code note ${i + 1}`, n))
  }
  if ((lesson.traps ?? []).length < 2) issues.push({ level: 'error', where, message: 'needs at least two exam traps' })
  lesson.traps?.forEach((t, i) => checkL10n(issues, where, `trap ${i + 1}`, t, { minLen: 20 }))
  if ((lesson.takeaways ?? []).length < 3) issues.push({ level: 'error', where, message: 'needs at least three takeaways' })
  lesson.takeaways?.forEach((t, i) => checkL10n(issues, where, `takeaway ${i + 1}`, t, { minLen: 15 }))
  checkSources(issues, where, (lesson.sources ?? []).map((s) => s.url))

  const strings: string[] = [
    ...textOf(lesson.summary),
    ...textOf(lesson.examFocus),
    ...(lesson.concepts ?? []).flatMap((c) => [c.term, ...textOf(c.text)]),
    ...(lesson.traps ?? []).flatMap(textOf),
    ...(lesson.takeaways ?? []).flatMap(textOf),
    ...(lesson.diagrams ?? []).flatMap((d) => [
      ...d.nodes.flatMap((n) => [...textOf(n.label), ...textOf(n.sub)]),
      ...d.steps.flatMap((s) => [...textOf(s.title), ...textOf(s.text)]),
    ]),
  ]
  checkLegacy(issues, where, strings)
}

export function validateContent(bundle: ContentBundle, options: ValidateOptions = {}): ValidationReport {
  const issues: Issue[] = []
  const today = options.today ?? new Date().toISOString().slice(0, 10)
  const only = options.only?.length ? new Set(options.only) : null
  const inScope = (moduleId: string) => !only || only.has(moduleId)
  const minPerBullet = options.minPerBullet ?? 2
  const minPerModule = options.minPerModule ?? 3

  const caseIds = new Set(bundle.cases.map((c) => c.id))
  uniqueIds(issues, 'cases', 'case', bundle.cases.map((c) => c.id))
  for (const c of bundle.cases) {
    if (!c.modules.some(inScope)) continue
    const where = `case ${c.id}`
    checkL10n(issues, where, 'title', c.title)
    checkL10n(issues, where, 'scenario', c.scenario, { minLen: 200 })
    for (const m of c.modules) if (!moduleById.has(m)) issues.push({ level: 'error', where, message: `unknown module "${m}"` })
    checkLegacy(issues, where, textOf(c.scenario))
    checkModels(issues, where, c, options.modelLifecycle, today)
  }

  const allQuestions: Question[] = []
  const fileModules = new Set<string>()
  for (const { file, data } of bundle.files) {
    if (fileModules.has(data.module)) issues.push({ level: 'error', where: file, message: `second question file for module "${data.module}"` })
    fileModules.add(data.module)
    if (!moduleById.has(data.module)) issues.push({ level: 'error', where: file, message: `unknown module "${data.module}"` })
    for (const q of data.questions ?? []) {
      allQuestions.push(q)
      if (inScope(data.module)) {
        validateQuestion(q, issues, { file, fileModule: data.module, caseIds, today })
        checkModels(issues, `${file} › ${q.id}`, q, options.modelLifecycle, today)
      }
    }
  }
  uniqueIds(issues, 'questions', 'question', allQuestions.map((q) => q.id))

  const lessonModules = new Map<string, string>()
  for (const { file, lesson } of bundle.lessons) {
    if (lessonModules.has(lesson.module)) issues.push({ level: 'error', where: file, message: `second lesson for module "${lesson.module}"` })
    lessonModules.set(lesson.module, file)
    if (inScope(lesson.module)) {
      validateLesson(lesson, issues, file)
      checkModels(issues, `${file} › lesson ${lesson.module}`, lesson, options.modelLifecycle, today)
    }
  }

  const moduleCounts: Record<string, number> = Object.fromEntries(modules.map((m) => [m.id, 0]))
  const domainCounts: Record<string, number> = { D1: 0, D2: 0, D3: 0, D4: 0, D5: 0 }
  const typeCounts: Record<string, number> = {}
  const difficultyCounts: Record<string, number> = {}
  const primary = new Map<string, number>()
  const secondary = new Map<string, number>()
  for (const q of allQuestions) {
    moduleCounts[q.module] = (moduleCounts[q.module] ?? 0) + 1
    domainCounts[q.domain] = (domainCounts[q.domain] ?? 0) + 1
    typeCounts[q.type] = (typeCounts[q.type] ?? 0) + 1
    difficultyCounts[String(q.difficulty)] = (difficultyCounts[String(q.difficulty)] ?? 0) + 1
    primary.set(q.skill, (primary.get(q.skill) ?? 0) + 1)
    for (const s of q.skills ?? []) secondary.set(s, (secondary.get(s) ?? 0) + 1)
  }

  const modulesForBullet = (bulletId: string) => modules.filter((m: CourseModule) => m.skills.includes(bulletId)).map((m) => m.id)
  const coverage: CoverageRow[] = allBullets.map((b) => {
    const mods = modulesForBullet(b.id)
    return {
      bullet: b.id,
      domain: b.domain,
      text: b.en,
      modules: mods,
      lessons: mods.filter((m) => lessonModules.has(m)),
      primary: primary.get(b.id) ?? 0,
      secondary: secondary.get(b.id) ?? 0,
    }
  })

  for (const m of modules) {
    for (const s of m.skills) if (!bulletById.has(s)) issues.push({ level: 'error', where: `course ${m.id}`, message: `maps to unknown bullet "${s}"` })
  }

  if (!only) {
    for (const row of coverage) {
      if (row.modules.length === 0) issues.push({ level: 'error', where: `coverage ${row.bullet}`, message: 'skills-outline bullet is not mapped to any module' })
      if (row.primary === 0) issues.push({ level: 'error', where: `coverage ${row.bullet}`, message: 'skills-outline bullet has no questions' })
      else if (row.primary < minPerBullet) issues.push({ level: 'warning', where: `coverage ${row.bullet}`, message: `only ${row.primary} question(s); aim for ≥ ${minPerBullet}` })
    }
    for (const m of modules) {
      if (!lessonModules.has(m.id)) issues.push({ level: 'error', where: `coverage ${m.id}`, message: 'module has no lesson' })
      const n = moduleCounts[m.id] ?? 0
      if (n === 0) issues.push({ level: 'error', where: `coverage ${m.id}`, message: 'module has no questions' })
      else if (n < minPerModule) issues.push({ level: 'warning', where: `coverage ${m.id}`, message: `only ${n} question(s); aim for ≥ ${minPerModule}` })
    }
    for (const c of bundle.cases) {
      const n = allQuestions.filter((q) => q.caseId === c.id).length
      if (n < 2) issues.push({ level: 'error', where: `case ${c.id}`, message: `case study needs at least two questions (has ${n})` })
    }
  }

  return {
    issues,
    errors: issues.filter((i) => i.level === 'error'),
    warnings: issues.filter((i) => i.level === 'warning'),
    coverage,
    moduleCounts,
    domainCounts,
    typeCounts,
    difficultyCounts,
  }
}
