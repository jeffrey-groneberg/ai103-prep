import type { Lang } from './types.ts'

/** Feedback opens a new issue in the app's public repository, so anyone with a GitHub account can report a problem. */
export const ISSUES_NEW_URL = 'https://github.com/jeffrey-groneberg/ai103-prep/issues/new'

/** Short commit of this build; Vite replaces it at build time (see vite.config.ts). */
declare const __APP_VERSION__: string | undefined
export const APP_VERSION = typeof __APP_VERSION__ === 'string' ? __APP_VERSION__ : 'dev'

export interface FeedbackTarget {
  /** Where the problem is, e.g. "Frage q-foundry-iq-03" or "Lektion foundry-iq · Kernkonzepte". */
  subject: string
  /** Facts that locate the problem, listed in the issue. */
  details?: ReadonlyArray<readonly [string, string]>
  /** The text the learner saw, in the language shown. */
  excerpt?: string
}

const MAX_EXCERPT = 160

function clip(text: string): string {
  const flat = text.replace(/\s+/g, ' ').trim()
  return flat.length > MAX_EXCERPT ? `${flat.slice(0, MAX_EXCERPT - 1)}…` : flat
}

/** A prefilled "new issue" link: the learner only describes the problem, the app adds where it happened. */
export function feedbackUrl(target: FeedbackTarget, context: { lang: Lang; page: string; version?: string }): string {
  const body = [
    '### Was stimmt nicht?',
    '<!-- Beschreibe kurz, was falsch, unklar oder kaputt ist. Kennst du eine passende Seite auf Microsoft Learn, füge den Link hinzu. -->',
    '',
    '',
    '### Wo (automatisch ausgefüllt)',
    `- Bereich: ${target.subject}`,
    ...(target.details ?? []).map(([key, value]) => `- ${key}: ${value}`),
    ...(target.excerpt ? [`- Text: „${clip(target.excerpt)}“`] : []),
    `- Seite: ${context.page}`,
    `- Sprache der Inhalte: ${context.lang === 'de' ? 'Deutsch' : 'Englisch'}`,
    `- App-Version: ${context.version ?? APP_VERSION}`,
  ].join('\n')
  const params = new URLSearchParams({ title: `Feedback: ${target.subject}`, body, labels: 'feedback' })
  return `${ISSUES_NEW_URL}?${params.toString()}`
}
