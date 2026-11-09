// @vitest-environment jsdom
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { App } from '../src/App.tsx'
import { initialState, store } from '../src/lib/store.ts'
import { starterZettel } from '../src/content/index.ts'

beforeAll(() => {
  window.scrollTo = () => undefined
  Element.prototype.scrollIntoView = () => undefined
})

afterEach(() => cleanup())

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('app routes render', () => {
  it('home shows the guided path and the next step', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { level: 1, name: /Dein Lernpfad zu AI-103/ })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Als Nächstes dran' })).toBeTruthy()
    expect(screen.getAllByText(/Plan and prepare to develop AI solutions on Azure/).length).toBeGreaterThan(0)
  })

  it('lesson page renders the reference lesson with its diagram', () => {
    renderAt('/lernen/foundry-chat-app')
    expect(screen.getByRole('heading', { level: 1, name: /Develop a generative AI chat app/ })).toBeTruthy()
    expect(screen.getAllByText(/Two endpoints, two SDKs|Zwei Endpoints, zwei SDKs/).length).toBeGreaterThan(0)
  })

  it.each([
    ['/lernen', /Lernen/],
    ['/ueben', /Üben/],
    ['/pruefung', /Prüfungssimulation/],
    ['/wiederholen', /Wiederholen/],
    ['/fortschritt', /Fortschritt/],
    ['/abdeckung', /Abdeckung/],
    ['/ressourcen', /Ressourcen/],
    ['/zettel', /Zettelkasten/],
    ['/zettel/modul/a2a', /Discover Azure AI Agents with A2A|A2A/],
    ['/zettel/eigene', /Eigene Zettel/],
    ['/gibt-es-nicht', /Diese Seite gibt es nicht/],
  ])('%s renders', (path, title) => {
    renderAt(path)
    expect(screen.getByRole('heading', { level: 1, name: title })).toBeTruthy()
  })

  it('offers feedback where problems happen: on questions, lesson sections, diagrams, code samples and cards', () => {
    const hrefOf = (el: HTMLElement) => el.getAttribute('href') ?? ''
    renderAt('/ueben/sitzung?modul=foundry-chat-app')
    const question = screen.getByRole('link', { name: /^Feedback zu dieser Frage/ })
    expect(hrefOf(question)).toMatch(/^https:\/\/github\.com\/jeffrey-groneberg\/ai103-prep\/issues\/new\?/)
    expect(new URL(hrefOf(question)).searchParams.get('title')).toMatch(/^Feedback: Frage q-foundry-chat-app-\d\d$/)
    cleanup()

    renderAt('/lernen/foundry-chat-app')
    expect(screen.getAllByRole('link', { name: /^Feedback zu diesem Abschnitt/ }).length).toBeGreaterThanOrEqual(5)
    const diagram = screen.getAllByRole('link', { name: /^Feedback zu diesem Diagramm/ })[0]
    expect(new URL(hrefOf(diagram)).searchParams.get('body')).toMatch(/- Schritt: Gesamtbild/)
    expect(screen.getAllByRole('link', { name: /^Feedback zu diesem Codebeispiel/ }).length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: /^Feedback zur App/ })).toBeTruthy()
    cleanup()

    renderAt('/zettel/lernen?modul=a2a')
    const card = screen.getByRole('link', { name: /^Feedback zu diesem Zettel/ })
    expect(new URL(hrefOf(card)).searchParams.get('title')).toMatch(/^Feedback: Zettel z-a2a-/)
  })

  it('a practice session shows the first question and a disabled check button', () => {
    renderAt('/ueben/sitzung?modul=foundry-chat-app')
    expect(screen.getByRole('button', { name: 'Prüfen' })).toHaveProperty('disabled', true)
  })

  it('home shows the Zettelkasten with every starter card at the back', () => {
    store.importJson(JSON.stringify(initialState()))
    renderAt('/')
    expect(screen.getByRole('heading', { name: 'Zettelkasten' })).toBeTruthy()
    expect(screen.getByText(new RegExp(`von ${starterZettel.length} Zetteln vorne`))).toBeTruthy()
  })

  it('a Zettelkasten round asks multiple choice, explains every option and moves the card', () => {
    store.importJson(JSON.stringify(initialState()))
    renderAt('/zettel/lernen?modul=a2a')
    expect(screen.getByText('Vorderseite · Frage')).toBeTruthy()
    const plain = (s: string) => s.replace(/[`*\u200b]/g, '').replace(/\s+/g, ' ').trim()
    const pick = (id: string, correct: boolean) => {
      const option = starterZettel.find((z) => z.id === id)!.choices!.find((o) => o.correct === correct)!
      const radio = (screen.getAllByRole('radio') as HTMLInputElement[]).find((r) => plain(r.closest('label')!.textContent!).includes(plain(option.text.de)))!
      fireEvent.click(radio)
      return option
    }
    expect(screen.getByRole('button', { name: 'Prüfen' })).toHaveProperty('disabled', true)
    const right = pick('z-a2a-concept-1', true)
    fireEvent.click(screen.getByRole('button', { name: 'Prüfen' }))
    expect(screen.getByText('Richtig!')).toBeTruthy()
    expect(screen.getByText(plain(right.why.de).slice(0, 40), { exact: false })).toBeTruthy()
    expect(store.get().zettel['z-a2a-concept-1']?.fach).toBe(2)
    fireEvent.click(screen.getByRole('button', { name: /Weiter/ }))
    pick('z-a2a-concept-2', false)
    fireEvent.click(screen.getByRole('button', { name: 'Prüfen' }))
    expect(screen.getByText('Falsch')).toBeTruthy()
    expect(store.get().zettel['z-a2a-concept-2']).toMatchObject({ fach: 1, wrong: 1 })
  })

  it('own cards without options are still turned and rated', () => {
    store.importJson(JSON.stringify({ ...initialState(), ownZettel: [{ id: 'z-own-1', module: null, front: 'Meine Frage?', back: 'Meine Antwort.', createdAt: '2026-11-09T10:00:00Z' }] }))
    renderAt('/zettel/lernen?eigene=1')
    fireEvent.click(screen.getByRole('button', { name: /Antwort zeigen/ }))
    fireEvent.click(screen.getByRole('button', { name: /^Gewusst/ }))
    expect(store.get().zettel['z-own-1']?.fach).toBe(2)
  })
})
