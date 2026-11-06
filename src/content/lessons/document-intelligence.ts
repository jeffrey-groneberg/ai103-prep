import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'document-intelligence',
  summary: {
    en: '**Azure Document Intelligence in Foundry Tools** combines OCR (optical character recognition: reading text from pixels) with trained document models to turn forms and documents into structured JSON. It offers three kinds of models:\n\n- **Document analysis** — `prebuilt-read` (text) and `prebuilt-layout` (text plus tables, selection marks, sections, figures) · no training\n- **Prebuilt** — fixed field schemas for invoices, receipts, ID documents, tax and mortgage forms and more · no training\n- **Custom** — template, neural, composed models and classifiers · trained on your labeled samples\n\nThe current GA API is v4.0 (`2024-11-30`); you work with it in Document Intelligence Studio, the REST API or SDKs such as `azure-ai-documentintelligence`. For RAG (retrieve relevant content and ground the answer in it), the layout model can return **Markdown** that you split into semantic chunks before indexing.',
    de: '**Azure Document Intelligence in Foundry Tools** verbindet OCR (optische Zeichenerkennung: Text aus Pixeln lesen) mit trainierten Dokumentmodellen und macht aus Formularen und Dokumenten strukturiertes JSON. Es gibt drei Arten von Modellen:\n\n- **Dokumentanalyse** – `prebuilt-read` (Text) und `prebuilt-layout` (Text plus Tabellen, Auswahlfelder, Abschnitte, Abbildungen) · kein Training\n- **Prebuilt** – feste Feldschemas für Rechnungen, Belege, Ausweise, Steuer- und Hypothekenformulare und mehr · kein Training\n- **Custom** – Template, Neural, Composed Models und Classifier · trainiert mit deinen gelabelten Beispielen\n\nDie aktuelle GA-API ist v4.0 (`2024-11-30`); du arbeitest damit im Document Intelligence Studio, über die REST API oder SDKs wie `azure-ai-documentintelligence`. Für RAG (passende Inhalte abrufen und die Antwort darauf stützen) kann das Layout-Modell **Markdown** liefern, das du vor dem Indexieren in semantische Chunks zerlegst.',
  },
  examFocus: {
    en: 'Expect “which model?” scenarios (Read vs Layout vs a prebuilt vs custom template or neural vs classifier plus composed model), add-on features (`ocrHighResolution`, `formulas`, `styleFont`, `barcodes`, `languages`, `keyValuePairs`, `queryFields`), training basics (labeled samples in Azure Blob Storage, at least five per document type) and RAG ingestion with `outputContentFormat=markdown`. Also know the deciding factor from Microsoft\'s guide *Choose the right Foundry Tool for document processing*: labeled samples → Document Intelligence custom model; no labeling, inferred fields or multimodal content → Content Understanding.',
    de: 'Rechne mit „Welches Modell?“-Szenarien (Read vs. Layout vs. Prebuilt vs. Custom Template oder Neural vs. Classifier plus Composed Model), mit Add-on-Features (`ocrHighResolution`, `formulas`, `styleFont`, `barcodes`, `languages`, `keyValuePairs`, `queryFields`), Trainingsgrundlagen (gelabelte Beispiele in Azure Blob Storage, mindestens fünf je Dokumenttyp) und RAG-Ingestion mit `outputContentFormat=markdown`. Kenne außerdem das Entscheidungskriterium aus Microsofts Leitfaden *Choose the right Foundry Tool for document processing*: gelabelte Beispiele → Document-Intelligence-Custom-Modell; kein Labeling, erschlossene Felder oder multimodale Inhalte → Content Understanding.',
  },
  diagrams: [
    {
      id: 'di-pipeline',
      title: { en: 'OCR → layout → fields, plus Markdown for RAG', de: 'OCR → Layout → Felder, plus Markdown für RAG' },
      caption: {
        en: 'Each layer adds to the one before, inside a single call: a field model runs the OCR and layout layers it needs internally and returns typed values. The layout model can also emit Markdown for retrieval pipelines.',
        de: 'Jede Schicht ergänzt die vorherige – innerhalb eines einzigen Aufrufs: Ein Feldmodell führt die nötigen OCR- und Layout-Schichten intern aus und liefert typisierte Werte. Das Layout-Modell kann zusätzlich Markdown für Retrieval-Pipelines ausgeben.',
      },
      width: 960,
      height: 330,
      groups: [{ id: 'g-di', x: 165, y: 40, w: 630, h: 140, label: 'Azure Document Intelligence', tone: 'foundry' }],
      nodes: [
        { id: 'doc', x: 20, y: 90, w: 120, h: 70, label: { en: 'Document', de: 'Dokument' }, sub: 'PDF · PNG · TIFF', tone: 'data', shape: 'doc' },
        { id: 'read', x: 185, y: 90, w: 150, h: 70, label: 'Read', sub: { en: 'OCR: lines · words', de: 'OCR: Zeilen · Wörter' }, tone: 'model' },
        { id: 'layout', x: 405, y: 90, w: 165, h: 70, label: 'Layout', sub: { en: 'tables · selection marks', de: 'Tabellen · Auswahlfelder' }, tone: 'model' },
        { id: 'fieldmodel', x: 635, y: 90, w: 145, h: 70, label: { en: 'Field model', de: 'Feldmodell' }, sub: { en: 'prebuilt or custom', de: 'prebuilt oder custom' }, tone: 'model' },
        { id: 'json', x: 820, y: 90, w: 120, h: 70, label: { en: 'JSON fields', de: 'JSON-Felder' }, sub: { en: '+ confidence', de: '+ Konfidenz' }, tone: 'data', shape: 'doc' },
        { id: 'markdown', x: 405, y: 240, w: 165, h: 64, label: 'Markdown', sub: 'outputContentFormat', tone: 'data', shape: 'doc' },
        { id: 'chunks', x: 620, y: 240, w: 165, h: 64, label: { en: 'Semantic chunks', de: 'Semantische Chunks' }, sub: { en: 'split at headings', de: 'an Überschriften' }, tone: 'app' },
        { id: 'index', x: 820, y: 240, w: 120, h: 64, label: { en: 'Search index', de: 'Suchindex' }, sub: 'RAG', tone: 'data', shape: 'store' },
      ],
      edges: [
        { id: 'e1', from: 'doc', to: 'read' },
        { id: 'e2', from: 'read', to: 'layout', label: { en: 'adds', de: 'ergänzt' }, dashed: true },
        { id: 'e3', from: 'layout', to: 'fieldmodel', label: { en: 'adds', de: 'ergänzt' }, dashed: true },
        { id: 'e4', from: 'fieldmodel', to: 'json' },
        { id: 'e5', from: 'layout', to: 'markdown', label: { en: 'as Markdown', de: 'als Markdown' } },
        { id: 'e6', from: 'markdown', to: 'chunks' },
        { id: 'e7', from: 'chunks', to: 'index' },
      ],
      steps: [
        {
          title: { en: 'Read: optical character recognition', de: 'Read: optische Zeichenerkennung' },
          text: {
            en: '`prebuilt-read` extracts printed and handwritten text as pages, lines and words with confidence and bounding polygons (the corner coordinates of each word or line on the page). Optional add-ons detect the language per line or produce a searchable PDF. Read is also the OCR engine underneath layout, the prebuilt models and custom models.',
            de: '`prebuilt-read` extrahiert gedruckten und handschriftlichen Text als Seiten, Zeilen und Wörter mit Konfidenz und umschließenden Polygonen (den Eckkoordinaten jedes Worts oder jeder Zeile auf der Seite). Optionale Add-ons erkennen die Sprache je Zeile oder erzeugen ein durchsuchbares PDF. Read ist zugleich die OCR-Engine unter Layout, den Prebuilt-Modellen und Custom-Modellen.',
          },
          focus: ['doc', 'e1', 'read'],
        },
        {
          title: { en: 'Layout: document structure', de: 'Layout: Dokumentstruktur' },
          text: {
            en: '`prebuilt-layout` adds tables (with merged cells), selection marks (checkboxes and radio buttons, selected or not), paragraphs with roles such as `title` and `sectionHeading`, sections and figures. The `keyValuePairs` feature replaces the deprecated general document model.',
            de: '`prebuilt-layout` ergänzt Tabellen (mit verbundenen Zellen), Auswahlfelder (Kontrollkästchen und Optionsfelder, markiert oder nicht), Absätze mit Rollen wie `title` und `sectionHeading`, Abschnitte und Abbildungen. Das Feature `keyValuePairs` ersetzt das veraltete (deprecated) General-Document-Modell.',
          },
          focus: ['e2', 'layout'],
        },
        {
          title: { en: 'Fields from a model', de: 'Felder aus einem Modell' },
          text: {
            en: 'You send the document once, to the model you need: a prebuilt model (for example `prebuilt-invoice`) or your custom model runs the OCR and layout analysis it needs internally and returns `documents` with typed fields — strings, numbers, dates, currency, addresses — each with `confidence` and its location on the page.',
            de: 'Du schickst das Dokument nur einmal – an das Modell, das du brauchst: Ein Prebuilt-Modell (etwa `prebuilt-invoice`) oder dein Custom-Modell führt die nötige OCR- und Layoutanalyse intern aus und liefert `documents` mit typisierten Feldern – Strings, Zahlen, Datumswerte, Währungen, Adressen – jeweils mit `confidence` und Fundstelle auf der Seite.',
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
        en: 'Check the prebuilt catalog first. No labeled samples → a Content Understanding custom analyzer. With labeled samples, varying layouts call for a neural model, one fixed layout works with template or neural, and several document types are combined in a composed model.',
        de: 'Prüfe zuerst den Prebuilt-Katalog. Keine gelabelten Beispiele → ein eigener Content-Understanding-Analyzer. Mit gelabelten Beispielen verlangen wechselnde Layouts ein Neural-Modell, ein festes Layout klappt mit Template oder Neural, und mehrere Dokumenttypen bündelst du in einem Composed Model.',
      },
      width: 960,
      height: 575,
      nodes: [
        { id: 'start', x: 20, y: 180, w: 130, h: 60, label: { en: 'Document type', de: 'Dokumenttyp' }, sub: { en: 'what do you need?', de: 'was brauchst du?' }, tone: 'neutral' },
        { id: 'd1', x: 190, y: 170, w: 150, h: 80, label: { en: 'Fields needed?', de: 'Felder nötig?' }, tone: 'neutral', shape: 'diamond' },
        { id: 'r1', x: 190, y: 318, w: 150, h: 64, label: 'Read / Layout', sub: { en: 'text · tables', de: 'Text · Tabellen' }, tone: 'model' },
        { id: 'd2', x: 385, y: 170, w: 150, h: 80, label: { en: 'Prebuilt fits?', de: 'Prebuilt passt?' }, tone: 'neutral', shape: 'diamond' },
        { id: 'r2', x: 385, y: 40, w: 150, h: 64, label: { en: 'Prebuilt model', de: 'Prebuilt-Modell' }, sub: 'invoice · receipt', tone: 'model' },
        { id: 'd4', x: 585, y: 170, w: 170, h: 80, label: { en: 'Labeled samples?', de: 'Gelabelte Beispiele?' }, tone: 'neutral', shape: 'diamond' },
        { id: 'r6', x: 575, y: 30, w: 190, h: 70, label: { en: 'Content Understanding\ncustom analyzer', de: 'Content Understanding\neigener Analyzer' }, sub: { en: 'fields in plain language', de: 'Felder in Alltagssprache' }, tone: 'foundry' },
        { id: 'd3', x: 590, y: 310, w: 160, h: 80, label: { en: 'Layouts vary?', de: 'Layouts variabel?' }, tone: 'neutral', shape: 'diamond' },
        { id: 'r3', x: 370, y: 318, w: 170, h: 64, label: { en: 'Template or neural', de: 'Template oder Neural' }, sub: { en: 'one fixed layout', de: 'ein festes Layout' }, tone: 'model' },
        { id: 'r4', x: 795, y: 318, w: 145, h: 64, label: { en: 'Custom neural', de: 'Custom Neural' }, sub: { en: 'varying layouts', de: 'variable Layouts' }, tone: 'model' },
        { id: 'r5', x: 500, y: 490, w: 325, h: 60, label: { en: 'Classifier + composed model', de: 'Classifier + Composed Model' }, sub: { en: 'routes each document to its model', de: 'leitet jedes Dokument an sein Modell' }, tone: 'model' },
      ],
      edges: [
        { id: 'e-s-d1', from: 'start', to: 'd1' },
        { id: 'e-d1-r1', from: 'd1', to: 'r1', label: { en: 'no', de: 'nein' } },
        { id: 'e-d1-d2', from: 'd1', to: 'd2', label: { en: 'yes', de: 'ja' } },
        { id: 'e-d2-r2', from: 'd2', to: 'r2', label: { en: 'yes', de: 'ja' } },
        { id: 'e-d2-d4', from: 'd2', to: 'd4', label: { en: 'no', de: 'nein' } },
        { id: 'e-d4-r6', from: 'd4', to: 'r6', label: { en: 'no', de: 'nein' } },
        { id: 'e-d4-d3', from: 'd4', to: 'd3', label: { en: 'yes', de: 'ja' } },
        { id: 'e-d3-r3', from: 'd3', to: 'r3', label: { en: 'no', de: 'nein' } },
        { id: 'e-d3-r4', from: 'd3', to: 'r4', label: { en: 'yes', de: 'ja' } },
        { id: 'e-r3-r5', from: 'r3', to: 'r5', label: { en: 'several doc types', de: 'mehrere Dokumenttypen' }, dashed: true, via: [[455, 520]] },
        { id: 'e-r4-r5', from: 'r4', to: 'r5', label: { en: 'several doc types', de: 'mehrere Dokumenttypen' }, dashed: true, via: [[867.5, 520]] },
      ],
      steps: [
        {
          title: { en: 'Do you need fields at all?', de: 'Brauchst du überhaupt Felder?' },
          text: {
            en: 'If you only need the text or the structure — for search, translation or RAG — use a read or layout model: no training, no schema. Document Intelligence offers `prebuilt-read` and `prebuilt-layout`; for new workloads Microsoft\'s guide *Choose the right Foundry Tool for document processing* recommends the Content Understanding analyzers of the same names (lower cost, richer layout).',
            de: 'Brauchst du nur den Text oder die Struktur – für Suche, Übersetzung oder RAG –, nimm ein Read- oder Layout-Modell: kein Training, kein Schema. Document Intelligence bietet `prebuilt-read` und `prebuilt-layout`; für neue Workloads empfiehlt Microsofts Leitfaden *Choose the right Foundry Tool for document processing* die gleichnamigen Content-Understanding-Analyzer (günstiger, reichhaltigeres Layout).',
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
          title: { en: 'No prebuilt? Check for labeled samples', de: 'Kein Prebuilt? Gelabelte Beispiele prüfen' },
          text: {
            en: 'Custom Document Intelligence models learn from labeled samples — at least five per document type. Without them, or when values must be inferred, Microsoft\'s guide *Choose the right Foundry Tool for document processing* recommends a Content Understanding custom analyzer: you describe the fields in plain language, no labeling or training.',
            de: 'Custom-Modelle von Document Intelligence lernen aus gelabelten Beispielen – mindestens fünf je Dokumenttyp. Fehlen sie oder müssen Werte erschlossen werden, empfiehlt Microsofts Leitfaden *Choose the right Foundry Tool for document processing* einen eigenen Content-Understanding-Analyzer: Du beschreibst die Felder in Alltagssprache, ohne Labeling und Training.',
          },
          focus: ['e-d2-d4', 'd4', 'e-d4-r6', 'r6'],
        },
        {
          title: { en: 'One fixed layout → template or neural', de: 'Ein festes Layout → Template oder Neural' },
          text: {
            en: 'If the blank forms look identical, a template model works: it trains in about 1–5 minutes and supports the widest language range, but each layout variation needs its own model. Where neural supports your language, the docs recommend trying neural first because it is usually more accurate.',
            de: 'Sehen die leeren Formulare identisch aus, funktioniert ein Template-Modell: Es trainiert in etwa 1–5 Minuten und unterstützt die meisten Sprachen, braucht aber je Layoutvariante ein eigenes Modell. Unterstützt Neural deine Sprache, empfiehlt die Doku, zuerst Neural zu testen, weil es meist genauer ist.',
          },
          focus: ['e-d4-d3', 'd3', 'e-d3-r3', 'r3'],
        },
        {
          title: { en: 'Varying layouts → custom neural', de: 'Wechselnde Layouts → Custom Neural' },
          text: {
            en: 'Neural models handle structured, semi-structured and unstructured documents with one model across variations and support overlapping fields (the same words labeled for two fields). Training takes longer (30 minutes by default). Both custom types start with five labeled samples.',
            de: 'Neural-Modelle verarbeiten strukturierte, teilstrukturierte und unstrukturierte Dokumente mit einem Modell über alle Varianten und unterstützen überlappende Felder (dieselben Wörter für zwei Felder gelabelt). Das Training dauert länger (standardmäßig 30 Minuten). Beide Custom-Typen starten mit fünf gelabelten Beispielen.',
          },
          focus: ['e-d3-r4', 'r4'],
        },
        {
          title: { en: 'Several document types → classifier + composed model', de: 'Mehrere Dokumenttypen → Classifier + Composed Model' },
          text: {
            en: 'A composed model groups your extraction models — template or neural, one per document type or template variation — behind one model ID. A custom classifier (at least two classes, five samples each) identifies document types and, with `splitMode` set to `auto`, splits a bundled file; in v4.0 the composed model uses that explicit classifier to route each document to the right extraction model.',
            de: 'Ein Composed Model bündelt deine Extraktionsmodelle – Template oder Neural, eines je Dokumenttyp oder Template-Variante – hinter einer Modell-ID. Ein Custom Classifier (mindestens zwei Klassen mit je fünf Beispielen) erkennt Dokumenttypen und teilt mit `splitMode` = `auto` eine gebündelte Datei auf; in v4.0 nutzt das Composed Model diesen expliziten Classifier, um jedes Dokument an das passende Extraktionsmodell zu leiten.',
          },
          focus: ['e-r3-r5', 'e-r4-r5', 'r5'],
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
        en: 'Use a Foundry resource (one endpoint for several Foundry Tools) or a single-service Document Intelligence resource. Inputs: PDF and images (JPEG, PNG, BMP, TIFF, HEIF), plus Office files for Read and Layout; up to 500 MB on the paid S0 tier (4 MB on the free F0 tier), 50 × 50 to 10,000 × 10,000 pixels, up to 2,000 pages and no password-protected PDFs.',
        de: 'Nutze eine Foundry-Ressource (ein Endpoint für mehrere Foundry Tools) oder eine Einzeldienst-Ressource für Document Intelligence. Eingaben: PDF und Bilder (JPEG, PNG, BMP, TIFF, HEIF), für Read und Layout auch Office-Dateien; bis 500 MB im kostenpflichtigen Tarif S0 (4 MB im kostenlosen Tarif F0), 50 × 50 bis 10.000 × 10.000 Pixel, bis 2.000 Seiten und keine passwortgeschützten PDFs.',
      },
    },
    {
      term: 'Prebuilt models',
      text: {
        en: 'Microsoft-trained models with fixed schemas for invoices, receipts, ID documents, health insurance cards, bank statements, checks, pay stubs, credit cards, contracts, marriage certificates, US tax and US mortgage forms. Values are returned typed next to the printed text: `InvoiceDate` has `content` (as printed) and `value_date` (a date) in the Python SDK.',
        de: 'Von Microsoft trainierte Modelle mit festen Schemas für Rechnungen, Belege, Ausweise, Krankenversicherungskarten, Kontoauszüge, Schecks, Gehaltsabrechnungen, Kreditkarten, Verträge, Heiratsurkunden, US-Steuer- und US-Hypothekenformulare. Werte kommen typisiert neben dem gedruckten Text zurück: `InvoiceDate` hat im Python SDK `content` (wie gedruckt) und `value_date` (ein Datum).',
      },
    },
    {
      term: 'Custom template vs custom neural',
      text: {
        en: 'Both learn your fields from labeled samples (`buildMode`). Template: one consistent visual layout, fast training, one model per variation. Neural: structured to unstructured documents, one model for many variations, overlapping fields — recommended when your language is supported. No labeled samples for your own fields? Use a Content Understanding custom analyzer instead.',
        de: 'Beide lernen deine Felder aus gelabelten Beispielen (`buildMode`). Template: ein konsistentes visuelles Layout, schnelles Training, ein Modell je Variante. Neural: strukturierte bis unstrukturierte Dokumente, ein Modell für viele Varianten, überlappende Felder – empfohlen, wenn deine Sprache unterstützt wird. Keine gelabelten Beispiele für deine eigenen Felder? Dann nimm stattdessen einen eigenen Content-Understanding-Analyzer.',
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
        en: 'Web tool to test Read, Layout and prebuilt models, label samples and train custom models and classifiers without writing JSON label files. Custom projects need an Azure Blob Storage container with CORS (cross-origin resource sharing: a storage setting that lets the Studio website read the container) configured.',
        de: 'Webtool, um Read, Layout und Prebuilt-Modelle zu testen, Beispiele zu labeln und Custom-Modelle sowie Classifier zu trainieren, ohne JSON-Labeldateien zu schreiben. Custom-Projekte brauchen einen Azure-Blob-Storage-Container mit konfiguriertem CORS (Cross-Origin Resource Sharing: eine Storage-Einstellung, mit der die Studio-Website den Container lesen darf).',
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
        { en: 'Your own fields, and you can label samples (e.g. highly structured claim forms)', de: 'Eigene Felder, und du kannst Beispiele labeln (z. B. stark strukturierte Schadenformulare)' },
        { en: 'Document Intelligence custom model (template or neural)', de: 'Document-Intelligence-Custom-Modell (Template oder Neural)' },
        { en: 'Trains from as few as five labeled samples', de: 'Training ab fünf gelabelten Beispielen' },
      ],
      [
        { en: 'Your own fields without labeled samples, or values that must be inferred', de: 'Eigene Felder ohne gelabelte Beispiele oder Werte, die erschlossen werden müssen' },
        { en: 'Content Understanding custom analyzer (or prebuilt-contract)', de: 'Content-Understanding-Analyzer (oder prebuilt-contract)' },
        { en: 'Fields described in plain language — no labeling or training', de: 'Felder in Alltagssprache beschrieben – ohne Labeling und Training' },
      ],
      [
        { en: 'OCR or layout only, new workload', de: 'Nur OCR oder Layout, neuer Workload' },
        { en: 'Content Understanding prebuilt-read or prebuilt-layout', de: 'Content Understanding prebuilt-read oder prebuilt-layout' },
        { en: 'Lower cost and richer layout per the guide “Choose the right Foundry Tool for document processing”; existing Document Intelligence workloads need no migration', de: 'Laut Leitfaden „Choose the right Foundry Tool for document processing“ günstiger und mit reichhaltigerem Layout; bestehende Document-Intelligence-Workloads brauchen keine Migration' },
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
from azure.ai.documentintelligence.models import AnalyzeDocumentRequest, DocumentAnalysisFeature

client = DocumentIntelligenceClient(
    endpoint="https://<resource>.cognitiveservices.azure.com/",
    credential=DefaultAzureCredential(),
)

poller = client.begin_analyze_document(
    "prebuilt-invoice",
    AnalyzeDocumentRequest(url_source="https://<storage>/invoices/inv-1001.pdf"),
    features=[DocumentAnalysisFeature.QUERY_FIELDS],   # add-on, enabled per request
    query_fields=["ProjectCode"],                      # extra field without training
)
result = poller.result()

for invoice in result.documents or []:
    fields = invoice.fields or {}
    date = fields.get("InvoiceDate")
    if date:
        print(date.content, "->", date.value_date, date.confidence)  # printed text vs typed date
    total = fields.get("InvoiceTotal")
    if total and total.value_currency:
        print(total.value_currency.amount, total.value_currency.currency_code)
    project = fields.get("ProjectCode")
    if project:
        print("ProjectCode:", project.value_string)`,
      notes: [
        { en: 'The first argument is the model ID — a prebuilt such as `prebuilt-invoice` or the ID of your custom or composed model.', de: 'Das erste Argument ist die Modell-ID – ein Prebuilt wie `prebuilt-invoice` oder die ID deines Custom- oder Composed-Modells.' },
        { en: '`AnalyzeDocumentRequest` takes either `url_source` or `bytes_source`; the call returns a poller.', de: '`AnalyzeDocumentRequest` nimmt entweder `url_source` oder `bytes_source`; der Aufruf liefert einen Poller.' },
        { en: '`features` switches on add-ons such as `QUERY_FIELDS`, `KEY_VALUE_PAIRS` or `OCR_HIGH_RESOLUTION`; query fields (up to 20) come back in `documents[].fields` like the prebuilt ones.', de: '`features` schaltet Add-ons wie `QUERY_FIELDS`, `KEY_VALUE_PAIRS` oder `OCR_HIGH_RESOLUTION` ein; Query Fields (bis zu 20) kommen wie die Prebuilt-Felder in `documents[].fields` zurück.' },
        { en: 'Install the v4.0 SDK with `pip install azure-ai-documentintelligence`.', de: 'Das v4.0-SDK installierst du mit `pip install azure-ai-documentintelligence`.' },
      ],
    },
    {
      title: { en: 'Layout as Markdown, split at headings for RAG', de: 'Layout als Markdown, an Überschriften zerlegt für RAG' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.documentintelligence import DocumentIntelligenceClient
from azure.ai.documentintelligence.models import AnalyzeDocumentRequest, DocumentContentFormat

client = DocumentIntelligenceClient(
    endpoint="https://<resource>.cognitiveservices.azure.com/",
    credential=DefaultAzureCredential(),
)
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
      en: '`prebuilt-read`, `prebuilt-layout` and `prebuilt-document` exist in both services: Content Understanding analyzers under `/contentunderstanding/analyzers/…`, Document Intelligence models under `/documentintelligence/documentModels/…`. `prebuilt-document` differs most: in Content Understanding it is the base analyzer for custom document analyzers; in Document Intelligence it was the general document model, now deprecated — use `prebuilt-layout` with `keyValuePairs`.',
      de: '`prebuilt-read`, `prebuilt-layout` und `prebuilt-document` gibt es in beiden Diensten: Content-Understanding-Analyzer unter `/contentunderstanding/analyzers/…`, Document-Intelligence-Modelle unter `/documentintelligence/documentModels/…`. Am stärksten unterscheidet sich `prebuilt-document`: In Content Understanding ist es der Basis-Analyzer für eigene Dokument-Analyzer; in Document Intelligence war es das General-Document-Modell, inzwischen veraltet (deprecated) – nutze `prebuilt-layout` mit `keyValuePairs`.',
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
