import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'knowledge-mining',
  summary: {
    en: 'Azure AI Search powers enterprise search, **RAG** (retrieval-augmented generation: retrieve relevant content and ground the answer in it) and **knowledge mining**: turning piles of PDFs, Office files, scans and database rows into searchable, structured knowledge. An **indexer** pulls content from a data source, *cracks* each file into text and images, and runs a **skillset** of AI skills (OCR, layout extraction, entity recognition, chunking, embeddings or your own code) before it writes the results into a **search index**. The same enrichments can be projected into a **knowledge store** in Azure Storage for analytics. At query time, keyword, vector and hybrid search find candidates and the **semantic ranker** reorders them, which turns the index into a grounding source for RAG apps and Foundry agents.',
    de: 'Azure AI Search treibt Unternehmenssuche, **RAG** (Retrieval-Augmented Generation: relevante Inhalte abrufen und die Antwort darauf stützen) und **Knowledge Mining** an: Berge von PDFs, Office-Dateien, Scans und Datenbankzeilen werden zu durchsuchbarem, strukturiertem Wissen. Ein **Indexer** holt Inhalte aus einer Datenquelle, zerlegt jede Datei per *Document Cracking* in Text und Bilder und führt ein **Skillset** aus KI-Skills aus (OCR, Layoutextraktion, Entitätserkennung, Chunking, Embeddings oder eigener Code), bevor er die Ergebnisse in einen **Suchindex** schreibt. Dieselben Anreicherungen lassen sich zusätzlich in einen **Knowledge Store** in Azure Storage projizieren – für Analysen. Zur Abfragezeit finden Stichwort-, Vektor- und Hybridsuche Kandidaten, und der **Semantic Ranker** ordnet sie neu. So wird der Index zur Grounding-Quelle für RAG-Apps und Foundry-Agents.',
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
        en: 'The indexer drives everything: it pulls content through a data source, cracks it, runs the skillset and writes the results into the index. Projections defined in the skillset write chunks into the index and enrichments into the knowledge store.',
        de: 'Der Indexer steuert alles: Er holt Inhalte über eine Datenquelle ab, zerlegt sie, führt das Skillset aus und schreibt die Ergebnisse in den Index. Projektionen im Skillset schreiben Chunks in den Index und Anreicherungen in den Knowledge Store.',
      },
      width: 960,
      height: 546,
      groups: [
        { id: 'g-search', x: 158, y: 20, w: 794, h: 386, label: 'Azure AI Search', tone: 'neutral' },
        { id: 'g-skills', x: 176, y: 180, w: 520, h: 212, label: 'Skillset', tone: 'tool' },
      ],
      nodes: [
        { id: 'src', x: 12, y: 48, w: 130, h: 64, label: { en: 'Source files', de: 'Quelldateien' }, sub: 'Azure Blob Storage', tone: 'data', shape: 'doc' },
        { id: 'ds', x: 192, y: 48, w: 156, h: 64, label: { en: 'Data source', de: 'Datenquelle' }, sub: { en: 'connection + container', de: 'Verbindung + Container' }, tone: 'neutral' },
        { id: 'idxr', x: 378, y: 48, w: 140, h: 64, label: 'Indexer', sub: { en: 'cracking + mappings', de: 'Cracking + Mappings' }, tone: 'neutral' },
        { id: 'ocr', x: 196, y: 210, w: 134, h: 56, label: 'OCR', sub: { en: 'text from images', de: 'Text aus Bildern' }, tone: 'tool' },
        { id: 'merge', x: 390, y: 210, w: 116, h: 56, label: 'Text Merge', sub: { en: 'text + OCR text', de: 'Text + OCR-Text' }, tone: 'tool' },
        { id: 'split', x: 566, y: 210, w: 110, h: 56, label: 'Text Split', sub: 'chunking', tone: 'tool' },
        { id: 'custom', x: 196, y: 316, w: 134, h: 56, label: 'Custom Web API', sub: { en: 'custom skill', de: 'eigener Skill' }, tone: 'tool' },
        { id: 'shaper', x: 390, y: 316, w: 116, h: 56, label: 'Shaper', sub: { en: 'shapes tables', de: 'formt Tabellen' }, tone: 'tool' },
        { id: 'embed', x: 566, y: 316, w: 110, h: 56, label: 'Embedding', sub: 'Azure OpenAI', tone: 'tool' },
        { id: 'index', x: 820, y: 308, w: 126, h: 72, label: { en: 'Search index', de: 'Suchindex' }, sub: { en: 'text + vectors', de: 'Text + Vektoren' }, tone: 'data', shape: 'store' },
        { id: 'fn', x: 196, y: 474, w: 134, h: 56, label: 'Azure Function', sub: { en: 'your code', de: 'dein Code' }, tone: 'app' },
        { id: 'kstore', x: 378, y: 474, w: 140, h: 56, label: { en: 'Knowledge store', de: 'Knowledge Store' }, sub: 'Azure Storage', tone: 'data', shape: 'store' },
        { id: 'emb2', x: 546, y: 474, w: 150, h: 56, label: { en: 'Embedding model', de: 'Embedding-Modell' }, sub: { en: 'Foundry deployment', de: 'Foundry-Deployment' }, tone: 'model' },
      ],
      edges: [
        { id: 'e-src', from: 'src', to: 'ds', label: { en: 'pull', de: 'Pull' } },
        { id: 'e-ds', from: 'ds', to: 'idxr' },
        { id: 'e-fm', from: 'idxr', to: 'index', label: { en: 'field mappings', de: 'Feld-Mappings' }, via: [[883, 80]] },
        { id: 'e-txt', from: 'idxr', to: 'merge', label: { en: 'text', de: 'Text' } },
        { id: 'e-ocr', from: 'idxr', to: 'ocr', label: { en: 'images', de: 'Bilder' } },
        { id: 'e-merge', from: 'ocr', to: 'merge' },
        { id: 'e-split', from: 'merge', to: 'split' },
        { id: 'e-embed', from: 'split', to: 'embed' },
        { id: 'e-out', from: 'embed', to: 'index', label: { en: 'index projections', de: 'Index Projections' } },
        { id: 'e-emb2', from: 'embed', to: 'emb2', label: 'HTTPS', dashed: true, bidir: true },
        { id: 'e-custom', from: 'ocr', to: 'custom' },
        { id: 'e-fn', from: 'custom', to: 'fn', label: 'HTTPS', dashed: true, bidir: true },
        { id: 'e-shape', from: 'custom', to: 'shaper' },
        { id: 'e-proj', from: 'shaper', to: 'kstore', label: { en: 'projections', de: 'Projektionen' } },
      ],
      steps: [
        {
          title: { en: 'Connect and pull', de: 'Verbinden und abholen' },
          text: {
            en: 'A **data source** object in the search service stores the type, connection and container of a supported store such as Azure Blob Storage, Azure SQL, Azure Cosmos DB or OneLake. The indexer pulls content through it on demand or on a schedule (every 5 minutes up to every 24 hours) and uses change detection to pick up only new and changed items.',
            de: 'Ein **Datenquellenobjekt** im Suchdienst speichert Typ, Verbindung und Container eines unterstützten Speichers wie Azure Blob Storage, Azure SQL, Azure Cosmos DB oder OneLake. Der Indexer holt darüber Inhalte bei Bedarf oder nach Zeitplan ab (alle 5 Minuten bis alle 24 Stunden) und nutzt die Änderungserkennung, um nur neue und geänderte Elemente zu verarbeiten.',
          },
          focus: ['src', 'e-src', 'ds', 'e-ds', 'idxr'],
        },
        {
          title: { en: 'Crack and map', de: 'Zerlegen und zuordnen' },
          text: {
            en: 'Document cracking opens each file and extracts text, metadata and, if `imageAction` is set, normalized images; text and images are now separate nodes of the enriched document. Field mappings copy source fields such as `metadata_storage_name` into index fields as-is, before any skill runs.',
            de: 'Beim Document Cracking öffnet der Indexer jede Datei und extrahiert Text, Metadaten und – wenn `imageAction` gesetzt ist – normalisierte Bilder; Text und Bilder sind danach getrennte Knoten des angereicherten Dokuments. Field Mappings kopieren Quellfelder wie `metadata_storage_name` unverändert in Indexfelder, noch bevor ein Skill läuft.',
          },
          focus: ['idxr', 'e-txt', 'e-ocr', 'e-fm', 'index'],
        },
        {
          title: { en: 'Enrich with built-in skills', de: 'Mit integrierten Skills anreichern' },
          text: {
            en: 'The skillset is a pipeline within the pipeline: each skill reads and writes nodes of the enriched document (an in-memory tree per source document, `/document/...`). Here OCR reads text in the images, Text Merge inserts that text into the cracked text, Text Split cuts the merged text into chunks, and the Azure OpenAI Embedding skill sends each chunk to your embedding model deployment and adds its vector. Language skills such as entity recognition work the same way.',
            de: 'Das Skillset ist eine Pipeline in der Pipeline: Jeder Skill liest und schreibt Knoten des angereicherten Dokuments (ein Baum im Speicher pro Quelldokument, `/document/...`). Hier liest OCR Text in den Bildern, Text Merge fügt ihn in den zerlegten Text ein, Text Split zerlegt den zusammengeführten Text in Chunks, und der Azure-OpenAI-Embedding-Skill schickt jeden Chunk an dein Embedding-Modell-Deployment und ergänzt seinen Vektor. Sprach-Skills wie die Entitätserkennung funktionieren genauso.',
          },
          focus: ['g-skills', 'e-ocr', 'ocr', 'e-txt', 'e-merge', 'merge', 'e-split', 'split', 'e-embed', 'embed', 'e-emb2', 'emb2'],
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
            en: 'Two different outputs. Into the index: **index projections** (defined in the skillset) write one search document per chunk, with its vector and the parent key; **output field mappings** (defined in the indexer) carry enrichments of the whole document, such as entities or key phrases, into its one search document. Into Azure Storage: **knowledge store projections** (also defined in the skillset, often fed by a Shaper skill) save tables, JSON objects or image files.',
            de: 'Zwei verschiedene Ausgaben. In den Index: **Index Projections** (im Skillset definiert) schreiben ein Suchdokument pro Chunk mit seinem Vektor und dem Elternschlüssel; **Output Field Mappings** (im Indexer definiert) bringen Anreicherungen des ganzen Dokuments, etwa Entitäten oder Schlüsselbegriffe, in dessen eines Suchdokument. Nach Azure Storage: **Knowledge-Store-Projektionen** (ebenfalls im Skillset, oft von einem Shaper-Skill vorbereitet) speichern Tabellen, JSON-Objekte oder Bilddateien.',
          },
          focus: ['e-out', 'index', 'e-shape', 'shaper', 'e-proj', 'kstore'],
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
      height: 484,
      groups: [{ id: 'g-q', x: 192, y: 60, w: 530, h: 304, label: 'Azure AI Search', tone: 'neutral' }],
      nodes: [
        { id: 'q', x: 12, y: 186, w: 160, h: 72, label: { en: 'Query from your app', de: 'Abfrage deiner App' }, sub: { en: 'search + vectorQueries\nin one request', de: 'search + vectorQueries\nin einer Anfrage' }, tone: 'app' },
        { id: 'kw', x: 212, y: 100, w: 160, h: 64, label: { en: 'Keyword search', de: 'Stichwortsuche' }, sub: { en: 'BM25 · inverted index', de: 'BM25 · Textindex' }, tone: 'data' },
        { id: 'vec', x: 212, y: 280, w: 160, h: 64, label: { en: 'Vector search', de: 'Vektorsuche' }, sub: { en: 'HNSW · k nearest', de: 'HNSW · k nächste' }, tone: 'data' },
        { id: 'rrf', x: 402, y: 190, w: 130, h: 64, label: { en: 'RRF fusion', de: 'RRF-Fusion' }, sub: { en: 'merges rankings', de: 'vereint Rankings' }, tone: 'neutral' },
        { id: 'sem', x: 566, y: 190, w: 140, h: 64, label: 'Semantic ranker', sub: { en: 'reranks top 50', de: 'rankt Top 50 neu' }, tone: 'model' },
        { id: 'out', x: 806, y: 190, w: 140, h: 64, label: { en: 'RAG app / agent', de: 'RAG-App / Agent' }, sub: { en: 'grounds the LLM', de: 'Grounding fürs LLM' }, tone: 'app' },
        { id: 'emb', x: 212, y: 410, w: 160, h: 56, label: { en: 'Embedding model', de: 'Embedding-Modell' }, sub: { en: 'Foundry deployment', de: 'Foundry-Deployment' }, tone: 'model' },
      ],
      edges: [
        { id: 'e-q-kw', from: 'q', to: 'kw' },
        { id: 'e-q-vec', from: 'q', to: 'vec' },
        { id: 'e-vec-emb', from: 'vec', to: 'emb', label: 'vectorizer', dashed: true, bidir: true },
        { id: 'e-kw-rrf', from: 'kw', to: 'rrf' },
        { id: 'e-vec-rrf', from: 'vec', to: 'rrf' },
        { id: 'e-rrf-sem', from: 'rrf', to: 'sem' },
        { id: 'e-q-sem', from: 'q', to: 'sem', label: { en: 'query text', de: 'Abfragetext' }, dashed: true, via: [[92, 30], [636, 30]] },
        { id: 'e-sem-out', from: 'sem', to: 'out', label: { en: 'top results', de: 'Top-Treffer' } },
      ],
      steps: [
        {
          title: { en: 'Vectorize the question', de: 'Frage vektorisieren' },
          text: {
            en: 'Your app sends one request that carries the question twice: as `search_text` for the keyword leg and as a `VectorizableTextQuery` for the vector leg (in REST: `search` and `vectorQueries`). Before the vector leg can search, the vectorizer of the vector field sends the text to the same embedding model that vectorized the content during indexing; another model or dimension count makes the vectors incomparable.',
            de: 'Deine App schickt eine Anfrage, die die Frage zweimal enthält: als `search_text` für den Stichwortpfad und als `VectorizableTextQuery` für den Vektorpfad (in REST: `search` und `vectorQueries`). Bevor der Vektorpfad suchen kann, schickt der Vectorizer des Vektorfelds den Text an dasselbe Embedding-Modell, das beim Indexieren die Inhalte vektorisiert hat; ein anderes Modell oder andere Dimensionen machen die Vektoren unvergleichbar.',
          },
          focus: ['q', 'e-q-vec', 'vec', 'e-vec-emb', 'emb'],
        },
        {
          title: { en: 'Search both legs in parallel', de: 'Beide Wege parallel durchsuchen' },
          text: {
            en: 'Keyword search looks the terms up in the inverted index (a list of documents per term) and scores matches with BM25, a relevance formula based on term frequency. In parallel, vector search finds the nearest neighbors (`k_nearest_neighbors`, in REST `k`) in the HNSW graph, or compares every vector with exhaustive KNN.',
            de: 'Die Stichwortsuche schlägt die Begriffe im invertierten Index nach (eine Dokumentliste pro Begriff) und bewertet Treffer mit BM25, einer Relevanzformel auf Basis der Begriffshäufigkeit. Parallel findet die Vektorsuche die nächsten Nachbarn (`k_nearest_neighbors`, in REST `k`) im HNSW-Graphen oder vergleicht per exhaustive KNN jeden Vektor.',
          },
          focus: ['q', 'e-q-kw', 'kw', 'e-q-vec', 'vec'],
        },
        {
          title: { en: 'Fuse with RRF', de: 'Mit RRF fusionieren' },
          text: {
            en: 'Reciprocal Rank Fusion (RRF) merges the parallel result lists: a document earns 1/(rank + k) in each list, where k is the RRF constant (for example 60, unrelated to `k_nearest_neighbors`), so documents ranked high in both lists rise to the top.',
            de: 'Reciprocal Rank Fusion (RRF) vereint die parallelen Ergebnislisten: Ein Dokument erhält in jeder Liste 1/(Rang + k), wobei k die RRF-Konstante ist (zum Beispiel 60, unabhängig von `k_nearest_neighbors`) – Dokumente, die in beiden Listen weit oben stehen, steigen nach oben.',
          },
          focus: ['kw', 'vec', 'e-kw-rrf', 'e-vec-rrf', 'rrf'],
        },
        {
          title: { en: 'Rerank by meaning', de: 'Nach Bedeutung neu ranken' },
          text: {
            en: 'The semantic ranker takes the top 50 fused results and the query text (dashed arrow) and rescores each result for its relevance to the query with language-understanding models (score 0 to 4: `@search.rerankerScore` in REST, `@search.reranker_score` in Python). It can return verbatim captions and answers and needs a semantic configuration and a non-empty, plain-text query.',
            de: 'Der Semantic Ranker nimmt die Top 50 der fusionierten Ergebnisse und den Abfragetext (gestrichelter Pfeil) und bewertet jedes Ergebnis mit Sprachverständnismodellen neu nach seiner Relevanz für die Abfrage (Score 0 bis 4: `@search.rerankerScore` in REST, `@search.reranker_score` in Python). Er kann wörtliche Captions und Answers liefern und braucht eine semantische Konfiguration und eine nicht leere Klartextabfrage.',
          },
          focus: ['rrf', 'e-rrf-sem', 'sem', 'e-q-sem', 'q'],
        },
        {
          title: { en: 'Ground the answer', de: 'Antwort fundieren' },
          text: {
            en: 'The top results, with their chunks and source fields, go to your RAG app or agent as grounding data. For complex, multi-source questions, **agentic retrieval** lets an LLM split the question into subqueries that run in parallel against a knowledge base; it powers **Foundry IQ**, the managed knowledge layer for agents in the Foundry portal.',
            de: 'Die Top-Treffer gehen mit ihren Chunks und Quellfeldern als Grounding-Daten an deine RAG-App oder deinen Agent. Für komplexe, quellenübergreifende Fragen zerlegt bei **Agentic Retrieval** ein LLM die Frage in Teilabfragen, die parallel gegen eine Knowledge Base laufen; darauf basiert **Foundry IQ**, die verwaltete Wissensschicht für Agents im Foundry-Portal.',
          },
          focus: ['sem', 'e-sem-out', 'out'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Indexer and field mappings',
      text: {
        en: 'An indexer is a crawler that connects one supported data source, an optional skillset and one target index. **Field mappings** (defined in the indexer) copy source fields as-is before enrichment, implicitly when name and type match or explicitly to rename a field or apply a function such as `base64Encode`; **output field mappings** copy enriched nodes into index fields. Without a supported source, or for near-real-time updates, you push JSON documents yourself with `upload_documents()` (push model); skillsets only run with indexers.',
        de: 'Ein Indexer ist ein Crawler, der genau eine unterstützte Datenquelle, ein optionales Skillset und genau einen Zielindex verbindet. **Field Mappings** (im Indexer definiert) kopieren Quellfelder unverändert vor der Anreicherung – implizit bei gleichem Namen und Typ, explizit zum Umbenennen oder mit einer Funktion wie `base64Encode`; **Output Field Mappings** kopieren angereicherte Knoten in Indexfelder. Ohne unterstützte Quelle oder für Aktualisierung nahezu in Echtzeit lädst du JSON-Dokumente selbst mit `upload_documents()` hoch (Push-Modell); Skillsets laufen nur mit Indexern.',
      },
    },
    {
      term: 'Skillset',
      text: {
        en: 'A reusable set of skills attached to an indexer. Each skill reads nodes of the enriched document (such as `/document/content`) and adds new nodes; its `context` sets how often it runs, for example once per image or per chunk. Most skills backed by Foundry Tools are free for about 20 documents per indexer per day; beyond that, and always for the Content Understanding skill, you attach a billable Foundry resource. The table below shows what each skill reads and writes.',
        de: 'Eine wiederverwendbare Sammlung von Skills, die an einen Indexer gehängt wird. Jeder Skill liest Knoten des angereicherten Dokuments (etwa `/document/content`) und ergänzt neue Knoten; sein `context` legt fest, wie oft er läuft, etwa einmal pro Bild oder pro Chunk. Die meisten Skills auf Basis von Foundry Tools sind für etwa 20 Dokumente pro Indexer und Tag kostenlos; darüber hinaus – und beim Content-Understanding-Skill immer – hängst du eine kostenpflichtige Foundry-Ressource an. Die Tabelle unten zeigt, was jeder Skill liest und schreibt.',
      },
    },
    {
      term: 'Index projections vs. knowledge store projections',
      text: {
        en: 'Both are defined in the skillset. **Index projections** (`indexProjections`) write each chunk as its own search document, with a parent key field, into an index. **Knowledge store projections** (`knowledgeStore`) write enrichments to Azure Storage as tables (best for Power BI), JSON objects or image files; they remain when the index is deleted and are not an agentic retrieval knowledge base.',
        de: 'Beide werden im Skillset definiert. **Index Projections** (`indexProjections`) schreiben jeden Chunk als eigenes Suchdokument mit einem Feld für den Elternschlüssel in einen Index. **Knowledge-Store-Projektionen** (`knowledgeStore`) schreiben Anreicherungen nach Azure Storage – als Tabellen (ideal für Power BI), JSON-Objekte oder Bilddateien; sie bleiben erhalten, wenn der Index gelöscht wird, und sind keine Knowledge Base für Agentic Retrieval.',
      },
    },
    {
      term: 'Keyword (full-text) search',
      text: {
        en: 'An **analyzer** splits searchable text into terms for the inverted index; **BM25** ranks a match higher when the term is frequent in the document but rare in the index. The simple syntax is the default; `queryType` `full` enables **Lucene** operators (Apache Lucene query parser): `genre:jazz`, fuzzy `blue~`, proximity `"hotel airport"~5`, boosting `tax^2`, regex `/[mh]otel/`. `searchMode` `all` favors precision, `any` (default) favors recall. `filter` and `orderby` take **OData** expressions (a standard query syntax) on `filterable` and `sortable` fields, `facets` need `facetable` fields, and filters match exactly and case-sensitively. Best when exact terms matter: product codes, names, dates, jargon.',
        de: 'Ein **Analyzer** zerlegt durchsuchbaren Text in Begriffe für den invertierten Index; **BM25** bewertet einen Treffer höher, wenn der Begriff im Dokument häufig, im Index aber selten ist. Standard ist die einfache Syntax; `queryType` = `full` aktiviert **Lucene**-Operatoren (Apache-Lucene-Abfrageparser): `genre:jazz`, Fuzzy `blue~`, Nähe `"hotel airport"~5`, Boosting `tax^2`, Regex `/[mh]otel/`. `searchMode` = `all` bevorzugt Präzision, `any` (Standard) Recall. `filter` und `orderby` nehmen **OData**-Ausdrücke (eine Standard-Abfragesyntax) auf `filterable`- und `sortable`-Feldern, `facets` braucht `facetable`-Felder, und Filter vergleichen exakt und mit Groß- und Kleinschreibung. Ideal, wenn exakte Begriffe zählen: Produktcodes, Namen, Datumsangaben, Fachjargon.',
      },
    },
    {
      term: 'Vector search settings',
      text: {
        en: 'A vector field stores embeddings as a vector type such as `Collection(Edm.Single)` (an array of 32-bit floats), is `searchable`, has `dimensions` equal to the embedding output and points to a vector profile: an algorithm (HNSW = fast approximate search, exhaustive KNN = exact brute force) plus an optional **vectorizer** that embeds query text with the same model. **Integrated vectorization** means skills chunk and embed during indexing and a vectorizer embeds queries. `vectorFilterMode` sets when a filter on nonvector fields applies: `preFilter` (default for indexes created since October 2023; during the vector search, best recall), `postFilter` (after each shard picks its top results, so it can return fewer than requested) or `strictPostFilter` (preview). Best when meaning matters more than wording.',
        de: 'Ein Vektorfeld speichert Embeddings in einem Vektortyp wie `Collection(Edm.Single)` (ein Array aus 32-Bit-Gleitkommazahlen), ist `searchable`, hat `dimensions` passend zur Embedding-Ausgabe und verweist auf ein Vektorprofil: einen Algorithmus (HNSW = schnelle, approximative Suche, exhaustive KNN = exakter Brute-Force-Vergleich) plus optional einen **Vectorizer**, der Abfragetext mit demselben Modell einbettet. **Integrierte Vektorisierung** heißt: Skills chunken und embedden beim Indexieren, ein Vectorizer bettet Abfragen ein. `vectorFilterMode` legt fest, wann ein Filter auf Nicht-Vektorfeldern greift: `preFilter` (Standard für Indizes seit Oktober 2023; während der Vektorsuche, bester Recall), `postFilter` (nachdem jeder Shard seine Top-Treffer gewählt hat, daher evtl. weniger Ergebnisse als angefordert) oder `strictPostFilter` (Vorschau). Ideal, wenn Bedeutung mehr zählt als Wortlaut.',
      },
    },
    {
      term: 'Semantic ranker',
      text: {
        en: 'An **L2** (second-stage) reranker: it rescores the top 50 results of the first-stage BM25 or RRF ranking with language-understanding models and is billed as a premium feature. A semantic configuration names a title field, content fields and keyword fields (searchable and retrievable strings, in priority order). Scores run from 0 to 4 (`@search.rerankerScore` in REST, `@search.reranker_score` in Python); captions and answers are verbatim extracts.',
        de: 'Ein **L2**-Reranker (zweite Stufe): Er bewertet die Top 50 des ersten BM25- oder RRF-Rankings mit Sprachverständnismodellen neu und wird als Premium-Funktion abgerechnet. Eine semantische Konfiguration nennt ein Titelfeld, Inhaltsfelder und Schlüsselwortfelder (durchsuchbare und abrufbare Strings, nach Priorität). Scores reichen von 0 bis 4 (`@search.rerankerScore` in REST, `@search.reranker_score` in Python); Captions und Answers sind wörtliche Auszüge.',
      },
    },
    {
      term: 'Monitoring and relevance',
      text: {
        en: '**Execution history** (portal or `get_indexer_status()`) keeps the last 50 indexer runs with document-level errors and warnings; `maxFailedItems` (default 0) sets how many failed documents a run tolerates. A **debug session** is a portal editor that runs one document through a copy of the skillset so you can inspect skill inputs and outputs and test fixes. **Azure Monitor** collects metrics such as Search Latency, Throttled search queries percentage and Document processed count automatically; resource logs need a diagnostic setting. **Search traffic analytics** sends search and click events from your app to Application Insights (zero-result queries, click-through); you tune relevance with scoring profiles, vector weights and the semantic ranker.',
        de: 'Der **Ausführungsverlauf** (Portal oder `get_indexer_status()`) behält die letzten 50 Indexer-Läufe mit Fehlern und Warnungen pro Dokument; `maxFailedItems` (Standard 0) legt fest, wie viele fehlgeschlagene Dokumente ein Lauf toleriert. Eine **Debug Session** ist ein Editor im Portal, der ein Dokument durch eine Kopie des Skillsets schickt, damit du Ein- und Ausgaben der Skills prüfen und Korrekturen testen kannst. **Azure Monitor** erfasst Metriken wie Search Latency, Throttled search queries percentage und Document processed count automatisch; Ressourcenprotokolle brauchen eine Diagnoseeinstellung. **Search Traffic Analytics** schickt Such- und Klickereignisse aus deiner App an Application Insights (Abfragen ohne Treffer, Klickrate); Relevanz stimmst du mit Scoring-Profilen, Vektorgewichten und dem Semantic Ranker ab.',
      },
    },
  ],
  comparison: {
    title: { en: 'Which skill reads and writes what?', de: 'Welcher Skill liest und schreibt was?' },
    columns: [
      { en: 'Skill', de: 'Skill' },
      { en: 'Input', de: 'Eingabe' },
      { en: 'Output', de: 'Ausgabe' },
      { en: 'Use it for', de: 'Wofür' },
    ],
    rows: [
      ['OCR', { en: '`image` from `/document/normalized_images/*`', de: '`image` aus `/document/normalized_images/*`' }, '`text`, `layoutText`', { en: 'Text in scans and embedded images', de: 'Text in Scans und eingebetteten Bildern' }],
      ['Text Merge', { en: '`text` (cracked content), `itemsToInsert` (OCR text), `offsets`', de: '`text` (zerlegter Inhalt), `itemsToInsert` (OCR-Text), `offsets`' }, '`mergedText`', { en: 'OCR text inside the document text, ready for chunking', de: 'OCR-Text im Dokumenttext, bereit fürs Chunking' }],
      [
        'Azure Content Understanding',
        { en: '`file_data` (the source file)', de: '`file_data` (die Quelldatei)' },
        { en: '`text_sections` (Markdown chunks), optional `normalized_images`', de: '`text_sections` (Markdown-Chunks), optional `normalized_images`' },
        { en: 'Layout-aware extraction and chunking in new skillsets', de: 'Layoutbewusste Extraktion und Chunking in neuen Skillsets' },
      ],
      ['Text Split', '`text`', { en: '`textItems` (chunks)', de: '`textItems` (Chunks)' }, { en: 'Chunks that fit embedding input limits', de: 'Chunks passend zu den Eingabelimits von Embedding-Modellen' }],
      ['Azure OpenAI Embedding', { en: '`text` (one chunk)', de: '`text` (ein Chunk)' }, { en: '`embedding` (vector)', de: '`embedding` (Vektor)' }, { en: 'Vectors for a vector field', de: 'Vektoren für ein Vektorfeld' }],
      [
        'GenAI Prompt',
        { en: '`systemMessage`, `userMessage`, `text` or `image`', de: '`systemMessage`, `userMessage`, `text` oder `image`' },
        '`response`',
        { en: 'Image descriptions, summaries, structured extraction with your chat model', de: 'Bildbeschreibungen, Zusammenfassungen, strukturierte Extraktion mit deinem Chatmodell' },
      ],
      [
        'Language Detection · Entity Recognition · Key Phrase Extraction',
        '`text`',
        '`languageCode` · `persons`, `organizations`, `locations` … · `keyPhrases`',
        { en: 'Language routing, entity fields for filters, key terms', de: 'Sprachweiche, Entitätsfelder für Filter, Schlüsselbegriffe' },
      ],
      [
        'Custom Web API',
        { en: 'Fields you choose, sent as `values` with `recordId` and `data`', de: 'Felder deiner Wahl, gesendet als `values` mit `recordId` und `data`' },
        { en: 'Whatever your code returns in `data`', de: 'Was dein Code in `data` zurückgibt' },
        { en: 'Your own model or logic, for example in an Azure Function', de: 'Eigenes Modell oder eigene Logik, etwa in einer Azure Function' },
      ],
      ['Shaper', { en: 'Several existing nodes', de: 'Mehrere vorhandene Knoten' }, { en: 'One complex object (`output`)', de: 'Ein komplexes Objekt (`output`)' }, { en: 'Shapes for knowledge store table projections', de: 'Formen für Tabellenprojektionen im Knowledge Store' }],
    ],
  },
  code: [
    {
      title: { en: 'Index: vector field, profile with vectorizer, semantic configuration', de: 'Index: Vektorfeld, Profil mit Vectorizer, semantische Konfiguration' },
      code: `from azure.identity import DefaultAzureCredential
from azure.search.documents.indexes import SearchIndexClient, models as m

fields = [m.SearchField(name="chunk_id", type="Edm.String", key=True, analyzer_name="keyword"),
          m.SearchField(name="parent_id", type="Edm.String", filterable=True),
          m.SearchField(name="chunk", type="Edm.String", searchable=True),
          m.SearchField(name="chunk_vector", type="Collection(Edm.Single)", searchable=True,
                        vector_search_dimensions=1536, vector_search_profile_name="vec-profile")]
aoai = m.AzureOpenAIVectorizerParameters(resource_url="https://<resource>.openai.azure.com",
    deployment_name="text-embedding-3-small", model_name="text-embedding-3-small")
vector_search = m.VectorSearch(algorithms=[m.HnswAlgorithmConfiguration(name="hnsw")],
    vectorizers=[m.AzureOpenAIVectorizer(vectorizer_name="aoai", parameters=aoai)],
    profiles=[m.VectorSearchProfile(name="vec-profile", algorithm_configuration_name="hnsw",
                                    vectorizer_name="aoai")])
prioritized = m.SemanticPrioritizedFields(content_fields=[m.SemanticField(field_name="chunk")])
semantic = m.SemanticConfiguration(name="contracts-semantic", prioritized_fields=prioritized)
index = m.SearchIndex(name="contracts-index", fields=fields, vector_search=vector_search,
                      semantic_search=m.SemanticSearch(configurations=[semantic]))
client = SearchIndexClient("https://<search-service>.search.windows.net", DefaultAzureCredential())
client.create_or_update_index(index)`,
      notes: [
        { en: 'Index projections need a string key with the `keyword` analyzer (`chunk_id`) and a filterable parent key (`parent_id`). `vector_search_dimensions` must equal the embedding size, and `deployment_name` is the name you gave your deployment (a deployment can have any name). Creating an index needs the Search Service Contributor role.', de: 'Index Projections brauchen einen String-Schlüssel mit dem Analyzer `keyword` (`chunk_id`) und einen filterbaren Elternschlüssel (`parent_id`). `vector_search_dimensions` muss zur Embedding-Größe passen, und `deployment_name` ist der Name, den du deinem Deployment gegeben hast (ein Deployment kann beliebig heißen). Zum Anlegen eines Index brauchst du die Rolle Search Service Contributor.' },
      ],
    },
    {
      title: { en: 'Skillset: chunk, embed, project', de: 'Skillset: chunken, einbetten, projizieren' },
      code: `from azure.identity import DefaultAzureCredential
from azure.search.documents.indexes import SearchIndexerClient, models as m

split = m.SplitSkill(context="/document", text_split_mode="pages", maximum_page_length=2000,
    page_overlap_length=500, inputs=[m.InputFieldMappingEntry(name="text", source="/document/content")],
    outputs=[m.OutputFieldMappingEntry(name="textItems", target_name="pages")])
embed = m.AzureOpenAIEmbeddingSkill(context="/document/pages/*", dimensions=1536,
    resource_url="https://<resource>.openai.azure.com",
    deployment_name="text-embedding-3-small", model_name="text-embedding-3-small",
    inputs=[m.InputFieldMappingEntry(name="text", source="/document/pages/*")],
    outputs=[m.OutputFieldMappingEntry(name="embedding", target_name="vector")])
selector = m.SearchIndexerIndexProjectionSelector(target_index_name="contracts-index",
    parent_key_field_name="parent_id", source_context="/document/pages/*",
    mappings=[m.InputFieldMappingEntry(name="chunk", source="/document/pages/*"),
              m.InputFieldMappingEntry(name="chunk_vector", source="/document/pages/*/vector")])
params = m.SearchIndexerIndexProjectionsParameters(projection_mode="skipIndexingParentDocuments")
skillset = m.SearchIndexerSkillset(name="contracts-skillset", skills=[split, embed],
    index_projection=m.SearchIndexerIndexProjection(selectors=[selector], parameters=params))
client = SearchIndexerClient("https://<search-service>.search.windows.net", DefaultAzureCredential())
client.create_or_update_skillset(skillset)`,
      notes: [
        { en: 'Text Split writes `/document/pages/*` (2,000 characters, 500 overlap); with `context` `/document/pages/*`, the embedding skill runs once per chunk. The index projection writes one search document per chunk and skips the parents, so no output field mappings are needed.', de: 'Text Split schreibt `/document/pages/*` (2.000 Zeichen, 500 Überlappung); mit `context` = `/document/pages/*` läuft der Embedding-Skill einmal pro Chunk. Die Index Projection schreibt ein Suchdokument pro Chunk und überspringt die Eltern, daher brauchst du keine Output Field Mappings.' },
        { en: 'Without `api_key`, the skill (like the vectorizer) calls Azure OpenAI with the system-assigned managed identity of the search service, which needs the Cognitive Services OpenAI User role.', de: 'Ohne `api_key` ruft der Skill (wie der Vectorizer) Azure OpenAI mit der systemzugewiesenen Managed Identity des Suchdiensts auf; sie braucht die Rolle Cognitive Services OpenAI User.' },
      ],
    },
    {
      title: { en: 'Indexer: create it and poll the first run', de: 'Indexer: anlegen und ersten Lauf abfragen' },
      code: `import time
from datetime import timedelta
from azure.identity import DefaultAzureCredential
from azure.search.documents.indexes import SearchIndexerClient, models as m

indexer = m.SearchIndexer(name="contracts-indexer", data_source_name="contracts-blobs",
    skillset_name="contracts-skillset", target_index_name="contracts-index",
    schedule=m.IndexingSchedule(interval=timedelta(hours=2)))
client = SearchIndexerClient("https://<search-service>.search.windows.net", DefaultAzureCredential())
client.create_or_update_indexer(indexer)                    # a new indexer starts its first run now
for _ in range(60):                                         # poll for up to 10 minutes
    run = client.get_indexer_status("contracts-indexer").last_result
    if run and run.status != "inProgress":
        break
    time.sleep(10)
else:
    raise TimeoutError("contracts-indexer is still running")
print(run.status, run.item_count, run.failed_item_count, [e.error_message for e in run.errors])`,
      notes: [
        { en: '`contracts-blobs` is a blob data source created beforehand with `create_or_update_data_source_connection()`. `get_indexer_status()` also returns `execution_history` (last 50 runs); later, `run_indexer()` starts a run on demand and `reset_indexer()` makes the next run reprocess everything.', de: '`contracts-blobs` ist eine vorher mit `create_or_update_data_source_connection()` angelegte Blob-Datenquelle. `get_indexer_status()` liefert auch `execution_history` (letzte 50 Läufe); später startet `run_indexer()` einen Lauf bei Bedarf, und `reset_indexer()` lässt den nächsten Lauf alles neu verarbeiten.' },
      ],
    },
    {
      title: { en: 'Query: hybrid search with semantic ranking', de: 'Abfrage: Hybridsuche mit semantischem Ranking' },
      code: `from azure.identity import DefaultAzureCredential
from azure.search.documents import SearchClient
from azure.search.documents.models import VectorizableTextQuery

client = SearchClient("https://<search-service>.search.windows.net", "contracts-index",
                      DefaultAzureCredential())                    # role: Search Index Data Reader
question = "Which contracts allow early termination?"
results = client.search(search_text=question,                      # keyword leg (BM25)
    vector_queries=[VectorizableTextQuery(text=question, k_nearest_neighbors=50,
                                          fields="chunk_vector")],  # vector leg (vectorizer embeds)
    query_type="semantic", semantic_configuration_name="contracts-semantic",  # L2 rerank, top 50
    select=["parent_id", "chunk"], top=5)
for doc in results:
    print(round(doc["@search.reranker_score"], 2), doc["chunk"][:80])  # REST: @search.rerankerScore`,
      notes: [
        { en: '`search_text` plus `vector_queries` makes a hybrid query: RRF merges both legs, then the semantic ranker reorders the top 50, so `k_nearest_neighbors=50` gives it its full input. Use `VectorizedQuery` instead only when you compute the vector yourself.', de: '`search_text` plus `vector_queries` ergibt eine hybride Abfrage: RRF vereint beide Wege, dann ordnet der Semantic Ranker die Top 50 neu – `k_nearest_neighbors=50` liefert ihm seine volle Eingabe. `VectorizedQuery` nutzt du nur, wenn du den Vektor selbst berechnest.' },
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
      en: 'A vector query with a very selective filter and a small `k_nearest_neighbors` can return too few results with `vectorFilterMode` `postFilter`. `preFilter`, the default for current indexes, filters during the vector search and returns the requested number whenever enough matches exist.',
      de: 'Eine Vektorabfrage mit sehr selektivem Filter und kleinem `k_nearest_neighbors` kann mit `vectorFilterMode` = `postFilter` zu wenige Ergebnisse liefern. `preFilter`, der Standard für aktuelle Indizes, filtert während der Vektorsuche und liefert die angeforderte Anzahl, sobald genug Treffer existieren.',
    },
  ],
  takeaways: [
    {
      en: 'Pipeline order: data source → indexer (cracking, field mappings) → skillset → output field mappings or index projections → index; knowledge store projections → Azure Storage.',
      de: 'Pipeline-Reihenfolge: Datenquelle → Indexer (Cracking, Field Mappings) → Skillset → Output Field Mappings oder Index Projections → Index; Knowledge-Store-Projektionen → Azure Storage.',
    },
    {
      en: 'Chunk, then embed: Text Split or the Content Understanding skill, the Azure OpenAI Embedding skill, index projections and a matching vectorizer add up to integrated vectorization.',
      de: 'Erst chunken, dann einbetten: Text Split oder der Content-Understanding-Skill, der Azure-OpenAI-Embedding-Skill, Index Projections und ein passender Vectorizer ergeben integrierte Vektorisierung.',
    },
    {
      en: 'Best default relevance for RAG: hybrid search plus the semantic ranker with `k_nearest_neighbors` = 50; agentic retrieval for complex, multi-source questions.',
      de: 'Beste Standardrelevanz für RAG: Hybridsuche plus Semantic Ranker mit `k_nearest_neighbors` = 50; Agentic Retrieval für komplexe, quellenübergreifende Fragen.',
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
