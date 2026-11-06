import type { DomainId, Lang, Text } from './types.ts'
import type { IconName } from '../components/icons.generated.ts'

export function tx(t: Text | undefined, lang: Lang): string {
  if (t === undefined) return ''
  return typeof t === 'string' ? t : t[lang] || t.en
}

export const DOMAIN_ICON: Record<DomainId, IconName> = {
  D1: 'cloud',
  D2: 'brain',
  D3: 'eye',
  D4: 'textList',
  D5: 'documentSearch',
}

export const QUESTION_TYPE_LABEL: Record<string, string> = {
  single: 'Einfachauswahl',
  multi: 'Mehrfachauswahl',
  order: 'Reihenfolge',
  match: 'Zuordnung',
  code: 'Code ergänzen',
}

export const DIFFICULTY_LABEL: Record<number, string> = { 1: 'Grundlagen', 2: 'Anwenden', 3: 'Analysieren' }

export function plural(n: number, one: string, many: string): string {
  return `${n} ${n === 1 ? one : many}`
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function relativeDue(iso: string, now: Date = new Date()): string {
  const days = Math.round((new Date(iso).getTime() - now.getTime()) / 86_400_000)
  if (days <= 0) return 'fällig'
  if (days === 1) return 'morgen'
  return `in ${days} Tagen`
}

export function prettySource(url: string): string {
  try {
    const u = new URL(url)
    const parts = u.pathname.split('/').filter(Boolean)
    const slug = parts[parts.length - 1] ?? u.hostname
    return `Learn: ${slug.replace(/-/g, ' ')}`
  } catch {
    return url
  }
}
