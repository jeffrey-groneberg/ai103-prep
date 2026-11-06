import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'foundry-iq',
  summary: {
    en: 'A model only knows what it saw in training, so an agent alone can’t answer questions about your policies, products or last week’s changes. **Retrieval-augmented generation (RAG)** fixes that: retrieve relevant content, add it to the prompt, then generate a grounded answer with citations. **Foundry IQ** is the managed knowledge layer for this, built on Azure AI Search: you create a **knowledge base** once, attach **knowledge sources** (search index, Blob Storage, OneLake, SharePoint, the web and more), and any number of agents call it as a single MCP tool. Behind that tool, **agentic retrieval** plans subqueries, searches the sources in parallel, reranks, merges and returns citable, permission-aware results.',
    de: 'Ein Modell kennt nur seine Trainingsdaten – allein kann ein Agent also keine Fragen zu deinen Richtlinien, Produkten oder den Änderungen der letzten Woche beantworten. **Retrieval-Augmented Generation (RAG)** löst das: passende Inhalte abrufen, in den Prompt einfügen und dann eine belegte Antwort mit Zitaten erzeugen. **Foundry IQ** ist dafür die verwaltete Wissensschicht auf Basis von Azure AI Search: Du legst einmal eine **Knowledge Base** an, hängst **Knowledge Sources** an (Suchindex, Blob Storage, OneLake, SharePoint, das Web und mehr), und beliebig viele Agents rufen sie als ein einziges MCP-Tool auf. Hinter diesem Tool plant **Agentic Retrieval** Teilabfragen, durchsucht die Quellen parallel, rankt neu, führt zusammen und liefert zitierbare, berechtigungsbewusste Ergebnisse.',
  },
  examFocus: {
    en: 'Expect scenarios that make you pick the right knowledge integration (Foundry IQ knowledge base, Azure AI Search tool, file search or memory), an indexed or remote knowledge source, and a retrieval reasoning effort (`minimal`, `low`, `medium`). Code items test the wiring: `MCPTool` pointing at the knowledge base `/mcp` endpoint with `allowed_tools=["knowledge_base_retrieve"]` and `project_connection_id`, or a direct `retrieve` call from app code. Security items ask which identity needs which role and how per-user permission trimming works.',
    de: 'Rechne mit Szenarien, in denen du die passende Wissensanbindung (Foundry-IQ-Knowledge-Base, Azure AI Search Tool, File Search oder Memory), eine indexierte oder Remote-Knowledge-Source und einen Retrieval Reasoning Effort (`minimal`, `low`, `medium`) wählen musst. Code-Aufgaben prüfen die Verdrahtung: `MCPTool` auf den `/mcp`-Endpoint der Knowledge Base mit `allowed_tools=["knowledge_base_retrieve"]` und `project_connection_id` – oder einen direkten `retrieve`-Aufruf aus App-Code. Sicherheitsfragen wollen wissen, welche Identität welche Rolle braucht und wie Berechtigungsfilterung pro Nutzer funktioniert.',
  },
  diagrams: [
    {
      id: 'fiq-pipeline',
      title: { en: 'How a Foundry agent answers from a knowledge base', de: 'Wie ein Foundry-Agent aus einer Knowledge Base antwortet' },
      caption: {
        en: 'One MCP tool call fans out into planned, parallel searches over indexed and remote sources; merged results come back with references the agent cites.',
        de: 'Ein einziger MCP-Toolaufruf verzweigt in geplante, parallele Suchen über indexierte und Remote-Quellen; die zusammengeführten Ergebnisse kommen mit Referenzen zurück, die der Agent zitiert.',
      },
      width: 960,
      height: 450,
      groups: [
        { id: 'g-proj', x: 160, y: 20, w: 220, h: 135, label: 'Foundry project', tone: 'foundry' },
        { id: 'g-search', x: 400, y: 20, w: 550, h: 255, label: 'Azure AI Search · Foundry IQ', tone: 'data' },
        { id: 'g-ks', x: 400, y: 295, w: 540, h: 137, label: { en: 'Knowledge sources', de: 'Knowledge Sources' }, tone: 'data' },
      ],
      nodes: [
        { id: 'user', x: 20, y: 63, w: 120, h: 64, label: { en: 'User', de: 'Nutzer' }, tone: 'user', shape: 'actor' },
        { id: 'agent', x: 180, y: 59, w: 180, h: 72, label: 'Foundry agent', sub: 'knowledge_base_retrieve', tone: 'foundry' },
        { id: 'answer', x: 180, y: 185, w: 180, h: 60, label: { en: 'Answer + citations', de: 'Antwort + Zitate' }, sub: { en: 'grounded in sources', de: 'quellenbasiert' }, tone: 'foundry', shape: 'pill' },
        { id: 'kb', x: 430, y: 59, w: 200, h: 72, label: { en: 'Knowledge base', de: 'Knowledge Base' }, sub: '…/knowledgebases/<kb>/mcp', tone: 'data' },
        { id: 'plan', x: 690, y: 59, w: 240, h: 72, label: { en: 'Query planning', de: 'Abfrageplanung' }, sub: { en: 'LLM writes subqueries', de: 'LLM erzeugt Teilabfragen' }, tone: 'model' },
        { id: 'subq', x: 690, y: 181, w: 240, h: 68, label: { en: 'Parallel subqueries', de: 'Parallele Teilabfragen' }, sub: { en: 'search + semantic rerank', de: 'Suche + Semantic Reranking' }, tone: 'neutral' },
        { id: 'merge', x: 430, y: 181, w: 200, h: 68, label: { en: 'Merge results', de: 'Ergebnisse mergen' }, sub: { en: 'content + references', de: 'Inhalt + Referenzen' }, tone: 'neutral' },
        { id: 'idx', x: 420, y: 340, w: 220, h: 72, label: { en: 'Indexed sources', de: 'Indexierte Quellen' }, sub: 'Search index · Blob · OneLake', tone: 'data', shape: 'store' },
        { id: 'rem', x: 700, y: 340, w: 220, h: 72, label: { en: 'Remote sources', de: 'Remote-Quellen' }, sub: 'SharePoint · Web (Bing)', tone: 'external' },
      ],
      edges: [
        { id: 'e-user-agent', from: 'user', to: 'agent' },
        { id: 'e-agent-kb', from: 'agent', to: 'kb', label: 'MCP', bidir: true },
        { id: 'e-kb-plan', from: 'kb', to: 'plan' },
        { id: 'e-plan-subq', from: 'plan', to: 'subq' },
        { id: 'e-subq-idx', from: 'subq', to: 'idx', label: { en: 'index query', de: 'Indexabfrage' }, bidir: true },
        { id: 'e-subq-rem', from: 'subq', to: 'rem', label: { en: 'live query', de: 'Live-Abfrage' }, bidir: true },
        { id: 'e-subq-merge', from: 'subq', to: 'merge' },
        { id: 'e-merge-kb', from: 'merge', to: 'kb', label: { en: 'grounding + refs', de: 'Grounding + Refs' } },
        { id: 'e-agent-answer', from: 'agent', to: 'answer' },
        { id: 'e-answer-user', from: 'answer', to: 'user' },
      ],
      steps: [
        {
          title: { en: 'Ask the agent', de: 'Den Agent fragen' },
          text: {
            en: 'A user asks a question. Good instructions tell the agent to always use the knowledge base tool, cite what it retrieved and say “I don’t know” when the knowledge base has no answer — instead of falling back on training data.',
            de: 'Ein Nutzer stellt eine Frage. Gute Instructions weisen den Agent an, immer das Knowledge-Base-Tool zu nutzen, das Abgerufene zu zitieren und „Ich weiß es nicht“ zu sagen, wenn die Knowledge Base keine Antwort hat – statt auf Trainingswissen auszuweichen.',
          },
          focus: ['user', 'e-user-agent', 'agent'],
        },
        {
          title: { en: 'One MCP tool call', de: 'Ein MCP-Toolaufruf' },
          text: {
            en: 'Every knowledge base is an MCP server. The agent calls its only supported tool, `knowledge_base_retrieve`, through a project connection. One knowledge base can serve many agents, so you build retrieval once.',
            de: 'Jede Knowledge Base ist ein MCP-Server. Der Agent ruft über eine Projektverbindung ihr einziges unterstütztes Tool `knowledge_base_retrieve` auf. Eine Knowledge Base kann viele Agents bedienen – du baust das Retrieval also nur einmal.',
          },
          focus: ['agent', 'e-agent-kb', 'kb', 'g-search'],
        },
        {
          title: { en: 'Plan the query', de: 'Abfrage planen' },
          text: {
            en: 'At `low` (the default) or `medium` retrieval reasoning effort, an LLM reads the question and chat history, splits it into focused subqueries and picks knowledge sources. At `minimal`, planning is skipped and the query goes straight to every source.',
            de: 'Bei `low` (Standard) oder `medium` Retrieval Reasoning Effort liest ein LLM Frage und Chatverlauf, zerlegt sie in fokussierte Teilabfragen und wählt Knowledge Sources aus. Bei `minimal` entfällt die Planung, und die Abfrage geht direkt an alle Quellen.',
          },
          focus: ['kb', 'e-kb-plan', 'plan'],
        },
        {
          title: { en: 'Search in parallel', de: 'Parallel suchen' },
          text: {
            en: 'Subqueries run at the same time as keyword, vector or hybrid searches. Indexed sources are searched inside Azure AI Search; remote sources such as SharePoint (Copilot Retrieval API) or the web (Bing) are queried live. Each subquery is semantically reranked.',
            de: 'Die Teilabfragen laufen gleichzeitig als Keyword-, Vektor- oder Hybridsuche. Indexierte Quellen werden in Azure AI Search durchsucht; Remote-Quellen wie SharePoint (Copilot Retrieval API) oder das Web (Bing) werden live abgefragt. Jede Teilabfrage wird semantisch neu gerankt.',
          },
          focus: ['e-plan-subq', 'subq', 'e-subq-idx', 'e-subq-rem', 'idx', 'rem', 'g-ks'],
        },
        {
          title: { en: 'Merge, cite, answer', de: 'Mergen, zitieren, antworten' },
          text: {
            en: 'The best chunks are merged into one response with references (and an optional activity log). The agent grounds its answer in this extractive data and shows citations. With permission trimming, each user only gets content they may read.',
            de: 'Die besten Chunks werden zu einer Antwort mit Referenzen (und optionalem Activity-Log) zusammengeführt. Der Agent stützt seine Antwort auf diese extrahierten Daten und zeigt Zitate. Mit Berechtigungsfilterung bekommt jeder Nutzer nur Inhalte, die er lesen darf.',
          },
          focus: ['e-subq-merge', 'merge', 'e-merge-kb', 'e-agent-answer', 'answer', 'e-answer-user'],
        },
      ],
    },
    {
      id: 'fiq-wiring',
      title: { en: 'Wiring an agent to a knowledge base: connection, identities, roles', de: 'Agent und Knowledge Base verdrahten: Verbindung, Identitäten, Rollen' },
      caption: {
        en: 'Two managed identities do the work: the project’s identity reads the knowledge base, the search service’s identity calls the LLM. The user’s own token decides what they may see.',
        de: 'Zwei Managed Identities erledigen die Arbeit: Die Projektidentität liest die Knowledge Base, die Identität des Suchdienstes ruft das LLM auf. Das Token des Nutzers entscheidet, was er sehen darf.',
      },
      width: 960,
      height: 420,
      groups: [
        { id: 'g-res', x: 160, y: 20, w: 370, h: 380, label: 'Foundry resource', tone: 'foundry' },
        { id: 'g-proj2', x: 180, y: 60, w: 330, h: 160, label: 'Foundry project', tone: 'foundry' },
        { id: 'g-search2', x: 570, y: 20, w: 380, h: 380, label: 'Azure AI Search', tone: 'data' },
      ],
      nodes: [
        { id: 'w-user', x: 20, y: 110, w: 110, h: 72, label: { en: 'User', de: 'Nutzer' }, tone: 'user', shape: 'actor' },
        { id: 'w-agent', x: 200, y: 110, w: 120, h: 72, label: 'Foundry agent', sub: 'MCPTool', tone: 'foundry' },
        { id: 'w-conn', x: 370, y: 110, w: 120, h: 72, label: { en: 'Connection', de: 'Verbindung' }, sub: 'RemoteTool', tone: 'safety' },
        { id: 'w-llm', x: 370, y: 290, w: 120, h: 72, label: { en: 'LLM deployment', de: 'LLM-Deployment' }, sub: { en: 'query planning', de: 'Abfrageplanung' }, tone: 'model', shape: 'store' },
        { id: 'w-kb', x: 610, y: 110, w: 300, h: 72, label: { en: 'Knowledge base', de: 'Knowledge Base' }, sub: '…/knowledgebases/<kb>/mcp', tone: 'data' },
        { id: 'w-ks', x: 610, y: 290, w: 300, h: 72, label: { en: 'Knowledge sources', de: 'Knowledge Sources' }, sub: { en: 'ACLs · sensitivity labels', de: 'ACLs · Vertraulichkeitslabels' }, tone: 'data', shape: 'store' },
      ],
      edges: [
        { id: 'w-e-user', from: 'w-user', to: 'w-agent', label: { en: 'token', de: 'Token' } },
        { id: 'w-e-tool', from: 'w-agent', to: 'w-conn' },
        { id: 'w-e-conn', from: 'w-conn', to: 'w-kb', label: { en: 'project MI', de: 'Projekt-MI' } },
        { id: 'w-e-ks', from: 'w-kb', to: 'w-ks', label: { en: 'retrieve', de: 'Abruf' } },
        { id: 'w-e-llm', from: 'w-kb', to: 'w-llm', label: { en: 'search MI', de: 'Search-MI' } },
      ],
      steps: [
        {
          title: { en: 'Build the knowledge layer', de: 'Wissensschicht aufbauen' },
          text: {
            en: 'On the search service, create knowledge sources first, then a knowledge base that references them (both must live on the same service). Indexed sources can ingest ACLs and Microsoft Purview sensitivity labels for later trimming.',
            de: 'Lege auf dem Suchdienst zuerst die Knowledge Sources an, dann eine Knowledge Base, die sie referenziert (beide müssen auf demselben Dienst liegen). Indexierte Quellen können ACLs und Microsoft-Purview-Vertraulichkeitslabels für die spätere Filterung mit aufnehmen.',
          },
          focus: ['g-search2', 'w-kb', 'w-e-ks', 'w-ks'],
        },
        {
          title: { en: 'Create the project connection', de: 'Projektverbindung anlegen' },
          text: {
            en: 'A `RemoteTool` project connection targets `https://<search>.search.windows.net/knowledgebases/<kb>/mcp?api-version=2026-08-01-preview` and authenticates with the project’s managed identity (audience `https://search.azure.com/`). Creating it needs **Foundry Project Manager**.',
            de: 'Eine `RemoteTool`-Projektverbindung zielt auf `https://<search>.search.windows.net/knowledgebases/<kb>/mcp?api-version=2026-08-01-preview` und authentifiziert sich mit der Managed Identity des Projekts (Audience `https://search.azure.com/`). Zum Anlegen brauchst du **Foundry Project Manager**.',
          },
          focus: ['w-conn', 'w-e-conn', 'g-proj2'],
        },
        {
          title: { en: 'Grant two roles', de: 'Zwei Rollen vergeben' },
          text: {
            en: 'The project’s managed identity gets **Search Index Data Reader** on the search service. If the knowledge base uses an LLM for planning or answer synthesis, the search service’s managed identity gets **Cognitive Services User** on the Foundry resource.',
            de: 'Die Managed Identity des Projekts bekommt **Search Index Data Reader** auf dem Suchdienst. Nutzt die Knowledge Base ein LLM für Planung oder Answer Synthesis, bekommt die Managed Identity des Suchdienstes **Cognitive Services User** auf der Foundry-Ressource.',
          },
          focus: ['w-e-conn', 'w-e-llm', 'w-llm', 'g-res'],
        },
        {
          title: { en: 'Attach the tool', de: 'Tool anhängen' },
          text: {
            en: 'The agent gets an `MCPTool` with `server_url` set to the MCP endpoint, `project_connection_id` set to the connection, `allowed_tools=["knowledge_base_retrieve"]` and an approval policy such as `require_approval="never"`.',
            de: 'Der Agent bekommt ein `MCPTool` mit `server_url` auf den MCP-Endpoint, `project_connection_id` auf die Verbindung, `allowed_tools=["knowledge_base_retrieve"]` und einer Freigaberegel wie `require_approval="never"`.',
          },
          focus: ['w-agent', 'w-e-tool', 'w-conn'],
        },
        {
          title: { en: 'Trim results per user', de: 'Ergebnisse pro Nutzer filtern' },
          text: {
            en: 'For permission-protected content, the user’s token travels in the `x-ms-query-source-authorization` header. Agent Service sets it when the caller is a user; apps can pass it per request through a structured input. Without it, permission-enabled sources return results unfiltered.',
            de: 'Für berechtigungsgeschützte Inhalte reist das Token des Nutzers im Header `x-ms-query-source-authorization`. Agent Service setzt ihn, wenn der Aufrufer ein Nutzer ist; Apps können ihn pro Anfrage über einen Structured Input übergeben. Ohne ihn liefern berechtigungsfähige Quellen ungefilterte Ergebnisse.',
          },
          focus: ['w-user', 'w-e-user', 'w-agent', 'w-ks'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Retrieval-augmented generation (RAG)',
      text: {
        en: 'Retrieve relevant content, augment the prompt with it, generate the answer. It keeps answers current without retraining, shows which sources were used and reduces fabricated answers. Azure AI Search offers **classic RAG** (one hybrid query plus semantic ranking, you orchestrate) and **agentic retrieval** (planned multi-query pipeline, recommended for agents and complex questions).',
        de: 'Passende Inhalte abrufen, den Prompt damit anreichern, die Antwort generieren. So bleiben Antworten aktuell ohne Neutraining, die genutzten Quellen werden sichtbar und erfundene Antworten seltener. Azure AI Search bietet **klassisches RAG** (eine Hybridabfrage plus Semantic Ranking, du orchestrierst) und **Agentic Retrieval** (geplante Mehrfachabfrage-Pipeline, empfohlen für Agents und komplexe Fragen).',
      },
    },
    {
      term: 'Foundry IQ',
      text: {
        en: 'The managed knowledge layer for agents, built on Azure AI Search agentic retrieval (Azure AI Search is required). Create knowledge bases in the Foundry portal (**Build** › **Knowledge**) or in code, then use them from Foundry Agent Service, Microsoft Agent Framework or any app through the REST API or SDKs.',
        de: 'Die verwaltete Wissensschicht für Agents, gebaut auf Agentic Retrieval von Azure AI Search (Azure AI Search ist Pflicht). Du legst Knowledge Bases im Foundry-Portal (**Build** › **Knowledge**) oder per Code an und nutzt sie aus Foundry Agent Service, Microsoft Agent Framework oder jeder App über REST-API oder SDKs.',
      },
    },
    {
      term: 'Knowledge base',
      text: {
        en: 'Top-level object on the search service that groups knowledge sources under one endpoint. Its settings decide how sources are chosen (retrieval instructions, reasoning effort), how results come back (output mode, answer instructions) and which optional LLM plans queries. It exposes a `retrieve` action and an MCP endpoint with the `knowledge_base_retrieve` tool.',
        de: 'Objekt der obersten Ebene auf dem Suchdienst, das Knowledge Sources hinter einem Endpoint bündelt. Seine Einstellungen bestimmen, wie Quellen gewählt werden (Retrieval Instructions, Reasoning Effort), wie Ergebnisse zurückkommen (Output Mode, Answer Instructions) und welches optionale LLM Abfragen plant. Es bietet eine `retrieve`-Aktion und einen MCP-Endpoint mit dem Tool `knowledge_base_retrieve`.',
      },
    },
    {
      term: 'Indexed vs remote knowledge source',
      text: {
        en: '**Indexed** sources (search index, Azure Blob, OneLake, indexed SharePoint, …) are ingested ahead of time; for Blob, OneLake or SharePoint, Azure AI Search generates the indexer pipeline with chunking and vectorization and refreshes it on an indexer schedule. **Remote** sources (remote SharePoint, web, MCP server, Work IQ, …) store nothing and are queried live, so they are always current.',
        de: '**Indexierte** Quellen (Suchindex, Azure Blob, OneLake, indexiertes SharePoint, …) werden vorab aufgenommen; für Blob, OneLake oder SharePoint erzeugt Azure AI Search die Indexer-Pipeline samt Chunking und Vektorisierung und aktualisiert sie nach Indexer-Zeitplan. **Remote**-Quellen (Remote-SharePoint, Web, MCP-Server, Work IQ, …) speichern nichts und werden live abgefragt – sie sind daher immer aktuell.',
      },
    },
    {
      term: 'Retrieval reasoning effort',
      text: {
        en: '`minimal`: no LLM planning, every source is searched, extractive output only, no answer synthesis and no web source — cheapest and fastest. `low` (default): one LLM planning pass that writes subqueries and selects sources. `medium`: adds a semantic classifier and at most one extra retrieval pass when results are weak. Set it on the knowledge base; a retrieve request can override it.',
        de: '`minimal`: keine LLM-Planung, jede Quelle wird durchsucht, nur extrahierte Ausgabe, keine Answer Synthesis und keine Web-Quelle – am günstigsten und schnellsten. `low` (Standard): ein LLM-Planungsdurchgang, der Teilabfragen schreibt und Quellen wählt. `medium`: ergänzt einen semantischen Klassifizierer und höchstens einen weiteren Retrieval-Durchgang, wenn die Treffer schwach sind. Du setzt ihn auf der Knowledge Base; ein Retrieve-Request kann ihn überschreiben.',
      },
    },
    {
      term: 'Extractive data vs answer synthesis',
      text: {
        en: '**Extractive data** returns the raw, citable chunks so the agent can reason over them — the recommended output for Foundry IQ agents. **Answer synthesis** (preview) lets the knowledge base’s LLM write a finished answer with `[ref_id:n]` citations; reserve it for standalone apps that show the retrieval output directly to users.',
        de: '**Extractive Data** liefert die rohen, zitierbaren Chunks, damit der Agent darüber nachdenken kann – die empfohlene Ausgabe für Foundry-IQ-Agents. Bei **Answer Synthesis** (Preview) schreibt das LLM der Knowledge Base eine fertige Antwort mit `[ref_id:n]`-Zitaten; nutze das nur für eigenständige Apps, die das Retrieval-Ergebnis direkt anzeigen.',
      },
    },
    {
      term: 'Agent memory (preview)',
      text: {
        en: 'Long-term memory in Foundry Agent Service: a **memory store** (chat + embedding model) extracts, consolidates and retrieves user profile, chat summary and procedural memories across sessions. Attach the memory search tool to a prompt agent; `scope="{{$userId}}"` isolates memories per user. Use memory for learned user context, Foundry IQ for curated organizational content.',
        de: 'Langzeitgedächtnis in Foundry Agent Service: Ein **Memory Store** (Chat- und Embedding-Modell) extrahiert, konsolidiert und liefert Nutzerprofil-, Chat-Summary- und prozedurale Memories über Sitzungen hinweg. Hänge das Memory-Search-Tool an einen Prompt Agent; `scope="{{$userId}}"` trennt die Memories pro Nutzer. Memory nutzt du für gelernten Nutzerkontext, Foundry IQ für kuratierte Unternehmensinhalte.',
      },
    },
  ],
  comparison: {
    title: { en: 'Which knowledge integration fits the need?', de: 'Welche Wissensanbindung passt zum Bedarf?' },
    columns: [
      { en: 'Need', de: 'Bedarf' },
      { en: 'Choose', de: 'Wähle' },
      { en: 'Why', de: 'Warum' },
    ],
    rows: [
      [
        { en: 'Curated company content from several sources, shared by many agents, permission-aware', de: 'Kuratierte Firmeninhalte aus mehreren Quellen, von vielen Agents genutzt, berechtigungsbewusst' },
        'Foundry IQ knowledge base',
        { en: 'Agentic retrieval plans, searches and merges across sources behind one MCP tool', de: 'Agentic Retrieval plant, sucht und mergt über alle Quellen – hinter einem MCP-Tool' },
      ],
      [
        { en: 'Query one existing index with a fixed filter or query type', de: 'Einen bestehenden Index mit festem Filter oder Abfragetyp abfragen' },
        'Azure AI Search tool',
        { en: 'Set `index_name`, `query_type` (default `vector_semantic_hybrid`), `top_k` and `filter`', de: '`index_name`, `query_type` (Standard `vector_semantic_hybrid`), `top_k` und `filter` setzen' },
      ],
      [
        { en: 'Search files a user provides during the conversation', de: 'Dateien durchsuchen, die ein Nutzer im Gespräch bereitstellt' },
        'File search tool',
        { en: 'Uploaded files go into a vector store that the agent searches', de: 'Hochgeladene Dateien landen in einem Vector Store, den der Agent durchsucht' },
      ],
      [
        { en: 'Remember user-specific facts across sessions', de: 'Nutzerspezifische Fakten über Sitzungen hinweg merken' },
        { en: 'Memory (preview)', de: 'Memory (Preview)' },
        { en: 'Memory store plus memory search tool, isolated per scope', de: 'Memory Store plus Memory-Search-Tool, getrennt pro Scope' },
      ],
      [
        { en: 'Current public web information', de: 'Aktuelle öffentliche Webinformationen' },
        { en: 'Web Search tool or Web IQ', de: 'Web Search Tool oder Web IQ' },
        { en: 'Web grounding with source links (next module)', de: 'Web-Grounding mit Quellenlinks (nächstes Modul)' },
      ],
      [
        { en: 'The signed-in user’s mail, meetings and chats', de: 'Mails, Meetings und Chats des angemeldeten Nutzers' },
        'Work IQ',
        { en: 'Delegated, permission-trimmed Microsoft 365 work context', de: 'Delegierter, berechtigungsgefilterter Microsoft-365-Arbeitskontext' },
      ],
    ],
  },
  code: [
    {
      title: { en: 'Give a prompt agent a Foundry IQ knowledge base', de: 'Einem Prompt Agent eine Foundry-IQ-Knowledge-Base geben' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient
from azure.ai.projects.models import PromptAgentDefinition, MCPTool

project = AIProjectClient(
    endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
    credential=DefaultAzureCredential(),
    allow_preview=True,  # needed for get_openai_client(agent_name=...) (preview)
)
kb_mcp_url = ("https://<search>.search.windows.net/knowledgebases/hr-policy-kb/mcp"
              "?api-version=2026-08-01-preview")

agent = project.agents.create_version(
    agent_name="hr-assistant",
    definition=PromptAgentDefinition(
        model="gpt-5-mini",                       # your deployment name
        instructions=(
            "Use the knowledge base tool to answer every question and cite the "
            "retrieved sources. If the knowledge base has no answer, say \\"I don't know\\"."
        ),
        tools=[MCPTool(
            server_label="knowledge-base",
            server_url=kb_mcp_url,
            require_approval="never",
            allowed_tools=["knowledge_base_retrieve"],
            project_connection_id="hr-kb-mcp",    # RemoteTool connection (project MI)
        )],
    ),
)

openai = project.get_openai_client(agent_name=agent.name)
conversation = openai.conversations.create()
response = openai.responses.create(conversation=conversation.id, input="How many vacation days do I get?")
print(response.output_text)`,
      notes: [
        {
          en: '`knowledge_base_retrieve` is the only knowledge base tool Foundry Agent Service supports; the connection supplies the project managed identity.',
          de: '`knowledge_base_retrieve` ist das einzige Knowledge-Base-Tool, das Foundry Agent Service unterstützt; die Verbindung liefert die Managed Identity des Projekts.',
        },
        {
          en: 'Explicit instructions raise the tool-call rate and enforce citations plus an “I don’t know” fallback.',
          de: 'Explizite Instructions erhöhen die Tool-Aufrufquote und erzwingen Zitate sowie ein „Ich weiß es nicht“ als Rückfallantwort.',
        },
      ],
    },
    {
      title: { en: 'Call the knowledge base directly from app or workflow code', de: 'Die Knowledge Base direkt aus App- oder Workflow-Code aufrufen' },
      code: `# pip install --pre azure-search-documents azure-identity
from azure.identity import DefaultAzureCredential
from azure.search.documents.knowledgebases import KnowledgeBaseRetrievalClient
from azure.search.documents.knowledgebases.models import (
    KnowledgeBaseMessage,
    KnowledgeBaseMessageTextContent,
    KnowledgeBaseRetrievalRequest,
    KnowledgeRetrievalLowReasoningEffort,
)

kb_client = KnowledgeBaseRetrievalClient(
    endpoint="https://<search>.search.windows.net",
    knowledge_base_name="hr-policy-kb",
    credential=DefaultAzureCredential(),
)
request = KnowledgeBaseRetrievalRequest(
    messages=[KnowledgeBaseMessage(
        role="user",
        content=[KnowledgeBaseMessageTextContent(text="How many vacation days do new hires get?")],
    )],
    retrieval_reasoning_effort=KnowledgeRetrievalLowReasoningEffort(),  # overrides the KB default
)
result = kb_client.retrieve(request)
print(result.response[0].content[0].text)   # JSON chunks, each with a ref_id for citations`,
      notes: [
        {
          en: 'The `messages` input, query planning and configurable reasoning effort need the `2026-08-01-preview` API (preview SDK); the GA `2026-04-01` API supports minimal, extractive retrieval with `intents`.',
          de: 'Der `messages`-Input, Query Planning und konfigurierbarer Reasoning Effort brauchen die API `2026-08-01-preview` (Preview-SDK); die GA-API `2026-04-01` unterstützt minimales, extraktives Retrieval mit `intents`.',
        },
        {
          en: 'Besides `response`, the result carries an `activity` log (query plan, tokens) and a `references` array for citations.',
          de: 'Neben `response` enthält das Ergebnis ein `activity`-Log (Abfrageplan, Tokens) und ein `references`-Array für Zitate.',
        },
      ],
    },
  ],
  traps: [
    {
      en: 'Foundry IQ can’t run without Azure AI Search — the knowledge base lives on the search service. Foundry Agent Service, however, is optional: Agent Framework or any app can call the knowledge base.',
      de: 'Foundry IQ läuft nicht ohne Azure AI Search – die Knowledge Base liegt auf dem Suchdienst. Foundry Agent Service ist dagegen optional: Agent Framework oder jede App kann die Knowledge Base aufrufen.',
    },
    {
      en: '`minimal` reasoning effort means no query planning, no answer synthesis and no web knowledge source. Don’t pick it when multi-part questions must be decomposed.',
      de: '`minimal` Reasoning Effort heißt: keine Abfrageplanung, keine Answer Synthesis und keine Web-Knowledge-Source. Wähle es nicht, wenn mehrteilige Fragen zerlegt werden müssen.',
    },
    {
      en: 'For indexed sources, permission trimming needs both halves: permission metadata ingested with `ingestionPermissionOptions` and the user’s token on the request. Missing either one returns results unfiltered.',
      de: 'Bei indexierten Quellen braucht Berechtigungsfilterung beide Hälften: mit `ingestionPermissionOptions` aufgenommene Berechtigungsmetadaten und das Token des Nutzers in der Anfrage. Fehlt eines davon, kommen die Ergebnisse ungefiltert.',
    },
    {
      en: 'A 403 from Azure AI Search means the project’s managed identity lacks **Search Index Data Reader**. **Cognitive Services User** is a different assignment: the search service’s identity on the Foundry resource, needed only when the knowledge base calls an LLM.',
      de: 'Ein 403 von Azure AI Search heißt: Der Managed Identity des Projekts fehlt **Search Index Data Reader**. **Cognitive Services User** ist eine andere Zuweisung: die Identität des Suchdienstes auf der Foundry-Ressource, nur nötig, wenn die Knowledge Base ein LLM aufruft.',
    },
    {
      en: 'Memory is not a knowledge base: memory stores learned, user-specific facts; Foundry IQ grounds on curated organizational content; file search handles documents a user provides in the conversation.',
      de: 'Memory ist keine Knowledge Base: Memory speichert gelernte, nutzerspezifische Fakten; Foundry IQ stützt sich auf kuratierte Unternehmensinhalte; File Search verarbeitet Dokumente, die ein Nutzer im Gespräch bereitstellt.',
    },
  ],
  takeaways: [
    { en: 'New RAG for agents: start with Foundry IQ and agentic retrieval; keep classic RAG when you must preserve your own query orchestration.', de: 'Neues RAG für Agents: mit Foundry IQ und Agentic Retrieval starten; klassisches RAG behalten, wenn du deine eigene Abfrage-Orchestrierung erhalten musst.' },
    { en: 'Knowledge sources first, then the knowledge base; wire agents with `MCPTool` + `knowledge_base_retrieve` + a `RemoteTool` project connection.', de: 'Erst Knowledge Sources, dann die Knowledge Base; Agents verdrahtest du mit `MCPTool` + `knowledge_base_retrieve` + einer `RemoteTool`-Projektverbindung.' },
    { en: 'Reasoning effort trades cost and latency for depth: `minimal` < `low` (default) < `medium`.', de: 'Der Reasoning Effort tauscht Kosten und Latenz gegen Tiefe: `minimal` < `low` (Standard) < `medium`.' },
    { en: 'For agents, return extractive data and let the agent cite; answer synthesis is for standalone apps.', de: 'Für Agents Extractive Data zurückgeben und den Agent zitieren lassen; Answer Synthesis ist für eigenständige Apps.' },
    { en: 'Test with factual, multi-document, out-of-scope and ambiguous questions; in production, watch citation and “I don’t know” rates and refine instructions or content.', de: 'Teste mit Fakten-, Mehrdokument-, themenfremden und mehrdeutigen Fragen; beobachte in Produktion die Quote von Zitaten und „Ich weiß es nicht“ und schärfe Instructions oder Inhalte nach.' },
  ],
  sources: [
    { title: 'What is Foundry IQ?', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/what-is-foundry-iq' },
    { title: 'Connect a Foundry IQ knowledge base to Foundry Agent Service', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/foundry-iq-connect' },
    { title: 'Agentic retrieval in Azure AI Search', url: 'https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-overview' },
    { title: 'What is a knowledge source?', url: 'https://learn.microsoft.com/en-us/azure/search/agentic-knowledge-source-overview' },
    { title: 'Memory in Microsoft Foundry Agent Service (preview)', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/what-is-memory' },
  ],
}
