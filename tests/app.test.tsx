// @vitest-environment jsdom
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { App } from '../src/App.tsx'

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
    ['/gibt-es-nicht', /Diese Seite gibt es nicht/],
  ])('%s renders', (path, title) => {
    renderAt(path)
    expect(screen.getByRole('heading', { level: 1, name: title })).toBeTruthy()
  })

  it('a practice session shows the first question and a disabled check button', () => {
    renderAt('/ueben/sitzung?modul=foundry-chat-app')
    expect(screen.getByRole('button', { name: 'Prüfen' })).toHaveProperty('disabled', true)
  })
})
