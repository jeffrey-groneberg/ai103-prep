import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'cu-multimodal',
  summary: {
    en: 'Azure Content Understanding handles **documents, images, audio and video** with one pattern: pick or create an analyzer, submit a file, collect a JSON result. **Content extraction** turns documents, audio and video into normalized content — OCR and layout for documents, transcripts with speaker labels for audio, key frames, shots and transcripts for video (images have no extraction stage). Only the generative features — fields, figure analysis, segmentation, categorization and training — add a model stage: **field extraction** uses your own Foundry model deployments (a deployment can have any name) to generate, classify or extract the fields in your schema. The output has two shapes: clean **Markdown** that you can chunk into a search index for **RAG** (retrieve relevant content and ground the answer in it) or hand to an agent, and **structured fields** — for documents with confidence scores and source grounding so people can verify each value. You design and test analyzers in Content Understanding Studio and call them through the REST API or SDKs.',
    de: 'Azure Content Understanding verarbeitet **Dokumente, Bilder, Audio und Video** nach einem Muster: Analyzer wählen oder anlegen, Datei senden, JSON-Ergebnis abholen. Die **Inhaltsextraktion** macht aus Dokumenten, Audio und Video normalisierten Inhalt – OCR und Layout für Dokumente, Transkripte mit Sprecherkennzeichnung für Audio, Keyframes, Shots und Transkripte für Video (Bilder haben keine Extraktionsstufe). Nur die generativen Funktionen – Felder, Abbildungsanalyse, Segmentierung, Kategorisierung und Training – fügen eine Modellstufe hinzu: Die **Feldextraktion** nutzt deine eigenen Foundry-Modell-Deployments (ein Deployment darf beliebig heißen), um die Felder deines Schemas zu generieren, zu klassifizieren oder zu extrahieren. Die Ausgabe hat zwei Formen: sauberes **Markdown**, das du in Chunks für einen Suchindex für **RAG** (relevante Inhalte abrufen und die Antwort darauf stützen) zerlegst oder einem Agent übergibst, und **strukturierte Felder** – bei Dokumenten mit Konfidenzwerten und Quellen-Grounding, damit Menschen jeden Wert prüfen können. Analyzer entwirfst und testest du im Content Understanding Studio und rufst sie über die REST API oder SDKs auf.',
  },
  examFocus: {
    en: 'Questions target the right analyzer per modality (`prebuilt-documentSearch`, `prebuilt-imageSearch`, `prebuilt-audioSearch`, `prebuilt-videoSearch`, domain prebuilts or a custom analyzer), video settings (`enableSegment`, `contentCategories`, `returnDetails`, `locales`) and how results feed RAG and agents (`markdown` vs `fields`, `confidence`, `source`). The skills outline (Microsoft\'s official list of what the exam measures) still says “pro mode” — the concept *Analysis modes* shows what that means today.',
    de: 'Die Fragen zielen auf den passenden Analyzer je Modalität (`prebuilt-documentSearch`, `prebuilt-imageSearch`, `prebuilt-audioSearch`, `prebuilt-videoSearch`, Fach-Prebuilts oder ein eigener Analyzer), auf Video-Einstellungen (`enableSegment`, `contentCategories`, `returnDetails`, `locales`) und darauf, wie Ergebnisse in RAG und Agents einfließen (`markdown` vs. `fields`, `confidence`, `source`). Der Skills-Katalog (Microsofts offizielle Liste dessen, was die Prüfung abfragt) spricht noch vom „Pro-Modus“ – das Konzept *Analysis modes* zeigt, was das heute bedeutet.',
  },
  diagrams: [
    {
      id: 'cu-pipeline',
      title: { en: 'One pipeline for every modality', de: 'Eine Pipeline für jede Modalität' },
      caption: {
        en: 'Content extraction produces the Markdown; field extraction on your model deployments adds typed fields (and, for documents, optional figure descriptions). Markdown feeds retrieval, fields feed automation.',
        de: 'Die Inhaltsextraktion erzeugt das Markdown; die Feldextraktion auf deinen Modell-Deployments ergänzt typisierte Felder (und bei Dokumenten optional Abbildungsbeschreibungen). Markdown versorgt die Suche, Felder die Automatisierung.',
      },
      width: 960,
      height: 420,
      groups: [{ id: 'g-an', x: 150, y: 20, w: 380, h: 270, label: 'Analyzer', tone: 'foundry' }],
      nodes: [
        { id: 'input', x: 9, y: 60, w: 131, h: 80, label: { en: 'Input file', de: 'Eingabedatei' }, sub: { en: 'doc · image\naudio · video', de: 'Dokument · Bild\nAudio · Video' }, icon: 'file', tone: 'data', shape: 'doc' },
        { id: 'content', x: 170, y: 60, w: 170, h: 80, label: { en: 'Content extraction', de: 'Inhaltsextraktion' }, sub: { en: 'OCR · layout\ntranscript · shots', de: 'OCR · Layout\nTranskript · Shots' }, icon: 'foundry-tools', tone: 'foundry' },
        { id: 'field', x: 347, y: 190, w: 176, h: 80, label: { en: 'Field extraction', de: 'Feldextraktion' }, sub: 'extract · classify\ngenerate', icon: 'foundry-tools', tone: 'foundry' },
        { id: 'model', x: 347, y: 330, w: 176, h: 70, label: { en: 'Model deployment', de: 'Modell-Deployment' }, sub: { en: 'your deployments', de: 'deine Deployments' }, icon: 'foundry-models', tone: 'model', shape: 'store' },
        { id: 'markdown', x: 575, y: 60, w: 195, h: 80, label: 'Markdown', sub: { en: 'for search + LLMs', de: 'für Suche + LLMs' }, icon: 'file', tone: 'data', shape: 'doc' },
        { id: 'fields', x: 575, y: 190, w: 195, h: 80, label: { en: 'JSON fields', de: 'JSON-Felder' }, sub: { en: 'typed values\ndocs: confidence · source', de: 'typisierte Werte\nDokumente: Konfidenz · Quelle' }, icon: 'file', tone: 'data', shape: 'doc' },
        { id: 'search', x: 805, y: 60, w: 135, h: 80, label: { en: 'Search index', de: 'Suchindex' }, sub: { en: 'RAG grounding', de: 'RAG-Grounding' }, icon: 'ai-search', tone: 'data', shape: 'store' },
        { id: 'agent', x: 805, y: 190, w: 135, h: 80, label: { en: 'Agent /\nworkflow', de: 'Agent /\nWorkflow' }, sub: { en: 'automation', de: 'Automatisierung' }, icon: 'workflow', tone: 'app' },
      ],
      edges: [
        { id: 'e-in', from: 'input', to: 'content' },
        { id: 'e-md', from: 'content', to: 'markdown' },
        { id: 'e-cf', from: 'content', to: 'field', via: [[255, 230]] },
        { id: 'e-model', from: 'field', to: 'model', label: { en: 'tokens', de: 'Tokens' }, bidir: true },
        { id: 'e-fj', from: 'field', to: 'fields' },
        { id: 'e-fmd', from: 'field', to: 'markdown', label: { en: 'figure descriptions', de: 'Abbildungsbeschreibungen' }, dashed: true, via: [[435, 165], [672.5, 165]] },
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
            en: 'The service normalizes the input: OCR, layout, tables and figures for documents; transcripts with speaker diarization (who spoke when) for audio; key frames (still images sampled from the video), shot detection (finding camera cuts) and transcripts for video. This stage already produces the Markdown: `prebuilt-read` and `prebuilt-layout` stop here and need no language model.',
            de: 'Der Dienst normalisiert die Eingabe: OCR, Layout, Tabellen und Abbildungen für Dokumente; Transkripte mit Sprechertrennung (wer wann spricht) für Audio; Keyframes (aus dem Video entnommene Standbilder), Shot-Erkennung (Kameraschnitte finden) und Transkripte für Video. Diese Stufe erzeugt bereits das Markdown: `prebuilt-read` und `prebuilt-layout` hören hier auf und brauchen kein Sprachmodell.',
          },
          focus: ['content', 'e-md', 'markdown'],
        },
        {
          title: { en: 'Field extraction on your models', de: 'Feldextraktion auf deinen Modellen' },
          text: {
            en: 'Generative features — field extraction, figure analysis, segmentation, categorization and training — call **your** Foundry deployments: a chat completion model, plus an embedding model when you train with labeled examples. The model tokens appear on that deployment; Content Understanding itself bills content extraction and contextualization (its own pre- and post-processing around the model calls, such as confidence scores and grounding).',
            de: 'Generative Funktionen – Feldextraktion, Abbildungsanalyse, Segmentierung, Kategorisierung und Training – rufen **deine** Foundry-Deployments auf: ein Chat-Completion-Modell, dazu ein Embedding-Modell, wenn du mit gelabelten Beispielen trainierst. Die Modell-Tokens erscheinen auf diesem Deployment; Content Understanding selbst berechnet Inhaltsextraktion und Kontextualisierung (seine eigene Vor- und Nachverarbeitung rund um die Modellaufrufe, etwa Konfidenzwerte und Grounding).',
          },
          focus: ['e-cf', 'field', 'e-model', 'model'],
        },
        {
          title: { en: 'Two output shapes', de: 'Zwei Ausgabeformen' },
          text: {
            en: '`markdown` comes from content extraction — headings, HTML or Markdown tables, WebVTT transcripts (a standard caption format with timestamps); figure descriptions, a generative document option, are added by the model stage. `fields` are typed values from your schema; only document fields carry `confidence` (0–1) and a `source` that points to the page region.',
            de: '`markdown` stammt aus der Inhaltsextraktion – Überschriften, HTML- oder Markdown-Tabellen, WebVTT-Transkripte (ein Standard-Untertitelformat mit Zeitstempeln); Abbildungsbeschreibungen, eine generative Dokumentoption, ergänzt die Modellstufe. `fields` sind typisierte Werte aus deinem Schema; nur Dokumentfelder tragen `confidence` (0–1) und eine `source` mit der Seitenregion.',
          },
          focus: ['e-fj', 'fields', 'e-fmd', 'markdown'],
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
        { id: 'video', x: 20, y: 150, w: 130, h: 70, label: 'Video', sub: 'MP4 · MOV · MKV', icon: 'media', tone: 'data', shape: 'doc' },
        { id: 'transcript', x: 200, y: 40, w: 190, h: 64, label: { en: 'Transcript', de: 'Transkript' }, sub: { en: 'WebVTT · speakers', de: 'WebVTT · Sprecher' }, icon: 'foundry-tools', tone: 'foundry' },
        { id: 'keyframes', x: 200, y: 153, w: 190, h: 64, label: { en: 'Key frames', de: 'Keyframes' }, sub: 'keyFrameTimesMs', icon: 'foundry-tools', tone: 'foundry' },
        { id: 'shots', x: 200, y: 266, w: 190, h: 64, label: { en: 'Shot detection', de: 'Shot-Erkennung' }, sub: 'cameraShotTimesMs', icon: 'foundry-tools', tone: 'foundry' },
        { id: 'seg', x: 420, y: 150, w: 200, h: 70, label: { en: 'Segmentation', de: 'Segmentierung' }, sub: { en: 'enableSegment + cut rule', de: 'enableSegment + Schnittregel' }, icon: 'foundry-tools', tone: 'foundry' },
        { id: 'model', x: 420, y: 280, w: 200, h: 64, label: { en: 'Model deployment', de: 'Modell-Deployment' }, sub: { en: 'tokens even without fields', de: 'Tokens auch ohne Felder' }, icon: 'foundry-models', tone: 'model', shape: 'store' },
        { id: 'fields', x: 700, y: 150, w: 240, h: 70, label: { en: 'Fields per segment', de: 'Felder je Segment' }, sub: 'generate · classify', icon: 'file', tone: 'data' },
        { id: 'result', x: 700, y: 40, w: 240, h: 70, label: { en: 'One content per segment', de: 'Ein Content je Segment' }, sub: 'startTimeMs · endTimeMs', icon: 'file', tone: 'data', shape: 'doc' },
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
        { id: 'e-model-f', from: 'model', to: 'fields', label: { en: 'fills fields', de: 'füllt Felder' }, dashed: true, via: [[820, 312]] },
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
            en: 'Content extraction produces a WebVTT transcript with speaker diarization, shot boundaries (a shot is the footage between two camera cuts) and key frames sampled from every shot as input for fields. The timing arrays `transcriptPhrases`, `keyFrameTimesMs` and `cameraShotTimesMs` appear only with `returnDetails: true`. Sampling is about one frame per second at 512 × 512 pixels; only speech is transcribed.',
            de: 'Die Inhaltsextraktion liefert ein WebVTT-Transkript mit Sprechertrennung, Shot-Grenzen (ein Shot ist das Material zwischen zwei Kameraschnitten) und Keyframes, die aus jedem Shot als Eingabe für Felder gewählt werden. Die Zeit-Arrays `transcriptPhrases`, `keyFrameTimesMs` und `cameraShotTimesMs` erscheinen nur mit `returnDetails: true`. Abgetastet wird etwa ein Bild pro Sekunde mit 512 × 512 Pixeln; transkribiert wird nur Sprache.',
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
            en: 'Your model deployment fills the fields of the analyzer\'s `fieldSchema` for every segment — in the code below a `generate` field `Brand` and a `classify` field `AdType` whose value comes from a fixed list (`enum`).',
            de: 'Dein Modell-Deployment füllt die Felder im `fieldSchema` des Analyzers für jedes Segment – im Code unten ein `generate`-Feld `Brand` und ein `classify`-Feld `AdType`, dessen Wert aus einer festen Liste (`enum`) stammt.',
          },
          focus: ['e-seg-f', 'fields', 'e-model-f', 'model'],
        },
        {
          title: { en: 'Read one content object per segment', de: 'Ein Content-Objekt je Segment lesen' },
          text: {
            en: 'Per the video docs, `result.contents` holds one `audioVisual` object per segment with `startTimeMs`, `endTimeMs`, Markdown (transcript plus key-frame references) and its fields. The generic analyzer reference words it differently — segment metadata in the original content object, extra objects only for categories with their own `analyzerId` — so check your actual output. Key-frame images are separate result files.',
            de: 'Laut Video-Doku enthält `result.contents` je Segment ein `audioVisual`-Objekt mit `startTimeMs`, `endTimeMs`, Markdown (Transkript plus Keyframe-Verweise) und seinen Feldern. Die allgemeine Analyzer-Referenz beschreibt es anders – Segment-Metadaten im ursprünglichen Content-Objekt, zusätzliche Objekte nur für Kategorien mit eigener `analyzerId` –, prüfe also deine tatsächliche Ausgabe. Keyframe-Bilder sind eigene Ergebnisdateien.',
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
        en: 'Classification and splitting without training data. **Documents:** describe up to 200 content categories, optionally route each to an `analyzerId`, and add an `other` category — otherwise every file is forced into one of yours. **Video:** exactly one entry whose `description` is the rule for where to cut. `enableSegment: true` splits the input into segments first.',
        de: 'Klassifizieren und Aufteilen ohne Trainingsdaten. **Dokumente:** Beschreibe bis zu 200 Inhaltskategorien, leite jede optional an eine `analyzerId` weiter und ergänze eine Kategorie `other` – sonst landet jede Datei zwangsweise in einer deiner Kategorien. **Video:** genau ein Eintrag, dessen `description` die Regel ist, wo geschnitten wird. `enableSegment: true` teilt die Eingabe vorher in Segmente.',
      },
    },
    {
      term: 'Analysis modes (standard, pro, agentic)',
      text: {
        en: '**Standard** — GA API `2025-11-01`; use it for production extraction. **Pro** — existed only in `2025-05-01-preview`, now retired; it reasoned across several input files. **Agentic** (preview) — API `2026-06-01-preview` with `config.workflow: "agentic"`; reasoning, calculations and validation within one input file, documents only, no `extract` fields, more tokens.',
        de: '**Standard** – GA-API `2025-11-01`; für produktive Extraktion. **Pro** – gab es nur in `2025-05-01-preview`, inzwischen eingestellt; er argumentierte über mehrere Eingabedateien. **Agentic** (Preview) – API `2026-06-01-preview` mit `config.workflow: "agentic"`; Reasoning, Berechnungen und Prüfungen innerhalb einer Eingabedatei, nur Dokumente, keine `extract`-Felder, mehr Tokens.',
      },
    },
    {
      term: 'Content Understanding Studio',
      text: {
        en: 'The visual route to analyzers: create a project, upload a sample, start from a suggested template or AI-suggested fields, test, build, then call the analyzer from code. The REST API and SDKs (`begin_create_analyzer`) create the same analyzers without a UI. Labeling — marking the correct values in sample documents to raise accuracy — happens in Studio; the Foundry portal playground can\'t create custom analyzers.',
        de: 'Der visuelle Weg zu Analyzern: Projekt anlegen, Beispieldatei hochladen, mit einer vorgeschlagenen Vorlage oder KI-vorgeschlagenen Feldern starten, testen, bauen und den Analyzer dann aus Code aufrufen. REST API und SDKs (`begin_create_analyzer`) legen dieselben Analyzer ohne Oberfläche an. Labeling – das Markieren der richtigen Werte in Beispieldokumenten, um die Genauigkeit zu erhöhen – erfolgt im Studio; der Playground im Foundry-Portal kann keine eigenen Analyzer anlegen.',
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
        { en: '`prebuilt-*Search` analyzers use the aliases `prebuilt-analyzer-completion-mini` and `prebuilt-analyzer-embedding`: set the resource defaults once (see the client lesson) or map both in `model_deployments=` on `begin_analyze`.', de: '`prebuilt-*Search`-Analyzer nutzen die Aliase `prebuilt-analyzer-completion-mini` und `prebuilt-analyzer-embedding`: Setze die Defaults der Ressource einmal (siehe Client-Lektion) oder ordne beide über `model_deployments=` in `begin_analyze` zu.' },
      ],
    },
    {
      title: { en: 'Custom video analyzer: one segment per commercial, fields per segment', de: 'Eigener Video-Analyzer: ein Segment je Werbespot, Felder je Segment' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.contentunderstanding import ContentUnderstandingClient

client = ContentUnderstandingClient(
    endpoint="https://<resource>.services.ai.azure.com/",
    credential=DefaultAzureCredential(),
)
ad_break_analyzer = {
    "baseAnalyzerId": "prebuilt-video",
    "description": "One segment per commercial in a TV ad break",
    "models": {"completion": "gpt-5.2"},
    "config": {
        "returnDetails": True,        # adds phrase, key-frame and shot timings
        "locales": ["en-US"],         # skip multilingual auto-detection
        "enableSegment": True,
        "contentCategories": {        # video: exactly one entry = the cut rule
            "commercial": {"description": "Start a new segment where each commercial begins."},
        },
    },
    "fieldSchema": {"fields": {       # filled for every segment
        "Brand": {"type": "string", "method": "generate",
                  "description": "Brand promoted in this commercial"},
        "AdType": {"type": "string", "method": "classify",
                   "enum": ["consumer goods", "groceries", "technology", "other"]},
    }},
}
client.begin_create_analyzer("ad_break", ad_break_analyzer).result()`,
      notes: [
        { en: 'The single `contentCategories` entry is the cut rule: its `description` says where a new segment starts.', de: 'Der einzige `contentCategories`-Eintrag ist die Schnittregel: Seine `description` sagt, wo ein neues Segment beginnt.' },
        { en: 'With segmentation on, each segment becomes its own content object with its own `Brand` and `AdType` values.', de: 'Bei aktiver Segmentierung wird jedes Segment ein eigenes Content-Objekt mit eigenen Werten für `Brand` und `AdType`.' },
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
      en: 'In document classification, a missing `other` category forces every file or segment into one of your content categories — even when nothing fits.',
      de: 'Fehlt bei der Dokumentklassifizierung die Kategorie `other`, landet jede Datei und jedes Segment zwangsweise in einer deiner Inhaltskategorien – selbst wenn keine passt.',
    },
  ],
  takeaways: [
    { en: 'Content extraction first, field extraction on your own model deployments second.', de: 'Erst Inhaltsextraktion, dann Feldextraktion auf deinen eigenen Modell-Deployments.' },
    { en: 'Markdown feeds retrieval and agent context; typed fields feed automation.', de: 'Markdown versorgt Suche und Agent-Kontext; typisierte Felder versorgen die Automatisierung.' },
    { en: 'Production extraction: standard analyzers on GA `2025-11-01`. Agentic mode only when reasoning is needed and preview is acceptable.', de: 'Produktive Extraktion: Standard-Analyzer auf GA `2025-11-01`. Agentic mode nur, wenn Reasoning nötig und Preview akzeptabel ist.' },
    { en: 'Route low-confidence document fields to people, using `source` to show where each value came from.', de: 'Dokumentfelder mit niedriger Konfidenz gehen an Menschen – `source` zeigt, woher jeder Wert stammt.' },
  ],
  sources: [
    { title: 'Azure Content Understanding video solutions', url: 'https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/video/overview' },
    { title: 'AudioVisual analysis: extracting structured content with Azure Content Understanding', url: 'https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/video/elements' },
    { title: 'Prebuilt analyzers in Azure Content Understanding', url: 'https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/prebuilt-analyzers' },
    { title: 'Agentic mode for document analysis (preview)', url: 'https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/agentic-mode' },
    { title: 'Content Understanding classification and segmentation', url: 'https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/classifier' },
  ],
}
