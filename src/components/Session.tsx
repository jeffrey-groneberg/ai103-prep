import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { Question } from '../lib/types.ts'
import { emptyAnswer, isAnswerComplete, scoreQuestion, type Answer } from '../lib/scoring.ts'
import { store, useProgress } from '../lib/store.ts'
import { caseById } from '../content/index.ts'
import { moduleById } from '../content/course.ts'
import { Explanation, QuestionView } from './QuestionView.tsx'
import { Icon } from './Icon.tsx'
import { tx } from '../lib/i18n.ts'

interface SessionProps {
  questions: Question[]
  title: string
  /** Where "Beenden" leads. */
  exitTo: string
  onRestartWrong?: (ids: string[]) => void
}

interface Result {
  id: string
  score: number
}

export function Session({ questions, title, exitTo, onRestartWrong }: SessionProps) {
  const { lang } = useProgress()
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [revealed, setRevealed] = useState(false)
  const [results, setResults] = useState<Result[]>([])
  const [seed] = useState(() => Math.floor(Math.random() * 1e9))
  const q = questions[index]
  const answer = q ? (answers[q.id] ?? emptyAnswer(q)) : undefined
  const finished = index >= questions.length

  if (!questions.length) {
    return (
      <div className="session-empty panel">
        <h2 className="panel__title">Keine passenden Fragen</h2>
        <p>Für diese Auswahl gibt es (noch) keine Fragen. Ändere die Filter oder wähle ein anderes Modul.</p>
        <Link to={exitTo} className="btn btn--primary">
          Zurück
        </Link>
      </div>
    )
  }

  if (finished) {
    const correct = results.filter((r) => r.score >= 1).length
    const wrong = results.filter((r) => r.score < 1)
    const pct = Math.round((results.reduce((a, r) => a + r.score, 0) / results.length) * 100)
    return (
      <div className="session-done">
        <div className="panel session-done__panel">
          <h1 className="page-title">Runde geschafft</h1>
          <p className="session-done__score">
            <strong>{correct}</strong> von {results.length} vollständig richtig · {pct} % der Punkte
          </p>
          <div className="meter meter--large" aria-hidden="true">
            <span className="meter__fill bg-ok" style={{ width: `${pct}%` }} />
          </div>
          {wrong.length > 0 && (
            <>
              <h2 className="panel__title">Zum Wiederholen vorgemerkt</h2>
              <ul className="wrong-list">
                {wrong.map((r) => {
                  const wq = questions.find((x) => x.id === r.id)!
                  return (
                    <li key={r.id}>
                      <Icon name="dismissCircle" size={18} className="ink-bad" />
                      <span className="wrong-list__stem">{tx(wq.stem, lang).replace(/[`*]/g, '')}</span>
                      <Link to={`/lernen/${wq.module}`} className="link-inline">
                        {moduleById.get(wq.module)?.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </>
          )}
          <div className="session-done__actions">
            {wrong.length > 0 && onRestartWrong && (
              <button type="button" className="btn btn--primary btn--large" onClick={() => onRestartWrong(wrong.map((w) => w.id))}>
                {wrong.length} Fehler sofort wiederholen
              </button>
            )}
            <Link to="/" className={`btn ${wrong.length ? 'btn--secondary' : 'btn--primary'} btn--large`}>
              Zur Startseite
            </Link>
            <Link to={exitTo} className="btn btn--subtle btn--large">
              Neue Runde
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const result = revealed && answer ? scoreQuestion(q, answer) : null
  const check = () => {
    if (!answer) return
    const r = scoreQuestion(q, answer)
    store.recordAnswer(q.id, r.score)
    setResults((prev) => [...prev, { id: q.id, score: r.score }])
    setRevealed(true)
  }
  const next = () => {
    setRevealed(false)
    setIndex((i) => i + 1)
  }

  return (
    <div className="session">
      <div className="session__top">
        <button type="button" className="icon-btn icon-btn--large" onClick={() => navigate(exitTo)} aria-label="Runde beenden">
          <Icon name="dismiss" size={22} />
        </button>
        <div className="session__progress" role="progressbar" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={index} aria-label={`${title}: Frage ${index + 1} von ${questions.length}`}>
          <span style={{ width: `${(index / questions.length) * 100}%` }} />
        </div>
        <span className="session__count">
          {index + 1}/{questions.length}
        </span>
      </div>
      <div className="session__body">
        <QuestionView
          key={q.id}
          question={q}
          lang={lang}
          answer={answer!}
          onChange={(a) => setAnswers((prev) => ({ ...prev, [q.id]: a }))}
          revealed={revealed}
          seed={seed}
          caseStudy={q.caseId ? caseById.get(q.caseId) : undefined}
        />
        {revealed && answer && <Explanation q={q} lang={lang} answer={answer} />}
      </div>
      <div className={`session__bar${result ? (result.correct ? ' is-correct' : ' is-wrong') : ''}`}>
        <div className="session__bar-inner">
          {result ? (
            <p className="session__verdict" role="status">
              <Icon name={result.correct ? 'checkCircle' : 'dismissCircle'} size={28} />
              <span>
                <strong>{result.correct ? 'Richtig!' : result.score > 0 ? 'Teilweise richtig' : 'Nicht ganz'}</strong>
                <span className="session__verdict-sub">{result.correct ? 'Die Frage rückt eine Box weiter.' : 'Sie kommt in deine Wiederholungen.'}</span>
              </span>
            </p>
          ) : (
            <p className="session__hint">{isAnswerComplete(q, answer) ? 'Bereit zum Prüfen.' : 'Wähle deine Antwort.'}</p>
          )}
          {result ? (
            <button type="button" className="btn btn--primary btn--large" onClick={next} autoFocus>
              {index + 1 < questions.length ? 'Weiter' : 'Auswertung'}
              <Icon name="arrowRight" size={18} />
            </button>
          ) : (
            <button type="button" className="btn btn--primary btn--large" onClick={check} disabled={!isAnswerComplete(q, answer)}>
              Prüfen
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
