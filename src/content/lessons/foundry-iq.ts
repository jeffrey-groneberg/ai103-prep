import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'foundry-iq',
  summary: {
    en: 'A model only knows what it saw in training, so an agent alone can’t answer questions about your policies, products or last week’s changes. **RAG** (retrieval-augmented generation: retrieve relevant content and ground the answer in it) fixes that. **Foundry IQ** is the managed knowledge layer for this, built on Azure AI Search: you create a **knowledge base** once, attach **knowledge sources** (search index, Blob Storage, OneLake, SharePoint, the web and more), and any number of agents call it as a single **MCP** tool (Model Context Protocol: standard for exposing tools to agents). Behind that tool, **agentic retrieval** plans subqueries, searches the sources in parallel, reranks, merges and returns citable, permission-aware results.',
    de: 'Ein Modell kennt nur seine Trainingsdaten – allein kann ein Agent also keine Fragen zu deinen Richtlinien, Produkten oder den Änderungen der letzten Woche beantworten. **RAG** (Retrieval-Augmented Generation: passende Inhalte abrufen und die Antwort darauf stützen) löst das. **Foundry IQ** ist dafür die verwaltete Wissensschicht auf Basis von Azure AI Search: Du legst einmal eine **Knowledge Base** an, hängst **Knowledge Sources** an (Suchindex, Blob Storage, OneLake, SharePoint, das Web und mehr), und beliebig viele Agents rufen sie als ein einziges **MCP**-Tool auf (Model Context Protocol: Standard, um Agents Tools bereitzustellen). Hinter diesem Tool plant **Agentic Retrieval** Teilabfragen, durchsucht die Quellen parallel, rankt neu, führt zusammen und liefert zitierbare, berechtigungsbewusste Ergebnisse.',
  },
  examFocus: {
    en: 'Expect scenarios that make you pick the right knowledge integration (Foundry IQ knowledge base, Azure AI Search tool, file search or memory), an indexed or remote knowledge source, and a retrieval reasoning effort (`minimal`, `low`, `medium`, or `auto` in preview). Code items test the wiring: `MCPTool` pointing at the knowledge base `/mcp` endpoint with `allowed_tools=["knowledge_base_retrieve"]` and `project_connection_id`, or a direct `retrieve` call from app code. Security items ask which identity needs which role and how per-user permission trimming works.',
    de: 'Rechne mit Szenarien, in denen du die passende Wissensanbindung (Foundry-IQ-Knowledge-Base, Azure AI Search Tool, File Search oder Memory), eine indexierte oder Remote-Knowledge-Source und einen Retrieval Reasoning Effort (`minimal`, `low`, `medium` oder `auto` in der Preview) wählen musst. Code-Aufgaben prüfen die Verdrahtung: `MCPTool` auf den `/mcp`-Endpoint der Knowledge Base mit `allowed_tools=["knowledge_base_retrieve"]` und `project_connection_id` – oder einen direkten `retrieve`-Aufruf aus App-Code. Sicherheitsfragen wollen wissen, welche Identität welche Rolle braucht und wie Berechtigungsfilterung pro Nutzer funktioniert.',
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
      height: 550,
      groups: [
        { id: 'g-proj', x: 160, y: 20, w: 220, h: 135, label: 'Foundry project', tone: 'foundry' },
        { id: 'g-search', x: 400, y: 20, w: 550, h: 360, label: 'Azure AI Search · Foundry IQ', tone: 'data' },
        { id: 'g-ext', x: 520, y: 405, w: 430, h: 125, label: { en: 'External platforms (queried live)', de: 'Externe Plattformen (live abgefragt)' }, tone: 'external' },
      ],
      nodes: [
        { id: 'user', x: 20, y: 63, w: 120, h: 64, label: { en: 'User', de: 'Nutzer' }, icon: 'users', tone: 'user', shape: 'actor' },
        { id: 'agent', x: 180, y: 59, w: 180, h: 72, label: 'Foundry agent', sub: 'knowledge_base_retrieve', icon: 'foundry-agent-service', tone: 'foundry' },
        { id: 'answer', x: 180, y: 185, w: 180, h: 60, label: { en: 'Answer + citations', de: 'Antwort + Zitate' }, sub: { en: 'grounded in sources', de: 'quellenbasiert' }, icon: 'file', tone: 'foundry', shape: 'pill' },
        { id: 'kb', x: 430, y: 59, w: 200, h: 72, label: { en: 'Knowledge base', de: 'Knowledge Base' }, sub: '…/knowledgebases/<kb>/mcp', icon: 'foundry-iq', tone: 'data' },
        { id: 'plan', x: 690, y: 59, w: 240, h: 72, label: { en: 'Query planning', de: 'Abfrageplanung' }, sub: { en: 'via your LLM deployment', de: 'über dein LLM-Deployment' }, icon: 'foundry-models', tone: 'model' },
        { id: 'subq', x: 690, y: 181, w: 240, h: 68, label: { en: 'Parallel subqueries', de: 'Parallele Teilabfragen' }, sub: { en: 'search + semantic rerank', de: 'Suche + Semantic Reranking' }, icon: 'search', tone: 'neutral' },
        { id: 'merge', x: 430, y: 181, w: 200, h: 68, label: { en: 'Merge results', de: 'Ergebnisse mergen' }, sub: { en: 'content + references', de: 'Inhalt + Referenzen' }, icon: 'search', tone: 'neutral' },
        { id: 'idx', x: 405, y: 282, w: 225, h: 80, label: { en: 'Indexed sources', de: 'Indexierte Quellen' }, sub: { en: 'search index on this service\ningested from Blob, OneLake …', de: 'Suchindex auf diesem Dienst\nbefüllt aus Blob, OneLake …' }, icon: 'ai-search', tone: 'data', shape: 'store' },
        { id: 'rem', x: 690, y: 450, w: 240, h: 60, label: { en: 'Remote sources', de: 'Remote-Quellen' }, sub: 'SharePoint · Web · MCP · Work IQ', icon: 'globe', tone: 'external' },
      ],
      edges: [
        { id: 'e-user-agent', from: 'user', to: 'agent' },
        { id: 'e-agent-kb', from: 'agent', to: 'kb', label: 'MCP', bidir: true },
        { id: 'e-kb-plan', from: 'kb', to: 'plan' },
        { id: 'e-plan-subq', from: 'plan', to: 'subq' },
        { id: 'e-subq-idx', from: 'subq', to: 'idx', label: { en: 'index query', de: 'Indexabfrage' }, bidir: true, via: [[810, 322]] },
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
            en: 'Every knowledge base is an MCP server. The agent calls its only supported tool, `knowledge_base_retrieve`, through a **project connection** (stored endpoint + credential that tools reference instead of secrets in code). One knowledge base can serve many agents, so you build retrieval once.',
            de: 'Jede Knowledge Base ist ein MCP-Server. Der Agent ruft ihr einziges unterstütztes Tool `knowledge_base_retrieve` über eine **Projektverbindung** auf (gespeicherter Endpoint + Anmeldedaten, auf die Tools verweisen, statt Geheimnisse im Code). Eine Knowledge Base kann viele Agents bedienen – du baust das Retrieval also nur einmal.',
          },
          focus: ['agent', 'e-agent-kb', 'kb', 'g-search'],
        },
        {
          title: { en: 'Plan the query', de: 'Abfrage planen' },
          text: {
            en: 'At `low` or `medium` retrieval reasoning effort — and at `auto` when a quick first pass isn’t enough — the knowledge base calls the LLM deployment you configured on it. The LLM reads the question and chat history, splits it into focused subqueries and picks knowledge sources. At `minimal`, planning is skipped and the query goes straight to every source.',
            de: 'Bei `low` oder `medium` Retrieval Reasoning Effort – und bei `auto`, wenn ein schneller erster Durchgang nicht reicht – ruft die Knowledge Base das LLM-Deployment auf, das du auf ihr konfiguriert hast. Das LLM liest Frage und Chatverlauf, zerlegt sie in fokussierte Teilabfragen und wählt Knowledge Sources aus. Bei `minimal` entfällt die Planung, und die Abfrage geht direkt an alle Quellen.',
          },
          focus: ['kb', 'e-kb-plan', 'plan'],
        },
        {
          title: { en: 'Search in parallel', de: 'Parallel suchen' },
          text: {
            en: 'Subqueries run at the same time as keyword, vector or hybrid searches. Indexed sources were ingested ahead of time into search indexes on this service, so they’re queried locally; remote sources such as SharePoint (Copilot Retrieval API) or the web (Bing) stay on their own platforms and are queried live. All results go through the same semantic reranking.',
            de: 'Die Teilabfragen laufen gleichzeitig als Keyword-, Vektor- oder Hybridsuche. Indexierte Quellen wurden vorab in Suchindizes auf diesem Dienst aufgenommen und werden daher lokal abgefragt; Remote-Quellen wie SharePoint (Copilot Retrieval API) oder das Web (Bing) bleiben auf ihren eigenen Plattformen und werden live abgefragt. Alle Treffer durchlaufen dasselbe semantische Reranking.',
          },
          focus: ['e-plan-subq', 'subq', 'e-subq-idx', 'e-subq-rem', 'idx', 'rem', 'g-ext'],
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
        en: 'Two identities do the work: the connection’s identity (here the project’s managed identity) reads the knowledge base, the search service’s managed identity calls the LLM. The user’s own token decides what they may see.',
        de: 'Zwei Identitäten erledigen die Arbeit: Die Identität der Verbindung (hier die Managed Identity des Projekts) liest die Knowledge Base, die Managed Identity des Suchdienstes ruft das LLM auf. Das Token des Nutzers entscheidet, was er sehen darf.',
      },
      width: 960,
      height: 420,
      groups: [
        { id: 'g-res', x: 160, y: 20, w: 370, h: 380, label: 'Foundry resource', tone: 'foundry' },
        { id: 'g-proj2', x: 180, y: 60, w: 330, h: 160, label: 'Foundry project', tone: 'foundry' },
        { id: 'g-search2', x: 570, y: 20, w: 380, h: 380, label: 'Azure AI Search', tone: 'data' },
      ],
      nodes: [
        { id: 'w-user', x: 20, y: 110, w: 110, h: 72, label: { en: 'User', de: 'Nutzer' }, icon: 'users', tone: 'user', shape: 'actor' },
        { id: 'w-agent', x: 190, y: 110, w: 141, h: 72, label: 'Foundry agent', sub: 'MCPTool', icon: 'foundry-agent-service', tone: 'foundry' },
        { id: 'w-conn', x: 360, y: 110, w: 121, h: 72, label: { en: 'Connection', de: 'Verbindung' }, sub: 'RemoteTool', icon: 'resource-linked', tone: 'safety' },
        { id: 'w-llm', x: 335, y: 290, w: 159, h: 72, label: { en: 'LLM deployment', de: 'LLM-Deployment' }, sub: { en: 'query planning', de: 'Abfrageplanung' }, icon: 'foundry-models', tone: 'model', shape: 'store' },
        { id: 'w-kb', x: 660, y: 110, w: 250, h: 72, label: { en: 'Knowledge base', de: 'Knowledge Base' }, sub: '…/knowledgebases/<kb>/mcp', icon: 'foundry-iq', tone: 'data' },
        { id: 'w-ks', x: 660, y: 290, w: 250, h: 72, label: { en: 'Knowledge sources', de: 'Knowledge Sources' }, sub: { en: 'ACLs · sensitivity labels', de: 'ACLs · Vertraulichkeitslabels' }, icon: 'foundry-iq', tone: 'data', shape: 'store' },
      ],
      edges: [
        { id: 'w-e-user', from: 'w-user', to: 'w-agent', label: { en: 'token', de: 'Token' } },
        { id: 'w-e-tool', from: 'w-agent', to: 'w-conn' },
        { id: 'w-e-conn', from: 'w-conn', to: 'w-kb', label: { en: 'project MI + user token', de: 'Projekt-MI + Nutzer-Token' } },
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
            en: 'The connection’s authentication type decides which identity Azure AI Search sees: with `ProjectManagedIdentity` (as here) it’s the project’s managed identity, with an agent-identity connection the agent’s own identity — that one gets **Search Index Data Reader** on the search service. The search service’s managed identity needs **Cognitive Services User** on the Foundry resource whenever the knowledge base has an LLM configured.',
            de: 'Der Authentifizierungstyp der Verbindung bestimmt, welche Identität Azure AI Search sieht: bei `ProjectManagedIdentity` (wie hier) die Managed Identity des Projekts, bei einer Agent-Identity-Verbindung die eigene Identität des Agents – diese bekommt **Search Index Data Reader** auf dem Suchdienst. Die Managed Identity des Suchdienstes braucht **Cognitive Services User** auf der Foundry-Ressource, sobald auf der Knowledge Base ein LLM konfiguriert ist.',
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
            en: 'For permission-protected content, the user’s Azure AI Search token travels in the `x-ms-query-source-authorization` header, next to the connection’s project-MI token on every MCP call to the knowledge base, which trims the results from the knowledge sources. If the request to the agent carries a signed-in user’s token, Agent Service sets the header itself; if your backend calls with its own identity, pass each user’s token as a structured input (see the first code sample). Without it, permission-enabled sources return results unfiltered.',
            de: 'Für berechtigungsgeschützte Inhalte reist das Azure-AI-Search-Token des Nutzers im Header `x-ms-query-source-authorization` – bei jedem MCP-Aufruf an die Knowledge Base neben dem Projekt-MI-Token der Verbindung; die Knowledge Base filtert damit die Treffer aus den Knowledge Sources. Trägt die Anfrage an den Agent das Token eines angemeldeten Nutzers, setzt Agent Service den Header selbst; ruft dein Backend mit eigener Identität auf, übergibst du das Token jedes Nutzers als Structured Input (siehe erstes Codebeispiel). Ohne Header liefern berechtigungsfähige Quellen ungefilterte Ergebnisse.',
          },
          focus: ['w-user', 'w-e-user', 'w-agent', 'w-e-tool', 'w-conn', 'w-e-conn', 'w-kb', 'w-e-ks', 'w-ks'],
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
      term: 'Foundry IQ and knowledge bases',
      text: {
        en: 'Foundry IQ is the managed knowledge layer for agents, built on Azure AI Search agentic retrieval (Azure AI Search is required). Its core object, the **knowledge base**, groups knowledge sources behind one endpoint, stores the retrieval settings (reasoning effort, output mode, retrieval instructions, optional LLM) and exposes a `retrieve` action plus an MCP endpoint with the `knowledge_base_retrieve` tool. Portal path: **Build** › **Knowledge** (connect a search service, add knowledge sources, set properties) → **Build** › **Agents** (connect the knowledge base, test in the playground); in code, Python’s `SearchIndexClient.create_or_update_knowledge_base()`.',
        de: 'Foundry IQ ist die verwaltete Wissensschicht für Agents, gebaut auf Agentic Retrieval von Azure AI Search (Azure AI Search ist Pflicht). Ihr zentrales Objekt, die **Knowledge Base**, bündelt Knowledge Sources hinter einem Endpoint, speichert die Retrieval-Einstellungen (Reasoning Effort, Output Mode, Retrieval Instructions, optionales LLM) und bietet eine `retrieve`-Aktion plus einen MCP-Endpoint mit dem Tool `knowledge_base_retrieve`. Portalweg: **Build** › **Knowledge** (Suchdienst verbinden, Knowledge Sources hinzufügen, Eigenschaften setzen) → **Build** › **Agents** (Knowledge Base verbinden, im Playground testen); im Code in Python `SearchIndexClient.create_or_update_knowledge_base()`.',
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
        en: 'How much LLM work agentic retrieval does — `minimal`, `low`, `medium` or `auto` (see the table). Set it on the knowledge base; a retrieve request can override it. `low` is the default of the preview API (`2026-08-01-preview`) and needs an LLM on the knowledge base; without one, use `minimal`. `auto` exists only in `2026-08-01-preview` and also needs a model: the service starts with a lightweight retrieval pass and adds LLM query planning, up to `medium`, only when that pass doesn’t ground the answer. The GA API (`2026-04-01`) always retrieves at the minimal, extractive level.',
        de: 'Wie viel LLM-Arbeit Agentic Retrieval leistet – `minimal`, `low`, `medium` oder `auto` (siehe Tabelle). Du setzt ihn auf der Knowledge Base; ein Retrieve-Request kann ihn überschreiben. `low` ist der Standard der Preview-API (`2026-08-01-preview`) und braucht ein LLM auf der Knowledge Base; ohne LLM nutzt du `minimal`. `auto` gibt es nur in `2026-08-01-preview`, und es braucht ebenfalls ein Modell: Der Dienst startet mit einem leichtgewichtigen Retrieval-Durchgang und plant nur dann per LLM nach – bis `medium` –, wenn dieser Durchgang die Antwort nicht ausreichend stützt. Die GA-API (`2026-04-01`) ruft immer auf minimaler, extraktiver Stufe ab.',
      },
    },
    {
      term: 'Extractive data vs answer synthesis',
      text: {
        en: '**Extractive data** returns the raw, citable chunks so the agent can reason over them — the recommended output for Foundry IQ agents. **Answer synthesis** (preview) lets the knowledge base’s LLM write a finished answer with `[ref_id:n]` citations; reserve it for standalone apps that show the retrieval output directly to users. Web sources are the one exception to “raw”: their content always arrives as LLM-written cited summaries, even with extractive output.',
        de: '**Extractive Data** liefert die rohen, zitierbaren Chunks, damit der Agent darüber nachdenken kann – die empfohlene Ausgabe für Foundry-IQ-Agents. Bei **Answer Synthesis** (Preview) schreibt das LLM der Knowledge Base eine fertige Antwort mit `[ref_id:n]`-Zitaten; nutze das nur für eigenständige Apps, die das Retrieval-Ergebnis direkt anzeigen. Web-Quellen sind die Ausnahme vom „roh“: Ihr Inhalt kommt immer als vom LLM geschriebene, zitierte Zusammenfassung – auch bei extraktiver Ausgabe.',
      },
    },
    {
      term: 'Agent memory (preview)',
      text: {
        en: 'Long-term memory in Foundry Agent Service: a **memory store** (chat + embedding model) extracts, consolidates and retrieves user profile, chat summary and procedural memories across sessions. Attach the memory search tool to a **prompt agent** (declarative agent: model + instructions + tools, versioned in Foundry); `scope="{{$userId}}"` isolates memories per user.',
        de: 'Langzeitgedächtnis in Foundry Agent Service: Ein **Memory Store** (Chat- und Embedding-Modell) extrahiert, konsolidiert und liefert Nutzerprofil-, Chat-Summary- und prozedurale Memories über Sitzungen hinweg. Hänge das Memory-Search-Tool an einen **Prompt Agent** (deklarativer Agent: Modell + Instructions + Tools, in Foundry versioniert); `scope="{{$userId}}"` trennt die Memories pro Nutzer.',
      },
    },
    {
      term: 'Choosing a knowledge integration',
      text: {
        en: 'Curated content from several sources, shared by many agents → Foundry IQ knowledge base. One existing index with a fixed `index_name`, `query_type` or `filter` → Azure AI Search tool. Files a user provides in the conversation → file search (vector store). Learned user facts → memory. Current public web → Web Search tool or Web IQ. The user’s Microsoft 365 mail and meetings → Work IQ. Business entities, relationships and measures modeled in Microsoft Fabric (ontology, Power BI semantic model, data agent) → Fabric IQ (preview), as an agent tool or as a Fabric Ontology or Fabric Data Agent knowledge source.',
        de: 'Kuratierte Inhalte aus mehreren Quellen, von vielen Agents genutzt → Foundry-IQ-Knowledge-Base. Ein bestehender Index mit festem `index_name`, `query_type` oder `filter` → Azure AI Search Tool. Dateien, die ein Nutzer im Gespräch bereitstellt → File Search (Vector Store). Gelernte Nutzerfakten → Memory. Aktuelles öffentliches Web → Web Search Tool oder Web IQ. Mails und Meetings des Nutzers in Microsoft 365 → Work IQ. In Microsoft Fabric modellierte Geschäftsobjekte, Beziehungen und Kennzahlen (Ontologie, Power-BI-Semantikmodell, Data Agent) → Fabric IQ (Preview), als Agent-Tool oder als Knowledge Source vom Typ Fabric Ontology bzw. Fabric Data Agent.',
      },
    },
  ],
  comparison: {
    title: { en: 'Retrieval reasoning effort at a glance (preview API)', de: 'Retrieval Reasoning Effort im Überblick (Preview-API)' },
    columns: [
      { en: 'Effort', de: 'Effort' },
      { en: 'LLM query planning', de: 'LLM-Abfrageplanung' },
      { en: 'Extra retrieval pass', de: 'Zusätzlicher Retrieval-Durchgang' },
      { en: 'Web knowledge source', de: 'Web-Knowledge-Source' },
      { en: 'Answer synthesis', de: 'Answer Synthesis' },
      { en: 'Cost and latency', de: 'Kosten und Latenz' },
    ],
    rows: [
      [
        '`minimal`',
        { en: 'No — every source is searched', de: 'Nein – jede Quelle wird durchsucht' },
        { en: 'No', de: 'Nein' },
        { en: 'Not supported', de: 'Nicht unterstützt' },
        { en: 'Not supported (extractive only)', de: 'Nicht unterstützt (nur extraktiv)' },
        { en: 'Lowest', de: 'Am niedrigsten' },
      ],
      [
        { en: '`low` (preview default)', de: '`low` (Preview-Standard)' },
        { en: 'One pass: subqueries and source selection', de: 'Ein Durchgang: Teilabfragen und Quellenauswahl' },
        { en: 'No', de: 'Nein' },
        { en: 'Supported', de: 'Unterstützt' },
        { en: 'Optional (preview)', de: 'Optional (Preview)' },
        { en: 'Balanced', de: 'Ausgewogen' },
      ],
      [
        '`medium`',
        { en: 'Yes, plus a semantic classifier', de: 'Ja, plus semantischer Klassifizierer' },
        { en: 'At most one, when results are weak', de: 'Höchstens einer, wenn Treffer schwach sind' },
        { en: 'Supported', de: 'Unterstützt' },
        { en: 'Optional (preview)', de: 'Optional (Preview)' },
        { en: 'Highest; select regions only', de: 'Am höchsten; nur ausgewählte Regionen' },
      ],
      [
        '`auto`',
        { en: 'Only if a lightweight first pass isn’t enough', de: 'Nur wenn ein leichter erster Durchgang nicht reicht' },
        { en: 'As needed, up to `medium`', de: 'Bei Bedarf, bis `medium`' },
        { en: 'Not stated in the docs', de: 'In der Doku nicht angegeben' },
        { en: 'Not stated in the docs', de: 'In der Doku nicht angegeben' },
        { en: 'Balanced per request by the service', de: 'Vom Dienst pro Anfrage abgewogen' },
      ],
    ],
  },
  code: [
    {
      title: { en: 'Give a prompt agent a Foundry IQ knowledge base', de: 'Einem Prompt Agent eine Foundry-IQ-Knowledge-Base geben' },
      code: `from azure.identity import DefaultAzureCredential, get_bearer_token_provider
from azure.ai.projects import AIProjectClient
from azure.ai.projects.models import MCPTool, PromptAgentDefinition, StructuredInputDefinition

credential = DefaultAzureCredential()
project = AIProjectClient(
    endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
    credential=credential,
    allow_preview=True,  # agent endpoint (preview): the SDK reference asks for this flag
)
kb_tool = MCPTool(
    server_label="knowledge-base",
    server_url=("https://<search>.search.windows.net/knowledgebases/hr-policy-kb/mcp"
                "?api-version=2026-08-01-preview"),
    require_approval="never",
    allowed_tools=["knowledge_base_retrieve"],
    project_connection_id="hr-kb-mcp",          # RemoteTool connection (project MI)
    headers={"x-ms-query-source-authorization": "{{search_auth_token}}"},
)
agent = project.agents.create_version(
    agent_name="hr-assistant",
    definition=PromptAgentDefinition(
        model="gpt-5-mini",  # deployment name
        instructions=(
            "Use the knowledge base tool to answer every question and cite the "
            "retrieved sources. If the knowledge base has no answer, say \\"I don't know\\"."
        ),
        tools=[kb_tool],
        structured_inputs={"search_auth_token": StructuredInputDefinition(
            description="Per-user Azure AI Search token", required=True, schema={"type": "string"},
        )},
    ),
)

# Demo uses your own token; in production pass each signed-in user's token
user_token = get_bearer_token_provider(credential, "https://search.azure.com/.default")()
openai = project.get_openai_client(agent_name=agent.name)
conversation = openai.conversations.create()
response = openai.responses.create(
    conversation=conversation.id,
    input="How many vacation days do I get?",
    extra_body={"structured_inputs": {"search_auth_token": user_token}},
)
print(response.output_text)`,
      notes: [
        {
          en: '`knowledge_base_retrieve` is the only knowledge base tool Foundry Agent Service supports; explicit instructions raise the tool-call rate and enforce citations plus an “I don’t know” fallback.',
          de: '`knowledge_base_retrieve` ist das einzige Knowledge-Base-Tool, das Foundry Agent Service unterstützt; explizite Instructions erhöhen die Tool-Aufrufquote und erzwingen Zitate sowie ein „Ich weiß es nicht“ als Rückfallantwort.',
        },
        {
          en: 'A **structured input** is a named value declared in the agent definition and filled per request through `extra_body`; `{{search_auth_token}}` copies it into the `x-ms-query-source-authorization` header. Use it when your backend calls the agent with its own identity — if the request already carries a signed-in user’s token, Agent Service sets the header itself.',
          de: 'Ein **Structured Input** ist ein benannter Wert, den die Agent-Definition deklariert und den du pro Anfrage über `extra_body` füllst; `{{search_auth_token}}` übernimmt ihn in den Header `x-ms-query-source-authorization`. Nutze ihn, wenn dein Backend den Agent mit eigener Identität aufruft – trägt die Anfrage schon das Token eines angemeldeten Nutzers, setzt Agent Service den Header selbst.',
        },
        {
          en: '`model` takes a deployment name, which can be any name you chose. A **conversation** is a durable item store for multi-turn state, and `responses.create` calls the **Responses API** (OpenAI-compatible API that returns a response object; keeps state via `previous_response_id` or a conversation).',
          de: '`model` erwartet einen Deployment-Namen, den du frei wählen kannst. Eine **Conversation** ist ein dauerhafter Item-Speicher für mehrstufigen Zustand, und `responses.create` ruft die **Responses API** auf (OpenAI-kompatible API, die ein Response-Objekt liefert; hält Zustand über `previous_response_id` oder eine Conversation).',
        },
      ],
    },
    {
      title: { en: 'Call the knowledge base directly from app or workflow code', de: 'Die Knowledge Base direkt aus App- oder Workflow-Code aufrufen' },
      code: `# pip install --pre azure-search-documents azure-identity   (preview SDK)
from azure.identity import DefaultAzureCredential
from azure.search.documents.knowledgebases import KnowledgeBaseRetrievalClient
from azure.search.documents.knowledgebases.models import (
    KnowledgeBaseMessage,
    KnowledgeBaseMessageTextContent,
    KnowledgeBaseRetrievalRequest,
    KnowledgeRetrievalMediumReasoningEffort,
)

kb_client = KnowledgeBaseRetrievalClient(
    endpoint="https://<search>.search.windows.net",
    knowledge_base_name="hr-policy-kb",
    credential=DefaultAzureCredential(),
)
request = KnowledgeBaseRetrievalRequest(
    messages=[KnowledgeBaseMessage(
        role="user",
        content=[KnowledgeBaseMessageTextContent(
            text="Compare parental leave for full-time and part-time staff.")],
    )],
    retrieval_reasoning_effort=KnowledgeRetrievalMediumReasoningEffort(),  # this request only
)
result = kb_client.retrieve(request)
print(result.response[0].content[0].text)   # JSON chunks, each with a ref_id for citations`,
      notes: [
        {
          en: '`messages` (chat-style input), query planning and a per-request effort override need the preview API `2026-08-01-preview`. The GA API `2026-04-01` takes `intents` instead — plain search strings such as `KnowledgeRetrievalSemanticIntent(search=…)` — and always retrieves at the minimal level. `medium` runs only in select regions.',
          de: '`messages` (chat-artiger Input), Query Planning und ein Effort-Override pro Anfrage brauchen die Preview-API `2026-08-01-preview`. Die GA-API `2026-04-01` nimmt stattdessen `intents` – reine Suchstrings wie `KnowledgeRetrievalSemanticIntent(search=…)` – und ruft immer auf minimaler Stufe ab. `medium` läuft nur in ausgewählten Regionen.',
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
      en: 'Setting `minimal` reasoning effort (preview API) means no query planning, no answer synthesis and no web knowledge source. Don’t pick it when multi-part questions must be decomposed.',
      de: '`minimal` als Reasoning Effort (Preview-API) heißt: keine Abfrageplanung, keine Answer Synthesis und keine Web-Knowledge-Source. Wähle es nicht, wenn mehrteilige Fragen zerlegt werden müssen.',
    },
    {
      en: 'For indexed sources, permission trimming needs both halves: permission metadata ingested with `ingestionPermissionOptions` and the user’s token on the request. Missing either one returns results unfiltered.',
      de: 'Bei indexierten Quellen braucht Berechtigungsfilterung beide Hälften: mit `ingestionPermissionOptions` aufgenommene Berechtigungsmetadaten und das Token des Nutzers in der Anfrage. Fehlt eines davon, kommen die Ergebnisse ungefiltert.',
    },
    {
      en: 'A 403 from Azure AI Search means the identity the connection authenticates with — the project’s managed identity or the agent identity — lacks **Search Index Data Reader**. **Cognitive Services User** is a different assignment: the search service’s identity on the Foundry resource, needed whenever the knowledge base has an LLM configured (`low`, `medium`, answer synthesis, web sources).',
      de: 'Ein 403 von Azure AI Search heißt: Der Identität, mit der sich die Verbindung anmeldet – Managed Identity des Projekts oder Agent-Identität –, fehlt **Search Index Data Reader**. **Cognitive Services User** ist eine andere Zuweisung: die Identität des Suchdienstes auf der Foundry-Ressource, nötig, sobald auf der Knowledge Base ein LLM konfiguriert ist (`low`, `medium`, Answer Synthesis, Web-Quellen).',
    },
    {
      en: 'Memory is not a knowledge base: memory stores learned, user-specific facts; Foundry IQ grounds on curated organizational content; file search handles documents a user provides in the conversation.',
      de: 'Memory ist keine Knowledge Base: Memory speichert gelernte, nutzerspezifische Fakten; Foundry IQ stützt sich auf kuratierte Unternehmensinhalte; File Search verarbeitet Dokumente, die ein Nutzer im Gespräch bereitstellt.',
    },
  ],
  takeaways: [
    { en: 'New RAG for agents: start with Foundry IQ and agentic retrieval; keep classic RAG when you must preserve your own query orchestration.', de: 'Neues RAG für Agents: mit Foundry IQ und Agentic Retrieval starten; klassisches RAG behalten, wenn du deine eigene Abfrage-Orchestrierung erhalten musst.' },
    { en: 'Knowledge sources first, then the knowledge base; wire agents with `MCPTool` + `knowledge_base_retrieve` + a `RemoteTool` project connection.', de: 'Erst Knowledge Sources, dann die Knowledge Base; Agents verdrahtest du mit `MCPTool` + `knowledge_base_retrieve` + einer `RemoteTool`-Projektverbindung.' },
    { en: 'Reasoning effort trades cost and latency for depth: `minimal` < `low` (preview default) < `medium`; `auto` (preview) lets the service pick the depth per request, up to `medium`.', de: 'Der Reasoning Effort tauscht Kosten und Latenz gegen Tiefe: `minimal` < `low` (Preview-Standard) < `medium`; mit `auto` (Preview) wählt der Dienst die Tiefe pro Anfrage, bis `medium`.' },
    { en: 'For agents, return extractive data and let the agent cite; answer synthesis is for standalone apps.', de: 'Für Agents Extractive Data zurückgeben und den Agent zitieren lassen; Answer Synthesis ist für eigenständige Apps.' },
    { en: 'Test with factual, multi-document, out-of-scope and ambiguous questions; in production, watch citation and “I don’t know” rates and refine instructions or content.', de: 'Teste mit Fakten-, Mehrdokument-, themenfremden und mehrdeutigen Fragen; beobachte in Produktion die Quote von Zitaten und „Ich weiß es nicht“ und schärfe Instructions oder Inhalte nach.' },
  ],
  sources: [
    { title: 'What is Foundry IQ?', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/what-is-foundry-iq' },
    { title: 'Connect a Foundry IQ knowledge base to Foundry Agent Service', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/foundry-iq-connect' },
    { title: 'Agentic retrieval in Azure AI Search', url: 'https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-overview' },
    { title: 'What is a knowledge source?', url: 'https://learn.microsoft.com/en-us/azure/search/agentic-knowledge-source-overview' },
    { title: 'Memory in Microsoft Foundry Agent Service (preview)', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/what-is-memory' },
    { title: 'Connect agents to Microsoft Fabric with Fabric IQ (preview)', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/fabric-iq' },
  ],
}
