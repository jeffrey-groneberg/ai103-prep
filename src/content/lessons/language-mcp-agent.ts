import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'language-mcp-agent',
  summary: {
    en: '**MCP** (Model Context Protocol: standard for exposing tools to agents) lets an agent discover and call the tools that an MCP server publishes. The **Azure Language MCP server** (preview) publishes Azure Language features — such as language detection, named entity recognition and PII redaction — as tools at a remote endpoint of your Foundry resource; a local version exists for self-hosting. You attach it to a **prompt agent** (declarative agent: model + instructions + tools, versioned in Foundry) from the portal\'s Tools catalog or in code with `MCPTool`, and the Language key lives in a **project connection** (stored endpoint + credential that tools reference instead of secrets in code). The agent\'s model then decides by itself which tools a prompt needs — no routing code. Your app calls the agent through the **Responses API** (OpenAI-compatible API that returns a response object; keeps state via `previous_response_id` or a conversation) inside a **conversation** (durable item store for multi-turn state) and approves tool calls when required.',
    de: '**MCP** (Model Context Protocol: Standard, mit dem Tools für Agents bereitgestellt werden) lässt einen Agent die Tools entdecken und aufrufen, die ein MCP-Server veröffentlicht. Der **Azure-Language-MCP-Server** (Preview) stellt Funktionen von Azure Language – etwa Sprachenerkennung, Named Entity Recognition und PII-Schwärzung – als Tools über einen Remote-Endpoint deiner Foundry-Ressource bereit; eine lokale Variante gibt es zum Selbsthosten. Du hängst ihn an einen **Prompt-Agent** (deklarativer Agent: Modell + Anweisungen + Tools, versioniert in Foundry) – über den Tool-Katalog im Portal oder im Code mit `MCPTool` –, und der Language-Key liegt in einer **Projektverbindung** (gespeicherter Endpoint + Credential, auf die Tools verweisen statt auf Geheimnisse im Code). Danach entscheidet das Modell des Agents selbst, welche Tools ein Prompt braucht – ganz ohne Routing-Code. Deine App ruft den Agent über die **Responses API** (OpenAI-kompatible API, die ein Response-Objekt zurückgibt; hält den Zustand über `previous_response_id` oder eine Conversation) in einer **Conversation** (dauerhafter Item-Speicher für Zustand über mehrere Runden) auf und gibt Tool-Aufrufe frei, wenn das nötig ist.',
  },
  examFocus: {
    en: 'Expect questions on the remote endpoint format (`https://<resource>.cognitiveservices.azure.com/language/mcp?api-version=2025-11-15-preview`), how authentication works (a project connection holding `Ocp-Apim-Subscription-Key`), the `MCPTool` settings (`server_label`, `server_url`, `allowed_tools`, `require_approval`, `project_connection_id`), the approval round trip (`mcp_approval_request` → `mcp_approval_response` in the same conversation, repeated until no request is left), and why one agent can call several Language tools in a single turn.',
    de: 'Rechne mit Fragen zum Format des Remote-Endpoints (`https://<resource>.cognitiveservices.azure.com/language/mcp?api-version=2025-11-15-preview`), zur Authentifizierung (eine Projektverbindung mit `Ocp-Apim-Subscription-Key`), zu den `MCPTool`-Einstellungen (`server_label`, `server_url`, `allowed_tools`, `require_approval`, `project_connection_id`), zum Freigabe-Ablauf (`mcp_approval_request` → `mcp_approval_response` in derselben Conversation, wiederholt, bis keine Anfrage mehr offen ist) und dazu, warum ein Agent mehrere Language-Tools in einer einzigen Runde aufrufen kann.',
  },
  diagrams: [
    {
      id: 'mcp-big-picture',
      title: { en: 'An agent that borrows Azure Language through MCP', de: 'Ein Agent, der Azure Language über MCP nutzt' },
      caption: {
        en: 'The key lives in a project connection, the agent discovers the Language tools at runtime, and your app only talks to the agent.',
        de: 'Der Key liegt in einer Projektverbindung, der Agent entdeckt die Language-Tools zur Laufzeit, und deine App spricht nur mit dem Agent.',
      },
      width: 960,
      height: 400,
      groups: [{ id: 'g-proj', x: 370, y: 50, w: 290, h: 320, label: 'Foundry project', tone: 'foundry' }],
      nodes: [
        { id: 'user', x: 20, y: 170, w: 120, h: 64, label: { en: 'User', de: 'Nutzer:in' }, icon: 'users', tone: 'user', shape: 'actor' },
        { id: 'app', x: 180, y: 170, w: 150, h: 64, label: { en: 'Client app', de: 'Client-App' }, sub: 'responses.create', icon: 'browser', tone: 'app' },
        { id: 'agent', x: 395, y: 100, w: 220, h: 70, label: { en: 'Prompt agent', de: 'Prompt-Agent' }, sub: 'model + MCPTool', icon: 'foundry-agent-service', tone: 'foundry' },
        { id: 'conn', x: 395, y: 270, w: 220, h: 70, label: { en: 'Project connection', de: 'Projektverbindung' }, sub: 'Ocp-Apim-Subscription-Key', icon: 'resource-linked', tone: 'safety' },
        { id: 'mcp', x: 700, y: 100, w: 240, h: 70, label: 'Language MCP server', sub: '…/language/mcp', icon: 'language', tone: 'tool' },
        { id: 'lang', x: 700, y: 270, w: 240, h: 70, label: 'Azure Language', sub: { en: 'detect · NER · PII …', de: 'Erkennung · NER · PII …' }, icon: 'language', tone: 'foundry' },
      ],
      edges: [
        { id: 'e-user-app', from: 'user', to: 'app' },
        { id: 'e-app-agent', from: 'app', to: 'agent', bidir: true },
        { id: 'e-conn-agent', from: 'conn', to: 'agent', label: { en: 'credential', de: 'Credential' }, dashed: true },
        { id: 'e-agent-mcp', from: 'agent', to: 'mcp', label: 'MCP', bidir: true },
        { id: 'e-mcp-lang', from: 'mcp', to: 'lang', label: { en: 'NLP calls', de: 'NLP-Aufrufe' } },
      ],
      steps: [
        {
          title: { en: 'Setup: connect the server once', de: 'Einrichtung: Server einmal verbinden' },
          text: {
            en: 'In the Foundry portal you pick **Azure Language in Foundry Tools** from the Tools catalog and enter your Foundry resource name and key. Foundry stores the key in a project connection — not in your code.',
            de: 'Im Foundry-Portal wählst du **Azure Language in Foundry Tools** aus dem Tool-Katalog und gibst den Namen deiner Foundry-Ressource und den Key ein. Foundry speichert den Key in einer Projektverbindung – nicht in deinem Code.',
          },
          focus: ['g-proj', 'conn'],
        },
        {
          title: { en: 'Setup: agent plus MCP tool', de: 'Einrichtung: Agent plus MCP-Tool' },
          text: {
            en: 'A prompt agent combines a model, instructions and an MCP tool that points at `https://<resource>.cognitiveservices.azure.com/language/mcp?api-version=2025-11-15-preview`. At call time Foundry Agent Service injects the credential from the connection.',
            de: 'Ein Prompt-Agent kombiniert Modell, Anweisungen und ein MCP-Tool, das auf `https://<resource>.cognitiveservices.azure.com/language/mcp?api-version=2025-11-15-preview` zeigt. Beim Aufruf setzt Foundry Agent Service das Credential aus der Verbindung ein.',
          },
          focus: ['agent', 'e-conn-agent', 'conn'],
        },
        {
          title: { en: 'Run time: your app calls the agent', de: 'Laufzeit: Deine App ruft den Agent auf' },
          text: {
            en: 'Your app sends the user\'s prompt with `responses.create()` on `project.get_openai_client()`, inside a conversation and with `extra_body={"agent_reference": {"name": …, "type": "agent_reference"}}` naming the agent.',
            de: 'Deine App schickt den Prompt mit `responses.create()` über `project.get_openai_client()`, in einer Conversation und mit `extra_body={"agent_reference": {"name": …, "type": "agent_reference"}}`, das den Agent benennt.',
          },
          focus: ['user', 'e-user-app', 'app', 'e-app-agent'],
        },
        {
          title: { en: 'Run time: dynamic tool discovery', de: 'Laufzeit: dynamische Tool-Erkennung' },
          text: {
            en: 'The agent receives the server\'s tool list with descriptions. The model picks the tools the prompt needs — one or several per turn — so you write no routing logic.',
            de: 'Der Agent erhält die Tool-Liste des Servers samt Beschreibungen. Das Modell wählt die Tools, die der Prompt braucht – eines oder mehrere pro Runde –, du schreibst also keine Routing-Logik.',
          },
          focus: ['e-agent-mcp', 'mcp'],
        },
        {
          title: { en: 'Run time: Language works, answer returns', de: 'Laufzeit: Language arbeitet, Antwort kommt zurück' },
          text: {
            en: 'The MCP server runs the matching Azure Language feature, for example language detection, NER or PII redaction, and returns the results to the agent. The agent writes the answer, which your app reads from `output_text`. With `require_approval="always"` (the default), your app approves each tool call first — see the next diagram.',
            de: 'Der MCP-Server führt die passende Azure-Language-Funktion aus, etwa Sprachenerkennung, NER oder PII-Schwärzung, und gibt die Ergebnisse an den Agent zurück. Der Agent formuliert die Antwort, die deine App aus `output_text` liest. Mit `require_approval="always"` (Standard) gibt deine App vorher jeden Tool-Aufruf frei – siehe nächstes Diagramm.',
          },
          focus: ['e-mcp-lang', 'lang', 'e-agent-mcp', 'agent', 'e-app-agent', 'app'],
        },
      ],
    },
    {
      id: 'mcp-approval',
      title: { en: 'One tool call with approval, step by step', de: 'Ein Tool-Aufruf mit Freigabe, Schritt für Schritt' },
      caption: {
        en: 'With `require_approval="always"` (the default) the agent pauses before every MCP call until your app approves it.',
        de: 'Mit `require_approval="always"` (Standard) pausiert der Agent vor jedem MCP-Aufruf, bis deine App ihn freigibt.',
      },
      width: 960,
      height: 300,
      nodes: [
        { id: 'n1', x: 40, y: 40, w: 240, h: 70, label: { en: 'User prompt', de: 'Nutzer-Prompt' }, sub: { en: '"Redact the PII in …"', de: '„Schwärze die PII in …“' }, icon: 'users', tone: 'user', shape: 'pill' },
        { id: 'n2', x: 360, y: 40, w: 240, h: 70, label: { en: 'Model picks tools', de: 'Modell wählt Tools' }, sub: { en: 'reads tool descriptions', de: 'liest Tool-Beschreibungen' }, icon: 'foundry-models', tone: 'model' },
        { id: 'n3', x: 680, y: 40, w: 240, h: 70, label: 'mcp_approval_request', sub: { en: 'tool name + arguments', de: 'Tool-Name + Argumente' }, icon: 'conditional-access', tone: 'safety', shape: 'pill' },
        { id: 'n4', x: 680, y: 190, w: 240, h: 70, label: 'mcp_approval_response', sub: { en: 'approve · same conversation', de: 'approve · gleiche Conversation' }, icon: 'code', tone: 'app' },
        { id: 'n5', x: 360, y: 190, w: 240, h: 70, label: { en: 'MCP tool runs', de: 'MCP-Tool läuft' }, sub: 'Language MCP server', icon: 'language', tone: 'tool' },
        { id: 'n6', x: 40, y: 190, w: 240, h: 70, label: { en: 'Final answer', de: 'Finale Antwort' }, sub: 'output_text', icon: 'foundry-models', tone: 'model', shape: 'pill' },
      ],
      edges: [
        { id: 'e1', from: 'n1', to: 'n2' },
        { id: 'e2', from: 'n2', to: 'n3' },
        { id: 'e3', from: 'n3', to: 'n4', label: { en: 'review', de: 'prüfen' } },
        { id: 'e4', from: 'n4', to: 'n5' },
        { id: 'e5', from: 'n5', to: 'n6' },
        { id: 'e6', from: 'n5', to: 'n2', label: { en: 'more tools?', de: 'weitere Tools?' }, dashed: true },
      ],
      steps: [
        {
          title: { en: 'Prompt arrives', de: 'Prompt kommt an' },
          text: {
            en: 'The client app sends the user\'s request to the agent inside a conversation.',
            de: 'Die Client-App schickt die Anfrage der Nutzerin oder des Nutzers in einer Conversation an den Agent.',
          },
          focus: ['n1', 'e1'],
        },
        {
          title: { en: 'Model chooses tools', de: 'Modell wählt Tools' },
          text: {
            en: 'The model compares the request with the MCP tool descriptions and decides which Language tools to call — possibly several in the same turn.',
            de: 'Das Modell vergleicht die Anfrage mit den Beschreibungen der MCP-Tools und entscheidet, welche Language-Tools es aufruft – eventuell mehrere in derselben Runde.',
          },
          focus: ['n2', 'e2'],
        },
        {
          title: { en: 'Approval requested', de: 'Freigabe angefragt' },
          text: {
            en: 'Because approval is required, the response contains an `mcp_approval_request` item with server label, tool name and arguments. In the agent playground you approve once, or choose *Always approve all Azure Language in Foundry Tools tools* so it stops asking.',
            de: 'Weil eine Freigabe nötig ist, enthält die Antwort ein `mcp_approval_request`-Item mit Server-Label, Tool-Name und Argumenten. Im Agent-Playground gibst du einmalig frei oder wählst *Always approve all Azure Language in Foundry Tools tools*, damit nicht mehr gefragt wird.',
          },
          focus: ['n3'],
        },
        {
          title: { en: 'Your app decides', de: 'Deine App entscheidet' },
          text: {
            en: 'Your app reviews the call and sends an `mcp_approval_response` with `approve` and `approval_request_id` in the **same** conversation — the documented flow for prompt agents. `previous_response_id` isn\'t supported with the Copilot harness (an optional preview runtime for prompt agents).',
            de: 'Deine App prüft den Aufruf und sendet ein `mcp_approval_response` mit `approve` und `approval_request_id` in **derselben** Conversation – der dokumentierte Ablauf für Prompt-Agents. `previous_response_id` wird mit dem Copilot-Harness (optionale Preview-Laufzeit für Prompt-Agents) nicht unterstützt.',
          },
          focus: ['e3', 'n4'],
        },
        {
          title: { en: 'Tool runs, answer returns', de: 'Tool läuft, Antwort kommt' },
          text: {
            en: 'The MCP server runs the Azure Language feature and hands the results back to the model. If it needs another tool (dashed arrow), a new approval request arrives — repeat until none is left; then the agent writes `output_text`. The playground\'s Logs pane shows each tool call with input and result.',
            de: 'Der MCP-Server führt die Azure-Language-Funktion aus und gibt die Ergebnisse an das Modell zurück. Braucht es ein weiteres Tool (gestrichelter Pfeil), kommt eine neue Freigabeanfrage – wiederhole, bis keine mehr offen ist; dann schreibt der Agent `output_text`. Der Logs-Bereich im Playground zeigt jeden Tool-Aufruf mit Eingabe und Ergebnis.',
          },
          focus: ['e4', 'n5', 'e6', 'e5', 'n6'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Model Context Protocol (MCP)',
      text: {
        en: 'MCP has a **host** that runs the agent (for example Foundry Agent Service), an MCP **client** inside it, and an MCP **server** that exposes tools, resources and prompts. The agent fetches the server\'s tool list with descriptions at run time (*dynamic tool discovery*), so tools can change on the server without changing the agent.',
        de: 'MCP hat einen **Host**, der den Agent ausführt (etwa Foundry Agent Service), einen MCP-**Client** darin und einen MCP-**Server**, der Tools, Ressourcen und Prompts bereitstellt. Der Agent holt die Tool-Liste des Servers samt Beschreibungen zur Laufzeit (*dynamische Tool-Erkennung*) – Tools können sich auf dem Server ändern, ohne dass du den Agent anpasst.',
      },
    },
    {
      term: 'Azure Language MCP server (preview)',
      text: {
        en: 'Exposes language detection, NER, PII redaction and Text Analytics for health, plus legacy features such as sentiment analysis, summarization, key phrase extraction, conversational language understanding and custom question answering. Remote endpoint: `https://<resource>.cognitiveservices.azure.com/language/mcp?api-version=2025-11-15-preview`. A local server from the Azure Language samples suits self-hosted MCP clients, but Foundry Agent Service only accepts remote endpoints — host it at a reachable URL (for example on Azure Container Apps) first.',
        de: 'Stellt Sprachenerkennung, NER, PII-Schwärzung und Text Analytics for health bereit, dazu Legacy-Funktionen wie Stimmungsanalyse, Zusammenfassung, Schlüsselwortextraktion, Conversational Language Understanding und Custom Question Answering. Remote-Endpoint: `https://<resource>.cognitiveservices.azure.com/language/mcp?api-version=2025-11-15-preview`. Ein lokaler Server aus den Azure-Language-Samples passt zu selbst gehosteten MCP-Clients, Foundry Agent Service akzeptiert aber nur Remote-Endpoints – hoste ihn also zuerst unter einer erreichbaren URL (etwa auf Azure Container Apps).',
      },
    },
    {
      term: 'Prompt agent',
      text: {
        en: 'The declarative counterpart of a hosted agent (your own agent code in a container that Foundry runs). `project.agents.create_version(agent_name=…, definition=PromptAgentDefinition(model=…, instructions=…, tools=[…]))` creates the agent or a new version of it; Foundry Agent Service, the managed platform for building, deploying and scaling agents, runs it.',
        de: 'Das deklarative Gegenstück zum Hosted Agent (dein eigener Agent-Code in einem Container, den Foundry ausführt). `project.agents.create_version(agent_name=…, definition=PromptAgentDefinition(model=…, instructions=…, tools=[…]))` legt den Agent oder eine neue Version davon an; Foundry Agent Service, die verwaltete Plattform zum Bauen, Bereitstellen und Skalieren von Agents, führt ihn aus.',
      },
    },
    {
      term: 'Responses API and conversations',
      text: {
        en: 'Your app calls a prompt agent through the Responses API, usually inside a conversation: `project.get_openai_client()` plus `extra_body={"agent_reference": {"name": …, "type": "agent_reference"}}`. The shortcut `get_openai_client(agent_name=…)` requires `AIProjectClient(..., allow_preview=True)`, otherwise it raises `ValueError`.',
        de: 'Deine App ruft einen Prompt-Agent über die Responses API auf, meist in einer Conversation: `project.get_openai_client()` plus `extra_body={"agent_reference": {"name": …, "type": "agent_reference"}}`. Die Abkürzung `get_openai_client(agent_name=…)` verlangt `AIProjectClient(..., allow_preview=True)`, sonst gibt es einen `ValueError`.',
      },
    },
    {
      term: 'MCPTool',
      text: {
        en: 'Tool definition in `azure-ai-projects` with `server_label` (unique per agent), `server_url`, `project_connection_id`, `allowed_tools` and `require_approval`. A nonempty `allowed_tools` list allows only those tools, for example `["detect_language_from_text", "extract_named_entities_from_text"]` (copy exact names from the playground\'s Logs pane); empty or omitted allows all. `require_approval` is `"always"` (default), `"never"`, or per tool `{"never": {"tool_names": [...]}}` / `{"always": {"tool_names": [...]}}`.',
        de: 'Tool-Definition in `azure-ai-projects` mit `server_label` (eindeutig pro Agent), `server_url`, `project_connection_id`, `allowed_tools` und `require_approval`. Eine nicht leere `allowed_tools`-Liste erlaubt nur diese Tools, etwa `["detect_language_from_text", "extract_named_entities_from_text"]` (exakte Namen zeigt der Logs-Bereich im Playground); leer oder weggelassen erlaubt alle. `require_approval` ist `"always"` (Standard), `"never"` oder pro Tool `{"never": {"tool_names": [...]}}` / `{"always": {"tool_names": [...]}}`.',
      },
    },
    {
      term: 'Project connection',
      text: {
        en: 'For Azure Language it is a *Custom keys* connection with key name `Ocp-Apim-Subscription-Key`. The Tools catalog creates it, or you add it once in the portal (**Connected resources**) or with a Bicep template — for MCP authentication that needs Foundry Project Manager. `project_connection_id` takes its ID; the Learn samples simply pass the connection name. Two separate layers: your app reaches the project with Microsoft Entra ID (`DefaultAzureCredential`, Foundry User role), Agent Service reaches Azure Language with the stored key — kept out of code and source control, though everyone with project access can read it.',
        de: 'Für Azure Language ist das eine *Custom keys*-Verbindung mit dem Schlüsselnamen `Ocp-Apim-Subscription-Key`. Der Tool-Katalog legt sie an, oder du fügst sie einmal im Portal (**Connected resources**) oder per Bicep-Vorlage hinzu – für MCP-Authentifizierung braucht das Foundry Project Manager. `project_connection_id` erwartet ihre ID; die Learn-Samples übergeben einfach den Verbindungsnamen. Zwei getrennte Ebenen: Deine App erreicht das Projekt per Microsoft Entra ID (`DefaultAzureCredential`, Rolle Foundry User), Agent Service erreicht Azure Language mit dem gespeicherten Key – der bleibt aus Code und Quellcodeverwaltung heraus, ist aber für alle mit Projektzugriff lesbar.',
      },
    },
    {
      term: 'Tool approval',
      text: {
        en: 'Answer every `mcp_approval_request` (server label, tool name, arguments) with an `mcp_approval_response` (`approve`, `approval_request_id`) in the same conversation until no new request arrives — the documented flow for prompt agents; `previous_response_id` isn\'t supported with the Copilot harness.',
        de: 'Beantworte jedes `mcp_approval_request` (Server-Label, Tool-Name, Argumente) mit einem `mcp_approval_response` (`approve`, `approval_request_id`) in derselben Conversation, bis keine neue Anfrage mehr kommt – der dokumentierte Ablauf für Prompt-Agents; `previous_response_id` wird mit dem Copilot-Harness nicht unterstützt.',
      },
    },
  ],
  comparison: {
    title: { en: 'Three ways to put Azure Language to work', de: 'Drei Wege, Azure Language einzusetzen' },
    columns: [
      { en: 'Aspect', de: 'Aspekt' },
      { en: 'Direct SDK call', de: 'Direkter SDK-Aufruf' },
      { en: 'Agent + remote MCP server', de: 'Agent + Remote-MCP-Server' },
      { en: 'Local MCP server', de: 'Lokaler MCP-Server' },
    ],
    rows: [
      [
        { en: 'Who picks the feature', de: 'Wer wählt die Funktion' },
        { en: 'Your code (fixed pipeline)', de: 'Dein Code (feste Pipeline)' },
        { en: 'The agent\'s model, from tool descriptions', de: 'Das Modell des Agents, anhand der Tool-Beschreibungen' },
        { en: 'The model in your own MCP client', de: 'Das Modell in deinem eigenen MCP-Client' },
      ],
      [
        { en: 'Setup', de: 'Einrichtung' },
        'TextAnalyticsClient + endpoint',
        { en: 'Tools catalog or MCPTool + project connection', de: 'Tool-Katalog oder MCPTool + Projektverbindung' },
        { en: 'Run the sample server yourself', de: 'Den Beispielserver selbst betreiben' },
      ],
      [
        { en: 'Usable from Foundry Agent Service', de: 'Nutzbar aus Foundry Agent Service' },
        { en: 'Via a function tool (your code) or an OpenAPI tool (REST API described by an OpenAPI spec)', de: 'Über ein Function Tool (dein Code) oder ein OpenAPI-Tool (per OpenAPI-Spezifikation beschriebene REST-API)' },
        { en: 'Yes', de: 'Ja' },
        { en: 'Only once hosted at a remote URL', de: 'Erst wenn unter einer Remote-URL gehostet' },
      ],
      [
        { en: 'Best for', de: 'Ideal für' },
        { en: 'Deterministic batch processing', de: 'Deterministische Stapelverarbeitung' },
        { en: 'Conversational, multi-task requests', de: 'Dialogorientierte Anfragen mit mehreren Aufgaben' },
        { en: 'Self-hosted environments', de: 'Selbst gehostete Umgebungen' },
      ],
    ],
  },
  code: [
    {
      title: { en: 'Create an agent with the Azure Language MCP tool', de: 'Agent mit dem Azure-Language-MCP-Tool anlegen' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient
from azure.ai.projects.models import MCPTool, PromptAgentDefinition

project = AIProjectClient(
    endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
    credential=DefaultAzureCredential(),
)

language_tool = MCPTool(
    server_label="azure-language",
    server_url="https://<resource>.cognitiveservices.azure.com/language/mcp"
               "?api-version=2025-11-15-preview",
    project_connection_id="<language-connection>",  # stores Ocp-Apim-Subscription-Key
    require_approval="always",
)

agent = project.agents.create_version(
    agent_name="text-analysis-agent",
    definition=PromptAgentDefinition(
        model="gpt-5-mini",  # deployment name
        instructions="You analyze text. Use the Azure Language tool for language "
                     "detection, entity recognition and PII redaction.",
        tools=[language_tool],
    ),
)
print(agent.name, agent.version)`,
      notes: [
        {
          en: '`server_url` is the remote Language MCP endpoint of your Foundry resource; `server_label` must be unique within the agent. `model` takes your deployment name, which can be any name you chose.',
          de: '`server_url` ist der Remote-Language-MCP-Endpoint deiner Foundry-Ressource; `server_label` muss innerhalb des Agents eindeutig sein. `model` erwartet deinen Deployment-Namen, den du frei wählen kannst.',
        },
        {
          en: '`project_connection_id` points at the connection that holds the key, so no secret appears in code. Add `allowed_tools=["detect_language_from_text", "extract_named_entities_from_text"]` (names as shown in the playground\'s Logs pane) to allow only those Language tools.',
          de: '`project_connection_id` verweist auf die Verbindung mit dem Key – kein Geheimnis steht im Code. Mit `allowed_tools=["detect_language_from_text", "extract_named_entities_from_text"]` (Namen wie im Logs-Bereich des Playgrounds) erlaubst du nur diese Language-Tools.',
        },
      ],
    },
    {
      title: { en: 'Call the agent and approve its tool calls', de: 'Agent aufrufen und Tool-Aufrufe freigeben' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient
from openai.types.responses.response_input_param import McpApprovalResponse

project = AIProjectClient(
    endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
    credential=DefaultAzureCredential(),
)
openai = project.get_openai_client()
agent = {"agent_reference": {"name": "text-analysis-agent", "type": "agent_reference"}}
conversation = openai.conversations.create()

response = openai.responses.create(
    conversation=conversation.id,
    input="Which language is this and who is mentioned? 'Hola, soy Lucía de Contoso.'",
    extra_body=agent,
)
while pending := [i for i in response.output if i.type == "mcp_approval_request"]:
    for item in pending:
        print("Tool:", item.name, "Arguments:", item.arguments)  # review before approving
    response = openai.responses.create(
        conversation=conversation.id,
        input=[McpApprovalResponse(type="mcp_approval_response", approve=True,
                                   approval_request_id=item.id) for item in pending],
        extra_body=agent,
    )
print(response.output_text)`,
      notes: [
        {
          en: '`extra_body={"agent_reference": …}` routes the call to your prompt agent, so `responses.create()` needs no `model`.',
          de: '`extra_body={"agent_reference": …}` leitet den Aufruf an deinen Prompt-Agent, daher braucht `responses.create()` kein `model`.',
        },
        {
          en: 'The loop answers approval requests in the same conversation until none is left; in production, approve only after checking tool name and arguments.',
          de: 'Die Schleife beantwortet Freigabeanfragen in derselben Conversation, bis keine mehr offen ist; in Produktion gibst du erst nach Prüfung von Tool-Name und Argumenten frei.',
        },
      ],
    },
  ],
  traps: [
    {
      en: 'Foundry Agent Service only accepts **remote** MCP endpoints. A Language MCP server running on your laptop isn\'t reachable — use the remote endpoint or host the server, for example on Azure Container Apps.',
      de: 'Foundry Agent Service akzeptiert nur **Remote**-MCP-Endpoints. Ein Language-MCP-Server auf deinem Laptop ist nicht erreichbar – nutze den Remote-Endpoint oder hoste den Server, etwa auf Azure Container Apps.',
    },
    {
      en: '`allowed_tools=[]` doesn\'t block anything — an empty list allows **all** tools. Restrict access with a nonempty list of tool names, for example `["extract_named_entities_from_text"]`.',
      de: '`allowed_tools=[]` blockiert nichts – eine leere Liste erlaubt **alle** Tools. Schränke den Zugriff mit einer nicht leeren Liste von Tool-Namen ein, etwa `["extract_named_entities_from_text"]`.',
    },
    {
      en: 'Answer an `mcp_approval_request` with an `mcp_approval_response` in the **same** conversation; otherwise the agent never continues.',
      de: 'Beantworte ein `mcp_approval_request` mit einem `mcp_approval_response` in **derselben** Conversation; sonst setzt der Agent nie fort.',
    },
    {
      en: 'The MCP `server_url` is built from your resource name on `cognitiveservices.azure.com` plus `/language/mcp?api-version=…` — not from the project endpoint `…/api/projects/<project>`.',
      de: 'Die MCP-`server_url` setzt sich aus deinem Ressourcennamen auf `cognitiveservices.azure.com` plus `/language/mcp?api-version=…` zusammen – nicht aus dem Project Endpoint `…/api/projects/<project>`.',
    },
    {
      en: 'Never put the Language key into instructions or code; store it in the project connection. Treat tool descriptions and tool results from MCP servers as untrusted input.',
      de: 'Schreib den Language-Key nie in Anweisungen oder Code, sondern in die Projektverbindung. Behandle Tool-Beschreibungen und Tool-Ergebnisse von MCP-Servern als nicht vertrauenswürdige Eingaben.',
    },
  ],
  takeaways: [
    { en: 'MCP means tools are discovered at runtime: the model chooses, you don\'t route.', de: 'MCP heißt: Tools werden zur Laufzeit entdeckt – das Modell wählt, du routest nicht.' },
    { en: 'Connect once (Tools catalog or `MCPTool` + project connection), then reuse it in prompt agents.', de: 'Einmal verbinden (Tool-Katalog oder `MCPTool` + Projektverbindung), dann in Prompt-Agents wiederverwenden.' },
    { en: 'Sensitive data: keep `require_approval="always"` (the default) and restrict `allowed_tools`.', de: 'Sensible Daten: `require_approval="always"` (Standard) beibehalten und `allowed_tools` einschränken.' },
    { en: 'Prefer the core Language tools (detection, NER, PII); legacy ones retire in 2029.', de: 'Bevorzuge die Language-Kerntools (Erkennung, NER, PII); Legacy-Tools laufen 2029 aus.' },
  ],
  sources: [
    { title: 'Azure Language tools and agents', url: 'https://learn.microsoft.com/en-us/azure/ai-services/language-service/concepts/foundry-tools-agents' },
    { title: 'Connect agents to Model Context Protocol servers', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/model-context-protocol' },
    { title: 'MCP server authentication', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/mcp-authentication' },
    { title: 'Quickstart: Get started with Microsoft Foundry SDK', url: 'https://learn.microsoft.com/en-us/azure/foundry/quickstarts/get-started-code' },
    { title: 'AIProjectClient class', url: 'https://learn.microsoft.com/en-us/python/api/azure-ai-projects/azure.ai.projects.aiprojectclient' },
  ],
}
