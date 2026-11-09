import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'cu-client',
  summary: {
    en: 'A Content Understanding client app talks to your **Foundry resource endpoint** (`https://<resource>.services.ai.azure.com/`), either with plain REST calls or with the `azure-ai-contentunderstanding` Python SDK. Quick recap: an **analyzer** is a reusable definition — base analyzer, **field schema** (the values you want) and model names — that you create once and then send files to; each field is filled by `generate`, `classify` or, for documents, `extract` (copy the value exactly as printed). At analyze time the service maps the analyzer\'s model names to your deployments, either through a one-time **defaults** mapping on the resource or a `modelDeployments` object in the request. Every operation is **asynchronous**: creating an analyzer (`PUT`) and analyzing a file (`POST …:analyze`) both return an `Operation-Location` that you poll until the status is final — the SDK wraps this in pollers such as `begin_create_analyzer` and `begin_analyze`. The result JSON holds `contents[]`, each with `markdown`, typed `fields` and, for documents, the OCR layout (pages, words, lines, paragraphs).',
    de: 'Eine Content-Understanding-Client-App spricht mit dem **Endpoint deiner Foundry-Ressource** (`https://<resource>.services.ai.azure.com/`) – entweder mit einfachen REST-Aufrufen oder mit dem Python SDK `azure-ai-contentunderstanding`. Kurz zur Erinnerung: Ein **Analyzer** ist eine wiederverwendbare Definition – Basis-Analyzer, **Feldschema** (die gewünschten Werte) und Modellnamen –, die du einmal anlegst und der du dann Dateien schickst; jedes Feld wird per `generate`, `classify` oder bei Dokumenten per `extract` (Wert exakt wie gedruckt übernehmen) gefüllt. Beim Analysieren ordnet der Dienst die Modellnamen des Analyzers deinen Deployments zu – über eine einmalige **Defaults**-Zuordnung der Ressource oder über ein `modelDeployments`-Objekt in der Anfrage. Jede Operation ist **asynchron**: Das Anlegen eines Analyzers (`PUT`) und das Analysieren einer Datei (`POST …:analyze`) liefern jeweils eine `Operation-Location`, die du abfragst, bis der Status final ist – das SDK kapselt das in Pollern wie `begin_create_analyzer` und `begin_analyze`. Das Ergebnis-JSON enthält `contents[]`, jeweils mit `markdown`, typisierten `fields` und bei Dokumenten dem OCR-Layout (Seiten, Wörter, Zeilen, Absätze).',
  },
  examFocus: {
    en: 'Expect sequencing questions (defaults → create analyzer → analyze → poll), the difference between `:analyze` (usually URLs in `inputs`) and `:analyzeBinary` (raw bytes), status values (`NotStarted`, `Running`, `Succeeded`, `Failed`, `Canceled`), authentication (Microsoft Entra ID with `DefaultAzureCredential` or the `Ocp-Apim-Subscription-Key` header) and reading results (`valueString` or `.value`, `confidence`, `source`, `spans`). Code items often show an SDK call with a missing method or argument.',
    de: 'Rechne mit Fragen zur Reihenfolge (Defaults → Analyzer anlegen → analysieren → abfragen), zum Unterschied zwischen `:analyze` (meist URLs in `inputs`) und `:analyzeBinary` (rohe Bytes), zu Statuswerten (`NotStarted`, `Running`, `Succeeded`, `Failed`, `Canceled`), zur Authentifizierung (Microsoft Entra ID mit `DefaultAzureCredential` oder Header `Ocp-Apim-Subscription-Key`) und zum Lesen der Ergebnisse (`valueString` bzw. `.value`, `confidence`, `source`, `spans`). Code-Aufgaben zeigen oft einen SDK-Aufruf mit fehlender Methode oder fehlendem Argument.',
  },
  diagrams: [
    {
      id: 'cu-rest-sequence',
      title: { en: 'The client conversation: set up, create, analyze, poll', de: 'Der Client-Dialog: einrichten, anlegen, analysieren, abfragen' },
      caption: {
        en: 'Each request on the left gets an immediate answer on the right — the actual work runs asynchronously behind an Operation-Location.',
        de: 'Jede Anfrage links bekommt sofort eine Antwort rechts – die eigentliche Arbeit läuft asynchron hinter einer Operation-Location.',
      },
      width: 960,
      height: 460,
      groups: [
        { id: 'g-app', x: 20, y: 20, w: 330, h: 430, label: { en: 'Your app (Python)', de: 'Deine App (Python)' }, tone: 'app' },
        { id: 'g-svc', x: 610, y: 20, w: 330, h: 430, label: 'Foundry resource', tone: 'platform' },
      ],
      nodes: [
        { id: 'a1', x: 45, y: 65, w: 280, h: 56, label: 'PATCH …/defaults', sub: { en: 'map model names → deployments', de: 'Modellnamen → Deployments zuordnen' }, icon: 'foundry-tools', tone: 'app', shape: 'pill' },
        { id: 'a2', x: 45, y: 165, w: 280, h: 56, label: 'PUT …/analyzers/{id}', sub: { en: 'analyzer JSON: base + schema', de: 'Analyzer-JSON: Basis + Schema' }, icon: 'foundry-tools', tone: 'app', shape: 'pill' },
        { id: 'a3', x: 45, y: 265, w: 280, h: 56, label: 'POST …/analyzers/{id}:analyze', sub: 'inputs: [{ "url": … }]', icon: 'foundry-tools', tone: 'app', shape: 'pill' },
        { id: 'a4', x: 45, y: 365, w: 280, h: 56, label: 'GET …/analyzerResults/{id}', sub: { en: 'poll every 1–2 seconds', de: 'alle 1–2 Sekunden abfragen' }, icon: 'foundry-tools', tone: 'app', shape: 'pill' },
        { id: 's1', x: 635, y: 65, w: 280, h: 56, label: { en: 'Defaults stored', de: 'Defaults gespeichert' }, sub: { en: 'once per resource', de: 'einmal pro Ressource' }, icon: 'foundry-tools', tone: 'platform', shape: 'pill' },
        { id: 's2', x: 635, y: 165, w: 280, h: 56, label: '201 + Operation-Location', sub: { en: 'poll until Succeeded', de: 'abfragen bis Succeeded' }, icon: 'foundry-tools', tone: 'platform', shape: 'pill' },
        { id: 's3', x: 635, y: 265, w: 280, h: 56, label: '202 + Operation-Location', sub: '{ "status": "NotStarted" }', icon: 'foundry-tools', tone: 'platform', shape: 'pill' },
        { id: 's4', x: 635, y: 365, w: 280, h: 56, label: '200 · status: Succeeded', sub: { en: 'result.contents: markdown + fields', de: 'result.contents: Markdown + Felder' }, icon: 'foundry-tools', tone: 'platform', shape: 'pill' },
      ],
      edges: [
        { id: 'e1', from: 'a1', to: 's1', label: { en: 'one-time setup', de: 'einmalig' } },
        { id: 'e2', from: 'a2', to: 's2', label: { en: 'create', de: 'anlegen' } },
        { id: 'e3', from: 'a3', to: 's3', label: { en: 'analyze', de: 'analysieren' } },
        { id: 'e-loc', from: 's3', to: 'a4', label: 'Operation-Location', dashed: true },
        { id: 'e4', from: 'a4', to: 's4', label: { en: 'poll (repeat while NotStarted/Running)', de: 'abfragen (solange NotStarted/Running)' } },
      ],
      steps: [
        {
          title: { en: 'Connect and authenticate', de: 'Verbinden und anmelden' },
          text: {
            en: 'All calls go to the Foundry resource endpoint under `/contentunderstanding/` with `api-version=2025-11-01`. Authenticate with a Microsoft Entra token (scope `https://cognitiveservices.azure.com/.default`, e.g. via `DefaultAzureCredential`) or, for tests only, the `Ocp-Apim-Subscription-Key` header.',
            de: 'Alle Aufrufe gehen an den Endpoint der Foundry-Ressource unter `/contentunderstanding/` mit `api-version=2025-11-01`. Du meldest dich mit einem Microsoft-Entra-Token an (Scope `https://cognitiveservices.azure.com/.default`, z. B. über `DefaultAzureCredential`) oder – nur für Tests – mit dem Header `Ocp-Apim-Subscription-Key`.',
          },
          focus: ['g-app', 'g-svc'],
        },
        {
          title: { en: 'One-time: map model deployments', de: 'Einmalig: Modell-Deployments zuordnen' },
          text: {
            en: '`PATCH /contentunderstanding/defaults` maps model names and aliases such as `prebuilt-analyzer-completion` to your deployment names — a deployment can have any name (SDK: `update_defaults(model_deployments=…)`). Content Understanding Studio can do this for you, and a single analyze request can pass `modelDeployments` instead.',
            de: '`PATCH /contentunderstanding/defaults` ordnet Modellnamen und Aliase wie `prebuilt-analyzer-completion` deinen Deployment-Namen zu – ein Deployment darf beliebig heißen (SDK: `update_defaults(model_deployments=…)`). Content Understanding Studio kann das für dich erledigen, und eine einzelne Analyse-Anfrage kann stattdessen `modelDeployments` mitgeben.',
          },
          focus: ['a1', 'e1', 's1'],
        },
        {
          title: { en: 'Create the analyzer', de: 'Analyzer anlegen' },
          text: {
            en: '`PUT /contentunderstanding/analyzers/{analyzerId}` sends the definition (`baseAnalyzerId`, `fieldSchema`, `config`, `models`). The 201 response carries an `Operation-Location`; poll it until the operation status is `Succeeded` (the analyzer itself then reports `status: ready`). The SDK does this with `begin_create_analyzer(...).result()`.',
            de: '`PUT /contentunderstanding/analyzers/{analyzerId}` schickt die Definition (`baseAnalyzerId`, `fieldSchema`, `config`, `models`). Die Antwort 201 enthält eine `Operation-Location`; frage sie ab, bis der Operationsstatus `Succeeded` lautet (der Analyzer selbst meldet dann `status: ready`). Im SDK erledigt das `begin_create_analyzer(...).result()`.',
          },
          focus: ['a2', 'e2', 's2'],
        },
        {
          title: { en: 'Submit content', de: 'Inhalt einreichen' },
          text: {
            en: '`POST …/analyzers/{analyzerId}:analyze` takes JSON with `inputs` (usually file URLs); `:analyzeBinary` takes the raw bytes in the body. Both answer `202 Accepted` with an `Operation-Location` and a status of `NotStarted`.',
            de: '`POST …/analyzers/{analyzerId}:analyze` nimmt JSON mit `inputs` (meist Datei-URLs); `:analyzeBinary` nimmt die rohen Bytes im Body. Beide antworten mit `202 Accepted`, einer `Operation-Location` und dem Status `NotStarted`.',
          },
          focus: ['a3', 'e3', 's3'],
        },
        {
          title: { en: 'Poll and read the result', de: 'Abfragen und Ergebnis lesen' },
          text: {
            en: 'Call `GET /contentunderstanding/analyzerResults/{operationId}` every 1–2 seconds while the status is `NotStarted` or `Running`. On `Succeeded`, read `result.contents`. Results stay available for up to 24 hours. The SDK poller (`poller.result()`) does the waiting for you.',
            de: 'Rufe `GET /contentunderstanding/analyzerResults/{operationId}` alle 1–2 Sekunden auf, solange der Status `NotStarted` oder `Running` ist. Bei `Succeeded` liest du `result.contents`. Ergebnisse bleiben bis zu 24 Stunden abrufbar. Der SDK-Poller (`poller.result()`) übernimmt das Warten für dich.',
          },
          focus: ['e-loc', 'a4', 'e4', 's4'],
        },
      ],
    },
    {
      id: 'cu-result-anatomy',
      title: { en: 'Anatomy of an analysis result', de: 'Aufbau eines Analyseergebnisses' },
      caption: {
        en: 'Markdown and fields sit side by side in every content object; documents add layout, audio and video add timed transcript phrases.',
        de: 'Markdown und Felder stehen in jedem Content-Objekt nebeneinander; Dokumente ergänzen das Layout, Audio und Video zeitgestempelte Transkript-Phrasen.',
      },
      width: 960,
      height: 420,
      nodes: [
        { id: 'root', x: 330, y: 20, w: 300, h: 64, label: { en: 'GET …/analyzerResults body', de: 'Body von GET …/analyzerResults' }, sub: 'id · status · usage\nresult { analyzerId, contents[] }', icon: 'foundry-tools', tone: 'data' },
        { id: 'contents', x: 380, y: 125, w: 200, h: 56, label: 'contents[0]', sub: 'kind: document | audioVisual', icon: 'file', tone: 'data' },
        { id: 'markdown', x: 20, y: 230, w: 200, h: 64, label: 'markdown', sub: { en: 'text for RAG and LLMs', de: 'Text für RAG und LLMs' }, icon: 'file', tone: 'data', shape: 'doc' },
        { id: 'fields', x: 260, y: 230, w: 200, h: 64, label: 'fields', sub: { en: 'your schema, typed', de: 'dein Schema, typisiert' }, icon: 'file', tone: 'data' },
        { id: 'layout', x: 500, y: 230, w: 200, h: 64, label: 'pages · paragraphs', sub: { en: 'documents: words · tables\n(returnDetails)', de: 'Dokumente: Wörter · Tabellen\n(returnDetails)' }, icon: 'file', tone: 'data' },
        { id: 'av', x: 740, y: 230, w: 200, h: 64, label: 'transcriptPhrases', sub: { en: 'audio/video: speakers, times\n(returnDetails)', de: 'Audio/Video: Sprecher, Zeit\n(returnDetails)' }, icon: 'file', tone: 'data' },
        { id: 'fv', x: 200, y: 340, w: 320, h: 56, label: { en: 'Field value', de: 'Feldwert' }, sub: 'valueString · confidence · source · spans', icon: 'file', tone: 'data' },
      ],
      edges: [
        { id: 'e-r-c', from: 'root', to: 'contents' },
        { id: 'e-c-md', from: 'contents', to: 'markdown' },
        { id: 'e-c-f', from: 'contents', to: 'fields' },
        { id: 'e-c-l', from: 'contents', to: 'layout' },
        { id: 'e-c-av', from: 'contents', to: 'av' },
        { id: 'e-f-v', from: 'fields', to: 'fv' },
      ],
      steps: [
        {
          title: { en: 'A status wrapper around the result', de: 'Ein Status-Umschlag um das Ergebnis' },
          text: {
            en: 'The polling response carries `id`, `status`, a `usage` block and — once it has succeeded — `result` with `analyzerId`, `apiVersion`, `warnings` and `contents`. `usage` sits next to `result` and reports document pages, `audioHours`/`videoHours`, `contextualizationTokens` and model tokens.',
            de: 'Die Abfrage-Antwort enthält `id`, `status`, einen `usage`-Block und – nach Erfolg – `result` mit `analyzerId`, `apiVersion`, `warnings` und `contents`. `usage` steht neben `result` und meldet Dokumentseiten, `audioHours`/`videoHours`, `contextualizationTokens` und Modell-Tokens.',
          },
          focus: ['root'],
        },
        {
          title: { en: 'One content object per input or segment', de: 'Ein Content-Objekt je Eingabe oder Segment' },
          text: {
            en: 'Each entry in `contents` has a `kind`: `document` (with page numbers) or `audioVisual` (with `startTimeMs` and `endTimeMs`). Segmented videos and classified files return several entries.',
            de: 'Jeder Eintrag in `contents` hat eine `kind`: `document` (mit Seitenzahlen) oder `audioVisual` (mit `startTimeMs` und `endTimeMs`). Segmentierte Videos und klassifizierte Dateien liefern mehrere Einträge.',
          },
          focus: ['e-r-c', 'contents'],
        },
        {
          title: { en: 'Markdown and fields side by side', de: 'Markdown und Felder nebeneinander' },
          text: {
            en: '`markdown` is the readable representation for search, LLM prompts and RAG (retrieve relevant content and ground the answer in it). `fields` follows your schema; each value is typed — `valueString`, `valueNumber`, `valueDate`, `valueArray`, `valueObject` — and the SDK exposes it as `.value`.',
            de: '`markdown` ist die lesbare Darstellung für Suche, LLM-Prompts und RAG (passende Inhalte abrufen und die Antwort darauf stützen). `fields` folgt deinem Schema; jeder Wert ist typisiert – `valueString`, `valueNumber`, `valueDate`, `valueArray`, `valueObject` – und das SDK stellt ihn als `.value` bereit.',
          },
          focus: ['e-c-md', 'markdown', 'e-c-f', 'fields'],
        },
        {
          title: { en: 'Details for verification', de: 'Details für die Prüfung' },
          text: {
            en: 'Document fields can add `confidence`, a `source` such as `D(1,69,234,…)` (page plus polygon) and `spans` that point into the Markdown. Documents always list `pages`; paragraphs, tables, lines and words — and for audio and video the `transcriptPhrases` with speakers and times — appear only with `returnDetails: true`.',
            de: 'Dokumentfelder können `confidence`, eine `source` wie `D(1,69,234,…)` (Seite plus Polygon) und `spans` mit Verweisen ins Markdown ergänzen. Dokumente listen immer `pages`; Absätze, Tabellen, Zeilen und Wörter – bei Audio und Video die `transcriptPhrases` mit Sprechern und Zeiten – erscheinen nur mit `returnDetails: true`.',
          },
          focus: ['e-f-v', 'fv', 'e-c-l', 'layout', 'e-c-av', 'av'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Foundry resource endpoint',
      text: {
        en: 'Content Understanding lives in a Foundry resource, so the client uses `https://<resource>.services.ai.azure.com/` plus paths under `/contentunderstanding/`. Use Microsoft Entra ID (managed identity, `DefaultAzureCredential`) in production; keep API keys for quick tests and never put them in code.',
        de: 'Content Understanding gehört zu einer Foundry-Ressource, daher nutzt der Client `https://<resource>.services.ai.azure.com/` plus Pfade unter `/contentunderstanding/`. Nutze in der Produktion Microsoft Entra ID (Managed Identity, `DefaultAzureCredential`); API-Keys sind nur für schnelle Tests da und gehören nie in den Code.',
      },
    },
    {
      term: 'Model deployment defaults',
      text: {
        en: 'Analyzers store model names; at analyze time the service maps them — and the prebuilt aliases `prebuilt-analyzer-completion`, `prebuilt-analyzer-completion-mini`, `prebuilt-analyzer-embedding` — to deployments. Set the defaults once per resource (the documented setup step) or pass `modelDeployments` per request (only for `:analyze` / `begin_analyze`; `begin_analyze_binary` has no `model_deployments`, so byte uploads rely on the defaults). Without either, analyzers that need a model fail; `prebuilt-read` and `prebuilt-layout` need none.',
        de: 'Analyzer speichern Modellnamen; beim Analysieren ordnet der Dienst sie – und die Prebuilt-Aliase `prebuilt-analyzer-completion`, `prebuilt-analyzer-completion-mini`, `prebuilt-analyzer-embedding` – Deployments zu. Lege die Defaults einmal pro Ressource fest (der dokumentierte Einrichtungsschritt) oder gib `modelDeployments` pro Anfrage mit (nur bei `:analyze` / `begin_analyze`; `begin_analyze_binary` hat kein `model_deployments`, Byte-Uploads brauchen also die Defaults). Ohne beides scheitern Analyzer, die ein Modell brauchen; `prebuilt-read` und `prebuilt-layout` brauchen keins.',
      },
    },
    {
      term: 'Long-running operation',
      text: {
        en: 'Create and analyze calls return at once with an `Operation-Location`. You poll it until the operation status is `Succeeded`, `Failed` or `Canceled` (a created analyzer then shows `status: ready`). SDK methods named `begin_*` return pollers whose `.result()` waits for you.',
        de: 'Anlege- und Analyseaufrufe kehren sofort mit einer `Operation-Location` zurück. Du fragst sie ab, bis der Operationsstatus `Succeeded`, `Failed` oder `Canceled` lautet (ein angelegter Analyzer zeigt dann `status: ready`). SDK-Methoden mit `begin_*` liefern Poller, deren `.result()` für dich wartet.',
      },
    },
    {
      term: 'analyze vs analyzeBinary',
      text: {
        en: '`:analyze` / `begin_analyze` take `inputs`, usually file URLs (videos by URL up to 4 GB and two hours). `:analyzeBinary` / `begin_analyze_binary` upload raw bytes (videos up to 200 MB and 30 minutes). Both accept a range of pages or milliseconds to analyze.',
        de: '`:analyze` / `begin_analyze` nehmen `inputs`, meist Datei-URLs (Videos per URL bis 4 GB und zwei Stunden). `:analyzeBinary` / `begin_analyze_binary` laden rohe Bytes hoch (Videos bis 200 MB und 30 Minuten). Beide akzeptieren einen Bereich aus Seiten oder Millisekunden.',
      },
    },
    {
      term: 'Analysis result',
      text: {
        en: '`result.contents[]` holds `markdown`, `fields` and modality details. Field values are typed (`valueString`, `valueNumber`, `valueDate` …); document fields include `confidence`, `source` and `spans` when source and confidence estimation is on. The `usage` block reports billable meters and tokens.',
        de: '`result.contents[]` enthält `markdown`, `fields` und Details je Modalität. Feldwerte sind typisiert (`valueString`, `valueNumber`, `valueDate` …); Dokumentfelder enthalten `confidence`, `source` und `spans`, wenn die Quellen- und Konfidenzschätzung an ist. Der `usage`-Block meldet abrechenbare Einheiten und Tokens.',
      },
    },
    {
      term: 'Result retention',
      text: {
        en: 'Inputs and results are kept in Microsoft-managed storage for up to 24 hours, then deleted. Persist what you need, or delete a result earlier with Delete Result (SDK: `delete_result(operation_id)`).',
        de: 'Eingaben und Ergebnisse liegen bis zu 24 Stunden in von Microsoft verwaltetem Speicher und werden danach gelöscht. Speichere, was du brauchst, oder lösche ein Ergebnis früher mit Delete Result (SDK: `delete_result(operation_id)`).',
      },
    },
  ],
  comparison: {
    title: { en: 'REST call or SDK method?', de: 'REST-Aufruf oder SDK-Methode?' },
    columns: [
      { en: 'Task', de: 'Aufgabe' },
      { en: 'REST (api-version=2025-11-01)', de: 'REST (api-version=2025-11-01)' },
      { en: 'Python SDK', de: 'Python SDK' },
    ],
    rows: [
      [{ en: 'Map model deployments', de: 'Modell-Deployments zuordnen' }, 'PATCH /contentunderstanding/defaults', 'update_defaults(model_deployments=…)'],
      [{ en: 'Create an analyzer', de: 'Analyzer anlegen' }, 'PUT /contentunderstanding/analyzers/{analyzerId}', 'begin_create_analyzer(analyzer_id, resource)'],
      [{ en: 'Analyze a file by URL', de: 'Datei per URL analysieren' }, 'POST …/analyzers/{analyzerId}:analyze', 'begin_analyze(analyzer_id, inputs=[AnalysisInput(url=…)])'],
      [{ en: 'Analyze raw bytes', de: 'Rohe Bytes analysieren' }, 'POST …/analyzers/{analyzerId}:analyzeBinary', 'begin_analyze_binary(analyzer_id, binary_input)'],
      [{ en: 'Get the result', de: 'Ergebnis abholen' }, 'GET /contentunderstanding/analyzerResults/{operationId}', 'poller.result()'],
      [{ en: 'Remove the analyzer', de: 'Analyzer entfernen' }, 'DELETE /contentunderstanding/analyzers/{analyzerId}', 'delete_analyzer(analyzer_id)'],
    ],
  },
  code: [
    {
      title: { en: 'SDK: set defaults, create a business-card analyzer, analyze a file', de: 'SDK: Defaults setzen, Visitenkarten-Analyzer anlegen, Datei analysieren' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.contentunderstanding import ContentUnderstandingClient
from azure.ai.contentunderstanding.models import AnalysisInput

client = ContentUnderstandingClient(
    endpoint="https://<resource>.services.ai.azure.com/",
    credential=DefaultAzureCredential(),
)

# One-time per resource: model names and aliases -> your deployment names
client.update_defaults(model_deployments={
    "gpt-5.2": "my-gpt52",
    "text-embedding-3-large": "my-embedding",
    "prebuilt-analyzer-completion": "my-gpt52",
    "prebuilt-analyzer-completion-mini": "my-gpt52",
    "prebuilt-analyzer-embedding": "my-embedding",
})

card_analyzer = {
    "description": "Business card: contact name and email",
    "baseAnalyzerId": "prebuilt-document",
    "config": {"estimateFieldSourceAndConfidence": True},
    "fieldSchema": {"fields": {
        "ContactName": {"type": "string", "method": "extract", "description": "Name of the person"},
        "EmailAddress": {"type": "string", "method": "extract", "description": "Email address"},
    }},
    "models": {"completion": "gpt-5.2", "embedding": "text-embedding-3-large"},
}
client.begin_create_analyzer("business_card", card_analyzer).result()

poller = client.begin_analyze(
    analyzer_id="business_card",
    inputs=[AnalysisInput(url="https://<storage>/cards/card-001.png")],
)
for name, field in poller.result().contents[0].fields.items():
    print(name, field.value, field.confidence)`,
      notes: [
        { en: '`update_defaults` runs once per resource; the deployment names are yours. To skip it, pass `model_deployments=` to every `begin_analyze` call.', de: '`update_defaults` läuft einmal pro Ressource; die Deployment-Namen wählst du selbst. Ohne Defaults gibst du jedem `begin_analyze`-Aufruf `model_deployments=` mit.' },
        { en: 'Rule: `extract` fields only work with source and confidence estimation on — here for the whole analyzer via `estimateFieldSourceAndConfidence`.', de: 'Regel: `extract`-Felder funktionieren nur mit eingeschalteter Quellen- und Konfidenzschätzung – hier für den ganzen Analyzer über `estimateFieldSourceAndConfidence`.' },
        { en: 'Both `begin_*` calls return pollers; `.result()` blocks until the long-running operation finishes.', de: 'Beide `begin_*`-Aufrufe liefern Poller; `.result()` blockiert, bis die Long-Running Operation fertig ist.' },
      ],
    },
    {
      title: { en: 'REST with requests: submit, poll, check, parse', de: 'REST mit requests: senden, abfragen, prüfen, auswerten' },
      code: `import time
import requests
from azure.identity import DefaultAzureCredential

endpoint = "https://<resource>.services.ai.azure.com"
token = DefaultAzureCredential().get_token("https://cognitiveservices.azure.com/.default").token
headers = {"Authorization": f"Bearer {token}"}

response = requests.post(
    f"{endpoint}/contentunderstanding/analyzers/business_card:analyze?api-version=2025-11-01",
    headers=headers,
    json={"inputs": [{"url": "https://<storage>/cards/card-001.png"}]},
)
response.raise_for_status()                              # expect 202 Accepted
operation_url = response.headers["Operation-Location"]

while True:
    body = requests.get(operation_url, headers=headers).json()
    if body["status"] not in ("NotStarted", "Running"):
        break
    time.sleep(2)

if body["status"] != "Succeeded":                        # Failed or Canceled
    raise RuntimeError(f"Analysis ended with status {body['status']}")

contact = body["result"]["contents"][0]["fields"]["ContactName"]
print(contact["valueString"], contact.get("confidence"), contact.get("source"))`,
      notes: [
        { en: 'Reuses the `business_card` analyzer from the SDK sample: REST and SDK call the same service.', de: 'Nutzt den `business_card`-Analyzer aus dem SDK-Beispiel: REST und SDK rufen denselben Dienst auf.' },
        { en: 'The `Operation-Location` header points to `/contentunderstanding/analyzerResults/{operationId}` — poll it instead of building the URL yourself. Only `Succeeded` carries a usable `result`.', de: 'Der Header `Operation-Location` zeigt auf `/contentunderstanding/analyzerResults/{operationId}` – frage ihn ab, statt die URL selbst zu bauen. Nur `Succeeded` liefert ein verwertbares `result`.' },
        { en: 'In raw JSON the value property depends on the type: `valueString`, `valueNumber`, `valueDate` and so on.', de: 'Im rohen JSON hängt die Werteigenschaft vom Typ ab: `valueString`, `valueNumber`, `valueDate` usw.' },
      ],
    },
  ],
  traps: [
    {
      en: 'The analyze `POST` doesn\'t return the result. It returns `202 Accepted` and an `Operation-Location` that you must poll.',
      de: 'Der Analyse-`POST` liefert nicht das Ergebnis. Er liefert `202 Accepted` und eine `Operation-Location`, die du abfragen musst.',
    },
    {
      en: '`:analyze` expects JSON with `inputs` (usually URLs). To upload the file itself, call `:analyzeBinary` (SDK: `begin_analyze_binary`).',
      de: '`:analyze` erwartet JSON mit `inputs` (meist URLs). Um die Datei selbst hochzuladen, rufst du `:analyzeBinary` auf (SDK: `begin_analyze_binary`).',
    },
    {
      en: 'Errors such as “default model deployment not configured” mean the defaults mapping is missing — not that the analyzer definition is wrong.',
      de: 'Fehler wie „default model deployment not configured“ bedeuten, dass die Defaults-Zuordnung fehlt – nicht, dass die Analyzer-Definition falsch ist.',
    },
    {
      en: 'An analyzer\'s `models` lists model **names**; `modelDeployments` (defaults or per request) maps them to deployment **names**. Mixing the two breaks the mapping.',
      de: 'Der Eintrag `models` eines Analyzers enthält Modell-**Namen**; `modelDeployments` (Defaults oder pro Anfrage) ordnet sie Deployment-**Namen** zu. Wer beides vertauscht, bricht die Zuordnung.',
    },
    {
      en: 'An `extract` field without `estimateSourceAndConfidence: true` (or the analyzer-wide `estimateFieldSourceAndConfidence`) is an invalid definition — `generate` and `classify` fields don\'t need it.',
      de: 'Ein `extract`-Feld ohne `estimateSourceAndConfidence: true` (oder das analyzerweite `estimateFieldSourceAndConfidence`) ist eine ungültige Definition – `generate`- und `classify`-Felder brauchen das nicht.',
    },
  ],
  takeaways: [
    { en: 'Defaults once per resource → analyzer once per schema → analyze many times.', de: 'Defaults einmal pro Ressource → Analyzer einmal pro Schema → beliebig oft analysieren.' },
    { en: 'Every create and analyze call is a long-running operation: follow `Operation-Location` or let the SDK poller wait.', de: 'Jeder Anlege- und Analyseaufruf ist eine Long-Running Operation: Folge der `Operation-Location` oder lass den SDK-Poller warten.' },
    { en: 'Production uses Microsoft Entra ID (`DefaultAzureCredential`, managed identity); API keys are for quick tests only.', de: 'Produktion nutzt Microsoft Entra ID (`DefaultAzureCredential`, Managed Identity); API-Keys sind nur für schnelle Tests.' },
    { en: 'Read values by type — `valueString`, `valueNumber`, `valueDate` — or `.value` in the SDK.', de: 'Lies Werte typgerecht – `valueString`, `valueNumber`, `valueDate` – oder `.value` im SDK.' },
  ],
  sources: [
    { title: 'Quickstart: Use Azure Content Understanding (REST API and SDKs)', url: 'https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/quickstart/use-rest-api' },
    { title: 'Azure AI Content Understanding client library for Python', url: 'https://learn.microsoft.com/en-us/python/api/overview/azure/ai-contentunderstanding-readme?view=azure-python' },
    { title: 'Content Analyzers REST API (2025-11-01)', url: 'https://learn.microsoft.com/en-us/rest/api/contentunderstanding/content-analyzers?view=rest-contentunderstanding-2025-11-01' },
    { title: 'Model deployment options for Content Understanding analyzers', url: 'https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/models-deployments' },
    { title: 'Data, privacy, and security for Content Understanding', url: 'https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/content-understanding/data-privacy' },
  ],
}
