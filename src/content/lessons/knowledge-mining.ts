import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'knowledge-mining',
  summary: {
    en: 'Azure AI Search powers enterprise search, retrieval-augmented generation (RAG) and **knowledge mining**: turning piles of PDFs, Office files, scans and database rows into searchable, structured knowledge. An **indexer** pulls content from a data source, *cracks* each file into text and images, and runs a **skillset** of AI skills (OCR, layout extraction, entity recognition, chunking, embeddings or your own code) before it writes the results into a **search index**. The same enrichments can be projected into a **knowledge store** in Azure Storage for analytics. At query time, keyword (BM25), vector and hybrid search find candidates and the **semantic ranker** reorders them, which turns the index into a grounding source for RAG apps and Foundry agents.',
    de: 'Azure AI Search treibt Unternehmenssuche, Retrieval-Augmented Generation (RAG) und **Knowledge Mining** an: Berge von PDFs, Office-Dateien, Scans und Datenbankzeilen werden zu durchsuchbarem, strukturiertem Wissen. Ein **Indexer** holt Inhalte aus einer Datenquelle, zerlegt jede Datei per *Document Cracking* in Text und Bilder und führt ein **Skillset** aus KI-Skills aus (OCR, Layoutextraktion, Entitätserkennung, Chunking, Embeddings oder eigener Code), bevor er die Ergebnisse in einen **Suchindex** schreibt. Dieselben Anreicherungen lassen sich zusätzlich in einen **Knowledge Store** in Azure Storage projizieren – für Analysen. Zur Abfragezeit finden Stichwort- (BM25), Vektor- und Hybridsuche Kandidaten, und der **Semantic Ranker** ordnet sie neu. So wird der Index zur Grounding-Quelle für RAG-Apps und Foundry-Agents.',
  },
  examFocus: {
    en: 'Expect scenarios that make you pick the right pipeline part (data source, indexer, skillset, index, knowledge store), the right mapping (field mappings, output field mappings, index projections) and the right skill (OCR, Azure Content Understanding, Text Split, Azure OpenAI Embedding, GenAI Prompt, language skills, Custom Web API). On the query side, know field attributes, OData filters and facets, vector field settings (`dimensions`, HNSW vs exhaustive KNN, vectorizers, `vectorFilterMode`), hybrid search with RRF and the semantic ranker, plus how to monitor indexers, service metrics and relevance.',
    de: 'Rechne mit Szenarien, in denen du den passenden Pipeline-Baustein (Datenquelle, Indexer, Skillset, Index, Knowledge Store), das passende Mapping (Field Mappings, Output Field Mappings, Index Projections) und den passenden Skill (OCR, Azure Content Understanding, Text Split, Azure OpenAI Embedding, GenAI Prompt, Sprach-Skills, Custom Web API) wählen musst. Auf der Abfrageseite solltest du Feldattribute, OData-Filter und Facetten, Vektorfeld-Einstellungen (`dimensions`, HNSW vs. exhaustive KNN, Vectorizer, `vectorFilterMode`), Hybridsuche mit RRF und den Semantic Ranker kennen – und wissen, wie du Indexer, Dienstmetriken und Relevanz überwachst.',
  },
  diagrams: [
    {
      id: 'enrichment-pipeline',
      title: { en: 'From raw files to an index and a knowledge store', de: 'Von Rohdateien zu Index und Knowledge Store' },
      caption: {
        en: 'The indexer drives everything: it pulls and cracks content, runs the skillset and writes the results into the index. Projections defined in the skillset fill the knowledge store.',
        de: 'Der Indexer steuert alles: Er holt Inhalte ab, zerlegt sie, führt das Skillset aus und schreibt die Ergebnisse in den Index. Projektionen im Skillset befüllen den Knowledge Store.',
      },
      width: 960,
      height: 460,
      groups: [
        { id: 'g-search', x: 170, y: 20, w: 780, h: 352, label: 'Azure AI Search', tone: 'neutral' },
        { id: 'g-skills', x: 190, y: 150, w: 500, h: 202, label: 'Skillset', tone: 'tool' },
      ],
      nodes: [
        { id: 'src', x: 20, y: 50, w: 130, h: 64, label: { en: 'Source files', de: 'Quelldateien' }, sub: 'Azure Blob Storage', tone: 'data', shape: 'doc' },
        { id: 'idxr', x: 210, y: 50, w: 140, h: 64, label: 'Indexer', sub: { en: 'cracking + mappings', de: 'Cracking + Mappings' }, tone: 'neutral' },
        { id: 'ocr', x: 210, y: 180, w: 140, h: 56, label: 'OCR', sub: { en: 'text from images', de: 'Text aus Bildern' }, tone: 'tool' },
        { id: 'split', x: 390, y: 180, w: 120, h: 56, label: 'Text Split', sub: 'chunking', tone: 'tool' },
        { id: 'embed', x: 550, y: 180, w: 120, h: 56, label: 'Embedding', sub: 'Azure OpenAI', tone: 'tool' },
        { id: 'custom', x: 210, y: 276, w: 140, h: 56, label: 'Custom Web API', sub: { en: 'custom skill', de: 'eigener Skill' }, tone: 'tool' },
        { id: 'shaper', x: 390, y: 276, w: 120, h: 56, label: 'Shaper', sub: { en: 'shapes tables', de: 'formt Tabellen' }, tone: 'tool' },
        { id: 'fn', x: 20, y: 276, w: 130, h: 56, label: 'Azure Function', sub: { en: 'your code', de: 'dein Code' }, tone: 'app' },
        { id: 'index', x: 800, y: 172, w: 130, h: 72, label: { en: 'Search index', de: 'Suchindex' }, sub: { en: 'text + vectors', de: 'Text + Vektoren' }, tone: 'data', shape: 'store' },
        { id: 'kstore', x: 800, y: 392, w: 130, h: 56, label: { en: 'Knowledge store', de: 'Knowledge Store' }, sub: 'Azure Storage', tone: 'data', shape: 'store' },
      ],
      edges: [
        { id: 'e-src', from: 'src', to: 'idxr', label: { en: 'pull', de: 'Pull' } },
        { id: 'e-fm', from: 'idxr', to: 'index', label: { en: 'field mappings', de: 'Feld-Mappings' }, via: [[865, 82]] },
        { id: 'e-ocr', from: 'idxr', to: 'ocr' },
        { id: 'e-split', from: 'ocr', to: 'split' },
        { id: 'e-embed', from: 'split', to: 'embed' },
        { id: 'e-out', from: 'embed', to: 'index', label: { en: 'output mappings', de: 'Output-Mappings' } },
        { id: 'e-custom', from: 'ocr', to: 'custom' },
        { id: 'e-fn', from: 'custom', to: 'fn', label: 'HTTPS', dashed: true, bidir: true },
        { id: 'e-shape', from: 'custom', to: 'shaper' },
        { id: 'e-proj', from: 'shaper', to: 'kstore', label: { en: 'projections', de: 'Projektionen' } },
      ],
      steps: [
        {
          title: { en: 'Connect and pull', de: 'Verbinden und abholen' },
          text: {
            en: 'A data source object stores the connection to Azure Blob Storage, Azure SQL, Azure Cosmos DB, OneLake and other supported stores. The indexer pulls content on demand or on a schedule (every 5 minutes up to every 24 hours) and uses change detection to pick up only new and changed items.',
            de: 'Ein Datenquellenobjekt speichert die Verbindung zu Azure Blob Storage, Azure SQL, Azure Cosmos DB, OneLake und anderen unterstützten Speichern. Der Indexer holt Inhalte bei Bedarf oder nach Zeitplan ab (alle 5 Minuten bis alle 24 Stunden) und nutzt die Änderungserkennung, um nur neue und geänderte Elemente zu verarbeiten.',
          },
          focus: ['src', 'e-src', 'idxr'],
        },
        {
          title: { en: 'Crack and map', de: 'Zerlegen und zuordnen' },
          text: {
            en: 'Document cracking opens each file and extracts text, metadata and, if `imageAction` is set, normalized images. Field mappings copy source fields such as `metadata_storage_name` into index fields as-is, before any skill runs.',
            de: 'Beim Document Cracking öffnet der Indexer jede Datei und extrahiert Text, Metadaten und – wenn `imageAction` gesetzt ist – normalisierte Bilder. Field Mappings kopieren Quellfelder wie `metadata_storage_name` unverändert in Indexfelder, noch bevor ein Skill läuft.',
          },
          focus: ['idxr', 'e-fm', 'index'],
        },
        {
          title: { en: 'Enrich with built-in skills', de: 'Mit integrierten Skills anreichern' },
          text: {
            en: 'The skillset is a pipeline within the pipeline: each skill reads and writes nodes of the enriched document (`/document/...`). Here OCR reads text in images, Text Split cuts it into chunks and the Azure OpenAI Embedding skill adds a vector per chunk; language skills such as entity recognition work the same way.',
            de: 'Das Skillset ist eine Pipeline in der Pipeline: Jeder Skill liest und schreibt Knoten des angereicherten Dokuments (`/document/...`). Hier liest OCR Text in Bildern, Text Split zerlegt ihn in Chunks und der Azure-OpenAI-Embedding-Skill ergänzt pro Chunk einen Vektor; Sprach-Skills wie die Entitätserkennung funktionieren genauso.',
          },
          focus: ['g-skills', 'ocr', 'e-split', 'split', 'e-embed', 'embed'],
        },
        {
          title: { en: 'Plug in your own code', de: 'Eigenen Code einbinden' },
          text: {
            en: 'A Custom Web API skill posts batches of records (`values` with `recordId` and `data`) to your HTTPS endpoint, for example an Azure Function, and merges the response back into the enriched document. The default timeout is 30 seconds; the maximum is 230 seconds.',
            de: 'Ein Custom-Web-API-Skill schickt Datensätze stapelweise (`values` mit `recordId` und `data`) an deinen HTTPS-Endpoint, zum Beispiel eine Azure Function, und übernimmt die Antwort ins angereicherte Dokument. Das Standard-Timeout beträgt 30 Sekunden, das Maximum 230 Sekunden.',
          },
          focus: ['e-custom', 'custom', 'e-fn', 'fn'],
        },
        {
          title: { en: 'Write index and knowledge store', de: 'Index und Knowledge Store schreiben' },
          text: {
            en: 'Output field mappings (or index projections for chunks) move enriched nodes into index fields. Projections defined in the skillset, often fed by a Shaper skill, persist the same enrichments as tables, JSON objects or image files in Azure Storage.',
            de: 'Output Field Mappings (oder Index Projections für Chunks) übertragen angereicherte Knoten in Indexfelder. Projektionen im Skillset – oft von einem Shaper-Skill vorbereitet – speichern dieselben Anreicherungen als Tabellen, JSON-Objekte oder Bilddateien in Azure Storage.',
          },
          focus: ['e-out', 'index', 'shaper', 'e-shape', 'e-proj', 'kstore'],
        },
      ],
    },
    {
      id: 'hybrid-query',
      title: { en: 'How a hybrid query with semantic ranking finds grounding data', de: 'Wie eine hybride Abfrage mit semantischem Ranking Grounding-Daten findet' },
      caption: {
        en: 'Keyword and vector legs run in parallel, RRF fuses their rankings, and the semantic ranker reorders the top 50 before the results ground an LLM.',
        de: 'Stichwort- und Vektorpfad laufen parallel, RRF fusioniert ihre Rankings, und der Semantic Ranker ordnet die Top 50 neu, bevor die Ergebnisse ein LLM fundieren.',
      },
      width: 960,
      height: 440,
      groups: [{ id: 'g-q', x: 180, y: 20, w: 550, h: 300, label: 'Azure AI Search', tone: 'neutral' }],
      nodes: [
        { id: 'q', x: 20, y: 148, w: 130, h: 64, label: { en: 'User question', de: 'Nutzerfrage' }, sub: { en: 'plain text', de: 'Klartext' }, tone: 'user', shape: 'pill' },
        { id: 'kw', x: 200, y: 60, w: 160, h: 64, label: { en: 'Keyword search', de: 'Stichwortsuche' }, sub: { en: 'BM25 · inverted index', de: 'BM25 · Textindex' }, tone: 'data' },
        { id: 'vec', x: 200, y: 236, w: 160, h: 64, label: { en: 'Vector search', de: 'Vektorsuche' }, sub: { en: 'HNSW · k nearest', de: 'HNSW · k nächste' }, tone: 'data' },
        { id: 'rrf', x: 400, y: 148, w: 130, h: 64, label: { en: 'RRF fusion', de: 'RRF-Fusion' }, sub: { en: 'merges rankings', de: 'vereint Rankings' }, tone: 'neutral' },
        { id: 'sem', x: 570, y: 148, w: 140, h: 64, label: 'Semantic ranker', sub: { en: 'reranks top 50', de: 'rankt Top 50 neu' }, tone: 'model' },
        { id: 'out', x: 810, y: 148, w: 130, h: 64, label: { en: 'RAG app / agent', de: 'RAG-App / Agent' }, sub: { en: 'grounds the LLM', de: 'Grounding fürs LLM' }, tone: 'app' },
        { id: 'emb', x: 200, y: 360, w: 160, h: 56, label: { en: 'Embedding model', de: 'Embedding-Modell' }, sub: { en: 'Foundry deployment', de: 'Foundry-Deployment' }, tone: 'model' },
      ],
      edges: [
        { id: 'e-q-kw', from: 'q', to: 'kw' },
        { id: 'e-q-vec', from: 'q', to: 'vec' },
        { id: 'e-vec-emb', from: 'vec', to: 'emb', label: 'vectorizer', dashed: true, bidir: true },
        { id: 'e-kw-rrf', from: 'kw', to: 'rrf' },
        { id: 'e-vec-rrf', from: 'vec', to: 'rrf' },
        { id: 'e-rrf-sem', from: 'rrf', to: 'sem' },
        { id: 'e-sem-out', from: 'sem', to: 'out', label: { en: 'top results', de: 'Top-Treffer' } },
      ],
      steps: [
        {
          title: { en: 'One request, two legs', de: 'Eine Anfrage, zwei Wege' },
          text: {
            en: 'A hybrid query sends the same question as `search_text` and as a vector query in one request. Keyword search scores matches with BM25 over the inverted index; vector search finds the nearest neighbors in the HNSW graph (or exhaustively with KNN).',
            de: 'Eine hybride Abfrage schickt dieselbe Frage in einer Anfrage als `search_text` und als Vektorabfrage. Die Stichwortsuche bewertet Treffer mit BM25 über den invertierten Index; die Vektorsuche findet die nächsten Nachbarn im HNSW-Graphen (oder vollständig per exhaustive KNN).',
          },
          focus: ['q', 'e-q-kw', 'kw', 'e-q-vec', 'vec'],
        },
        {
          title: { en: 'Vectorize the question', de: 'Frage vektorisieren' },
          text: {
            en: 'With `VectorizableTextQuery`, the vectorizer assigned to the vector field calls the same embedding model that vectorized the content during indexing. Different models or dimensions make query and document vectors incomparable.',
            de: 'Mit `VectorizableTextQuery` ruft der Vectorizer des Vektorfelds dasselbe Embedding-Modell auf, das beim Indexieren die Inhalte vektorisiert hat. Andere Modelle oder Dimensionen machen Abfrage- und Dokumentvektoren unvergleichbar.',
          },
          focus: ['vec', 'e-vec-emb', 'emb'],
        },
        {
          title: { en: 'Fuse with RRF', de: 'Mit RRF fusionieren' },
          text: {
            en: 'Reciprocal Rank Fusion merges the parallel result lists: a document earns 1/(rank + k) in each list, with a small constant k such as 60, so documents ranked high in both lists rise to the top.',
            de: 'Reciprocal Rank Fusion vereint die parallelen Ergebnislisten: Ein Dokument erhält in jeder Liste 1/(Rang + k), mit einer kleinen Konstante k wie 60 – Dokumente, die in beiden Listen weit oben stehen, steigen nach oben.',
          },
          focus: ['kw', 'vec', 'e-kw-rrf', 'e-vec-rrf', 'rrf'],
        },
        {
          title: { en: 'Rerank by meaning', de: 'Nach Bedeutung neu ranken' },
          text: {
            en: 'The semantic ranker rescores the top 50 fused results with language-understanding models (`@search.rerankerScore`, 0 to 4) and can return verbatim captions and answers. It needs a semantic configuration and a non-empty, plain-text query.',
            de: 'Der Semantic Ranker bewertet die Top 50 der fusionierten Ergebnisse mit Sprachverständnismodellen neu (`@search.rerankerScore`, 0 bis 4) und kann wörtliche Captions und Answers liefern. Er braucht eine semantische Konfiguration und eine nicht leere Klartextabfrage.',
          },
          focus: ['rrf', 'e-rrf-sem', 'sem'],
        },
        {
          title: { en: 'Ground the answer', de: 'Antwort fundieren' },
          text: {
            en: 'The top results, with their chunks and source fields, go to your RAG app or agent as grounding data. For complex, multi-source questions, agentic retrieval runs this pipeline per subquery through a knowledge base, the engine behind Foundry IQ.',
            de: 'Die Top-Treffer gehen mit ihren Chunks und Quellfeldern als Grounding-Daten an deine RAG-App oder deinen Agent. Für komplexe, quellenübergreifende Fragen führt Agentic Retrieval diese Pipeline pro Teilabfrage über eine Knowledge Base aus – die Engine hinter Foundry IQ.',
          },
          focus: ['sem', 'e-sem-out', 'out'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Indexer',
      text: {
        en: 'A crawler that connects to one supported data source, cracks each item into text (and optionally images), applies field mappings, runs an attached skillset and writes into one index. It runs on demand or on a schedule; change detection is automatic for Azure Storage but must be enabled for sources such as Azure SQL or Azure Cosmos DB.',
        de: 'Ein Crawler, der sich mit genau einer unterstützten Datenquelle verbindet, jedes Element in Text (und optional Bilder) zerlegt, Field Mappings anwendet, ein angehängtes Skillset ausführt und in genau einen Index schreibt. Er läuft bei Bedarf oder nach Zeitplan; die Änderungserkennung ist für Azure Storage automatisch, für Quellen wie Azure SQL oder Azure Cosmos DB musst du sie aktivieren.',
      },
    },
    {
      term: 'Skillset and skills',
      text: {
        en: 'A skillset is a reusable set of skills attached to an indexer; each skill reads and writes nodes of the in-memory enriched document (`/document/content`, `/document/normalized_images/*`, `/document/pages/*`), and its `context` sets how often it runs, for example once per image or chunk. Built-in skills cover OCR, image analysis, language detection, entity recognition, key phrases, PII, translation, Text Split, Azure OpenAI Embedding, GenAI Prompt and layout-aware extraction with Azure Content Understanding (Document Layout remains for existing pipelines); skills backed by Foundry Tools need an attached Foundry resource beyond about 20 free documents per indexer per day. Custom Web API skills call your own HTTPS code.',
        de: 'Ein Skillset ist eine wiederverwendbare Sammlung von Skills, die an einen Indexer gehängt wird; jeder Skill liest und schreibt Knoten des angereicherten Dokuments im Speicher (`/document/content`, `/document/normalized_images/*`, `/document/pages/*`), und sein `context` legt fest, wie oft er läuft, etwa einmal pro Bild oder Chunk. Integrierte Skills decken OCR, Bildanalyse, Spracherkennung, Entitätserkennung, Schlüsselbegriffe, PII, Übersetzung, Text Split, Azure OpenAI Embedding, GenAI Prompt und layoutbewusste Extraktion mit Azure Content Understanding ab (Document Layout bleibt für bestehende Pipelines); Skills auf Basis von Foundry Tools brauchen über etwa 20 kostenlose Dokumente pro Indexer und Tag hinaus eine angehängte Foundry-Ressource. Custom-Web-API-Skills rufen deinen eigenen HTTPS-Code auf.',
      },
    },
    {
      term: 'Field mappings vs. output field mappings',
      text: {
        en: 'Field mappings send source fields to index fields as-is, before enrichment: implicitly when name and type match, explicitly to rename a field or apply a mapping function such as `base64Encode`. Output field mappings send nodes of the enriched document to index fields and are required for every skill output you want in the index. For chunked content, index projections create one search document per chunk instead.',
        de: 'Field Mappings übertragen Quellfelder unverändert und vor der Anreicherung in Indexfelder: implizit, wenn Name und Typ passen, explizit, um ein Feld umzubenennen oder eine Mapping-Funktion wie `base64Encode` anzuwenden. Output Field Mappings übertragen Knoten des angereicherten Dokuments in Indexfelder und sind für jede Skill-Ausgabe nötig, die im Index landen soll. Für gechunkte Inhalte erzeugen stattdessen Index Projections ein Suchdokument pro Chunk.',
      },
    },
    {
      term: 'Knowledge store',
      text: {
        en: 'Optional Azure Storage output defined in the `knowledgeStore` section of a skillset: table projections (Table Storage, best for Power BI), object projections (JSON in Blob Storage) and file projections (normalized images). It lives independently of the index, survives its deletion and is not the same thing as an agentic retrieval knowledge base.',
        de: 'Optionale Ausgabe in Azure Storage, definiert im Abschnitt `knowledgeStore` eines Skillsets: Tabellenprojektionen (Table Storage, ideal für Power BI), Objektprojektionen (JSON in Blob Storage) und Dateiprojektionen (normalisierte Bilder). Er existiert unabhängig vom Index, überlebt dessen Löschung und ist nicht dasselbe wie eine Knowledge Base für Agentic Retrieval.',
      },
    },
    {
      term: 'Full-text query',
      text: {
        en: 'The `search` text is parsed with the simple syntax by default; `queryType` set to `full` adds Lucene operators for fielded search (`genre:jazz`), fuzzy (`blue~`), proximity (`"hotel airport"~5`), term boosting (`tax^2`) and regex (`/[mh]otel/`). Matches in `searchable` fields are scored with BM25 and `searchMode` (`any` or `all`) trades recall for precision. OData `filter`, `facets` and `orderby` need `filterable`, `facetable` and `sortable` fields, and filters are exact, case-sensitive matches.',
        de: 'Der `search`-Text wird standardmäßig mit der einfachen Syntax geparst; `queryType` = `full` ergänzt Lucene-Operatoren für feldbezogene Suche (`genre:jazz`), Fuzzy (`blue~`), Nähe (`"hotel airport"~5`), Term-Boosting (`tax^2`) und Regex (`/[mh]otel/`). Treffer in `searchable`-Feldern bewertet BM25, und `searchMode` (`any` oder `all`) tauscht Recall gegen Präzision. OData-`filter`, `facets` und `orderby` brauchen `filterable`-, `facetable`- und `sortable`-Felder; Filter vergleichen exakt und mit Groß- und Kleinschreibung.',
      },
    },
    {
      term: 'Vector field and vectorizer',
      text: {
        en: 'A vector field uses a vector type such as `Collection(Edm.Single)`, is `searchable`, has `dimensions` equal to the embedding output and references a vector profile that picks HNSW (approximate and fast) or exhaustive KNN (exact). A vectorizer in the profile converts query text with the same embedding model at query time.',
        de: 'Ein Vektorfeld nutzt einen Vektortyp wie `Collection(Edm.Single)`, ist `searchable`, hat `dimensions` passend zur Embedding-Ausgabe und verweist auf ein Vektorprofil, das HNSW (approximativ und schnell) oder exhaustive KNN (exakt) wählt. Ein Vectorizer im Profil wandelt Abfragetext zur Abfragezeit mit demselben Embedding-Modell um.',
      },
    },
    {
      term: 'Semantic ranker',
      text: {
        en: 'A premium L2 reranker over the top 50 BM25 or RRF results. A semantic configuration lists one title field plus content and keyword fields (searchable and retrievable string fields, in priority order); results get `@search.rerankerScore` (0 to 4) and optional verbatim captions and answers.',
        de: 'Ein kostenpflichtiger L2-Reranker über die Top 50 der BM25- oder RRF-Ergebnisse. Eine semantische Konfiguration nennt ein Titelfeld sowie Inhalts- und Schlüsselwortfelder (durchsuchbare und abrufbare Stringfelder, nach Priorität); Ergebnisse erhalten `@search.rerankerScore` (0 bis 4) und optional wörtliche Captions und Answers.',
      },
    },
  ],
  comparison: {
    title: { en: 'Which retrieval method when?', de: 'Welche Retrieval-Methode wann?' },
    columns: [
      { en: 'Method', de: 'Methode' },
      { en: 'How results are ranked', de: 'Wie gerankt wird' },
      { en: 'Choose it when …', de: 'Wähle sie, wenn …' },
    ],
    rows: [
      [
        { en: 'Keyword (full text)', de: 'Stichwort (Volltext)' },
        { en: 'BM25 over tokenized terms', de: 'BM25 über tokenisierte Begriffe' },
        { en: 'Exact terms matter: product codes, names, dates, jargon', de: 'Exakte Begriffe zählen: Produktcodes, Namen, Datumsangaben, Fachjargon' },
      ],
      [
        { en: 'Vector', de: 'Vektor' },
        { en: 'Similarity via HNSW or exhaustive KNN', de: 'Ähnlichkeit per HNSW oder exhaustive KNN' },
        { en: 'Meaning matters more than wording; multilingual or image content', de: 'Bedeutung zählt mehr als Wortlaut; mehrsprachige oder Bildinhalte' },
      ],
      [
        { en: 'Hybrid', de: 'Hybrid' },
        { en: 'Both legs in parallel, fused with RRF', de: 'Beide Wege parallel, per RRF fusioniert' },
        { en: 'Default for RAG grounding: precision plus recall', de: 'Standard für RAG-Grounding: Präzision plus Recall' },
      ],
      [
        { en: '+ Semantic ranker', de: '+ Semantic Ranker' },
        { en: 'L2 rerank of the top 50 (score 0 to 4)', de: 'L2-Reranking der Top 50 (Score 0 bis 4)' },
        { en: 'Prose-rich content; you want better top results and captions', de: 'Textreiche Inhalte; du willst bessere Top-Treffer und Captions' },
      ],
      [
        { en: 'Agentic retrieval', de: 'Agentic Retrieval' },
        { en: 'Query planning, parallel subqueries, semantic reranking', de: 'Abfrageplanung, parallele Teilabfragen, semantisches Reranking' },
        { en: 'Complex, multi-part or multi-source questions from agents; extra latency is acceptable', de: 'Komplexe, mehrteilige oder quellenübergreifende Fragen von Agents; mehr Latenz ist akzeptabel' },
      ],
    ],
  },
  code: [
    {
      title: { en: 'Hybrid query with integrated vectorization and semantic ranking', de: 'Hybride Abfrage mit integrierter Vektorisierung und semantischem Ranking' },
      code: `from azure.identity import DefaultAzureCredential
from azure.search.documents import SearchClient
from azure.search.documents.models import VectorizableTextQuery

search_client = SearchClient(
    endpoint="https://<search-service>.search.windows.net",
    index_name="contracts-index",
    credential=DefaultAzureCredential(),   # role: Search Index Data Reader
)

question = "Which contracts allow early termination?"
results = search_client.search(
    search_text=question,                       # keyword leg (BM25)
    vector_queries=[VectorizableTextQuery(      # vector leg, vectorized by the index
        text=question, k_nearest_neighbors=50, fields="chunk_vector")],
    filter="language eq 'en'",                  # OData filter on a filterable field
    query_type="semantic",                      # L2 rerank of the top 50
    semantic_configuration_name="contracts-semantic",
    query_caption="extractive",
    select=["title", "chunk"],
    top=5,
)
for doc in results:
    print(round(doc["@search.reranker_score"], 2), doc["title"])`,
      notes: [
        {
          en: '`search_text` plus `vector_queries` in one call is a hybrid query; RRF merges both legs before semantic ranking. `k_nearest_neighbors=50` gives the ranker its full input.',
          de: '`search_text` plus `vector_queries` in einem Aufruf ist eine hybride Abfrage; RRF vereint beide Wege vor dem semantischen Ranking. `k_nearest_neighbors=50` liefert dem Ranker seine volle Eingabe.',
        },
        {
          en: '`VectorizableTextQuery` sends text that the vectorizer on `chunk_vector` embeds with the indexing model; use `VectorizedQuery` only when you compute the vector yourself.',
          de: '`VectorizableTextQuery` schickt Text, den der Vectorizer von `chunk_vector` mit dem Indexierungsmodell einbettet; `VectorizedQuery` nutzt du nur, wenn du den Vektor selbst berechnest.',
        },
        {
          en: 'Never add `order_by` to a semantic query: sorting overrides relevance scores and the request fails with HTTP 400.',
          de: 'Füge einer semantischen Abfrage nie `order_by` hinzu: Sortierung überschreibt die Relevanz, und die Anfrage scheitert mit HTTP 400.',
        },
      ],
    },
    {
      title: { en: 'Run an indexer and inspect its execution history', de: 'Indexer starten und Ausführungsverlauf prüfen' },
      code: `from azure.identity import DefaultAzureCredential
from azure.search.documents.indexes import SearchIndexerClient

indexer_client = SearchIndexerClient(
    endpoint="https://<search-service>.search.windows.net",
    credential=DefaultAzureCredential(),
)
indexer_client.run_indexer("contracts-indexer")     # starts an on-demand run

status = indexer_client.get_indexer_status("contracts-indexer")
run = status.last_result                             # newest (or in-progress) run
print(status.status, run.status, run.item_count, run.failed_item_count)
for err in run.errors:
    print("ERROR", err.key, err.error_message)
for warning in run.warnings:
    print("WARNING", warning.key, warning.message)
print(len(status.execution_history), "recent runs")  # up to 50, newest first`,
      notes: [
        {
          en: '`run_indexer()` only starts a run; poll `get_indexer_status()` until `last_result.status` is no longer `inProgress`.',
          de: '`run_indexer()` startet nur einen Lauf; frage `get_indexer_status()` ab, bis `last_result.status` nicht mehr `inProgress` ist.',
        },
        {
          en: 'A run can finish with `success` despite item errors as long as they stay within `maxFailedItems`; warnings never stop indexing.',
          de: 'Ein Lauf kann trotz Fehlern bei einzelnen Elementen mit `success` enden, solange sie `maxFailedItems` nicht überschreiten; Warnungen stoppen die Indexierung nie.',
        },
      ],
    },
  ],
  traps: [
    {
      en: 'Skill outputs never reach the index on their own: without an **output field mapping** (or an index projection for chunks) the enriched node stays in memory. Plain **field mappings** only copy source fields before enrichment.',
      de: 'Skill-Ausgaben landen nie von selbst im Index: Ohne **Output Field Mapping** (oder eine Index Projection für Chunks) bleibt der angereicherte Knoten im Speicher. Normale **Field Mappings** kopieren nur Quellfelder vor der Anreicherung.',
    },
    {
      en: 'The semantic ranker only reorders the **top 50** results of the first ranking pass and never writes new text: captions and answers are verbatim. A `search=*` query gets no semantic ranking, and adding `orderby` to a semantic query returns HTTP 400.',
      de: 'Der Semantic Ranker ordnet nur die **Top 50** des ersten Rankings neu und erzeugt nie neuen Text: Captions und Answers sind wörtliche Zitate. Eine Abfrage mit `search=*` wird nicht semantisch gerankt, und `orderby` in einer semantischen Abfrage führt zu HTTP 400.',
    },
    {
      en: 'The `dimensions` of a vector field must equal the embedding output (including a custom `dimensions` value on the embedding skill), and the query vectorizer must use the same model. Otherwise you get dimension errors or meaningless matches.',
      de: 'Die `dimensions` eines Vektorfelds müssen zur Embedding-Ausgabe passen (inklusive eines eigenen `dimensions`-Werts im Embedding-Skill), und der Vectorizer für Abfragen muss dasselbe Modell nutzen. Sonst gibt es Dimensionsfehler oder sinnlose Treffer.',
    },
    {
      en: 'Change detection for Azure Storage is automatic, **deletion** detection is not: configure native blob soft delete or a custom metadata soft-delete policy before the first indexer run, or deleted files stay in the index as orphans.',
      de: 'Die Änderungserkennung für Azure Storage ist automatisch, die **Löscherkennung** nicht: Konfiguriere natives Blob-Soft-Delete oder eine Soft-Delete-Richtlinie über benutzerdefinierte Metadaten vor dem ersten Indexer-Lauf – sonst bleiben gelöschte Dateien als Waisen im Index.',
    },
    {
      en: 'A **knowledge store** (Azure Storage projections from a skillset) is not a **knowledge base** (agentic retrieval). Knowledge store projections are not deleted when you delete the index, the indexer or the search service.',
      de: 'Ein **Knowledge Store** (Azure-Storage-Projektionen aus einem Skillset) ist keine **Knowledge Base** (Agentic Retrieval). Knowledge-Store-Projektionen werden nicht gelöscht, wenn du Index, Indexer oder Suchdienst löschst.',
    },
  ],
  takeaways: [
    {
      en: 'Pipeline order: data source → indexer (cracking, field mappings) → skillset → output field mappings → index; projections → knowledge store.',
      de: 'Pipeline-Reihenfolge: Datenquelle → Indexer (Cracking, Field Mappings) → Skillset → Output Field Mappings → Index; Projektionen → Knowledge Store.',
    },
    {
      en: 'Chunk, then embed: Text Split or the Content Understanding skill, the Azure OpenAI Embedding skill, index projections and a matching vectorizer add up to integrated vectorization.',
      de: 'Erst chunken, dann einbetten: Text Split oder der Content-Understanding-Skill, der Azure-OpenAI-Embedding-Skill, Index Projections und ein passender Vectorizer ergeben integrierte Vektorisierung.',
    },
    {
      en: 'Best default relevance for RAG: hybrid search plus the semantic ranker with `k` = 50; agentic retrieval for complex, multi-source questions.',
      de: 'Beste Standardrelevanz für RAG: Hybridsuche plus Semantic Ranker mit `k` = 50; Agentic Retrieval für komplexe, quellenübergreifende Fragen.',
    },
    {
      en: 'Watch ingestion with execution history and debug sessions, the service with Azure Monitor metrics and resource logs, and real users with search traffic analytics.',
      de: 'Überwache die Aufnahme mit Ausführungsverlauf und Debug Sessions, den Dienst mit Azure-Monitor-Metriken und Ressourcenprotokollen und echte Nutzer mit Search Traffic Analytics.',
    },
    {
      en: 'New layout-aware skillsets use the Azure Content Understanding skill; the Document Layout skill stays supported for existing pipelines.',
      de: 'Neue layoutbewusste Skillsets nutzen den Azure-Content-Understanding-Skill; der Document-Layout-Skill bleibt für bestehende Pipelines unterstützt.',
    },
  ],
  sources: [
    { title: 'What is Azure AI Search?', url: 'https://learn.microsoft.com/en-us/azure/search/search-what-is-azure-search' },
    { title: 'AI enrichment in Azure AI Search', url: 'https://learn.microsoft.com/en-us/azure/search/cognitive-search-concept-intro' },
    { title: 'Indexers in Azure AI Search', url: 'https://learn.microsoft.com/en-us/azure/search/search-indexer-overview' },
    { title: 'Relevance in Azure AI Search', url: 'https://learn.microsoft.com/en-us/azure/search/search-relevance-overview' },
    { title: 'Monitor indexer status and results in Azure AI Search', url: 'https://learn.microsoft.com/en-us/azure/search/search-monitor-indexers' },
  ],
}
