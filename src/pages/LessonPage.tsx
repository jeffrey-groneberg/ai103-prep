import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Icon } from '../components/Icon.tsx'
import { Diagram } from '../components/Diagram.tsx'
import { CodeBlock } from '../components/CodeBlock.tsx'
import { RichText } from '../components/RichText.tsx'
import { renderInline } from '../components/inline.tsx'
import { InlineQuestion } from '../components/InlineQuestion.tsx'
import { store, useProgress } from '../lib/store.ts'
import { MASTERY_LABELS, moduleStatus } from '../lib/progress.ts'
import { tx } from '../lib/i18n.ts'
import { learningPaths, moduleById } from '../content/course.ts'
import { bulletById } from '../content/domains.ts'
import { lessonByModule, orderedModules, questionsForModule, questions } from '../content/index.ts'
import { NotFound } from './NotFound.tsx'
import type { Question } from '../lib/types.ts'
import { moduleDomains } from '../lib/select.ts'

const SECTIONS = [
  { id: 'worum', label: 'Worum geht’s' },
  { id: 'bild', label: 'Das große Bild' },
  { id: 'konzepte', label: 'Kernkonzepte' },
  { id: 'vergleich', label: 'Welcher Dienst wofür' },
  { id: 'code', label: 'So sieht’s im Code aus' },
  { id: 'fallen', label: 'Prüfungsfallen' },
  { id: 'merke', label: 'Merksätze' },
  { id: 'quiz', label: 'Mini-Quiz' },
  { id: 'quellen', label: 'Quellen & offizielles Modul' },
]

export function LessonPage() {
  const { moduleId: rawId = '' } = useParams()
  const moduleId = decodeURIComponent(rawId).split('#')[0]
  const { hash, search } = useLocation()
  const navigate = useNavigate()
  const progress = useProgress()
  const { lang } = progress
  const mod = moduleById.get(moduleId)
  const lesson = lessonByModule.get(moduleId)
  const moduleQuestions = questionsForModule(moduleId)
  const quiz = pickQuiz(moduleQuestions)

  useEffect(() => {
    const section = new URLSearchParams(search).get('abschnitt') ?? (hash ? hash.slice(1) : decodeURIComponent(rawId).split('#')[1])
    if (!section) return
    const el = document.getElementById(section)
    el?.scrollIntoView({ block: 'start' })
  }, [hash, search, rawId, moduleId])

  // "Auf dieser Seite" marks the section being read, like Microsoft Learn: the last section whose
  // heading has passed a reading line a quarter down the window (below the top bar).
  const [activeSection, setActiveSection] = useState<string | null>(null)
  useEffect(() => {
    let frame = 0
    const update = () => {
      const line = 56 + window.innerHeight * 0.25
      const present = SECTIONS.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el)
      let current = present[0]?.id ?? null
      for (const el of present) if (el.getBoundingClientRect().top <= line) current = el.id
      if (present.length && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = present[present.length - 1].id
      setActiveSection(current)
    }
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [moduleId, lesson])

  if (!mod) return <NotFound />
  const status = moduleStatus(mod, questions, progress.cards, progress.lessonsRead)
  const index = orderedModules.findIndex((m) => m.id === mod.id)
  const prev = orderedModules[index - 1]
  const next = orderedModules[index + 1]
  const path = learningPaths.find((p) => p.id === mod.pathId)
  const sections = SECTIONS.filter((s) => (s.id === 'vergleich' ? lesson?.comparison : s.id === 'quiz' ? quiz.length > 0 : true))

  const finish = () => {
    store.markLessonRead(mod.id)
    navigate(moduleQuestions.length ? `/ueben/sitzung?modul=${mod.id}&neu=1` : '/')
  }

  return (
    <div className="page lesson">
      <nav className="breadcrumb" aria-label="Brotkrumen">
        <Link to="/lernen">Lernen</Link>
        <Icon name="chevronRight" size={14} />
        <span>{path?.title}</span>
        <Icon name="chevronRight" size={14} />
        <span aria-current="page">Modul {index + 1}</span>
      </nav>
      <header className="lesson-head">
        <h1 className="page-title">{mod.title}</h1>
        <p className="page-sub">
          Modul {index + 1} von {orderedModules.length} · ca. {mod.minutes} Min auf Learn · {moduleQuestions.length} Übungsfragen · {MASTERY_LABELS[status.mastery.level]}
        </p>
        <div className="lesson-head__chips">
          {moduleDomains(mod.skills).map((d) => (
            <span key={d} className={`domain-chip domain-${d}`}>
              {d}
            </span>
          ))}
          {mod.skills.map((s) => (
            <span key={s} className="skill-chip" title={bulletById.get(s)?.[lang === 'de' ? 'de' : 'en']}>
              {s}
            </span>
          ))}
        </div>
        <div className="lesson-head__actions">
          <a className="btn btn--secondary" href={mod.url} target="_blank" rel="noreferrer">
            <Icon name="open" size={16} />
            Offizielles Modul auf Learn
          </a>
          {moduleQuestions.length > 0 && (
            <Link className="btn btn--secondary" to={`/ueben/sitzung?modul=${mod.id}`}>
              <Icon name="practice" size={16} />
              {moduleQuestions.length} Fragen üben
            </Link>
          )}
          <button type="button" className={`btn btn--subtle${status.lessonRead ? ' is-on' : ''}`} onClick={() => store.markLessonRead(mod.id, !status.lessonRead)} aria-pressed={status.lessonRead}>
            <Icon name={status.lessonRead ? 'checkCircle' : 'check'} size={16} />
            {status.lessonRead ? 'Als gelesen markiert' : 'Als gelesen markieren'}
          </button>
        </div>
      </header>

      <div className="lesson__layout">
        <article className="lesson__body">
          {!lesson ? (
            <section className="lesson-section">
              <h2>Lektion folgt</h2>
              <p>Diese Lektion wird gerade auf Basis der aktuellen Microsoft-Learn-Dokumentation erstellt. Bis dahin: das offizielle Modul behandelt diese Einheiten:</p>
              <UnitList units={mod.units} url={mod.url} />
            </section>
          ) : (
            <>
              <section id="worum" className="lesson-section">
                <h2>Worum geht’s</h2>
                <RichText text={tx(lesson.summary, lang)} className="lesson-lead" />
                <div className="callout callout--exam">
                  <Icon name="target" size={20} />
                  <div>
                    <p className="callout__title">So wird’s geprüft</p>
                    <RichText text={tx(lesson.examFocus, lang)} />
                  </div>
                </div>
              </section>

              <section id="bild" className="lesson-section">
                <h2>Das große Bild</h2>
                {lesson.diagrams.map((d) => (
                  <Diagram key={d.id} diagram={d} lang={lang} />
                ))}
              </section>

              <section id="konzepte" className="lesson-section">
                <h2>Kernkonzepte</h2>
                <dl className="concepts">
                  {lesson.concepts.map((c) => (
                    <div key={c.term} className="concept">
                      <dt>{c.term}</dt>
                      <dd>{renderInline(tx(c.text, lang))}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {lesson.comparison && (
                <section id="vergleich" className="lesson-section">
                  <h2>Welcher Dienst wofür</h2>
                  <div className="table-wrap" tabIndex={0} role="region" aria-label={tx(lesson.comparison.title, lang)}>
                    <table className="compare">
                      <caption>{tx(lesson.comparison.title, lang)}</caption>
                      <thead>
                        <tr>
                          {lesson.comparison.columns.map((c, i) => (
                            <th key={i} scope="col">
                              {tx(c, lang)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {lesson.comparison.rows.map((row, ri) => (
                          <tr key={ri}>
                            {row.map((cell, ci) =>
                              ci === 0 ? (
                                <th key={ci} scope="row">
                                  {renderInline(tx(cell, lang))}
                                </th>
                              ) : (
                                <td key={ci}>{renderInline(tx(cell, lang))}</td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              <section id="code" className="lesson-section">
                <h2>So sieht’s im Code aus</h2>
                {lesson.code.map((c, i) => (
                  <div key={i} className="code-sample">
                    <h3>{tx(c.title, lang)}</h3>
                    <CodeBlock code={c.code} />
                    {c.notes.length > 0 && (
                      <ul className="code-notes">
                        {c.notes.map((n, ni) => (
                          <li key={ni}>{renderInline(tx(n, lang))}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>

              <section id="fallen" className="lesson-section">
                <h2>Prüfungsfallen</h2>
                <ul className="traps">
                  {lesson.traps.map((t, i) => (
                    <li key={i}>
                      <Icon name="warning" size={20} />
                      <span>{renderInline(tx(t, lang))}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section id="merke" className="lesson-section">
                <h2>Merksätze</h2>
                <ul className="takeaways">
                  {lesson.takeaways.map((t, i) => (
                    <li key={i}>
                      <Icon name="lightbulb" size={20} />
                      <span>{renderInline(tx(t, lang))}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {quiz.length > 0 && (
                <section id="quiz" className="lesson-section">
                  <h2>Mini-Quiz</h2>
                  <p className="section-sub">Drei Fragen aus der Fragenbank zu diesem Modul. Antworten zählen für deinen Fortschritt.</p>
                  {quiz.map((q, i) => (
                    <InlineQuestion key={q.id} q={q} seed={i + 1} />
                  ))}
                </section>
              )}

              <section id="quellen" className="lesson-section">
                <h2>Quellen & offizielles Modul</h2>
                <ul className="sources">
                  {lesson.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noreferrer">
                        {s.title}
                        <Icon name="open" size={14} />
                      </a>
                    </li>
                  ))}
                </ul>
                <h3 className="units-head">Einheiten des offiziellen Moduls</h3>
                <UnitList units={mod.units} url={mod.url} />
              </section>
            </>
          )}

          <div className="lesson-end">
            <button type="button" className="btn btn--primary btn--large" onClick={finish}>
              {moduleQuestions.length ? 'Lektion abschließen & Fragen üben' : 'Lektion abschließen'}
              <Icon name="arrowRight" size={18} />
            </button>
            <div className="lesson-end__nav">
              {prev && (
                <Link to={`/lernen/${prev.id}`} className="link-inline">
                  <Icon name="chevronLeft" size={16} />
                  {prev.title}
                </Link>
              )}
              {next && (
                <Link to={`/lernen/${next.id}`} className="link-inline">
                  {next.title}
                  <Icon name="chevronRight" size={16} />
                </Link>
              )}
            </div>
          </div>
        </article>

        <aside className="lesson__rail" aria-label="Auf dieser Seite">
          <div className="rail-box">
            <p className="rail-box__title">Auf dieser Seite</p>
            <ol className="toc">
              {lesson &&
                sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#/lernen/${mod.id}?abschnitt=${s.id}`}
                      className={activeSection === s.id ? 'is-active' : undefined}
                      aria-current={activeSection === s.id ? 'location' : undefined}
                      onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}>
                      {s.label}
                    </a>
                  </li>
                ))}
            </ol>
          </div>
          <div className="rail-box">
            <p className="rail-box__title">Skills aus dem Study Guide</p>
            <ul className="rail-skills">
              {mod.skills.map((s) => (
                <li key={s}>
                  <span className="skill-chip">{s}</span>
                  <span>{bulletById.get(s)?.[lang === 'de' ? 'de' : 'en']}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

function pickQuiz(moduleQuestions: Question[]): Question[] {
  const sorted = [...moduleQuestions].sort((a, b) => a.difficulty - b.difficulty)
  const pick: Question[] = []
  for (const d of [1, 2, 3]) {
    const q = sorted.find((x) => x.difficulty === d && !x.caseId && !pick.includes(x))
    if (q) pick.push(q)
  }
  for (const q of sorted) if (pick.length < 3 && !q.caseId && !pick.includes(q)) pick.push(q)
  return pick.slice(0, 3)
}

function UnitList({ units, url }: { units: string[]; url: string }) {
  return (
    <ol className="unit-list">
      {units.map((u) => (
        <li key={u}>{u}</li>
      ))}
      <li className="unit-list__link">
        <a href={url} target="_blank" rel="noreferrer">
          Modul auf Microsoft Learn öffnen (inkl. Knowledge Check)
          <Icon name="open" size={14} />
        </a>
      </li>
    </ol>
  )
}
