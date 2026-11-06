import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Session } from '../components/Session.tsx'
import { Icon } from '../components/Icon.tsx'
import { useProgress } from '../lib/store.ts'
import { dueQuestions, wrongQuestions } from '../lib/progress.ts'
import { BOX_INTERVAL_DAYS, MAX_BOX } from '../lib/srs.ts'
import { DOMAIN_IDS } from '../lib/exam.ts'
import { plural, relativeDue, tx } from '../lib/i18n.ts'
import { questionById, questions } from '../content/index.ts'
import { moduleById } from '../content/course.ts'
import { domainById } from '../content/domains.ts'

function ReviewSession({ search }: { search: string }) {
  const { cards } = useProgress()
  const navigate = useNavigate()
  const [list] = useState(() => {
    const p = new URLSearchParams(search)
    const mod = p.get('modul')
    if (p.get('falsch') === '1') return wrongQuestions(questions, cards)
    const due = dueQuestions(questions, cards)
    if (mod) {
      const own = questions.filter((q) => q.module === mod && cards[q.id] && cards[q.id]!.box <= 1)
      return own.length ? own : due.filter((q) => q.module === mod)
    }
    return due
  })
  return (
    <Session
      questions={list}
      title="Wiederholung"
      exitTo="/wiederholen"
      onRestartWrong={(ids) => navigate(`/ueben/sitzung?ids=${ids.join(',')}&t=${Date.now()}`)}
    />
  )
}

export function Review() {
  const { pathname, search } = useLocation()
  const { cards, lang } = useProgress()
  const [now] = useState(() => Date.now())
  if (pathname.endsWith('/sitzung')) return <ReviewSession key={search} search={search} />

  const due = dueQuestions(questions, cards)
  const wrong = wrongQuestions(questions, cards)
  const boxes = Array.from({ length: MAX_BOX }, (_, i) => questions.filter((q) => cards[q.id]?.box === i + 1).length)
  const maxBox = Math.max(1, ...boxes)
  const upcoming = Object.entries(cards)
    .filter(([id, c]) => questionById.has(id) && new Date(c.due).getTime() > now)
    .sort((a, b) => a[1].due.localeCompare(b[1].due))
    .slice(0, 6)

  return (
    <div className="page review">
      <header className="page-head">
        <h1 className="page-title">Wiederholen</h1>
        <p className="page-sub">
          Spaced Repetition nach dem Leitner-Prinzip: Falsche Antworten kommen sofort zurück, richtige wandern eine Box weiter und kommen nach 1, 3, 7 und 21 Tagen wieder.
        </p>
      </header>

      <div className="review__grid">
        <section className="panel due-panel" aria-labelledby="due-h">
          <h2 id="due-h" className="panel__title">
            Jetzt fällig
          </h2>
          {due.length ? (
            <>
              <p className="due-panel__count">
                <strong>{due.length}</strong> {due.length === 1 ? 'Frage wartet' : 'Fragen warten'} auf dich
              </p>
              <ul className="due-panel__domains">
                {DOMAIN_IDS.map((d) => {
                  const n = due.filter((q) => q.domain === d).length
                  if (!n) return null
                  return (
                    <li key={d}>
                      <span className={`legend-dot bg-${d}`} aria-hidden="true" />
                      {domainById.get(d)?.short.de}
                      <strong>{n}</strong>
                    </li>
                  )
                })}
              </ul>
              <Link to="/wiederholen/sitzung" className="btn btn--primary btn--large">
                {plural(due.length, 'Frage', 'Fragen')} wiederholen
                <Icon name="arrowRight" size={18} />
              </Link>
            </>
          ) : (
            <div className="empty">
              <Icon name="checkCircle" size={28} className="ink-ok" />
              <p>
                Nichts fällig. {Object.keys(cards).length ? 'Deine nächste Wiederholung ist unten geplant.' : 'Beantworte Fragen im Lernpfad – was du falsch beantwortest, landet automatisch hier.'}
              </p>
              <Link to="/" className="btn btn--secondary">
                Zum Lernpfad
              </Link>
            </div>
          )}
        </section>

        <section className="panel boxes-panel" aria-labelledby="boxes-h">
          <h2 id="boxes-h" className="panel__title">
            Deine Leitner-Boxen
          </h2>
          <ol className="boxes" aria-label="Fragen pro Box">
            {boxes.map((n, i) => (
              <li key={i} className="boxes__col">
                <span className="boxes__count">{n}</span>
                <span className="boxes__bar" style={{ height: `${Math.max(4, (n / maxBox) * 120)}px` }} aria-hidden="true" />
                <span className="boxes__label">Box {i + 1}</span>
                <span className="boxes__interval">{i === 0 ? 'sofort' : `${BOX_INTERVAL_DAYS[i + 1]} T`}</span>
              </li>
            ))}
          </ol>
          <p className="boxes__note">Neue Fragen starten nach der ersten richtigen Antwort in Box 2. Jeder Fehler setzt eine Frage auf Box 1 zurück.</p>
          {upcoming.length > 0 && (
            <>
              <h3 className="subhead">Als Nächstes geplant</h3>
              <ul className="upcoming">
                {upcoming.map(([id, c]) => {
                  const q = questionById.get(id)!
                  return (
                    <li key={id}>
                      <span className={`domain-chip domain-${q.domain}`}>{q.domain}</span>
                      <span className="upcoming__stem" lang={lang}>{tx(q.stem, lang).replace(/[`*]/g, '')}</span>
                      <span className="upcoming__due">{relativeDue(c.due)}</span>
                    </li>
                  )
                })}
              </ul>
            </>
          )}
        </section>

        <section className="panel wrong-panel" aria-labelledby="wrong-h">
          <div className="panel__head">
            <h2 id="wrong-h" className="panel__title">
              Zuletzt falsch beantwortet
            </h2>
            {wrong.length > 0 && (
              <Link to="/wiederholen/sitzung?falsch=1" className="btn btn--secondary">
                Alle {wrong.length} üben
              </Link>
            )}
          </div>
          {wrong.length ? (
            <ul className="wrong-list">
              {wrong.slice(0, 12).map((q) => (
                <li key={q.id}>
                  <Icon name="dismissCircle" size={18} className="ink-bad" />
                  <span className="wrong-list__stem" lang={lang}>{tx(q.stem, lang).replace(/[`*]/g, '')}</span>
                  <Link to={`/lernen/${q.module}`} className="link-inline">
                    {moduleById.get(q.module)?.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">Keine offenen Fehler.</p>
          )}
        </section>
      </div>
    </div>
  )
}
