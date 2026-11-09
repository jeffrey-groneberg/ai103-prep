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

  it('a Zettelkasten round flips a card and moves it one compartment forward', () => {
    store.importJson(JSON.stringify(initialState()))
    renderAt('/zettel/lernen?modul=a2a')
    expect(screen.getByText('Vorderseite · Frage')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: /Antwort zeigen/ }))
    fireEvent.click(screen.getByRole('button', { name: /^Gewusst/ }))
    expect(store.get().zettel['z-a2a-concept-1']?.fach).toBe(2)
    fireEvent.click(screen.getByRole('button', { name: /Antwort zeigen/ }))
    fireEvent.click(screen.getByRole('button', { name: /Nicht gewusst/ }))
    expect(store.get().zettel['z-a2a-concept-2']?.fach).toBe(1)
    expect(store.get().zettel['z-a2a-concept-2']?.wrong).toBe(1)
  })
})
