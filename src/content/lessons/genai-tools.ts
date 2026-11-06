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
        en: 'Hosted tools run inside the platform within one request. A function tool needs a round trip through your code.',
        de: 'Gehostete Tools laufen innerhalb einer Anfrage in der Plattform. Ein Function-Tool braucht einen Umweg über deinen Code.',
      },
      width: 960,
      height: 460,
      groups: [
        { id: 'g-app', x: 10, y: 20, w: 940, h: 130, label: { en: 'Your app (Python)', de: 'Deine App (Python)' }, tone: 'app' },
        { id: 'g-foundry', x: 10, y: 190, w: 940, h: 256, label: 'Microsoft Foundry', tone: 'foundry' },
      ],
      nodes: [
        { id: 'T1', x: 30, y: 60, w: 180, h: 70, label: { en: 'Your app', de: 'Deine App' }, sub: 'responses.create + tools', tone: 'app' },
        { id: 'T3', x: 390, y: 60, w: 180, h: 70, label: { en: 'Run your function', de: 'Funktion ausführen' }, sub: 'get_order_status(…)', tone: 'tool' },
        { id: 'T5', x: 750, y: 60, w: 180, h: 70, label: { en: 'Show the answer', de: 'Antwort anzeigen' }, sub: 'output_text', tone: 'app', shape: 'pill' },
        { id: 'B2', x: 215, y: 230, w: 180, h: 70, label: { en: 'Model decides', de: 'Modell entscheidet' }, sub: { en: 'answer or use a tool', de: 'antworten oder Tool nutzen' }, tone: 'model' },
        { id: 'B4', x: 575, y: 230, w: 180, h: 70, label: { en: 'Model answers', de: 'Modell antwortet' }, sub: { en: 'uses the tool result', de: 'nutzt das Tool-Ergebnis' }, tone: 'model' },
        {
          id: 'H',
          x: 185,
          y: 350,
          w: 240,
          h: 76,
          label: { en: 'Hosted tools', de: 'Gehostete Tools' },
          sub: 'code_interpreter · web_search\nfile_search · mcp',
          tone: 'tool',
        },
        { id: 'V', x: 530, y: 350, w: 180, h: 76, label: { en: 'Vector store', de: 'Vektorspeicher' }, sub: { en: 'your indexed files', de: 'deine indexierten Dateien' }, tone: 'data', shape: 'store' },
      ],
      edges: [
        { id: 'e1', from: 'T1', to: 'B2', label: { en: 'input + tools', de: 'Input + Tools' } },
        { id: 'e2', from: 'B2', to: 'H', label: { en: 'runs in platform', de: 'läuft in Foundry' }, bidir: true },
        { id: 'e6', from: 'H', to: 'V', label: 'file_search', dashed: true },
        { id: 'e3', from: 'B2', to: 'T3', label: 'function_call' },
        { id: 'e4', from: 'T3', to: 'B4', label: { en: 'call_id + output', de: 'call_id + Output' } },
        { id: 'e5', from: 'B4', to: 'T5', label: { en: 'final answer', de: 'finale Antwort' } },
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
          title: { en: 'Hosted tools run inside', de: 'Gehostete Tools laufen intern' },
          text: {
            en: 'For `code_interpreter`, `web_search` or `file_search` (which reads your vector store), the service runs the tool and hands the result back to the model within the same request — you only see `*_call` items in `output`. Remote `mcp` calls work the same way once approved (or with `require_approval` set to `never`).',
            de: 'Bei `code_interpreter`, `web_search` oder `file_search` (liest deinen Vector Store) führt der Dienst das Tool aus und gibt das Ergebnis noch in derselben Anfrage an das Modell zurück – du siehst nur `*_call`-Items in `output`. Entfernte `mcp`-Aufrufe laufen genauso, sobald sie freigegeben sind (oder mit `require_approval` auf `never`).',
          },
          focus: ['B2', 'e2', 'H', 'e6', 'V'],
        },
        {
          title: { en: 'The model requests a call', de: 'Das Modell fordert einen Aufruf an' },
          text: {
            en: 'For a function tool the model executes nothing. The response contains a `function_call` item with the function `name`, JSON `arguments` and a `call_id`. Your code validates the arguments and runs the function.',
            de: 'Bei einem Function-Tool führt das Modell nichts aus. Die Antwort enthält ein `function_call`-Item mit `name`, JSON-`arguments` und einer `call_id`. Dein Code prüft die Argumente und führt die Funktion aus.',
          },
          focus: ['B2', 'e3', 'T3'],
        },
        {
          title: { en: 'Return the result', de: 'Ergebnis zurückgeben' },
          text: {
            en: 'Send a `function_call_output` item with the same `call_id`, for example together with `previous_response_id`. If the model asked for several calls in parallel, return one output per `call_id`.',
            de: 'Schicke ein `function_call_output`-Item mit derselben `call_id` zurück, zum Beispiel zusammen mit `previous_response_id`. Hat das Modell mehrere Aufrufe parallel angefordert, gib pro `call_id` ein Ergebnis zurück.',
          },
          focus: ['T3', 'e4', 'B4'],
        },
        {
          title: { en: 'Grounded final answer', de: 'Fundierte finale Antwort' },
          text: {
            en: 'The model folds the tool results into its answer. Read it from `output_text`; web search adds `url_citation` annotations so users can check the sources.',
            de: 'Das Modell verarbeitet die Tool-Ergebnisse in seiner Antwort. Du liest sie aus `output_text`; die Websuche ergänzt `url_citation`-Annotationen, damit Nutzer die Quellen prüfen können.',
          },
          focus: ['B4', 'e5', 'T5'],
        },
      ],
    },
    {
      id: 'file-search-rag',
      title: { en: 'file_search: RAG without building a pipeline', de: 'file_search: RAG ohne eigene Pipeline' },
      caption: {
        en: 'You upload files once; the service handles chunking, embeddings, hybrid search and reranking for every question.',
        de: 'Du lädst Dateien einmal hoch; Chunking, Embeddings, hybride Suche und Reranking übernimmt der Dienst bei jeder Frage.',
      },
      width: 960,
      height: 330,
      groups: [
        { id: 'g-managed', x: 254, y: 5, w: 250, h: 305, label: { en: 'Managed by the service', de: 'Vom Dienst verwaltet' }, tone: 'foundry' },
      ],
      nodes: [
        { id: 'F1', x: 10, y: 40, w: 140, h: 70, label: { en: 'Your files', de: 'Deine Dateien' }, sub: 'PDF · DOCX · MD · …', tone: 'data', shape: 'doc' },
        { id: 'F2', x: 274, y: 40, w: 210, h: 70, label: { en: 'Vector store', de: 'Vektorspeicher' }, sub: { en: 'parse · chunk · embed', de: 'parsen · chunken · einbetten' }, tone: 'data', shape: 'store' },
        { id: 'F3', x: 10, y: 220, w: 140, h: 70, label: { en: 'User question', de: 'Nutzerfrage' }, tone: 'user', shape: 'actor' },
        { id: 'F4', x: 274, y: 220, w: 210, h: 70, label: 'file_search', sub: { en: 'rewrite · hybrid · rerank', de: 'umschreiben · hybrid · reranken' }, tone: 'tool' },
        { id: 'F5', x: 576, y: 220, w: 140, h: 70, label: { en: 'Model', de: 'Modell' }, sub: { en: 'answers from chunks', de: 'antwortet aus Chunks' }, tone: 'model' },
        { id: 'F6', x: 816, y: 220, w: 134, h: 70, label: { en: 'Answer', de: 'Antwort' }, sub: { en: 'with file citations', de: 'mit Dateizitaten' }, tone: 'app', shape: 'pill' },
      ],
      edges: [
        { id: 'f1', from: 'F1', to: 'F2', label: 'upload_and_poll' },
        { id: 'f2', from: 'F2', to: 'F4', label: { en: 'search', de: 'Suche' } },
        { id: 'f3', from: 'F3', to: 'F4', label: { en: 'query', de: 'Frage' } },
        { id: 'f4', from: 'F4', to: 'F5', label: { en: 'top chunks', de: 'Top-Chunks' } },
        { id: 'f5', from: 'F5', to: 'F6', label: 'output_text' },
      ],
      steps: [
        {
          title: { en: 'Index your files', de: 'Dateien indexieren' },
          text: {
            en: 'Create a vector store and add files with `upload_and_poll`. The service parses them, splits them into chunks (800 tokens with 400 overlap by default) and embeds them — no embedding pipeline of your own.',
            de: 'Lege einen Vector Store an und füge Dateien mit `upload_and_poll` hinzu. Der Dienst parst sie, zerlegt sie in Chunks (standardmäßig 800 Tokens mit 400 Überlappung) und bettet sie ein – ganz ohne eigene Embedding-Pipeline.',
          },
          focus: ['F1', 'f1', 'F2'],
        },
        {
          title: { en: 'Attach the store', de: 'Store anbinden' },
          text: {
            en: 'Add `{"type": "file_search", "vector_store_ids": [store.id]}` to `tools`. Only the stores listed there are searched.',
            de: 'Ergänze `{"type": "file_search", "vector_store_ids": [store.id]}` in `tools`. Durchsucht werden nur die dort aufgeführten Stores.',
          },
          focus: ['F2', 'f2', 'F4'],
        },
        {
          title: { en: 'Smart retrieval', de: 'Intelligentes Retrieval' },
          text: {
            en: 'For each question, file_search rewrites the query, splits complex questions into parallel searches, runs hybrid keyword + semantic search and reranks the hits.',
            de: 'Für jede Frage schreibt file_search die Query um, teilt komplexe Fragen in parallele Suchen auf, führt eine hybride Keyword- und semantische Suche aus und rankt die Treffer neu.',
          },
          focus: ['F3', 'f3', 'F4'],
        },
        {
          title: { en: 'Answer with citations', de: 'Antwort mit Zitaten' },
          text: {
            en: 'The best chunks (up to 20 by default) go into the model context. While developing, add `include=["file_search_call.results"]` to see exactly what was retrieved.',
            de: 'Die besten Chunks (standardmäßig bis zu 20) landen im Modellkontext. Ergänze beim Entwickeln `include=["file_search_call.results"]`, um genau zu sehen, was abgerufen wurde.',
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
        en: 'An entry in the `tools` list of `responses.create()`. Hosted tools need only a `type` plus settings; a function tool adds a `name`, a `description` and JSON-schema `parameters`. Tool definitions count as input tokens, and descriptions are limited to 1,024 characters.',
        de: 'Ein Eintrag in der `tools`-Liste von `responses.create()`. Gehostete Tools brauchen nur einen `type` plus Einstellungen; ein Function-Tool ergänzt `name`, `description` und JSON-Schema-`parameters`. Tool-Definitionen zählen als Input-Tokens, Beschreibungen sind auf 1.024 Zeichen begrenzt.',
      },
    },
    {
      term: 'Hosted tool vs. function tool',
      text: {
        en: 'Hosted tools (`code_interpreter`, `web_search`, `file_search`, `image_generation`, `mcp`) are executed by the service, not by your code — remote MCP calls even wait for your approval by default. A `function` tool is executed by your application: the response contains a `function_call` item, and nothing happens until you return a `function_call_output`.',
        de: 'Gehostete Tools (`code_interpreter`, `web_search`, `file_search`, `image_generation`, `mcp`) führt der Dienst aus, nicht dein Code – entfernte MCP-Aufrufe warten standardmäßig sogar auf deine Freigabe. Ein `function`-Tool führt deine Anwendung aus: Die Antwort enthält ein `function_call`-Item, und es passiert nichts, bis du ein `function_call_output` zurückgibst.',
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
        en: 'Managed RAG over your files. A vector store parses, chunks, embeds and stores each added file; at query time file_search rewrites the query, runs hybrid keyword + semantic search and reranks. You attach stores with `vector_store_ids`. For many enterprise sources, Foundry IQ knowledge bases are the next step.',
        de: 'Verwaltetes RAG über deine Dateien. Ein Vector Store parst, zerlegt, bettet ein und speichert jede hinzugefügte Datei; bei der Anfrage schreibt file_search die Query um, sucht hybrid (Keyword + semantisch) und rankt neu. Stores bindest du über `vector_store_ids` an. Für viele Unternehmensquellen sind Foundry-IQ-Knowledge-Bases der nächste Schritt.',
      },
    },
    {
      term: 'Function-calling round trip',
      text: {
        en: 'The model returns one or more `function_call` items (`name`, JSON `arguments`, `call_id`). Your code validates the arguments, runs the function and sends one `function_call_output` per `call_id`, for example with `previous_response_id`. Strict schemas (`strict: true`) need `parallel_tool_calls=False`.',
        de: 'Das Modell liefert ein oder mehrere `function_call`-Items (`name`, JSON-`arguments`, `call_id`). Dein Code prüft die Argumente, führt die Funktion aus und schickt pro `call_id` ein `function_call_output` zurück, etwa mit `previous_response_id`. Strikte Schemas (`strict: true`) brauchen `parallel_tool_calls=False`.',
      },
    },
    {
      term: 'tool_choice',
      text: {
        en: 'Controls whether and which tool is used: `auto` (default — the model decides), `required` (call at least one tool), `none` (no tools), or a named tool such as `{"type": "function", "name": "get_order_status"}` to force exactly that call.',
        de: 'Steuert, ob und welches Tool genutzt wird: `auto` (Standard – das Modell entscheidet), `required` (mindestens ein Tool aufrufen), `none` (keine Tools) oder ein benanntes Tool wie `{"type": "function", "name": "get_order_status"}`, um genau diesen Aufruf zu erzwingen.',
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
        'server_url, require_approval',
      ],
      [
        'image_generation',
        { en: 'Platform (gpt-image-1 series)', de: 'Plattform (gpt-image-1-Serie)' },
        { en: 'Creating images inside a conversation', de: 'Bilder im Gesprächsverlauf erzeugen' },
        { en: 'Image model deployment in a request header', de: 'Bildmodell-Deployment im Request-Header' },
      ],
    ],
  },
  code: [
    {
      title: { en: 'Function calling: the full round trip', de: 'Function Calling: der komplette Ablauf' },
      code: `import json
from openai import OpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

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
    model="gpt-4.1", tools=tools, input="Where is order 4711?")

outputs = []
for item in response.output:
    if item.type == "function_call" and item.name == "get_order_status":
        args = json.loads(item.arguments)         # validate before use
        status = lookup_status(args["order_id"])  # your own code
        outputs.append({"type": "function_call_output",
                        "call_id": item.call_id,
                        "output": json.dumps(status)})

final = client.responses.create(
    model="gpt-4.1", previous_response_id=response.id, input=outputs)
print(final.output_text)`,
      notes: [
        {
          en: 'The model only returns a `function_call` item (name, JSON `arguments`, `call_id`); `lookup_status` runs in your code.',
          de: 'Das Modell liefert nur ein `function_call`-Item (Name, JSON-`arguments`, `call_id`); `lookup_status` läuft in deinem Code.',
        },
        {
          en: 'Each result goes back as `function_call_output` with the matching `call_id`; `previous_response_id` carries the earlier turn.',
          de: 'Jedes Ergebnis geht als `function_call_output` mit passender `call_id` zurück; `previous_response_id` trägt die vorige Runde weiter.',
        },
        {
          en: 'The loop handles several calls in one response (parallel tool calls) — one output per `call_id`.',
          de: 'Die Schleife verarbeitet auch mehrere Calls in einer Antwort (parallele Tool-Aufrufe) – ein Output pro `call_id`.',
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
    model="gpt-4.1",
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
      en: '`code_interpreter` costs more than tokens: each session is billed per minute with a five-minute minimum, and calls from two parallel threads create two sessions.',
      de: '`code_interpreter` kostet mehr als Tokens: Jede Sitzung wird minutengenau mit mindestens fünf Minuten abgerechnet, und Aufrufe aus zwei parallelen Threads erzeugen zwei Sitzungen.',
    },
    {
      en: 'Strict function schemas (`strict: true`) don\'t work with parallel function calls — set `parallel_tool_calls=False` when you need them.',
      de: 'Strikte Funktionsschemas (`strict: true`) funktionieren nicht mit parallelen Function Calls – setze `parallel_tool_calls=False`, wenn du sie brauchst.',
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
  ],
  sources: [
    { title: 'Use the Azure OpenAI Responses API', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses' },
    { title: 'Web search', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/web-search' },
    { title: 'File search tool for agents', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/file-search' },
    { title: 'How to use function calling with Microsoft Foundry Models', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/function-calling' },
    { title: 'Structured outputs', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/structured-outputs' },
  ],
}
