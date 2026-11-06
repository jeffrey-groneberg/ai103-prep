import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'mcp-tools',
  summary: {
    en: 'The **Model Context Protocol (MCP)** is an open standard for how applications offer tools and context to models. An **MCP server** publishes tools with names, descriptions and input schemas; an **MCP client** discovers them at runtime and calls them, so you can add or change tools on the server without touching the agent — “integrate once”. In Foundry Agent Service you attach a remote server with the **MCP tool** (`server_label`, `server_url`), restrict what the model may use with `allowed_tools`, keep a human in the loop with `require_approval`, and store credentials in a **project connection**. Alternatively, your own code can act as the MCP client and expose the server’s tools to the agent as function tools.',
    de: 'Das **Model Context Protocol (MCP)** ist ein offener Standard dafür, wie Anwendungen Modellen Tools und Kontext anbieten. Ein **MCP-Server** veröffentlicht Tools mit Namen, Beschreibungen und Eingabeschemas; ein **MCP-Client** entdeckt sie zur Laufzeit und ruft sie auf – so änderst du Tools auf dem Server, ohne den Agent anzufassen („einmal integrieren“). In Foundry Agent Service bindest du einen Remote-Server mit dem **MCP-Tool** an (`server_label`, `server_url`), schränkst mit `allowed_tools` ein, was das Modell nutzen darf, hältst mit `require_approval` einen Menschen in der Schleife und speicherst Zugangsdaten in einer **Projektverbindung**. Alternativ agiert dein eigener Code als MCP-Client und stellt die Server-Tools dem Agent als Function Tools bereit.',
  },
  examFocus: {
    en: 'Expect questions on server vs client roles, why new server tools appear without redeploying, the MCP tool parameters (`server_label`, `server_url`, `allowed_tools`, `require_approval`, `project_connection_id`), the approval round trip (`mcp_approval_request` → `mcp_approval_response` with `approval_request_id` in the same conversation), the trap that an empty `allowed_tools` list allows everything, authentication choices, remote-only endpoints, and governance with toolboxes or an AI gateway.',
    de: 'Rechne mit Fragen zu den Rollen von Server und Client, warum neue Server-Tools ohne Redeployment erscheinen, zu den Parametern des MCP-Tools (`server_label`, `server_url`, `allowed_tools`, `require_approval`, `project_connection_id`), zur Freigabeschleife (`mcp_approval_request` → `mcp_approval_response` mit `approval_request_id` in derselben Conversation), zur Falle, dass eine leere `allowed_tools`-Liste alles erlaubt, zu Authentifizierungsoptionen, reinen Remote-Endpoints sowie zur Governance mit Toolboxes oder einem AI Gateway.',
  },
  diagrams: [
    {
      id: 'mcp-approval-flow',
      title: { en: 'Agent ↔ MCP server: discovery, allowlist, approval', de: 'Agent ↔ MCP-Server: Discovery, Allowlist, Freigabe' },
      caption: {
        en: 'The service discovers the server’s tools, filters them with allowed_tools, and pauses for a human decision before an approved call reaches the server with credentials from a project connection.',
        de: 'Der Dienst entdeckt die Tools des Servers, filtert sie mit allowed_tools und wartet auf eine menschliche Entscheidung, bevor ein freigegebener Aufruf mit Zugangsdaten aus einer Projektverbindung den Server erreicht.',
      },
      width: 960,
      height: 440,
      groups: [{ id: 'g-fas', x: 260, y: 20, w: 420, h: 400, label: 'Foundry Agent Service', tone: 'foundry' }],
      nodes: [
        { id: 'reviewer', x: 20, y: 40, w: 170, h: 64, label: { en: 'Human reviewer', de: 'Prüfende Person' }, tone: 'user', shape: 'actor' },
        { id: 'app', x: 20, y: 190, w: 190, h: 74, label: { en: 'Your app', de: 'Deine App' }, sub: { en: 'approval UI + loop', de: 'Freigabe-UI + Schleife' }, tone: 'app' },
        { id: 'agent', x: 290, y: 60, w: 360, h: 70, label: 'Agent version', sub: 'MCPTool(server_label, server_url)', tone: 'foundry' },
        { id: 'filter', x: 290, y: 180, w: 160, h: 70, label: 'allowed_tools', sub: { en: 'listed tools only', de: 'nur gelistete Tools' }, tone: 'safety' },
        { id: 'gate', x: 490, y: 180, w: 160, h: 70, label: { en: 'Approval?', de: 'Freigabe?' }, sub: 'require_approval', tone: 'safety', shape: 'diamond' },
        { id: 'conn', x: 290, y: 320, w: 360, h: 70, label: 'Project connection', sub: { en: 'keys, tokens or Entra identity', de: 'Keys, Tokens oder Entra-Identität' }, tone: 'safety' },
        { id: 'server', x: 740, y: 178, w: 200, h: 74, label: 'MCP server', sub: { en: 'remote endpoint', de: 'Remote-Endpoint' }, tone: 'external' },
      ],
      edges: [
        { id: 'e-review', from: 'reviewer', to: 'app', label: { en: 'review', de: 'prüfen' }, bidir: true },
        { id: 'e-request', from: 'app', to: 'agent', label: 'responses.create', via: [[240, 227], [240, 95]] },
        { id: 'e-discover', from: 'agent', to: 'server', label: 'tools/list', via: [[840, 95]] },
        { id: 'e-filter', from: 'agent', to: 'filter' },
        { id: 'e-gate', from: 'filter', to: 'gate' },
        { id: 'e-approval', from: 'gate', to: 'app', label: { en: 'request ⇄ response', de: 'Anfrage ⇄ Antwort' }, bidir: true, via: [[570, 285], [115, 285]] },
        { id: 'e-call', from: 'gate', to: 'server', label: 'tools/call' },
        { id: 'e-auth', from: 'conn', to: 'server', label: { en: 'auth', de: 'Auth' }, dashed: true, via: [[840, 355]] },
      ],
      steps: [
        {
          title: { en: 'Connect and discover', de: 'Verbinden und entdecken' },
          text: {
            en: 'The MCP tool in the agent version names the server: a `server_label` that is unique within the agent and a `server_url`. When your app sends a request, the service lists the server’s tools — no per-tool code in the agent.',
            de: 'Das MCP-Tool in der Agent Version benennt den Server: ein innerhalb des Agents eindeutiges `server_label` und eine `server_url`. Wenn deine App eine Anfrage sendet, listet der Dienst die Tools des Servers – ohne Code pro Tool im Agent.',
          },
          focus: ['app', 'e-request', 'agent', 'e-discover', 'server'],
        },
        {
          title: { en: 'Allow only what is needed', de: 'Nur Nötiges erlauben' },
          text: {
            en: '`allowed_tools` narrows the list the model may call. A non-empty list is an allowlist; omitting it or passing `[]` exposes every tool on the server.',
            de: '`allowed_tools` schränkt die Liste ein, die das Modell aufrufen darf. Eine nicht leere Liste ist eine Allowlist; fehlt sie oder ist sie `[]`, ist jedes Tool des Servers verfügbar.',
          },
          focus: ['e-filter', 'filter'],
        },
        {
          title: { en: 'Pause for approval', de: 'Für die Freigabe anhalten' },
          text: {
            en: 'With `require_approval` (default `always`) the response contains an `mcp_approval_request` with server label, tool name and arguments. Your app shows it to a human reviewer.',
            de: 'Mit `require_approval` (Standard `always`) enthält die Antwort ein `mcp_approval_request` mit Server-Label, Tool-Name und Argumenten. Deine App zeigt es einer prüfenden Person.',
          },
          focus: ['e-gate', 'gate', 'e-approval', 'app', 'e-review', 'reviewer'],
        },
        {
          title: { en: 'Decide and run', de: 'Entscheiden und ausführen' },
          text: {
            en: 'The app sends an `mcp_approval_response` — `approve` true or false, `approval_request_id` set to the request item’s `id` — in the same conversation. Only approved calls reach the server through `tools/call`.',
            de: 'Die App sendet ein `mcp_approval_response` – `approve` true oder false, `approval_request_id` gleich der `id` des Anfrage-Items – in derselben Conversation. Nur freigegebene Aufrufe erreichen den Server über `tools/call`.',
          },
          focus: ['e-approval', 'gate', 'e-call', 'server'],
        },
        {
          title: { en: 'Keep secrets out of code', de: 'Secrets aus dem Code halten' },
          text: {
            en: 'Credentials live in a project connection referenced by `project_connection_id`: a shared key, a Microsoft Entra identity (agent identity or project managed identity) or OAuth identity passthrough per user.',
            de: 'Zugangsdaten liegen in einer Projektverbindung, auf die `project_connection_id` verweist: ein geteilter Key, eine Microsoft-Entra-Identität (Agent-Identität oder Projekt-Managed-Identity) oder OAuth-Identity-Passthrough pro Nutzer.',
          },
          focus: ['conn', 'e-auth'],
        },
      ],
    },
    {
      id: 'mcp-two-ways',
      title: { en: 'Two ways to consume MCP tools', de: 'Zwei Wege, MCP-Tools zu nutzen' },
      caption: {
        en: 'Either Foundry is the MCP client (server-side MCP tool), or your code is the client and turns MCP tools into function tools (the module’s client/server pattern).',
        de: 'Entweder ist Foundry der MCP-Client (serverseitiges MCP-Tool), oder dein Code ist der Client und macht aus MCP-Tools Function Tools (das Client/Server-Muster des Moduls).',
      },
      width: 960,
      height: 400,
      groups: [
        { id: 'g-server', x: 10, y: 10, w: 940, h: 170, label: { en: 'Server-side: Foundry MCP tool', de: 'Serverseitig: Foundry-MCP-Tool' }, tone: 'foundry' },
        { id: 'g-client', x: 10, y: 210, w: 940, h: 180, label: { en: 'Client-side: MCP client in your code', de: 'Clientseitig: MCP-Client in deinem Code' }, tone: 'app' },
      ],
      nodes: [
        { id: 'a1', x: 30, y: 60, w: 200, h: 70, label: 'Agent version', sub: { en: 'MCPTool + approvals', de: 'MCPTool + Freigaben' }, tone: 'foundry' },
        { id: 'a2', x: 380, y: 60, w: 200, h: 70, label: { en: 'Agent Service runtime', de: 'Agent-Service-Runtime' }, sub: { en: 'acts as MCP client', de: 'agiert als MCP-Client' }, tone: 'foundry' },
        { id: 'a3', x: 730, y: 60, w: 200, h: 70, label: { en: 'Remote MCP server', de: 'Remote-MCP-Server' }, sub: { en: 'Container Apps or Functions', de: 'Container Apps oder Functions' }, tone: 'external' },
        { id: 'b1', x: 30, y: 270, w: 200, h: 70, label: { en: 'Your app', de: 'Deine App' }, sub: { en: 'MCP client session', de: 'MCP-Client-Session' }, tone: 'app' },
        { id: 'b2', x: 380, y: 270, w: 200, h: 70, label: 'Function tools', sub: { en: 'one per listed MCP tool', de: 'eins je gelistetem MCP-Tool' }, tone: 'tool' },
        { id: 'b3', x: 730, y: 270, w: 200, h: 70, label: { en: 'Any MCP server', de: 'Beliebiger MCP-Server' }, sub: { en: 'local (stdio) or remote', de: 'lokal (stdio) oder remote' }, tone: 'external' },
      ],
      edges: [
        { id: 'ea1', from: 'a1', to: 'a2', label: { en: 'per request', de: 'pro Anfrage' } },
        { id: 'ea2', from: 'a2', to: 'a3', label: 'tools/list + call' },
        { id: 'eb1', from: 'b1', to: 'b2', label: 'list_tools()' },
        { id: 'eb2', from: 'b2', to: 'b3', label: 'call_tool()' },
      ],
      steps: [
        {
          title: { en: 'Server-side: Foundry is the client', de: 'Serverseitig: Foundry ist der Client' },
          text: {
            en: 'Add an `MCPTool` to the agent and the service discovers tools, applies `allowed_tools` and approvals, and authenticates through project connections. The server must be a remote endpoint, and non-streaming calls time out after 100 seconds.',
            de: 'Füge dem Agent ein `MCPTool` hinzu, und der Dienst entdeckt Tools, wendet `allowed_tools` und Freigaben an und authentifiziert sich über Projektverbindungen. Der Server muss ein Remote-Endpoint sein, und Aufrufe ohne Streaming laufen nach 100 Sekunden ab.',
          },
          focus: ['g-server', 'a1', 'ea1', 'a2', 'ea2', 'a3'],
        },
        {
          title: { en: 'Client-side: your code discovers', de: 'Clientseitig: dein Code entdeckt' },
          text: {
            en: 'Your code opens an MCP client session, calls `list_tools()` and registers each tool as a function tool — the pattern of the module’s exercise. The agent then returns `function_call` items for those tools.',
            de: 'Dein Code öffnet eine MCP-Client-Session, ruft `list_tools()` auf und registriert jedes Tool als Function Tool – das Muster aus der Übung des Moduls. Der Agent liefert dann `function_call`-Items für diese Tools.',
          },
          focus: ['g-client', 'b1', 'eb1', 'b2'],
        },
        {
          title: { en: 'Client-side: your code calls', de: 'Clientseitig: dein Code ruft auf' },
          text: {
            en: 'For each `function_call`, your code runs `call_tool()` on the MCP server and returns the result as `function_call_output`. Use this for local stdio servers or when your app must control every call.',
            de: 'Für jedes `function_call` führt dein Code `call_tool()` auf dem MCP-Server aus und gibt das Ergebnis als `function_call_output` zurück. Nutze das für lokale stdio-Server oder wenn deine App jeden Aufruf kontrollieren muss.',
          },
          focus: ['eb2', 'b3'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'MCP server and MCP client',
      text: {
        en: 'The server hosts tools — functions with names, descriptions and input schemas. A client connects, lists the tools and calls them. For a Foundry prompt agent the Agent Service runtime is the client; in your own code an MCP client session or Microsoft Agent Framework’s MCP tools play that role.',
        de: 'Der Server hostet Tools – Funktionen mit Namen, Beschreibungen und Eingabeschemas. Ein Client verbindet sich, listet die Tools und ruft sie auf. Für einen Foundry-Prompt-Agent ist die Agent-Service-Runtime der Client; in deinem eigenen Code übernimmt eine MCP-Client-Session oder die MCP-Tools von Microsoft Agent Framework diese Rolle.',
      },
    },
    {
      term: 'Dynamic tool discovery',
      text: {
        en: 'The client asks the server for its current tool list at runtime instead of hard-coding each tool. Tools added or updated on the server appear without redeploying the agent, unless `allowed_tools` filters them out.',
        de: 'Der Client fragt den Server zur Laufzeit nach seiner aktuellen Tool-Liste, statt jedes Tool fest einzuprogrammieren. Auf dem Server ergänzte oder geänderte Tools erscheinen ohne Redeployment des Agents – außer `allowed_tools` filtert sie heraus.',
      },
    },
    {
      term: 'MCP tool (MCPTool)',
      text: {
        en: '`MCPTool` in `azure.ai.projects.models` attaches one remote server to a prompt agent: `server_label` (unique per agent) and `server_url`, plus optional `allowed_tools`, `require_approval`, `project_connection_id` and `headers`. Add several servers as separate tools.',
        de: '`MCPTool` in `azure.ai.projects.models` bindet einen Remote-Server an einen Prompt Agent: `server_label` (eindeutig pro Agent) und `server_url`, dazu optional `allowed_tools`, `require_approval`, `project_connection_id` und `headers`. Mehrere Server fügst du als separate Tools hinzu.',
      },
    },
    {
      term: 'allowed_tools',
      text: {
        en: 'A non-empty list restricts the model to those tool names — the core tool-access control. Omitting it, or passing an empty list `[]`, exposes **all** tools of the server.',
        de: 'Eine nicht leere Liste beschränkt das Modell auf diese Tool-Namen – die zentrale Tool-Zugriffskontrolle. Fehlt sie oder ist sie leer (`[]`), sind **alle** Tools des Servers verfügbar.',
      },
    },
    {
      term: 'require_approval',
      text: {
        en: 'Defaults to `always`: each call first returns an `mcp_approval_request` (server label, tool name, arguments) and waits. Continue with an `mcp_approval_response` (`approve`, `approval_request_id`) in the same conversation. `never` skips approval; a per-tool policy with `always` and `never` lists mixes both.',
        de: 'Standard ist `always`: Jeder Aufruf liefert zuerst ein `mcp_approval_request` (Server-Label, Tool-Name, Argumente) und wartet. Weiter geht es mit einem `mcp_approval_response` (`approve`, `approval_request_id`) in derselben Conversation. `never` überspringt die Freigabe; eine Richtlinie pro Tool mit `always`- und `never`-Listen kombiniert beides.',
      },
    },
    {
      term: 'Project connection authentication',
      text: {
        en: 'Store keys or tokens in a project connection and reference it with `project_connection_id`. Options: key-based (one shared identity), Microsoft Entra with the agent identity or project managed identity, Entra user delegation, OAuth identity passthrough (each user signs in), or unauthenticated for public servers.',
        de: 'Speichere Keys oder Tokens in einer Projektverbindung und verweise mit `project_connection_id` darauf. Optionen: Key-basiert (eine geteilte Identität), Microsoft Entra mit Agent-Identität oder Projekt-Managed-Identity, Entra-Benutzerdelegierung, OAuth-Identity-Passthrough (jeder Nutzer meldet sich an) oder ohne Authentifizierung für öffentliche Server.',
      },
    },
    {
      term: 'Toolbox',
      text: {
        en: 'A Foundry toolbox bundles tools — MCP servers, OpenAPI tools, file search and more — behind one MCP-compatible endpoint with central authentication, guardrails and versioning. The first version becomes the default; later versions are served only after you promote them.',
        de: 'Eine Foundry-Toolbox bündelt Tools – MCP-Server, OpenAPI-Tools, File Search und mehr – hinter einem MCP-kompatiblen Endpoint mit zentraler Authentifizierung, Guardrails und Versionierung. Die erste Version wird zum Standard; spätere Versionen werden erst ausgeliefert, wenn du sie hochstufst.',
      },
    },
  ],
  comparison: {
    title: { en: 'MCP tool settings at a glance', de: 'MCP-Tool-Einstellungen im Überblick' },
    columns: [
      { en: 'Setting', de: 'Einstellung' },
      { en: 'Effect', de: 'Wirkung' },
      { en: 'Use it when', de: 'Einsetzen, wenn' },
    ],
    rows: [
      ['server_label + server_url', { en: 'Names and locates one remote server; the label appears in approval requests', de: 'Benennt und adressiert einen Remote-Server; das Label erscheint in Freigabeanfragen' }, { en: 'Always (required; label unique per agent)', de: 'Immer (Pflicht; Label eindeutig pro Agent)' }],
      [{ en: '`allowed_tools` omitted or `[]`', de: '`allowed_tools` fehlt oder `[]`' }, { en: 'Every tool of the server is callable', de: 'Jedes Tool des Servers ist aufrufbar' }, { en: 'Only for trusted servers with harmless tools', de: 'Nur bei vertrauenswürdigen Servern mit harmlosen Tools' }],
      [{ en: '`allowed_tools` with names', de: '`allowed_tools` mit Namen' }, { en: 'Only the listed tools are callable', de: 'Nur die gelisteten Tools sind aufrufbar' }, { en: 'Least privilege; hide destructive tools', de: 'Minimale Rechte; destruktive Tools verbergen' }],
      ['require_approval="always"', { en: 'Every call returns an approval request first (default)', de: 'Jeder Aufruf liefert zuerst eine Freigabeanfrage (Standard)' }, { en: 'New servers, write operations', de: 'Neue Server, schreibende Operationen' }],
      ['require_approval="never"', { en: 'Calls run without pausing', de: 'Aufrufe laufen ohne Pause' }, { en: 'Read-only tools you trust', de: 'Lesende Tools, denen du vertraust' }],
      [{ en: 'Per-tool approval policy', de: 'Freigaberichtlinie pro Tool' }, { en: '`always` and `never` lists name the tools', de: '`always`- und `never`-Listen benennen die Tools' }, { en: 'Mix of lookups and write actions', de: 'Mischung aus Abfragen und Schreibaktionen' }],
      ['project_connection_id', { en: 'Injects keys, tokens or identity from a project connection', de: 'Fügt Keys, Tokens oder Identität aus einer Projektverbindung ein' }, { en: 'The server requires authentication', de: 'Der Server verlangt Authentifizierung' }],
    ],
  },
  code: [
    {
      title: { en: 'Foundry MCP tool with an allowlist and human approval', de: 'Foundry-MCP-Tool mit Allowlist und menschlicher Freigabe' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient
from azure.ai.projects.models import MCPTool, PromptAgentDefinition
from openai.types.responses.response_input_param import McpApprovalResponse

def ask_reviewer(tool: str, args) -> bool:               # your approval UI
    return input(f"Approve {tool}({args})? [y/N] ").strip().lower() == "y"

project = AIProjectClient(endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
                          credential=DefaultAzureCredential())
orders = MCPTool(
    server_label="orders",
    server_url="https://<your-mcp-server>/mcp",
    allowed_tools=["get_order_status", "issue_refund"],    # everything else stays hidden
    require_approval="always",                            # default: pause before each call
    project_connection_id="orders-mcp-connection",        # credentials live here
)
agent = project.agents.create_version(
    agent_name="support-agent",
    definition=PromptAgentDefinition(model="gpt-4.1", instructions="Use MCP tools for orders.", tools=[orders]),
)
openai = project.get_openai_client(agent_name=agent.name)
conv = openai.conversations.create()
response = openai.responses.create(conversation=conv.id, input="Refund order FAB-1042.")

approvals = [
    McpApprovalResponse(type="mcp_approval_response", approval_request_id=item.id,
                        approve=ask_reviewer(item.name, item.arguments))
    for item in response.output if item.type == "mcp_approval_request"
]
if approvals:                                              # same conversation!
    response = openai.responses.create(conversation=conv.id, input=approvals)
print(response.output_text)`,
      notes: [
        { en: '`approval_request_id` must be the `id` of the `mcp_approval_request` item, not the response id.', de: '`approval_request_id` muss die `id` des `mcp_approval_request`-Items sein, nicht die Response-ID.' },
        { en: 'A denied call (`approve=False`) never reaches the MCP server.', de: 'Ein abgelehnter Aufruf (`approve=False`) erreicht den MCP-Server nie.' },
        { en: 'Log tool name, arguments, reviewer and decision for auditing.', de: 'Protokolliere Tool-Name, Argumente, prüfende Person und Entscheidung für das Audit.' },
      ],
    },
    {
      title: { en: 'Client-side discovery with the MCP Python SDK', de: 'Clientseitige Discovery mit dem MCP Python SDK' },
      code: `import asyncio
from azure.identity import DefaultAzureCredential
from mcp import ClientSession
from mcp.client.streamable_http import streamablehttp_client

URL = "https://<resource>.services.ai.azure.com/api/projects/<project>/toolboxes/<name>/mcp?api-version=v1"
token = DefaultAzureCredential().get_token("https://ai.azure.com/.default").token

async def main():
    async with streamablehttp_client(URL, headers={"Authorization": f"Bearer {token}"}) as (read, write, _):
        async with ClientSession(read, write) as session:
            await session.initialize()
            tools = await session.list_tools()            # dynamic discovery
            for tool in tools.tools:
                print(tool.name, "-", tool.description)
            result = await session.call_tool("get_order_status", arguments={"order_id": "FAB-1042"})
            print(result.content)

asyncio.run(main())`,
      notes: [
        { en: 'A Foundry toolbox exposes an MCP endpoint, so any MCP client can list and call its tools.', de: 'Eine Foundry-Toolbox stellt einen MCP-Endpoint bereit, daher kann jeder MCP-Client ihre Tools listen und aufrufen.' },
        { en: 'In a client-side bridge you wrap each listed tool as a `FunctionTool` and run `call_tool()` when the agent returns a `function_call`.', de: 'In einer clientseitigen Brücke verpackst du jedes gelistete Tool als `FunctionTool` und führst `call_tool()` aus, wenn der Agent ein `function_call` liefert.' },
        { en: 'Microsoft Agent Framework now builds on MCP SDK 2.x and its high-level `mcp.Client` (for example via `MCPStreamableHTTPTool`); its docs replace FastMCP server samples with the SDK 2.x `MCPServer` API.', de: 'Microsoft Agent Framework baut inzwischen auf MCP SDK 2.x und dessen höherwertigem `mcp.Client` auf (z. B. über `MCPStreamableHTTPTool`); seine Doku ersetzt FastMCP-Serverbeispiele durch die `MCPServer`-API von SDK 2.x.' },
      ],
    },
  ],
  traps: [
    {
      en: '`allowed_tools=[]` does **not** block tools — it allows all of them. Use a non-empty list, or remove the MCP tool from the agent.',
      de: '`allowed_tools=[]` blockiert **keine** Tools – es erlaubt alle. Nutze eine nicht leere Liste oder entferne das MCP-Tool aus dem Agent.',
    },
    {
      en: '`require_approval` defaults to `always`, so the first response may contain only an `mcp_approval_request` and no answer until your app responds.',
      de: '`require_approval` ist standardmäßig `always`, daher kann die erste Antwort nur ein `mcp_approval_request` und keinen Text enthalten, bis deine App antwortet.',
    },
    {
      en: 'Send the approval in the **same conversation** with `approval_request_id` set to the request item’s `id` — otherwise the agent never continues.',
      de: 'Schick die Freigabe in **derselben Conversation** mit `approval_request_id` gleich der `id` des Anfrage-Items – sonst setzt der Agent nie fort.',
    },
    {
      en: 'Foundry Agent Service accepts only remote MCP endpoints: a server on `localhost` or stdio must first be hosted, for example on Azure Container Apps or Azure Functions. Non-streaming MCP calls time out after 100 seconds.',
      de: 'Foundry Agent Service akzeptiert nur Remote-MCP-Endpoints: Ein Server auf `localhost` oder über stdio muss zuerst gehostet werden, etwa in Azure Container Apps oder Azure Functions. MCP-Aufrufe ohne Streaming laufen nach 100 Sekunden ab.',
    },
    {
      en: 'Tool descriptions and results from third-party servers are untrusted input (indirect prompt injection). Instructions are not an access control — `allowed_tools`, approvals and identity permissions are.',
      de: 'Tool-Beschreibungen und Ergebnisse fremder Server sind nicht vertrauenswürdiger Input (indirekte Prompt Injection). Anweisungen sind keine Zugriffskontrolle – `allowed_tools`, Freigaben und Identitätsberechtigungen schon.',
    },
  ],
  takeaways: [
    { en: 'The server publishes, the client discovers and calls — tools change without redeploying the agent.', de: 'Der Server veröffentlicht, der Client entdeckt und ruft auf – Tools ändern sich ohne Redeployment des Agents.' },
    { en: 'Least privilege = a non-empty `allowed_tools` list plus approvals for write operations.', de: 'Minimale Rechte = eine nicht leere `allowed_tools`-Liste plus Freigaben für schreibende Operationen.' },
    { en: 'Approval loop: `mcp_approval_request` → human review → `mcp_approval_response` in the same conversation.', de: 'Freigabeschleife: `mcp_approval_request` → menschliche Prüfung → `mcp_approval_response` in derselben Conversation.' },
    { en: 'Credentials belong in a project connection (`project_connection_id`), preferably Entra-based.', de: 'Zugangsdaten gehören in eine Projektverbindung (`project_connection_id`), möglichst Entra-basiert.' },
    { en: 'For reuse and central governance, put MCP servers in a toolbox or route them through an AI gateway (preview).', de: 'Für Wiederverwendung und zentrale Governance gehören MCP-Server in eine Toolbox oder hinter ein AI Gateway (Preview).' },
  ],
  sources: [
    { title: 'Connect agents to Model Context Protocol servers', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/model-context-protocol' },
    { title: 'Set up authentication for Model Context Protocol (MCP) tools', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/mcp-authentication' },
    { title: 'Create and manage a toolbox in Foundry', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/toolbox' },
    { title: 'Govern MCP tools by using an AI gateway (preview)', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/governance' },
    { title: 'Using MCP tools with Agents (Microsoft Agent Framework)', url: 'https://learn.microsoft.com/en-us/agent-framework/agents/tools/local-mcp-tools' },
  ],
}
