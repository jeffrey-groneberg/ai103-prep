import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { Icon } from '../components/Icon.tsx'
import { Explanation, QuestionView } from '../components/QuestionView.tsx'
import { store, useProgress, type ExamRecord, type ExamSession } from '../lib/store.ts'
import { buildExam, domainQuotas, EXAM_DEFAULTS, formatClock, summarizeExam } from '../lib/exam.ts'
import { emptyAnswer, isAnswerComplete, scoreQuestion } from '../lib/scoring.ts'
import { formatDate, tx } from '../lib/i18n.ts'
import { caseById, cases, questionById, questions } from '../content/index.ts'
import { domains, domainById } from '../content/domains.ts'

const LENGTHS = [
  { id: 'full', label: 'Vollständig', questions: EXAM_DEFAULTS.questions, minutes: EXAM_DEFAULTS.minutes },
  { id: 'half', label: 'Kompakt', questions: 25, minutes: 50 },
] as const

function Setup() {
  const { activeExam, exams } = useProgress()
  const navigate = useNavigate()
  const [length, setLength] = useState<(typeof LENGTHS)[number]['id']>('full')
  const cfg = LENGTHS.find((l) => l.id === length)!
  const quotas = domainQuotas(Math.min(cfg.questions, questions.length))

  const start = () => {
    const plan = buildExam(questions, cases, { total: cfg.questions, minutes: cfg.minutes })
    const session: ExamSession = {
      id: `exam-${Date.now()}`,
      startedAt: new Date().toISOString(),
      endsAt: Date.now() + plan.minutes * 60_000,
      questionIds: [...plan.questionIds, ...plan.caseQuestionIds],
      caseId: plan.caseId,
      caseQuestionIds: plan.caseQuestionIds,
      answers: {},
      marked: [],
      current: 0,
      minutes: plan.minutes,
    }
    store.startExam(session)
    navigate('/pruefung/laeuft')
  }

  return (
    <div className="page exam-setup">
      <header className="page-head">
        <h1 className="page-title">Prüfungssimulation</h1>
        <p className="page-sub">Wie am Prüfungstag: Zeitlimit, kein Feedback bis zur Abgabe, Fragen markieren und vor der Abgabe überprüfen.</p>
      </header>
      {activeExam && (
        <div className="callout callout--warn">
          <Icon name="exam" size={20} />
          <div>
            <p className="callout__title">Eine Simulation läuft noch</p>
            <p>
              Gestartet am {formatDate(activeExam.startedAt)} · {Object.keys(activeExam.answers).length} von {activeExam.questionIds.length} beantwortet.
            </p>
            <div className="callout__actions">
              <Link to="/pruefung/laeuft" className="btn btn--primary">
                Fortsetzen
              </Link>
              <button type="button" className="btn btn--subtle" onClick={() => store.abandonExam()}>
                Verwerfen
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="exam-setup__grid">
        <section className="panel" aria-labelledby="cfg-h">
          <h2 id="cfg-h" className="panel__title">
            Ablauf
          </h2>
          <div className="segmented segmented--wide" role="group" aria-label="Länge">
            {LENGTHS.map((l) => (
              <button key={l.id} type="button" aria-pressed={length === l.id} onClick={() => setLength(l.id)}>
                {l.label}: {l.questions} Fragen · {l.minutes} Min
              </button>
            ))}
          </div>
          <ul className="rules">
            <li>
              <Icon name="exam" size={20} />
              <span>
                <strong>{cfg.minutes} Minuten</strong>. Associate-Prüfungen ohne Labs dauern 100 Minuten; die meisten Prüfungen haben 40–60 Fragen.
              </span>
            </li>
            <li>
              <Icon name="grid" size={20} />
              <span>
                <strong>Nach Domains gewichtet</strong> (Mittelwert der offiziellen Spannen), breit über die Skills verteilt; eine <strong>Fallstudie</strong> kommt am Ende.
              </span>
            </li>
            <li>
              <Icon name="flag" size={20} />
              <span>
                <strong>Markieren & überprüfen</strong>: Fragen zur Überprüfung markieren und vor der Abgabe in der Übersicht ansteuern.
              </span>
            </li>
            <li>
              <Icon name="target" size={20} />
              <span>
                <strong>Punkte pro Teil</strong>, kein Abzug für falsche Antworten. Als Richtwert gilt hier <strong>70 %</strong> – die echte Prüfung meldet einen skalierten Wert (700 von 1000), der nicht 70 % der Punkte entsprechen muss.
              </span>
            </li>
          </ul>
          <button type="button" className="btn btn--primary btn--large" onClick={start}>
            Simulation starten
            <Icon name="arrowRight" size={18} />
          </button>
        </section>
        <section className="panel" aria-labelledby="dist-h">
          <h2 id="dist-h" className="panel__title">
            Verteilung dieser Simulation
          </h2>
          <ul className="dist">
            {domains.map((d) => (
              <li key={d.id} className="dist__row">
                <span className={`domain-chip domain-${d.id}`}>{d.id}</span>
                <span className="dist__name">{d.title.de}</span>
                <span className="dist__weight">
                  {d.weight[0]}–{d.weight[1]} %
                </span>
                <span className="dist__n">{quotas[d.id]} Fragen</span>
              </li>
            ))}
          </ul>
          <p className="muted small">
            Offizielle Gewichte laut Study Guide (Skills measured as of April 16, 2026). Prüfungsumgebung vorab testen:{' '}
            <a href="https://aka.ms/examdemo" target="_blank" rel="noreferrer">
              Exam Sandbox
            </a>
            .
          </p>
        </section>
      </div>
      {exams.length > 0 && (
        <section className="panel" aria-labelledby="hist-h">
          <h2 id="hist-h" className="panel__title">
            Bisherige Simulationen
          </h2>
          <ul className="history">
            {exams.map((e) => (
              <li key={e.id} className="history__row">
                <span className={`status-pill${e.summary.passed ? ' is-ok' : ' is-bad'}`}>{e.summary.passed ? 'Richtwert erreicht' : 'Unter Richtwert'}</span>
                <span className="history__date">{formatDate(e.finishedAt)}</span>
                <span className="history__score">
                  {e.summary.percent} % · {e.summary.correctCount}/{e.questionIds.length} richtig · {e.minutesUsed} Min
                </span>
                <Link to={`/pruefung/ergebnis/${e.id}`} className="link-inline">
                  Auswertung
                  <Icon name="chevronRight" size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

function Runner({ session }: { session: ExamSession }) {
  const { lang } = useProgress()
  const navigate = useNavigate()
  const [now, setNow] = useState(() => Date.now())
  const [overview, setOverview] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const remaining = Math.max(0, Math.round((session.endsAt - now) / 1000))
  const qid = session.questionIds[session.current]
  const q = questionById.get(qid)
  const inCase = session.caseQuestionIds.includes(qid)

  const submit = useCallback(() => {
    const scores: Record<string, number> = {}
    for (const id of session.questionIds) {
      const qq = questionById.get(id)
      if (qq) scores[id] = scoreQuestion(qq, session.answers[id]).score
    }
    const summary = summarizeExam(session.questionIds, questionById, session.answers)
    const record: ExamRecord = {
      id: session.id,
      finishedAt: new Date().toISOString(),
      minutesUsed: Math.min(session.minutes, Math.max(1, Math.ceil((Date.now() - new Date(session.startedAt).getTime()) / 60_000))),
      minutes: session.minutes,
      questionIds: session.questionIds,
      answers: session.answers,
      summary,
    }
    store.finishExam(record, scores)
    navigate(`/pruefung/ergebnis/${record.id}`, { replace: true })
  }, [session, navigate])

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (remaining === 0) submit()
  }, [remaining, submit])

  if (!q) return null
  const answered = (id: string) => {
    const qq = questionById.get(id)
    return qq ? isAnswerComplete(qq, session.answers[id]) : false
  }
  const marked = session.marked.includes(qid)
  const answeredCount = session.questionIds.filter(answered).length
  const go = (i: number) => {
    store.updateExam({ current: Math.max(0, Math.min(session.questionIds.length - 1, i)) })
    setOverview(false)
  }

  return (
    <div className="exam-run">
      <div className="exam-run__top">
        <div className="exam-run__top-inner">
          <span className="exam-run__title">Prüfungssimulation{inCase ? ' · Fallstudie' : ''}</span>
          <span className="exam-run__pos">
            Frage {session.current + 1} von {session.questionIds.length}
          </span>
          <span className={`exam-run__clock${remaining < 600 ? ' is-low' : ''}`} role="timer" aria-label={`Verbleibende Zeit ${formatClock(remaining)}`}>
            <Icon name="exam" size={18} />
            {formatClock(remaining)}
          </span>
          <button type="button" className="btn btn--secondary btn--small" onClick={() => setOverview((o) => !o)} aria-pressed={overview}>
            <Icon name="grid" size={16} />
            Übersicht
          </button>
        </div>
      </div>

      {overview ? (
        <section className="exam-overview panel" aria-labelledby="ov-h">
          <h2 id="ov-h" className="panel__title">
            Übersicht
          </h2>
          <p className="muted">
            {answeredCount} von {session.questionIds.length} beantwortet · {session.marked.length} markiert. Wähle eine Frage, um zu ihr zu springen.
          </p>
          <ol className="ov-grid">
            {session.questionIds.map((id, i) => (
              <li key={id}>
                <button
                  type="button"
                  className={`ov-cell${answered(id) ? ' is-answered' : ''}${session.marked.includes(id) ? ' is-marked' : ''}${i === session.current ? ' is-current' : ''}`}
                  onClick={() => go(i)}
                  aria-label={`Frage ${i + 1}${answered(id) ? ', beantwortet' : ', offen'}${session.marked.includes(id) ? ', markiert' : ''}`}
                >
                  {i + 1}
                  {session.marked.includes(id) && <Icon name="flagFilled" size={12} />}
                </button>
              </li>
            ))}
          </ol>
          <ul className="ov-legend">
            <li>
              <span className="ov-cell is-answered" aria-hidden="true" />
              Beantwortet
            </li>
            <li>
              <span className="ov-cell" aria-hidden="true" />
              Offen
            </li>
            <li>
              <span className="ov-cell is-marked" aria-hidden="true" />
              Markiert
            </li>
          </ul>
          {!confirm ? (
            <button type="button" className="btn btn--primary btn--large" onClick={() => setConfirm(true)}>
              Prüfung abgeben
            </button>
          ) : (
            <div className="callout callout--warn">
              <Icon name="warning" size={20} />
              <div>
                <p className="callout__title">Wirklich abgeben?</p>
                <p>
                  {session.questionIds.length - answeredCount > 0
                    ? `${session.questionIds.length - answeredCount} Fragen sind noch offen und zählen 0 Punkte.`
                    : 'Alle Fragen sind beantwortet.'}
                </p>
                <div className="callout__actions">
                  <button type="button" className="btn btn--primary" onClick={submit}>
                    Jetzt abgeben
                  </button>
                  <button type="button" className="btn btn--subtle" onClick={() => setConfirm(false)}>
                    Weiter bearbeiten
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      ) : (
        <div className="exam-run__body">
          <QuestionView
            key={qid}
            question={q}
            lang={lang}
            answer={session.answers[qid] ?? emptyAnswer(q)}
            onChange={(a) => store.updateExam({ answers: { ...session.answers, [qid]: a } })}
            revealed={false}
            seed={7}
            caseStudy={q.caseId ? caseById.get(q.caseId) : undefined}
            examMode
          />
        </div>
      )}

      {!overview && (
        <div className="exam-run__bar">
          <div className="exam-run__bar-inner">
            <button type="button" className="btn btn--secondary" onClick={() => go(session.current - 1)} disabled={session.current === 0}>
              <Icon name="chevronLeft" size={16} />
              Zurück
            </button>
            <button
              type="button"
              className={`btn btn--subtle${marked ? ' is-on' : ''}`}
              aria-pressed={marked}
              onClick={() => store.updateExam({ marked: marked ? session.marked.filter((m) => m !== qid) : [...session.marked, qid] })}
            >
              <Icon name={marked ? 'flagFilled' : 'flag'} size={16} />
              {marked ? 'Markiert' : 'Zur Überprüfung markieren'}
            </button>
            {session.current < session.questionIds.length - 1 ? (
              <button type="button" className="btn btn--primary" onClick={() => go(session.current + 1)}>
                Weiter
                <Icon name="chevronRight" size={16} />
              </button>
            ) : (
              <button type="button" className="btn btn--primary" onClick={() => setOverview(true)}>
                Zur Übersicht
                <Icon name="chevronRight" size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Results({ record }: { record: ExamRecord }) {
  const { lang } = useProgress()
  const navigate = useNavigate()
  const s = record.summary
  const wrongIds = record.questionIds.filter((id) => {
    const q = questionById.get(id)
    return q ? !scoreQuestion(q, record.answers[id]).correct : false
  })
  const simulated = Math.round(s.percent * 10)
  return (
    <div className="page exam-results">
      <header className="page-head">
        <h1 className="page-title">{s.passed ? `Richtwert erreicht: ${s.percent} % der Punkte` : `Noch unter dem Richtwert: ${s.percent} % der Punkte`}</h1>
        <p className="page-sub">
          {formatDate(record.finishedAt)} · {s.correctCount} von {record.questionIds.length} Fragen vollständig richtig · {record.minutesUsed} von {record.minutes} Minuten · linear umgerechnet {simulated}/1000 (kein offizieller Skalenwert)
        </p>
      </header>
      <section className="panel" aria-labelledby="sr-h">
        <h2 id="sr-h" className="panel__title">
          Leistung nach Bereich
        </h2>
        <div className="score-line" aria-hidden="true">
          <span className="score-line__fill" style={{ width: `${s.percent}%` }} />
          <span className="score-line__mark" style={{ left: '70%' }}>
            70 %
          </span>
        </div>
        <ul className="report-bars">
          {s.byDomain.map((d) => {
            const dom = domainById.get(d.domain)!
            return (
              <li key={d.domain} className="report-bars__row">
                <span className="report-bars__name">
                  {dom.title.de}
                  <span className="muted small">
                    {' '}
                    · {d.possible} Fragen · Gewicht {dom.weight[0]}–{dom.weight[1]} %
                  </span>
                </span>
                <div className="meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={d.percent} aria-label={`${dom.short.de}: ${d.percent} %`}>
                  <span className={`meter__fill bg-${d.domain}`} style={{ width: `${d.percent}%` }} />
                </div>
                <span className="report-bars__pct">{d.possible ? `${d.percent} %` : '–'}</span>
              </li>
            )
          })}
        </ul>
        <p className="muted small">
          Wie im offiziellen Score Report: Längere Balken zeigen Stärken, kürzere Schwächen. Bereiche mit wenigen Fragen schwanken stark.
        </p>
        <div className="callout__actions">
          {wrongIds.length > 0 && (
            <button type="button" className="btn btn--primary" onClick={() => navigate(`/ueben/sitzung?ids=${wrongIds.join(',')}&t=${Date.now()}`)}>
              {wrongIds.length} falsche Fragen üben
            </button>
          )}
          <Link to="/pruefung" className="btn btn--secondary">
            Neue Simulation
          </Link>
        </div>
      </section>
      <section className="panel" aria-labelledby="rv-h">
        <h2 id="rv-h" className="panel__title">
          Alle Fragen mit Auflösung
        </h2>
        <ol className="result-list">
          {record.questionIds.map((id, i) => {
            const q = questionById.get(id)
            if (!q) return null
            const answer = record.answers[id] ?? emptyAnswer(q)
            const r = scoreQuestion(q, answer)
            return (
              <li key={id}>
                <details className={`result-item${r.correct ? ' is-correct' : ' is-wrong'}`}>
                  <summary>
                    <Icon name={r.correct ? 'checkCircle' : 'dismissCircle'} size={20} />
                    <span className="result-item__num">{i + 1}</span>
                    <span className={`domain-chip domain-${q.domain}`}>{q.domain}</span>
                    <span className="result-item__stem" lang={lang}>{tx(q.stem, lang).replace(/[`*]/g, '')}</span>
                    {!r.correct && r.score > 0 && <span className="tag">{Math.round(r.score * 100)} %</span>}
                  </summary>
                  <div className="result-item__body">
                    <QuestionView question={q} lang={lang} answer={answer} onChange={() => undefined} revealed seed={7} caseStudy={q.caseId ? caseById.get(q.caseId) : undefined} />
                    <Explanation q={q} lang={lang} answer={answer} />
                  </div>
                </details>
              </li>
            )
          })}
        </ol>
      </section>
    </div>
  )
}

export function Exam() {
  const { pathname } = useLocation()
  const { examId } = useParams()
  const { activeExam, exams } = useProgress()
  const record = useMemo(() => exams.find((e) => e.id === examId), [exams, examId])

  if (pathname.startsWith('/pruefung/ergebnis')) {
    if (!record)
      return (
        <div className="page">
          <p>Diese Auswertung gibt es nicht (mehr).</p>
          <Link to="/pruefung">Zur Prüfungssimulation</Link>
        </div>
      )
    return <Results record={record} />
  }
  if (pathname.startsWith('/pruefung/laeuft')) {
    if (!activeExam) return <Setup />
    return <Runner session={activeExam} />
  }
  return <Setup />
}
