import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'a2a',
  summary: {
    en: 'The **Agent2Agent (A2A)** protocol lets agents built with different frameworks or by different vendors discover each other and work together over HTTP. A server agent publishes an **agent card** — its name, endpoint, capabilities and **skills** — at a well-known URL. Behind the endpoint, a **request handler** with a **task store** manages each request\'s lifecycle and calls your **agent executor**, which runs the agent logic and publishes messages, task updates and **artifacts** (a task\'s output results). A client resolves the card from the base URL and sends messages, receiving either a direct answer or a task to follow. In Foundry, an agent can call remote A2A agents through the **A2A tool**, and **prompt agents** (declarative agent: model + instructions + tools, versioned in Foundry) can be exposed through an **incoming A2A endpoint**.',
    de: 'Das **Agent2Agent-Protokoll (A2A)** lässt Agents, die mit unterschiedlichen Frameworks oder von verschiedenen Anbietern gebaut wurden, einander finden und über HTTP zusammenarbeiten. Ein Server-Agent veröffentlicht unter einer Well-known-URL eine **Agent Card** – Name, Endpoint, Fähigkeiten und **Skills**. Hinter dem Endpoint verwaltet ein **Request Handler** mit einem **Task Store** den Lebenszyklus jeder Anfrage und ruft deinen **Agent Executor** auf, der die Agent-Logik ausführt und Nachrichten, Task-Updates und **Artefakte** (die Ergebnisse eines Tasks) veröffentlicht. Ein Client löst die Card über die Basis-URL auf und schickt Nachrichten; zurück kommt entweder eine direkte Antwort oder ein Task, den er verfolgt. In Foundry kann ein Agent entfernte A2A-Agents über das **A2A-Tool** aufrufen, und **Prompt Agents** (deklarativer Agent: Modell + Instructions + Tools, versioniert in Foundry) lassen sich über einen **eingehenden A2A-Endpoint** bereitstellen.',
  },
  examFocus: {
    en: 'Expect questions on what an agent card contains and where clients find it, which component does what (skill, card, executor, request handler, task store, Starlette and Uvicorn), the order of steps to host a server, how a client discovers and calls a remote agent (`A2ACardResolver`, `A2AAgent`), and how Foundry uses A2A: the generally available `a2a` tool with a **project connection** (stored endpoint + credential that tools reference instead of secrets in code) versus exposing an agent through incoming A2A with Microsoft Entra ID and the Foundry Agent Consumer role.',
    de: 'Rechne mit Fragen dazu, was eine Agent Card enthält und wo Clients sie finden, welche Komponente was übernimmt (Skill, Card, Executor, Request Handler, Task Store, Starlette und Uvicorn), in welcher Reihenfolge du einen Server bereitstellst, wie ein Client einen entfernten Agent findet und aufruft (`A2ACardResolver`, `A2AAgent`) und wie Foundry A2A nutzt: das allgemein verfügbare `a2a`-Tool mit **Projektverbindung** (gespeicherter Endpoint + Anmeldedaten, auf die Tools verweisen statt auf Secrets im Code) versus das Bereitstellen eines Agents über eingehendes A2A mit Microsoft Entra ID und der Rolle Foundry Agent Consumer.',
  },
  diagrams: [
    {
      id: 'a2a-flow',
      title: { en: 'From agent card to result: one A2A request', de: 'Von der Agent Card zum Ergebnis: eine A2A-Anfrage' },
      caption: {
        en: 'The client discovers the card, sends a message, and the server routes it through request handler and executor; results flow back as events.',
        de: 'Der Client findet die Card, schickt eine Nachricht, und der Server leitet sie über Request Handler und Executor; Ergebnisse fließen als Events zurück.',
      },
      width: 960,
      height: 460,
      groups: [
        { id: 'g-server', x: 290, y: 20, w: 660, h: 420, label: { en: 'A2A server (Starlette + Uvicorn)', de: 'A2A-Server (Starlette + Uvicorn)' }, tone: 'app' },
      ],
      nodes: [
        { id: 'client', x: 20, y: 200, w: 190, h: 64, label: { en: 'Client agent', de: 'Client-Agent' }, sub: 'A2ACardResolver · A2AAgent', icon: 'code', tone: 'app' },
        { id: 'card', x: 320, y: 60, w: 200, h: 64, label: { en: 'Agent card', de: 'Agent Card' }, sub: '/.well-known/agent-card.json', icon: 'file', tone: 'data', shape: 'doc' },
        { id: 'handler', x: 320, y: 200, w: 190, h: 64, label: { en: 'Request handler', de: 'Request Handler' }, sub: 'DefaultRequestHandler', icon: 'code', tone: 'app' },
        { id: 'store', x: 320, y: 340, w: 190, h: 64, label: { en: 'Task store', de: 'Task Store' }, sub: 'InMemoryTaskStore', icon: 'table', tone: 'data', shape: 'store' },
        { id: 'executor', x: 590, y: 200, w: 160, h: 64, label: { en: 'Agent executor', de: 'Agent Executor' }, sub: 'execute() · cancel()', icon: 'code', tone: 'app' },
        { id: 'agent', x: 790, y: 200, w: 140, h: 64, label: { en: 'Your agent', de: 'Dein Agent' }, sub: 'Agent Framework', icon: 'code', tone: 'app' },
        { id: 'queue', x: 590, y: 340, w: 160, h: 64, label: { en: 'Event queue', de: 'Event Queue' }, sub: { en: 'messages · artifacts', de: 'Nachrichten · Artefakte' }, icon: 'storage-queue', tone: 'data', shape: 'pill' },
      ],
      edges: [
        { id: 'a1', from: 'client', to: 'card', label: { en: '1 · discover', de: '1 · entdecken' } },
        { id: 'a2', from: 'client', to: 'handler', bidir: true, label: { en: '2 · message', de: '2 · Nachricht' } },
        { id: 'a3', from: 'handler', to: 'executor', label: 'execute()' },
        { id: 'a4', from: 'executor', to: 'agent', label: 'run' },
        { id: 'a5', from: 'handler', to: 'store', bidir: true, label: { en: 'task state', de: 'Task-Status' } },
        { id: 'a6', from: 'executor', to: 'queue', label: 'enqueue_event' },
        { id: 'a7', from: 'queue', to: 'handler', label: { en: 'events', de: 'Events' } },
      ],
      steps: [
        {
          title: { en: 'Publish an agent card', de: 'Agent Card veröffentlichen' },
          text: {
            en: 'The server describes itself in an **agent card**: name, description, version, endpoint (`supported_interfaces`), capabilities such as streaming, input/output modes and **skills** (id, name, description, tags, examples). Clients find it at `/.well-known/agent-card.json`.',
            de: 'Der Server beschreibt sich in einer **Agent Card**: Name, Beschreibung, Version, Endpoint (`supported_interfaces`), Fähigkeiten wie Streaming, Ein-/Ausgabemodi und **Skills** (ID, Name, Beschreibung, Tags, Beispiele). Clients finden sie unter `/.well-known/agent-card.json`.',
          },
          focus: ['card', 'g-server'],
        },
        {
          title: { en: 'Discover', de: 'Entdecken' },
          text: {
            en: 'The client — often a routing agent — only needs the base URL. It fetches the card with `A2ACardResolver.get_agent_card()`, reads the skills and decides whether and how to call the agent.',
            de: 'Der Client – oft ein Routing-Agent – braucht nur die Basis-URL. Er holt die Card mit `A2ACardResolver.get_agent_card()`, liest die Skills und entscheidet, ob und wie er den Agent aufruft.',
          },
          focus: ['client', 'a1', 'card'],
        },
        {
          title: { en: 'Send a message', de: 'Nachricht senden' },
          text: {
            en: 'The client sends a message as **JSON-RPC** (JSON method calls over HTTP; A2A\'s other bindings are HTTP+JSON and gRPC), streaming or non-streaming. `DefaultRequestHandler` routes it and tracks the task lifecycle in a task store — even simple agents need one.',
            de: 'Der Client sendet eine Nachricht als **JSON-RPC** (JSON-Methodenaufrufe über HTTP; die anderen A2A-Bindings sind HTTP+JSON und gRPC), gestreamt oder nicht. `DefaultRequestHandler` leitet sie weiter und verfolgt den Task-Lebenszyklus in einem Task Store – selbst einfache Agents brauchen einen.',
          },
          focus: ['a2', 'handler', 'a5', 'store'],
        },
        {
          title: { en: 'Execute', de: 'Ausführen' },
          text: {
            en: 'The handler calls your executor\'s `execute(context, event_queue)`. It reads the request from the `RequestContext` and runs the agent logic; `cancel()` stops a task or reports that cancellation isn\'t supported. With Agent Framework, `A2AExecutor` wraps your `Agent`, which runs in the same process and calls its model, for example through `FoundryChatClient`.',
            de: 'Der Handler ruft `execute(context, event_queue)` deines Executors auf. Er liest die Anfrage aus dem `RequestContext` und führt die Agent-Logik aus; `cancel()` stoppt einen Task oder meldet, dass Abbrechen nicht unterstützt wird. Mit Agent Framework umhüllt `A2AExecutor` deinen `Agent`, der im selben Prozess läuft und sein Modell aufruft, etwa über `FoundryChatClient`.',
          },
          focus: ['a3', 'executor', 'a4', 'agent'],
        },
        {
          title: { en: 'Return results', de: 'Ergebnisse zurückgeben' },
          text: {
            en: 'The executor publishes messages, task status updates and artifacts to the event queue; the handler streams or returns them. The client receives either a direct message or a task it can follow up on.',
            de: 'Der Executor veröffentlicht Nachrichten, Task-Status-Updates und Artefakte in der Event Queue; der Handler streamt sie oder gibt sie zurück. Der Client erhält entweder eine direkte Nachricht oder einen Task, den er weiterverfolgen kann.',
          },
          focus: ['a6', 'queue', 'a7', 'a2', 'client'],
        },
      ],
    },
    {
      id: 'a2a-in-foundry',
      title: { en: 'A2A in Foundry: call out and be called', de: 'A2A in Foundry: aufrufen und aufgerufen werden' },
      caption: {
        en: 'Top: a Foundry agent calls a remote A2A agent through the A2A tool. Bottom: an external agent calls a Foundry prompt agent through its incoming A2A endpoint.',
        de: 'Oben: Ein Foundry-Agent ruft über das A2A-Tool einen entfernten A2A-Agent auf. Unten: Ein externer Agent ruft einen Foundry Prompt Agent über dessen eingehenden A2A-Endpoint auf.',
      },
      width: 960,
      height: 430,
      groups: [
        { id: 'g-out', x: 20, y: 20, w: 920, h: 234, label: { en: 'Call out: A2A tool on a Foundry agent', de: 'Nach außen: A2A-Tool an einem Foundry-Agent' }, tone: 'foundry' },
        { id: 'g-in', x: 20, y: 290, w: 920, h: 124, label: { en: 'Be called: incoming A2A on a Foundry agent', de: 'Aufgerufen werden: eingehendes A2A an einem Foundry-Agent' }, tone: 'foundry' },
      ],
      nodes: [
        { id: 'fa', x: 36, y: 60, w: 208, h: 64, label: { en: 'Foundry prompt agent', de: 'Foundry Prompt Agent' }, sub: 'A2ATool · a2a v1.0', icon: 'foundry-agent-service', tone: 'foundry' },
        { id: 'conn', x: 36, y: 170, w: 208, h: 64, label: { en: 'RemoteA2A connection', de: 'RemoteA2A-Verbindung' }, sub: { en: 'project connection', de: 'Projektverbindung' }, icon: 'resource-linked', tone: 'safety' },
        { id: 'remote', x: 640, y: 60, w: 280, h: 64, label: { en: 'Remote A2A agent', de: 'Entfernter A2A-Agent' }, sub: { en: 'partner or other framework', de: 'Partner oder anderes Framework' }, icon: 'server-farm', tone: 'external' },
        { id: 'caller', x: 40, y: 330, w: 180, h: 64, label: { en: 'External agent', de: 'Externer Agent' }, sub: 'Foundry Agent Consumer', icon: 'server-farm', tone: 'external' },
        { id: 'ep', x: 330, y: 330, w: 200, h: 64, label: { en: 'A2A endpoint', de: 'A2A-Endpoint' }, sub: '…/protocols/a2a', icon: 'foundry-agent-service', tone: 'foundry' },
        { id: 'target', x: 640, y: 330, w: 280, h: 64, label: { en: 'Foundry prompt agent', de: 'Foundry Prompt Agent' }, sub: { en: 'agent card + skills', de: 'Agent Card + Skills' }, icon: 'foundry-agent-service', tone: 'foundry' },
      ],
      edges: [
        { id: 'o1', from: 'fa', to: 'remote', label: { en: 'A2A message (v1.0)', de: 'A2A-Nachricht (v1.0)' } },
        { id: 'o2', from: 'conn', to: 'fa', dashed: true, label: { en: 'endpoint + credential', de: 'Endpoint + Anmeldedaten' } },
        { id: 'i1', from: 'caller', to: 'ep', label: { en: 'Entra ID token', de: 'Entra-ID-Token' } },
        { id: 'i2', from: 'ep', to: 'target', label: { en: 'invokes', de: 'ruft auf' } },
      ],
      steps: [
        {
          title: { en: 'Call a remote agent', de: 'Entfernten Agent aufrufen' },
          text: {
            en: 'An admin with **Foundry Project Manager** creates a RemoteA2A project connection that stores the remote endpoint and its credential — it isn\'t a network hop. A developer with **Foundry User** then adds `A2ATool(a2a_version=A2AProtocolVersion.V1_0, project_connection_id=...)` to a prompt agent (see the last code sample).',
            de: 'Ein Admin mit **Foundry Project Manager** legt eine RemoteA2A-Projektverbindung an, die den entfernten Endpoint und seine Anmeldedaten speichert – sie ist keine Zwischenstation im Netzwerk. Ein Entwickler mit **Foundry User** fügt dann einem Prompt Agent `A2ATool(a2a_version=A2AProtocolVersion.V1_0, project_connection_id=...)` hinzu (siehe letztes Codebeispiel).',
          },
          focus: ['g-out', 'conn', 'o2', 'fa'],
        },
        {
          title: { en: 'The remote agent answers', de: 'Der entfernte Agent antwortet' },
          text: {
            en: 'Outbound: Agent Service reads endpoint and credential from the connection, fetches the remote agent card — anonymously, unless the A2A tool definition sets `send_credentials_for_agent_card: true` — sends an A2A message, and your agent uses the reply (a message or a task). Use the GA `a2a` tool (protocol 1.0) for new work; `a2a_preview` (0.3) stays for existing integrations.',
            de: 'Ausgehend: Agent Service liest Endpoint und Anmeldedaten aus der Verbindung, holt die entfernte Agent Card – anonym, sofern die A2A-Tool-Definition nicht `send_credentials_for_agent_card: true` setzt –, sendet eine A2A-Nachricht, und dein Agent nutzt die Antwort (eine Nachricht oder einen Task). Für Neues nimmst du das GA-Tool `a2a` (Protokoll 1.0); `a2a_preview` (0.3) bleibt für bestehende Integrationen.',
          },
          focus: ['fa', 'o1', 'remote'],
        },
        {
          title: { en: 'Expose your own agent', de: 'Eigenen Agent bereitstellen' },
          text: {
            en: 'Patch the prompt agent (REST or `project.agents.update_details`) with an `agent_card` and a protocol configuration that enables both `responses` — the **Responses API** (OpenAI-compatible API that returns a response object; keeps state via `previous_response_id` or a conversation, a durable item store for multi-turn state), which incoming A2A requires — and `a2a`. Foundry publishes the card at `…/protocols/a2a/agentCard/v1.0` (and `v0.3`).',
            de: 'Patche den Prompt Agent (REST oder `project.agents.update_details`) mit einer `agent_card` und einer Protokollkonfiguration, die `responses` – die **Responses API** (OpenAI-kompatible API, die ein Response-Objekt liefert; hält den Zustand über `previous_response_id` oder eine Conversation, einen dauerhaften Item-Speicher für Zustand über mehrere Runden), die eingehendes A2A voraussetzt – und `a2a` aktiviert. Foundry veröffentlicht die Card unter `…/protocols/a2a/agentCard/v1.0` (und `v0.3`).',
          },
          focus: ['g-in', 'ep', 'i2', 'target'],
        },
        {
          title: { en: 'Secure the inbound path', de: 'Den eingehenden Weg absichern' },
          text: {
            en: 'Inbound: every A2A URL of your agent, including its card, requires Microsoft Entra ID — no keys, no anonymous access. Grant callers **Foundry Agent Consumer** on the project or the agent. Limits of Foundry\'s incoming endpoint (not of A2A or the SDK): v1.0 is JSON-RPC only, text only, no streaming responses; tasks are kept 60 days after the last write.',
            de: 'Eingehend: Jede A2A-URL deines Agents, auch seine Card, verlangt Microsoft Entra ID – keine Keys, kein anonymer Zugriff. Gib Aufrufern **Foundry Agent Consumer** auf Projekt oder Agent. Grenzen des eingehenden Foundry-Endpoints (nicht von A2A oder dem SDK): v1.0 nur JSON-RPC, nur Text, keine Streaming-Antworten; Tasks bleiben 60 Tage nach dem letzten Schreiben erhalten.',
          },
          focus: ['caller', 'i1'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'A2A protocol',
      text: {
        en: 'An open protocol that lets agents from different vendors and frameworks discover each other through agent cards and work together over HTTP; each agent keeps its own model and tools. A simple agent answers a message with a message; longer work returns a **task** with a state (for example input required or completed) and artifacts. A `context_id` links follow-up messages to the same exchange.',
        de: 'Ein offenes Protokoll, mit dem Agents verschiedener Anbieter und Frameworks einander über Agent Cards finden und über HTTP zusammenarbeiten; jeder Agent behält sein eigenes Modell und seine Tools. Ein einfacher Agent beantwortet eine Nachricht mit einer Nachricht; längere Arbeit liefert einen **Task** mit Status (etwa „input required“ oder „completed“) und Artefakten. Eine `context_id` verknüpft Folgenachrichten mit demselben Austausch.',
      },
    },
    {
      term: 'Agent card and skills',
      text: {
        en: 'The agent\'s discoverable profile: name, description, version, endpoint (`supported_interfaces` with URL and protocol binding), capabilities such as streaming, default input/output modes, authentication requirements and **skills**. Each `AgentSkill(id=..., name=..., description=..., tags=[...], examples=[...])` advertises one capability that clients and routing agents use to pick a target. Standard location: `/.well-known/agent-card.json`.',
        de: 'Das auffindbare Profil des Agents: Name, Beschreibung, Version, Endpoint (`supported_interfaces` mit URL und Protocol Binding), Fähigkeiten wie Streaming, Standard-Ein-/Ausgabemodi, Authentifizierungsanforderungen und **Skills**. Jeder `AgentSkill(id=..., name=..., description=..., tags=[...], examples=[...])` bewirbt eine Fähigkeit, anhand derer Clients und Routing-Agents ihr Ziel wählen. Standardort: `/.well-known/agent-card.json`.',
      },
    },
    {
      term: 'Agent executor',
      text: {
        en: 'The server-side bridge between protocol and logic: `execute(context, event_queue)` reads the request from the `RequestContext` and publishes messages, task status or artifacts to the `EventQueue`; `cancel()` handles cancellation. Agent Framework\'s `A2AExecutor` implements it for any agent.',
        de: 'Die serverseitige Brücke zwischen Protokoll und Logik: `execute(context, event_queue)` liest die Anfrage aus dem `RequestContext` und veröffentlicht Nachrichten, Task-Status oder Artefakte in der `EventQueue`; `cancel()` behandelt Abbrüche. `A2AExecutor` aus Agent Framework implementiert das für jeden Agent.',
      },
    },
    {
      term: 'Request handler and task store',
      text: {
        en: '`DefaultRequestHandler(agent_executor=..., task_store=..., agent_card=...)` routes incoming requests to the executor and manages the task lifecycle. `InMemoryTaskStore` tracks tasks in memory; use durable stores when replicas restart or scale out.',
        de: '`DefaultRequestHandler(agent_executor=..., task_store=..., agent_card=...)` leitet eingehende Anfragen an den Executor und verwaltet den Task-Lebenszyklus. `InMemoryTaskStore` verfolgt Tasks im Speicher; nutze dauerhafte Stores, wenn Replikate neu starten oder skalieren.',
      },
    },
    {
      term: 'A2A in Foundry',
      text: {
        en: 'Call out: the GA `a2a` tool (protocol 1.0) on a prompt agent, through a project connection; Foundry reads the remote card anonymously unless the tool sets `send_credentials_for_agent_card: true`. Be called: incoming A2A (agent card plus `a2a` protocol) on a prompt agent; every URL, including the card, requires Microsoft Entra ID, and the endpoint answers in text without streaming.',
        de: 'Nach außen: das GA-Tool `a2a` (Protokoll 1.0) an einem Prompt Agent, über eine Projektverbindung; Foundry liest die entfernte Card anonym, außer das Tool setzt `send_credentials_for_agent_card: true`. Aufgerufen werden: eingehendes A2A (Agent Card plus `a2a`-Protokoll) an einem Prompt Agent; jede URL, auch die Card, verlangt Microsoft Entra ID, und der Endpoint antwortet in Text ohne Streaming.',
      },
    },
    {
      term: 'Foundry roles for A2A',
      text: {
        en: '**Foundry Project Manager**: an admin creates the RemoteA2A project connection. **Foundry User**: a developer creates and tests the agent with the A2A tool, or enables incoming A2A. **Foundry Agent Consumer** (or a higher Foundry role) on the project or agent: the identity of an external agent that calls your incoming A2A endpoint.',
        de: '**Foundry Project Manager**: Ein Admin legt die RemoteA2A-Projektverbindung an. **Foundry User**: Ein Entwickler erstellt und testet den Agent mit dem A2A-Tool oder aktiviert eingehendes A2A. **Foundry Agent Consumer** (oder eine höhere Foundry-Rolle) auf Projekt oder Agent: die Identität eines externen Agents, der deinen eingehenden A2A-Endpoint aufruft.',
      },
    },
  ],
  comparison: {
    title: { en: 'A2A building blocks in Python (A2A SDK v1), in hosting order', de: 'A2A-Bausteine in Python (A2A SDK v1), in der Reihenfolge beim Hosten' },
    columns: [
      { en: 'Building block', de: 'Baustein' },
      { en: 'Side', de: 'Seite' },
      { en: 'Current Python API', de: 'Aktuelle Python-API' },
      { en: 'Job', de: 'Aufgabe' },
    ],
    rows: [
      [{ en: '1 · Agent skill', de: '1 · Agent Skill' }, 'Server', 'AgentSkill(id, name, description, tags, examples)', { en: 'Describes one capability', de: 'Beschreibt eine Fähigkeit' }],
      [{ en: '2 · Agent card', de: '2 · Agent Card' }, 'Server', 'AgentCard(..., supported_interfaces=[AgentInterface(...)], skills=[...])', { en: 'Discovery document', de: 'Dokument für die Erkennung' }],
      [{ en: '3 · Agent executor', de: '3 · Agent Executor' }, 'Server', 'AgentExecutor.execute() / cancel() · A2AExecutor(agent)', { en: 'Runs the agent, publishes events', de: 'Führt den Agent aus, veröffentlicht Events' }],
      [{ en: '4 · Request handler + task store', de: '4 · Request Handler + Task Store' }, 'Server', 'DefaultRequestHandler(..., task_store=InMemoryTaskStore(), agent_card=...)', { en: 'Routes requests, tracks tasks', de: 'Leitet Anfragen weiter, verfolgt Tasks' }],
      [{ en: '5 · Starlette routes', de: '5 · Starlette-Routen' }, 'Server', 'Starlette(routes=[*create_agent_card_routes(card), *create_jsonrpc_routes(handler, "/")])', { en: 'Serves the card and JSON-RPC', de: 'Liefert Card und JSON-RPC aus' }],
      [{ en: '6 · Uvicorn', de: '6 · Uvicorn' }, 'Server', 'uvicorn.run(app, host=..., port=...)', { en: 'Runs the HTTP server', de: 'Startet den HTTP-Server' }],
      [{ en: 'Client', de: 'Client' }, 'Client', 'A2ACardResolver(...).get_agent_card() → A2AAgent(agent_card=...).run()', { en: 'Discovers and calls the agent', de: 'Findet den Agent und ruft ihn auf' }],
    ],
  },
  code: [
    {
      title: { en: 'Expose an Agent Framework agent as an A2A server', de: 'Agent-Framework-Agent als A2A-Server bereitstellen' },
      code: `import uvicorn
from a2a.server.request_handlers import DefaultRequestHandler
from a2a.server.routes import create_agent_card_routes, create_jsonrpc_routes
from a2a.server.tasks import InMemoryTaskStore
from a2a.types import AgentCapabilities, AgentCard, AgentInterface, AgentSkill
from agent_framework import Agent
from agent_framework.a2a import A2AExecutor
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential
from starlette.applications import Starlette

skill = AgentSkill(id="outline", name="Blog outline",
                   description="Creates a blog post outline for a topic.",
                   tags=["writing", "blog"], examples=["Outline a post about A2A"])
card = AgentCard(
    name="Outline Agent", description="Writes blog outlines.", version="1.0.0",
    default_input_modes=["text"], default_output_modes=["text"],
    capabilities=AgentCapabilities(streaming=True),
    supported_interfaces=[AgentInterface(url="http://localhost:9999/", protocol_binding="JSONRPC")],
    skills=[skill],
)
agent = Agent(
    client=FoundryChatClient(
        project_endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
        model="gpt-5-mini",                       # deployment name
        credential=AzureCliCredential(),
    ),
    name="Outline Agent", instructions="Write concise blog outlines.",
)

handler = DefaultRequestHandler(agent_executor=A2AExecutor(agent, stream=True),
                                task_store=InMemoryTaskStore(), agent_card=card)
app = Starlette(routes=[*create_agent_card_routes(card), *create_jsonrpc_routes(handler, "/")])
uvicorn.run(app, host="0.0.0.0", port=9999)`,
      notes: [
        { en: 'Install with `pip install agent-framework-a2a "a2a-sdk[http-server]>=1,<2" --pre`. `A2AExecutor` implements the SDK\'s agent executor for any Agent Framework agent and maps the A2A `context_id` to the agent session.', de: 'Installiere mit `pip install agent-framework-a2a "a2a-sdk[http-server]>=1,<2" --pre`. `A2AExecutor` implementiert den Agent Executor des SDK für jeden Agent-Framework-Agent und bildet die A2A-`context_id` auf die Agent-Session ab.' },
        { en: '`model` is your deployment name, which can be any name. Streaming is this server\'s own choice; only Foundry\'s incoming A2A endpoint doesn\'t stream.', de: '`model` ist dein Deployment-Name, den du frei wählen kannst. Streaming entscheidet dieser Server selbst; nur der eingehende A2A-Endpoint von Foundry streamt nicht.' },
        { en: 'In A2A SDK v1, `A2AStarletteApplication` is gone: build the Starlette app from the route helpers. `DefaultRequestHandler` needs the card, and the card lists its URL in `supported_interfaces`.', de: 'Im A2A SDK v1 gibt es `A2AStarletteApplication` nicht mehr: Baue die Starlette-App aus den Routen-Helfern. `DefaultRequestHandler` braucht die Card, und die Card führt ihre URL in `supported_interfaces`.' },
      ],
    },
    {
      title: { en: 'Discover and call a remote A2A agent', de: 'Entfernten A2A-Agent finden und aufrufen' },
      code: `import asyncio
import httpx
from a2a.client import A2ACardResolver
from agent_framework.a2a import A2AAgent

async def main() -> None:
    async with httpx.AsyncClient(timeout=60.0) as http_client:
        resolver = A2ACardResolver(httpx_client=http_client, base_url="http://localhost:9999")
        card = await resolver.get_agent_card()       # standard well-known card path
    print(card.name, "-", card.description)

    async with A2AAgent(agent_card=card) as remote:
        response = await remote.run("Outline a post about agent-to-agent protocols.")
        print(response.messages[0].text)

asyncio.run(main())`,
      notes: [
        { en: 'The client only needs the base URL; the resolver fetches the agent card from the well-known path `/.well-known/agent-card.json` (a few Learn samples still show the earlier `/.well-known/agent.json`).', de: 'Der Client braucht nur die Basis-URL; der Resolver holt die Agent Card vom Well-known-Pfad `/.well-known/agent-card.json` (einige Learn-Beispiele zeigen noch das frühere `/.well-known/agent.json`).' },
        { en: '`A2AAgent` wraps the remote endpoint as a normal agent: `run()`, `run(..., stream=True)` and an `AgentSession` that keeps the A2A `context_id`.', de: '`A2AAgent` macht den entfernten Endpoint zu einem normalen Agent: `run()`, `run(..., stream=True)` und eine `AgentSession`, die die A2A-`context_id` hält.' },
      ],
    },
    {
      title: { en: 'Give a Foundry prompt agent the A2A tool', de: 'Einem Foundry Prompt Agent das A2A-Tool geben' },
      code: `from azure.ai.projects import AIProjectClient
from azure.ai.projects.models import A2AProtocolVersion, A2ATool, PromptAgentDefinition
from azure.identity import DefaultAzureCredential

project = AIProjectClient(endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
                          credential=DefaultAzureCredential())
connection = project.connections.get("partner-a2a")           # RemoteA2A project connection
agent = project.agents.create_version(
    agent_name="router",
    definition=PromptAgentDefinition(
        model="gpt-5-mini",                                     # deployment name
        instructions="Delegate partner questions to the remote agent.",
        tools=[A2ATool(a2a_version=A2AProtocolVersion.V1_0, project_connection_id=connection.id)],
    ),
)
response = project.get_openai_client().responses.create(
    input="What can the partner agent do?",
    extra_body={"agent_reference": {"name": agent.name, "type": "agent_reference"}},
)
print(response.output_text)`,
      notes: [
        { en: 'The connection holds the remote endpoint and its credential, so no secret appears in code. `agent_reference` routes the request to the new prompt agent.', de: 'Die Verbindung hält den entfernten Endpoint und seine Anmeldedaten, sodass kein Secret im Code steht. `agent_reference` leitet die Anfrage an den neuen Prompt Agent.' },
      ],
    },
  ],
  traps: [
    {
      en: 'Two different “agent executors”: the A2A SDK\'s `AgentExecutor` (server side, `execute`/`cancel`) is not Agent Framework\'s workflow `AgentExecutor`, which wraps an agent inside a workflow graph.',
      de: 'Zwei verschiedene „Agent Executors“: Der `AgentExecutor` des A2A SDK (Serverseite, `execute`/`cancel`) ist nicht der Workflow-`AgentExecutor` aus Agent Framework, der einen Agent in einen Workflow-Graphen einbettet.',
    },
    {
      en: 'The agent card is not the endpoint: clients fetch it from `/.well-known/agent-card.json` (Foundry agents: `…/protocols/a2a/agentCard/v1.0`) and then call the URL listed in `supported_interfaces`.',
      de: 'Die Agent Card ist nicht der Endpoint: Clients holen sie von `/.well-known/agent-card.json` (Foundry-Agents: `…/protocols/a2a/agentCard/v1.0`) und rufen dann die URL aus `supported_interfaces` auf.',
    },
    {
      en: 'Even a simple A2A server needs a task store — the request handler uses it to manage task lifecycles — and the default in-memory store loses everything on restart.',
      de: 'Auch ein einfacher A2A-Server braucht einen Task Store – der Request Handler verwaltet damit den Task-Lebenszyklus –, und der Standard-Speicher im Arbeitsspeicher verliert beim Neustart alles.',
    },
    {
      en: 'Calling out is not the same as exposing: the A2A tool plus a project connection calls a remote agent; incoming A2A (agent card plus `a2a` protocol) lets others call your agent.',
      de: 'Aufrufen ist nicht dasselbe wie Bereitstellen: Das A2A-Tool plus Projektverbindung ruft einen entfernten Agent auf; eingehendes A2A (Agent Card plus `a2a`-Protokoll) lässt andere deinen Agent aufrufen.',
    },
    {
      en: 'Foundry\'s incoming A2A accepts only Microsoft Entra ID and serves preview v0.3 when a request names no version — select v1.0 through the v1.0 card, the `A2A-Version` header or the query string.',
      de: 'Eingehendes A2A in Foundry akzeptiert nur Microsoft Entra ID und liefert die Preview-Version 0.3, wenn eine Anfrage keine Version nennt – wähle v1.0 über die v1.0-Card, den Header `A2A-Version` oder den Query-String.',
    },
    {
      en: '“Skill” means three different things: an A2A `AgentSkill` only advertises a capability in the agent card; an Agent Skill is a `SKILL.md` package of instructions, scripts and resources that teaches an agent how to do a task (Agent Framework `SkillsProvider`; skills in Foundry are preview); an Azure AI Search skill is an enrichment step in a skillset, the “custom or built-in skills” of skills-outline item 5.1.3.',
      de: '„Skill“ bedeutet drei verschiedene Dinge: Ein A2A-`AgentSkill` bewirbt nur eine Fähigkeit in der Agent Card; ein Agent Skill ist ein `SKILL.md`-Paket aus Anweisungen, Skripten und Ressourcen, das einem Agent beibringt, wie er eine Aufgabe erledigt (Agent Framework `SkillsProvider`; Skills in Foundry sind Preview); ein Azure-AI-Search-Skill ist ein Anreicherungsschritt in einem Skillset – die „eigenen oder integrierten Skills“ aus Punkt 5.1.3 des Skills-Katalogs.',
    },
  ],
  takeaways: [
    { en: 'Agent card and skills = discovery; executor = logic; request handler and task store = lifecycle; Starlette and Uvicorn = hosting.', de: 'Agent Card und Skills = Erkennung; Executor = Logik; Request Handler und Task Store = Lebenszyklus; Starlette und Uvicorn = Hosting.' },
    { en: 'Clients resolve the card from the base URL, then send messages and handle either direct messages or tasks.', de: 'Clients lösen die Card über die Basis-URL auf, senden dann Nachrichten und verarbeiten direkte Nachrichten oder Tasks.' },
    { en: 'In Foundry: GA `a2a` tool (v1.0) through a project connection to call out; incoming A2A with Entra ID and Foundry Agent Consumer to be called.', de: 'In Foundry: GA-Tool `a2a` (v1.0) über eine Projektverbindung zum Aufrufen; eingehendes A2A mit Entra ID und Foundry Agent Consumer, um aufgerufen zu werden.' },
    { en: 'Treat remote agent cards as untrusted input: connect only to trusted providers and enforce permissions outside the model\'s decisions.', de: 'Behandle entfernte Agent Cards als nicht vertrauenswürdige Eingabe: Verbinde dich nur mit vertrauenswürdigen Anbietern und erzwinge Berechtigungen außerhalb der Modellentscheidungen.' },
  ],
  sources: [
    { title: 'Host agents with A2A (Microsoft Agent Framework)', url: 'https://learn.microsoft.com/en-us/agent-framework/hosting/self-hosting/a2a/server?pivots=programming-language-python' },
    { title: 'A2A agent service (Microsoft Agent Framework)', url: 'https://learn.microsoft.com/en-us/agent-framework/integrations/by-component/agent-services/a2a?pivots=programming-language-python' },
    { title: 'A2A SDK v1 migration guide', url: 'https://learn.microsoft.com/en-us/agent-framework/migration-guide/agent-to-agent-sdk-v1?pivots=programming-language-python' },
    { title: 'Connect to an A2A agent endpoint from Foundry Agent Service', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/agent-to-agent' },
    { title: 'Enable incoming A2A on a Foundry agent', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/enable-agent-to-agent-endpoint' },
    { title: 'Agent Skills (Microsoft Agent Framework)', url: 'https://learn.microsoft.com/en-us/agent-framework/agents/skills?pivots=programming-language-python' },
    { title: 'Use skills in Foundry (preview)', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/skills' },
    { title: 'Skillset concepts in Azure AI Search', url: 'https://learn.microsoft.com/en-us/azure/search/cognitive-search-working-with-skillsets' },
  ],
}
