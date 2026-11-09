import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon.tsx'
import { store, useProgress } from '../lib/store.ts'
import { masteryOf, MASTERY_LABELS, moduleStatus, type MasteryLevel } from '../lib/progress.ts'
import { DOMAIN_ICON, formatDate } from '../lib/i18n.ts'
import { domains } from '../content/domains.ts'
import { learningPaths, moduleById } from '../content/course.ts'
import { questions, questionsForBullet } from '../content/index.ts'

const LEVELS: MasteryLevel[] = [0, 1, 2, 3]

export function ProgressPage() {
  const progress = useProgress()
  const { cards, lessonsRead, exams, lang } = progress
  const [confirmReset, setConfirmReset] = useState(false)
  const [importMsg, setImportMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const answered = Object.keys(cards).length

  const download = () => {
    const blob = new Blob([store.exportJson()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai103-prep-fortschritt-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }
  const upload = async (file: File) => {
    const ok = store.importJson(await file.text())
    setImportMsg(ok ? 'Fortschritt importiert.' : 'Import fehlgeschlagen: Die Datei ist kein AI-103-Prep-Export.')
  }

  return (
    <div className="page progress-page">
      <header className="page-head">
        <h1 className="page-title">Fortschritt</h1>
        <p className="page-sub">
          {answered} von {questions.length} Fragen beantwortet · {Object.keys(lessonsRead).length} von 31 Lektionen gelesen · {exams.length} Simulationen. Gespeichert nur in diesem Browser.
        </p>
      </header>

      <section className="panel skills-map" aria-labelledby="map-h">
        <div className="panel__head">
          <h2 id="map-h" className="panel__title">
            Skills-Landkarte AI-103
          </h2>
          <ul className="mastery-legend" aria-label="Legende">
            {LEVELS.map((l) => (
              <li key={l}>
                <span className={`tile-swatch level-${l}`} aria-hidden="true" />
                {MASTERY_LABELS[l]}
              </li>
            ))}
          </ul>
        </div>
        <p className="muted small skills-map__hint">Jede Kachel ist ein Punkt aus dem offiziellen Skills-Outline. Kachel antippen, um genau diesen Skill zu üben.</p>
        {domains.map((d) => (
          <div key={d.id} className="skills-row">
            <div className="skills-row__head">
              <span className={`skills-row__icon ink-${d.id}`} aria-hidden="true">
                <Icon name={DOMAIN_ICON[d.id]} size={20} />
              </span>
              <div>
                <p className="skills-row__title">{lang === 'de' ? d.title.de : d.title.en}</p>
                <p className="skills-row__weight">
                  {d.id} · {d.weight[0]}–{d.weight[1]} %
                </p>
              </div>
            </div>
            <ol className="tiles">
              {d.groups.flatMap((g) =>
                g.bullets.map((b) => {
                  const qs = questionsForBullet(b.id)
                  const m = masteryOf(qs, cards)
                  const label = `${b.id} ${lang === 'de' ? b.de : b.en} — ${MASTERY_LABELS[m.level]}, ${m.correctLast}/${m.total} zuletzt richtig`
                  return (
                    <li key={b.id}>
                      <Link to={`/ueben/sitzung?skill=${b.id}`} className={`tile level-${m.level}`} aria-label={label} data-tip={label}>
                        <span className="tile__id">{b.id}</span>
                      </Link>
                    </li>
                  )
                }),
              )}
            </ol>
          </div>
        ))}
      </section>

      <section className="panel" aria-labelledby="mods-h">
        <div className="panel__head">
          <h2 id="mods-h" className="panel__title">
            Module
          </h2>
          <Link to="/abdeckung" className="link-inline">
            Abdeckungsmatrix
            <Icon name="chevronRight" size={16} />
          </Link>
        </div>
        <div className="table-wrap" tabIndex={0} role="region" aria-label="Fortschritt je Modul">
          <table className="data-table stack-table" role="table">
            <thead role="rowgroup">
              <tr role="row">
                <th scope="col" role="columnheader">Modul</th>
                <th scope="col" role="columnheader">Lektion</th>
                <th scope="col" role="columnheader">Fragen</th>
                <th scope="col" role="columnheader">Stand</th>
              </tr>
            </thead>
            <tbody role="rowgroup">
              {learningPaths.flatMap((p) =>
                p.modules.map((id) => {
                  const m = moduleById.get(id)!
                  const s = moduleStatus(m, questions, cards, lessonsRead)
                  return (
                    <tr key={id} role="row">
                      <th scope="row" role="rowheader">
                        <Link to={`/lernen/${id}`}>{m.title}</Link>
                      </th>
                      <td role="cell" data-label="Lektion">
                        {s.lessonRead ? <Icon name="checkCircle" size={18} className="ink-ok" label="gelesen" /> : <span className="muted">–</span>}
                      </td>
                      <td role="cell" data-label="Fragen">
                        {s.attempted}/{s.total}
                      </td>
                      <td role="cell" data-label="Stand">
                        <span className="mastery-cell">
                          <span className={`mastery-bar level-${s.mastery.level}`} aria-hidden="true">
                            <span style={{ width: `${Math.round(s.mastery.value * 100)}%` }} />
                          </span>
                          <span className="small">{MASTERY_LABELS[s.mastery.level]}</span>
                        </span>
                      </td>
                    </tr>
                  )
                }),
              )}
            </tbody>
          </table>
        </div>
      </section>

      {exams.length > 0 && (
        <section className="panel" aria-labelledby="ex-h">
          <h2 id="ex-h" className="panel__title">
            Simulationen
          </h2>
          <ol className="exam-trend">
            {exams
              .slice(0, 10)
              .reverse()
              .map((e) => (
                <li key={e.id}>
                  <Link to={`/pruefung/ergebnis/${e.id}`} className="exam-trend__bar" aria-label={`${formatDate(e.finishedAt)}: ${e.summary.percent} %`}>
                    <span className={e.summary.passed ? 'bg-ok' : 'bg-brand-soft'} style={{ height: `${Math.max(4, e.summary.percent)}%` }} />
                  </Link>
                  <span className="exam-trend__label">{e.summary.percent} %</span>
                </li>
              ))}
          </ol>
          <p className="muted small">Die Linie bei 70 % ist der Richtwert dieser App.</p>
        </section>
      )}

      <section className="panel" aria-labelledby="data-h">
        <h2 id="data-h" className="panel__title">
          Daten
        </h2>
        <p className="muted">Dein Fortschritt liegt nur lokal im Browser (localStorage). Exportiere ihn, um ihn auf ein anderes Gerät mitzunehmen.</p>
        <div className="callout__actions">
          <button type="button" className="btn btn--secondary" onClick={download}>
            <Icon name="download" size={16} />
            Fortschritt exportieren
          </button>
          <button type="button" className="btn btn--secondary" onClick={() => fileRef.current?.click()}>
            <Icon name="upload" size={16} />
            Importieren
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) void upload(f)
              e.target.value = ''
            }}
          />
          {!confirmReset ? (
            <button type="button" className="btn btn--subtle" onClick={() => setConfirmReset(true)}>
              <Icon name="reset" size={16} />
              Zurücksetzen
            </button>
          ) : (
            <>
              <button
                type="button"
                className="btn btn--danger"
                onClick={() => {
                  store.reset()
                  setConfirmReset(false)
                }}
              >
                Alles löschen
              </button>
              <button type="button" className="btn btn--subtle" onClick={() => setConfirmReset(false)}>
                Abbrechen
              </button>
            </>
          )}
        </div>
        {importMsg && (
          <p className="small" role="status">
            {importMsg}
          </p>
        )}
      </section>
    </div>
  )
}
