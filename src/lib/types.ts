import type { DiagramIconId } from '../content/diagram-icons.ts'

export type Lang = 'de' | 'en'

/** Localized content string. Product, API and SDK names stay English in both languages. */
export interface L10n {
  en: string
  de: string
}

export type Text = string | L10n

export type DomainId = 'D1' | 'D2' | 'D3' | 'D4' | 'D5'

export interface SkillBullet {
  /** e.g. "1.1.1" = domain 1, skill group 1, bullet 1 */
  id: string
  /** Official English wording from the study guide (skills measured as of April 16, 2026). */
  en: string
  de: string
}

export interface SkillGroup {
  /** e.g. "1.1" */
  id: string
  title: L10n
  bullets: SkillBullet[]
}

export interface Domain {
  id: DomainId
  index: number
  title: L10n
  short: L10n
  /** Official weight range in percent, e.g. [25, 30]. */
  weight: [number, number]
  groups: SkillGroup[]
}

export interface LearningPath {
  id: string
  uid: string
  title: string
  url: string
  /** Module ids in official order. */
  modules: string[]
}

export interface CourseModule {
  id: string
  uid: string
  /** Official English module title. */
  title: string
  url: string
  minutes: number
  pathId: string
  /** Official unit titles in order (from the Learn catalog). */
  units: string[]
  /** Skills-outline bullets this module primarily teaches. */
  skills: string[]
}

export type QuestionType = 'single' | 'multi' | 'order' | 'match' | 'code'
export type Difficulty = 1 | 2 | 3

export interface ChoiceOption {
  id: string
  text: L10n
  correct: boolean
  /** Why this option is right or wrong. */
  why: L10n
}

export interface OrderItem {
  id: string
  text: L10n
  /** Why the item sits at this position. */
  why: L10n
}

export interface MatchPrompt {
  id: string
  prompt: L10n
  /** Target id that matches this prompt. */
  answer: string
  why: L10n
}

export interface MatchTarget {
  id: string
  text: L10n
}

export interface CodeBlankOption {
  id: string
  /** Code token shown in the drop-down, e.g. "responses.create". */
  code: string
  correct: boolean
  why: L10n
}

export interface CodeBlank {
  /** Placeholder id used as {{id}} in the template. */
  id: string
  options: CodeBlankOption[]
}

interface QuestionBase {
  id: string
  type: QuestionType
  domain: DomainId
  /** Primary skills-outline bullet id, e.g. "2.1.6". */
  skill: string
  /** Optional secondary bullets the question also exercises. */
  skills?: string[]
  /** Module id from the course map. */
  module: string
  difficulty: Difficulty
  /** Optional case study this question belongs to. */
  caseId?: string
  stem: L10n
  /** Optional Python/JSON/YAML snippet shown with the stem. */
  code?: string
  /** Overall takeaway shown after answering. */
  explanation: L10n
  /** Current learn.microsoft.com URLs backing the facts. */
  sources: string[]
  /** ISO date the facts were last checked against the docs. */
  lastVerified: string
}

export interface SingleQuestion extends QuestionBase {
  type: 'single'
  options: ChoiceOption[]
}

export interface MultiQuestion extends QuestionBase {
  type: 'multi'
  options: ChoiceOption[]
}

export interface OrderQuestion extends QuestionBase {
  type: 'order'
  /** Items in the correct order; the UI shuffles them. */
  items: OrderItem[]
}

export interface MatchQuestion extends QuestionBase {
  type: 'match'
  prompts: MatchPrompt[]
  targets: MatchTarget[]
}

export interface CodeQuestion extends QuestionBase {
  type: 'code'
  /** Python template with {{blankId}} placeholders. */
  template: string
  blanks: CodeBlank[]
}

export type Question = SingleQuestion | MultiQuestion | OrderQuestion | MatchQuestion | CodeQuestion

export interface CaseStudy {
  id: string
  title: L10n
  /** Markdown-lite scenario: company, current state, requirements, constraints. */
  scenario: L10n
  modules: string[]
}

export interface QuestionFile {
  $schema?: string
  module: string
  questions: Question[]
}

export interface CaseFile {
  $schema?: string
  cases: CaseStudy[]
}

/* ---------- Lessons & diagrams ---------- */

export type Tone = 'user' | 'app' | 'foundry' | 'model' | 'data' | 'tool' | 'safety' | 'external' | 'neutral'

export type NodeShape = 'box' | 'pill' | 'store' | 'doc' | 'actor' | 'diamond'

export interface DiagramNode {
  id: string
  x: number
  y: number
  w: number
  h: number
  label: Text
  sub?: Text
  /** Official Azure Architecture icon (src/content/diagram-icons.ts), shown beside the label. */
  icon: DiagramIconId
  tone: Tone
  shape?: NodeShape
}

export interface DiagramGroup {
  id: string
  x: number
  y: number
  w: number
  h: number
  label: Text
  tone?: Tone
}

export interface DiagramEdge {
  id: string
  from: string
  to: string
  label?: Text
  dashed?: boolean
  bidir?: boolean
  /** Optional intermediate points for orthogonal routing. */
  via?: Array<[number, number]>
}

export interface DiagramStep {
  title: L10n
  text: L10n
  /** Node, group or edge ids highlighted during this step. */
  focus: string[]
}

export interface Diagram {
  id: string
  title: L10n
  caption?: L10n
  width: number
  height: number
  groups?: DiagramGroup[]
  nodes: DiagramNode[]
  edges: DiagramEdge[]
  steps: DiagramStep[]
}

export interface Concept {
  /** English term as used in the exam, e.g. "Prompt agent". */
  term: string
  text: L10n
}

export interface CompareTable {
  title: L10n
  columns: L10n[]
  /** Each row: cells may be plain strings (names) or L10n. */
  rows: Text[][]
}

export interface CodeSample {
  title: L10n
  code: string
  /** Short notes explaining the important lines. */
  notes: L10n[]
}

export interface SourceLink {
  title: string
  url: string
}

export interface Lesson {
  module: string
  summary: L10n
  /** How the exam tends to probe this module's skills. */
  examFocus: L10n
  diagrams: Diagram[]
  concepts: Concept[]
  comparison?: CompareTable
  code: CodeSample[]
  traps: L10n[]
  takeaways: L10n[]
  sources: SourceLink[]
}
