import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'cu-images',
  summary: {
    en: '**Azure Content Understanding in Foundry Tools** uses generative AI to turn unstructured files — documents, images, audio and video — into structured output. You don\'t write a chat prompt; you call an **analyzer**: a reusable definition that names a **base analyzer**, a **field schema** (the values you want back — each field\'s `description` works as a mini-prompt) and the generative models to use. For photos you either call the ready-made `prebuilt-imageSearch` (a one-paragraph description for search) or build a custom analyzer on `prebuilt-image` whose fields **generate** free values or **classify** into fixed categories. The result is JSON with a `markdown` representation and typed `fields` that your app, workflow or agent can act on.',
    de: '**Azure Content Understanding in Foundry Tools** nutzt generative KI, um unstrukturierte Dateien – Dokumente, Bilder, Audio und Video – in strukturierte Ausgaben zu verwandeln. Du schreibst dafür keinen Chat-Prompt, sondern rufst einen **Analyzer** auf: eine wiederverwendbare Definition aus **Basis-Analyzer**, **Feldschema** (die Werte, die du zurückbekommen willst – die `description` jedes Felds wirkt als Mini-Prompt) und den zu nutzenden generativen Modellen. Für Fotos rufst du entweder den fertigen `prebuilt-imageSearch` auf (eine Beschreibung in einem Absatz, ideal für die Suche) oder baust einen eigenen Analyzer auf `prebuilt-image`, dessen Felder freie Werte **generieren** (`generate`) oder in feste Kategorien **klassifizieren** (`classify`). Das Ergebnis ist JSON mit einer `markdown`-Darstellung und typisierten `fields`, mit denen deine App, dein Workflow oder dein Agent weiterarbeitet.',
  },
  examFocus: {
    en: 'Expect scenarios that ask which analyzer to pick (`prebuilt-imageSearch`, a custom analyzer based on `prebuilt-image`, or a document analyzer for text-heavy photos), how to define fields (`type`, `description`, `method`, `enum`) and which methods images support (`generate` and `classify` — `extract` is document-only). Know what the result contains and where its limits are: confidence scores and source grounding exist only for document analyzers, and for image analyzers the analyzer reference lists just one `config` option, `returnDetails`.',
    de: 'Rechne mit Szenarien, in denen du den passenden Analyzer wählst (`prebuilt-imageSearch`, einen eigenen Analyzer auf Basis von `prebuilt-image` oder einen Dokument-Analyzer für textlastige Fotos), Felder definierst (`type`, `description`, `method`, `enum`) und weißt, welche Methoden für Bilder gelten (`generate` und `classify` – `extract` gibt es nur für Dokumente). Kenne Inhalt und Grenzen des Ergebnisses: Konfidenzwerte und Quellen-Grounding liefern nur Dokument-Analyzer, und für Bild-Analyzer nennt die Analyzer-Referenz nur eine `config`-Option: `returnDetails`.',
  },
  diagrams: [
    {
      id: 'cu-image-flow',
      title: { en: 'From a photo to typed fields', de: 'Vom Foto zu typisierten Feldern' },
      caption: {
        en: 'An analyzer calls your model deployment and returns Markdown plus fields. Product photos get a custom image analyzer; photos that are mostly text go to a document analyzer, which adds OCR, extract fields and — when enabled — confidence and source grounding.',
        de: 'Ein Analyzer ruft dein Modell-Deployment auf und liefert Markdown plus Felder. Produktfotos bekommen einen eigenen Bild-Analyzer; Fotos, die vor allem Text zeigen, gehen an einen Dokument-Analyzer – der ergänzt OCR, extract-Felder und, wenn aktiviert, Konfidenz und Quellen-Grounding.',
      },
      width: 960,
      height: 520,
      groups: [{ id: 'g-res', x: 170, y: 20, w: 330, h: 480, label: 'Foundry resource', tone: 'foundry' }],
      nodes: [
        { id: 'photo', x: 1, y: 165, w: 139, h: 70, label: { en: 'Product photo', de: 'Produktfoto' }, sub: 'JPEG · PNG', icon: 'image', tone: 'data', shape: 'doc' },
        { id: 'schema', x: 195, y: 55, w: 280, h: 64, label: { en: 'Field schema', de: 'Feldschema' }, sub: 'generate · classify', icon: 'foundry-tools', tone: 'app', shape: 'doc' },
        { id: 'analyzer', x: 195, y: 165, w: 280, h: 70, label: { en: 'Custom image analyzer', de: 'Eigener Bild-Analyzer' }, sub: 'base: prebuilt-image', icon: 'foundry-tools', tone: 'foundry' },
        { id: 'model', x: 195, y: 285, w: 280, h: 70, label: { en: 'Model deployment', de: 'Modell-Deployment' }, sub: { en: 'your Foundry deployment', de: 'dein Foundry-Deployment' }, icon: 'foundry-models', tone: 'model', shape: 'store' },
        { id: 'result', x: 760, y: 165, w: 180, h: 70, label: { en: 'Result JSON', de: 'Ergebnis-JSON' }, sub: { en: 'back to your app', de: 'zurück an deine App' }, icon: 'file', tone: 'data', shape: 'doc' },
        { id: 'labelphoto', x: 1, y: 405, w: 139, h: 70, label: { en: 'Label photo', de: 'Etikettfoto' }, sub: { en: 'mostly text', de: 'meist Text' }, icon: 'image', tone: 'data', shape: 'doc' },
        { id: 'docan', x: 195, y: 405, w: 280, h: 70, label: { en: 'Document analyzer', de: 'Dokument-Analyzer' }, sub: { en: 'base: prebuilt-document · OCR + layout', de: 'base: prebuilt-document · OCR + Layout' }, icon: 'foundry-tools', tone: 'foundry' },
        { id: 'grounded', x: 760, y: 405, w: 180, h: 70, label: { en: 'Fields + grounding', de: 'Felder + Grounding' }, sub: { en: 'confidence · source\nwhen estimation is on', de: 'Konfidenz · Quelle\nbei aktiver Schätzung' }, icon: 'file', tone: 'data', shape: 'doc' },
      ],
      edges: [
        { id: 'e-in', from: 'photo', to: 'analyzer', label: { en: 'file', de: 'Datei' } },
        { id: 'e-schema', from: 'schema', to: 'analyzer', label: { en: 'defines', de: 'definiert' }, dashed: true },
        { id: 'e-model', from: 'analyzer', to: 'model', label: { en: 'prompt / values', de: 'Prompt / Werte' }, bidir: true },
        { id: 'e-res', from: 'analyzer', to: 'result', label: { en: 'markdown + fields', de: 'Markdown + Felder' } },
        { id: 'e-in2', from: 'labelphoto', to: 'docan', label: { en: 'file', de: 'Datei' } },
        { id: 'e-doc-model', from: 'docan', to: 'model', dashed: true, bidir: true },
        { id: 'e-res2', from: 'docan', to: 'grounded', label: { en: 'extract + source', de: 'extract + Quelle' } },
      ],
      steps: [
        {
          title: { en: 'Define what you want back — once', de: 'Einmal festlegen, was zurückkommt' },
          text: {
            en: 'A custom image analyzer sets `baseAnalyzerId` to `prebuilt-image` and adds a **field schema**. Each field has a `type`, a `description` that works like a mini-prompt and a `method`: `generate` for free values, `classify` plus an `enum` for fixed categories. You create the analyzer once (`begin_create_analyzer`).',
            de: 'Ein eigener Bild-Analyzer setzt `baseAnalyzerId` auf `prebuilt-image` und ergänzt ein **Feldschema**. Jedes Feld hat einen `type`, eine `description`, die wie ein Mini-Prompt wirkt, und eine `method`: `generate` für freie Werte, `classify` plus `enum` für feste Kategorien. Den Analyzer legst du einmal an (`begin_create_analyzer`).',
          },
          focus: ['schema', 'e-schema', 'analyzer'],
        },
        {
          title: { en: 'Send each image', de: 'Jedes Bild senden' },
          text: {
            en: 'Your app then sends every photo to that analyzer — as a URL (`begin_analyze` with `inputs`) or as raw bytes (`begin_analyze_binary`). JPEG, PNG, BMP and HEIF/HEIC work; images need at least 50 × 50 pixels.',
            de: 'Danach schickt deine App jedes Foto an diesen Analyzer – als URL (`begin_analyze` mit `inputs`) oder als rohe Bytes (`begin_analyze_binary`). JPEG, PNG, BMP und HEIF/HEIC funktionieren; Bilder brauchen mindestens 50 × 50 Pixel.',
          },
          focus: ['photo', 'e-in', 'analyzer'],
        },
        {
          title: { en: 'Your model does the generative work', de: 'Dein Modell übernimmt die generative Arbeit' },
          text: {
            en: 'The analyzer prepares the context (the image and your field definitions) for **your** Foundry model deployment and post-processes the model output into typed values. `models` lists model names; the resource defaults map them to deployments, and the tokens are billed on that deployment.',
            de: 'Der Analyzer bereitet den Kontext (das Bild und deine Felddefinitionen) für **dein** Foundry-Modell-Deployment vor und verarbeitet die Modellausgabe zu typisierten Werten nach. `models` nennt Modellnamen; die Defaults der Ressource ordnen sie Deployments zu, und die Tokens werden auf diesem Deployment abgerechnet.',
          },
          focus: ['e-model', 'model'],
        },
        {
          title: { en: 'Read the result', de: 'Ergebnis lesen' },
          text: {
            en: 'The analyzer — not the model — returns the result: `contents[0].markdown` and `contents[0].fields`, for example `{"type": "string", "valueString": "door"}`. Image fields come without confidence scores — those belong to document analyzers.',
            de: 'Das Ergebnis liefert der Analyzer, nicht das Modell: `contents[0].markdown` und `contents[0].fields`, etwa `{"type": "string", "valueString": "door"}`. Bildfelder haben keine Konfidenzwerte – die gehören zu Dokument-Analyzern.',
          },
          focus: ['e-res', 'result'],
        },
        {
          title: { en: 'Text in the photo? Use a document analyzer', de: 'Text im Foto? Nimm einen Dokument-Analyzer' },
          text: {
            en: 'Image analyzers aren\'t optimized for text. For labels, receipts or IDs, analyze the photo with a document analyzer (`prebuilt-document` base or a domain prebuilt). It runs OCR and layout (`enableOcr` and `enableLayout` are on by default), supports `extract` and — when `estimateFieldSourceAndConfidence` is `true`, which `extract` fields require — returns `confidence` plus a `source` such as `D(1,…)` per value. Its fields use the same model deployment.',
            de: 'Bild-Analyzer sind nicht auf Text optimiert. Für Etiketten, Belege oder Ausweise analysierst du das Foto mit einem Dokument-Analyzer (Basis `prebuilt-document` oder ein Fach-Prebuilt). Er führt OCR und Layoutanalyse aus (`enableOcr` und `enableLayout` sind standardmäßig an), unterstützt `extract` und liefert – wenn `estimateFieldSourceAndConfidence` auf `true` steht, was `extract`-Felder voraussetzen – pro Wert `confidence` plus eine `source` wie `D(1,…)`. Seine Felder nutzen dasselbe Modell-Deployment.',
          },
          focus: ['labelphoto', 'e-in2', 'docan', 'e-doc-model', 'e-res2', 'grounded'],
        },
      ],
    },
    {
      id: 'cu-image-schema',
      title: { en: 'Design a field schema for one damage photo', de: 'Ein Feldschema für ein Schadenfoto entwerfen' },
      caption: {
        en: 'Objects and components become arrays of objects, fixed vocabularies become classify fields, open observations become generate fields.',
        de: 'Objekte und Bauteile werden zu Arrays aus Objekten, feste Vokabulare zu classify-Feldern, offene Beobachtungen zu generate-Feldern.',
      },
      width: 960,
      height: 390,
      nodes: [
        { id: 'car', x: 20, y: 165, w: 140, h: 70, label: { en: 'Damage photo', de: 'Schadenfoto' }, sub: { en: 'claim upload', de: 'Schadenmeldung' }, icon: 'image', tone: 'data', shape: 'doc' },
        { id: 'an2', x: 220, y: 160, w: 220, h: 80, label: { en: 'Damage analyzer', de: 'Schaden-Analyzer' }, sub: 'prebuilt-image + schema', icon: 'foundry-tools', tone: 'foundry' },
        { id: 'f1', x: 540, y: 20, w: 400, h: 56, label: 'DamagedParts', sub: { en: 'array of objects: Part · Severity (classify)', de: 'Array aus Objekten: Part · Severity (classify)' }, icon: 'file', tone: 'data' },
        { id: 'f2', x: 540, y: 116, w: 400, h: 56, label: 'VehicleType', sub: 'classify: car · van · truck · motorbike', icon: 'file', tone: 'data' },
        { id: 'f3', x: 540, y: 212, w: 400, h: 56, label: 'PlateVisible', sub: 'boolean · generate', icon: 'file', tone: 'data' },
        { id: 'f4', x: 540, y: 308, w: 400, h: 56, label: 'Description', sub: { en: 'string · generate: one sentence', de: 'string · generate: ein Satz' }, icon: 'file', tone: 'data' },
      ],
      edges: [
        { id: 'e-photo', from: 'car', to: 'an2' },
        { id: 'e-f1', from: 'an2', to: 'f1', via: [[490, 48]] },
        { id: 'e-f2', from: 'an2', to: 'f2', via: [[490, 144]] },
        { id: 'e-f3', from: 'an2', to: 'f3', via: [[490, 240]] },
        { id: 'e-f4', from: 'an2', to: 'f4', via: [[490, 336]] },
      ],
      steps: [
        {
          title: { en: 'Start from the business question', de: 'Mit der fachlichen Frage beginnen' },
          text: {
            en: 'An adjuster wants to know which parts are damaged and how badly, the vehicle type, whether the plate is visible and a short summary. Each answer becomes one field in the analyzer\'s schema.',
            de: 'Eine Sachbearbeiterin will wissen, welche Teile wie stark beschädigt sind, um welchen Fahrzeugtyp es geht, ob das Kennzeichen sichtbar ist – und eine kurze Zusammenfassung. Jede Antwort wird zu einem Feld im Schema des Analyzers.',
          },
          focus: ['car', 'e-photo', 'an2'],
        },
        {
          title: { en: 'Objects and components → arrays', de: 'Objekte und Bauteile → Arrays' },
          text: {
            en: 'A photo can show several damaged components. Model them as an `array` of `object` items, each with its own `Part` and `Severity` — both `classify` fields with an `enum`.',
            de: 'Ein Foto kann mehrere beschädigte Bauteile zeigen. Modelliere sie als `array` aus `object`-Einträgen, jeder mit eigenem `Part` und `Severity` – beides `classify`-Felder mit `enum`.',
          },
          focus: ['e-f1', 'f1'],
        },
        {
          title: { en: 'Fixed vocabularies → classify', de: 'Feste Vokabulare → classify' },
          text: {
            en: '`classify` returns one value from the `enum`, so downstream rules and reports can rely on a closed list such as car, van, truck or motorbike.',
            de: '`classify` liefert genau einen Wert aus der `enum`-Liste. Nachgelagerte Regeln und Berichte können sich so auf eine geschlossene Liste wie car, van, truck oder motorbike verlassen.',
          },
          focus: ['e-f2', 'f2'],
        },
        {
          title: { en: 'Open observations → generate', de: 'Offene Beobachtungen → generate' },
          text: {
            en: '`generate` lets the model produce the value — a `boolean` for a yes/no observation or a one-sentence `string`. Precise descriptions matter: the model reads them as instructions.',
            de: '`generate` lässt das Modell den Wert erzeugen – ein `boolean` für eine Ja/Nein-Beobachtung oder einen `string` mit einem Satz. Präzise Beschreibungen zählen: Das Modell liest sie als Anweisung.',
          },
          focus: ['e-f3', 'f3', 'e-f4', 'f4'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Analyzer',
      text: {
        en: 'The reusable unit of Content Understanding. It combines a `baseAnalyzerId`, optional `config` settings (for images the analyzer reference lists only `returnDetails: true`, which adds detailed metadata to the result), a `fieldSchema` and the `models` to use. You create it once (`PUT /contentunderstanding/analyzers/{id}`) and send files to it many times.',
        de: 'Die wiederverwendbare Einheit von Content Understanding. Sie kombiniert eine `baseAnalyzerId`, optionale `config`-Einstellungen (für Bilder nennt die Analyzer-Referenz nur `returnDetails: true`, das dem Ergebnis ausführliche Metadaten hinzufügt), ein `fieldSchema` und die zu nutzenden `models`. Du legst sie einmal an (`PUT /contentunderstanding/analyzers/{id}`) und schickst ihr beliebig oft Dateien.',
      },
    },
    {
      term: 'Base analyzer',
      text: {
        en: 'One of four parents for custom analyzers: `prebuilt-document`, `prebuilt-image`, `prebuilt-audio`, `prebuilt-video`. RAG and domain prebuilts such as `prebuilt-imageSearch` can be called directly but can\'t serve as `baseAnalyzerId`.',
        de: 'Einer von vier Eltern-Analyzern für eigene Analyzer: `prebuilt-document`, `prebuilt-image`, `prebuilt-audio`, `prebuilt-video`. RAG- und Fach-Prebuilts wie `prebuilt-imageSearch` kannst du direkt aufrufen, aber nicht als `baseAnalyzerId` verwenden.',
      },
    },
    {
      term: 'Field schema',
      text: {
        en: 'The contract for your output: named fields with a `type` (`string`, `number`, `integer`, `boolean`, `date`, `time`, `object`, `array`), a `description` the model reads as guidance and optionally an `enum`. Avoid nesting deeper than two or three levels.',
        de: 'Der Vertrag für deine Ausgabe: benannte Felder mit `type` (`string`, `number`, `integer`, `boolean`, `date`, `time`, `object`, `array`), einer `description`, die das Modell als Anleitung liest, und optional einer `enum`. Verschachtle nicht tiefer als zwei bis drei Ebenen.',
      },
    },
    {
      term: 'Generation method',
      text: {
        en: '`generate` creates values freely, `classify` picks from predefined categories and `extract` copies values as they appear. Images, audio and video support only `generate` and `classify`; `extract` is for documents. Omit `method` and the service chooses one.',
        de: '`generate` erzeugt Werte frei, `classify` wählt aus vordefinierten Kategorien, `extract` übernimmt Werte so, wie sie im Inhalt stehen. Bilder, Audio und Video unterstützen nur `generate` und `classify`; `extract` gibt es nur für Dokumente. Lässt du `method` weg, wählt der Dienst selbst.',
      },
    },
    {
      term: 'Model deployments (bring your own)',
      text: {
        en: 'Content Understanding runs on your own Foundry deployments — a deployment can have any name. A custom image analyzer needs only a chat completion model in `models`; embedding models serve labeled samples, a document feature. Map model names to deployment names once per resource (`update_defaults` / `PATCH /contentunderstanding/defaults`) or per request with `modelDeployments` (only for `:analyze` / `begin_analyze`; `begin_analyze_binary` has no `model_deployments`, so byte uploads rely on the defaults).',
        de: 'Content Understanding läuft auf deinen eigenen Foundry-Deployments – ein Deployment darf beliebig heißen. Ein eigener Bild-Analyzer braucht in `models` nur ein Chat-Completion-Modell; Embedding-Modelle dienen gelabelten Beispielen, einer Dokumentfunktion. Die Zuordnung Modellname → Deployment-Name legst du einmal pro Ressource fest (`update_defaults` / `PATCH /contentunderstanding/defaults`) oder pro Anfrage über `modelDeployments` (nur bei `:analyze` / `begin_analyze`; `begin_analyze_binary` hat kein `model_deployments`, Byte-Uploads brauchen also die Defaults).',
      },
    },
    {
      term: 'Confidence and grounding',
      text: {
        en: 'For document analyzers, `estimateFieldSourceAndConfidence` adds a 0–1 `confidence` and a `source` such as `D(page,x1,y1,…)` to each field so reviewers can verify it. Image, audio and video fields don\'t get these values.',
        de: 'Bei Dokument-Analyzern ergänzt `estimateFieldSourceAndConfidence` jedes Feld um eine `confidence` zwischen 0 und 1 und eine `source` wie `D(page,x1,y1,…)`, damit Prüfende den Wert nachvollziehen können. Bild-, Audio- und Videofelder bekommen diese Werte nicht.',
      },
    },
    {
      term: 'Guardrails and face handling',
      text: {
        en: 'Analyzers inherit the guardrails of your Foundry model deployment: harmful content can add warnings or suppress field values. Faces are blurred by default, so face-based inference such as emotion doesn\'t work (transparency note). The analyzer reference lists only `returnDetails` for image analyzers; the API\'s `disableFaceBlurring` setting isn\'t documented for images, and face features are Limited Access: Microsoft must approve your registration before you can use them. Face grouping exists only for video.',
        de: 'Analyzer übernehmen die Guardrails deines Foundry-Modell-Deployments: Schädliche Inhalte können Warnungen auslösen oder Feldwerte unterdrücken. Gesichter werden standardmäßig unkenntlich gemacht, daher funktionieren gesichtsbasierte Schlüsse wie Emotionen nicht (Transparenzhinweis). Die Analyzer-Referenz nennt für Bild-Analyzer nur `returnDetails`; die API-Einstellung `disableFaceBlurring` ist für Bilder nicht dokumentiert, und Gesichtsfunktionen sind Limited Access: Microsoft muss deine Registrierung genehmigen, bevor du sie nutzen kannst. Face Grouping gibt es nur für Video.',
      },
    },
  ],
  comparison: {
    title: { en: 'Which approach fits the image task?', de: 'Welcher Ansatz passt zur Bildaufgabe?' },
    columns: [
      { en: 'Need', de: 'Bedarf' },
      { en: 'Use', de: 'Verwende' },
      { en: 'Why', de: 'Warum' },
    ],
    rows: [
      [
        { en: 'Short description of each photo for search', de: 'Kurzbeschreibung je Foto für die Suche' },
        'prebuilt-imageSearch',
        { en: 'Ready-made one-paragraph summary, no schema to design', de: 'Fertige Zusammenfassung in einem Absatz, kein Schema nötig' },
      ],
      [
        { en: 'Repeatable visual attributes (condition, damage, category)', de: 'Wiederholbare visuelle Merkmale (Zustand, Schaden, Kategorie)' },
        { en: 'Custom analyzer on prebuilt-image', de: 'Eigener Analyzer auf prebuilt-image' },
        { en: 'generate and classify fields return the same JSON shape every time', de: 'generate- und classify-Felder liefern jedes Mal dieselbe JSON-Struktur' },
      ],
      [
        { en: 'Printed text in the photo (labels, receipts, IDs)', de: 'Gedruckter Text im Foto (Etiketten, Belege, Ausweise)' },
        { en: 'Document analyzer (prebuilt-document base or a domain prebuilt)', de: 'Dokument-Analyzer (Basis prebuilt-document oder Fach-Prebuilt)' },
        { en: 'OCR, extract fields, confidence and source grounding', de: 'OCR, extract-Felder, Konfidenz und Quellen-Grounding' },
      ],
      [
        { en: 'Open-ended questions about a single image', de: 'Offene Fragen zu einem einzelnen Bild' },
        { en: 'Vision-capable chat model in Foundry', de: 'Bildfähiges Chatmodell in Foundry' },
        { en: 'Flexible prompting; you design output format and validation yourself', de: 'Flexibles Prompting; Ausgabeformat und Prüfung gestaltest du selbst' },
      ],
    ],
  },
  code: [
    {
      title: { en: 'Create a custom image analyzer with the Python SDK', de: 'Eigenen Bild-Analyzer mit dem Python SDK anlegen' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.contentunderstanding import ContentUnderstandingClient
from azure.ai.contentunderstanding.models import (
    ContentAnalyzer, ContentAnalyzerConfig, ContentFieldSchema,
    ContentFieldDefinition, ContentFieldType, GenerationMethod,
)

client = ContentUnderstandingClient(
    endpoint="https://<resource>.services.ai.azure.com/",
    credential=DefaultAzureCredential(),
)
# One-time per resource: model name -> your deployment name (any name works)
client.update_defaults(model_deployments={"gpt-5.2": "my-gpt52"})

part = ContentFieldDefinition(
    type=ContentFieldType.STRING, method=GenerationMethod.CLASSIFY,
    description="Damaged exterior part", enum=["bumper", "door", "hood", "windshield", "other"],
)
severity = ContentFieldDefinition(
    type=ContentFieldType.STRING, method=GenerationMethod.CLASSIFY,
    description="How badly the part is damaged", enum=["minor", "moderate", "severe"],
)
schema = ContentFieldSchema(name="vehicle_damage", fields={
    "DamagedParts": ContentFieldDefinition(          # one object per damaged part
        type=ContentFieldType.ARRAY,
        item_definition=ContentFieldDefinition(
            type=ContentFieldType.OBJECT, properties={"Part": part, "Severity": severity},
        ),
    ),
    "Description": ContentFieldDefinition(
        type=ContentFieldType.STRING, method=GenerationMethod.GENERATE,
        description="One sentence describing the visible damage",
    ),
})
analyzer = ContentAnalyzer(
    base_analyzer_id="prebuilt-image",
    description="Lists damaged vehicle parts in claim photos",
    # returnDetails: the only image option the analyzer reference lists
    config=ContentAnalyzerConfig(return_details=True),
    field_schema=schema,
    models={"completion": "gpt-5.2"},                   # model name, not deployment name
)
client.begin_create_analyzer("vehicle_damage", analyzer).result()`,
      notes: [
        { en: 'Two of the four fields from the schema diagram: `DamagedParts` is an `array` of `object` items, each with two `classify` fields.', de: 'Zwei der vier Felder aus dem Schema-Diagramm: `DamagedParts` ist ein `array` aus `object`-Einträgen mit je zwei `classify`-Feldern.' },
        { en: '`update_defaults` runs once per resource: `models` names the model, the defaults pick the deployment at analyze time. Without defaults (or `model_deployments=` in each `begin_analyze` call — `begin_analyze_binary` has no such parameter) the analysis fails.', de: '`update_defaults` läuft einmal pro Ressource: `models` nennt das Modell, die Defaults wählen beim Analysieren das Deployment. Ohne Defaults (oder `model_deployments=` in jedem `begin_analyze`-Aufruf – `begin_analyze_binary` hat diesen Parameter nicht) schlägt die Analyse fehl.' },
        { en: '`begin_create_analyzer` is a long-running operation — `.result()` waits until the analyzer is ready.', de: '`begin_create_analyzer` ist eine Long-Running Operation – `.result()` wartet, bis der Analyzer bereit ist.' },
      ],
    },
    {
      title: { en: 'Analyze a local photo and read the fields', de: 'Lokales Foto analysieren und Felder lesen' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.contentunderstanding import ContentUnderstandingClient

client = ContentUnderstandingClient(
    endpoint="https://<resource>.services.ai.azure.com/",
    credential=DefaultAzureCredential(),
)
with open("claim-photo.jpg", "rb") as f:
    poller = client.begin_analyze_binary("vehicle_damage", f.read())

result = poller.result()                 # polls until the operation finishes
fields = result.contents[0].fields
print(fields["Description"].value)
for item in fields["DamagedParts"].value:    # array -> list of object fields
    print(item.value["Part"].value, item.value["Severity"].value)   # e.g. door moderate`,
      notes: [
        { en: '`begin_analyze_binary` uploads raw bytes; use `begin_analyze` with `AnalysisInput(url=...)` for files reachable by URL.', de: '`begin_analyze_binary` lädt rohe Bytes hoch; für Dateien mit URL nutzt du `begin_analyze` mit `AnalysisInput(url=...)`.' },
        { en: 'In the SDK every field exposes `.value` — a list for arrays, a dict of fields for objects. The REST JSON names it by type: `valueString`, `valueArray`, `valueObject` and so on.', de: 'Im SDK hat jedes Feld `.value` – eine Liste bei Arrays, ein Dict aus Feldern bei Objekten. Das REST-JSON benennt den Wert nach Typ: `valueString`, `valueArray`, `valueObject` usw.' },
      ],
    },
  ],
  traps: [
    {
      en: '`extract` is a document-only method. An image analyzer with `extract` fields is invalid — use `generate` or `classify`, or switch to a document analyzer if the value is printed text.',
      de: '`extract` gibt es nur für Dokumente. Ein Bild-Analyzer mit `extract`-Feldern ist ungültig – nutze `generate` oder `classify` oder wechsle zu einem Dokument-Analyzer, wenn der Wert gedruckter Text ist.',
    },
    {
      en: 'You can\'t derive a custom analyzer from `prebuilt-imageSearch`; only the four base analyzers work as `baseAnalyzerId`. For images that is `prebuilt-image`.',
      de: 'Von `prebuilt-imageSearch` kannst du keinen eigenen Analyzer ableiten; als `baseAnalyzerId` funktionieren nur die vier Basis-Analyzer. Für Bilder ist das `prebuilt-image`.',
    },
    {
      en: 'Need a confidence score or the location of a value? That is a document-analyzer feature (`estimateFieldSourceAndConfidence`). For image analyzers the analyzer reference lists only the `returnDetails` setting.',
      de: 'Du brauchst einen Konfidenzwert oder die Fundstelle eines Werts? Das ist eine Funktion von Dokument-Analyzern (`estimateFieldSourceAndConfidence`). Für Bild-Analyzer nennt die Analyzer-Referenz nur die Einstellung `returnDetails`.',
    },
    {
      en: 'The field schema belongs to the analyzer definition, not to the analyze request. To add fields to a prebuilt\'s output, create a custom analyzer.',
      de: 'Das Feldschema gehört zur Analyzer-Definition, nicht zur Analyse-Anfrage. Wenn du der Ausgabe eines Prebuilts Felder hinzufügen willst, legst du einen eigenen Analyzer an.',
    },
  ],
  takeaways: [
    { en: 'Analyzer = base analyzer + field schema + models (+ config).', de: 'Analyzer = Basis-Analyzer + Feldschema + Modelle (+ config).' },
    { en: 'Images: `generate` for descriptions and yes/no observations, `classify` with `enum` for fixed categories.', de: 'Bilder: `generate` für Beschreibungen und Ja/Nein-Beobachtungen, `classify` mit `enum` für feste Kategorien.' },
    { en: 'Field descriptions are prompts — specific descriptions give better values.', de: 'Feldbeschreibungen sind Prompts – präzise Beschreibungen liefern bessere Werte.' },
    { en: 'Text-heavy photos belong in a document analyzer to get OCR, `extract`, confidence and grounding.', de: 'Textlastige Fotos gehören in einen Dokument-Analyzer – für OCR, `extract`, Konfidenz und Grounding.' },
    { en: 'Better input, better fields: sharp, well-lit, upright photos with one clear subject work best.', de: 'Bessere Eingaben, bessere Felder: Scharfe, gut ausgeleuchtete, aufrechte Fotos mit einem klaren Motiv funktionieren am besten.' },
  ],
  sources: [
    { title: 'What is Azure Content Understanding in Foundry Tools?', url: 'https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview' },
    { title: 'Azure Content Understanding image solutions', url: 'https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/image/overview' },
    { title: 'What is a Content Understanding analyzer?', url: 'https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/analyzer-reference' },
    { title: 'Prebuilt analyzers in Azure Content Understanding', url: 'https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/prebuilt-analyzers' },
    { title: 'Create a custom analyzer', url: 'https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/tutorial/create-custom-analyzer' },
  ],
}
