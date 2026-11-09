import { useState } from 'react'
import { Icon } from './Icon.tsx'
import { highlightPython } from './highlight.tsx'
import { FeedbackLink } from './Feedback.tsx'
import type { FeedbackTarget } from '../lib/feedback.ts'

interface CodeBlockProps {
  code: string
  language?: 'python' | 'text'
  caption?: string
  /** Lesson code samples get their own feedback link; question code is covered by the question's link. */
  feedback?: FeedbackTarget
}

export function CodeBlock({ code, language = 'python', caption, feedback }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }
  return (
    <figure className="code-block">
      <div className="code-block__bar">
        <span className="code-block__lang">{caption ?? (language === 'python' ? 'Python' : 'Text')}</span>
        {feedback && <FeedbackLink about="zu diesem Codebeispiel" compact target={feedback} />}
        <button type="button" className="btn btn--subtle btn--small" onClick={copy} aria-live="polite">
          <Icon name={copied ? 'check' : 'document'} size={16} />
          {copied ? 'Kopiert' : 'Kopieren'}
        </button>
      </div>
      <pre tabIndex={0}>
        <code>{language === 'python' ? highlightPython(code) : code}</code>
      </pre>
    </figure>
  )
}
