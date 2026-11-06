import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon.tsx'
import { useProgress } from '../lib/store.ts'
import { MASTERY_LABELS, moduleStatus } from '../lib/progress.ts'
import { learningPaths, moduleById, COURSE_URL } from '../content/course.ts'
import { lessonByModule, orderedModules, questions } from '../content/index.ts'
import { moduleDomains } from '../lib/select.ts'

export function Learn() {
  const { cards, lessonsRead } = useProgress()
  return (
    <div className="page learn">
      <header className="page-head">
        <h1 className="page-title">Lernen</h1>
        <p className="page-sub">
          Eine illustrierte Lektion pro Modul des offiziellen Kurses{' '}
          <a href={COURSE_URL} target="_blank" rel="noreferrer">
            AI-103T00 „Develop AI apps and agents on Azure“
          </a>{' '}
          – in der Reihenfolge der vier Lernpfade.
        </p>
      </header>
      {learningPaths.map((p, pi) => {
        const mins = p.modules.reduce((a, id) => a + (moduleById.get(id)?.minutes ?? 0), 0)
        return (
          <section key={p.id} className="panel lp" aria-labelledby={`lp-${p.id}`}>
            <div className="panel__head">
              <div>
                <h2 id={`lp-${p.id}`} className="lp__title">
                  {p.title}
                </h2>
                <p className="lp__meta">
                  Lernpfad {pi + 1} von {learningPaths.length} · {p.modules.length} Module · ca. {Math.round(mins / 60)} Std auf Learn
                </p>
              </div>
              <a href={p.url} target="_blank" rel="noreferrer" className="link-inline">
                Auf Microsoft Learn
                <Icon name="open" size={16} />
              </a>
            </div>
            <ol className="module-list">
              {p.modules.map((id) => {
                const m = moduleById.get(id)!
                const s = moduleStatus(m, questions, cards, lessonsRead)
                const index = orderedModules.findIndex((x) => x.id === id) + 1
                const hasLesson = lessonByModule.has(id)
                return (
                  <li key={id} className="module-row">
                    <span className={`module-row__index${s.step === 'done' ? ' is-done' : ''}`} aria-hidden="true">
                      {s.step === 'done' ? <Icon name="check" size={16} /> : index}
                    </span>
                    <div className="module-row__main">
                      <Link to={`/lernen/${id}`} className="module-row__title">
                        {m.title}
                      </Link>
                      <div className="module-row__chips">
                        {moduleDomains(m.skills).map((d) => (
                          <span key={d} className={`domain-chip domain-${d}`}>
                            {d}
                          </span>
                        ))}
                        <span className="module-row__skills">Skills {m.skills.join(', ')}</span>
                      </div>
                    </div>
                    <div className="module-row__status">
                      <span className={`status-pill${s.lessonRead ? ' is-on' : ''}`}>
                        <Icon name={s.lessonRead ? 'check' : 'book'} size={14} />
                        {s.lessonRead ? 'Gelesen' : hasLesson ? 'Lektion' : 'Lektion folgt'}
                      </span>
                      <span className="module-row__mastery">
                        {MASTERY_LABELS[s.mastery.level]} · {s.attempted}/{s.total} Fragen
                      </span>
                      <span className={`mastery-bar level-${s.mastery.level}`} aria-hidden="true">
                        <span style={{ width: `${Math.round(s.mastery.value * 100)}%` }} />
                      </span>
                    </div>
                  </li>
                )
              })}
            </ol>
          </section>
        )
      })}
    </div>
  )
}
