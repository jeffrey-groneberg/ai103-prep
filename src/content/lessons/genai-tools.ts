import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'genai-tools',
  summary: {
    en: 'A model on its own can only write text based on what it learned in training. **Tools** extend it: you describe the available tools in the `tools` parameter of `responses.create()`, and the model decides for each request whether to use one (`tool_choice="auto"` by default). **Hosted tools** such as `code_interpreter`, `web_search` and `file_search` run inside the platform and hand their results straight back to the model. The **function** tool works differently: the model only *requests* a call — your code runs the function and returns the result. Knowing who executes what, and which tool fits which need, is the heart of this module.',
    de: 'Ein Modell allein kann nur Text schreiben – auf Basis dessen, was es im Training gelernt hat. **Tools** erweitern es: Du beschreibst die verfügbaren Tools im Parameter `tools` von `responses.create()`, und das Modell entscheidet bei jeder Anfrage, ob es eines nutzt (standardmäßig `tool_choice="auto"`). **Gehostete Tools** wie `code_interpreter`, `web_search` und `file_search` laufen in der Plattform und geben ihre Ergebnisse direkt an das Modell zurück. Das **function**-Tool funktioniert anders: Das Modell *fordert* einen Aufruf nur an – dein Code führt die Funktion aus und liefert das Ergebnis zurück. Wer was ausführt und welches Tool zu welchem Bedarf passt, ist der Kern dieses Moduls.',
  },
  examFocus: {
    en: 'Expect scenario questions that ask which tool fits a requirement (calculations or charts → `code_interpreter`; current public facts → `web_search`; your own documents → `file_search` with a vector store; your business systems → `function`), the order of the function-calling round trip (`function_call` → your code runs it → `function_call_output` with the same `call_id`), and settings such as `tool_choice`, `parallel_tool_calls`, `vector_store_ids` and `container`. Watch for data-boundary traps: `web_search` sends queries to Grounding with Bing.',
    de: 'Rechne mit Szenariofragen, welches Tool zu einer Anforderung passt (Berechnungen oder Diagramme → `code_interpreter`; aktuelle öffentliche Fakten → `web_search`; eigene Dokumente → `file_search` mit Vector Store; eigene Geschäftssysteme → `function`), mit der Reihenfolge des Function-Calling-Ablaufs (`function_call` → dein Code führt aus → `function_call_output` mit derselben `call_id`) und mit Einstellungen wie `tool_choice`, `parallel_tool_calls`, `vector_store_ids` und `container`. Achte auf Datengrenzen-Fallen: `web_search` schickt Anfragen an Grounding with Bing.',
  },
  diagrams: [
    {
      id: 'tool-loop',
      title: { en: 'The tool-calling loop: who runs what?', de: 'Der Tool-Calling-Ablauf: Wer führt was aus?' },
      caption: {
        en: 'Hosted tools run inside one request; web_search and mcp reach services outside Foundry, and mcp waits for your approval first. A function tool needs a round trip through your code.',
        de: 'Gehostete Tools laufen innerhalb einer Anfrage; web_search und mcp erreichen Dienste außerhalb von Foundry, und mcp wartet zuerst auf deine Freigabe. Ein Function-Tool braucht einen Umweg über deinen Code.',
      },
      width: 960,
      height: 540,
      groups: [
        { id: 'g-app', x: 10, y: 20, w: 940, h: 130, label: { en: 'Your app (Python)', de: 'Deine App (Python)' }, tone: 'app' },
        { id: 'g-foundry', x: 10, y: 205, w: 690, h: 315, label: 'Microsoft Foundry', tone: 'foundry' },
        { id: 'g-ext', x: 720, y: 205, w: 230, h: 315, label: { en: 'Outside Foundry', de: 'Außerhalb von Foundry' }, tone: 'external' },
      ],
      nodes: [
        { id: 'T1', x: 60, y: 60, w: 180, h: 70, label: { en: 'Your app', de: 'Deine App' }, sub: 'responses.create + tools', icon: 'code', tone: 'app' },
        { id: 'T3', x: 420, y: 60, w: 180, h: 70, label: { en: 'Run your function', de: 'Funktion ausführen' }, sub: 'get_order_status(…)', icon: 'code', tone: 'tool' },
        { id: 'T5', x: 741, y: 60, w: 198, h: 70, label: { en: 'Show the answer', de: 'Antwort anzeigen' }, sub: 'output_text', icon: 'file', tone: 'app', shape: 'pill' },
        { id: 'B2', x: 60, y: 240, w: 180, h: 70, label: { en: 'Model decides', de: 'Modell entscheidet' }, sub: { en: 'answer or use a tool', de: 'antworten oder Tool nutzen' }, icon: 'foundry-models', tone: 'model' },
        { id: 'B4', x: 420, y: 240, w: 180, h: 70, label: { en: 'Model answers', de: 'Modell antwortet' }, sub: { en: 'folds in tool results', de: 'nutzt Tool-Ergebnisse' }, icon: 'foundry-models', tone: 'model' },
        { id: 'V', x: 20, y: 410, w: 170, h: 80, label: { en: 'Vector store', de: 'Vektorspeicher' }, sub: { en: 'your indexed files', de: 'deine indexierten Dateien' }, icon: 'search-grid', tone: 'data', shape: 'store' },
        {
          id: 'H',
          x: 290,
          y: 410,
          w: 240,
          h: 80,
          label: { en: 'Hosted tools', de: 'Gehostete Tools' },
          sub: 'code_interpreter · web_search\nfile_search · mcp',
          icon: 'toolbox',
          tone: 'tool',
        },
        { id: 'W', x: 741, y: 265, w: 198, h: 70, label: 'Grounding with Bing', sub: { en: 'public web search', de: 'öffentliche Websuche' }, icon: 'globe', tone: 'external' },
        { id: 'M', x: 741, y: 420, w: 198, h: 70, label: { en: 'Remote MCP server', de: 'Entfernter MCP-Server' }, sub: { en: 'run by someone else', de: 'betreibt jemand anderes' }, icon: 'server-farm', tone: 'external' },
      ],
      edges: [
        { id: 'e1', from: 'T1', to: 'B2' },
        { id: 'eA', from: 'B2', to: 'T1', label: { en: 'mcp approval', de: 'MCP-Freigabe' }, dashed: true, bidir: true, via: [[215, 185]] },
        { id: 'e3', from: 'B2', to: 'T3', label: 'function_call' },
        { id: 'e4', from: 'T3', to: 'B4', label: { en: '2nd request: function_call_output', de: '2. Anfrage: function_call_output' } },
        { id: 'e7', from: 'B2', to: 'B4', label: { en: 'same request', de: 'dieselbe Anfrage' } },
        { id: 'e5', from: 'B4', to: 'T5', label: { en: 'final answer', de: 'finale Antwort' } },
        { id: 'e2', from: 'B2', to: 'H', label: { en: 'call + result', de: 'Aufruf + Ergebnis' }, bidir: true },
        { id: 'e6', from: 'H', to: 'V', label: 'file_search', dashed: true },
        { id: 'eW', from: 'H', to: 'W', label: { en: 'web_search queries', de: 'web_search-Anfragen' } },
        { id: 'eM', from: 'H', to: 'M', label: { en: 'mcp (after approval)', de: 'mcp (nach Freigabe)' } },
      ],
      steps: [
        {
          title: { en: 'Offer the tools', de: 'Tools anbieten' },
          text: {
            en: 'Your app calls `responses.create()` with the user input and a `tools` list. By default (`tool_choice="auto"`) the model decides per request whether it needs a tool at all.',
            de: 'Deine App ruft `responses.create()` mit der Nutzereingabe und einer `tools`-Liste auf. Standardmäßig (`tool_choice="auto"`) entscheidet das Modell bei jeder Anfrage, ob es überhaupt ein Tool braucht.',
          },
          focus: ['T1', 'e1', 'B2'],
        },
        {
          title: { en: 'Path A – hosted tool (same request)', de: 'Weg A – gehostetes Tool (dieselbe Anfrage)' },
          text: {
            en: 'With `code_interpreter`, `file_search` (reads your vector store) or `web_search`, the service runs the tool and hands the result back to the model within the same request — you only see `*_call` items in `output`. `web_search` sends queries to Grounding with Bing, outside your compliance boundary. If no tool is needed, the model answers right away.',
            de: 'Bei `code_interpreter`, `file_search` (liest deinen Vector Store) oder `web_search` führt der Dienst das Tool aus und gibt das Ergebnis noch in derselben Anfrage an das Modell – du siehst nur `*_call`-Items in `output`. `web_search` schickt Suchanfragen an Grounding with Bing, außerhalb deiner Compliance-Grenze. Braucht das Modell kein Tool, antwortet es direkt.',
          },
          focus: ['B2', 'e2', 'H', 'e6', 'V', 'eW', 'W', 'e7', 'B4'],
        },
        {
          title: { en: 'Path A – mcp needs approval', de: 'Weg A – mcp braucht Freigabe' },
          text: {
            en: 'With `mcp` (Model Context Protocol: standard for exposing tools to agents), the service calls a remote MCP server that someone else runs. By default it first returns an `mcp_approval_request`; your app answers in a new request with an `mcp_approval_response` and `previous_response_id` — only then does the call go out.',
            de: 'Bei `mcp` (Model Context Protocol: Standard, um Agents Tools bereitzustellen) ruft der Dienst einen entfernten MCP-Server auf, den jemand anderes betreibt. Standardmäßig liefert er zuerst ein `mcp_approval_request`; deine App antwortet in einer neuen Anfrage mit einem `mcp_approval_response` und `previous_response_id` – erst dann geht der Aufruf raus.',
          },
          focus: ['B2', 'eA', 'T1', 'H', 'eM', 'M'],
        },
        {
          title: { en: 'Path B – function (two requests)', de: 'Weg B – Funktion (zwei Anfragen)' },
          text: {
            en: 'For a function tool the model executes nothing. The response contains a `function_call` item with the function `name`, JSON `arguments` and a `call_id`. Your code validates the arguments and runs the function.',
            de: 'Bei einem Function-Tool führt das Modell nichts aus. Die Antwort enthält ein `function_call`-Item mit `name`, JSON-`arguments` und einer `call_id`. Dein Code prüft die Argumente und führt die Funktion aus.',
          },
          focus: ['B2', 'e3', 'T3'],
        },
        {
          title: { en: 'Path B – return the result', de: 'Weg B – Ergebnis zurückgeben' },
          text: {
            en: 'Send a `function_call_output` with the same `call_id` — with `previous_response_id`, or by resending the full input list plus the model\'s `function_call` item. Pass `tools` again if the model may need another call; parallel calls get one output per `call_id`.',
            de: 'Schicke ein `function_call_output` mit derselben `call_id` zurück – mit `previous_response_id` oder, indem du die komplette Input-Liste samt `function_call`-Item des Modells erneut sendest. Gib `tools` wieder mit, falls das Modell weitere Aufrufe braucht; parallele Aufrufe bekommen je `call_id` ein Ergebnis.',
          },
          focus: ['T3', 'e4', 'B4'],
        },
        {
          title: { en: 'Final answer (both paths)', de: 'Finale Antwort (beide Wege)' },
          text: {
            en: 'The model folds the tool results into its answer. Read it from `output_text`; web search adds `url_citation` annotations so users can check the sources.',
            de: 'Das Modell verarbeitet die Tool-Ergebnisse in seiner Antwort. Du liest sie aus `output_text`; die Websuche ergänzt `url_citation`-Annotationen, damit Nutzer die Quellen prüfen können.',
          },
          focus: ['e7', 'e4', 'B4', 'e5', 'T5'],
        },
      ],
    },
    {
      id: 'file-search-rag',
      title: { en: 'file_search: RAG without building a pipeline', de: 'file_search: RAG ohne eigene Pipeline' },
      caption: {
        en: 'RAG (retrieve relevant content and ground the answer in it) without your own pipeline: you upload files once, and the service handles the rest for every question.',
        de: 'RAG (relevante Inhalte abrufen und die Antwort darauf stützen) ohne eigene Pipeline: Du lädst Dateien einmal hoch, den Rest erledigt der Dienst bei jeder Frage.',
      },
      width: 960,
      height: 320,
      groups: [
        { id: 'g-managed', x: 260, y: 10, w: 490, h: 135, label: { en: 'Managed by the service', de: 'Vom Dienst verwaltet' }, tone: 'foundry' },
      ],
      nodes: [
        { id: 'F1', x: 10, y: 50, w: 140, h: 70, label: { en: 'Your files', de: 'Deine Dateien' }, sub: 'PDF · DOCX · MD · …', icon: 'file', tone: 'data', shape: 'doc' },
        { id: 'F2', x: 290, y: 50, w: 186, h: 76, label: { en: 'Vector store', de: 'Vektorspeicher' }, sub: { en: 'parse · chunk · embed', de: 'parsen · chunken · einbetten' }, icon: 'search-grid', tone: 'data', shape: 'store' },
        { id: 'F4', x: 550, y: 50, w: 180, h: 76, label: 'file_search', sub: { en: 'hybrid search + rerank', de: 'hybride Suche + Reranking' }, icon: 'search', tone: 'tool' },
        { id: 'F3', x: 10, y: 220, w: 150, h: 70, label: { en: 'User question', de: 'Nutzerfrage' }, icon: 'users', tone: 'user', shape: 'actor' },
        { id: 'F5', x: 550, y: 220, w: 180, h: 70, label: { en: 'Model', de: 'Modell' }, sub: { en: 'answers from chunks', de: 'antwortet aus Chunks' }, icon: 'foundry-models', tone: 'model' },
        { id: 'F6', x: 820, y: 220, w: 130, h: 70, label: { en: 'Answer', de: 'Antwort' }, sub: { en: 'with file citations', de: 'mit Dateizitaten' }, icon: 'file', tone: 'app', shape: 'pill' },
      ],
      edges: [
        { id: 'f1', from: 'F1', to: 'F2', label: 'upload_and_poll' },
        { id: 'f3', from: 'F3', to: 'F5', label: { en: 'input', de: 'Eingabe' } },
        { id: 'f4', from: 'F5', to: 'F4', label: { en: 'file_search_call ↔ top chunks', de: 'file_search_call ↔ Top-Chunks' }, bidir: true },
        { id: 'f2', from: 'F4', to: 'F2', label: { en: 'search', de: 'Suche' } },
        { id: 'f5', from: 'F5', to: 'F6', label: 'output_text' },
      ],
      steps: [
        {
          title: { en: 'Index your files', de: 'Dateien indexieren' },
          text: {
            en: 'Create a vector store (a managed search index for your files) and add files with `upload_and_poll`. The service splits them into chunks (800 tokens with 400 overlap by default) and turns each chunk into an embedding (a list of numbers that captures its meaning).',
            de: 'Lege einen Vector Store an (verwalteter Suchindex für deine Dateien) und füge Dateien mit `upload_and_poll` hinzu. Der Dienst zerlegt sie in Chunks (standardmäßig 800 Tokens mit 400 Überlappung) und macht aus jedem Chunk ein Embedding (Zahlenliste, die seine Bedeutung erfasst).',
          },
          focus: ['F1', 'f1', 'F2'],
        },
        {
          title: { en: 'Attach the store', de: 'Store anbinden' },
          text: {
            en: 'Add `{"type": "file_search", "vector_store_ids": [store.id]}` to `tools`. Only the stores listed there are searched.',
            de: 'Ergänze `{"type": "file_search", "vector_store_ids": [store.id]}` in `tools`. Durchsucht werden nur die dort aufgeführten Stores.',
          },
          focus: ['F4', 'f2', 'F2'],
        },
        {
          title: { en: 'The model calls file_search', de: 'Das Modell ruft file_search auf' },
          text: {
            en: 'The user question reaches the model as `input`. If it needs your documents, the model emits a `file_search_call` with search `queries`, and the service runs the search.',
            de: 'Die Nutzerfrage erreicht das Modell als `input`. Braucht es deine Dokumente, erzeugt das Modell einen `file_search_call` mit Suchanfragen (`queries`), und der Dienst führt die Suche aus.',
          },
          focus: ['F3', 'f3', 'F5', 'f4', 'F4'],
        },
        {
          title: { en: 'Smart retrieval', de: 'Intelligentes Retrieval' },
          text: {
            en: 'file_search looks for matching chunks by keyword and by meaning (hybrid search) and puts the best ones first (reranking). The service does all of this — you configure nothing.',
            de: 'file_search sucht passende Chunks per Stichwort und nach Bedeutung (hybride Suche) und stellt die besten nach vorn (Reranking). Das alles erledigt der Dienst – du konfigurierst nichts.',
          },
          focus: ['F4', 'f2', 'F2'],
        },
        {
          title: { en: 'Answer with citations', de: 'Antwort mit Zitaten' },
          text: {
            en: 'The best chunks (up to 20 by default) go back into the model context. While developing, add `include=["file_search_call.results"]` to see exactly what was retrieved.',
            de: 'Die besten Chunks (standardmäßig bis zu 20) gehen zurück in den Modellkontext. Ergänze beim Entwickeln `include=["file_search_call.results"]`, um genau zu sehen, was abgerufen wurde.',
          },
          focus: ['f4', 'F5', 'f5', 'F6'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Tool definition',
      text: {
        en: 'An entry in the `tools` list of `responses.create()` — the Responses API (OpenAI-compatible API that returns a response object; keeps state via `previous_response_id` or a conversation). Hosted tools need only a `type` plus settings; a function tool adds a `name`, a `description` and JSON-schema `parameters`. Tool definitions count as input tokens; descriptions are limited to 1,024 characters.',
        de: 'Ein Eintrag in der `tools`-Liste von `responses.create()` – der Responses API (OpenAI-kompatible API, die ein Response-Objekt liefert; hält den Zustand über `previous_response_id` oder eine Conversation). Gehostete Tools brauchen nur einen `type` plus Einstellungen; ein Function-Tool ergänzt `name`, `description` und JSON-Schema-`parameters`. Tool-Definitionen zählen als Input-Tokens; Beschreibungen sind auf 1.024 Zeichen begrenzt.',
      },
    },
    {
      term: 'Hosted tool vs. function tool',
      text: {
        en: 'Hosted tools (`code_interpreter`, `web_search`, `file_search`, `image_generation`) run inside the platform; `web_search` sends its queries on to Grounding with Bing. With `mcp`, the service calls a remote MCP server that someone else runs (approval required by default). A `function` tool runs in your own code: the response contains a `function_call` item, and nothing happens until you return a `function_call_output`.',
        de: 'Gehostete Tools (`code_interpreter`, `web_search`, `file_search`, `image_generation`) laufen in der Plattform; `web_search` schickt seine Suchanfragen weiter an Grounding with Bing. Bei `mcp` ruft der Dienst einen entfernten MCP-Server auf, den jemand anderes betreibt (standardmäßig mit Freigabe). Ein `function`-Tool läuft in deinem eigenen Code: Die Antwort enthält ein `function_call`-Item, und es passiert nichts, bis du ein `function_call_output` zurückgibst.',
      },
    },
    {
      term: 'code_interpreter',
      text: {
        en: 'Lets the model write and run Python in a sandboxed container (`"container": {"type": "auto"}`) to calculate, analyze files and create charts or files — it retries when code fails. Sessions are billed on top of tokens: per minute, five-minute minimum, kept alive within a 20-minute idle timeout.',
        de: 'Lässt das Modell Python in einem abgeschotteten Container schreiben und ausführen (`"container": {"type": "auto"}`), um zu rechnen, Dateien zu analysieren und Diagramme oder Dateien zu erzeugen – bei Fehlern versucht es es erneut. Sitzungen kosten zusätzlich zu den Tokens: minutengenau, mindestens fünf Minuten, aktiv bis 20 Minuten Leerlauf.',
      },
    },
    {
      term: 'web_search',
      text: {
        en: 'Grounds answers in current public web content and returns `url_citation` annotations. Options include `filters.allowed_domains` (up to 100) and an approximate `user_location`. It uses Grounding with Bing, so data leaves your compliance and geo boundary and the Data Protection Addendum doesn\'t apply. `web_search_preview` still works but isn\'t recommended.',
        de: 'Stützt Antworten auf aktuelle öffentliche Webinhalte und liefert `url_citation`-Annotationen. Optionen sind u. a. `filters.allowed_domains` (bis zu 100) und eine ungefähre `user_location`. Es nutzt Grounding with Bing – Daten verlassen deine Compliance- und Geo-Grenze, und das Data Protection Addendum gilt nicht. `web_search_preview` funktioniert noch, wird aber nicht empfohlen.',
      },
    },
    {
      term: 'file_search and vector stores',
      text: {
        en: 'Managed RAG over your files: a vector store chunks and embeds each added file, and file_search finds the best chunks per question with hybrid search and reranking — you only set `vector_store_ids`. For many enterprise sources, Foundry IQ knowledge bases are the next step.',
        de: 'Verwaltetes RAG über deine Dateien: Ein Vector Store zerlegt und bettet jede hinzugefügte Datei ein, und file_search findet pro Frage per hybrider Suche und Reranking die besten Chunks – du setzt nur `vector_store_ids`. Für viele Unternehmensquellen sind Foundry-IQ-Knowledge-Bases der nächste Schritt.',
      },
    },
    {
      term: 'Function-calling round trip',
      text: {
        en: 'The model returns one or more `function_call` items (`name`, JSON `arguments`, `call_id`). Your code validates the arguments, runs the function and returns one `function_call_output` per `call_id`. Add `"strict": true` to the function definition (with `"additionalProperties": false` and every field in `required`) and the arguments always match your schema — then set `parallel_tool_calls=False`.',
        de: 'Das Modell liefert ein oder mehrere `function_call`-Items (`name`, JSON-`arguments`, `call_id`). Dein Code prüft die Argumente, führt die Funktion aus und gibt pro `call_id` ein `function_call_output` zurück. Mit `"strict": true` in der Funktionsdefinition (plus `"additionalProperties": false` und allen Feldern in `required`) passen die Argumente immer zu deinem Schema – setze dann `parallel_tool_calls=False`.',
      },
    },
    {
      term: 'tool_choice and require_approval',
      text: {
        en: '`tool_choice` decides whether and which tool is used: `auto` (default), `required`, `none`, or a named tool such as `{"type": "function", "name": "get_order_status"}`. For `mcp`, `require_approval` defaults to `"always"`: the response holds an `mcp_approval_request`, and your next request sends `{"type": "mcp_approval_response", "approve": True, "approval_request_id": …}` with `previous_response_id`.',
        de: '`tool_choice` bestimmt, ob und welches Tool genutzt wird: `auto` (Standard), `required`, `none` oder ein benanntes Tool wie `{"type": "function", "name": "get_order_status"}`. Bei `mcp` ist `require_approval` standardmäßig `"always"`: Die Antwort enthält ein `mcp_approval_request`, und deine nächste Anfrage sendet `{"type": "mcp_approval_response", "approve": True, "approval_request_id": …}` mit `previous_response_id`.',
      },
    },
  ],
  comparison: {
    title: { en: 'Which tool for which job?', de: 'Welches Tool für welche Aufgabe?' },
    columns: [
      { en: 'Tool', de: 'Tool' },
      { en: 'Runs where', de: 'Läuft wo' },
      { en: 'Best for', de: 'Ideal für' },
      { en: 'Key settings', de: 'Wichtige Einstellungen' },
    ],
    rows: [
      [
        'code_interpreter',
        { en: 'Sandboxed container in the platform', de: 'Abgeschotteter Container in der Plattform' },
        { en: 'Exact calculations, data files, charts', de: 'Exakte Berechnungen, Datendateien, Diagramme' },
        'container (type auto, file_ids)',
      ],
      [
        'web_search',
        { en: 'Platform → Grounding with Bing', de: 'Plattform → Grounding with Bing' },
        { en: 'Current public information with citations', de: 'Aktuelle öffentliche Infos mit Quellen' },
        'filters.allowed_domains, user_location',
      ],
      [
        'file_search',
        { en: 'Platform, over your vector stores', de: 'Plattform, über deine Vector Stores' },
        { en: 'Answers grounded in your own files', de: 'Antworten aus deinen eigenen Dateien' },
        'vector_store_ids, max_num_results',
      ],
      [
        'function',
        { en: 'Your application code', de: 'Dein Anwendungscode' },
        { en: 'Your APIs, databases and business actions', de: 'Deine APIs, Datenbanken und Geschäftsaktionen' },
        'name, description, parameters, strict',
      ],
      [
        'mcp',
        { en: 'Remote MCP server', de: 'Entfernter MCP-Server' },
        { en: 'Tools published on an MCP server', de: 'Tools, die ein MCP-Server anbietet' },
        'server_url, require_approval (default "always")',
      ],
      [
        'image_generation',
        { en: 'Platform (GPT-image deployment, e.g. gpt-image-1-mini)', de: 'Plattform (GPT-image-Deployment, z. B. gpt-image-1-mini)' },
        { en: 'Creating images inside a conversation', de: 'Bilder im Gesprächsverlauf erzeugen' },
        'header x-ms-oai-image-generation-deployment',
      ],
    ],
  },
  code: [
    {
      title: { en: 'Function calling: the full round trip', de: 'Function Calling: der komplette Ablauf' },
      code: `import json
from openai import OpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

def lookup_status(order_id):                     # stands in for your system
    return {"order_id": order_id, "status": "shipped"}

client = OpenAI(
    base_url="https://<resource>.openai.azure.com/openai/v1/",
    api_key=get_bearer_token_provider(
        DefaultAzureCredential(), "https://ai.azure.com/.default"),
)
tools = [{
    "type": "function",
    "name": "get_order_status",
    "description": "Get the shipping status of an order by its ID.",
    "parameters": {
        "type": "object",
        "properties": {"order_id": {"type": "string"}},
        "required": ["order_id"],
    },
}]

response = client.responses.create(
    model="gpt-5-mini", tools=tools, input="Where is order 4711?")  # deployment name

outputs = []
for item in response.output:
    if item.type == "function_call" and item.name == "get_order_status":
        args = json.loads(item.arguments)         # validate before use
        status = lookup_status(args["order_id"])
        outputs.append({"type": "function_call_output",
                        "call_id": item.call_id,
                        "output": json.dumps(status)})

if outputs:                                      # path B: second request
    response = client.responses.create(
        model="gpt-5-mini", tools=tools,         # tools again: more calls possible
        previous_response_id=response.id, input=outputs)
print(response.output_text)                      # no call: first answer is final`,
      notes: [
        {
          en: 'The model only returns a `function_call` item (name, JSON `arguments`, `call_id`); `lookup_status` runs in your code. `model` takes your deployment name, which can be any name you chose.',
          de: 'Das Modell liefert nur ein `function_call`-Item (Name, JSON-`arguments`, `call_id`); `lookup_status` läuft in deinem Code. `model` erwartet deinen Deployment-Namen, und den kannst du frei wählen.',
        },
        {
          en: 'Each result goes back as `function_call_output` with the matching `call_id`; instead of `previous_response_id` you can resend the full input list plus `response.output`.',
          de: 'Jedes Ergebnis geht als `function_call_output` mit passender `call_id` zurück; statt `previous_response_id` kannst du die komplette Input-Liste plus `response.output` erneut senden.',
        },
        {
          en: 'The loop handles several calls in one response (parallel tool calls); if the model answers directly, `outputs` stays empty and no second request is sent.',
          de: 'Die Schleife verarbeitet auch mehrere Calls in einer Antwort (parallele Tool-Aufrufe); antwortet das Modell direkt, bleibt `outputs` leer und es gibt keine zweite Anfrage.',
        },
      ],
    },
    {
      title: { en: 'Hosted tool: file_search over a vector store', de: 'Gehostetes Tool: file_search über einen Vector Store' },
      code: `# client = OpenAI(...) as in the first sample
vector_store = client.vector_stores.create(name="hr-policies")
with open("travel_policy.pdf", "rb") as f:
    client.vector_stores.files.upload_and_poll(   # waits for ingestion
        vector_store_id=vector_store.id, file=f)

response = client.responses.create(
    model="gpt-5-mini",                            # deployment name
    instructions="Answer only from the HR policy files and cite the file.",
    input="What is the hotel limit per night in Paris?",
    tools=[{"type": "file_search", "vector_store_ids": [vector_store.id]}],
    include=["file_search_call.results"],          # show retrieved chunks
)
print(response.output_text)`,
      notes: [
        {
          en: '`upload_and_poll` returns only after parsing, chunking and embedding are done, so the first question can already find the file.',
          de: '`upload_and_poll` kehrt erst zurück, wenn Parsen, Chunking und Embedding fertig sind – so findet schon die erste Frage die Datei.',
        },
        {
          en: 'Other hosted tools use the same list: `{"type": "code_interpreter", "container": {"type": "auto"}}` or `{"type": "web_search"}`.',
          de: 'Andere gehostete Tools nutzen dieselbe Liste: `{"type": "code_interpreter", "container": {"type": "auto"}}` oder `{"type": "web_search"}`.',
        },
      ],
    },
  ],
  traps: [
    {
      en: 'The model never runs your function. If your code doesn\'t send a `function_call_output` with the matching `call_id`, there is no final answer.',
      de: 'Das Modell führt deine Funktion nie selbst aus. Schickt dein Code kein `function_call_output` mit passender `call_id`, gibt es keine finale Antwort.',
    },
    {
      en: '`web_search` uses Grounding with Bing: data flows outside your compliance and geo boundary. Domain filters restrict the sources, not the data flow; admins can block the tool per subscription.',
      de: '`web_search` nutzt Grounding with Bing: Daten fließen aus deiner Compliance- und Geo-Grenze heraus. Domain-Filter begrenzen die Quellen, nicht den Datenfluss; Admins können das Tool pro Subscription sperren.',
    },
    {
      en: 'file_search ignores a fresh upload until ingestion has finished — use `upload_and_poll` (or wait for the vector store status `completed`) and make sure the store ID is in `vector_store_ids`.',
      de: 'file_search ignoriert einen frischen Upload, bis die Verarbeitung fertig ist – nutze `upload_and_poll` (oder warte auf den Vector-Store-Status `completed`) und achte darauf, dass die Store-ID in `vector_store_ids` steht.',
    },
    {
      en: '`code_interpreter` costs more than tokens: each session is billed per minute with a five-minute minimum, and two simultaneous calls in different conversations create two sessions.',
      de: '`code_interpreter` kostet mehr als Tokens: Jede Sitzung wird minutengenau mit mindestens fünf Minuten abgerechnet, und zwei gleichzeitige Aufrufe in verschiedenen Gesprächen erzeugen zwei Sitzungen.',
    },
    {
      en: 'An `mcp` tool does nothing until you approve: `require_approval` defaults to `"always"`, so handle each `mcp_approval_request` — set `"never"` only for servers you trust.',
      de: 'Ein `mcp`-Tool tut nichts ohne deine Freigabe: `require_approval` ist standardmäßig `"always"`, also beantworte jedes `mcp_approval_request` – setze `"never"` nur bei Servern, denen du vertraust.',
    },
  ],
  takeaways: [
    { en: 'Hosted tools run in the platform; function tools run in your code.', de: 'Gehostete Tools laufen in der Plattform, Function-Tools in deinem Code.' },
    {
      en: 'Calculations → code_interpreter, fresh public facts → web_search, your documents → file_search, your systems → function.',
      de: 'Berechnungen → code_interpreter, aktuelle öffentliche Fakten → web_search, eigene Dokumente → file_search, eigene Systeme → function.',
    },
    {
      en: 'Function round trip: `function_call` → run it → `function_call_output` with the same `call_id` → final answer.',
      de: 'Function-Ablauf: `function_call` → ausführen → `function_call_output` mit derselben `call_id` → finale Antwort.',
    },
    {
      en: 'Steer tool use with `tool_choice`, and validate every argument before you act on it.',
      de: 'Steuere die Tool-Nutzung mit `tool_choice` und prüfe jedes Argument, bevor du danach handelst.',
    },
    {
      en: 'Instructions only steer tool use — describe what each tool is for and when to use it. To force a call in a request, set `tool_choice` to `required` or a named tool.',
      de: 'Anweisungen (`instructions`) lenken die Tool-Nutzung nur – beschreib, wofür jedes Tool da ist und wann es zum Einsatz kommen soll. Um in einer Anfrage einen Aufruf zu erzwingen, setzt du `tool_choice` auf `required` oder ein benanntes Tool.',
    },
  ],
  sources: [
    { title: 'Use the Azure OpenAI Responses API', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses' },
    { title: 'Web search', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/web-search' },
    { title: 'File search tool for agents', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/file-search' },
    { title: 'How to use function calling with Microsoft Foundry Models', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/function-calling' },
    { title: 'Structured outputs', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/structured-outputs' },
    { title: 'Tool best practices for Microsoft Foundry Agent Service', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-best-practice' },
  ],
}
