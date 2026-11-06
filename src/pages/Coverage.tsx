import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon.tsx'
import { useProgress } from '../lib/store.ts'
import { domains, SKILLS_OUTLINE_DATE, STUDY_GUIDE_URL } from '../content/domains.ts'
import { learningPaths, moduleById, modules } from '../content/course.ts'
import { cases, lessonByModule, questions } from '../content/index.ts'

export function Coverage() {
  const { lang } = useProgress()
  const primary = new Map<string, number>()
  const secondary = new Map<string, number>()
  for (const q of questions) {
    primary.set(q.skill, (primary.get(q.skill) ?? 0) + 1)
    for (const s of q.skills ?? []) secondary.set(s, (secondary.get(s) ?? 0) + 1)
  }
  const byModule = new Map<string, number>()
  for (const q of questions) byModule.set(q.module, (byModule.get(q.module) ?? 0) + 1)
  const gaps = domains.flatMap((d) => d.groups.flatMap((g) => g.bullets)).filter((b) => !primary.get(b.id))

  return (
    <div className="page coverage">
      <header className="page-head">
        <h1 className="page-title">Abdeckung</h1>
        <p className="page-sub">
          Jeder Punkt des{' '}
          <a href={STUDY_GUIDE_URL} target="_blank" rel="noreferrer">
            Skills-Outlines
          </a>{' '}
          (Stand {SKILLS_OUTLINE_DATE.split('-').reverse().join('.')}) → Modul des offiziellen Kurses → Lektion → Fragen. {questions.length} Fragen, {lessonByModule.size} von {modules.length} Lektionen, {cases.length} Fallstudien.
        </p>
      </header>
      {gaps.length > 0 && (
        <div className="callout callout--warn">
          <Icon name="warning" size={20} />
          <div>
            <p className="callout__title">Noch ohne Fragen</p>
            <p>{gaps.map((g) => g.id).join(', ')}</p>
          </div>
        </div>
      )}
      {domains.map((d) => (
        <section key={d.id} className="panel" aria-labelledby={`cov-${d.id}`}>
          <h2 id={`cov-${d.id}`} className="panel__title">
            <span className={`domain-chip domain-${d.id}`}>{d.id}</span> {lang === 'de' ? d.title.de : d.title.en} · {d.weight[0]}–{d.weight[1]} % ·{' '}
            {questions.filter((q) => q.domain === d.id).length} Fragen
          </h2>
          <div className="table-wrap" tabIndex={0} role="region" aria-label={`Abdeckung ${d.id}`}>
            <table className="data-table coverage-table">
              <thead>
                <tr>
                  <th scope="col">Skill</th>
                  <th scope="col">Module (Lektion)</th>
                  <th scope="col">Fragen</th>
                </tr>
              </thead>
              <tbody>
                {d.groups.flatMap((g) =>
                  g.bullets.map((b) => {
                    const mods = modules.filter((m) => m.skills.includes(b.id))
                    const n = primary.get(b.id) ?? 0
                    return (
                      <tr key={b.id}>
                        <th scope="row">
                          <span className="skill-chip">{b.id}</span> {lang === 'de' ? b.de : b.en}
                        </th>
                        <td>
                          <ul className="cov-mods">
                            {mods.map((m) => (
                              <li key={m.id}>
                                <Link to={`/lernen/${m.id}`}>{m.title}</Link>
                                {lessonByModule.has(m.id) ? <Icon name="checkCircle" size={14} className="ink-ok" label="Lektion vorhanden" /> : <span className="muted small"> (Lektion folgt)</span>}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className={n ? '' : 'ink-bad'}>
                          {n ? (
                            <Link to={`/ueben/sitzung?skill=${b.id}`}>
                              {n}
                              {secondary.get(b.id) ? ` + ${secondary.get(b.id)}` : ''}
                            </Link>
                          ) : (
                            '0'
                          )}
                        </td>
                      </tr>
                    )
                  }),
                )}
              </tbody>
            </table>
          </div>
        </section>
      ))}
      <section className="panel" aria-labelledby="cov-mod">
        <h2 id="cov-mod" className="panel__title">
          Module → Fragen
        </h2>
        <div className="table-wrap" tabIndex={0} role="region" aria-label="Fragen je Modul">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Lernpfad</th>
                <th scope="col">Modul</th>
                <th scope="col">Lektion</th>
                <th scope="col">Fragen</th>
              </tr>
            </thead>
            <tbody>
              {learningPaths.flatMap((p) =>
                p.modules.map((id) => (
                  <tr key={id}>
                    <td className="small">{p.title}</td>
                    <th scope="row">
                      <a href={moduleById.get(id)?.url} target="_blank" rel="noreferrer">
                        {moduleById.get(id)?.title}
                      </a>
                    </th>
                    <td>{lessonByModule.has(id) ? <Icon name="checkCircle" size={16} className="ink-ok" label="vorhanden" /> : '–'}</td>
                    <td>{byModule.get(id) ?? 0}</td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
