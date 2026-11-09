import { useSyncExternalStore } from 'react'
import type { Text } from '../lib/types.ts'
import { feedbackUrl, type FeedbackTarget } from '../lib/feedback.ts'
import { tx } from '../lib/i18n.ts'
import { useLang } from '../lib/store.ts'
import { Icon } from './Icon.tsx'

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

/** The current address including the hash route, so a report links back to the exact screen. */
function usePageUrl(): string {
  return useSyncExternalStore(
    subscribe,
    () => window.location.href,
    () => '',
  )
}

interface FeedbackLinkProps {
  target: Omit<FeedbackTarget, 'excerpt'> & { excerpt?: Text }
  /** Completes the accessible name: "Feedback zu dieser Frage …". */
  about: string
  /** Icon only, for tight card headers; the accessible name still starts with "Feedback". */
  iconOnly?: boolean
  /** Hide the text below 560 px (icon stays). */
  compact?: boolean
  /** A plain text link inside running text, e.g. the footer; the label is the link text. */
  plainLabel?: string
}

/** Opens a prefilled GitHub issue for the thing it sits next to: a question, a lesson section, a diagram, a code sample or a card. */
export function FeedbackLink({ target, about, iconOnly = false, compact = false, plainLabel }: FeedbackLinkProps) {
  const lang = useLang()
  const page = usePageUrl()
  const href = feedbackUrl({ ...target, excerpt: target.excerpt === undefined ? undefined : tx(target.excerpt, lang) }, { lang, page })
  if (plainLabel) {
    return (
      <a href={href} target="_blank" rel="noreferrer" aria-label={`${plainLabel} – öffnet ein GitHub-Issue in einem neuen Tab`}>
        {plainLabel}
      </a>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`feedback-link${iconOnly ? ' feedback-link--icon' : ''}${compact ? ' feedback-link--compact' : ''}`}
      aria-label={`Feedback ${about} – öffnet ein GitHub-Issue in einem neuen Tab`}
      title={`Fehler oder Unklarheit ${about} melden`}
      onClick={(e) => e.stopPropagation()}
    >
      <Icon name="feedback" size={16} />
      {!iconOnly && <span className="feedback-link__text">Feedback</span>}
    </a>
  )
}
