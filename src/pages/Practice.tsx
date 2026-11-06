import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { DomainId, QuestionType } from '../lib/types.ts'
import { Session } from '../components/Session.tsx'
import { Icon } from '../components/Icon.tsx'
import { useProgress } from '../lib/store.ts'
import { DIFFICULTY_LABEL, QUESTION_TYPE_LABEL } from '../lib/i18n.ts'
import { selectQuestions } from '../lib/select.ts'
import { learningPaths, moduleById } from '../content/course.ts'
import { domains } from '../content/domains.ts'

function toggle<T>(list: T[], v: T): T[] {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v]
}

const TYPES: QuestionType[] = ['single', 'multi', 'order', 'match', 'code']

function Setup() {
  const { cards } = useProgress()
  const navigate = useNavigate()
  const [doms, setDoms] = useState<DomainId[]>([])
  const [mod, setMod] = useState('')
  const [diffs, setDiffs] = useState<number[]>([])
  const [types, setTypes] = useState<QuestionType[]>([])
  const [status, setStatus] = useState<'alle' | 'neu' | 'falsch'>('alle')
  const [count, setCount] = useState(10)

  const params = useMemo(() => {
    const p = new URLSearchParams()
    if (doms.length) p.set('domain', doms.join(','))
    if (mod) p.set('modul', mod)
    if (diffs.length) p.set('schwierigkeit', diffs.join(','))
    if (types.length) p.set('typ', types.join(','))
    if (status === 'neu') p.set('neu', '1')
    if (status === 'falsch') p.set('falsch', '1')
    return p
  }, [doms, mod, diffs, types, status])

  const available = useMemo(() => {
    const p = new URLSearchParams(params)
    return selectQuestions(p, cards).length
  }, [params, cards])

  const start = () => {
    const p = new URLSearchParams(params)
    if (count > 0) p.set('runde', String(count))
    navigate(`/ueben/sitzung?${p.toString()}`)
  }

  return (
    <div className="page practice">
      <header className="page-head">
        <h1 className="page-title">Üben</h1>
        <p className="page-sub">Lernmodus mit sofortigem Feedback, Erklärung zu jeder Antwortoption und Links zur Lektion und zu den Docs.</p>
      </header>
      <div className="practice__grid">
        <section className="panel filters" aria-labelledby="filter-h">
          <h2 id="filter-h" className="panel__title">
            Fragen auswählen
          </h2>
          <fieldset className="filter">
            <legend>Domain</legend>
            <div className="chip-row">
              {domains.map((d) => (
                <button key={d.id} type="button" className={`toggle-chip domain-${d.id}`} aria-pressed={doms.includes(d.id)} onClick={() => setDoms(toggle(doms, d.id))}>
                  {d.id} · {d.short.de}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="filter">
            <label htmlFor="mod-select" className="filter__label">
              Modul
            </label>
            <select id="mod-select" className="select" value={mod} onChange={(e) => setMod(e.target.value)}>
              <option value="">Alle Module</option>
              {learningPaths.map((p) => (
                <optgroup key={p.id} label={p.title}>
                  {p.modules.map((id) => (
                    <option key={id} value={id}>
                      {moduleById.get(id)?.title}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <fieldset className="filter">
            <legend>Schwierigkeit</legend>
            <div className="chip-row">
              {[1, 2, 3].map((d) => (
                <button key={d} type="button" className="toggle-chip" aria-pressed={diffs.includes(d)} onClick={() => setDiffs(toggle(diffs, d))}>
                  {DIFFICULTY_LABEL[d]}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="filter">
            <legend>Fragetyp</legend>
            <div className="chip-row">
              {TYPES.map((t) => (
                <button key={t} type="button" className="toggle-chip" aria-pressed={types.includes(t)} onClick={() => setTypes(toggle(types, t))}>
                  {QUESTION_TYPE_LABEL[t]}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="filter">
            <legend>Status</legend>
            <div className="segmented">
              {(
                [
                  ['alle', 'Alle'],
                  ['neu', 'Nur neue'],
                  ['falsch', 'Zuletzt falsch'],
                ] as const
              ).map(([v, label]) => (
                <button key={v} type="button" aria-pressed={status === v} onClick={() => setStatus(v)}>
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="filter">
            <legend>Anzahl</legend>
            <div className="segmented">
              {[10, 20, 40, 0].map((n) => (
                <button key={n} type="button" aria-pressed={count === n} onClick={() => setCount(n)}>
                  {n === 0 ? 'Alle' : n}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="filters__foot">
            <p className="filters__count" aria-live="polite">
              <strong>{available}</strong> passende Fragen
            </p>
            <button type="button" className="btn btn--primary btn--large" onClick={start} disabled={available === 0}>
              Runde starten
              <Icon name="arrowRight" size={18} />
            </button>
          </div>
        </section>
        <aside className="panel practice__aside" aria-labelledby="types-h">
          <h2 id="types-h" className="panel__title">
            Fragetypen wie in der Prüfung
          </h2>
          <ul className="type-list">
            <li>
              <strong>Einfach- und Mehrfachauswahl</strong> – bei Mehrfachauswahl steht im Text, wie viele Antworten richtig sind.
            </li>
            <li>
              <strong>Reihenfolge</strong> – Schritte aus „Aktionen“ in den Antwortbereich bringen (wie „Build list“).
            </li>
            <li>
              <strong>Zuordnung</strong> – Werte per Drag-and-drop oder Auswahlliste den Aussagen zuordnen.
            </li>
            <li>
              <strong>Code ergänzen</strong> – Lücken in Python-Code mit den richtigen SDK-Aufrufen füllen.
            </li>
            <li>
              <strong>Fallstudien</strong> – mehrere Fragen zu einem Szenario; das Szenario steht neben der Frage.
            </li>
          </ul>
          <p className="type-list__note">
            Punkte gibt es pro richtigem Teil, falsche Antworten kosten nichts – genau wie Microsoft die Bewertung beschreibt. Reihenfolgen zählen nur komplett richtig.
          </p>
          <Link to="/pruefung" className="link-inline">
            Lieber unter Prüfungsbedingungen? Zur Simulation
            <Icon name="chevronRight" size={16} />
          </Link>
        </aside>
      </div>
    </div>
  )
}

function PracticeSession({ search }: { search: string }) {
  const navigate = useNavigate()
  const { cards } = useProgress()
  // Freeze the question list for the whole session (answers change progress mid-run).
  const [list] = useState(() => selectQuestions(new URLSearchParams(search), cards))
  const mod = new URLSearchParams(search).get('modul')
  const title = mod ? (moduleById.get(mod)?.title ?? 'Übungsrunde') : 'Übungsrunde'
  return (
    <Session
      questions={list}
      title={title}
      exitTo={mod ? `/lernen/${mod}` : '/ueben'}
      onRestartWrong={(ids) => navigate(`/ueben/sitzung?ids=${ids.join(',')}&t=${Date.now()}`)}
    />
  )
}

export function Practice() {
  const { search, pathname } = useLocation()
  if (!pathname.endsWith('/sitzung')) return <Setup />
  return <PracticeSession key={search} search={search} />
}
