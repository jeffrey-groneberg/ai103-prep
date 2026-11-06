import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'multi-agent-orchestration',
  summary: {
    en: 'Some tasks are too big or too varied for one agent. **Multi-agent orchestration** lets several specialized agents work together, and Microsoft Agent Framework ships five ready-made patterns: **sequential** (a fixed pipeline), **concurrent** (the same task in parallel, then aggregated), **handoff** (agents pass ownership of the conversation), **group chat** (an orchestrator picks who speaks next) and **Magentic** (a manager plans, tracks progress and re-plans). All of them are workflows — graphs of executors connected by edges — so you can also build your own graph and mix agents with deterministic rules. Choosing a pattern mostly comes down to one question: who decides what happens next?',
    de: 'Manche Aufgaben sind für einen einzelnen Agent zu groß oder zu vielfältig. **Multi-Agent-Orchestrierung** lässt mehrere spezialisierte Agents zusammenarbeiten, und Microsoft Agent Framework bringt fünf fertige Muster mit: **Sequential** (eine feste Pipeline), **Concurrent** (dieselbe Aufgabe parallel, danach zusammengeführt), **Handoff** (Agents übergeben die Verantwortung für das Gespräch), **Group chat** (ein Orchestrator bestimmt, wer als Nächstes spricht) und **Magentic** (ein Manager plant, verfolgt den Fortschritt und plant neu). Alle sind Workflows – Graphen aus Executors, die über Edges verbunden sind –, du kannst also auch einen eigenen Graphen bauen und Agents mit deterministischen Regeln kombinieren. Die Wahl des Musters hängt vor allem an einer Frage: Wer entscheidet, was als Nächstes passiert?',
  },
  examFocus: {
    en: 'Expect scenario-to-pattern questions (which orchestration fits?), builder code (`SequentialBuilder`, `ConcurrentBuilder`, `HandoffBuilder`, `GroupChatBuilder`, `MagenticBuilder`), the difference between handoff and agent-as-tool, maker-checker reflection loops with termination conditions, Magentic\'s task and progress ledgers, stall and plan-review settings, and hybrid routing in which an LLM classifies and conditional edges decide.',
    de: 'Rechne mit Fragen vom Szenario zum Muster (welche Orchestrierung passt?), mit Builder-Code (`SequentialBuilder`, `ConcurrentBuilder`, `HandoffBuilder`, `GroupChatBuilder`, `MagenticBuilder`), dem Unterschied zwischen Handoff und Agent-as-Tool, Maker-Checker-Reflexionsschleifen mit Abbruchbedingungen, Magentics Aufgaben- und Fortschritts-Ledger, Stall- und Plan-Review-Einstellungen sowie hybridem Routing, bei dem ein LLM klassifiziert und bedingte Edges entscheiden.',
  },
  diagrams: [
    {
      id: 'pattern-map',
      title: { en: 'Five orchestration patterns — and your own graph', de: 'Fünf Orchestrierungsmuster – und dein eigener Graph' },
      caption: {
        en: 'Each pattern is a builder in agent_framework.orchestrations; when none fits, WorkflowBuilder lets you wire executors and edges yourself.',
        de: 'Jedes Muster ist ein Builder in agent_framework.orchestrations; passt keines, verdrahtest du Executors und Edges mit WorkflowBuilder selbst.',
      },
      width: 960,
      height: 440,
      nodes: [
        { id: 'task', x: 380, y: 188, w: 200, h: 64, label: { en: 'Your task', de: 'Deine Aufgabe' }, sub: { en: 'too big for one agent', de: 'zu groß für einen Agent' }, tone: 'neutral' },
        { id: 'seq', x: 30, y: 30, w: 220, h: 70, label: { en: 'Sequential', de: 'Sequenziell (Sequential)' }, sub: 'SequentialBuilder · A→B→C', tone: 'app' },
        { id: 'conc', x: 710, y: 30, w: 220, h: 70, label: { en: 'Concurrent', de: 'Nebenläufig (Concurrent)' }, sub: 'ConcurrentBuilder · fan-out', tone: 'app' },
        { id: 'hand', x: 30, y: 185, w: 220, h: 70, label: { en: 'Handoff', de: 'Übergabe (Handoff)' }, sub: 'HandoffBuilder · mesh', tone: 'app' },
        { id: 'custom', x: 710, y: 185, w: 220, h: 70, label: { en: 'Custom graph', de: 'Eigener Graph' }, sub: 'WorkflowBuilder · edges', tone: 'app' },
        { id: 'group', x: 30, y: 340, w: 220, h: 70, label: { en: 'Group chat', de: 'Gruppenchat (Group chat)' }, sub: 'GroupChatBuilder · star', tone: 'app' },
        { id: 'mag', x: 710, y: 340, w: 220, h: 70, label: 'Magentic', sub: 'MagenticBuilder · ledger', tone: 'app' },
      ],
      edges: [
        { id: 'p-seq', from: 'task', to: 'seq', label: { en: 'fixed order', de: 'feste Reihenfolge' } },
        { id: 'p-conc', from: 'task', to: 'conc', label: { en: 'in parallel', de: 'parallel' } },
        { id: 'p-hand', from: 'task', to: 'hand', label: { en: 'pass ownership', de: 'Fall übergeben' } },
        { id: 'p-custom', from: 'task', to: 'custom', label: { en: 'own rules', de: 'eigene Regeln' } },
        { id: 'p-group', from: 'task', to: 'group', label: { en: 'moderated talk', de: 'moderierte Runde' } },
        { id: 'p-mag', from: 'task', to: 'mag', label: { en: 'open-ended plan', de: 'offener Plan' } },
      ],
      steps: [
        {
          title: { en: 'One task, several specialists', de: 'Eine Aufgabe, mehrere Spezialisten' },
          text: {
            en: 'Orchestration spreads a task that is too complex for one agent across specialized agents. Agent Framework ships five patterns as builders in `agent_framework.orchestrations`; `.build()` returns a workflow that you start with `workflow.run(...)`.',
            de: 'Orchestrierung verteilt eine Aufgabe, die für einen Agent zu komplex ist, auf spezialisierte Agents. Agent Framework liefert fünf Muster als Builder in `agent_framework.orchestrations`; `.build()` liefert einen Workflow, den du mit `workflow.run(...)` startest.',
          },
          focus: ['task'],
        },
        {
          title: { en: 'Sequential and concurrent', de: 'Sequential und Concurrent' },
          text: {
            en: '**Sequential** passes the conversation from agent to agent in a fixed order (pipelines, draft → review). **Concurrent** sends the same input to all agents in parallel and aggregates the answers (ensembles, voting, independent views).',
            de: '**Sequential** reicht das Gespräch in fester Reihenfolge von Agent zu Agent (Pipelines, Entwurf → Review). **Concurrent** schickt dieselbe Eingabe parallel an alle Agents und führt die Antworten zusammen (Ensembles, Abstimmungen, unabhängige Sichten).',
          },
          focus: ['p-seq', 'seq', 'p-conc', 'conc'],
        },
        {
          title: { en: 'Handoff', de: 'Handoff' },
          text: {
            en: '**Handoff** lets an agent transfer the whole conversation to a better-suited agent through a handoff tool call. There is no central orchestrator, and the receiving agent takes full ownership.',
            de: '**Handoff** lässt einen Agent das ganze Gespräch über einen Handoff-Tool-Aufruf an einen besser geeigneten Agent übergeben. Es gibt keinen zentralen Orchestrator, und der empfangende Agent übernimmt die volle Verantwortung.',
          },
          focus: ['p-hand', 'hand'],
        },
        {
          title: { en: 'Group chat', de: 'Group chat' },
          text: {
            en: '**Group chat** runs one logical conversation (each agent keeps its own session, synced by the orchestrator); an orchestrator — a selection function or an orchestrator agent — picks the next speaker each round. Ideal for iterative refinement such as maker-checker reviews.',
            de: '**Group chat** führt ein logisches Gespräch (jeder Agent behält seine eigene Session, die der Orchestrator synchronisiert); ein Orchestrator – eine Auswahlfunktion oder ein Orchestrator-Agent – bestimmt in jeder Runde den nächsten Sprecher. Ideal für schrittweise Verfeinerung wie Maker-Checker-Reviews.',
          },
          focus: ['p-group', 'group'],
        },
        {
          title: { en: 'Magentic', de: 'Magentic' },
          text: {
            en: '**Magentic** adds a planning manager: it writes a task ledger (facts and plan), updates a progress ledger every round, delegates to specialists and re-plans when progress stalls — made for open-ended tasks without a known solution path.',
            de: '**Magentic** ergänzt einen planenden Manager: Er schreibt ein Aufgaben-Ledger (Fakten und Plan), aktualisiert jede Runde ein Fortschritts-Ledger, delegiert an Spezialisten und plant neu, wenn es nicht vorangeht – gemacht für offene Aufgaben ohne bekannten Lösungsweg.',
          },
          focus: ['p-mag', 'mag'],
        },
        {
          title: { en: 'Your own graph', de: 'Dein eigener Graph' },
          text: {
            en: 'When no pattern fits, build a graph with `WorkflowBuilder`: executors (agents or plain functions) connected by direct, conditional, switch-case, fan-out and fan-in edges — perfect for mixing LLM decisions with fixed rules.',
            de: 'Passt kein Muster, baust du mit `WorkflowBuilder` einen Graphen: Executors (Agents oder einfache Funktionen), verbunden über direkte, bedingte, Switch-Case-, Fan-out- und Fan-in-Edges – ideal, um LLM-Entscheidungen mit festen Regeln zu mischen.',
          },
          focus: ['p-custom', 'custom'],
        },
      ],
    },
    {
      id: 'who-decides',
      title: { en: 'Who picks the next agent? Star vs mesh', de: 'Wer wählt den nächsten Agent? Stern vs. Mesh' },
      caption: {
        en: 'Group chat routes every turn through a central orchestrator (Magentic uses the same star with a planning manager); handoff has none — agents pass ownership directly and ask the user when they stop.',
        de: 'Group chat leitet jede Runde über einen zentralen Orchestrator (Magentic nutzt denselben Stern mit einem planenden Manager); Handoff hat keinen – Agents übergeben direkt und fragen den Nutzer, wenn sie stoppen.',
      },
      width: 960,
      height: 384,
      groups: [
        { id: 'g-chat', x: 10, y: 10, w: 940, h: 134, label: { en: 'Group chat: star around an orchestrator', de: 'Gruppenchat: Stern um einen Orchestrator' }, tone: 'app' },
        { id: 'g-hand', x: 10, y: 174, w: 940, h: 200, label: { en: 'Handoff: mesh, agents pass ownership', de: 'Handoff: Mesh, Agents geben den Fall ab' }, tone: 'app' },
      ],
      nodes: [
        { id: 'writer', x: 90, y: 56, w: 200, h: 64, label: { en: 'Writer (maker)', de: 'Writer (Maker)' }, sub: { en: 'proposes a draft', de: 'schlägt Entwurf vor' }, tone: 'app' },
        { id: 'orch', x: 380, y: 56, w: 200, h: 64, label: 'Orchestrator', sub: { en: 'picks next speaker', de: 'wählt nächsten Sprecher' }, tone: 'neutral' },
        { id: 'reviewer', x: 670, y: 56, w: 200, h: 64, label: { en: 'Reviewer (checker)', de: 'Reviewer (Checker)' }, sub: { en: 'critiques, approves', de: 'kritisiert, gibt frei' }, tone: 'app' },
        { id: 'huser', x: 30, y: 254, w: 130, h: 64, label: { en: 'User', de: 'Nutzer' }, sub: { en: 'answers\nrequests', de: 'beantwortet\nFragen' }, tone: 'user', shape: 'actor' },
        { id: 'triage', x: 370, y: 254, w: 150, h: 64, label: { en: 'Triage agent', de: 'Triage-Agent' }, sub: { en: 'start agent', de: 'Start-Agent' }, tone: 'app' },
        { id: 'refunds', x: 590, y: 254, w: 160, h: 64, label: { en: 'Refund agent', de: 'Erstattungs-Agent' }, sub: { en: 'owns the case now', de: 'übernimmt den Fall' }, tone: 'app' },
        { id: 'shipping', x: 790, y: 254, w: 140, h: 64, label: { en: 'Shipping agent', de: 'Versand-Agent' }, sub: { en: 'specialist', de: 'Spezialist' }, tone: 'app' },
      ],
      edges: [
        { id: 'c1', from: 'orch', to: 'writer', bidir: true, label: { en: 'draft', de: 'Entwurf' } },
        { id: 'c2', from: 'orch', to: 'reviewer', bidir: true, label: { en: 'critique', de: 'Kritik' } },
        { id: 'h1', from: 'huser', to: 'triage', bidir: true, label: { en: 'first message · request_info', de: 'erste Nachricht · request_info' } },
        { id: 'h2', from: 'triage', to: 'refunds', bidir: true, label: { en: 'handoff', de: 'Handoff' } },
        { id: 'h3', from: 'refunds', to: 'shipping', bidir: true },
        { id: 'h4', from: 'triage', to: 'shipping', bidir: true, via: [[445, 219], [860, 219]] },
        { id: 'h5', from: 'huser', to: 'refunds', bidir: true, via: [[95, 349], [670, 349]], label: { en: 'request_info (current owner)', de: 'request_info (aktueller Agent)' } },
      ],
      steps: [
        {
          title: { en: 'Group chat: the orchestrator decides', de: 'Group chat: Der Orchestrator entscheidet' },
          text: {
            en: 'In a star topology the orchestrator picks the next speaker — with a `selection_func` (for example round-robin) or an `orchestrator_agent`. It is one logical conversation: each agent keeps its own session, and the orchestrator syncs it before every turn and broadcasts each reply. Magentic uses the same star with a planning manager.',
            de: 'In der Sterntopologie bestimmt der Orchestrator den nächsten Sprecher – mit einer `selection_func` (etwa Round-Robin) oder einem `orchestrator_agent`. Es ist ein logisches Gespräch: Jeder Agent behält seine eigene Session, der Orchestrator synchronisiert sie vor jeder Runde und verteilt jede Antwort an alle. Magentic nutzt denselben Stern mit einem planenden Manager.',
          },
          focus: ['g-chat', 'orch', 'c1', 'c2'],
        },
        {
          title: { en: 'Maker-checker loop', de: 'Maker-Checker-Schleife' },
          text: {
            en: 'The writer drafts, the reviewer critiques, the writer revises — a self-critique loop. A `termination_condition` (for example "reviewer says APPROVED") plus `max_rounds` makes sure it ends.',
            de: 'Der Writer entwirft, der Reviewer kritisiert, der Writer überarbeitet – eine Selbstkritik-Schleife. Eine `termination_condition` (etwa „Reviewer sagt APPROVED“) plus `max_rounds` sorgt dafür, dass sie endet.',
          },
          focus: ['writer', 'reviewer', 'c1', 'c2'],
        },
        {
          title: { en: 'Handoff: ownership moves', de: 'Handoff: Die Verantwortung wandert' },
          text: {
            en: 'Agents form a mesh without a central orchestrator. A handoff is a special tool call, and the receiving agent takes full ownership. `with_start_agent()` sets the entry point; by default every agent may hand off to every other, and `add_handoff(source, [targets])` restricts that.',
            de: 'Die Agents bilden ein Mesh ohne zentralen Orchestrator. Ein Handoff ist ein spezieller Tool-Aufruf, und der empfangende Agent übernimmt die volle Verantwortung. `with_start_agent()` legt den Einstieg fest; standardmäßig darf jeder Agent an jeden übergeben, und `add_handoff(quelle, [ziele])` schränkt das ein.',
          },
          focus: ['g-hand', 'triage', 'h2', 'refunds', 'h3', 'shipping', 'h4'],
        },
        {
          title: { en: 'Interactive by default', de: 'Standardmäßig interaktiv' },
          text: {
            en: 'The first message goes to the start agent. If an agent answers without handing off, the workflow emits a `request_info` event whose `data` is a `HandoffAgentUserRequest`, and waits; by default the reply goes back to the agent that asked — the current owner, here the refund agent (`enable_return_to_previous(False)` routes every reply to the start agent). You answer with `workflow.run(responses={event.request_id: HandoffAgentUserRequest.create_response(text)})`. `with_autonomous_mode()` (experimental) answers automatically, by default for up to 50 turns per agent.',
            de: 'Die erste Nachricht geht an den Start-Agent. Antwortet ein Agent ohne Handoff, sendet der Workflow ein `request_info`-Event, dessen `data` ein `HandoffAgentUserRequest` ist, und wartet; standardmäßig geht die Antwort an den Agent zurück, der gefragt hat – den aktuellen Besitzer des Gesprächs, hier den Erstattungs-Agent (`enable_return_to_previous(False)` leitet jede Antwort an den Start-Agent). Du antwortest mit `workflow.run(responses={event.request_id: HandoffAgentUserRequest.create_response(text)})`. `with_autonomous_mode()` (experimentell) antwortet automatisch, standardmäßig bis zu 50 Runden pro Agent.',
          },
          focus: ['huser', 'h1', 'h5', 'refunds'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Executors and edges',
      text: {
        en: 'Workflows are graphs: **executors** (agents or custom logic) process messages, and **edges** route them — direct, conditional, switch-case, fan-out and fan-in. Events such as `output` and `request_info` report progress, and checkpoints save state so a run can resume.',
        de: 'Workflows sind Graphen: **Executors** (Agents oder eigene Logik) verarbeiten Nachrichten, und **Edges** leiten sie weiter – direkt, bedingt, Switch-Case, Fan-out und Fan-in. Events wie `output` und `request_info` melden den Fortschritt, und Checkpoints sichern den Zustand, damit ein Lauf fortgesetzt werden kann.',
      },
    },
    {
      term: 'Sequential orchestration',
      text: {
        en: '`SequentialBuilder(participants=[...])`: by default each agent receives the previous agent\'s full conversation (`chain_only_agent_responses=True` passes only its responses). The last participant\'s response is the final output.',
        de: '`SequentialBuilder(participants=[...])`: Standardmäßig erhält jeder Agent das komplette Gespräch des vorherigen Agents (`chain_only_agent_responses=True` gibt nur dessen Antworten weiter). Die Antwort des letzten Teilnehmers ist die finale Ausgabe.',
      },
    },
    {
      term: 'Concurrent orchestration',
      text: {
        en: '`ConcurrentBuilder(participants=[...])`: all agents receive the same input in parallel and don\'t see each other\'s work. The default aggregator returns one message per agent; `.with_aggregator(...)` merges them, for example through a summarizer agent.',
        de: '`ConcurrentBuilder(participants=[...])`: Alle Agents erhalten parallel dieselbe Eingabe und sehen die Arbeit der anderen nicht. Der Standard-Aggregator liefert eine Nachricht pro Agent; `.with_aggregator(...)` führt sie zusammen, etwa über einen Zusammenfassungs-Agent.',
      },
    },
    {
      term: 'Group chat orchestration',
      text: {
        en: '`GroupChatBuilder(participants=[...], selection_func=... or orchestrator_agent=..., termination_condition=..., max_rounds=...)`: a star with an orchestrator that picks the next speaker — the home of maker-checker reflection loops. It is one logical conversation: agents don\'t share a session, but the orchestrator syncs each agent\'s session before its turn and broadcasts every reply.',
        de: '`GroupChatBuilder(participants=[...], selection_func=... oder orchestrator_agent=..., termination_condition=..., max_rounds=...)`: ein Stern mit einem Orchestrator, der den nächsten Sprecher wählt – das Zuhause von Maker-Checker-Reflexionsschleifen. Es ist ein logisches Gespräch: Die Agents teilen keine Session, aber der Orchestrator synchronisiert die Session jedes Agents vor seiner Runde und verteilt jede Antwort an alle.',
      },
    },
    {
      term: 'Handoff orchestration',
      text: {
        en: '`HandoffBuilder(participants=[...]).with_start_agent(...)`: agents in a mesh hand off ownership through tool calls. The builder adds a handoff tool to each agent and your process executes it, so only `Agent` participants that run tools locally can take part — not, for example, a remote A2A agent. Unlike agent-as-tool (`as_tool()`), the caller doesn\'t get control back.',
        de: '`HandoffBuilder(participants=[...]).with_start_agent(...)`: Agents in einem Mesh übergeben die Verantwortung per Tool-Aufruf. Der Builder gibt jedem Agent ein Handoff-Tool, das dein Prozess ausführt; daher können nur `Agent`-Teilnehmer mitmachen, die Tools lokal ausführen – zum Beispiel kein entfernter A2A-Agent. Anders als bei Agent-as-Tool (`as_tool()`) bekommt der Aufrufer die Kontrolle nicht zurück.',
      },
    },
    {
      term: 'Magentic orchestration',
      text: {
        en: 'Based on AutoGen\'s Magentic-One: `MagenticBuilder(participants=[...], manager_agent=...)`. The manager writes a **task ledger** (gathered facts and the plan) and updates a **progress ledger** every round (request satisfied? in a loop? progress? next speaker and instruction). It detects stalls and re-plans. Human plan review (`enable_plan_review=True`) is off by default in Python.',
        de: 'Basiert auf Magentic-One aus AutoGen: `MagenticBuilder(participants=[...], manager_agent=...)`. Der Manager schreibt ein **Aufgaben-Ledger** (gesammelte Fakten und Plan) und aktualisiert jede Runde ein **Fortschritts-Ledger** (Anfrage erfüllt? Schleife? Fortschritt? Nächster Sprecher und Anweisung). Er erkennt Stillstand und plant neu. Die menschliche Plan-Prüfung (`enable_plan_review=True`) ist in Python standardmäßig aus.',
      },
    },
    {
      term: 'Human in the loop',
      text: {
        en: 'Tools with `approval_mode="always_require"` pause any orchestration with a `request_info` event; `SequentialBuilder(...).with_request_info(agents=[...])` pauses after chosen agents. Each event carries `request_id` and the request in `data`; you resume with `workflow.run(responses={request_id: answer}, stream=True)`.',
        de: 'Tools mit `approval_mode="always_require"` pausieren jede Orchestrierung mit einem `request_info`-Event; `SequentialBuilder(...).with_request_info(agents=[...])` pausiert nach ausgewählten Agents. Jedes Event trägt eine `request_id` und die Anfrage in `data`; du setzt mit `workflow.run(responses={request_id: antwort}, stream=True)` fort.',
      },
    },
  ],
  comparison: {
    title: { en: 'Pick an orchestration pattern', de: 'Das passende Orchestrierungsmuster wählen' },
    columns: [
      { en: 'Pattern (builder)', de: 'Muster (Builder)' },
      { en: 'Who decides the next step?', de: 'Wer entscheidet den nächsten Schritt?' },
      { en: 'Use it for', de: 'Einsatz' },
      { en: 'Ends when / limits', de: 'Endet wenn / Limits' },
    ],
    rows: [
      ['Sequential (SequentialBuilder)', { en: 'The fixed order you define', de: 'Die feste Reihenfolge, die du festlegst' }, { en: 'Pipelines, stepwise refinement', de: 'Pipelines, schrittweise Verfeinerung' }, { en: 'The last agent has answered', de: 'Der letzte Agent hat geantwortet' }],
      ['Concurrent (ConcurrentBuilder)', { en: 'Nobody — all agents run at once', de: 'Niemand – alle Agents laufen gleichzeitig' }, { en: 'Independent views, ensembles, voting', de: 'Unabhängige Sichten, Ensembles, Abstimmungen' }, { en: 'All agents have answered; the aggregator combines them', de: 'Alle Agents haben geantwortet; der Aggregator fasst zusammen' }],
      ['Handoff (HandoffBuilder)', { en: 'The current agent, via a handoff tool', de: 'Der aktuelle Agent per Handoff-Tool' }, { en: 'Routing to specialists, support desks', de: 'Routing zu Spezialisten, Support' }, { en: '`termination_condition`; otherwise it waits for the user (autonomous mode: 50 turns per agent by default)', de: '`termination_condition`; sonst wartet er auf den Nutzer (autonomer Modus: standardmäßig 50 Runden pro Agent)' }],
      ['Group chat (GroupChatBuilder)', { en: 'An orchestrator (function or agent)', de: 'Ein Orchestrator (Funktion oder Agent)' }, { en: 'Discussion, maker-checker review', de: 'Diskussion, Maker-Checker-Review' }, '`termination_condition`, `max_rounds`'],
      ['Magentic (MagenticBuilder)', { en: 'A planning manager agent', de: 'Ein planender Manager-Agent' }, { en: 'Open-ended, multistep problems', de: 'Offene, mehrstufige Probleme' }, '`max_round_count`, `max_stall_count`, `max_reset_count`'],
    ],
  },
  code: [
    {
      title: { en: 'Maker-checker loop with group chat', de: 'Maker-Checker-Schleife mit Group chat' },
      code: `import asyncio

from agent_framework import Agent
from agent_framework.foundry import FoundryChatClient
from agent_framework.orchestrations import GroupChatBuilder, GroupChatState
from azure.identity import AzureCliCredential

def alternate(state: GroupChatState) -> str:          # maker, checker, maker, ...
    names = list(state.participants.keys())
    return names[state.current_round % len(names)]

async def main() -> None:
    client = FoundryChatClient(
        project_endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
        model="gpt-5-mini",                           # deployment name
        credential=AzureCliCredential(),
    )
    writer = Agent(client=client, name="Writer",
                   instructions="Write or revise the product blurb using the latest feedback.")
    reviewer = Agent(client=client, name="Reviewer",
                     instructions="Critique the latest draft. Reply APPROVED when it is ready.")
    workflow = GroupChatBuilder(
        participants=[writer, reviewer],
        selection_func=alternate,
        termination_condition=lambda messages: bool(messages) and "APPROVED" in messages[-1].text,
        max_rounds=6,
    ).build()
    result = await workflow.run("Write a two-sentence blurb for our new e-bike.")
    print(result.get_outputs()[-1])

asyncio.run(main())`,
      notes: [
        { en: 'Changing the pattern means changing the builder, for example `SequentialBuilder(participants=[writer, reviewer]).build()` for one fixed pass.', de: 'Ein anderes Muster heißt ein anderer Builder, zum Beispiel `SequentialBuilder(participants=[writer, reviewer]).build()` für einen festen Durchlauf.' },
        { en: '`termination_condition` and `max_rounds` guarantee that the critique loop ends. `model` is the deployment name, which can be any name you chose.', de: '`termination_condition` und `max_rounds` stellen sicher, dass die Kritik-Schleife endet. `model` ist der Deployment-Name, den du frei wählen kannst.' },
      ],
    },
    {
      title: { en: 'Hybrid routing: the LLM classifies, edge conditions decide', de: 'Hybrides Routing: Das LLM klassifiziert, Edge-Bedingungen entscheiden' },
      code: `import asyncio
from typing import Any

from pydantic import BaseModel
from typing_extensions import Never
from agent_framework import (AgentExecutor, AgentExecutorRequest, AgentExecutorResponse,
                             Message, WorkflowBuilder, WorkflowContext, executor)
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

class Detection(BaseModel):
    is_spam: bool
    reason: str

def spam_is(expected: bool):
    def condition(message: Any) -> bool:              # deterministic rule, no LLM call
        try:
            return Detection.model_validate_json(message.agent_response.text).is_spam == expected
        except Exception:                             # unreadable output: fail closed
            return False
    return condition

# WorkflowContext[Never, str]: sends nothing downstream (Never), yields a str as workflow output
@executor(id="quarantine")
async def quarantine(response: AgentExecutorResponse, ctx: WorkflowContext[Never, str]) -> None:
    await ctx.yield_output("Moved to quarantine.")

@executor(id="inbox")
async def inbox(response: AgentExecutorResponse, ctx: WorkflowContext[Never, str]) -> None:
    await ctx.yield_output("Delivered to inbox.")

async def main() -> None:
    client = FoundryChatClient(
        project_endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
        model="gpt-5-mini",                           # deployment name
        credential=AzureCliCredential(),
    )
    detector = AgentExecutor(
        client.as_agent(instructions="Classify the email as spam or not and say why.",
                        default_options={"response_format": Detection}),   # structured output
        id="detector",
    )
    workflow = (
        WorkflowBuilder(start_executor=detector)
        .add_edge(detector, quarantine, condition=spam_is(True))
        .add_edge(detector, inbox, condition=spam_is(False))
        .build()
    )
    email_text = "You won a free cruise! Reply with your bank details to claim it."
    request = AgentExecutorRequest(messages=[Message(role="user", contents=[email_text])],
                                   should_respond=True)   # True: the agent answers now
    print((await workflow.run(request)).get_outputs())

asyncio.run(main())`,
      notes: [
        { en: 'The agent only produces structured output; plain Python conditions on the edges choose the route — an LLM combined with a rules engine.', de: 'Der Agent liefert nur strukturierte Ausgabe; einfache Python-Bedingungen an den Edges wählen den Weg – ein LLM kombiniert mit einer Regel-Engine.' },
        { en: 'For more than two branches use a switch-case edge group (`add_switch_case_edge_group` with `Case` and `Default`).', de: 'Für mehr als zwei Zweige nutzt du eine Switch-Case-Edge-Gruppe (`add_switch_case_edge_group` mit `Case` und `Default`).' },
      ],
    },
    {
      title: { en: 'Handoff: answer request_info events until the workflow is done', de: 'Handoff: request_info-Events beantworten, bis der Workflow fertig ist' },
      code: `import asyncio
from agent_framework.orchestrations import HandoffAgentUserRequest, HandoffBuilder

async def support_chat(triage, refunds, shipping) -> None:    # Agents built from a chat client
    workflow = HandoffBuilder(participants=[triage, refunds, shipping]).with_start_agent(triage).build()
    stream = workflow.run("My parcel arrived damaged.", stream=True)
    while pending := [e async for e in stream
                      if e.type == "request_info" and isinstance(e.data, HandoffAgentUserRequest)]:
        print(pending[-1].data.agent_response.messages[-1].text)   # the agent's last message
        answer = await asyncio.to_thread(input, "You (empty = stop): ")
        reply = (HandoffAgentUserRequest.create_response(answer) if answer
                 else HandoffAgentUserRequest.terminate())
        stream = workflow.run(responses={e.request_id: reply for e in pending}, stream=True)`,
      notes: [
        { en: '`responses` maps each pending `request_id` to your answer; `terminate()` ends the workflow early.', de: '`responses` ordnet jeder offenen `request_id` deine Antwort zu; `terminate()` beendet den Workflow vorzeitig.' },
      ],
    },
  ],
  traps: [
    {
      en: 'Handoff is not agent-as-tool: in a handoff the receiving agent takes over the conversation; with `as_tool()` the calling agent gets the result back and stays in charge.',
      de: 'Handoff ist nicht Agent-as-Tool: Beim Handoff übernimmt der empfangende Agent das Gespräch; mit `as_tool()` bekommt der aufrufende Agent das Ergebnis zurück und behält die Führung.',
    },
    {
      en: 'Concurrent agents never see each other\'s output and a sequential pipeline doesn\'t loop back — for iterative critique use group chat.',
      de: 'Concurrent-Agents sehen die Ausgabe der anderen nie, und eine sequenzielle Pipeline springt nicht zurück – für iterative Kritik nutzt du Group chat.',
    },
    {
      en: 'Handoff is interactive: when an agent replies without a handoff, the run waits for user input (`request_info`) unless you enable autonomous mode.',
      de: 'Handoff ist interaktiv: Antwortet ein Agent ohne Handoff, wartet der Lauf auf Nutzereingabe (`request_info`), außer du aktivierst den autonomen Modus.',
    },
    {
      en: 'Magentic plan review is off by default in Python — set `enable_plan_review=True` when a person must approve the plan.',
      de: 'Die Plan-Prüfung von Magentic ist in Python standardmäßig aus – setze `enable_plan_review=True`, wenn eine Person den Plan freigeben muss.',
    },
    {
      en: 'Current builders live in `agent_framework.orchestrations`, take settings as constructor parameters (`participants=[...]`) and run with `workflow.run(..., stream=True)`. Older samples still show `participants()`, `create_agent` or `run_stream`.',
      de: 'Aktuelle Builder liegen in `agent_framework.orchestrations`, nehmen Einstellungen als Konstruktorparameter (`participants=[...]`) und laufen mit `workflow.run(..., stream=True)`. Ältere Beispiele zeigen noch `participants()`, `create_agent` oder `run_stream`.',
    },
  ],
  takeaways: [
    { en: 'Fixed order → sequential; parallel, independent views → concurrent; specialist takes over → handoff; discussion or review loop → group chat; open-ended planning → Magentic.', de: 'Feste Reihenfolge → Sequential; parallele, unabhängige Sichten → Concurrent; Spezialist übernimmt → Handoff; Diskussion oder Review-Schleife → Group chat; offene Planung → Magentic.' },
    { en: 'Deterministic routing = structured agent output + conditional or switch-case edges.', de: 'Deterministisches Routing = strukturierte Agent-Ausgabe + bedingte oder Switch-Case-Edges.' },
    { en: 'Bound every loop: `termination_condition`, `max_rounds`, or Magentic\'s round, stall and reset limits.', de: 'Begrenze jede Schleife: `termination_condition`, `max_rounds` oder Magentics Runden-, Stall- und Reset-Limits.' },
    { en: 'Bring people in with approval-required tools, `with_request_info()` or Magentic plan review.', de: 'Hol Menschen dazu – mit freigabepflichtigen Tools, `with_request_info()` oder der Plan-Prüfung von Magentic.' },
  ],
  sources: [
    { title: 'Workflow orchestrations overview (Microsoft Agent Framework)', url: 'https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/?pivots=programming-language-python' },
    { title: 'Group chat orchestration', url: 'https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/group-chat?pivots=programming-language-python' },
    { title: 'Handoff orchestration', url: 'https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/handoff?pivots=programming-language-python' },
    { title: 'Magentic orchestration', url: 'https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/magentic?pivots=programming-language-python' },
    { title: 'Workflow edges', url: 'https://learn.microsoft.com/en-us/agent-framework/concepts/workflows/edges?pivots=programming-language-python' },
  ],
}
