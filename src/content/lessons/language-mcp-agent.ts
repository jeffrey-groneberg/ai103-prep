import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'language-mcp-agent',
  summary: {
    en: 'The **Model Context Protocol (MCP)** is an open standard that lets an agent discover and call tools that an MCP server exposes. The **Azure Language MCP server** (preview) publishes Azure Language features — such as language detection, named entity recognition and PII redaction — as MCP tools at a remote endpoint of your Foundry resource; a local version exists for self-hosting. You connect it once, either from the Tools catalog in the Foundry portal or in code with `MCPTool` plus a project connection that stores the key. From then on the agent\'s model decides by itself which tools a prompt needs — no routing code. Tool calls can require your approval, and your client app talks to the agent through the Responses API.',
    de: 'Das **Model Context Protocol (MCP)** ist ein offener Standard, mit dem ein Agent Tools entdeckt und aufruft, die ein MCP-Server bereitstellt. Der **Azure-Language-MCP-Server** (Preview) stellt Funktionen von Azure Language – etwa Sprachenerkennung, Named Entity Recognition und PII-Schwärzung – als MCP-Tools über einen Remote-Endpoint deiner Foundry-Ressource bereit; eine lokale Variante gibt es zum Selbsthosten. Du verbindest ihn einmal, entweder über den Tool-Katalog im Foundry-Portal oder im Code mit `MCPTool` plus einer Projektverbindung, die den Key speichert. Danach entscheidet das Modell des Agents selbst, welche Tools ein Prompt braucht – ganz ohne Routing-Code. Tool-Aufrufe können deine Freigabe erfordern, und deine Client-App spricht über die Responses API mit dem Agent.',
  },
  examFocus: {
    en: 'Expect questions on the remote endpoint format (`https://<resource>.cognitiveservices.azure.com/language/mcp?api-version=2025-11-15-preview`), how authentication works (a project connection holding `Ocp-Apim-Subscription-Key`), the `MCPTool` settings (`server_label`, `server_url`, `allowed_tools`, `require_approval`, `project_connection_id`), the approval round trip (`mcp_approval_request` → `mcp_approval_response` in the same conversation), and why one agent can call several Language tools in a single turn.',
    de: 'Rechne mit Fragen zum Format des Remote-Endpoints (`https://<resource>.cognitiveservices.azure.com/language/mcp?api-version=2025-11-15-preview`), zur Authentifizierung (eine Projektverbindung mit `Ocp-Apim-Subscription-Key`), zu den `MCPTool`-Einstellungen (`server_label`, `server_url`, `allowed_tools`, `require_approval`, `project_connection_id`), zum Freigabe-Ablauf (`mcp_approval_request` → `mcp_approval_response` in derselben Conversation) und dazu, warum ein Agent mehrere Language-Tools in einer einzigen Runde aufrufen kann.',
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
        { id: 'user', x: 20, y: 170, w: 120, h: 64, label: { en: 'User', de: 'Nutzer:in' }, tone: 'user', shape: 'actor' },
        { id: 'app', x: 180, y: 170, w: 150, h: 64, label: { en: 'Client app', de: 'Client-App' }, sub: 'responses.create', tone: 'app' },
        { id: 'agent', x: 395, y: 100, w: 240, h: 70, label: { en: 'Prompt agent', de: 'Prompt-Agent' }, sub: 'model + MCPTool', tone: 'foundry' },
        { id: 'conn', x: 395, y: 270, w: 240, h: 70, label: { en: 'Project connection', de: 'Projektverbindung' }, sub: 'Ocp-Apim-Subscription-Key', tone: 'safety' },
        { id: 'mcp', x: 700, y: 100, w: 240, h: 70, label: 'Language MCP server', sub: '…/language/mcp', tone: 'tool' },
        { id: 'lang', x: 700, y: 270, w: 240, h: 70, label: 'Azure Language', sub: { en: 'detect · NER · PII …', de: 'Erkennung · NER · PII …' }, tone: 'foundry' },
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
          title: { en: 'Connect the server once', de: 'Server einmal verbinden' },
          text: {
            en: 'In the Foundry portal you pick **Azure Language in Foundry Tools** from the Tools catalog and enter your Foundry resource name and key. Foundry stores the key in a project connection — not in your code.',
            de: 'Im Foundry-Portal wählst du **Azure Language in Foundry Tools** aus dem Tool-Katalog und gibst den Namen deiner Foundry-Ressource und den Key ein. Foundry speichert den Key in einer Projektverbindung – nicht in deinem Code.',
          },
          focus: ['g-proj', 'conn'],
        },
        {
          title: { en: 'Agent plus MCP tool', de: 'Agent plus MCP-Tool' },
          text: {
            en: 'A prompt agent combines a model, instructions and an MCP tool that points at `https://<resource>.cognitiveservices.azure.com/language/mcp?api-version=2025-11-15-preview`. At call time Agent Service injects the credential from the connection.',
            de: 'Ein Prompt-Agent kombiniert Modell, Anweisungen und ein MCP-Tool, das auf `https://<resource>.cognitiveservices.azure.com/language/mcp?api-version=2025-11-15-preview` zeigt. Beim Aufruf setzt Agent Service das Credential aus der Verbindung ein.',
          },
          focus: ['agent', 'e-conn-agent', 'conn'],
        },
        {
          title: { en: 'Dynamic tool discovery', de: 'Dynamische Tool-Erkennung' },
          text: {
            en: 'The agent receives the server\'s tool list with descriptions at runtime. The model picks the tools a prompt needs — one or several per turn — so you write no routing logic.',
            de: 'Der Agent erhält zur Laufzeit die Tool-Liste des Servers samt Beschreibungen. Das Modell wählt die Tools, die ein Prompt braucht – eines oder mehrere pro Runde –, du schreibst also keine Routing-Logik.',
          },
          focus: ['e-agent-mcp', 'mcp'],
        },
        {
          title: { en: 'Azure Language does the NLP', de: 'Azure Language erledigt das NLP' },
          text: {
            en: 'The MCP server runs the matching Azure Language feature, for example language detection, NER or PII redaction, and returns the results to the agent, which writes the answer.',
            de: 'Der MCP-Server führt die passende Azure-Language-Funktion aus, etwa Sprachenerkennung, NER oder PII-Schwärzung, und gibt die Ergebnisse an den Agent zurück, der daraus die Antwort formuliert.',
          },
          focus: ['e-mcp-lang', 'lang'],
        },
        {
          title: { en: 'Your app calls the agent', de: 'Deine App ruft den Agent auf' },
          text: {
            en: 'A client app gets an agent-bound client with `project.get_openai_client(agent_name=…)`, creates a conversation and calls `responses.create()`. The final answer is in `output_text`.',
            de: 'Eine Client-App holt sich mit `project.get_openai_client(agent_name=…)` einen an den Agent gebundenen Client, legt eine Conversation an und ruft `responses.create()` auf. Die finale Antwort steht in `output_text`.',
          },
          focus: ['user', 'e-user-app', 'app', 'e-app-agent'],
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
        { id: 'n1', x: 40, y: 40, w: 240, h: 70, label: { en: 'User prompt', de: 'Nutzer-Prompt' }, sub: { en: '"Redact the PII in …"', de: '„Schwärze die PII in …“' }, tone: 'user', shape: 'pill' },
        { id: 'n2', x: 360, y: 40, w: 240, h: 70, label: { en: 'Model picks tools', de: 'Modell wählt Tools' }, sub: { en: 'reads tool descriptions', de: 'liest Tool-Beschreibungen' }, tone: 'model' },
        { id: 'n3', x: 680, y: 40, w: 240, h: 70, label: 'mcp_approval_request', sub: { en: 'tool name + arguments', de: 'Tool-Name + Argumente' }, tone: 'safety', shape: 'pill' },
        { id: 'n4', x: 680, y: 190, w: 240, h: 70, label: 'mcp_approval_response', sub: { en: 'approve · same conversation', de: 'approve · gleiche Conversation' }, tone: 'app' },
        { id: 'n5', x: 360, y: 190, w: 240, h: 70, label: { en: 'MCP tool runs', de: 'MCP-Tool läuft' }, sub: 'Language MCP server', tone: 'tool' },
        { id: 'n6', x: 40, y: 190, w: 240, h: 70, label: { en: 'Final answer', de: 'Finale Antwort' }, sub: 'output_text', tone: 'model', shape: 'pill' },
      ],
      edges: [
        { id: 'e1', from: 'n1', to: 'n2' },
        { id: 'e2', from: 'n2', to: 'n3' },
        { id: 'e3', from: 'n3', to: 'n4', label: { en: 'review', de: 'prüfen' } },
        { id: 'e4', from: 'n4', to: 'n5' },
        { id: 'e5', from: 'n5', to: 'n6' },
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
            en: 'Because approval is required, the response contains an `mcp_approval_request` item with server label, tool name and arguments. In the agent playground you approve once or always for this tool.',
            de: 'Weil eine Freigabe nötig ist, enthält die Antwort ein `mcp_approval_request`-Item mit Server-Label, Tool-Name und Argumenten. Im Agent-Playground gibst du einmalig oder dauerhaft für dieses Tool frei.',
          },
          focus: ['n3'],
        },
        {
          title: { en: 'Your app decides', de: 'Deine App entscheidet' },
          text: {
            en: 'Your app reviews the call and sends an `mcp_approval_response` with `approve` and `approval_request_id` in the **same** conversation.',
            de: 'Deine App prüft den Aufruf und sendet ein `mcp_approval_response` mit `approve` und `approval_request_id` in **derselben** Conversation.',
          },
          focus: ['e3', 'n4'],
        },
        {
          title: { en: 'Tool runs, answer returns', de: 'Tool läuft, Antwort kommt' },
          text: {
            en: 'The MCP server runs the Azure Language feature, and the agent turns the results into `output_text`. The playground\'s Logs pane shows each tool call with its input and result.',
            de: 'Der MCP-Server führt die Azure-Language-Funktion aus, und der Agent macht aus den Ergebnissen `output_text`. Der Logs-Bereich im Playground zeigt jeden Tool-Aufruf mit Eingabe und Ergebnis.',
          },
          focus: ['e4', 'n5', 'e5', 'n6'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Model Context Protocol (MCP)',
      text: {
        en: 'Open protocol that standardizes how agents use external tools. A **host** (for example Foundry Agent Service) runs the agent, an MCP **client** inside it manages connections, and an MCP **server** exposes tools, resources and prompts.',
        de: 'Offenes Protokoll, das standardisiert, wie Agents externe Tools nutzen. Ein **Host** (etwa Foundry Agent Service) führt den Agent aus, ein MCP-**Client** darin verwaltet die Verbindungen, und ein MCP-**Server** stellt Tools, Ressourcen und Prompts bereit.',
      },
    },
    {
      term: 'Dynamic tool discovery',
      text: {
        en: 'The agent gets the server\'s current tool list and descriptions at runtime and the model chooses tools per prompt. Tools can be added or updated on the server without changing the agent.',
        de: 'Der Agent erhält zur Laufzeit die aktuelle Tool-Liste des Servers samt Beschreibungen, und das Modell wählt die Tools pro Prompt. Tools lassen sich auf dem Server ergänzen oder ändern, ohne den Agent anzupassen.',
      },
    },
    {
      term: 'Azure Language MCP server (preview)',
      text: {
        en: 'Exposes Azure Language as MCP tools: language detection, NER, PII redaction and Text Analytics for health, plus legacy features such as sentiment analysis, summarization, key phrase extraction, conversational language understanding and custom question answering. Remote endpoint: `https://<resource>.cognitiveservices.azure.com/language/mcp?api-version=2025-11-15-preview`.',
        de: 'Stellt Azure Language als MCP-Tools bereit: Sprachenerkennung, NER, PII-Schwärzung und Text Analytics for health, dazu Legacy-Funktionen wie Stimmungsanalyse, Zusammenfassung, Schlüsselwortextraktion, Conversational Language Understanding und Custom Question Answering. Remote-Endpoint: `https://<resource>.cognitiveservices.azure.com/language/mcp?api-version=2025-11-15-preview`.',
      },
    },
    {
      term: 'MCPTool',
      text: {
        en: 'The agent tool definition in `azure-ai-projects`: `server_label` (unique per agent), `server_url`, optional `allowed_tools` (a nonempty list allows only those tools; empty or omitted allows all), `require_approval` (`always` by default, `never`, or per-tool lists) and `project_connection_id`.',
        de: 'Die Tool-Definition für Agents in `azure-ai-projects`: `server_label` (eindeutig pro Agent), `server_url`, optional `allowed_tools` (eine nicht leere Liste erlaubt nur diese Tools; leer oder weggelassen erlaubt alle), `require_approval` (standardmäßig `always`, `never` oder Listen pro Tool) und `project_connection_id`.',
      },
    },
    {
      term: 'Project connection',
      text: {
        en: 'Stores the credentials a tool needs. For the Language MCP server it holds the `Ocp-Apim-Subscription-Key` header, which Agent Service passes to the server at call time. Everyone with access to the project can read a shared key stored there.',
        de: 'Speichert die Credentials, die ein Tool braucht. Für den Language-MCP-Server enthält sie den Header `Ocp-Apim-Subscription-Key`, den Agent Service beim Aufruf an den Server weitergibt. Alle mit Zugriff auf das Projekt können einen dort gespeicherten gemeinsamen Key lesen.',
      },
    },
    {
      term: 'Tool approval',
      text: {
        en: 'When approval is required, the response contains `mcp_approval_request` items. Your app answers with `mcp_approval_response` (`approve`, `approval_request_id`) in the same conversation; the playground offers approve once or always.',
        de: 'Ist eine Freigabe nötig, enthält die Antwort `mcp_approval_request`-Items. Deine App antwortet mit `mcp_approval_response` (`approve`, `approval_request_id`) in derselben Conversation; im Playground gibst du einmalig oder dauerhaft frei.',
      },
    },
    {
      term: 'Remote vs. local server',
      text: {
        en: 'Foundry Agent Service only accepts remote MCP endpoints. The local Language MCP server from the Azure Language samples suits self-hosted MCP clients; to use it from Foundry, host it at a reachable URL, for example on Azure Container Apps or Azure Functions.',
        de: 'Foundry Agent Service akzeptiert nur Remote-MCP-Endpoints. Der lokale Language-MCP-Server aus den Azure-Language-Samples passt zu selbst gehosteten MCP-Clients; um ihn aus Foundry zu nutzen, hostest du ihn unter einer erreichbaren URL, etwa auf Azure Container Apps oder Azure Functions.',
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
        { en: 'Via a function or OpenAPI tool', de: 'Über ein Function- oder OpenAPI-Tool' },
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
    allow_preview=True,  # needed for get_openai_client(agent_name=...) (preview)
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
        model="gpt-4.1",  # your deployment name
        instructions="You analyze text. Use the Azure Language tool for language "
                     "detection, entity recognition and PII redaction.",
        tools=[language_tool],
    ),
)
print(agent.name, agent.version)`,
      notes: [
        {
          en: '`server_url` is the remote Language MCP endpoint of your Foundry resource; `server_label` must be unique within the agent.',
          de: '`server_url` ist der Remote-Language-MCP-Endpoint deiner Foundry-Ressource; `server_label` muss innerhalb des Agents eindeutig sein.',
        },
        {
          en: '`project_connection_id` points at the connection that holds the key, so no secret appears in code. Add `allowed_tools=[...]` to restrict which Language tools the agent may call.',
          de: '`project_connection_id` verweist auf die Verbindung mit dem Key – kein Geheimnis steht im Code. Mit `allowed_tools=[...]` schränkst du ein, welche Language-Tools der Agent aufrufen darf.',
        },
      ],
    },
    {
      title: { en: 'Call the agent and approve its tool calls', de: 'Agent aufrufen und Tool-Aufrufe freigeben' },
      code: `from openai.types.responses.response_input_param import McpApprovalResponse

openai = project.get_openai_client(agent_name="text-analysis-agent")
conversation = openai.conversations.create()

response = openai.responses.create(
    conversation=conversation.id,
    input="Which language is this and who is mentioned? 'Hola, soy Lucía de Contoso.'",
)

approvals = []
for item in response.output:
    if item.type == "mcp_approval_request":
        print("Tool:", item.name, "Arguments:", item.arguments)  # review first
        approvals.append(McpApprovalResponse(
            type="mcp_approval_response", approve=True, approval_request_id=item.id))

if approvals:
    response = openai.responses.create(conversation=conversation.id, input=approvals)
print(response.output_text)`,
      notes: [
        {
          en: '`get_openai_client(agent_name=…)` returns a client bound to the agent, so `responses.create()` needs no `model`.',
          de: '`get_openai_client(agent_name=…)` liefert einen an den Agent gebundenen Client, daher braucht `responses.create()` kein `model`.',
        },
        {
          en: 'Approval responses must go into the same conversation; in production, approve only after checking tool name and arguments.',
          de: 'Freigaben müssen in dieselbe Conversation; in Produktion gibst du erst nach Prüfung von Tool-Name und Argumenten frei.',
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
      en: '`allowed_tools=[]` doesn\'t block anything — an empty list allows **all** tools. Restrict access with a nonempty list of tool names.',
      de: '`allowed_tools=[]` blockiert nichts – eine leere Liste erlaubt **alle** Tools. Schränke den Zugriff mit einer nicht leeren Liste von Tool-Namen ein.',
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
    { en: 'Sensitive data: keep `require_approval` on and restrict `allowed_tools`.', de: 'Sensible Daten: `require_approval` aktiv lassen und `allowed_tools` einschränken.' },
    { en: 'Prefer the core Language tools (detection, NER, PII); legacy ones retire in 2029.', de: 'Bevorzuge die Language-Kerntools (Erkennung, NER, PII); Legacy-Tools laufen 2029 aus.' },
  ],
  sources: [
    { title: 'Azure Language tools and agents', url: 'https://learn.microsoft.com/en-us/azure/ai-services/language-service/concepts/foundry-tools-agents' },
    { title: 'Connect agents to Model Context Protocol servers', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/model-context-protocol' },
    { title: 'MCP server authentication', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/mcp-authentication' },
    { title: 'Quickstart: Get started with Microsoft Foundry SDK', url: 'https://learn.microsoft.com/en-us/azure/foundry/quickstarts/get-started-code' },
  ],
}
