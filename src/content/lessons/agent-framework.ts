import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'agent-framework',
  summary: {
    en: '**Microsoft Agent Framework** is Microsoft\'s open-source SDK for building AI agents and multi-agent workflows in Python and .NET — the direct successor of Semantic Kernel and AutoGen, built by the same teams. An agent combines a **chat client** (which model service to call), **instructions** (role, goal and rules), **tools** (your Python functions plus hosted tools such as code interpreter) and an **AgentSession** that carries the conversation. For Foundry you either let your app own the agent with `Agent(client=FoundryChatClient(...))` or connect to an agent defined in the portal with `FoundryAgent`. A call to `agent.run()` sends everything to the model, executes requested tools in a loop and returns the final answer.',
    de: '**Microsoft Agent Framework** ist Microsofts Open-Source-SDK für KI-Agents und Multi-Agent-Workflows in Python und .NET – der direkte Nachfolger von Semantic Kernel und AutoGen, gebaut von denselben Teams. Ein Agent kombiniert einen **Chat-Client** (welcher Modelldienst aufgerufen wird), **Instructions** (Rolle, Ziel und Regeln), **Tools** (deine Python-Funktionen plus gehostete Tools wie Code Interpreter) und eine **AgentSession**, die das Gespräch trägt. Für Foundry lässt du entweder deine App den Agent besitzen – mit `Agent(client=FoundryChatClient(...))` – oder du verbindest dich mit `FoundryAgent` mit einem im Portal definierten Agent. Ein Aufruf von `agent.run()` schickt alles ans Modell, führt angeforderte Tools in einer Schleife aus und liefert die finale Antwort.',
  },
  examFocus: {
    en: 'Expect code-reading questions: which class connects to a Foundry project or to an existing Foundry agent, where instructions and tools go, how a session keeps multi-turn context, how a Python function becomes a well-described tool (`Annotated`, docstring, `@tool`) and how approval-required tools pause a run. Outdated names from early previews (`ChatAgent`, threads, `run_stream`, `@ai_function`, `AzureAIAgentClient`) make convenient distractors.',
    de: 'Rechne mit Fragen zum Codelesen: welche Klasse sich mit einem Foundry-Projekt oder einem bestehenden Foundry-Agent verbindet, wohin Instructions und Tools gehören, wie eine Session Kontext über mehrere Runden hält, wie aus einer Python-Funktion ein gut beschriebenes Tool wird (`Annotated`, Docstring, `@tool`) und wie freigabepflichtige Tools einen Lauf pausieren. Veraltete Namen aus frühen Previews (`ChatAgent`, Threads, `run_stream`, `@ai_function`, `AzureAIAgentClient`) tauchen gern als Distraktoren auf.',
  },
  diagrams: [
    {
      id: 'agent-anatomy',
      title: { en: 'Anatomy of an Agent Framework agent', de: 'Aufbau eines Agents in Agent Framework' },
      caption: {
        en: 'The agent bundles instructions, tools and a session around one chat client; the client reaches the model deployment and hosted tools in the Foundry project.',
        de: 'Der Agent bündelt Instructions, Tools und eine Session um einen Chat-Client; der Client erreicht das Modell-Deployment und gehostete Tools im Foundry-Projekt.',
      },
      width: 960,
      height: 380,
      groups: [
        { id: 'g-app', x: 10, y: 20, w: 625, h: 344, label: { en: 'Your Python app (agent_framework)', de: 'Deine Python-App (agent_framework)' }, tone: 'app' },
        { id: 'g-foundry', x: 700, y: 130, w: 240, h: 234, label: 'Foundry project', tone: 'foundry' },
      ],
      nodes: [
        { id: 'instr', x: 30, y: 60, w: 170, h: 64, label: { en: 'Instructions', de: 'Anweisungen' }, sub: { en: 'role · goal · rules', de: 'Rolle · Ziel · Regeln' }, tone: 'neutral', shape: 'doc' },
        { id: 'tools', x: 30, y: 170, w: 170, h: 64, label: 'Tools', sub: { en: 'functions + hosted', de: 'Funktionen + gehostet' }, tone: 'tool' },
        { id: 'session', x: 30, y: 280, w: 170, h: 64, label: 'AgentSession', sub: { en: 'history or service ID', de: 'Verlauf oder Service-ID' }, tone: 'data', shape: 'store' },
        { id: 'agent', x: 260, y: 170, w: 140, h: 64, label: 'Agent', sub: 'Agent(client=…)', tone: 'app' },
        { id: 'client', x: 465, y: 170, w: 150, h: 64, label: 'FoundryChatClient', sub: { en: 'endpoint + model', de: 'Endpoint + Modell' }, tone: 'app' },
        { id: 'model', x: 720, y: 170, w: 200, h: 64, label: { en: 'Model deployment', de: 'Modell-Deployment' }, sub: { en: 'e.g. gpt-4.1', de: 'z. B. gpt-4.1' }, tone: 'model', shape: 'store' },
        { id: 'hosted', x: 720, y: 280, w: 200, h: 64, label: { en: 'Hosted tools', de: 'Gehostete Tools' }, sub: { en: 'e.g. code interpreter', de: 'z. B. Code Interpreter' }, tone: 'tool' },
      ],
      edges: [
        { id: 'e-i', from: 'instr', to: 'agent', label: 'instructions=' },
        { id: 'e-t', from: 'tools', to: 'agent', label: 'tools=' },
        { id: 'e-s', from: 'session', to: 'agent', bidir: true, label: 'session=' },
        { id: 'e-c', from: 'agent', to: 'client', label: 'client=' },
        { id: 'e-m', from: 'client', to: 'model', label: 'Responses API' },
        { id: 'e-h', from: 'client', to: 'hosted', dashed: true, label: 'get_*_tool()' },
      ],
      steps: [
        {
          title: { en: 'An agent wraps a chat client', de: 'Ein Agent umhüllt einen Chat-Client' },
          text: {
            en: 'An `Agent` always talks to a model through a chat client. `FoundryChatClient` connects to a Foundry project endpoint and a model deployment with an Azure credential — your app owns the agent definition.',
            de: 'Ein `Agent` spricht immer über einen Chat-Client mit einem Modell. `FoundryChatClient` verbindet sich mit einem Foundry-Project-Endpoint und einem Modell-Deployment über eine Azure-Anmeldung – die Agent-Definition gehört deiner App.',
          },
          focus: ['agent', 'e-c', 'client'],
        },
        {
          title: { en: 'Instructions set role and goal', de: 'Instructions legen Rolle und Ziel fest' },
          text: {
            en: '`instructions` is the system prompt: the agent\'s role, goal and constraints. `name` and `description` identify the agent, for example inside multi-agent orchestrations.',
            de: '`instructions` ist der Systemprompt: Rolle, Ziel und Grenzen des Agents. `name` und `description` identifizieren den Agent, zum Beispiel in Multi-Agent-Orchestrierungen.',
          },
          focus: ['instr', 'e-i'],
        },
        {
          title: { en: 'Tools: functions and hosted tools', de: 'Tools: Funktionen und gehostete Tools' },
          text: {
            en: 'Python functions passed in `tools` run in your process; the framework builds their schema from type annotations and the docstring. Hosted tools such as code interpreter come from factories like `FoundryChatClient.get_code_interpreter_tool()` and run in Foundry.',
            de: 'Python-Funktionen in `tools` laufen in deinem Prozess; das Framework erzeugt ihr Schema aus Typannotationen und Docstring. Gehostete Tools wie Code Interpreter kommen aus Factories wie `FoundryChatClient.get_code_interpreter_tool()` und laufen in Foundry.',
          },
          focus: ['tools', 'e-t', 'e-h', 'hosted'],
        },
        {
          title: { en: 'Sessions carry the conversation', de: 'Sessions tragen das Gespräch' },
          text: {
            en: '`agent.create_session()` returns an `AgentSession` (the successor of threads). Pass it to every `run` call: it holds local history or a `service_session_id` that points to history stored by the service.',
            de: '`agent.create_session()` liefert eine `AgentSession` (der Nachfolger der Threads). Übergib sie bei jedem `run`-Aufruf: Sie hält lokalen Verlauf oder eine `service_session_id`, die auf den vom Dienst gespeicherten Verlauf zeigt.',
          },
          focus: ['session', 'e-s'],
        },
        {
          title: { en: 'Inference in the project', de: 'Inferenz im Projekt' },
          text: {
            en: 'The client calls the model deployment through the project\'s Responses endpoint. Because every agent shares one interface, you can swap the client — for example `OpenAIChatClient` for an Azure OpenAI resource — without rewriting agent logic.',
            de: 'Der Client ruft das Modell-Deployment über den Responses-Endpoint des Projekts auf. Weil alle Agents dieselbe Schnittstelle teilen, kannst du den Client tauschen – etwa `OpenAIChatClient` für eine Azure-OpenAI-Ressource –, ohne die Agent-Logik neu zu schreiben.',
          },
          focus: ['e-m', 'model', 'g-foundry'],
        },
      ],
    },
    {
      id: 'run-loop',
      title: { en: 'What happens inside agent.run()', de: 'Was in agent.run() passiert' },
      caption: {
        en: 'The model answers or requests a tool; approval-required tools pause for a person; results loop back until a final answer is ready.',
        de: 'Das Modell antwortet oder fordert ein Tool an; freigabepflichtige Tools warten auf eine Person; Ergebnisse laufen zurück, bis eine finale Antwort steht.',
      },
      width: 960,
      height: 390,
      nodes: [
        { id: 'user', x: 20, y: 150, w: 130, h: 64, label: { en: 'User', de: 'Nutzer' }, sub: { en: 'new message', de: 'neue Nachricht' }, tone: 'user', shape: 'actor' },
        { id: 'session', x: 230, y: 30, w: 180, h: 64, label: 'AgentSession', sub: { en: 'earlier turns', de: 'frühere Runden' }, tone: 'data', shape: 'store' },
        { id: 'run', x: 230, y: 150, w: 180, h: 64, label: 'agent.run()', sub: 'session=session', tone: 'app' },
        { id: 'model', x: 530, y: 150, w: 170, h: 64, label: { en: 'Model', de: 'Modell' }, sub: { en: 'answer or tool call', de: 'Antwort oder Tool-Call' }, tone: 'model' },
        { id: 'answer', x: 790, y: 150, w: 150, h: 64, label: 'AgentResponse', sub: { en: '.text = final answer', de: '.text = Antworttext' }, tone: 'app', shape: 'pill' },
        { id: 'reviewer', x: 300, y: 298, w: 160, h: 64, label: { en: 'Reviewer', de: 'Prüfer' }, sub: { en: 'approve or reject', de: 'freigeben/ablehnen' }, tone: 'user', shape: 'actor' },
        { id: 'appr', x: 540, y: 290, w: 150, h: 80, label: { en: 'Approval?', de: 'Freigabe?' }, sub: 'approval_mode', tone: 'safety', shape: 'diamond' },
        { id: 'tool', x: 770, y: 298, w: 150, h: 64, label: { en: 'Function tool', de: 'Funktionstool' }, sub: { en: 'your process', de: 'dein Prozess' }, tone: 'tool' },
      ],
      edges: [
        { id: 'r1', from: 'user', to: 'run', label: { en: 'message', de: 'Nachricht' } },
        { id: 'r2', from: 'session', to: 'run', bidir: true, label: { en: 'history', de: 'Verlauf' } },
        { id: 'r3', from: 'run', to: 'model', label: { en: '+ tool schemas', de: '+ Tool-Schemas' } },
        { id: 'r4', from: 'model', to: 'appr', label: { en: 'tool call', de: 'Tool-Aufruf' } },
        { id: 'r5', from: 'appr', to: 'tool', label: { en: 'approved', de: 'genehmigt' } },
        { id: 'r6', from: 'appr', to: 'reviewer', bidir: true, label: { en: 'approve?', de: 'Freigabe?' } },
        { id: 'r7', from: 'tool', to: 'model', via: [[845, 250], [680, 250]], label: { en: 'result', de: 'Ergebnis' } },
        { id: 'r8', from: 'model', to: 'answer', label: 'final' },
      ],
      steps: [
        {
          title: { en: 'Run with a session', de: 'Mit einer Session starten' },
          text: {
            en: 'Your code calls `await agent.run(message, session=session)`. The session supplies the earlier turns — kept locally or referenced through a service-side conversation ID.',
            de: 'Dein Code ruft `await agent.run(message, session=session)` auf. Die Session liefert die früheren Runden – lokal gehalten oder über eine serverseitige Conversation-ID referenziert.',
          },
          focus: ['user', 'r1', 'run', 'session', 'r2'],
        },
        {
          title: { en: 'The model decides', de: 'Das Modell entscheidet' },
          text: {
            en: 'The client sends instructions, history and the generated tool schemas. The model either answers directly or requests a tool call with arguments.',
            de: 'Der Client schickt Instructions, Verlauf und die generierten Tool-Schemas. Das Modell antwortet direkt oder fordert einen Tool-Aufruf mit Argumenten an.',
          },
          focus: ['r3', 'model'],
        },
        {
          title: { en: 'Optional approval gate', de: 'Optionale Freigabe' },
          text: {
            en: 'For a tool declared with `approval_mode="always_require"`, the run returns `user_input_requests` instead of executing. You resume with `to_function_approval_response(True)` or `False` in the same session.',
            de: 'Bei einem Tool mit `approval_mode="always_require"` liefert der Lauf `user_input_requests`, statt auszuführen. Du setzt mit `to_function_approval_response(True)` oder `False` in derselben Session fort.',
          },
          focus: ['r4', 'appr', 'r6', 'reviewer'],
        },
        {
          title: { en: 'Your function runs', de: 'Deine Funktion läuft' },
          text: {
            en: 'Approved or approval-free calls run as local Python functions. The result goes back to the model, and the loop repeats until no tool call is left.',
            de: 'Genehmigte oder freigabefreie Aufrufe laufen als lokale Python-Funktionen. Das Ergebnis geht zurück ans Modell, und die Schleife wiederholt sich, bis kein Tool-Aufruf mehr offen ist.',
          },
          focus: ['r5', 'tool', 'r7'],
        },
        {
          title: { en: 'Final answer', de: 'Finale Antwort' },
          text: {
            en: '`run` returns an `AgentResponse`; its `.text` aggregates the text output. With `stream=True` the same `run` method yields updates as they arrive.',
            de: '`run` liefert eine `AgentResponse`; ihr `.text` fasst die Textausgabe zusammen. Mit `stream=True` liefert dieselbe `run`-Methode die Updates, sobald sie eintreffen.',
          },
          focus: ['r8', 'answer'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Microsoft Agent Framework',
      text: {
        en: 'Open-source SDK for agents and multi-agent workflows and the direct successor of Semantic Kernel and AutoGen. It combines AutoGen\'s simple agent abstractions with Semantic Kernel\'s enterprise features — session-based state, type safety, middleware and telemetry — and adds graph-based workflows.',
        de: 'Open-Source-SDK für Agents und Multi-Agent-Workflows und direkter Nachfolger von Semantic Kernel und AutoGen. Es verbindet die einfachen Agent-Abstraktionen von AutoGen mit den Enterprise-Features von Semantic Kernel – sessionbasierter Zustand, Typsicherheit, Middleware und Telemetrie – und ergänzt graphbasierte Workflows.',
      },
    },
    {
      term: 'Agent',
      text: {
        en: 'The unified agent class: `Agent(client=..., name=..., instructions=..., tools=[...])`. It behaves the same with every chat client, so you can change the model provider without changing agent logic. `client.as_agent(...)` is a shortcut.',
        de: 'Die einheitliche Agent-Klasse: `Agent(client=..., name=..., instructions=..., tools=[...])`. Sie verhält sich mit jedem Chat-Client gleich, sodass du den Modellanbieter wechseln kannst, ohne die Agent-Logik zu ändern. `client.as_agent(...)` ist eine Abkürzung.',
      },
    },
    {
      term: 'FoundryChatClient vs FoundryAgent',
      text: {
        en: '`FoundryChatClient` gives direct inference on a model deployment in a Foundry project; your app owns instructions, tools and sessions. `FoundryAgent` connects to a prompt agent or hosted agent defined in Foundry; its stored model, instructions and hosted tools are authoritative.',
        de: '`FoundryChatClient` liefert direkte Inferenz auf einem Modell-Deployment in einem Foundry-Projekt; Instructions, Tools und Sessions gehören deiner App. `FoundryAgent` verbindet sich mit einem in Foundry definierten Prompt- oder Hosted Agent; dessen gespeichertes Modell, Instructions und gehostete Tools sind maßgeblich.',
      },
    },
    {
      term: 'AgentSession',
      text: {
        en: 'The conversation state across runs, created with `agent.create_session()`. It keeps local history (for example through `InMemoryHistoryProvider`) or a `service_session_id` for service-managed history; persist it with `to_dict()`/`from_dict()` or reopen it with `get_session(service_session_id=...)`.',
        de: 'Der Gesprächszustand über mehrere Läufe, erstellt mit `agent.create_session()`. Er hält lokalen Verlauf (etwa über `InMemoryHistoryProvider`) oder eine `service_session_id` für dienstverwalteten Verlauf; du speicherst ihn mit `to_dict()`/`from_dict()` oder öffnest ihn erneut mit `get_session(service_session_id=...)`.',
      },
    },
    {
      term: 'Function tools',
      text: {
        en: 'Any Python function becomes a tool when you pass it in `tools`. `Annotated[..., Field(description=...)]` and the docstring shape the generated schema; `@tool(name=..., description=..., approval_mode=...)` gives explicit control. The function runs in your process.',
        de: 'Jede Python-Funktion wird zum Tool, wenn du sie in `tools` übergibst. `Annotated[..., Field(description=...)]` und der Docstring formen das generierte Schema; `@tool(name=..., description=..., approval_mode=...)` gibt dir explizite Kontrolle. Die Funktion läuft in deinem Prozess.',
      },
    },
    {
      term: 'Hosted tools',
      text: {
        en: 'Tools that the provider runs, created with client factory methods such as `get_code_interpreter_tool()`, `get_file_search_tool(...)`, `get_web_search_tool()` or `get_mcp_tool(...)`. The older `Hosted*Tool` classes were removed.',
        de: 'Tools, die der Anbieter ausführt, erstellt über Factory-Methoden des Clients wie `get_code_interpreter_tool()`, `get_file_search_tool(...)`, `get_web_search_tool()` oder `get_mcp_tool(...)`. Die älteren `Hosted*Tool`-Klassen wurden entfernt.',
      },
    },
    {
      term: 'Agent as a tool',
      text: {
        en: '`specialist.as_tool()` turns an agent into a function tool for another agent. The coordinating agent delegates a subtask, gets the result back and keeps responsibility for the conversation.',
        de: '`specialist.as_tool()` macht aus einem Agent ein Funktionstool für einen anderen Agent. Der koordinierende Agent delegiert eine Teilaufgabe, bekommt das Ergebnis zurück und behält die Verantwortung für das Gespräch.',
      },
    },
  ],
  comparison: {
    title: { en: 'Which Agent Framework class for which target?', de: 'Welche Agent-Framework-Klasse für welches Ziel?' },
    columns: [
      { en: 'Target', de: 'Ziel' },
      { en: 'Python shape', de: 'Python-Form' },
      { en: 'Owner of instructions and tools', de: 'Besitzer von Instructions und Tools' },
    ],
    rows: [
      [{ en: 'Model in a Foundry project', de: 'Modell in einem Foundry-Projekt' }, 'Agent(client=FoundryChatClient(...))', { en: 'Your app', de: 'Deine App' }],
      [{ en: 'Prompt or hosted agent in Foundry', de: 'Prompt- oder Hosted Agent in Foundry' }, 'FoundryAgent(agent_name=..., agent_version=...)', { en: 'Foundry (stored definition)', de: 'Foundry (gespeicherte Definition)' }],
      [{ en: 'Azure OpenAI resource', de: 'Azure-OpenAI-Ressource' }, 'Agent(client=OpenAIChatClient(...))', { en: 'Your app', de: 'Deine App' }],
      [{ en: 'Local model', de: 'Lokales Modell' }, 'Agent(client=FoundryLocalClient(...))', { en: 'Your app', de: 'Deine App' }],
      [{ en: 'Remote A2A agent', de: 'Entfernter A2A-Agent' }, 'A2AAgent(url=...) or A2AAgent(agent_card=...)', { en: 'The remote agent', de: 'Der entfernte Agent' }],
    ],
  },
  code: [
    {
      title: { en: 'Foundry-backed agent with a function tool and a session', de: 'Foundry-Agent mit Funktionstool und Session' },
      code: `import asyncio
from typing import Annotated

from agent_framework import Agent
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential
from pydantic import Field

def get_order_status(
    order_id: Annotated[str, Field(description="Order number, for example A-1042.")],
) -> str:
    """Look up the shipping status of an order."""
    return f"Order {order_id} ships tomorrow."

async def main() -> None:
    agent = Agent(
        client=FoundryChatClient(
            project_endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
            model="gpt-4.1",                          # your deployment name
            credential=AzureCliCredential(),
        ),
        name="SupportAgent",
        instructions="You are a concise support agent. Use tools for order data.",
        tools=[get_order_status],
    )
    session = agent.create_session()                  # keeps the conversation
    first = await agent.run("Where is order A-1042?", session=session)
    second = await agent.run("When will it arrive?", session=session)
    print(first.text, second.text)

asyncio.run(main())`,
      notes: [
        { en: 'Install `agent-framework-foundry` and `azure-identity`, then sign in with `az login`. The annotations and the docstring become the tool schema.', de: 'Installiere `agent-framework-foundry` und `azure-identity` und melde dich mit `az login` an. Annotationen und Docstring werden zum Tool-Schema.' },
        { en: 'Reuse the same `session` for follow-ups. `agent.run(..., stream=True)` streams updates; there is no separate `run_stream` method anymore.', de: 'Nutze für Folgefragen dieselbe `session`. `agent.run(..., stream=True)` streamt Updates; eine eigene `run_stream`-Methode gibt es nicht mehr.' },
      ],
    },
    {
      title: { en: 'Require human approval before a tool runs', de: 'Menschliche Freigabe vor einem Tool-Aufruf verlangen' },
      code: `from agent_framework import Agent, Message, tool

@tool(approval_mode="always_require")
def issue_refund(order_id: str, amount: float) -> str:
    """Issue a refund for an order."""
    return f"Refunded {amount} EUR for order {order_id}."

# client = FoundryChatClient(...) as in the previous sample
agent = Agent(client=client, instructions="You handle refunds.", tools=[issue_refund])
session = agent.create_session()
result = await agent.run("Refund 40 EUR for order A-1042.", session=session)

if result.user_input_requests:                        # paused, nothing executed yet
    for request in result.user_input_requests:
        print(request.function_call.name, request.function_call.arguments)
    approvals = [
        Message(role="user", contents=[request.to_function_approval_response(True)])
        for request in result.user_input_requests
    ]
    result = await agent.run(approvals, session=session)   # same session
print(result.text)`,
      notes: [
        { en: 'With `approval_mode="always_require"` the run returns `user_input_requests` instead of calling the function.', de: 'Mit `approval_mode="always_require"` liefert der Lauf `user_input_requests`, statt die Funktion aufzurufen.' },
        { en: 'An approval response only counts when it matches a pending request in the same `AgentSession`.', de: 'Eine Freigabe zählt nur, wenn sie zu einer offenen Anfrage in derselben `AgentSession` passt.' },
      ],
    },
  ],
  traps: [
    {
      en: 'Early preview names are gone: use `Agent` (not `ChatAgent`), `AgentSession` and `create_session()` (not threads), `run(..., stream=True)` (not `run_stream`) and `@tool` (not `@ai_function`).',
      de: 'Frühe Preview-Namen sind weg: Nutze `Agent` (nicht `ChatAgent`), `AgentSession` und `create_session()` (keine Threads), `run(..., stream=True)` (nicht `run_stream`) und `@tool` (nicht `@ai_function`).',
    },
    {
      en: '`AzureAIAgentClient` and `AzureAIClient` were removed from current Agent Framework: use `FoundryChatClient` for project inference and `FoundryAgent` for agents defined in Foundry.',
      de: '`AzureAIAgentClient` und `AzureAIClient` wurden aus dem aktuellen Agent Framework entfernt: Nutze `FoundryChatClient` für Projekt-Inferenz und `FoundryAgent` für in Foundry definierte Agents.',
    },
    {
      en: 'With `FoundryAgent` the stored Foundry definition wins: `model`, `instructions` and new hosted tools passed in code are ignored. Use `Agent(client=FoundryChatClient(...))` when code must control them.',
      de: 'Bei `FoundryAgent` gewinnt die gespeicherte Foundry-Definition: `model`, `instructions` und neue gehostete Tools aus dem Code werden ignoriert. Nutze `Agent(client=FoundryChatClient(...))`, wenn der Code sie steuern muss.',
    },
    {
      en: 'Chat Completions providers have no service-managed history: their sessions keep history locally, which is lost on restart unless you persist the session.',
      de: 'Chat-Completions-Anbieter haben keinen dienstverwalteten Verlauf: Ihre Sessions halten den Verlauf lokal, und er geht beim Neustart verloren, wenn du die Session nicht speicherst.',
    },
    {
      en: 'The model chooses tools only from names, descriptions and parameter descriptions — vague docstrings cause missing or wrong tool calls.',
      de: 'Das Modell wählt Tools nur anhand von Namen, Beschreibungen und Parameterbeschreibungen – vage Docstrings führen zu fehlenden oder falschen Tool-Aufrufen.',
    },
  ],
  takeaways: [
    { en: 'Your app owns the agent → `Agent(client=FoundryChatClient(...))`; Foundry owns it → `FoundryAgent`.', de: 'Deine App besitzt den Agent → `Agent(client=FoundryChatClient(...))`; Foundry besitzt ihn → `FoundryAgent`.' },
    { en: 'Role and goal go into `instructions`; context across turns lives in an `AgentSession`.', de: 'Rolle und Ziel gehören in `instructions`; Kontext über Runden lebt in einer `AgentSession`.' },
    { en: 'Function tools are typed, documented Python functions in `tools`; hosted tools come from `client.get_*_tool()`.', de: 'Funktionstools sind typisierte, dokumentierte Python-Funktionen in `tools`; gehostete Tools kommen aus `client.get_*_tool()`.' },
    { en: 'Sensitive tools: `@tool(approval_mode="always_require")`, then resume in the same session.', de: 'Heikle Tools: `@tool(approval_mode="always_require")`, dann in derselben Session fortsetzen.' },
  ],
  sources: [
    { title: 'Microsoft Agent Framework overview', url: 'https://learn.microsoft.com/en-us/agent-framework/overview/' },
    { title: 'Microsoft Foundry model provider (Agent Framework)', url: 'https://learn.microsoft.com/en-us/agent-framework/integrations/by-component/model-providers/microsoft-foundry?pivots=programming-language-python' },
    { title: 'Microsoft Foundry Agent Service (FoundryAgent)', url: 'https://learn.microsoft.com/en-us/agent-framework/integrations/by-component/agent-services/foundry?pivots=programming-language-python' },
    { title: 'Using function tools with an agent', url: 'https://learn.microsoft.com/en-us/agent-framework/agents/tools/function-tools?pivots=programming-language-python' },
    { title: 'Python 2026 significant changes guide', url: 'https://learn.microsoft.com/en-us/agent-framework/support/upgrade/python-2026-significant-changes' },
  ],
}
