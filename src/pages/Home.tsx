import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon.tsx'
import { Diagram } from '../components/Diagram.tsx'
import { useProgress } from '../lib/store.ts'
import { domainMastery, dueQuestions, moduleStatus, nextModule, type ModuleStatus, type ModuleStep } from '../lib/progress.ts'
import { DOMAIN_ICON, plural, tx } from '../lib/i18n.ts'
import { lessonByModule, orderedModules, questions } from '../content/index.ts'
import { learningPaths, moduleById } from '../content/course.ts'
import { domains } from '../content/domains.ts'
import { DOMAIN_IDS, EXAM_DEFAULTS } from '../lib/exam.ts'

const STEPS: Array<{ id: Exclude<ModuleStep, 'done'>; label: string }> = [
  { id: 'lesson', label: 'Lektion' },
  { id: 'questions', label: 'Fragen' },
  { id: 'review', label: 'Wiederholung' },
]

function Stepper({ step }: { step: ModuleStep }) {
  const idx = step === 'done' ? 3 : STEPS.findIndex((s) => s.id === step)
  return (
    <ol className="stepper" aria-label="Schritte im Modul">
      {STEPS.map((s, i) => {
        const state = i < idx ? 'is-done' : i === idx ? 'is-current' : ''
        return (
          <li key={s.id} className={`stepper__item ${state}`} aria-current={i === idx ? 'step' : undefined}>
            <span className="stepper__dot">{i < idx ? <Icon name="check" size={14} /> : i + 1}</span>
            <span className="stepper__label">{s.label}</span>
          </li>
        )
      })}
    </ol>
  )
}

function stationState(s: ModuleStatus, isNext: boolean) {
  if (s.step === 'done') return 'is-done'
  if (isNext) return 'is-next'
  if (s.lessonRead || s.attempted > 0) return 'is-started'
  return ''
}

function NextCard({ status }: { status: ModuleStatus | null }) {
  const { lang } = useProgress()
  if (!status) {
    return (
      <section className="panel next-card" aria-labelledby="next-h">
        <h2 id="next-h" className="panel__title">
          Als Nächstes dran
        </h2>
        <h3 className="next-card__module">Alle 31 Module sind durchgearbeitet.</h3>
        <p className="next-card__meta">Halte dein Wissen mit fälligen Wiederholungen frisch und teste dich unter Prüfungsbedingungen.</p>
        <div className="next-card__actions">
          <Link to="/pruefung" className="btn btn--primary btn--large">
            Prüfungssimulation starten
            <Icon name="arrowRight" size={18} />
          </Link>
          <a className="btn btn--secondary btn--large" href="http://aka.ms/AI103-PA" target="_blank" rel="noreferrer">
            Offizielles Practice Assessment
            <Icon name="open" size={16} />
          </a>
        </div>
      </section>
    )
  }
  const m = status.module
  const index = orderedModules.findIndex((x) => x.id === m.id) + 1
  const path = learningPaths.find((p) => p.id === m.pathId)
  const lesson = lessonByModule.get(m.id)
  const primary =
    status.step === 'lesson'
      ? { to: `/lernen/${m.id}`, label: 'Lektion starten' }
      : status.step === 'questions'
        ? { to: `/ueben/sitzung?modul=${m.id}&neu=1`, label: `${plural(status.total - status.attempted, 'Frage', 'Fragen')} üben` }
        : { to: `/wiederholen/sitzung?modul=${m.id}`, label: `${plural(status.wrongOpen, 'Fehler', 'Fehler')} wiederholen` }
  return (
    <section className="panel next-card" aria-labelledby="next-h">
      <h2 id="next-h" className="panel__title">
        Als Nächstes dran
      </h2>
      <h3 className="next-card__module">
        <Link to={`/lernen/${m.id}`}>{m.title}</Link>
      </h3>
      <p className="next-card__meta">
        Modul {index} von {orderedModules.length} · {path?.title} · ca. {m.minutes} Min auf Learn
      </p>
      <Stepper step={status.step} />
      <div className="next-card__body">
        {lesson?.diagrams[0] && (
          <Link to={`/lernen/${m.id}?abschnitt=bild`} className="next-card__thumb" aria-label={`Diagramm ansehen: ${tx(lesson.diagrams[0].title, lang)}`}>
            <Diagram diagram={lesson.diagrams[0]} lang={lang} mini />
          </Link>
        )}
        <p className="next-card__summary">{lesson ? firstSentences(tx(lesson.summary, lang)) : 'Die Lektion für dieses Modul wird gerade vorbereitet.'}</p>
      </div>
      <div className="next-card__actions">
        <Link to={primary.to} className="btn btn--primary btn--large">
          {primary.label}
          <Icon name="arrowRight" size={18} />
        </Link>
        {status.step === 'lesson' && status.total > 0 && (
          <Link to={`/ueben/sitzung?modul=${m.id}`} className="btn btn--secondary btn--large">
            Direkt zu den Fragen
          </Link>
        )}
      </div>
    </section>
  )
}

function firstSentences(text: string, max = 240): string {
  const plain = text.replace(/\*\*|\*|`/g, '')
  const first = plain.split(/(?<=[.!?])\s+/)[0] ?? plain
  if (first.length <= max) return first
  const cut = first.slice(0, max)
  const clause = Math.max(cut.lastIndexOf(', '), cut.lastIndexOf('; '), cut.lastIndexOf(': '), cut.lastIndexOf(' – '), cut.lastIndexOf(' — '))
  const end = clause > max * 0.6 ? clause : cut.lastIndexOf(' ')
  return `${cut.slice(0, end)} …`
}

/** Keeps the side column sticky only while it fits the window, so nothing ends up out of reach. */
function useStickyWhenFits() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => el.classList.toggle('is-sticky', window.innerWidth > 1100 && el.offsetHeight + 84 <= window.innerHeight)
    update()
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update)
    observer?.observe(el)
    window.addEventListener('resize', update)
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])
  return ref
}

export function Home() {
  const sideRef = useStickyWhenFits()
  const progress = useProgress()
  const { cards, lessonsRead, exams } = progress
  const statuses = new Map(orderedModules.map((m) => [m.id, moduleStatus(m, questions, cards, lessonsRead)]))
  const next = nextModule(orderedModules, questions, cards, lessonsRead)
  const due = dueQuestions(questions, cards)
  const doneCount = [...statuses.values()].filter((s) => s.step === 'done').length
  const lastExam = exams[0]
  const dueByDomain = DOMAIN_IDS.map((d) => ({ d, n: due.filter((q) => q.domain === d).length }))

  return (
    <div className="page home">
      <h1 className="sr-only">Dein Lernpfad zu AI-103</h1>

      <div className="home__grid">
        <section className="panel path-panel" aria-labelledby="path-h">
          <div className="path-panel__head">
            <h2 id="path-h" className="panel__title">
              Lernpfad
            </h2>
            <p className="path-panel__meta">
              Kurs AI-103T00 · {orderedModules.length} Module · {questions.length} Fragen · {doneCount} von {orderedModules.length} abgeschlossen
            </p>
          </div>
          {learningPaths.map((p) => (
            <div key={p.id} className="path-group">
              <h3 className="path-group__title">{p.title}</h3>
              <ol className="stations">
                {p.modules.map((id) => {
                  const s = statuses.get(id)!
                  const isNext = next?.module.id === id
                  const st = stationState(s, isNext)
                  const index = orderedModules.findIndex((x) => x.id === id) + 1
                  return (
                    <li key={id} className={`station ${st}`}>
                      <span className="station__dot" aria-hidden="true">
                        {s.step === 'done' && <Icon name="check" size={14} />}
                      </span>
                      <div className="station__body">
                        <Link to={`/lernen/${id}`} className="station__title">
                          {moduleById.get(id)?.title}
                        </Link>
                        <span className="station__meta">
                          Modul {index} · {plural(s.total, 'Frage', 'Fragen')}
                          {s.attempted > 0 && ` · ${s.attempted}/${s.total} beantwortet`}
                          {isNext && <span className="tag tag--brand">Als Nächstes</span>}
                          {s.step === 'done' && <span className="sr-only"> · abgeschlossen</span>}
                        </span>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          ))}
        </section>

        <div className="home__side" ref={sideRef}>
          <NextCard status={next} />

          <div className="home__pair">
          <section className="panel today" aria-labelledby="today-h">
            <h2 id="today-h" className="panel__title">
              Heute
            </h2>
            <ul className="today__list">
              <li className="today__item">
                <Icon name="review" size={22} className="today__icon" />
                <div className="today__text">
                  <h3 className="today__title">Fällige Wiederholungen</h3>
                  <p className="today__meta">{due.length ? plural(due.length, 'Frage', 'Fragen') + ' fällig' : 'Nichts fällig – beantwortete Fragen kommen hier zurück.'}</p>
                  {due.length > 0 && (
                    <>
                      <div className="stackbar" aria-hidden="true">
                        {dueByDomain
                          .filter((x) => x.n > 0)
                          .map((x) => (
                            <span key={x.d} className={`stackbar__seg bg-${x.d}`} style={{ flexGrow: x.n }} />
                          ))}
                      </div>
                      <ul className="due-legend" aria-label="Fällig nach Domäne">
                        {dueByDomain
                          .filter((x) => x.n > 0)
                          .map((x) => (
                            <li key={x.d}>
                              <span className={`due-legend__dot bg-${x.d}`} aria-hidden="true" />
                              {domains.find((d) => d.id === x.d)?.short.de}
                              <strong>{x.n}</strong>
                            </li>
                          ))}
                      </ul>
                    </>
                  )}
                </div>
                <Link to="/wiederholen" className={`btn btn--small ${due.length ? 'btn--primary' : 'btn--secondary'}`}>
                  Wiederholen
                </Link>
              </li>
              <li className="today__item">
                <Icon name="practice" size={22} className="today__icon" />
                <div className="today__text">
                  <h3 className="today__title">Kurze Runde</h3>
                  <p className="today__meta">10 gemischte Fragen, sofortiges Feedback</p>
                </div>
                <Link to="/ueben/sitzung?runde=10" className="btn btn--small btn--secondary">
                  Starten
                </Link>
              </li>
              <li className="today__item">
                <Icon name="exam" size={22} className="today__icon" />
                <div className="today__text">
                  <h3 className="today__title">Prüfungssimulation</h3>
                  <p className="today__meta">
                    {EXAM_DEFAULTS.questions} Fragen · {EXAM_DEFAULTS.minutes} Min
                    {lastExam && ` · zuletzt ${lastExam.summary.percent} %`}
                  </p>
                </div>
                <Link to="/pruefung" className="btn btn--small btn--secondary">
                  Simulation
                </Link>
              </li>
            </ul>
          </section>

          <section className="panel readiness" aria-labelledby="ready-h">
            <div className="panel__head">
              <h2 id="ready-h" className="panel__title">
                Prüfungsbereitschaft
              </h2>
              <Link to="/fortschritt" className="link-inline">
                Skills-Landkarte
                <Icon name="chevronRight" size={16} />
              </Link>
            </div>
            <ul className="readiness__list">
              {domains.map((d) => {
                const m = domainMastery(d.id, questions, cards)
                const pct = Math.round(m.value * 100)
                return (
                  <li key={d.id} className="readiness__row">
                    <Icon name={DOMAIN_ICON[d.id]} size={20} className={`ink-${d.id}`} />
                    <div className="readiness__label">
                      <span className="readiness__name">{d.short.de}</span>
                      <span className="readiness__weight">
                        {d.weight[0]}–{d.weight[1]} %<span className="sr-only"> der Prüfung</span>
                      </span>
                    </div>
                    <div className="meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={`${d.short.de}: ${pct} % gefestigt`}>
                      <span className={`meter__fill bg-${d.id}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="readiness__pct">{m.attempted ? `${pct} %` : '–'}</span>
                  </li>
                )
              })}
            </ul>
            <p className="readiness__note">Gefestigt = über Wiederholungen hinweg richtig beantwortet (Leitner-Boxen), nicht bloß angeklickt.</p>
          </section>
          </div>
        </div>
      </div>
    </div>
  )
}
