import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'multi-agent-orchestration',
  summary: {
    en: 'Some tasks are too big or too varied for one agent. **Multi-agent orchestration** lets several specialized agents work together, and Microsoft Agent Framework ships five ready-made patterns: **sequential** (a fixed pipeline), **concurrent** (the same task in parallel, then aggregated), **handoff** (agents pass ownership of the conversation), **group chat** (an orchestrator picks who speaks next) and **Magentic** (a manager plans, tracks progress and re-plans). All of them are workflows — graphs of executors connected by edges — so you can also build your own graph and mix agents with deterministic rules. Choosing a pattern mostly comes down to one question: who decides what happens next?',
    de: 'Manche Aufgaben sind für einen einzelnen Agent zu groß oder zu vielfältig. **Multi-Agent-Orchestrierung** lässt mehrere spezialisierte Agents zusammenarbeiten, und Microsoft Agent Framework bringt fünf fertige Muster mit: **Sequential** (eine feste Pipeline), **Concurrent** (dieselbe Aufgabe parallel, danach zusammengeführt), **Handoff** (Agents übergeben die Verantwortung für das Gespräch), **Group chat** (ein Orchestrator bestimmt, wer als Nächstes spricht) und **Magentic** (ein Manager plant, verfolgt den Fortschritt und plant neu). Alle sind Workflows – Graphen aus Executors, die über Edges verbunden sind –, du kannst also auch einen eigenen Graphen bauen und Agents mit deterministischen Regeln kombinieren. Die Wahl des Musters hängt vor allem an einer Frage: Wer entscheidet, was als Nächstes passiert?',
  },
  examFocus: {
    en: 'Expect scenario-to-pattern questions (which orchestration fits?), builder code (`SequentialBuilder`, `ConcurrentBuilder`, `HandoffBuilder`, `GroupChatBuilder`, `MagenticBuilder`), the difference between handoff and agent-as-tool, maker-checker reflection loops with termination conditions, Magentic\'s ledger, stall and plan-review settings, and hybrid routing in which an LLM classifies and conditional edges decide.',
    de: 'Rechne mit Fragen vom Szenario zum Muster (welche Orchestrierung passt?), mit Builder-Code (`SequentialBuilder`, `ConcurrentBuilder`, `HandoffBuilder`, `GroupChatBuilder`, `MagenticBuilder`), dem Unterschied zwischen Handoff und Agent-as-Tool, Maker-Checker-Reflexionsschleifen mit Abbruchbedingungen, Magentics Ledger-, Stall- und Plan-Review-Einstellungen sowie hybridem Routing, bei dem ein LLM klassifiziert und bedingte Edges entscheiden.',
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
            en: '**Group chat** runs one shared conversation; an orchestrator — a selection function or an orchestrator agent — picks the next speaker each round. Ideal for iterative refinement such as maker-checker reviews.',
            de: '**Group chat** führt ein gemeinsames Gespräch; ein Orchestrator – eine Auswahlfunktion oder ein Orchestrator-Agent – bestimmt in jeder Runde den nächsten Sprecher. Ideal für schrittweise Verfeinerung wie Maker-Checker-Reviews.',
          },
          focus: ['p-group', 'group'],
        },
        {
          title: { en: 'Magentic', de: 'Magentic' },
          text: {
            en: '**Magentic** adds a planning manager: it builds a plan, tracks progress in a ledger, delegates to specialists and re-plans when progress stalls — made for open-ended tasks without a known solution path.',
            de: '**Magentic** ergänzt einen planenden Manager: Er erstellt einen Plan, verfolgt den Fortschritt in einem Ledger, delegiert an Spezialisten und plant neu, wenn es nicht vorangeht – gemacht für offene Aufgaben ohne bekannten Lösungsweg.',
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
      title: { en: 'Who picks the next agent? Star, ledger and mesh', de: 'Wer wählt den nächsten Agent? Stern, Ledger und Mesh' },
      caption: {
        en: 'Group chat and Magentic route through a central coordinator; handoff has none — agents pass ownership directly and ask the user when they stop.',
        de: 'Group chat und Magentic laufen über einen zentralen Koordinator; Handoff hat keinen – Agents übergeben direkt und fragen den Nutzer, wenn sie stoppen.',
      },
      width: 960,
      height: 460,
      groups: [
        { id: 'g-chat', x: 10, y: 10, w: 460, h: 254, label: { en: 'Group chat: star around an orchestrator', de: 'Gruppenchat: Stern um einen Orchestrator' }, tone: 'app' },
        { id: 'g-mag', x: 490, y: 10, w: 460, h: 254, label: { en: 'Magentic: manager with ledgers', de: 'Magentic: Manager mit Ledgern' }, tone: 'app' },
        { id: 'g-hand', x: 10, y: 290, w: 940, h: 160, label: { en: 'Handoff: mesh, agents pass ownership', de: 'Handoff: Mesh, Agents geben den Fall ab' }, tone: 'app' },
      ],
      nodes: [
        { id: 'orch', x: 140, y: 50, w: 200, h: 64, label: 'Orchestrator', sub: { en: 'picks next speaker', de: 'wählt nächsten Sprecher' }, tone: 'neutral' },
        { id: 'writer', x: 40, y: 180, w: 150, h: 64, label: { en: 'Writer (maker)', de: 'Writer (Maker)' }, sub: { en: 'proposes a draft', de: 'schlägt Entwurf vor' }, tone: 'app' },
        { id: 'reviewer', x: 290, y: 180, w: 150, h: 64, label: { en: 'Reviewer (checker)', de: 'Reviewer (Checker)' }, sub: { en: 'critiques, approves', de: 'kritisiert, gibt frei' }, tone: 'app' },
        { id: 'manager', x: 620, y: 50, w: 200, h: 64, label: { en: 'Magentic manager', de: 'Magentic-Manager' }, sub: { en: 'plans · re-plans', de: 'plant · plant neu' }, tone: 'neutral' },
        { id: 'ledger', x: 515, y: 180, w: 180, h: 64, label: { en: 'Ledgers', de: 'Ledger' }, sub: { en: 'plan · facts · progress', de: 'Plan · Fakten · Status' }, tone: 'data', shape: 'store' },
        { id: 'agents', x: 740, y: 180, w: 180, h: 64, label: { en: 'Specialist agents', de: 'Fach-Agents' }, sub: { en: 'e.g. researcher, coder', de: 'z. B. Researcher, Coder' }, tone: 'app' },
        { id: 'huser', x: 30, y: 330, w: 160, h: 64, label: { en: 'User', de: 'Nutzer' }, sub: { en: 'answers requests', de: 'beantwortet Fragen' }, tone: 'user', shape: 'actor' },
        { id: 'triage', x: 285, y: 330, w: 170, h: 64, label: { en: 'Triage agent', de: 'Triage-Agent' }, sub: { en: 'start agent', de: 'Start-Agent' }, tone: 'app' },
        { id: 'refunds', x: 520, y: 330, w: 170, h: 64, label: { en: 'Refund agent', de: 'Erstattungs-Agent' }, sub: { en: 'owns the case now', de: 'übernimmt den Fall' }, tone: 'app' },
        { id: 'shipping', x: 735, y: 330, w: 170, h: 64, label: { en: 'Shipping agent', de: 'Versand-Agent' }, sub: { en: 'specialist', de: 'Spezialist' }, tone: 'app' },
      ],
      edges: [
        { id: 'c1', from: 'orch', to: 'writer', bidir: true, label: { en: 'draft', de: 'Entwurf' } },
        { id: 'c2', from: 'orch', to: 'reviewer', bidir: true, label: { en: 'critique', de: 'Kritik' } },
        { id: 'm1', from: 'manager', to: 'ledger', bidir: true, label: { en: 'update', de: 'aktualisiert' } },
        { id: 'm2', from: 'manager', to: 'agents', bidir: true, label: { en: 'next instruction', de: 'nächste Anweisung' } },
        { id: 'h1', from: 'huser', to: 'triage', bidir: true, label: 'request_info' },
        { id: 'h2', from: 'triage', to: 'refunds', bidir: true, label: { en: 'handoff', de: 'Handoff' } },
        { id: 'h3', from: 'refunds', to: 'shipping', bidir: true },
        { id: 'h4', from: 'triage', to: 'shipping', bidir: true, via: [[370, 420], [820, 420]] },
      ],
      steps: [
        {
          title: { en: 'Group chat: the orchestrator decides', de: 'Group chat: Der Orchestrator entscheidet' },
          text: {
            en: 'In a star topology the orchestrator picks the next speaker — with a `selection_func` (for example round-robin) or an `orchestrator_agent` — and broadcasts every reply. Agents don\'t share one session; the orchestrator keeps their histories in sync.',
            de: 'In der Sterntopologie bestimmt der Orchestrator den nächsten Sprecher – mit einer `selection_func` (etwa Round-Robin) oder einem `orchestrator_agent` – und verteilt jede Antwort an alle. Die Agents teilen keine Session; der Orchestrator hält ihre Verläufe synchron.',
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
          title: { en: 'Magentic: plan, act, re-plan', de: 'Magentic: planen, handeln, neu planen' },
          text: {
            en: 'The manager creates a plan, then each round updates a progress ledger (request satisfied? looping? progress? next speaker?) and instructs one specialist. Repeated stalls trigger a reset and a new plan; `max_round_count`, `max_stall_count` and `max_reset_count` bound the loop, and `enable_plan_review=True` adds a human sign-off on the plan.',
            de: 'Der Manager erstellt einen Plan und aktualisiert dann jede Runde ein Fortschritts-Ledger (Anfrage erfüllt? Schleife? Fortschritt? Nächster Sprecher?) und weist einen Spezialisten an. Wiederholter Stillstand löst Reset und Neuplanung aus; `max_round_count`, `max_stall_count` und `max_reset_count` begrenzen die Schleife, und `enable_plan_review=True` ergänzt eine menschliche Freigabe des Plans.',
          },
          focus: ['g-mag', 'manager', 'm1', 'ledger', 'm2', 'agents'],
        },
        {
          title: { en: 'Handoff: ownership moves', de: 'Handoff: Die Verantwortung wandert' },
          text: {
            en: 'Agents form a mesh without a central orchestrator. A handoff is a special tool call, and the receiving agent takes full ownership. `with_start_agent()` sets the entry point; `add_handoff()` restricts who may hand off to whom.',
            de: 'Die Agents bilden ein Mesh ohne zentralen Orchestrator. Ein Handoff ist ein spezieller Tool-Aufruf, und der empfangende Agent übernimmt die volle Verantwortung. `with_start_agent()` legt den Einstieg fest; `add_handoff()` beschränkt, wer an wen übergeben darf.',
          },
          focus: ['g-hand', 'triage', 'h2', 'refunds', 'h3', 'shipping', 'h4'],
        },
        {
          title: { en: 'Interactive by default', de: 'Standardmäßig interaktiv' },
          text: {
            en: 'If an agent answers without handing off, the workflow emits a `request_info` event (`HandoffAgentUserRequest`) and waits for the user. `with_autonomous_mode()` (experimental) answers automatically, up to a turn limit.',
            de: 'Antwortet ein Agent ohne Handoff, sendet der Workflow ein `request_info`-Event (`HandoffAgentUserRequest`) und wartet auf den Nutzer. `with_autonomous_mode()` (experimentell) antwortet automatisch, bis zu einem Rundenlimit.',
          },
          focus: ['huser', 'h1'],
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
        en: '`GroupChatBuilder(participants=[...], selection_func=... or orchestrator_agent=..., termination_condition=..., max_rounds=...)`: a star with an orchestrator that picks the next speaker and broadcasts replies — the home of maker-checker reflection loops.',
        de: '`GroupChatBuilder(participants=[...], selection_func=... oder orchestrator_agent=..., termination_condition=..., max_rounds=...)`: ein Stern mit einem Orchestrator, der den nächsten Sprecher wählt und Antworten verteilt – das Zuhause von Maker-Checker-Reflexionsschleifen.',
      },
    },
    {
      term: 'Handoff orchestration',
      text: {
        en: '`HandoffBuilder(participants=[...]).with_start_agent(...)`: agents in a mesh hand off ownership through tool calls, so they must support local tool execution. Unlike agent-as-tool (`as_tool()`), the caller doesn\'t get control back.',
        de: '`HandoffBuilder(participants=[...]).with_start_agent(...)`: Agents in einem Mesh übergeben die Verantwortung per Tool-Aufruf und müssen daher lokale Tool-Ausführung unterstützen. Anders als bei Agent-as-Tool (`as_tool()`) bekommt der Aufrufer die Kontrolle nicht zurück.',
      },
    },
    {
      term: 'Magentic orchestration',
      text: {
        en: 'Based on AutoGen\'s Magentic-One: `MagenticBuilder(participants=[...], manager_agent=...)`. The manager plans, keeps task and progress ledgers, selects agents, detects stalls and re-plans. Human plan review (`enable_plan_review=True`) is off by default in Python.',
        de: 'Basiert auf Magentic-One aus AutoGen: `MagenticBuilder(participants=[...], manager_agent=...)`. Der Manager plant, führt Aufgaben- und Fortschritts-Ledger, wählt Agents aus, erkennt Stillstand und plant neu. Die menschliche Plan-Prüfung (`enable_plan_review=True`) ist in Python standardmäßig aus.',
      },
    },
    {
      term: 'Human in the loop',
      text: {
        en: 'Tools with `approval_mode="always_require"` pause any orchestration with a `request_info` event; `SequentialBuilder(...).with_request_info(agents=[...])` pauses after chosen agents. You resume with `workflow.run(responses={...})`.',
        de: 'Tools mit `approval_mode="always_require"` pausieren jede Orchestrierung mit einem `request_info`-Event; `SequentialBuilder(...).with_request_info(agents=[...])` pausiert nach ausgewählten Agents. Du setzt mit `workflow.run(responses={...})` fort.',
      },
    },
  ],
  comparison: {
    title: { en: 'Pick an orchestration pattern', de: 'Das passende Orchestrierungsmuster wählen' },
    columns: [
      { en: 'Pattern', de: 'Muster' },
      { en: 'Who decides the next step?', de: 'Wer entscheidet den nächsten Schritt?' },
      { en: 'Use it for', de: 'Einsatz' },
      { en: 'Builder', de: 'Builder' },
    ],
    rows: [
      ['Sequential', { en: 'The fixed order you define', de: 'Die feste Reihenfolge, die du festlegst' }, { en: 'Pipelines, stepwise refinement', de: 'Pipelines, schrittweise Verfeinerung' }, 'SequentialBuilder'],
      ['Concurrent', { en: 'Nobody — all agents run at once', de: 'Niemand – alle Agents laufen gleichzeitig' }, { en: 'Independent views, ensembles, voting', de: 'Unabhängige Sichten, Ensembles, Abstimmungen' }, 'ConcurrentBuilder'],
      ['Handoff', { en: 'The current agent, via a handoff tool', de: 'Der aktuelle Agent per Handoff-Tool' }, { en: 'Routing to specialists, support desks', de: 'Routing zu Spezialisten, Support' }, 'HandoffBuilder'],
      ['Group chat', { en: 'An orchestrator (function or agent)', de: 'Ein Orchestrator (Funktion oder Agent)' }, { en: 'Discussion, maker-checker review', de: 'Diskussion, Maker-Checker-Review' }, 'GroupChatBuilder'],
      ['Magentic', { en: 'A planning manager agent', de: 'Ein planender Manager-Agent' }, { en: 'Open-ended, multistep problems', de: 'Offene, mehrstufige Probleme' }, 'MagenticBuilder'],
    ],
  },
  code: [
    {
      title: { en: 'Maker-checker loop with group chat', de: 'Maker-Checker-Schleife mit Group chat' },
      code: `from agent_framework import Agent
from agent_framework.foundry import FoundryChatClient
from agent_framework.orchestrations import GroupChatBuilder, GroupChatState
from azure.identity import AzureCliCredential

client = FoundryChatClient(
    project_endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
    model="gpt-4.1",
    credential=AzureCliCredential(),
)
writer = Agent(client=client, name="Writer",
               instructions="Write or revise the product blurb using the latest feedback.")
reviewer = Agent(client=client, name="Reviewer",
                 instructions="Critique the latest draft. Reply APPROVED when it is ready.")

def alternate(state: GroupChatState) -> str:          # maker, checker, maker, ...
    names = list(state.participants.keys())
    return names[state.current_round % len(names)]

workflow = GroupChatBuilder(
    participants=[writer, reviewer],
    selection_func=alternate,
    termination_condition=lambda messages: bool(messages) and "APPROVED" in messages[-1].text,
    max_rounds=6,
).build()

result = await workflow.run("Write a two-sentence blurb for our new e-bike.")
print(result.get_outputs()[-1])`,
      notes: [
        { en: 'Changing the pattern means changing the builder, for example `SequentialBuilder(participants=[writer, reviewer]).build()` for one fixed pass.', de: 'Ein anderes Muster heißt ein anderer Builder, zum Beispiel `SequentialBuilder(participants=[writer, reviewer]).build()` für einen festen Durchlauf.' },
        { en: '`termination_condition` and `max_rounds` guarantee that the critique loop ends.', de: '`termination_condition` und `max_rounds` stellen sicher, dass die Kritik-Schleife endet.' },
      ],
    },
    {
      title: { en: 'Hybrid routing: the LLM classifies, edge conditions decide', de: 'Hybrides Routing: Das LLM klassifiziert, Edge-Bedingungen entscheiden' },
      code: `from typing import Any
from pydantic import BaseModel
from typing_extensions import Never
from agent_framework import (AgentExecutor, AgentExecutorRequest, AgentExecutorResponse,
                             Message, WorkflowBuilder, WorkflowContext, executor)

class Detection(BaseModel):
    is_spam: bool
    reason: str

def spam_is(expected: bool):
    def condition(message: Any) -> bool:              # deterministic rule, no LLM call
        result = Detection.model_validate_json(message.agent_response.text)
        return result.is_spam == expected
    return condition

detector = AgentExecutor(
    client.as_agent(instructions="Classify the email as spam or not and say why.",
                    default_options={"response_format": Detection}),   # structured output
    id="detector",
)

@executor(id="quarantine")
async def quarantine(response: AgentExecutorResponse, ctx: WorkflowContext[Never, str]) -> None:
    await ctx.yield_output("Moved to quarantine.")

@executor(id="inbox")
async def inbox(response: AgentExecutorResponse, ctx: WorkflowContext[Never, str]) -> None:
    await ctx.yield_output("Delivered to inbox.")

workflow = (
    WorkflowBuilder(start_executor=detector)
    .add_edge(detector, quarantine, condition=spam_is(True))
    .add_edge(detector, inbox, condition=spam_is(False))
    .build()
)
request = AgentExecutorRequest(messages=[Message(role="user", contents=[email_text])], should_respond=True)
print((await workflow.run(request)).get_outputs())`,
      notes: [
        { en: 'The agent only produces structured output; plain Python conditions on the edges choose the route — an LLM combined with a rules engine.', de: 'Der Agent liefert nur strukturierte Ausgabe; einfache Python-Bedingungen an den Edges wählen den Weg – ein LLM kombiniert mit einer Regel-Engine.' },
        { en: 'For more than two branches use a switch-case edge group (`add_switch_case_edge_group` with `Case` and `Default`).', de: 'Für mehr als zwei Zweige nutzt du eine Switch-Case-Edge-Gruppe (`add_switch_case_edge_group` mit `Case` und `Default`).' },
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
