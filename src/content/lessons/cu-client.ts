import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'cu-client',
  summary: {
    en: 'A Content Understanding client app talks to your **Foundry resource endpoint** (`https://<resource>.services.ai.azure.com/`), either with plain REST calls or with the `azure-ai-contentunderstanding` Python SDK. Before the first analysis, the resource needs model deployments and a one-time **defaults** mapping so analyzers know which deployment serves which model. Every operation is **asynchronous**: creating an analyzer (`PUT`) and analyzing a file (`POST …:analyze`) both return an `Operation-Location` that you poll until the status is final — the SDK wraps this in pollers such as `begin_create_analyzer` and `begin_analyze`. The result JSON holds `contents[]`, each with `markdown`, typed `fields` and, for documents, the OCR layout (pages, words, lines, paragraphs).',
    de: 'Eine Content-Understanding-Client-App spricht mit dem **Endpoint deiner Foundry-Ressource** (`https://<resource>.services.ai.azure.com/`) – entweder mit einfachen REST-Aufrufen oder mit dem Python SDK `azure-ai-contentunderstanding`. Vor der ersten Analyse braucht die Ressource Modell-Deployments und eine einmalige **Defaults**-Zuordnung, damit Analyzer wissen, welches Deployment welches Modell bedient. Jede Operation ist **asynchron**: Das Anlegen eines Analyzers (`PUT`) und das Analysieren einer Datei (`POST …:analyze`) liefern jeweils eine `Operation-Location`, die du abfragst, bis der Status final ist – das SDK kapselt das in Pollern wie `begin_create_analyzer` und `begin_analyze`. Das Ergebnis-JSON enthält `contents[]`, jeweils mit `markdown`, typisierten `fields` und bei Dokumenten dem OCR-Layout (Seiten, Wörter, Zeilen, Absätze).',
  },
  examFocus: {
    en: 'Expect sequencing questions (defaults → create analyzer → analyze → poll), the difference between `:analyze` (URLs in `inputs`) and `:analyzeBinary` (raw bytes), status values (`NotStarted`, `Running`, `Succeeded`, `Failed`), authentication (Microsoft Entra ID with `DefaultAzureCredential` or the `Ocp-Apim-Subscription-Key` header) and reading results (`valueString` or `.value`, `confidence`, `source`, `spans`). Code items often show an SDK call with a missing method or argument.',
    de: 'Rechne mit Fragen zur Reihenfolge (Defaults → Analyzer anlegen → analysieren → abfragen), zum Unterschied zwischen `:analyze` (URLs in `inputs`) und `:analyzeBinary` (rohe Bytes), zu Statuswerten (`NotStarted`, `Running`, `Succeeded`, `Failed`), zur Authentifizierung (Microsoft Entra ID mit `DefaultAzureCredential` oder Header `Ocp-Apim-Subscription-Key`) und zum Lesen der Ergebnisse (`valueString` bzw. `.value`, `confidence`, `source`, `spans`). Code-Aufgaben zeigen oft einen SDK-Aufruf mit fehlender Methode oder fehlendem Argument.',
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
        { id: 'g-svc', x: 610, y: 20, w: 330, h: 430, label: 'Foundry resource', tone: 'foundry' },
      ],
      nodes: [
        { id: 'a1', x: 45, y: 65, w: 280, h: 56, label: 'PATCH …/defaults', sub: { en: 'map model names → deployments', de: 'Modellnamen → Deployments zuordnen' }, tone: 'app', shape: 'pill' },
        { id: 'a2', x: 45, y: 165, w: 280, h: 56, label: 'PUT …/analyzers/{id}', sub: { en: 'analyzer JSON: base + schema', de: 'Analyzer-JSON: Basis + Schema' }, tone: 'app', shape: 'pill' },
        { id: 'a3', x: 45, y: 265, w: 280, h: 56, label: 'POST …/analyzers/{id}:analyze', sub: 'inputs: [{ "url": … }]', tone: 'app', shape: 'pill' },
        { id: 'a4', x: 45, y: 365, w: 280, h: 56, label: 'GET …/analyzerResults/{id}', sub: { en: 'poll every 1–2 seconds', de: 'alle 1–2 Sekunden abfragen' }, tone: 'app', shape: 'pill' },
        { id: 's1', x: 635, y: 65, w: 280, h: 56, label: { en: 'Defaults stored', de: 'Defaults gespeichert' }, sub: { en: 'once per resource', de: 'einmal pro Ressource' }, tone: 'foundry', shape: 'pill' },
        { id: 's2', x: 635, y: 165, w: 280, h: 56, label: '201 + Operation-Location', sub: 'status: creating → ready', tone: 'foundry', shape: 'pill' },
        { id: 's3', x: 635, y: 265, w: 280, h: 56, label: '202 + Operation-Location', sub: '{ "status": "NotStarted" }', tone: 'foundry', shape: 'pill' },
        { id: 's4', x: 635, y: 365, w: 280, h: 56, label: '200 · status: Succeeded', sub: { en: 'result.contents: markdown + fields', de: 'result.contents: Markdown + Felder' }, tone: 'foundry', shape: 'pill' },
      ],
      edges: [
        { id: 'e1', from: 'a1', to: 's1', label: { en: 'one-time setup', de: 'einmalig' } },
        { id: 'e2', from: 'a2', to: 's2', label: { en: 'create', de: 'anlegen' } },
        { id: 'e3', from: 'a3', to: 's3', label: { en: 'analyze', de: 'analysieren' } },
        { id: 'e-loc', from: 's3', to: 'a4', label: 'Operation-Location', dashed: true },
        { id: 'e4', from: 'a4', to: 's4', label: { en: 'poll', de: 'abfragen' }, bidir: true },
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
            en: '`PATCH /contentunderstanding/defaults` maps model names and aliases such as `prebuilt-analyzer-completion` to your deployment names (SDK: `update_defaults(model_deployments=…)`). Content Understanding Studio can do this for you, and a single request can override it with `modelDeployments`.',
            de: '`PATCH /contentunderstanding/defaults` ordnet Modellnamen und Aliase wie `prebuilt-analyzer-completion` deinen Deployment-Namen zu (SDK: `update_defaults(model_deployments=…)`). Content Understanding Studio kann das für dich erledigen, und eine einzelne Anfrage kann es mit `modelDeployments` überschreiben.',
          },
          focus: ['a1', 'e1', 's1'],
        },
        {
          title: { en: 'Create the analyzer', de: 'Analyzer anlegen' },
          text: {
            en: '`PUT /contentunderstanding/analyzers/{analyzerId}` sends the definition (`baseAnalyzerId`, `fieldSchema`, `config`, `models`). The 201 response carries an `Operation-Location` you poll until the analyzer is ready; the SDK does this with `begin_create_analyzer(...).result()`.',
            de: '`PUT /contentunderstanding/analyzers/{analyzerId}` schickt die Definition (`baseAnalyzerId`, `fieldSchema`, `config`, `models`). Die Antwort 201 enthält eine `Operation-Location`, die du abfragst, bis der Analyzer bereit ist; im SDK erledigt das `begin_create_analyzer(...).result()`.',
          },
          focus: ['a2', 'e2', 's2'],
        },
        {
          title: { en: 'Submit content', de: 'Inhalt einreichen' },
          text: {
            en: '`POST …/analyzers/{analyzerId}:analyze` takes JSON with `inputs` (file URLs); `:analyzeBinary` takes the raw bytes in the body. Both answer `202 Accepted` with an `Operation-Location` and a status of `NotStarted`.',
            de: '`POST …/analyzers/{analyzerId}:analyze` nimmt JSON mit `inputs` (Datei-URLs); `:analyzeBinary` nimmt die rohen Bytes im Body. Beide antworten mit `202 Accepted`, einer `Operation-Location` und dem Status `NotStarted`.',
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
        { id: 'root', x: 380, y: 20, w: 200, h: 56, label: 'result', sub: 'analyzerId · contents[]', tone: 'data' },
        { id: 'contents', x: 380, y: 120, w: 200, h: 56, label: 'contents[0]', sub: 'kind: document | audioVisual', tone: 'data' },
        { id: 'markdown', x: 20, y: 230, w: 200, h: 56, label: 'markdown', sub: { en: 'text for RAG and LLMs', de: 'Text für RAG und LLMs' }, tone: 'data', shape: 'doc' },
        { id: 'fields', x: 260, y: 230, w: 200, h: 56, label: 'fields', sub: { en: 'your schema, typed', de: 'dein Schema, typisiert' }, tone: 'data' },
        { id: 'layout', x: 500, y: 230, w: 200, h: 56, label: 'pages · paragraphs', sub: { en: 'documents: words · tables', de: 'Dokumente: Wörter · Tabellen' }, tone: 'data' },
        { id: 'av', x: 740, y: 230, w: 200, h: 56, label: 'transcriptPhrases', sub: { en: 'audio/video: speakers, times', de: 'Audio/Video: Sprecher, Zeit' }, tone: 'data' },
        { id: 'fv', x: 200, y: 340, w: 320, h: 56, label: { en: 'Field value', de: 'Feldwert' }, sub: 'valueString · confidence · source · spans', tone: 'data' },
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
            en: 'The polling response carries `id`, `status` and — once it has succeeded — `result` with `analyzerId`, `apiVersion`, `warnings` and `contents`. A `usage` block lists pages, minutes and tokens consumed.',
            de: 'Die Abfrage-Antwort enthält `id`, `status` und – nach Erfolg – `result` mit `analyzerId`, `apiVersion`, `warnings` und `contents`. Ein `usage`-Block nennt verbrauchte Seiten, Minuten und Tokens.',
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
            en: '`markdown` is the readable representation for search and LLM prompts. `fields` follows your schema; each value is typed — `valueString`, `valueNumber`, `valueDate`, `valueArray`, `valueObject` — and the SDK exposes it as `.value`.',
            de: '`markdown` ist die lesbare Darstellung für Suche und LLM-Prompts. `fields` folgt deinem Schema; jeder Wert ist typisiert – `valueString`, `valueNumber`, `valueDate`, `valueArray`, `valueObject` – und das SDK stellt ihn als `.value` bereit.',
          },
          focus: ['e-c-md', 'markdown', 'e-c-f', 'fields'],
        },
        {
          title: { en: 'Details for verification', de: 'Details für die Prüfung' },
          text: {
            en: 'Document fields can add `confidence`, a `source` such as `D(1,69,234,…)` (page plus polygon) and `spans` that point into the Markdown. Documents also list pages, words, lines and paragraphs; audio and video list `transcriptPhrases` with speakers and times.',
            de: 'Dokumentfelder können `confidence`, eine `source` wie `D(1,69,234,…)` (Seite plus Polygon) und `spans` mit Verweisen ins Markdown ergänzen. Dokumente listen zudem Seiten, Wörter, Zeilen und Absätze; Audio und Video listen `transcriptPhrases` mit Sprechern und Zeiten.',
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
        en: 'Content Understanding lives in a Foundry resource, so the client uses `https://<resource>.services.ai.azure.com/` plus paths under `/contentunderstanding/`. Prefer Microsoft Entra ID (managed identity, `DefaultAzureCredential`); keys go into Azure Key Vault if you must use them.',
        de: 'Content Understanding gehört zu einer Foundry-Ressource, daher nutzt der Client `https://<resource>.services.ai.azure.com/` plus Pfade unter `/contentunderstanding/`. Bevorzuge Microsoft Entra ID (Managed Identity, `DefaultAzureCredential`); Keys gehören, wenn nötig, in Azure Key Vault.',
      },
    },
    {
      term: 'Model deployment defaults',
      text: {
        en: 'A one-time mapping per resource from model names and prebuilt aliases (`prebuilt-analyzer-completion`, `prebuilt-analyzer-completion-mini`, `prebuilt-analyzer-embedding`) to your deployments. Without it, analyzers that need a model fail; `prebuilt-read` and `prebuilt-layout` work without one.',
        de: 'Eine einmalige Zuordnung pro Ressource von Modellnamen und Prebuilt-Aliasen (`prebuilt-analyzer-completion`, `prebuilt-analyzer-completion-mini`, `prebuilt-analyzer-embedding`) zu deinen Deployments. Ohne sie scheitern Analyzer, die ein Modell brauchen; `prebuilt-read` und `prebuilt-layout` funktionieren auch ohne.',
      },
    },
    {
      term: 'Long-running operation',
      text: {
        en: 'Create and analyze calls return at once with an `Operation-Location`. You poll it until the status is `Succeeded`, `Failed` or `Canceled`. SDK methods named `begin_*` return pollers whose `.result()` waits for you.',
        de: 'Anlege- und Analyseaufrufe kehren sofort mit einer `Operation-Location` zurück. Du fragst sie ab, bis der Status `Succeeded`, `Failed` oder `Canceled` lautet. SDK-Methoden mit `begin_*` liefern Poller, deren `.result()` für dich wartet.',
      },
    },
    {
      term: 'analyze vs analyzeBinary',
      text: {
        en: '`:analyze` / `begin_analyze` take `inputs` with URLs (videos up to 4 GB and two hours). `:analyzeBinary` / `begin_analyze_binary` upload raw bytes (videos up to 200 MB and 30 minutes). Both accept a range of pages or milliseconds to analyze.',
        de: '`:analyze` / `begin_analyze` nehmen `inputs` mit URLs (Videos bis 4 GB und zwei Stunden). `:analyzeBinary` / `begin_analyze_binary` laden rohe Bytes hoch (Videos bis 200 MB und 30 Minuten). Beide akzeptieren einen Bereich aus Seiten oder Millisekunden.',
      },
    },
    {
      term: 'Analysis result',
      text: {
        en: '`result.contents[]` holds `markdown`, `fields` and modality details. Field values are typed (`valueString`, `valueNumber`, `valueDate` …); document fields can include `confidence`, `source` and `spans`. The `usage` block reports billable meters and tokens.',
        de: '`result.contents[]` enthält `markdown`, `fields` und Details je Modalität. Feldwerte sind typisiert (`valueString`, `valueNumber`, `valueDate` …); Dokumentfelder können `confidence`, `source` und `spans` enthalten. Der `usage`-Block meldet abrechenbare Einheiten und Tokens.',
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
      title: { en: 'SDK: create a business-card analyzer and analyze a file', de: 'SDK: Visitenkarten-Analyzer anlegen und Datei analysieren' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.contentunderstanding import ContentUnderstandingClient
from azure.ai.contentunderstanding.models import AnalysisInput

client = ContentUnderstandingClient(
    endpoint="https://<resource>.services.ai.azure.com/",
    credential=DefaultAzureCredential(),
)

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
        { en: '`extract` fields need confidence estimation turned on — here for the whole analyzer via `estimateFieldSourceAndConfidence`.', de: '`extract`-Felder brauchen eingeschaltete Konfidenzschätzung – hier für den ganzen Analyzer über `estimateFieldSourceAndConfidence`.' },
        { en: 'Both `begin_*` calls return pollers; `.result()` blocks until the long-running operation finishes.', de: 'Beide `begin_*`-Aufrufe liefern Poller; `.result()` blockiert, bis die Long-Running Operation fertig ist.' },
      ],
    },
    {
      title: { en: 'REST with requests: submit, poll, parse', de: 'REST mit requests: senden, abfragen, auswerten' },
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
operation_url = response.headers["Operation-Location"]   # 202 Accepted

while True:
    body = requests.get(operation_url, headers=headers).json()
    if body["status"] not in ("NotStarted", "Running"):
        break
    time.sleep(2)

contact = body["result"]["contents"][0]["fields"]["ContactName"]
print(contact["valueString"], contact.get("confidence"), contact.get("source"))`,
      notes: [
        { en: 'The `Operation-Location` header points to `/contentunderstanding/analyzerResults/{operationId}` — poll it instead of building the URL yourself.', de: 'Der Header `Operation-Location` zeigt auf `/contentunderstanding/analyzerResults/{operationId}` – frage ihn ab, statt die URL selbst zu bauen.' },
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
      en: '`:analyze` expects JSON with `inputs` (URLs). To upload the file itself, call `:analyzeBinary` (SDK: `begin_analyze_binary`).',
      de: '`:analyze` erwartet JSON mit `inputs` (URLs). Um die Datei selbst hochzuladen, rufst du `:analyzeBinary` auf (SDK: `begin_analyze_binary`).',
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
      en: 'Results disappear after at most 24 hours. Store the JSON you need instead of polling the same operation later.',
      de: 'Ergebnisse verschwinden spätestens nach 24 Stunden. Speichere das benötigte JSON, statt dieselbe Operation später erneut abzufragen.',
    },
  ],
  takeaways: [
    { en: 'Defaults once per resource → analyzer once per schema → analyze many times.', de: 'Defaults einmal pro Ressource → Analyzer einmal pro Schema → beliebig oft analysieren.' },
    { en: 'Every create and analyze call is a long-running operation: follow `Operation-Location` or let the SDK poller wait.', de: 'Jeder Anlege- und Analyseaufruf ist eine Long-Running Operation: Folge der `Operation-Location` oder lass den SDK-Poller warten.' },
    { en: 'Prefer Microsoft Entra ID (`DefaultAzureCredential`, managed identity) over API keys.', de: 'Bevorzuge Microsoft Entra ID (`DefaultAzureCredential`, Managed Identity) gegenüber API-Keys.' },
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
