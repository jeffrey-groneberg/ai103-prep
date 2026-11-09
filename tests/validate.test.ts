import { describe, expect, it } from 'vitest'
import { validateCardFile, validateContent, type ContentBundle, type Issue } from '../src/content/validate.ts'
import type { CardFile, Lesson, Question } from '../src/lib/types.ts'
import { code, multi, single } from './fixtures.ts'
import { findOutdatedModels, modelStatus, type ModelLifecycle } from '../src/content/model-currency.ts'

const t = (s: string) => ({ en: s, de: `${s} (de)` })

function bundleWith(questions: Question[], lessons: Lesson[] = []): ContentBundle {
  const byModule = new Map<string, Question[]>()
  for (const q of questions) byModule.set(q.module, [...(byModule.get(q.module) ?? []), q])
  return {
    files: [...byModule.entries()].map(([module, qs]) => ({ file: `${module}.json`, data: { module, questions: qs } })),
    cases: [],
    lessons: lessons.map((lesson) => ({ file: `${lesson.module}.ts`, lesson })),
  }
}

const scoped = (qs: Question[], lessons: Lesson[] = []) => validateContent(bundleWith(qs, lessons), { only: [...new Set([...qs.map((q) => q.module), ...lessons.map((l) => l.module)])], today: '2026-11-06' })

function messages(qs: Question[]) {
  return scoped(qs).errors.map((e) => e.message).join('\n')
}

describe('validator — questions', () => {
  it('accepts a well-formed question of every type', () => {
    expect(scoped([single(), multi(), code()]).errors).toEqual([])
  })

  it('fails when a single-choice question has no correct answer', () => {
    const q = single()
    if (q.type === 'single') q.options = q.options.map((o) => ({ ...o, correct: false }))
    expect(messages([q])).toMatch(/exactly one correct option/)
  })

  it('fails when a multiple-select question has fewer than two correct answers', () => {
    const q = multi()
    if (q.type === 'multi') q.options[1] = { ...q.options[1], correct: false }
    expect(messages([q])).toMatch(/at least two correct/)
  })

  it('fails when an option lacks its explanation', () => {
    const q = single()
    if (q.type === 'single') q.options[2] = { ...q.options[2], why: { en: '', de: '' } }
    expect(messages([q])).toMatch(/option c\.why/)
  })

  it('fails without a learn.microsoft.com source', () => {
    expect(messages([single({ sources: [] })])).toMatch(/at least one learn\.microsoft\.com source/)
    expect(messages([single({ sources: ['https://www.examtopics.com/discussions/x'] })])).toMatch(/learn\.microsoft\.com documentation URL/)
  })

  it('fails on a domain/skill mismatch or unknown mapping', () => {
    expect(messages([single({ domain: 'D3', skill: '2.1.1' })])).toMatch(/belongs to D2, not D3/)
    expect(messages([single({ skill: '9.9.9' })])).toMatch(/unknown skill bullet/)
    expect(messages([single({ module: 'not-a-module' })])).toMatch(/unknown module/)
  })

  it('fails when a code template and its blanks disagree', () => {
    const q = code()
    if (q.type === 'code') q.template = q.template.replace('{{b2}}', '{{b9}}')
    const m = messages([q])
    expect(m).toMatch(/placeholder \{\{b9\}\} has no blank/)
    expect(m).toMatch(/blank b2 missing from template/)
  })

  it('rejects outdated product names unless framed as former names', () => {
    expect(messages([single({ stem: t('Open Azure AI Studio and deploy the model to continue.') })])).toMatch(/outdated name/)
    expect(messages([single({ stem: t('Microsoft Foundry (formerly Azure AI Studio) hosts the deployment here.') })])).not.toMatch(/outdated name/)
    expect(messages([single({ explanation: t('Assign the Azure AI User role to the managed identity.') })])).toMatch(/Foundry User/)
  })

  it('rejects future verification dates and duplicate ids', () => {
    expect(messages([single({ lastVerified: '2099-01-01' })])).toMatch(/in the future/)
    const a = single({ id: 'q-dup' })
    const b = single({ id: 'q-dup' })
    expect(validateContent(bundleWith([a, b]), { today: '2026-11-06' }).errors.map((e) => e.message).join('\n')).toMatch(/duplicate question id/)
  })
})

describe('validator — coverage', () => {
  it('fails when skills-outline bullets or modules have no questions or lessons', () => {
    const report = validateContent(bundleWith([single()]), { today: '2026-11-06' })
    const text = report.errors.map((e) => `${e.where}: ${e.message}`).join('\n')
    expect(text).toMatch(/coverage 1\.1\.1: skills-outline bullet has no questions/)
    expect(text).toMatch(/coverage knowledge-mining: module has no questions/)
    expect(text).toMatch(/coverage knowledge-mining: module has no lesson/)
    expect(report.coverage).toHaveLength(64)
    expect(report.coverage.every((r) => r.modules.length > 0)).toBe(true)
  })

  it('skips global coverage when scoped to modules', () => {
    expect(scoped([single()]).errors).toEqual([])
  })
})

describe('validator — lessons and diagrams', () => {
  const lesson = (): Lesson => ({
    module: 'foundry-chat-app',
    summary: t('A long enough summary that explains what this module is about for learners.'),
    examFocus: t('How the exam asks about this topic in practice.'),
    diagrams: [
      {
        id: 'd1',
        title: t('Diagram'),
        width: 960,
        height: 300,
        nodes: [
          { id: 'a', x: 20, y: 20, w: 160, h: 60, label: 'App', icon: 'code', tone: 'app' },
          { id: 'b', x: 300, y: 20, w: 160, h: 60, label: 'Model', icon: 'code', tone: 'model' },
        ],
        edges: [{ id: 'e', from: 'a', to: 'b' }],
        steps: [
          { title: t('One'), text: t('The app calls the model directly.'), focus: ['a', 'e'] },
          { title: t('Two'), text: t('The model answers the app call.'), focus: ['b'] },
        ],
      },
    ],
    concepts: [1, 2, 3].map((i) => ({ term: `Term ${i}`, text: t('An explanation that is long enough to be useful.') })),
    code: [{ title: t('Code'), code: 'print("hi")', notes: [] }],
    traps: [t('A trap that is worth knowing.'), t('Another trap that is worth knowing.')],
    takeaways: [t('Takeaway number one.'), t('Takeaway number two.'), t('Takeaway number three.')],
    sources: [{ title: 'Doc', url: 'https://learn.microsoft.com/en-us/azure/foundry/what-is-foundry' }],
  })

  it('accepts a complete lesson', () => {
    expect(validateContent(bundleWith([], [lesson()]), { only: ['foundry-chat-app'], today: '2026-11-06' }).errors).toEqual([])
  })

  it('catches overlapping nodes, unknown step focus and labels that overflow', () => {
    const l = lesson()
    l.diagrams[0].nodes[1] = { ...l.diagrams[0].nodes[1], x: 100 }
    l.diagrams[0].steps[1].focus = ['ghost']
    l.diagrams[0].nodes[0] = { ...l.diagrams[0].nodes[0], label: 'A label that is far too long for this node' }
    const text = validateContent(bundleWith([], [l]), { only: ['foundry-chat-app'], today: '2026-11-06' })
      .errors.map((e) => e.message)
      .join('\n')
    expect(text).toMatch(/overlap/)
    expect(text).toMatch(/unknown id "ghost"/)
    expect(text).toMatch(/needs \d+px with its icon but only \d+px fit/)
  })

  it('requires every node to name an official icon', () => {
    const l = lesson()
    const [a, b] = l.diagrams[0].nodes
    l.diagrams[0].nodes[0] = { ...a, icon: undefined as unknown as typeof a.icon }
    l.diagrams[0].nodes[1] = { ...b, icon: 'logo' as unknown as typeof b.icon }
    const text = validateContent(bundleWith([], [l]), { only: ['foundry-chat-app'], today: '2026-11-06' })
      .errors.map((e) => e.message)
      .join('\n')
    expect(text).toMatch(/node a .*icon/)
    expect(text).toMatch(/node b .*"logo"/)
  })

  it('flags arrows that run through another node', () => {
    const l = lesson()
    const d = l.diagrams[0]
    d.nodes.push({ id: 'c', x: 600, y: 20, w: 160, h: 60, label: 'Store', icon: 'code', tone: 'data' })
    d.nodes.push({ id: 'mid', x: 380, y: 25, w: 120, h: 50, label: 'Middle', icon: 'code', tone: 'tool' })
    d.nodes[1] = { ...d.nodes[1], x: 210 }
    d.edges.push({ id: 'long', from: 'a', to: 'c' })
    const report = validateContent(bundleWith([], [l]), { only: ['foundry-chat-app'], today: '2026-11-06' })
    expect(report.errors.map((e) => e.message).join('\n')).toMatch(/edge long \(a → c\) runs through node/)
  })

  it('reports a label that has no free spot on or beside its arrow', () => {
    const l = lesson()
    const d = l.diagrams[0]
    d.width = 700
    d.height = 300
    d.nodes = [
      { id: 'a', x: 20, y: 120, w: 200, h: 60, label: t('Alpha'), icon: 'code', tone: 'app' },
      { id: 'b', x: 260, y: 120, w: 200, h: 60, label: t('Beta'), icon: 'code', tone: 'model' },
      { id: 'top', x: 150, y: 40, w: 180, h: 74, label: t('Top'), icon: 'code', tone: 'data' },
      { id: 'bottom', x: 150, y: 186, w: 180, h: 74, label: t('Bottom'), icon: 'code', tone: 'data' },
    ]
    d.groups = []
    d.edges = [{ id: 'ab', from: 'a', to: 'b', label: t('a label that is far too long') }]
    d.steps = [
      { title: t('One'), text: t('The first step of the flow.'), focus: ['a'] },
      { title: t('Two'), text: t('The second step of the flow.'), focus: ['b'] },
    ]
    const text = validateContent(bundleWith([], [l]), { only: ['foundry-chat-app'], today: '2026-11-06' })
      .errors.map((e) => e.message)
      .join('\n')
    expect(text).toMatch(/label "a label that is far too long.*" of edge ab \(a → b\) has no free spot/)
  })
})

describe('validator — Zettelkasten cards', () => {
  const cardLesson = (): Lesson => ({
    module: 'a2a',
    summary: t('A long enough summary that explains what this module is about for learners.'),
    examFocus: t('How the exam asks about this topic in practice.'),
    diagrams: [],
    concepts: [1, 2].map((i) => ({ term: `Term ${i}`, text: t(`Concept ${i} explained in enough words to be useful.`) })),
    code: [],
    traps: [t('A trap that is worth knowing.')],
    takeaways: [t('A takeaway worth keeping.')],
    sources: [],
  })
  const q = (s: string) => ({ en: `${s}?`, de: `${s} (de)?` })
  const goodCards = (): CardFile => ({
    module: 'a2a',
    cards: [
      { id: 'z-a2a-concept-1', source: { kind: 'concept', index: 0 }, front: q('What is term one') },
      { id: 'z-a2a-concept-2', source: { kind: 'concept', index: 1 }, front: q('What is term two') },
      { id: 'z-a2a-trap-1', source: { kind: 'trap', index: 0 }, front: q('Which trap matters'), back: t('The trap that is worth knowing.') },
      { id: 'z-a2a-takeaway-1', source: { kind: 'takeaway', index: 0 }, front: q('What do you keep'), back: t('The takeaway worth keeping.') },
    ],
  })
  const cardErrors = (data: CardFile, lesson = cardLesson()) => {
    const issues: Issue[] = []
    validateCardFile(data, lesson, issues, 'src/content/cards/a2a.json')
    return issues.filter((i) => i.level === 'error').map((i) => i.message).join('\n')
  }

  it('accepts one question card per concept, trap and takeaway', () => {
    expect(cardErrors(goodCards())).toBe('')
  })

  it('reports lesson items without a card and cards without a lesson item', () => {
    const data = goodCards()
    data.cards = data.cards.filter((c) => c.id !== 'z-a2a-trap-1')
    data.cards.push({ id: 'z-a2a-takeaway-9', source: { kind: 'takeaway', index: 8 }, front: q('Where is this from'), back: t('Nowhere at all, really.') })
    const text = cardErrors(data)
    expect(text).toMatch(/trap 1 \("A trap that is worth knowing\.…"\) has no card/)
    expect(text).toMatch(/source takeaway 8 does not exist/)
  })

  it('requires questions on the front, answers on trap and takeaway backs, and matching ids', () => {
    const data = goodCards()
    data.cards[0] = { ...data.cards[0], id: 'z-a2a-concept-7', front: t('A statement, not a question') }
    data.cards[2] = { ...data.cards[2], back: undefined }
    const text = cardErrors(data)
    expect(text).toMatch(/id should be "z-a2a-concept-1"/)
    expect(text).toMatch(/front\.en must be a question ending with "\?"/)
    expect(text).toMatch(/back: missing localized text/)
  })

  it('rejects answers that point at the lesson page', () => {
    const lesson = cardLesson()
    lesson.concepts[1].text = t('Levels differ per model (see the table) and per API version.')
    expect(cardErrors(goodCards(), lesson)).toMatch(/points at the lesson page \("see the table"\)/)
    const fixed = goodCards()
    fixed.cards[1] = { ...fixed.cards[1], back: t('Levels differ per model and per API version.') }
    expect(cardErrors(fixed, lesson)).toBe('')
  })

  it('flags outdated product names on cards', () => {
    const data = goodCards()
    data.cards[2] = { ...data.cards[2], back: t('Use Azure AI Studio to deploy the model.') }
    expect(cardErrors(data)).toMatch(/outdated name/)
  })
})

describe('model currency', () => {
  const lifecycle: ModelLifecycle = {
    source: 'test',
    retrieved: '2026-11-06',
    overrides: { 'video-x': { status: 'available', note: 'docs still list it' } },
    models: {
      'gpt-old': [{ version: '1', lifecycle: 'GA', retirement: '2026-10-15', replacement: '—' }],
      'gpt-dep': [{ version: '1', lifecycle: 'Deprecated', retirement: '2027-04-14', replacement: 'gpt-new' }],
      'gpt-new': [{ version: '1', lifecycle: 'GA', retirement: '2027-07-13', replacement: '—' }],
      'video-x': [{ version: '1', lifecycle: 'Preview', retirement: '2026-10-15', replacement: '—' }],
    },
  }

  it('classifies models relative to today', () => {
    expect(modelStatus('gpt-old', lifecycle, '2026-11-06')).toBe('retired')
    expect(modelStatus('gpt-old', lifecycle, '2026-10-01')).toBe('available')
    expect(modelStatus('gpt-dep', lifecycle, '2026-11-06')).toBe('deprecated')
    expect(modelStatus('gpt-new', lifecycle, '2026-11-06')).toBe('available')
    expect(modelStatus('video-x', lifecycle, '2026-11-06')).toBe('available')
  })

  it('flags outdated models unless the text frames them as outdated', () => {
    const found = findOutdatedModels('Deploy `gpt-dep` and call model="gpt-old" for transcription.', lifecycle, '2026-11-06')
    expect(found.map((f) => f.model).sort()).toEqual(['gpt-dep', 'gpt-old'])
    expect(findOutdatedModels('gpt-dep is deprecated; move to gpt-new.', lifecycle, '2026-11-06')).toEqual([])
    expect(findOutdatedModels('Use gpt-new or gpt-dep-mini.', lifecycle, '2026-11-06')).toEqual([])
  })
})
