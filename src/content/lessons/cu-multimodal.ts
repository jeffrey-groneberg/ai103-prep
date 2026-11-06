import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'cu-multimodal',
  summary: {
    en: 'Azure Content Understanding handles **documents, images, audio and video** with one pattern: pick or create an analyzer, submit a file, collect a JSON result. Every analysis runs in two stages. **Content extraction** turns the raw file into normalized content — OCR and layout for documents, transcripts with speaker labels for audio, key frames, shots and transcripts for video. **Field extraction** then uses your own Foundry model deployments to generate, classify or extract the fields in your schema. The output has two shapes: clean **Markdown** that you can chunk into a search index or hand to an agent, and **structured fields** — for documents with confidence scores and source grounding so people can verify each value. You design and test analyzers in Content Understanding Studio and call them through the REST API or SDKs.',
    de: 'Azure Content Understanding verarbeitet **Dokumente, Bilder, Audio und Video** nach einem Muster: Analyzer wählen oder anlegen, Datei senden, JSON-Ergebnis abholen. Jede Analyse läuft in zwei Stufen. Die **Inhaltsextraktion** macht aus der Rohdatei normalisierten Inhalt – OCR und Layout für Dokumente, Transkripte mit Sprecherkennzeichnung für Audio, Keyframes, Shots und Transkripte für Video. Die **Feldextraktion** nutzt danach deine eigenen Foundry-Modell-Deployments, um die Felder deines Schemas zu generieren, zu klassifizieren oder zu extrahieren. Die Ausgabe hat zwei Formen: sauberes **Markdown**, das du in Chunks für einen Suchindex zerlegst oder einem Agent übergibst, und **strukturierte Felder** – bei Dokumenten mit Konfidenzwerten und Quellen-Grounding, damit Menschen jeden Wert prüfen können. Analyzer entwirfst und testest du im Content Understanding Studio und rufst sie über die REST API oder SDKs auf.',
  },
  examFocus: {
    en: 'Questions target the right analyzer per modality (`prebuilt-documentSearch`, `prebuilt-imageSearch`, `prebuilt-audioSearch`, `prebuilt-videoSearch`, domain prebuilts or a custom analyzer), video settings (`enableSegment`, `contentCategories`, `returnDetails`, `locales`) and how results feed RAG and agents (`markdown` vs `fields`, `confidence`, `source`). The skills outline still says “pro mode”: know that pro mode existed only in the retired `2025-05-01-preview` API, that its reasoning successor is **agentic mode** (preview), and that production extraction runs on standard analyzers with the GA API `2025-11-01`.',
    de: 'Die Fragen zielen auf den passenden Analyzer je Modalität (`prebuilt-documentSearch`, `prebuilt-imageSearch`, `prebuilt-audioSearch`, `prebuilt-videoSearch`, Fach-Prebuilts oder ein eigener Analyzer), auf Video-Einstellungen (`enableSegment`, `contentCategories`, `returnDetails`, `locales`) und darauf, wie Ergebnisse in RAG und Agents einfließen (`markdown` vs. `fields`, `confidence`, `source`). Der Skills-Katalog spricht noch vom „Pro-Modus“: Wisse, dass es den Pro-Modus nur in der eingestellten API `2025-05-01-preview` gab, dass sein Nachfolger fürs Reasoning der **agentic mode** (Preview) ist und dass produktive Extraktion mit Standard-Analyzern auf der GA-API `2025-11-01` läuft.',
  },
  diagrams: [
    {
      id: 'cu-pipeline',
      title: { en: 'One pipeline for every modality', de: 'Eine Pipeline für jede Modalität' },
      caption: {
        en: 'Content extraction first, field extraction on your model deployments second — then Markdown for retrieval and typed fields for automation.',
        de: 'Erst Inhaltsextraktion, dann Feldextraktion auf deinen Modell-Deployments – danach Markdown für die Suche und typisierte Felder für die Automatisierung.',
      },
      width: 960,
      height: 370,
      groups: [{ id: 'g-an', x: 160, y: 50, w: 370, h: 150, label: 'Analyzer', tone: 'foundry' }],
      nodes: [
        { id: 'input', x: 20, y: 100, w: 120, h: 80, label: { en: 'Input file', de: 'Eingabedatei' }, sub: { en: 'doc · image\naudio · video', de: 'Dokument · Bild\nAudio · Video' }, tone: 'data', shape: 'doc' },
        { id: 'content', x: 180, y: 100, w: 150, h: 80, label: { en: 'Content extraction', de: 'Inhaltsextraktion' }, sub: { en: 'OCR · layout\ntranscript · shots', de: 'OCR · Layout\nTranskript · Shots' }, tone: 'foundry' },
        { id: 'field', x: 370, y: 100, w: 140, h: 80, label: { en: 'Field extraction', de: 'Feldextraktion' }, sub: 'extract · classify\ngenerate', tone: 'foundry' },
        { id: 'model', x: 365, y: 270, w: 150, h: 70, label: { en: 'Model deployment', de: 'Modell-Deployment' }, sub: { en: 'your deployments', de: 'deine Deployments' }, tone: 'model', shape: 'store' },
        { id: 'markdown', x: 570, y: 40, w: 170, h: 70, label: 'Markdown', sub: { en: 'for search + LLMs', de: 'für Suche + LLMs' }, tone: 'data', shape: 'doc' },
        { id: 'fields', x: 570, y: 170, w: 170, h: 70, label: { en: 'JSON fields', de: 'JSON-Felder' }, sub: { en: 'confidence · source', de: 'Konfidenz · Quelle' }, tone: 'data', shape: 'doc' },
        { id: 'search', x: 790, y: 40, w: 150, h: 70, label: { en: 'Search index', de: 'Suchindex' }, sub: { en: 'RAG grounding', de: 'RAG-Grounding' }, tone: 'data', shape: 'store' },
        { id: 'agent', x: 790, y: 170, w: 150, h: 70, label: { en: 'Agent / workflow', de: 'Agent / Workflow' }, sub: { en: 'automation', de: 'Automatisierung' }, tone: 'app' },
      ],
      edges: [
        { id: 'e-in', from: 'input', to: 'content' },
        { id: 'e-cf', from: 'content', to: 'field' },
        { id: 'e-model', from: 'field', to: 'model', label: { en: 'tokens', de: 'Tokens' }, bidir: true },
        { id: 'e-md', from: 'field', to: 'markdown' },
        { id: 'e-fj', from: 'field', to: 'fields' },
        { id: 'e-search', from: 'markdown', to: 'search' },
        { id: 'e-agent', from: 'fields', to: 'agent' },
        { id: 'e-ma', from: 'markdown', to: 'agent', dashed: true },
      ],
      steps: [
        {
          title: { en: 'One service, four modalities', de: 'Ein Dienst, vier Modalitäten' },
          text: {
            en: 'Documents (PDF, Office, scans), images, audio and video all go to an analyzer the same way — by URL (`:analyze`) or as bytes (`:analyzeBinary`). The call is asynchronous: it returns an `Operation-Location` that you poll until the status is `Succeeded`.',
            de: 'Dokumente (PDF, Office, Scans), Bilder, Audio und Video gehen alle auf dieselbe Weise an einen Analyzer – per URL (`:analyze`) oder als Bytes (`:analyzeBinary`). Der Aufruf ist asynchron: Er liefert eine `Operation-Location`, die du abfragst, bis der Status `Succeeded` lautet.',
          },
          focus: ['input', 'e-in', 'g-an'],
        },
        {
          title: { en: 'Content extraction first', de: 'Zuerst die Inhaltsextraktion' },
          text: {
            en: 'The service normalizes the input: OCR, layout, tables and figures for documents; transcripts with speaker diarization for audio; key frames, shot detection and transcripts for video. `prebuilt-read` and `prebuilt-layout` stop here and need no language model.',
            de: 'Der Dienst normalisiert die Eingabe: OCR, Layout, Tabellen und Abbildungen für Dokumente; Transkripte mit Sprechertrennung für Audio; Keyframes, Shot-Erkennung und Transkripte für Video. `prebuilt-read` und `prebuilt-layout` hören hier auf und brauchen kein Sprachmodell.',
          },
          focus: ['content'],
        },
        {
          title: { en: 'Field extraction on your models', de: 'Feldextraktion auf deinen Modellen' },
          text: {
            en: 'Field extraction, figure analysis and segmentation call **your** Foundry deployments of a chat completion model (and an embedding model where needed). The model tokens appear on that deployment; Content Understanding bills content extraction and contextualization.',
            de: 'Feldextraktion, Abbildungsanalyse und Segmentierung rufen **deine** Foundry-Deployments eines Chat-Completion-Modells auf (und bei Bedarf eines Embedding-Modells). Die Modell-Tokens erscheinen auf diesem Deployment; Content Understanding berechnet Inhaltsextraktion und Kontextualisierung.',
          },
          focus: ['e-cf', 'field', 'e-model', 'model'],
        },
        {
          title: { en: 'Two output shapes', de: 'Zwei Ausgabeformen' },
          text: {
            en: '`markdown` is a clean text representation — headings, HTML or Markdown tables, figure descriptions, WebVTT transcripts. `fields` are typed values from your schema; document fields can carry `confidence` (0–1) and a `source` that points to the page region.',
            de: '`markdown` ist eine saubere Textdarstellung – Überschriften, HTML- oder Markdown-Tabellen, Abbildungsbeschreibungen, WebVTT-Transkripte. `fields` sind typisierte Werte aus deinem Schema; Dokumentfelder können `confidence` (0–1) und eine `source` mit der Seitenregion tragen.',
          },
          focus: ['e-md', 'markdown', 'e-fj', 'fields'],
        },
        {
          title: { en: 'Feed retrieval and agents', de: 'Suche und Agents versorgen' },
          text: {
            en: 'Chunk and embed the Markdown into Azure AI Search for RAG, or add it to an agent\'s context. Hand typed fields to a workflow or agent tool, and route low-confidence values to human review.',
            de: 'Zerlege das Markdown in Chunks und bette es für RAG in Azure AI Search ein oder gib es einem Agent als Kontext. Typisierte Felder übergibst du an einen Workflow oder ein Agent-Tool; Werte mit niedriger Konfidenz gehen in die manuelle Prüfung.',
          },
          focus: ['e-search', 'search', 'e-agent', 'agent', 'e-ma'],
        },
      ],
    },
    {
      id: 'cu-video',
      title: { en: 'How a video becomes segments and fields', de: 'Wie aus einem Video Segmente und Felder werden' },
      caption: {
        en: 'Transcript, key frames and shots form the backbone; the model then cuts the timeline into segments and fills your fields for each one.',
        de: 'Transkript, Keyframes und Shots bilden das Gerüst; danach schneidet das Modell die Zeitleiste in Segmente und füllt für jedes deine Felder.',
      },
      width: 960,
      height: 370,
      nodes: [
        { id: 'video', x: 20, y: 150, w: 130, h: 70, label: 'Video', sub: 'MP4 · MOV · MKV', tone: 'data', shape: 'doc' },
        { id: 'transcript', x: 200, y: 40, w: 190, h: 64, label: { en: 'Transcript', de: 'Transkript' }, sub: { en: 'WebVTT · speakers', de: 'WebVTT · Sprecher' }, tone: 'foundry' },
        { id: 'keyframes', x: 200, y: 153, w: 190, h: 64, label: { en: 'Key frames', de: 'Keyframes' }, sub: 'keyFrameTimesMs', tone: 'foundry' },
        { id: 'shots', x: 200, y: 266, w: 190, h: 64, label: { en: 'Shot detection', de: 'Shot-Erkennung' }, sub: 'cameraShotTimesMs', tone: 'foundry' },
        { id: 'seg', x: 450, y: 150, w: 200, h: 70, label: { en: 'Segmentation', de: 'Segmentierung' }, sub: { en: 'enableSegment + 1 category', de: 'enableSegment + 1 Kategorie' }, tone: 'foundry' },
        { id: 'model', x: 450, y: 280, w: 200, h: 64, label: { en: 'Model deployment', de: 'Modell-Deployment' }, sub: { en: 'tokens even without fields', de: 'Tokens auch ohne Felder' }, tone: 'model', shape: 'store' },
        { id: 'fields', x: 700, y: 150, w: 240, h: 70, label: { en: 'Fields per segment', de: 'Felder je Segment' }, sub: 'generate · classify', tone: 'data' },
        { id: 'result', x: 700, y: 40, w: 240, h: 70, label: { en: 'One content per segment', de: 'Ein Content je Segment' }, sub: 'startTimeMs · endTimeMs', tone: 'data', shape: 'doc' },
      ],
      edges: [
        { id: 'e-v-t', from: 'video', to: 'transcript' },
        { id: 'e-v-k', from: 'video', to: 'keyframes' },
        { id: 'e-v-s', from: 'video', to: 'shots' },
        { id: 'e-t-seg', from: 'transcript', to: 'seg' },
        { id: 'e-k-seg', from: 'keyframes', to: 'seg' },
        { id: 'e-s-seg', from: 'shots', to: 'seg' },
        { id: 'e-seg-model', from: 'seg', to: 'model', bidir: true },
        { id: 'e-seg-f', from: 'seg', to: 'fields' },
        { id: 'e-f-res', from: 'fields', to: 'result' },
      ],
      steps: [
        {
          title: { en: 'Point to the video', de: 'Auf das Video verweisen' },
          text: {
            en: 'Reference the file by URL (up to 4 GB and two hours) or upload it with `analyzeBinary` (up to 200 MB and 30 minutes). Large videos belong in Blob Storage and are passed by URL.',
            de: 'Verweise per URL auf die Datei (bis 4 GB und zwei Stunden) oder lade sie mit `analyzeBinary` hoch (bis 200 MB und 30 Minuten). Große Videos gehören in Blob Storage und werden per URL übergeben.',
          },
          focus: ['video'],
        },
        {
          title: { en: 'Extract the backbone', de: 'Das Gerüst extrahieren' },
          text: {
            en: 'Content extraction produces a WebVTT transcript with speaker diarization, key frames per shot and shot boundaries (`cameraShotTimesMs`, returned with `returnDetails: true`). The service samples about one frame per second at 512 × 512 pixels and transcribes speech only.',
            de: 'Die Inhaltsextraktion liefert ein WebVTT-Transkript mit Sprechertrennung, Keyframes je Shot und Shot-Grenzen (`cameraShotTimesMs`, zurückgegeben mit `returnDetails: true`). Der Dienst tastet etwa ein Bild pro Sekunde mit 512 × 512 Pixeln ab und transkribiert nur Sprache.',
          },
          focus: ['e-v-t', 'transcript', 'e-v-k', 'keyframes', 'e-v-s', 'shots'],
        },
        {
          title: { en: 'Cut the timeline into segments', de: 'Die Zeitleiste in Segmente schneiden' },
          text: {
            en: '`prebuilt-videoSearch` segments automatically. In a custom analyzer, `enableSegment: false` treats the whole video as one segment; `enableSegment: true` plus **one** `contentCategories` entry describes in plain language where to cut. Segmentation calls the model, so it uses tokens even without fields.',
            de: '`prebuilt-videoSearch` segmentiert automatisch. In einem eigenen Analyzer behandelt `enableSegment: false` das ganze Video als ein Segment; `enableSegment: true` plus **ein** `contentCategories`-Eintrag beschreibt in Alltagssprache, wo geschnitten wird. Die Segmentierung ruft das Modell auf und verbraucht daher auch ohne Felder Tokens.',
          },
          focus: ['e-t-seg', 'e-k-seg', 'e-s-seg', 'seg', 'e-seg-model', 'model'],
        },
        {
          title: { en: 'Fill fields for each segment', de: 'Felder je Segment füllen' },
          text: {
            en: 'The fields in your schema are filled for every segment — for example a `generate` field for the brand on screen and a `classify` field for the ad category. A category can also hand its segments to another analyzer through `analyzerId`.',
            de: 'Die Felder deines Schemas werden für jedes Segment gefüllt – etwa ein `generate`-Feld für die sichtbare Marke und ein `classify`-Feld für die Werbekategorie. Eine Kategorie kann ihre Segmente außerdem über `analyzerId` an einen anderen Analyzer weitergeben.',
          },
          focus: ['e-seg-f', 'fields'],
        },
        {
          title: { en: 'Read one content object per segment', de: 'Ein Content-Objekt je Segment lesen' },
          text: {
            en: '`result.contents` holds one `audioVisual` object per segment with `startTimeMs`, `endTimeMs`, Markdown (transcript plus key-frame references) and its fields. Key-frame images are separate result files you can download.',
            de: '`result.contents` enthält je Segment ein `audioVisual`-Objekt mit `startTimeMs`, `endTimeMs`, Markdown (Transkript plus Keyframe-Verweise) und seinen Feldern. Keyframe-Bilder sind eigene Ergebnisdateien, die du herunterladen kannst.',
          },
          focus: ['e-f-res', 'result'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Content extraction',
      text: {
        en: 'The first stage of every analysis: OCR, selection marks, barcodes, formulas and layout for documents; transcription with diarization for audio; key frames, shots and transcripts for video. It is billed per page or per minute and can run without generative models.',
        de: 'Die erste Stufe jeder Analyse: OCR, Auswahlfelder, Barcodes, Formeln und Layout für Dokumente; Transkription mit Sprechertrennung für Audio; Keyframes, Shots und Transkripte für Video. Sie wird pro Seite oder Minute abgerechnet und kann ohne generative Modelle laufen.',
      },
    },
    {
      term: 'Field extraction',
      text: {
        en: 'The schema-driven second stage. Fields use `generate`, `classify` or — documents only — `extract`. Typed values such as dates and numbers are normalized automatically, and document fields can return `confidence` and `source` for review.',
        de: 'Die schemagesteuerte zweite Stufe. Felder nutzen `generate`, `classify` oder – nur bei Dokumenten – `extract`. Typisierte Werte wie Datumsangaben und Zahlen werden automatisch normalisiert, und Dokumentfelder können `confidence` und `source` für die Prüfung liefern.',
      },
    },
    {
      term: 'RAG analyzers',
      text: {
        en: '`prebuilt-documentSearch` (layout, figure descriptions, chart data, summary), `prebuilt-imageSearch`, `prebuilt-audioSearch` (transcript with speakers plus summary) and `prebuilt-videoSearch` (segments with transcripts, key frames and summaries) return Markdown that is ready for indexing.',
        de: '`prebuilt-documentSearch` (Layout, Abbildungsbeschreibungen, Diagrammdaten, Zusammenfassung), `prebuilt-imageSearch`, `prebuilt-audioSearch` (Transkript mit Sprechern plus Zusammenfassung) und `prebuilt-videoSearch` (Segmente mit Transkripten, Keyframes und Zusammenfassungen) liefern Markdown, das direkt indexiert werden kann.',
      },
    },
    {
      term: 'contentCategories and enableSegment',
      text: {
        en: 'Classification without training data: describe up to 200 document categories (one for video) and optionally link each to an `analyzerId`. `enableSegment: true` splits a file into segments first. Add an `other` category, or every file is forced into one of yours.',
        de: 'Klassifizierung ohne Trainingsdaten: Beschreibe bis zu 200 Dokumentkategorien (bei Video eine) und verknüpfe jede optional mit einer `analyzerId`. `enableSegment: true` teilt eine Datei vorher in Segmente. Ergänze eine Kategorie `other`, sonst landet jede Datei zwangsweise in einer deiner Kategorien.',
      },
    },
    {
      term: 'Agentic mode (preview)',
      text: {
        en: 'The current option for reasoning over document evidence — calculations, validations, cross-references within one input file. Set `config.workflow` to `"agentic"` with API version `2026-06-01-preview`. It replaces pro mode from the retired `2025-05-01-preview` API, costs more tokens and doesn\'t support `extract` fields.',
        de: 'Die aktuelle Option für Reasoning über Belege in Dokumenten – Berechnungen, Prüfungen, Querverweise innerhalb einer Eingabedatei. Du setzt `config.workflow` auf `"agentic"` mit der API-Version `2026-06-01-preview`. Sie ersetzt den Pro-Modus der eingestellten API `2025-05-01-preview`, verbraucht mehr Tokens und unterstützt keine `extract`-Felder.',
      },
    },
    {
      term: 'Content Understanding Studio',
      text: {
        en: 'The web experience for building analyzers: create a project, upload a sample, start from a suggested template or AI-suggested fields, test, then build the analyzer and call it from code. Custom analyzers and labeling are Studio features; the Foundry portal playground covers prebuilt analyzers.',
        de: 'Die Weboberfläche zum Bauen von Analyzern: Projekt anlegen, Beispieldatei hochladen, mit einer vorgeschlagenen Vorlage oder KI-vorgeschlagenen Feldern starten, testen, dann den Analyzer bauen und aus Code aufrufen. Eigene Analyzer und Labeling gibt es im Studio; der Playground im Foundry-Portal deckt Prebuilt-Analyzer ab.',
      },
    },
  ],
  comparison: {
    title: { en: 'Pick a prebuilt analyzer', de: 'Den passenden Prebuilt-Analyzer wählen' },
    columns: [
      { en: 'Analyzer', de: 'Analyzer' },
      { en: 'Input', de: 'Eingabe' },
      { en: 'You get', de: 'Du bekommst' },
    ],
    rows: [
      ['prebuilt-read / prebuilt-layout', { en: 'Documents', de: 'Dokumente' }, { en: 'OCR text or full layout — no language model needed', de: 'OCR-Text oder komplettes Layout – ohne Sprachmodell' }],
      ['prebuilt-documentSearch', { en: 'Documents, images with text', de: 'Dokumente, Bilder mit Text' }, { en: 'RAG-ready Markdown, figure descriptions, summary', de: 'RAG-fähiges Markdown, Abbildungsbeschreibungen, Zusammenfassung' }],
      ['prebuilt-imageSearch', { en: 'Images', de: 'Bilder' }, { en: 'One-paragraph description', de: 'Beschreibung in einem Absatz' }],
      ['prebuilt-audioSearch', { en: 'Audio', de: 'Audio' }, { en: 'WebVTT transcript with speakers and a summary', de: 'WebVTT-Transkript mit Sprechern und Zusammenfassung' }],
      ['prebuilt-callCenter', { en: 'Call recordings', de: 'Anrufaufzeichnungen' }, { en: 'Agent/customer roles, summary, sentiment, topics', de: 'Rollen Agent/Kunde, Zusammenfassung, Stimmung, Themen' }],
      ['prebuilt-videoSearch', { en: 'Video', de: 'Video' }, { en: 'Segments with transcript, key frames and summaries', de: 'Segmente mit Transkript, Keyframes und Zusammenfassungen' }],
      ['prebuilt-invoice, prebuilt-idDocument, …', { en: 'Domain documents', de: 'Fachdokumente' }, { en: 'Tuned field schemas for that document type', de: 'Abgestimmte Feldschemas für diesen Dokumenttyp' }],
    ],
  },
  code: [
    {
      title: { en: 'Analyze a video with prebuilt-videoSearch', de: 'Video mit prebuilt-videoSearch analysieren' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.contentunderstanding import ContentUnderstandingClient
from azure.ai.contentunderstanding.models import AnalysisInput

client = ContentUnderstandingClient(
    endpoint="https://<resource>.services.ai.azure.com/",
    credential=DefaultAzureCredential(),
)

poller = client.begin_analyze(
    analyzer_id="prebuilt-videoSearch",
    inputs=[AnalysisInput(url="https://<storage>/videos/site-inspection.mp4")],
)
result = poller.result()

for segment in result.contents:            # one audioVisual content per segment
    summary = segment.fields.get("Summary")
    print(segment.start_time_ms, segment.end_time_ms, summary.value if summary else "")
    print(segment.markdown[:300])          # WebVTT transcript + key-frame references`,
      notes: [
        { en: 'Large videos are passed by URL in `inputs`; `begin_analyze_binary` is limited to 200 MB and 30 minutes.', de: 'Große Videos übergibst du per URL in `inputs`; `begin_analyze_binary` ist auf 200 MB und 30 Minuten begrenzt.' },
        { en: 'Each segment carries its own time range, Markdown and `Summary` field — ideal units for a search index.', de: 'Jedes Segment hat eigenen Zeitbereich, eigenes Markdown und ein eigenes `Summary`-Feld – ideale Einheiten für einen Suchindex.' },
      ],
    },
    {
      title: { en: 'Custom video analyzer with natural-language segmentation', de: 'Eigener Video-Analyzer mit Segmentierung in Alltagssprache' },
      code: `inspection_video = {
    "baseAnalyzerId": "prebuilt-video",
    "description": "Splits site-inspection videos into one segment per room",
    "models": {"completion": "gpt-5.2"},
    "config": {
        "returnDetails": True,         # adds cameraShotTimesMs and phrase timing
        "locales": ["en-US"],          # skip multilingual auto-detection
        "enableSegment": True,
        "contentCategories": {         # video: exactly one category
            "room": {
                "description": "Start a new segment whenever the camera enters a different room.",
                "analyzerId": "room_damage",   # existing analyzer that fills fields per segment
            }
        },
    },
}
client.begin_create_analyzer("inspection_video", inspection_video).result()`,
      notes: [
        { en: 'The category `description` is the segmentation prompt: say exactly where a new segment starts.', de: 'Die `description` der Kategorie ist der Segmentierungs-Prompt: Beschreibe genau, wo ein neues Segment beginnt.' },
        { en: '`begin_create_analyzer` also accepts a plain JSON-style dict instead of `ContentAnalyzer` model objects.', de: '`begin_create_analyzer` akzeptiert statt `ContentAnalyzer`-Objekten auch ein einfaches Dict im JSON-Stil.' },
      ],
    },
  ],
  traps: [
    {
      en: 'There is no pro mode in the GA API. It existed only in `2025-05-01-preview`, which is retired. Its successor, agentic mode, is preview, documents only, one input file per request and no `extract` fields.',
      de: 'In der GA-API gibt es keinen Pro-Modus. Er existierte nur in `2025-05-01-preview`, und diese Version ist eingestellt. Sein Nachfolger, der agentic mode, ist Preview, nur für Dokumente, eine Eingabedatei pro Anfrage und ohne `extract`-Felder.',
    },
    {
      en: 'Confidence scores and source grounding are document features. Audio, video and image fields return values without them.',
      de: 'Konfidenzwerte und Quellen-Grounding sind Dokumentfunktionen. Audio-, Video- und Bildfelder liefern Werte ohne sie.',
    },
    {
      en: 'Video segmentation supports exactly one `contentCategories` entry, and it consumes model tokens even when the analyzer defines no fields.',
      de: 'Die Videosegmentierung unterstützt genau einen `contentCategories`-Eintrag und verbraucht Modell-Tokens, auch wenn der Analyzer keine Felder definiert.',
    },
    {
      en: 'Video analysis samples roughly one frame per second at 512 × 512 pixels, so very short events and small details can be missed; music and ambient sound aren\'t transcribed.',
      de: 'Die Videoanalyse tastet etwa ein Bild pro Sekunde mit 512 × 512 Pixeln ab – sehr kurze Ereignisse und kleine Details können fehlen; Musik und Umgebungsgeräusche werden nicht transkribiert.',
    },
    {
      en: 'Without an `other` category, `contentCategories` forces every file or segment into one of your categories — even when nothing fits.',
      de: 'Ohne Kategorie `other` zwingt `contentCategories` jede Datei und jedes Segment in eine deiner Kategorien – selbst wenn keine passt.',
    },
  ],
  takeaways: [
    { en: 'Content extraction first, field extraction on your own model deployments second.', de: 'Erst Inhaltsextraktion, dann Feldextraktion auf deinen eigenen Modell-Deployments.' },
    { en: 'Markdown feeds retrieval and agent context; typed fields feed automation.', de: 'Markdown versorgt Suche und Agent-Kontext; typisierte Felder versorgen die Automatisierung.' },
    { en: 'Production extraction: standard analyzers on GA `2025-11-01`. Agentic mode only when reasoning is needed and preview is acceptable.', de: 'Produktive Extraktion: Standard-Analyzer auf GA `2025-11-01`. Agentic mode nur, wenn Reasoning nötig und Preview akzeptabel ist.' },
    { en: 'Route low-confidence document fields to people, using `source` to show where each value came from.', de: 'Dokumentfelder mit niedriger Konfidenz gehen an Menschen – `source` zeigt, woher jeder Wert stammt.' },
  ],
  sources: [
    { title: 'What is Azure Content Understanding in Foundry Tools?', url: 'https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview' },
    { title: 'Azure Content Understanding video solutions', url: 'https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/video/overview' },
    { title: 'Prebuilt analyzers in Azure Content Understanding', url: 'https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/prebuilt-analyzers' },
    { title: 'Agentic mode for document analysis (preview)', url: 'https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/agentic-mode' },
    { title: 'Content Understanding classification and segmentation', url: 'https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/classifier' },
  ],
}
