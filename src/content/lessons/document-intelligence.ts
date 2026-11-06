import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'document-intelligence',
  summary: {
    en: '**Azure Document Intelligence in Foundry Tools** combines OCR with trained document models to turn forms and documents into structured JSON. It offers three kinds of models: **document analysis** models — `prebuilt-read` for printed and handwritten text and `prebuilt-layout` for tables, selection marks, paragraphs, sections and figures; **prebuilt** models for common document types such as invoices, receipts, ID documents, tax and mortgage forms; and **custom** models you train on your own labeled samples — template, neural, composed models and classifiers. The current GA API is v4.0 (`2024-11-30`); you work with it in Document Intelligence Studio, the REST API or SDKs such as `azure-ai-documentintelligence`. For RAG, the layout model can return **Markdown** that you split into semantic chunks before indexing.',
    de: '**Azure Document Intelligence in Foundry Tools** verbindet OCR mit trainierten Dokumentmodellen und macht aus Formularen und Dokumenten strukturiertes JSON. Es gibt drei Arten von Modellen: **Dokumentanalyse**-Modelle – `prebuilt-read` für gedruckten und handschriftlichen Text und `prebuilt-layout` für Tabellen, Auswahlfelder, Absätze, Abschnitte und Abbildungen; **Prebuilt**-Modelle für gängige Dokumenttypen wie Rechnungen, Belege, Ausweise, Steuer- und Hypothekenformulare; und **Custom**-Modelle, die du mit eigenen gelabelten Beispielen trainierst – Template, Neural, Composed Models und Classifier. Die aktuelle GA-API ist v4.0 (`2024-11-30`); du arbeitest damit im Document Intelligence Studio, über die REST API oder SDKs wie `azure-ai-documentintelligence`. Für RAG kann das Layout-Modell **Markdown** liefern, das du vor dem Indexieren in semantische Chunks zerlegst.',
  },
  examFocus: {
    en: 'Expect “which model?” scenarios (Read vs Layout vs a prebuilt vs custom template or neural vs classifier plus composed model), add-on features (`ocrHighResolution`, `formulas`, `styleFont`, `barcodes`, `languages`, `keyValuePairs`, `queryFields`), training basics (labeled samples in Azure Blob Storage, at least five per document type) and RAG ingestion with `outputContentFormat=markdown`. Also know when Content Understanding fits better: unstructured or multimodal content and fields you describe without labeling.',
    de: 'Rechne mit „Welches Modell?“-Szenarien (Read vs. Layout vs. Prebuilt vs. Custom Template oder Neural vs. Classifier plus Composed Model), mit Add-on-Features (`ocrHighResolution`, `formulas`, `styleFont`, `barcodes`, `languages`, `keyValuePairs`, `queryFields`), Trainingsgrundlagen (gelabelte Beispiele in Azure Blob Storage, mindestens fünf je Dokumenttyp) und RAG-Ingestion mit `outputContentFormat=markdown`. Wisse außerdem, wann Content Understanding besser passt: bei unstrukturierten oder multimodalen Inhalten und bei Feldern, die du ohne Labeling beschreibst.',
  },
  diagrams: [
    {
      id: 'di-pipeline',
      title: { en: 'OCR → layout → fields, plus Markdown for RAG', de: 'OCR → Layout → Felder, plus Markdown für RAG' },
      caption: {
        en: 'Each layer builds on the one before. Field models return typed values; the layout model can also emit Markdown for retrieval pipelines.',
        de: 'Jede Schicht baut auf der vorherigen auf. Feldmodelle liefern typisierte Werte; das Layout-Modell kann zusätzlich Markdown für Retrieval-Pipelines ausgeben.',
      },
      width: 960,
      height: 390,
      groups: [{ id: 'g-di', x: 170, y: 110, w: 620, h: 130, label: 'Azure Document Intelligence', tone: 'foundry' }],
      nodes: [
        { id: 'doc', x: 20, y: 150, w: 120, h: 70, label: { en: 'Document', de: 'Dokument' }, sub: 'PDF · PNG · TIFF', tone: 'data', shape: 'doc' },
        { id: 'read', x: 190, y: 150, w: 160, h: 70, label: 'Read', sub: { en: 'OCR: lines · words', de: 'OCR: Zeilen · Wörter' }, tone: 'model' },
        { id: 'layout', x: 400, y: 150, w: 170, h: 70, label: 'Layout', sub: { en: 'tables · selection marks', de: 'Tabellen · Auswahlfelder' }, tone: 'model' },
        { id: 'fieldmodel', x: 620, y: 150, w: 150, h: 70, label: { en: 'Field model', de: 'Feldmodell' }, sub: { en: 'prebuilt or custom', de: 'prebuilt oder custom' }, tone: 'model' },
        { id: 'json', x: 820, y: 150, w: 120, h: 70, label: { en: 'JSON fields', de: 'JSON-Felder' }, sub: { en: '+ confidence', de: '+ Konfidenz' }, tone: 'data', shape: 'doc' },
        { id: 'markdown', x: 400, y: 300, w: 170, h: 64, label: 'Markdown', sub: 'outputContentFormat', tone: 'data', shape: 'doc' },
        { id: 'chunks', x: 620, y: 300, w: 150, h: 64, label: { en: 'Semantic chunks', de: 'Semantische Chunks' }, sub: { en: 'split at headings', de: 'an Überschriften' }, tone: 'app' },
        { id: 'index', x: 820, y: 300, w: 120, h: 64, label: { en: 'Search index', de: 'Suchindex' }, sub: 'RAG', tone: 'data', shape: 'store' },
      ],
      edges: [
        { id: 'e1', from: 'doc', to: 'read' },
        { id: 'e2', from: 'read', to: 'layout' },
        { id: 'e3', from: 'layout', to: 'fieldmodel' },
        { id: 'e4', from: 'fieldmodel', to: 'json' },
        { id: 'e5', from: 'layout', to: 'markdown', label: { en: 'as Markdown', de: 'als Markdown' } },
        { id: 'e6', from: 'markdown', to: 'chunks' },
        { id: 'e7', from: 'chunks', to: 'index' },
      ],
      steps: [
        {
          title: { en: 'Read: optical character recognition', de: 'Read: optische Zeichenerkennung' },
          text: {
            en: '`prebuilt-read` extracts printed and handwritten text as pages, lines and words with confidence and bounding polygons. Optional add-ons detect the language per line or produce a searchable PDF.',
            de: '`prebuilt-read` extrahiert gedruckten und handschriftlichen Text als Seiten, Zeilen und Wörter mit Konfidenz und umschließenden Polygonen. Optionale Add-ons erkennen die Sprache je Zeile oder erzeugen ein durchsuchbares PDF.',
          },
          focus: ['doc', 'e1', 'read'],
        },
        {
          title: { en: 'Layout: document structure', de: 'Layout: Dokumentstruktur' },
          text: {
            en: '`prebuilt-layout` adds tables (with merged cells), selection marks, paragraphs with roles such as `title` and `sectionHeading`, sections and figures. The `keyValuePairs` feature replaces the deprecated general document model.',
            de: '`prebuilt-layout` ergänzt Tabellen (mit verbundenen Zellen), Auswahlfelder, Absätze mit Rollen wie `title` und `sectionHeading`, Abschnitte und Abbildungen. Das Feature `keyValuePairs` ersetzt das veraltete (deprecated) General-Document-Modell.',
          },
          focus: ['e2', 'layout'],
        },
        {
          title: { en: 'Fields from a model', de: 'Felder aus einem Modell' },
          text: {
            en: 'A prebuilt model (for example `prebuilt-invoice`) or your custom model returns `documents` with typed fields — strings, numbers, dates, currency, addresses — each with `confidence` and its location on the page.',
            de: 'Ein Prebuilt-Modell (etwa `prebuilt-invoice`) oder dein Custom-Modell liefert `documents` mit typisierten Feldern – Strings, Zahlen, Datumswerte, Währungen, Adressen – jeweils mit `confidence` und Fundstelle auf der Seite.',
          },
          focus: ['e3', 'fieldmodel', 'e4', 'json'],
        },
        {
          title: { en: 'Markdown for RAG ingestion', de: 'Markdown für die RAG-Ingestion' },
          text: {
            en: 'With `outputContentFormat=markdown`, layout returns the whole document as Markdown: headings, paragraphs and HTML tables. Split it at headings so chunks follow sections and tables stay intact, then embed and index the chunks.',
            de: 'Mit `outputContentFormat=markdown` liefert Layout das ganze Dokument als Markdown: Überschriften, Absätze und HTML-Tabellen. Zerlege es an Überschriften, damit Chunks den Abschnitten folgen und Tabellen ganz bleiben, und bette die Chunks dann ein und indexiere sie.',
          },
          focus: ['e5', 'markdown', 'e6', 'chunks', 'e7', 'index'],
        },
      ],
    },
    {
      id: 'di-model-choice',
      title: { en: 'Prebuilt or custom? Pick the right model', de: 'Prebuilt oder Custom? Das richtige Modell wählen' },
      caption: {
        en: 'Check the prebuilt catalog first. Train only when no prebuilt fits: varying layouts call for a neural model; one fixed layout works with template or neural.',
        de: 'Prüfe zuerst den Prebuilt-Katalog. Trainiere nur, wenn kein Prebuilt passt: Wechselnde Layouts verlangen ein Neural-Modell; ein festes Layout klappt mit Template oder Neural.',
      },
      width: 960,
      height: 420,
      nodes: [
        { id: 'start', x: 20, y: 190, w: 140, h: 60, label: { en: 'Document type', de: 'Dokumenttyp' }, sub: { en: 'what do you need?', de: 'was brauchst du?' }, tone: 'neutral' },
        { id: 'd1', x: 200, y: 180, w: 150, h: 80, label: { en: 'Fields needed?', de: 'Felder nötig?' }, tone: 'neutral', shape: 'diamond' },
        { id: 'r1', x: 200, y: 330, w: 150, h: 64, label: 'Read / Layout', sub: { en: 'text · tables', de: 'Text · Tabellen' }, tone: 'model' },
        { id: 'd2', x: 400, y: 180, w: 150, h: 80, label: { en: 'Prebuilt fits?', de: 'Prebuilt passt?' }, tone: 'neutral', shape: 'diamond' },
        { id: 'r2', x: 400, y: 40, w: 150, h: 64, label: { en: 'Prebuilt model', de: 'Prebuilt-Modell' }, sub: 'invoice · receipt', tone: 'model' },
        { id: 'd3', x: 600, y: 180, w: 150, h: 80, label: { en: 'Layouts vary?', de: 'Layouts variabel?' }, tone: 'neutral', shape: 'diamond' },
        { id: 'r3', x: 590, y: 40, w: 170, h: 64, label: { en: 'Template or neural', de: 'Template oder Neural' }, sub: { en: 'one fixed layout', de: 'ein festes Layout' }, tone: 'model' },
        { id: 'r4', x: 800, y: 188, w: 140, h: 64, label: { en: 'Custom neural', de: 'Custom Neural' }, sub: { en: 'varying layouts', de: 'variable Layouts' }, tone: 'model' },
        { id: 'r5', x: 600, y: 330, w: 340, h: 64, label: { en: 'Classifier + composed model', de: 'Classifier + Composed Model' }, sub: { en: 'routes each document to its model', de: 'leitet jedes Dokument an sein Modell' }, tone: 'model' },
      ],
      edges: [
        { id: 'e-s-d1', from: 'start', to: 'd1' },
        { id: 'e-d1-r1', from: 'd1', to: 'r1', label: { en: 'no', de: 'nein' } },
        { id: 'e-d1-d2', from: 'd1', to: 'd2', label: { en: 'yes', de: 'ja' } },
        { id: 'e-d2-r2', from: 'd2', to: 'r2', label: { en: 'yes', de: 'ja' } },
        { id: 'e-d2-d3', from: 'd2', to: 'd3', label: { en: 'no', de: 'nein' } },
        { id: 'e-d3-r3', from: 'd3', to: 'r3', label: { en: 'no', de: 'nein' } },
        { id: 'e-d3-r4', from: 'd3', to: 'r4', label: { en: 'yes', de: 'ja' } },
        { id: 'e-r4-r5', from: 'r4', to: 'r5', label: { en: 'combine', de: 'kombinieren' }, dashed: true },
      ],
      steps: [
        {
          title: { en: 'Do you need fields at all?', de: 'Brauchst du überhaupt Felder?' },
          text: {
            en: 'If you only need the text or the structure — for search, translation or RAG — use `prebuilt-read` or `prebuilt-layout`. No training, no schema.',
            de: 'Brauchst du nur den Text oder die Struktur – für Suche, Übersetzung oder RAG –, nimm `prebuilt-read` oder `prebuilt-layout`. Kein Training, kein Schema.',
          },
          focus: ['start', 'e-s-d1', 'd1', 'e-d1-r1', 'r1'],
        },
        {
          title: { en: 'Check the prebuilt catalog first', de: 'Zuerst den Prebuilt-Katalog prüfen' },
          text: {
            en: 'Invoices, receipts, ID documents, health insurance cards, bank statements, checks, pay stubs, contracts, US tax and US mortgage forms all have prebuilt models with ready field schemas. Use `queryFields` to add a few extra fields without training.',
            de: 'Rechnungen, Belege, Ausweise, Krankenversicherungskarten, Kontoauszüge, Schecks, Gehaltsabrechnungen, Verträge sowie US-Steuer- und US-Hypothekenformulare haben Prebuilt-Modelle mit fertigen Feldschemas. Mit `queryFields` ergänzt du ein paar Zusatzfelder ohne Training.',
          },
          focus: ['e-d1-d2', 'd2', 'e-d2-r2', 'r2'],
        },
        {
          title: { en: 'One fixed layout → template or neural', de: 'Ein festes Layout → Template oder Neural' },
          text: {
            en: 'If the blank forms look identical, a template model works: it trains in about 1–5 minutes and supports the widest language range, but each layout variation needs its own model. Where neural supports your language, the docs recommend trying neural first because it is usually more accurate.',
            de: 'Sehen die leeren Formulare identisch aus, funktioniert ein Template-Modell: Es trainiert in etwa 1–5 Minuten und unterstützt die meisten Sprachen, braucht aber je Layoutvariante ein eigenes Modell. Unterstützt Neural deine Sprache, empfiehlt die Doku, zuerst Neural zu testen, weil es meist genauer ist.',
          },
          focus: ['e-d2-d3', 'd3', 'e-d3-r3', 'r3'],
        },
        {
          title: { en: 'Varying layouts → custom neural', de: 'Wechselnde Layouts → Custom Neural' },
          text: {
            en: 'Neural models handle structured, semi-structured and unstructured documents with one model across variations and support overlapping fields. Training takes longer (30 minutes by default). Both custom types start with five labeled samples.',
            de: 'Neural-Modelle verarbeiten strukturierte, teilstrukturierte und unstrukturierte Dokumente mit einem Modell über alle Varianten und unterstützen überlappende Felder. Das Training dauert länger (standardmäßig 30 Minuten). Beide Custom-Typen starten mit fünf gelabelten Beispielen.',
          },
          focus: ['e-d3-r4', 'r4'],
        },
        {
          title: { en: 'Mixed files → classifier + composed model', de: 'Gemischte Dateien → Classifier + Composed Model' },
          text: {
            en: 'A custom classifier (at least two classes, five samples each) identifies document types and, with `splitMode` set to `auto`, splits a bundled file. In v4.0 a composed model uses that explicit classifier to route each document to the right extraction model.',
            de: 'Ein Custom Classifier (mindestens zwei Klassen mit je fünf Beispielen) erkennt Dokumenttypen und teilt mit `splitMode` = `auto` eine gebündelte Datei auf. In v4.0 nutzt ein Composed Model diesen expliziten Classifier, um jedes Dokument an das passende Extraktionsmodell zu leiten.',
          },
          focus: ['e-r4-r5', 'r5'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Read and Layout models',
      text: {
        en: '`prebuilt-read` is the OCR foundation: printed and handwritten text as lines and words with confidence and polygons, optional language detection and searchable-PDF output. `prebuilt-layout` adds tables, selection marks, paragraph roles (`title`, `sectionHeading` …), sections and figures, can return Markdown and, with `keyValuePairs`, covers the deprecated general document model.',
        de: '`prebuilt-read` ist die OCR-Grundlage: gedruckter und handschriftlicher Text als Zeilen und Wörter mit Konfidenz und Polygonen, optionaler Spracherkennung und Ausgabe als durchsuchbares PDF. `prebuilt-layout` ergänzt Tabellen, Auswahlfelder, Absatzrollen (`title`, `sectionHeading` …), Abschnitte und Abbildungen, kann Markdown liefern und deckt mit `keyValuePairs` das veraltete General-Document-Modell ab.',
      },
    },
    {
      term: 'Resources and input limits',
      text: {
        en: 'Use a Foundry resource (one endpoint for several Foundry Tools) or a single-service Document Intelligence resource. Inputs: PDF and images (JPEG, PNG, BMP, TIFF, HEIF), plus Office files for Read and Layout; up to 500 MB on S0 (4 MB on F0), 50 × 50 to 10,000 × 10,000 pixels, up to 2,000 pages and no password-protected PDFs.',
        de: 'Nutze eine Foundry-Ressource (ein Endpoint für mehrere Foundry Tools) oder eine Einzeldienst-Ressource für Document Intelligence. Eingaben: PDF und Bilder (JPEG, PNG, BMP, TIFF, HEIF), für Read und Layout auch Office-Dateien; bis 500 MB bei S0 (4 MB bei F0), 50 × 50 bis 10.000 × 10.000 Pixel, bis 2.000 Seiten und keine passwortgeschützten PDFs.',
      },
    },
    {
      term: 'Prebuilt models',
      text: {
        en: 'Microsoft-trained models with fixed schemas for invoices, receipts, ID documents, health insurance cards, bank statements, checks, pay stubs, credit cards, contracts, marriage certificates, US tax and US mortgage forms. Values are returned typed, for example `InvoiceDate` as a date.',
        de: 'Von Microsoft trainierte Modelle mit festen Schemas für Rechnungen, Belege, Ausweise, Krankenversicherungskarten, Kontoauszüge, Schecks, Gehaltsabrechnungen, Kreditkarten, Verträge, Heiratsurkunden, US-Steuer- und US-Hypothekenformulare. Werte kommen typisiert zurück, etwa `InvoiceDate` als Datum.',
      },
    },
    {
      term: 'Custom template vs custom neural',
      text: {
        en: 'Both learn your fields from labeled samples (`buildMode`). Template: one consistent visual layout, fast training, one model per variation. Neural: structured to unstructured documents, one model for many variations, overlapping fields — recommended when your language is supported.',
        de: 'Beide lernen deine Felder aus gelabelten Beispielen (`buildMode`). Template: ein konsistentes visuelles Layout, schnelles Training, ein Modell je Variante. Neural: strukturierte bis unstrukturierte Dokumente, ein Modell für viele Varianten, überlappende Felder – empfohlen, wenn deine Sprache unterstützt wird.',
      },
    },
    {
      term: 'Custom classifier and composed model',
      text: {
        en: 'A classifier needs at least two classes with five samples each; in v4.0 it doesn\'t split files unless you set `splitMode` to `auto` or `perPage`. A composed model groups extraction models behind one model ID and routes documents through an explicit classifier.',
        de: 'Ein Classifier braucht mindestens zwei Klassen mit je fünf Beispielen; in v4.0 teilt er Dateien nur, wenn du `splitMode` auf `auto` oder `perPage` setzt. Ein Composed Model bündelt Extraktionsmodelle hinter einer Modell-ID und leitet Dokumente über einen expliziten Classifier weiter.',
      },
    },
    {
      term: 'Add-on capabilities',
      text: {
        en: 'Enabled per request with `features`: `ocrHighResolution`, `formulas` and `styleFont` cost extra; `barcodes`, `languages` and `keyValuePairs` are free; `queryFields` is a premium add-on for up to 20 extra fields without training. Office files don\'t support add-ons.',
        de: 'Pro Anfrage über `features` aktiviert: `ocrHighResolution`, `formulas` und `styleFont` kosten extra; `barcodes`, `languages` und `keyValuePairs` sind kostenlos; `queryFields` ist ein Premium-Add-on für bis zu 20 Zusatzfelder ohne Training. Office-Dateien unterstützen keine Add-ons.',
      },
    },
    {
      term: 'Document Intelligence Studio',
      text: {
        en: 'Web tool to test Read, Layout and prebuilt models, label samples and train custom models and classifiers without writing JSON label files. Custom projects need an Azure Blob Storage container with CORS configured for the Studio.',
        de: 'Webtool, um Read, Layout und Prebuilt-Modelle zu testen, Beispiele zu labeln und Custom-Modelle sowie Classifier zu trainieren, ohne JSON-Labeldateien zu schreiben. Custom-Projekte brauchen einen Azure-Blob-Storage-Container mit CORS-Konfiguration für das Studio.',
      },
    },
  ],
  comparison: {
    title: { en: 'Document Intelligence, Content Understanding or your own LLM pipeline?', de: 'Document Intelligence, Content Understanding oder eigene LLM-Pipeline?' },
    columns: [
      { en: 'Scenario', de: 'Szenario' },
      { en: 'Recommended', de: 'Empfehlung' },
      { en: 'Why', de: 'Warum' },
    ],
    rows: [
      [
        { en: 'Standard structured forms with a prebuilt (invoice, receipt, ID, tax, mortgage)', de: 'Strukturierte Standardformulare mit Prebuilt (Rechnung, Beleg, Ausweis, Steuer, Hypothek)' },
        { en: 'Document Intelligence prebuilt model', de: 'Document-Intelligence-Prebuilt-Modell' },
        { en: 'High accuracy on common, consistent templates', de: 'Hohe Genauigkeit bei gängigen, gleichbleibenden Vorlagen' },
      ],
      [
        { en: 'Highly structured forms with labeled samples', de: 'Stark strukturierte Formulare mit gelabelten Beispielen' },
        { en: 'Document Intelligence custom model', de: 'Document-Intelligence-Custom-Modell' },
        { en: 'Trains from as few as five labeled samples', de: 'Training ab fünf gelabelten Beispielen' },
      ],
      [
        { en: 'Unstructured documents or new fields without labeling', de: 'Unstrukturierte Dokumente oder neue Felder ohne Labeling' },
        { en: 'Content Understanding custom analyzer (or prebuilt-contract)', de: 'Content-Understanding-Analyzer (oder prebuilt-contract)' },
        { en: 'Fields described in plain language; values can be inferred', de: 'Felder in Alltagssprache beschrieben; Werte können erschlossen werden' },
      ],
      [
        { en: 'OCR or layout only', de: 'Nur OCR oder Layout' },
        { en: 'Read or Layout (Content Understanding or Document Intelligence)', de: 'Read oder Layout (Content Understanding oder Document Intelligence)' },
        { en: 'The decision guide favors Content Understanding prebuilt-read/-layout for cost', de: 'Der Entscheidungsleitfaden empfiehlt aus Kostengründen prebuilt-read/-layout von Content Understanding' },
      ],
      [
        { en: 'Images, audio, video or RAG-ready Markdown with figure descriptions', de: 'Bilder, Audio, Video oder RAG-fähiges Markdown mit Abbildungsbeschreibungen' },
        { en: 'Content Understanding analyzers', de: 'Content-Understanding-Analyzer' },
        { en: 'One multimodal service with markdown and fields', de: 'Ein multimodaler Dienst mit Markdown und Feldern' },
      ],
      [
        { en: 'On-premises or air-gapped processing', de: 'On-Premises- oder Air-Gapped-Verarbeitung' },
        { en: 'Document Intelligence containers', de: 'Document-Intelligence-Container' },
        { en: 'Currently the only container option', de: 'Derzeit die einzige Container-Option' },
      ],
      [
        { en: 'Full control over models and prompts', de: 'Volle Kontrolle über Modelle und Prompts' },
        { en: 'Foundry model you orchestrate yourself', de: 'Selbst orchestriertes Foundry-Modell' },
        { en: 'Flexible, but no built-in confidence or grounding', de: 'Flexibel, aber ohne eingebaute Konfidenz und Grounding' },
      ],
    ],
  },
  code: [
    {
      title: { en: 'Extract invoice fields with a prebuilt model', de: 'Rechnungsfelder mit einem Prebuilt-Modell extrahieren' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.documentintelligence import DocumentIntelligenceClient
from azure.ai.documentintelligence.models import AnalyzeDocumentRequest

client = DocumentIntelligenceClient(
    endpoint="https://<resource>.cognitiveservices.azure.com/",
    credential=DefaultAzureCredential(),
)

poller = client.begin_analyze_document(
    "prebuilt-invoice",
    AnalyzeDocumentRequest(url_source="https://<storage>/invoices/inv-1001.pdf"),
)
result = poller.result()

for invoice in result.documents:
    for name in ("VendorName", "InvoiceDate", "InvoiceTotal"):
        field = invoice.fields.get(name)
        if field:
            print(name, field.get("content"), field.get("confidence"))`,
      notes: [
        { en: 'The first argument is the model ID — a prebuilt such as `prebuilt-invoice` or the ID of your custom or composed model.', de: 'Das erste Argument ist die Modell-ID – ein Prebuilt wie `prebuilt-invoice` oder die ID deines Custom- oder Composed-Modells.' },
        { en: '`AnalyzeDocumentRequest` takes either `url_source` or `bytes_source`; the call returns a poller.', de: '`AnalyzeDocumentRequest` nimmt entweder `url_source` oder `bytes_source`; der Aufruf liefert einen Poller.' },
        { en: 'Install the v4.0 SDK with `pip install azure-ai-documentintelligence`.', de: 'Das v4.0-SDK installierst du mit `pip install azure-ai-documentintelligence`.' },
      ],
    },
    {
      title: { en: 'Layout as Markdown, split at headings for RAG', de: 'Layout als Markdown, an Überschriften zerlegt für RAG' },
      code: `from azure.ai.documentintelligence.models import AnalyzeDocumentRequest, DocumentContentFormat

poller = client.begin_analyze_document(
    "prebuilt-layout",
    AnalyzeDocumentRequest(url_source="https://<storage>/policies/motor-policy.pdf"),
    output_content_format=DocumentContentFormat.MARKDOWN,
)
markdown = poller.result().content        # the whole document as Markdown

chunks, current = [], []
for line in markdown.splitlines():
    if line.startswith("#") and current:  # a heading starts a new chunk
        chunks.append("\\n".join(current))
        current = []
    current.append(line)
chunks.append("\\n".join(current))
# embed each chunk and upload it to your Azure AI Search index`,
      notes: [
        { en: 'In v4.0 Markdown, tables appear as HTML `<table>` blocks, so a heading-based split keeps each table inside its section\'s chunk.', de: 'Im v4.0-Markdown erscheinen Tabellen als HTML-`<table>`-Blöcke; ein Schnitt an Überschriften hält jede Tabelle im Chunk ihres Abschnitts.' },
        { en: 'The docs also show LangChain\'s `AzureAIDocumentIntelligenceLoader` with `MarkdownHeaderTextSplitter` for the same pattern.', de: 'Die Doku zeigt für dasselbe Muster auch LangChains `AzureAIDocumentIntelligenceLoader` mit `MarkdownHeaderTextSplitter`.' },
      ],
    },
  ],
  traps: [
    {
      en: '`prebuilt-document` means two different things: in Content Understanding it is the base analyzer for custom document analyzers; in Document Intelligence it was the general document model, which is deprecated — use `prebuilt-layout` with `keyValuePairs` instead.',
      de: '`prebuilt-document` bedeutet zweierlei: In Content Understanding ist es der Basis-Analyzer für eigene Dokument-Analyzer; in Document Intelligence war es das General-Document-Modell, das veraltet (deprecated) ist – nutze stattdessen `prebuilt-layout` mit `keyValuePairs`.',
    },
    {
      en: 'Template models break when the layout varies. Different layouts need one template model each (combined in a composed model) or a single neural model.',
      de: 'Template-Modelle scheitern, wenn das Layout variiert. Unterschiedliche Layouts brauchen je ein eigenes Template-Modell (gebündelt in einem Composed Model) oder ein einzelnes Neural-Modell.',
    },
    {
      en: 'v4.0 classifiers don\'t split files by default (`splitMode` is `none`). For a PDF that bundles several documents, set `splitMode` to `auto`.',
      de: 'v4.0-Classifier teilen Dateien standardmäßig nicht (`splitMode` ist `none`). Für ein PDF mit mehreren gebündelten Dokumenten setzt du `splitMode` auf `auto`.',
    },
    {
      en: 'Add-ons such as `ocrHighResolution` and `queryFields` cost extra and don\'t work on Office files; searchable PDF output works only with `prebuilt-read`.',
      de: 'Add-ons wie `ocrHighResolution` und `queryFields` kosten extra und funktionieren nicht mit Office-Dateien; durchsuchbares PDF gibt es nur mit `prebuilt-read`.',
    },
    {
      en: 'Fixed-size chunks of OCR text can cut tables and sentences apart. For RAG, request Markdown from layout and chunk along headings.',
      de: 'Chunks fester Größe aus OCR-Text können Tabellen und Sätze zerschneiden. Für RAG forderst du Markdown von Layout an und zerlegst entlang der Überschriften.',
    },
  ],
  takeaways: [
    { en: 'Read = text, Layout = text + structure, prebuilt = fields for known types, custom = your own fields.', de: 'Read = Text, Layout = Text + Struktur, Prebuilt = Felder für bekannte Typen, Custom = deine eigenen Felder.' },
    { en: 'Always check the prebuilt catalog before you label and train anything.', de: 'Prüfe immer den Prebuilt-Katalog, bevor du labelst und trainierst.' },
    { en: 'Varying layouts → neural; one fixed layout → template (fast, most languages) or neural (usually more accurate); mixed files → classifier plus composed model.', de: 'Wechselnde Layouts → Neural; ein festes Layout → Template (schnell, die meisten Sprachen) oder Neural (meist genauer); gemischte Dateien → Classifier plus Composed Model.' },
    { en: 'Layout Markdown plus section-aware chunking gives RAG better grounding.', de: 'Layout-Markdown plus abschnittsbewusstes Chunking verbessert das Grounding in RAG.' },
  ],
  sources: [
    { title: 'What is Azure Document Intelligence in Foundry Tools?', url: 'https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/overview?view=doc-intel-4.0.0' },
    { title: 'Document Intelligence layout model', url: 'https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/layout?view=doc-intel-4.0.0' },
    { title: 'Document Intelligence custom models', url: 'https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/train/custom-model?view=doc-intel-4.0.0' },
    { title: 'Retrieval-Augmented Generation with Azure Document Intelligence', url: 'https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/concept/retrieval-augmented-generation?view=doc-intel-4.0.0' },
    { title: 'Choose the right Foundry Tool for document processing', url: 'https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/choosing-right-ai-tool' },
  ],
}
