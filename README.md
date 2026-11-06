# AI-103 Prep

Lern-App für die Microsoft-Prüfung **AI-103: Developing AI Apps and Agents on Azure**. Wer die Prüfung besteht, erhält die Zertifizierung *Microsoft Certified: Azure AI Apps and Agents Developer Associate*.

Die App folgt dem offiziellen Kurs **AI-103T00** (4 Lernpfade, 31 Module) und dem Skills-Katalog *„skills measured as of April 16, 2026“*. Zu jedem Modul gibt es eine bebilderte Lektion mit Schritt-für-Schritt-Diagrammen und eigene Übungsfragen. Alles läuft im Browser: kein Backend, kein Konto.

**Stand:** Inhalte zuletzt mit Microsoft Learn abgeglichen am **6. November 2026**.

> [!IMPORTANT]
> Kein offizielles Microsoft-Produkt. Alle Fragen sind eigene Formulierungen auf Basis der aktuellen Microsoft-Learn-Dokumentation – keine echten Prüfungsfragen und keine Dumps. Details unter [Inhaltsrichtlinie](#inhaltsrichtlinie).

![Startseite: geführter Lernpfad, nächste Lektion, Schnellstarts für heute und Prüfungsbereitschaft](docs/screenshots/home.png)

## Schnellstart

Voraussetzung: Node.js 22.18 oder neuer (entwickelt mit Node 26).

```bash
npm install      # nur beim ersten Mal und nach Updates
npm run dev      # jeden Tag zum Starten
```

Dann <http://localhost:5173> öffnen. Beenden mit `Strg+C` im Terminal.

> [!NOTE]
> Dein Lernstand liegt im Browser – und zwar **pro Browser und pro Adresse**. Nutze deshalb immer denselben Browser und `http://localhost:5173`. Ist Port 5173 schon belegt, bricht der Start mit einer Meldung ab, statt still auf einen anderen Port auszuweichen (dort wäre dein Lernstand leer). Sichere den Lernstand ab und zu unter **Fortschritt → Exportieren**.

## So lernst du damit

1. **Dem Lernpfad folgen.** Die Karte „Als Nächstes dran“ auf **Start** zeigt immer den nächsten Schritt: Lektion lesen → Fragen des Moduls üben → Fehler wiederholen.
2. **Täglich:** zuerst die fälligen Wiederholungen, dann eine kurze Runde mit 10 gemischten Fragen – das geht auch am Handy.
3. **Einmal pro Woche:** eine Prüfungssimulation. Die Auswertung je Domäne zeigt, wo du nacharbeiten solltest.
4. **Praxis:** Die meisten Learn-Module enthalten eine Übung zum Mitmachen in einem eigenen Azure-Abonnement. Die App ersetzt diese Übungen nicht; jede Lektion verlinkt ihr Modul.
5. **Vor der Anmeldung:** das offizielle [Practice Assessment](http://aka.ms/AI103-PA) und die [Exam Sandbox](https://aka.ms/examdemo).

**Wann bist du bereit?** Eine offizielle Umrechnung gibt es nicht. Richtwert der App: Simulationen stabil deutlich über 70 %, alle Domänen auf der Skills-Landkarte mindestens „Sicher“ und ein gutes Ergebnis im offiziellen Practice Assessment.

## Was die App bietet

| Bereich | Was du dort machst |
|---|---|
| **Start** | Siehst, welche Lektion als Nächstes dran ist, und startest direkt etwas für heute: fällige Wiederholungen, eine kurze Runde mit 10 gemischten Fragen oder die Prüfungssimulation. |
| **Lernen** | 31 Lektionen, eine pro offiziellem Modul: Worum geht’s, Prüfungsfokus, Schritt-für-Schritt-Diagramm, Kernkonzepte, „Welcher Dienst wofür?“, minimaler Python-Code, Prüfungsfallen, Merksätze, Mini-Quiz und Link zum Modul auf Learn. |
| **Üben** | Lernmodus mit sofortigem Feedback und einer Erklärung zu jeder Antwortoption. Filter nach Domäne, Modul, Skill, Schwierigkeit und Fragetyp. |
| **Prüfung** | Simulation mit Zeitlimit: 50 Fragen in 100 Minuten, nach Domänen gewichtet, mit einer Fallstudie am Ende – oder kompakt mit 25 Fragen in 50 Minuten. Danach eine Auswertung je Domäne. |
| **Wiederholen** | Falsch oder nur teilweise richtig beantwortete Fragen kommen nach dem Leitner-Prinzip wieder: Fächer 1–5, fällig nach 0, 1, 3, 7 und 21 Tagen. |
| **Fortschritt** | Skills-Landkarte je Domäne und Modul. Lernstand exportieren, importieren oder zurücksetzen. |
| **Abdeckung** | Abdeckungsmatrix: Skill → Modul → Lektion → Fragen. |
| **Ressourcen** | Study Guide, Kurs, Lernpfade und Module auf Learn, Practice Assessment, Exam Sandbox. |

Die Oberfläche ist deutsch. Lektionen und Fragen schaltest du zwischen Deutsch und Englisch um; auf Englisch übst du die Begriffe so, wie sie in der Prüfung stehen. Am Handy erreichst du Fortschritt, Ressourcen und Abdeckung über das Menü oben rechts.

| Lektion mit Diagramm | Übungsfrage mit Erklärung |
|---|---|
| ![Lektion: Schritt-für-Schritt-Diagramm einer Foundry-Architektur](docs/screenshots/lesson.png) | ![Lernmodus: beantwortete Frage mit Erklärung zu jeder Option](docs/screenshots/practice.png) |

## Die Prüfung auf einen Blick

| | |
|---|---|
| Prüfung | AI-103: Developing AI Apps and Agents on Azure |
| Zertifizierung | Microsoft Certified: Azure AI Apps and Agents Developer Associate |
| Skills-Katalog | Stand 16. April 2026 – am 6. November 2026 die einzige Version im Study Guide |
| Programmiersprache | Python |
| Dauer | 100 Minuten (Associate-Prüfung ohne Labs) |
| Anzahl Fragen | meist 40–60; die genaue Zahl variiert |
| Bestehen | 700 von 1000 Punkten (skalierter Score) |
| Microsoft Learn | lässt sich bei Associate-Prüfungen im Prüfungsfenster öffnen – nur die Learn-Domain, die Prüfungszeit läuft weiter. Gedacht zum gezielten Nachschlagen, nicht für jede Frage. |
| Fragetypen | in der [Exam Sandbox](https://aka.ms/examdemo) ausprobieren |

Quellen: [Study Guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103), [Zertifizierung](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-apps-and-agents-developer-associate/), [Prüfungsdauer und Ablauf](https://learn.microsoft.com/en-us/credentials/support/exam-duration-exam-experience), [Bewertung](https://learn.microsoft.com/en-us/credentials/certifications/exam-scoring-reports).

Die Simulation zeigt dir einen Prozentwert und rechnet ihn linear auf 1000 um. Das ist **kein** offizieller Score: Der echte Score ist skaliert, 700 entsprechen laut Microsoft nicht unbedingt 70 % der Punkte. Die 70 % in der App sind nur ein Richtwert.

## Abdeckung

Jeder der **64 Skills** im Study Guide und jedes der **31 Module** hat eine Lektion und Fragen. `npm run validate` bricht ab, sobald ein Skill oder Modul keine Fragen hat.

Die Nummern der Skills (z. B. 3.2.7 = Domäne 3, Gruppe 2, siebter Skill) vergibt die App, damit du sie in Filtern und in der Skills-Landkarte wiederfindest; der Study Guide selbst nummeriert nicht.

**262 Fragen**, 31 Lektionen, 3 Fallstudien:

| Domäne | Gewicht in der Prüfung | Fragen | Anteil |
|---|---|---|---|
| 1 Plan and manage an Azure AI solution | 25–30 % | 72 | 27 % |
| 2 Implement generative AI and agentic solutions | 30–35 % | 88 | 34 % |
| 3 Implement computer vision solutions | 10–15 % | 38 | 15 % |
| 4 Implement text analysis solutions | 10–15 % | 32 | 12 % |
| 5 Implement information extraction solutions | 10–15 % | 32 | 12 % |

| Lernpfad im Kurs AI-103T00 | Module | Fragen |
|---|---|---|
| Develop generative AI apps in Azure | 6 | 87 |
| Develop AI agents on Azure | 10 | 74 |
| Develop natural language solutions in Azure | 7 | 30 |
| Extract insights from visual data on Azure | 8 | 71 |

- **Fragetypen:** Single Choice 115 · Multiple Choice 50 · Zuordnung 35 · Code-Lücke (Python) 33 · Reihenfolge 29
- **Schwierigkeit:** leicht 62 · mittel 135 · schwer 65
- **Fallstudien:** Contoso Insurance (Schadeneingang automatisieren), Fabrikam (Support-Agent mit eigenen Tools, MCP-Servern und Freigaben), Northwind Media (Kampagnenbilder und Teaser)

Die vollständige Matrix – Skill → Modul → Lektion → Fragen sowie Fragen pro Modul – steht in [docs/coverage.md](docs/coverage.md) und in der App unter **Abdeckung**.

## Inhaltsrichtlinie

1. **Eigene Fragen.** Fragen, Erklärungen und Lektionen sind eigenständig geschrieben. Inhalte von Dump-Seiten wie ExamTopics werden weder gelesen noch verwendet – das verstößt gegen das Microsoft Certification Exam Agreement.
2. **Keine Kopien offizieller Übungsfragen.** Die Wissensüberprüfungen der Learn-Module und das offizielle Practice Assessment werden nicht nachgebaut. Die App verlinkt sie, damit du sie dort machst.
3. **Nur aktuelle Dokumentation.** Jede Frage nennt mindestens eine Quelle auf learn.microsoft.com; die App zeigt den Seitentitel als Link. `lastVerified` ist das Datum, an dem die Frage zuletzt gegen ihre Quellen geprüft wurde. Produktnamen folgen dem aktuellen Stand: Microsoft Foundry (früher Azure AI Studio bzw. Azure AI Foundry), Foundry Tools (früher Azure AI Services), Document Intelligence (früher Form Recognizer), Conversational Language Understanding (früher LUIS). Alte Namen lehnt `npm run validate` ab, außer die Textstelle kennzeichnet sie ausdrücklich als frühere Namen.
4. **Nur aktuelle Modelle.** `npm run validate` gleicht jede Modell-ID mit dem [Model retirement schedule](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirement-schedule) ab und lehnt eingestellte oder abgekündigte Modelle ab (z. B. `gpt-4.1`, `gpt-4o`, `gpt-4o-transcribe`), außer die Textstelle kennzeichnet das Modell ausdrücklich als eingestellt, abgekündigt oder ersetzt. Einzige bewusste Ausnahme ist `sora-2` (siehe [Zeitkritische Fakten](#zeitkritische-fakten)); sie ist mit Begründung in `src/content/model-lifecycle.json` hinterlegt.
5. **Jede Option wird erklärt.** Zu jeder Antwortoption steht, warum sie richtig oder falsch ist.
6. **Stichprobe gegengeprüft (Stand 6. November 2026).** Unabhängige Reviewer haben 128 der 262 Fragen gegen die aktuelle Dokumentation geprüft – alle Code- und Fallstudienfragen sowie jede dritte übrige Frage – dazu 62 Code-Beispiele aus den Lektionen. Alle Befunde wurden behoben, und jede geänderte Frage und jedes geänderte Code-Beispiel wurde danach noch einmal geprüft. Testleser ohne Vorwissen haben jede Lektion gelesen und unerklärte Begriffe, Widersprüche und Lücken gemeldet; auch diese sind behoben.
7. **Diagramme geprüft.** Ein Skript misst jedes Diagramm im Browser (Textüberlauf, verdeckte oder falsch ansetzende Pfeile, Überlappungen, Deutsch und Englisch); dieselben Regeln prüft `npm run validate`. Zusätzlich wurde jedes Diagramm inhaltlich gegen Learn geprüft: Pfeilrichtungen, Komponenten und Reihenfolge der Schritte.
8. **Keine Garantie.** Die Prüfung kann Dinge abfragen, die hier fehlen, und Dienste ändern sich schnell. Im Zweifel gilt die verlinkte Dokumentation.

### Wenn sich Learn ändert

Empfehlung: einmal pro Woche und kurz vor dem Prüfungstermin.

1. `npm run check:learn` vergleicht live mit Microsoft Learn: Kurs AI-103T00, Lernpfade, Module, Units, die Skills im Study Guide und alle Modell-IDs der Inhalte gegen den aktuellen Model retirement schedule. Unterschiede stehen im Terminal; bei Abweichungen endet der Befehl mit einem Fehler.
2. Je nach Meldung anpassen: Kurs oder Module in `src/content/course.ts`, Skills in `src/content/domains.ts`, dann die betroffenen Lektionen (`src/content/lessons/<modul>.ts`) und Fragen (`src/content/questions/<modul>.json`) – bei geprüften Fragen `lastVerified` setzen.
3. `npm run models:refresh` aktualisiert die lokale Kopie des Model retirement schedule; `npm run sources:titles` holt Titel für neue Quell-Links.
4. `npm run validate -- --matrix` (schreibt auch `docs/coverage.md` neu) und `npm run check` ausführen.
5. Die Zahlen in dieser README aus der Ausgabe von `npm run validate` übernehmen.

`npm run check:links` prüft zusätzlich, ob alle Quell-Links erreichbar sind.

### Zeitkritische Fakten

Die Prüfung basiert auf dem Skills-Katalog vom 16. April 2026. Aufgaben können deshalb Modelle oder Funktionen nennen, die seitdem abgekündigt wurden. Die App lehrt den aktuellen Stand und nennt wichtige Vorgänger, damit du beide erkennst.

| Wann | Was | Was die App lehrt |
|---|---|---|
| 4. März 2026 | `dall-e-3` eingestellt ([Quelle](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/dall-e)) | Bilder mit GPT-image-Modellen erzeugen |
| 15. Oktober 2026 | `gpt-4o-transcribe` eingestellt ([Quelle](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirement-schedule)) | Transkription mit aktuellen Modellen |
| 23. Oktober 2026 | `gpt-image-1` eingestellt ([Quelle](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirement-schedule)) | Bilder mit `gpt-image-2` oder `gpt-image-1-mini` |
| 19. November 2026 | `o1`, `o3`, `o3-mini` und `o4-mini` werden eingestellt ([Quelle](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirement-schedule)) | Reasoning mit GPT-5.x-Modellen |
| 1. Dezember 2026 | Workflows im Foundry-Portal (Preview) werden eingestellt ([Quelle](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/workflow)) | Neue Workflows mit Microsoft Agent Framework; das Modul zum Portal-Designer ist weiterhin Teil des Kurses und wird erklärt |
| 15. Dezember 2026 | `whisper`, `tts` und `tts-hd` werden eingestellt ([Quelle](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirement-schedule)) | Aktuelle Transkriptions- und TTS-Modelle |
| Januar – April 2027 | `gpt-4o` (je nach Version 14. Januar oder 14. April 2027) und `gpt-4.1` (14. April 2027) werden eingestellt; beide sind schon jetzt abgekündigt, also keine neuen Deployments ([Quelle](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirement-schedule)) | Beispiele mit aktuellen GA-Modellen wie `gpt-5-mini` |
| 30. April 2027 | Groundedness-Erkennung (Preview) in den Guardrails wird eingestellt ([Quelle](https://learn.microsoft.com/en-us/azure/foundry/guardrails/guardrails-overview)) | Fundiertheit mit dem Groundedness-Evaluator messen |
| 31. März 2029 | Azure Language: u. a. Stimmungsanalyse und Schlüsselwortextraktion werden eingestellt ([Quelle](https://learn.microsoft.com/en-us/azure/ai-services/language-service/sentiment-opinion-mining/overview)) | Für neue Projekte Foundry-Modelle |
| seit November 2025 | Content Understanding: Den „Pro-Modus“ gab es nur in der eingestellten API `2025-05-01-preview`; Nachfolger ist der *agentic mode* (Preview) ([Quelle](https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/agentic-mode)) | Der Skill „Configure single‑task and pro‑mode Content Understanding pipelines“ (3.2.7) nennt noch „pro mode“ – die App erklärt beides |
| offen | `sora-2`: Der Retirement Schedule nennt für beide Versionen (2025-10-06 und 2025-12-08) bereits vergangene Termine, die [Video-Dokumentation](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/video-generation) führt Sora 2 aber weiter als verfügbare Preview | Sora 2 wie in der Dokumentation – Verfügbarkeit vor der Prüfung kurz prüfen |
| offen | Veröffentlichte Agents: Die Agent-Application-Ressource ist die *Legacy*-Variante; das neue Modell veröffentlicht über den Agent-Endpoint ([Quelle](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/migrate-agent-applications)) | Beide Wege mit ihren Rollen (Foundry User bzw. Foundry Agent Consumer) |

## Offizielle Ressourcen

- [Study Guide AI-103](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103)
- [Kurs AI-103T00 auf Microsoft Learn](https://learn.microsoft.com/en-us/training/courses/ai-103t00)
- [Practice Assessment auf AI Skills Navigator](http://aka.ms/AI103-PA) (Anmeldung nötig)
- [Exam Sandbox](https://aka.ms/examdemo) – Prüfungsoberfläche ausprobieren

## Befehle

Alles nach `--` reicht npm an das Skript weiter.

| Befehl | Zweck |
|---|---|
| `npm run dev` | Entwicklungsserver auf <http://localhost:5173> |
| `npm run build` | Typprüfung und statischer Build nach `dist/` |
| `npm run preview` | Den Build unter derselben Adresse ansehen (vorher `npm run dev` beenden) |
| `npm run check` | Lint, Typprüfung, Tests und Inhaltsprüfung |
| `npm run validate` | Fragen, Lektionen, Diagramme, Modelle und Abdeckung prüfen |
| `npm run validate -- --matrix` | Wie oben und zusätzlich `docs/coverage.md` neu schreiben |
| `npm run validate -- --only foundry-iq` | Nur die genannten Module prüfen (mehrere mit Komma) |
| `npm run check:learn` | Live-Abgleich mit Learn-Katalog, Study Guide und Model retirement schedule |
| `npm run models:refresh` | Lokale Kopie des Model retirement schedule aktualisieren |
| `npm run check:links` | Alle Quell-Links prüfen |
| `npm run sources:titles` | Seitentitel aller zitierten Learn-Seiten abrufen |
| `npm run export:lessons` | Alle Lektionen auf Englisch als Markdown nach `dist-lessons/` exportieren |
| `npm run export:lessons -- dist-lessons de` | Dasselbe auf Deutsch (1. Argument: Zielordner, 2. Argument: Sprache) |

## Projektstruktur

```text
src/
  content/
    domains.ts           5 Domänen, 13 Gruppen, 64 Skills im Wortlaut des Study Guides (EN + DE)
    course.ts            Kurs AI-103T00: 4 Lernpfade und 31 Module aus dem Learn-Katalog
    lessons/*.ts         eine Lektion pro Modul: Texte, Diagramme, Code, Prüfungsfallen
    questions/*.json     Fragen pro Modul
    cases/*.json         Fallstudien
    schema/              JSON-Schemas für Fragen und Fallstudien
    validate.ts          Inhaltsprüfung: Pflichtfelder, Fragetypen, Diagramme, alte Namen, Modelle, Abdeckung
    model-lifecycle.json lokale Kopie des Model retirement schedule
    source-titles.json   Seitentitel der zitierten Learn-Seiten
  lib/                   Bewertung, Prüfungszusammenstellung, Leitner-System, Fortschritt, Speicher,
                         Diagramm-Geometrie, gemessene Schriftbreiten, Diagramm-Vorschau der Startseite
  components/            Diagramm-Renderer, Fragetypen, Lernsitzungen, Code-Highlighting, Icons
  pages/                 Start, Lernen, Lektion, Üben, Prüfung, Wiederholen, Fortschritt, Abdeckung, Ressourcen
  styles/                Design-Tokens und Styles
scripts/                 validate-content, check-learn, check-links, model-lifecycle, source-titles,
                         export-lessons, gen-icons
tests/                   Vitest: Bewertung, Prüfung, Leitner, Inhaltsprüfung, Geometrie, Diagramm-Vorschau,
                         App-Smoke-Test, kompletter Fragenkatalog
docs/                    content-guide.md (Regeln und geprüfte Fakten), coverage.md (generiert)
```

## Fragen ergänzen oder ändern

Fragen liegen als JSON pro Modul in `src/content/questions/<modul>.json`, Lektionen in `src/content/lessons/<modul>.ts`, Fallstudien in `src/content/cases/` (Fragen verweisen per `caseId` darauf). Fragen-IDs folgen dem Muster `q-<modul>-<nummer>`. Die Regeln stehen in [docs/content-guide.md](docs/content-guide.md). Eine Single-Choice-Frage sieht so aus (gekürzt):

```jsonc
{
  "id": "q-foundry-chat-app-14",
  "type": "single",                 // single | multi | order | match | code
  "domain": "D2",
  "skill": "2.1.6",
  "module": "foundry-chat-app",
  "difficulty": 2,                  // 1 leicht · 2 mittel · 3 schwer
  "stem": { "en": "…", "de": "…" },
  "options": [
    { "id": "a", "text": { "en": "…", "de": "…" }, "correct": true,  "why": { "en": "…", "de": "…" } },
    { "id": "b", "text": { "en": "…", "de": "…" }, "correct": false, "why": { "en": "…", "de": "…" } },
    { "id": "c", "text": { "en": "…", "de": "…" }, "correct": false, "why": { "en": "…", "de": "…" } }
  ],
  "explanation": { "en": "…", "de": "…" },
  "sources": ["https://learn.microsoft.com/en-us/azure/foundry/…"],
  "lastVerified": "2026-11-06"
}
```

Danach `npm run sources:titles` (bei neuen Quellen) und `npm run validate -- --matrix` ausführen und die Zahlen in dieser README anpassen.

## Lernstand und Datenschutz

Dein Fortschritt liegt nur im `localStorage` deines Browsers (Schlüssel `ai103-prep:v1`) – getrennt pro Browser und pro Adresse. Ein anderer Browser, ein privates Fenster, eine andere Adresse oder gelöschte Website-Daten zeigen einen leeren Lernstand. Es gibt keine Server, kein Konto und kein Tracking. Unter **Fortschritt** exportierst du den Lernstand als JSON und importierst ihn wieder, auch auf einem anderen Gerät.

## Veröffentlichen

`npm run build` erzeugt eine statische Seite mit relativen Pfaden und Hash-Routing. Den Ordner `dist/` kannst du auf jeden statischen Host legen, auch in einen Unterordner.

## Design

Das Erscheinungsbild folgt Microsoft Learn und Fluent 2: Segoe UI, klare Flächen, eine Farbe pro Domäne. Diagramme sind handgebaute SVGs; Beschriftungen werden mit gemessenen Schriftbreiten gesetzt und automatisch so platziert, dass sie keine Pfeile verdecken. Details stehen in [PRODUCT.md](PRODUCT.md) und [DESIGN.md](DESIGN.md).

## Danksagung

Icons: [Fluent UI System Icons](https://github.com/microsoft/fluentui-system-icons) (MIT). Code-Schrift: [Cascadia Code](https://github.com/microsoft/cascadia-code) (SIL Open Font License 1.1).
