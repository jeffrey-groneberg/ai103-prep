import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'agent-framework',
  summary: {
    en: '**Microsoft Agent Framework** is Microsoft\'s open-source SDK for building AI agents and multi-agent workflows in Python and .NET — the direct successor of Semantic Kernel and AutoGen, built by the same teams. An agent combines a **chat client** (which model service to call), **instructions** (role, goal and rules), **tools** (your Python functions plus hosted tools such as code interpreter) and an **AgentSession** that keeps the chat history. For Foundry you either let your app own the agent with `Agent(client=FoundryChatClient(...))` or connect to an agent defined in the portal with `FoundryAgent`. A call to `agent.run()` sends everything to the model, executes requested tools in a loop and returns the final answer.',
    de: '**Microsoft Agent Framework** ist Microsofts Open-Source-SDK für KI-Agents und Multi-Agent-Workflows in Python und .NET – der direkte Nachfolger von Semantic Kernel und AutoGen, gebaut von denselben Teams. Ein Agent kombiniert einen **Chat-Client** (welcher Modelldienst aufgerufen wird), **Instructions** (Rolle, Ziel und Regeln), **Tools** (deine Python-Funktionen plus gehostete Tools wie Code Interpreter) und eine **AgentSession**, die den Chatverlauf hält. Für Foundry lässt du entweder deine App den Agent besitzen – mit `Agent(client=FoundryChatClient(...))` – oder du verbindest dich mit `FoundryAgent` mit einem im Portal definierten Agent. Ein Aufruf von `agent.run()` schickt alles ans Modell, führt angeforderte Tools in einer Schleife aus und liefert die finale Antwort.',
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
        en: 'The agent bundles instructions and tools around one chat client; each run takes an AgentSession. The client reaches a model deployment through the project endpoint, and hosted tools run in Foundry when the model calls them.',
        de: 'Der Agent bündelt Instructions und Tools um einen Chat-Client; jeder Lauf bekommt eine AgentSession. Der Client erreicht über den Projekt-Endpoint ein Modell-Deployment, und gehostete Tools laufen in Foundry, wenn das Modell sie aufruft.',
      },
      width: 960,
      height: 520,
      groups: [
        { id: 'g-app', x: 10, y: 20, w: 940, h: 330, label: { en: 'Your Python app (agent_framework)', de: 'Deine Python-App (agent_framework)' }, tone: 'app' },
        { id: 'g-foundry', x: 360, y: 380, w: 480, h: 124, label: { en: 'Foundry resource · via project endpoint', de: 'Foundry-Ressource · über den Projekt-Endpoint' }, tone: 'platform' },
      ],
      nodes: [
        { id: 'instr', x: 380, y: 50, w: 170, h: 64, label: { en: 'Instructions', de: 'Anweisungen' }, sub: { en: 'role · goal · rules', de: 'Rolle · Ziel · Regeln' }, icon: 'guide', tone: 'neutral', shape: 'doc' },
        { id: 'tools', x: 130, y: 160, w: 170, h: 64, label: 'Tools', sub: { en: 'functions +\nget_*_tool()', de: 'Funktionen +\nget_*_tool()' }, icon: 'toolbox', tone: 'tool' },
        { id: 'agent', x: 390, y: 160, w: 150, h: 64, label: 'Agent', sub: 'Agent(client=…)', icon: 'code', tone: 'app' },
        { id: 'client', x: 647, y: 160, w: 176, h: 64, label: 'FoundryChatClient', sub: { en: 'endpoint + model', de: 'Endpoint + Modell' }, icon: 'code', tone: 'app' },
        { id: 'session', x: 380, y: 270, w: 170, h: 64, label: 'AgentSession', sub: 'agent.create_session()', icon: 'table', tone: 'data', shape: 'store' },
        { id: 'hosted', x: 380, y: 420, w: 170, h: 64, label: { en: 'Hosted tools', de: 'Gehostete Tools' }, sub: { en: 'e.g. code interpreter', de: 'z. B. Code Interpreter' }, icon: 'toolbox', tone: 'tool' },
        { id: 'model', x: 647, y: 420, w: 176, h: 64, label: { en: 'Model deployment', de: 'Modell-Deployment' }, sub: { en: 'e.g. gpt-5-mini', de: 'z. B. gpt-5-mini' }, icon: 'foundry-models', tone: 'model', shape: 'store' },
      ],
      edges: [
        { id: 'e-i', from: 'instr', to: 'agent', label: 'instructions=' },
        { id: 'e-t', from: 'tools', to: 'agent', label: 'tools=' },
        { id: 'e-c', from: 'agent', to: 'client', label: 'client=' },
        { id: 'e-s', from: 'session', to: 'agent', bidir: true, dashed: true, label: 'run(session=…)' },
        { id: 'e-m', from: 'client', to: 'model', label: 'Responses API' },
        { id: 'e-mh', from: 'model', to: 'hosted', dashed: true, label: { en: 'tool call', de: 'Tool-Aufruf' } },
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
            en: 'Python functions passed in `tools` run in your process; the framework builds their schema from type annotations and the docstring. Hosted tools such as code interpreter go into the same list through factories like `FoundryChatClient.get_code_interpreter_tool()`. The factory only declares the tool; when the model calls it, it runs in Foundry.',
            de: 'Python-Funktionen in `tools` laufen in deinem Prozess; das Framework erzeugt ihr Schema aus Typannotationen und Docstring. Gehostete Tools wie Code Interpreter kommen über Factories wie `FoundryChatClient.get_code_interpreter_tool()` in dieselbe Liste. Die Factory deklariert das Tool nur; ruft das Modell es auf, läuft es in Foundry.',
          },
          focus: ['tools', 'e-t', 'e-mh', 'hosted'],
        },
        {
          title: { en: 'Each run takes a session', de: 'Jeder Lauf bekommt eine Session' },
          text: {
            en: '`agent.create_session()` returns an `AgentSession` (the successor of threads). It isn\'t an `Agent(...)` argument: pass it to every `agent.run(..., session=session)` call. It holds local history or a `service_session_id` that points to history stored by the service.',
            de: '`agent.create_session()` liefert eine `AgentSession` (der Nachfolger der Threads). Sie ist kein Argument von `Agent(...)`: Übergib sie bei jedem Aufruf `agent.run(..., session=session)`. Sie hält lokalen Verlauf oder eine `service_session_id`, die auf den vom Dienst gespeicherten Verlauf zeigt.',
          },
          focus: ['session', 'e-s'],
        },
        {
          title: { en: 'Inference in the project', de: 'Inferenz im Projekt' },
          text: {
            en: 'The client calls the model deployment through the project\'s **Responses API** (OpenAI-compatible API that returns a response object; keeps state via `previous_response_id` or a **conversation**, a durable item store for multi-turn state). Deployments live on the Foundry resource, and projects reuse them. Because every agent shares one interface, you can swap the client — for example `OpenAIChatClient` for an Azure OpenAI resource — without rewriting agent logic.',
            de: 'Der Client ruft das Modell-Deployment über die **Responses API** des Projekts auf (OpenAI-kompatible API, die ein Response-Objekt liefert; hält den Zustand über `previous_response_id` oder eine **Conversation**, einen dauerhaften Item-Speicher für Zustand über mehrere Runden). Deployments liegen auf der Foundry-Ressource, und Projekte nutzen sie mit. Weil alle Agents dieselbe Schnittstelle teilen, kannst du den Client tauschen – etwa `OpenAIChatClient` für eine Azure-OpenAI-Ressource –, ohne die Agent-Logik neu zu schreiben.',
          },
          focus: ['e-m', 'model', 'g-foundry'],
        },
      ],
    },
    {
      id: 'run-loop',
      title: { en: 'What happens inside agent.run()', de: 'Was in agent.run() passiert' },
      caption: {
        en: 'The model answers or requests a tool. A tool that needs approval ends the run with user_input_requests; your code asks a reviewer and starts a new run in the same session. Results loop back until a final answer is ready.',
        de: 'Das Modell antwortet oder fordert ein Tool an. Ein freigabepflichtiges Tool beendet den Lauf mit user_input_requests; dein Code fragt einen Prüfer und startet einen neuen Lauf in derselben Session. Ergebnisse laufen zurück, bis eine finale Antwort steht.',
      },
      width: 960,
      height: 530,
      nodes: [
        { id: 'session', x: 240, y: 30, w: 180, h: 64, label: 'AgentSession', sub: { en: 'earlier turns', de: 'frühere Runden' }, icon: 'table', tone: 'data', shape: 'store' },
        { id: 'answer', x: 580, y: 30, w: 170, h: 64, label: 'AgentResponse', sub: { en: '.text = final answer', de: '.text = Antworttext' }, icon: 'file', tone: 'app', shape: 'pill' },
        { id: 'user', x: 20, y: 160, w: 130, h: 64, label: { en: 'User', de: 'Nutzer' }, sub: { en: 'new message', de: 'neue Nachricht' }, icon: 'users', tone: 'user', shape: 'actor' },
        { id: 'run', x: 240, y: 160, w: 180, h: 64, label: 'agent.run()', sub: 'session=session', icon: 'code', tone: 'app' },
        { id: 'model', x: 580, y: 160, w: 170, h: 64, label: { en: 'Model', de: 'Modell' }, sub: { en: 'answer or tool call', de: 'Antwort oder Tool-Call' }, icon: 'foundry-models', tone: 'model' },
        { id: 'reviewer', x: 240, y: 300, w: 180, h: 64, label: { en: 'Reviewer', de: 'Prüfer' }, sub: { en: 'approve or reject', de: 'freigeben/ablehnen' }, icon: 'users', tone: 'user', shape: 'actor' },
        { id: 'appr', x: 580, y: 300, w: 170, h: 80, label: { en: 'Needs approval?', de: 'Freigabe nötig?' }, sub: 'approval_mode', icon: 'conditional-access', tone: 'safety', shape: 'diamond' },
        { id: 'pending', x: 240, y: 450, w: 180, h: 64, label: 'AgentResponse', sub: '.user_input_requests', icon: 'file', tone: 'app', shape: 'pill' },
        { id: 'tool', x: 590, y: 450, w: 150, h: 64, label: { en: 'Function tool', de: 'Funktionstool' }, sub: { en: 'your process', de: 'dein Prozess' }, icon: 'code', tone: 'tool' },
      ],
      edges: [
        { id: 'r1', from: 'user', to: 'run', label: { en: 'message', de: 'Nachricht' } },
        { id: 'r2', from: 'session', to: 'run', bidir: true, label: { en: 'history', de: 'Verlauf' } },
        { id: 'r3', from: 'run', to: 'model', label: { en: '+ tool schemas', de: '+ Tool-Schemas' } },
        { id: 'r4', from: 'model', to: 'appr', label: { en: 'tool call', de: 'Tool-Aufruf' } },
        { id: 'r9', from: 'appr', to: 'pending', via: [[490, 340], [490, 482]], label: { en: 'yes · run ends', de: 'ja · Lauf endet' } },
        { id: 'r10', from: 'pending', to: 'reviewer', label: { en: 'your code asks', de: 'dein Code fragt' } },
        { id: 'r11', from: 'reviewer', to: 'run', label: { en: 'approval → new run', de: 'Freigabe → neuer Lauf' } },
        { id: 'r5', from: 'appr', to: 'tool', label: { en: 'not needed / approved', de: 'nicht nötig / genehmigt' } },
        { id: 'r7', from: 'tool', to: 'model', via: [[820, 482], [820, 192]], label: { en: 'result', de: 'Ergebnis' } },
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
          title: { en: 'Approval ends the run', de: 'Eine Freigabe beendet den Lauf' },
          text: {
            en: 'For a tool declared with `approval_mode="always_require"`, `run()` ends without executing it and returns an `AgentResponse` whose `user_input_requests` list the pending calls. Your code shows them to a reviewer and starts a new `run()` in the same session with `to_function_approval_response(True)`; `False` rejects the call, and the function doesn\'t run.',
            de: 'Bei einem Tool mit `approval_mode="always_require"` endet `run()`, ohne es auszuführen, und liefert eine `AgentResponse`, deren `user_input_requests` die offenen Aufrufe auflisten. Dein Code zeigt sie einem Prüfer und startet einen neuen `run()` in derselben Session mit `to_function_approval_response(True)`; `False` lehnt den Aufruf ab, und die Funktion läuft nicht.',
          },
          focus: ['r4', 'appr', 'r9', 'pending', 'r10', 'reviewer', 'r11', 'run'],
        },
        {
          title: { en: 'Your function runs', de: 'Deine Funktion läuft' },
          text: {
            en: 'Calls that need no approval, or were approved in the new run, execute as local Python functions. The result goes back to the model, and the loop repeats until no tool call is left.',
            de: 'Aufrufe ohne Freigabepflicht oder mit Freigabe aus dem neuen Lauf werden als lokale Python-Funktionen ausgeführt. Das Ergebnis geht zurück ans Modell, und die Schleife wiederholt sich, bis kein Tool-Aufruf mehr offen ist.',
          },
          focus: ['appr', 'r5', 'tool', 'r7'],
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
        en: '`FoundryChatClient` gives direct inference on a model deployment in a Foundry project; your app owns instructions, tools and sessions. `FoundryAgent` connects to a **prompt agent** (declarative agent: model + instructions + tools, versioned in Foundry) or a **hosted agent** (your own agent code in a container that Foundry runs). Its stored model, instructions and hosted tools are authoritative; a local Python function runs only if the Foundry agent already declares it.',
        de: '`FoundryChatClient` liefert direkte Inferenz auf einem Modell-Deployment in einem Foundry-Projekt; Instructions, Tools und Sessions gehören deiner App. `FoundryAgent` verbindet sich mit einem **Prompt Agent** (deklarativer Agent: Modell + Instructions + Tools, versioniert in Foundry) oder einem **Hosted Agent** (dein eigener Agent-Code in einem Container, den Foundry ausführt). Dessen gespeichertes Modell, Instructions und gehostete Tools sind maßgeblich; eine lokale Python-Funktion läuft nur, wenn der Foundry-Agent sie bereits deklariert.',
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
        en: 'Tools that the provider runs, created with class methods of the client and passed in `tools`, for example `FoundryChatClient.get_code_interpreter_tool()`, `.get_file_search_tool(...)`, `.get_web_search_tool()` or `.get_mcp_tool(...)` for **MCP** (Model Context Protocol: standard for exposing tools to agents). The older `Hosted*Tool` classes were removed.',
        de: 'Tools, die der Anbieter ausführt, erstellt über Klassenmethoden des Clients und in `tools` übergeben, zum Beispiel `FoundryChatClient.get_code_interpreter_tool()`, `.get_file_search_tool(...)`, `.get_web_search_tool()` oder `.get_mcp_tool(...)` für **MCP** (Model Context Protocol: Standard, um Agents Tools bereitzustellen). Die älteren `Hosted*Tool`-Klassen wurden entfernt.',
      },
    },
    {
      term: 'Agent as a tool',
      text: {
        en: '`specialist.as_tool()` turns an agent into a function tool for another agent. The coordinating agent delegates a subtask, gets the result back and keeps responsibility for the conversation.',
        de: '`specialist.as_tool()` macht aus einem Agent ein Funktionstool für einen anderen Agent. Der koordinierende Agent delegiert eine Teilaufgabe, bekommt das Ergebnis zurück und behält die Verantwortung für das Gespräch.',
      },
    },
    {
      term: 'Context providers (memory)',
      text: {
        en: 'Context providers run around every `agent.run()`: before the call they can add instructions, messages or tools, and afterwards they can save what they learned; you pass them in `context_providers=[...]`. Short-term memory is one session\'s history (for example `InMemoryHistoryProvider`). For long-term memory across sessions, `FoundryMemoryProvider(project_client=..., memory_store_name=..., scope=...)` extracts facts such as preferences into a Foundry memory store (preview) and retrieves the relevant ones in later runs. Set `scope` to a stable, trusted key such as the signed-in user\'s ID; without it the session ID becomes the scope, so the memories stay inside that one session.',
        de: 'Context Provider laufen rund um jedes `agent.run()`: Vorher können sie Instructions, Nachrichten oder Tools ergänzen, danach können sie speichern, was sie gelernt haben; du übergibst sie in `context_providers=[...]`. Kurzzeitgedächtnis ist der Verlauf einer Session (etwa über `InMemoryHistoryProvider`). Für ein Langzeitgedächtnis über Sessions hinweg extrahiert `FoundryMemoryProvider(project_client=..., memory_store_name=..., scope=...)` Fakten wie Vorlieben in einen Foundry Memory Store (Preview) und holt die passenden in späteren Läufen zurück. Setze `scope` auf einen stabilen, vertrauenswürdigen Schlüssel wie die ID des angemeldeten Nutzers; ohne ihn wird die Session-ID zum Scope, und die Erinnerungen bleiben in dieser einen Session.',
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
      [{ en: 'Azure OpenAI resource', de: 'Azure-OpenAI-Ressource' }, { en: 'Agent(client=OpenAIChatClient(...)) for Responses or Agent(client=OpenAIChatCompletionClient(...)) for Chat Completions', de: 'Agent(client=OpenAIChatClient(...)) für Responses oder Agent(client=OpenAIChatCompletionClient(...)) für Chat Completions' }, { en: 'Your app', de: 'Deine App' }],
      [{ en: 'Local model', de: 'Lokales Modell' }, 'Agent(client=FoundryLocalClient(...))', { en: 'Your app', de: 'Deine App' }],
      [{ en: 'Remote A2A agent', de: 'Entfernter A2A-Agent' }, 'A2AAgent(url=...) or A2AAgent(agent_card=...)', { en: 'The remote agent', de: 'Der entfernte Agent' }],
    ],
  },
  code: [
    {
      title: { en: 'Foundry-backed agent with a function tool, a hosted tool and a session', de: 'Foundry-Agent mit Funktionstool, gehostetem Tool und Session' },
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
            model="gpt-5-mini",                       # deployment name
            credential=AzureCliCredential(),
        ),
        name="SupportAgent",
        instructions="You are a concise support agent. Use tools for order data.",
        tools=[get_order_status, FoundryChatClient.get_code_interpreter_tool()],
    )
    session = agent.create_session()                  # keeps the conversation
    first = await agent.run("Where is order A-1042?", session=session)
    second = await agent.run("When will it arrive?", session=session)
    print(first.text, second.text)

asyncio.run(main())`,
      notes: [
        { en: 'Install `agent-framework-foundry` and `azure-identity`, then sign in with `az login`. The annotations and the docstring become the tool schema; code interpreter runs in Foundry.', de: 'Installiere `agent-framework-foundry` und `azure-identity` und melde dich mit `az login` an. Annotationen und Docstring werden zum Tool-Schema; Code Interpreter läuft in Foundry.' },
        { en: '`model` takes the deployment name, which can be any name you chose when you deployed the model.', de: '`model` erwartet den Deployment-Namen, den du beim Bereitstellen des Modells frei wählen kannst.' },
        { en: 'Reuse the same `session` for follow-ups. `agent.run(..., stream=True)` streams updates; there is no separate `run_stream` method anymore.', de: 'Nutze für Folgefragen dieselbe `session`. `agent.run(..., stream=True)` streamt Updates; eine eigene `run_stream`-Methode gibt es nicht mehr.' },
      ],
    },
    {
      title: { en: 'Require human approval before a tool runs', de: 'Menschliche Freigabe vor einem Tool-Aufruf verlangen' },
      code: `import asyncio

from agent_framework import Agent, Message, tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="always_require")
def issue_refund(order_id: str, amount: float) -> str:
    """Issue a refund for an order."""
    return f"Refunded {amount} EUR for order {order_id}."

async def main() -> None:
    client = FoundryChatClient(
        project_endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
        model="gpt-5-mini",                          # deployment name
        credential=AzureCliCredential(),
    )
    agent = Agent(client=client, instructions="You handle refunds.", tools=[issue_refund])
    session = agent.create_session()
    result = await agent.run("Refund 40 EUR for order A-1042.", session=session)

    while result.user_input_requests:                # paused, nothing executed yet
        approvals = []
        for request in result.user_input_requests:
            call = request.function_call
            answer = await asyncio.to_thread(input, f"Run {call.name} {call.arguments}? (y/n) ")
            approvals.append(Message(role="user", contents=[request.to_function_approval_response(answer == "y")]))
        result = await agent.run(approvals, session=session)   # same session
    print(result.text)

asyncio.run(main())`,
      notes: [
        { en: 'With `approval_mode="always_require"` the run returns `user_input_requests` instead of calling the function. `True` approves, `False` rejects; loop until no request is left.', de: 'Mit `approval_mode="always_require"` liefert der Lauf `user_input_requests`, statt die Funktion aufzurufen. `True` genehmigt, `False` lehnt ab; wiederhole, bis keine Anfrage mehr offen ist.' },
        { en: 'An approval response only counts when it matches a pending request in the same `AgentSession`.', de: 'Eine Freigabe zählt nur, wenn sie zu einer offenen Anfrage in derselben `AgentSession` passt.' },
      ],
    },
    {
      title: { en: 'Connect to an existing Foundry agent with FoundryAgent', de: 'Mit FoundryAgent einen bestehenden Foundry-Agent nutzen' },
      code: `import asyncio
from agent_framework.foundry import FoundryAgent
from azure.identity import AzureCliCredential

async def main() -> None:
    agent = FoundryAgent(
        project_endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
        agent_name="support-agent", agent_version="1",  # omit agent_version for a hosted agent
        credential=AzureCliCredential(),
    )
    result = await agent.run("What can you help me with?")
    print(result.text)

asyncio.run(main())`,
      notes: [
        { en: 'Model, instructions and hosted tools come from the stored Foundry definition; `run`, `stream=True` and sessions work as for any `Agent`.', de: 'Modell, Instructions und gehostete Tools kommen aus der gespeicherten Foundry-Definition; `run`, `stream=True` und Sessions funktionieren wie bei jedem `Agent`.' },
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
      en: 'With `FoundryAgent` the stored Foundry definition wins: `model` and `instructions` passed in code are ignored, and you can\'t add new tools. Local Python functions still run, but only for functions the Foundry agent already declares. Use `Agent(client=FoundryChatClient(...))` when code must control them.',
      de: 'Bei `FoundryAgent` gewinnt die gespeicherte Foundry-Definition: `model` und `instructions` aus dem Code werden ignoriert, und neue Tools kannst du nicht hinzufügen. Lokale Python-Funktionen laufen weiterhin, aber nur für Funktionen, die der Foundry-Agent bereits deklariert. Nutze `Agent(client=FoundryChatClient(...))`, wenn der Code sie steuern muss.',
    },
    {
      en: 'Clients on the Chat Completions API (for example `OpenAIChatCompletionClient`) keep history only locally in the session, which is lost on restart unless you persist it with `session.to_dict()`. Responses-based clients (`FoundryChatClient`, `OpenAIChatClient`) and `FoundryAgent` can point to service-stored history through `service_session_id`.',
      de: 'Clients auf der Chat Completions API (zum Beispiel `OpenAIChatCompletionClient`) halten den Verlauf nur lokal in der Session; er geht beim Neustart verloren, wenn du ihn nicht mit `session.to_dict()` speicherst. Responses-basierte Clients (`FoundryChatClient`, `OpenAIChatClient`) und `FoundryAgent` können über `service_session_id` auf dienstseitig gespeicherten Verlauf zeigen.',
    },
    {
      en: 'The model chooses tools only from names, descriptions and parameter descriptions — vague docstrings cause missing or wrong tool calls.',
      de: 'Das Modell wählt Tools nur anhand von Namen, Beschreibungen und Parameterbeschreibungen – vage Docstrings führen zu fehlenden oder falschen Tool-Aufrufen.',
    },
  ],
  takeaways: [
    { en: 'Your app owns the agent → `Agent(client=FoundryChatClient(...))`; Foundry owns it → `FoundryAgent`.', de: 'Deine App besitzt den Agent → `Agent(client=FoundryChatClient(...))`; Foundry besitzt ihn → `FoundryAgent`.' },
    { en: 'Role and goal go into `instructions`; context across turns lives in an `AgentSession`.', de: 'Rolle und Ziel gehören in `instructions`; Kontext über Runden lebt in einer `AgentSession`.' },
    { en: 'Function tools are typed, documented Python functions in `tools`; hosted tools come from `FoundryChatClient.get_*_tool()`.', de: 'Funktionstools sind typisierte, dokumentierte Python-Funktionen in `tools`; gehostete Tools kommen aus `FoundryChatClient.get_*_tool()`.' },
    { en: 'Sensitive tools: `@tool(approval_mode="always_require")`, then resume in the same session.', de: 'Heikle Tools: `@tool(approval_mode="always_require")`, dann in derselben Session fortsetzen.' },
  ],
  sources: [
    { title: 'Microsoft Agent Framework overview', url: 'https://learn.microsoft.com/en-us/agent-framework/overview/' },
    { title: 'Microsoft Foundry model provider (Agent Framework)', url: 'https://learn.microsoft.com/en-us/agent-framework/integrations/by-component/model-providers/microsoft-foundry?pivots=programming-language-python' },
    { title: 'Microsoft Foundry Agent Service (FoundryAgent)', url: 'https://learn.microsoft.com/en-us/agent-framework/integrations/by-component/agent-services/foundry?pivots=programming-language-python' },
    { title: 'Using function tools with an agent', url: 'https://learn.microsoft.com/en-us/agent-framework/agents/tools/function-tools?pivots=programming-language-python' },
    { title: 'Python 2026 significant changes guide', url: 'https://learn.microsoft.com/en-us/agent-framework/support/upgrade/python-2026-significant-changes' },
    { title: 'Context providers (Microsoft Agent Framework)', url: 'https://learn.microsoft.com/en-us/agent-framework/concepts/agents/conversations/context-providers?pivots=programming-language-python' },
    { title: 'Microsoft Foundry context providers (FoundryMemoryProvider)', url: 'https://learn.microsoft.com/en-us/agent-framework/integrations/by-component/context-providers/microsoft-foundry?pivots=programming-language-python' },
    { title: 'Memory in Microsoft Foundry Agent Service (preview)', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/what-is-memory' },
  ],
}
