import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon.tsx'
import { learningPaths, moduleById, COURSE_URL, CATALOG_RETRIEVED } from '../content/course.ts'
import { SKILLS_OUTLINE_DATE, STUDY_GUIDE_URL } from '../content/domains.ts'

const OFFICIAL = [
  {
    title: 'Study Guide AI-103',
    url: STUDY_GUIDE_URL,
    text: 'Skills-Outline mit Gewichtung der fünf Domains – die Grundlage dieser App.',
  },
  {
    title: 'Practice Assessment (AI Skills Navigator)',
    url: 'http://aka.ms/AI103-PA',
    text: 'Offizielle Übungsprüfung von Microsoft. Anmelden, dann „Practice Assessment“ starten. Fragen dort werden hier bewusst nicht nachgebaut.',
  },
  {
    title: 'Exam Sandbox',
    url: 'https://aka.ms/examdemo',
    text: 'Die echte Prüfungsoberfläche mit allen Fragetypen ausprobieren: Navigation, Markieren, Review-Bildschirm.',
  },
  {
    title: 'Exam Prep Video',
    url: 'https://aka.ms/AI103-ExamPrep',
    text: 'Offizielles Vorbereitungsvideo zur Prüfung.',
  },
  {
    title: 'Zertifizierung: Azure AI Apps and Agents Developer Associate',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-apps-and-agents-developer-associate/',
    text: 'Zertifizierungsseite mit Prüfungsanmeldung.',
  },
  {
    title: 'Kurs AI-103T00: Develop AI apps and agents on Azure',
    url: COURSE_URL,
    text: 'Offizieller Kurs (4 Tage) – seine vier Lernpfade sind der Lernpfad dieser App.',
  },
  {
    title: 'Exam duration and exam experience',
    url: 'https://learn.microsoft.com/en-us/credentials/support/exam-duration-exam-experience',
    text: 'Dauer, Pausen, Fragetypen und Zugriff auf Microsoft Learn während der Prüfung.',
  },
  {
    title: 'Exam scoring and score reports',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/exam-scoring-reports',
    text: 'Skalierte Punkte (700 zum Bestehen), Teilpunkte, kein Abzug fürs Raten.',
  },
]

const FACTS = [
  'Associate-Prüfungen ohne Labs: 100 Minuten Prüfungszeit, 120 Minuten Sitzzeit. Die meisten Prüfungen haben 40–60 Fragen.',
  'Bestehen ab 700 von 1000 Punkten. Der Wert ist skaliert und entspricht nicht unbedingt 70 % der Punkte.',
  'Bei mehrteiligen Fragen gibt es meist einen Punkt pro richtigem Teil. Falsche Antworten kosten nichts – beantworte jede Frage.',
  'In rollenbasierten Prüfungen kannst du Microsoft Learn in einem geteilten Fenster öffnen (ohne Q&A und Practice Assessments). Die Zeit läuft dabei weiter.',
  'Fragetypen laut Sandbox: Multiple Choice, Build list (Reihenfolge), Drag and drop, Hot area, Active screen, Fallstudien und ggf. Labs.',
  'Nach einer Pause kannst du nicht zu bereits gesehenen Fragen zurück.',
  'Die meisten Fragen behandeln allgemein verfügbare (GA) Features; häufig genutzte Preview-Features können vorkommen.',
]

export function Resources() {
  return (
    <div className="page resources">
      <header className="page-head">
        <h1 className="page-title">Ressourcen</h1>
        <p className="page-sub">Offizielle Quellen für AI-103 – alles hier verlinkt direkt zu Microsoft.</p>
      </header>

      <section className="panel" aria-labelledby="off-h">
        <h2 id="off-h" className="panel__title">
          Offiziell von Microsoft
        </h2>
        <ul className="resource-list">
          {OFFICIAL.map((r) => (
            <li key={r.url}>
              <a href={r.url} target="_blank" rel="noreferrer" className="resource-list__link">
                {r.title}
                <Icon name="open" size={14} />
              </a>
              <p>{r.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="resources__grid">
        <section className="panel" aria-labelledby="facts-h">
          <h2 id="facts-h" className="panel__title">
            Gut zu wissen für den Prüfungstag
          </h2>
          <ul className="facts">
            {FACTS.map((f) => (
              <li key={f}>
                <Icon name="info" size={18} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="panel" aria-labelledby="policy-h">
          <h2 id="policy-h" className="panel__title">
            Woher die Inhalte kommen
          </h2>
          <ul className="facts">
            <li>
              <Icon name="shield" size={18} />
              <span>Alle Fragen sind eigene Formulierungen. Keine Prüfungs-Dumps, keine Kopien von Knowledge Checks oder dem Practice Assessment.</span>
            </li>
            <li>
              <Icon name="documentSearch" size={18} />
              <span>Jede Frage nennt mindestens eine aktuelle Seite auf learn.microsoft.com und ein Prüfdatum.</span>
            </li>
            <li>
              <Icon name="calendar" size={18} />
              <span>
                Stand: Skills-Outline vom {SKILLS_OUTLINE_DATE.split('-').reverse().join('.')}, Kursstruktur aus dem Learn-Katalog vom {CATALOG_RETRIEVED.split('-').reverse().join('.')}.
              </span>
            </li>
          </ul>
          <Link to="/abdeckung" className="link-inline">
            Abdeckungsmatrix ansehen
            <Icon name="chevronRight" size={16} />
          </Link>
        </section>
      </div>

      <section className="panel" aria-labelledby="lp-h">
        <h2 id="lp-h" className="panel__title">
          Lernpfade und Module auf Microsoft Learn
        </h2>
        <div className="lp-links">
          {learningPaths.map((p) => (
            <div key={p.id} className="lp-links__group">
              <a href={p.url} target="_blank" rel="noreferrer" className="lp-links__path">
                {p.title}
                <Icon name="open" size={14} />
              </a>
              <ol>
                {p.modules.map((id) => (
                  <li key={id}>
                    <a href={moduleById.get(id)?.url} target="_blank" rel="noreferrer">
                      {moduleById.get(id)?.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
