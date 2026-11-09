import { describe, expect, it } from 'vitest'
import { APP_VERSION, feedbackUrl, ISSUES_NEW_URL } from '../src/lib/feedback.ts'

const parse = (url: string) => new URL(url)

describe('feedback links', () => {
  it('open a new issue in the public repository with title, label and the place of the problem', () => {
    const url = parse(
      feedbackUrl(
        { subject: 'Frage q-foundry-iq-03', details: [['Modul', 'foundry-iq'], ['Skill', '2.1.3']], excerpt: 'Your company **needs**\na knowledge base.' },
        { lang: 'en', page: 'https://example.test/app/#/ueben/sitzung?modul=foundry-iq', version: 'abc1234' },
      ),
    )
    expect(`${url.origin}${url.pathname}`).toBe(ISSUES_NEW_URL)
    expect(url.searchParams.get('title')).toBe('Feedback: Frage q-foundry-iq-03')
    expect(url.searchParams.get('labels')).toBe('feedback')
    const body = url.searchParams.get('body') ?? ''
    expect(body).toMatch(/^### Was stimmt nicht\?/)
    expect(body).toContain('- Bereich: Frage q-foundry-iq-03')
    expect(body).toContain('- Modul: foundry-iq')
    expect(body).toContain('- Skill: 2.1.3')
    expect(body).toContain('- Text: „Your company **needs** a knowledge base.“')
    expect(body).toContain('- Seite: https://example.test/app/#/ueben/sitzung?modul=foundry-iq')
    expect(body).toContain('- Sprache der Inhalte: Englisch')
    expect(body).toContain('- App-Version: abc1234')
  })

  it('clips long excerpts so the link stays far below URL length limits', () => {
    const url = feedbackUrl({ subject: 'Zettel z-a2a-concept-1', excerpt: 'x'.repeat(5000) }, { lang: 'de', page: 'https://example.test/' })
    const body = parse(url).searchParams.get('body') ?? ''
    expect(body).toMatch(/- Text: „x{159}…“/)
    expect(url.length).toBeLessThan(3000)
  })

  it('names the build version, falling back to "dev"', () => {
    expect(APP_VERSION).toMatch(/^([0-9a-f]{7}|dev)$/)
  })
})
