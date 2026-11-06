import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'agent-workflows',
  summary: {
    en: 'A **workflow** in Microsoft Foundry is a declarative, visual sequence of **nodes** — agent nodes reason, logic nodes branch or loop, data nodes set variables, chat nodes talk to the user — that orchestrates agents and business logic. Templates cover the common patterns — **sequential**, **human in the loop** and **group chat** — and **Power Fx** formulas with `Local.` and `System.` variables turn agent output into decisions. You edit the draft on the canvas or as YAML; each **Save** freezes a new version that you can view or delete but not change. Apps run a saved workflow by name through the project\'s **Responses API** (OpenAI-compatible API that returns a response object; keeps state via `previous_response_id` or a conversation) inside a **conversation** (durable item store for multi-turn state). Important: workflows are a preview feature that **retires on December 1, 2026** — build new workflows with **Microsoft Agent Framework** and treat the exported YAML as your migration artifact.',
    de: 'Ein **Workflow** in Microsoft Foundry ist eine deklarative, visuelle Abfolge von **Knoten** – Agent-Knoten denken, Logik-Knoten verzweigen oder wiederholen, Datenknoten setzen Variablen, Chat-Knoten sprechen mit dem Nutzer –, die Agents und Geschäftslogik orchestriert. Vorlagen decken die gängigen Muster ab – **Sequential**, **Human in the loop** und **Group chat** –, und **Power-Fx**-Formeln mit `Local.`- und `System.`-Variablen machen aus Agent-Ausgaben Entscheidungen. Du bearbeitest den Entwurf auf dem Canvas oder als YAML; jedes **Save** friert eine neue Version ein, die du ansehen oder löschen, aber nicht ändern kannst. Apps starten einen gespeicherten Workflow per Name über die **Responses API** des Projekts (OpenAI-kompatible API, die ein Response-Objekt liefert; hält den Zustand über `previous_response_id` oder eine Conversation) innerhalb einer **Conversation** (dauerhafter Item-Speicher für Zustand über mehrere Runden). Wichtig: Workflows sind ein Preview-Feature und werden **am 1. Dezember 2026 eingestellt** – neue Workflows baust du mit **Microsoft Agent Framework**, und das exportierte YAML ist dein Migrationsartefakt.',
  },
  examFocus: {
    en: 'The skills outline still lists workflows and approval steps, so expect scenarios that ask you to pick a workflow pattern (sequential, human in the loop, group chat), the right node (Invoke agent, if/else, for each, set variable, Send message, Ask a question), a valid Power Fx condition with the `Local.`/`System.` prefix, and how to make agent output routable (JSON schema response format saved to a variable). Know how an app runs an existing workflow from code and how a paused human-in-the-loop run continues. Foundry portal workflows retire on December 1, 2026. Rule of thumb: a question about an **existing** workflow is answered with designer nodes; "build a **new** workflow" is answered with **Microsoft Agent Framework** (declarative YAML or code, deployed as a **hosted agent** — your own agent code in a container that Foundry runs). Azure Logic Apps and A2A are the other migration paths.',
    de: 'Der Skills-Katalog nennt weiterhin Workflows und Freigabeschritte. Rechne also mit Szenarien, in denen du ein Workflow-Muster wählst (Sequential, Human in the loop, Group chat), den passenden Knoten (Invoke agent, if/else, for each, set variable, Send message, Ask a question), eine gültige Power-Fx-Bedingung mit dem Präfix `Local.`/`System.` und den Weg, Agent-Ausgaben routbar zu machen (JSON-Schema als Antwortformat, in einer Variablen gespeichert). Du solltest wissen, wie eine App einen bestehenden Workflow per Code startet und wie ein pausierter Human-in-the-loop-Lauf weiterläuft. Workflows im Foundry-Portal werden am 1. Dezember 2026 eingestellt. Faustregel: Eine Frage zu einem **bestehenden** Workflow beantwortest du mit Designer-Knoten; „baue einen **neuen** Workflow“ beantwortest du mit **Microsoft Agent Framework** (deklaratives YAML oder Code, als **Hosted Agent** bereitgestellt – dein eigener Agent-Code in einem Container, den Foundry ausführt). Azure Logic Apps und A2A sind die weiteren Migrationswege.',
  },
  diagrams: [
    {
      id: 'workflow-anatomy',
      title: { en: 'Anatomy of a workflow: agent, rule, human approval', de: 'Aufbau eines Workflows: Agent, Regel, menschliche Freigabe' },
      caption: {
        en: 'A triage agent returns JSON, a Power Fx rule routes it, and uncertain cases wait for a supervisor before anything happens.',
        de: 'Ein Triage-Agent liefert JSON, eine Power-Fx-Regel leitet es weiter, und unsichere Fälle warten auf einen Supervisor, bevor etwas passiert.',
      },
      width: 960,
      height: 360,
      groups: [
        { id: 'g-wf', x: 150, y: 20, w: 805, h: 322, label: { en: 'Foundry workflow (preview)', de: 'Foundry-Workflow (Preview)' }, tone: 'foundry' },
      ],
      nodes: [
        { id: 'start', x: 10, y: 70, w: 130, h: 64, label: { en: 'User', de: 'Nutzer' }, sub: { en: 'chat request', de: 'Chat-Anfrage' }, tone: 'user', shape: 'actor' },
        { id: 'sup', x: 10, y: 250, w: 130, h: 64, label: 'Supervisor', sub: { en: 'answers via\nyour app', de: 'antwortet über\ndeine App' }, tone: 'user', shape: 'actor' },
        { id: 'triage', x: 175, y: 70, w: 170, h: 64, label: { en: 'Triage agent', de: 'Triage-Agent' }, sub: 'JSON → Local.Triage', tone: 'foundry' },
        { id: 'cond', x: 385, y: 62, w: 180, h: 80, label: { en: 'Confident?', de: 'Sicher genug?' }, sub: '≥ 0.8 · Power Fx', tone: 'neutral', shape: 'diamond' },
        { id: 'resolve', x: 605, y: 70, w: 160, h: 64, label: { en: 'Resolver agent', de: 'Lösungs-Agent' }, sub: 'Invoke agent', tone: 'foundry' },
        { id: 'reply', x: 805, y: 70, w: 130, h: 64, label: { en: 'Reply', de: 'Antwort' }, sub: 'Send message', tone: 'neutral', shape: 'pill' },
        { id: 'ask', x: 395, y: 250, w: 160, h: 64, label: 'Ask a question', sub: '→ Local.Approval', tone: 'neutral', shape: 'pill' },
        { id: 'approved', x: 600, y: 242, w: 170, h: 80, label: { en: 'Approved?', de: 'Genehmigt?' }, sub: 'Power Fx if/else', tone: 'neutral', shape: 'diamond' },
        { id: 'escalate', x: 815, y: 250, w: 120, h: 64, label: { en: 'Escalate', de: 'Eskalieren' }, sub: 'Send message', tone: 'neutral', shape: 'pill' },
      ],
      edges: [
        { id: 'e-in', from: 'start', to: 'triage' },
        { id: 'e-json', from: 'triage', to: 'cond' },
        { id: 'e-yes', from: 'cond', to: 'resolve', label: { en: 'yes', de: 'ja' } },
        { id: 'e-out', from: 'resolve', to: 'reply' },
        { id: 'e-no', from: 'cond', to: 'ask', label: { en: 'no', de: 'nein' } },
        { id: 'e-sup', from: 'ask', to: 'sup', bidir: true, label: { en: 'question / answer', de: 'Frage / Antwort' } },
        { id: 'e-ans', from: 'ask', to: 'approved' },
        { id: 'e-ok', from: 'approved', to: 'resolve', label: { en: 'yes', de: 'ja' } },
        { id: 'e-esc', from: 'approved', to: 'escalate', label: { en: 'no', de: 'nein' } },
      ],
      steps: [
        {
          title: { en: 'Start the run', de: 'Lauf starten' },
          text: {
            en: 'A chat message starts the workflow. An **Invoke agent** node runs the triage agent, which returns JSON that follows a JSON schema; its **Action settings** save the output as the variable `Local.Triage`.',
            de: 'Eine Chatnachricht startet den Workflow. Ein **Invoke agent**-Knoten führt den Triage-Agent aus, der JSON nach einem JSON-Schema zurückgibt; über seine **Action settings** landet die Ausgabe in der Variablen `Local.Triage`.',
          },
          focus: ['start', 'e-in', 'triage', 'e-json'],
        },
        {
          title: { en: 'Decide with Power Fx', de: 'Mit Power Fx entscheiden' },
          text: {
            en: 'An **if/else** node evaluates the Power Fx condition `Local.Triage.confidence >= 0.8`. Your own variables need the `Local.` prefix, built-in ones `System.` (for example `System.LastMessage.Text`).',
            de: 'Ein **if/else**-Knoten wertet die Power-Fx-Bedingung `Local.Triage.confidence >= 0.8` aus. Eigene Variablen brauchen das Präfix `Local.`, eingebaute das Präfix `System.` (zum Beispiel `System.LastMessage.Text`).',
          },
          focus: ['e-json', 'cond'],
        },
        {
          title: { en: 'Automate the confident path', de: 'Den sicheren Pfad automatisieren' },
          text: {
            en: 'When the rule is met, the resolver agent answers and a **Send message** node returns the result. The model classifies, the rule decides — a hybrid of LLM and rules.',
            de: 'Ist die Regel erfüllt, antwortet der Lösungs-Agent, und ein **Send message**-Knoten gibt das Ergebnis zurück. Das Modell klassifiziert, die Regel entscheidet – ein Hybrid aus LLM und Regeln.',
          },
          focus: ['e-yes', 'resolve', 'e-out', 'reply'],
        },
        {
          title: { en: 'Pause for a human', de: 'Für einen Menschen pausieren' },
          text: {
            en: 'Otherwise an **Ask a question** node posts its question into the workflow\'s conversation and waits. Whoever answers in that conversation — here the supervisor, through your app — provides the reply, which is saved as `Local.Approval`: the human-in-the-loop pattern.',
            de: 'Sonst stellt ein **Ask a question**-Knoten seine Frage in die Conversation des Workflows und wartet. Wer in dieser Conversation antwortet – hier der Supervisor über deine App –, liefert die Antwort, die als `Local.Approval` gespeichert wird: das Human-in-the-loop-Muster.',
          },
          focus: ['e-no', 'ask', 'e-sup', 'sup', 'e-ans'],
        },
        {
          title: { en: 'Approve or escalate', de: 'Freigeben oder eskalieren' },
          text: {
            en: 'A second if/else checks `Local.Approval = "yes"` — Power Fx compares with a single `=` (`<>` means not equal; `==` isn\'t a Power Fx operator). Approved requests continue to the resolver agent; everything else is escalated.',
            de: 'Ein zweites if/else prüft `Local.Approval = "yes"` – Power Fx vergleicht mit einem einfachen `=` (`<>` heißt ungleich; `==` ist kein Power-Fx-Operator). Genehmigte Anfragen gehen weiter an den Lösungs-Agent, alles andere wird eskaliert.',
          },
          focus: ['approved', 'e-ok', 'e-esc', 'escalate'],
        },
        {
          title: { en: 'Save creates a version', de: 'Speichern erzeugt eine Version' },
          text: {
            en: 'You edit the draft on the canvas or in the YAML view; nothing is saved automatically. Each **Save** freezes a new version that can be viewed or deleted but not changed. Workflows are in preview and retire on December 1, 2026.',
            de: 'Du bearbeitest den Entwurf auf dem Canvas oder in der YAML-Ansicht; nichts wird automatisch gespeichert. Jedes **Save** friert eine neue Version ein, die man ansehen oder löschen, aber nicht ändern kann. Workflows sind in Preview und werden am 1. Dezember 2026 eingestellt.',
          },
          focus: ['g-wf'],
        },
      ],
    },
    {
      id: 'workflow-lifecycle',
      title: { en: 'From designer to code — and the migration path', de: 'Vom Designer zum Code – und der Migrationsweg' },
      caption: {
        en: 'Today an app calls the saved workflow by name. Because the designer retires, the exported YAML moves to Microsoft Agent Framework and runs as a hosted agent.',
        de: 'Heute ruft eine App den gespeicherten Workflow per Name auf. Weil der Designer eingestellt wird, wandert das exportierte YAML zu Microsoft Agent Framework und läuft als Hosted Agent.',
      },
      width: 960,
      height: 490,
      groups: [
        { id: 'g-portal', x: 10, y: 20, w: 940, h: 124, label: { en: 'Foundry project · workflow designer (preview, retires Dec 1, 2026)', de: 'Foundry-Projekt · Workflow-Designer (Preview, endet am 1. Dez. 2026)' }, tone: 'foundry' },
        { id: 'g-code', x: 10, y: 350, w: 940, h: 124, label: { en: 'Code-first path (recommended)', de: 'Code-first-Weg (empfohlen)' }, tone: 'app' },
      ],
      nodes: [
        { id: 'designer', x: 75, y: 60, w: 170, h: 64, label: { en: 'Workflow designer', de: 'Workflow-Designer' }, sub: { en: 'visual canvas', de: 'visueller Canvas' }, tone: 'foundry' },
        { id: 'yaml', x: 375, y: 60, w: 170, h: 64, label: { en: 'YAML view', de: 'YAML-Ansicht' }, sub: { en: 'same definition', de: 'dieselbe Definition' }, tone: 'data', shape: 'doc' },
        { id: 'wf', x: 695, y: 60, w: 190, h: 64, label: { en: 'Saved version', de: 'Gespeicherte Version' }, sub: { en: 'immutable · by name', de: 'unveränderlich · Name' }, tone: 'foundry' },
        { id: 'app', x: 695, y: 210, w: 190, h: 64, label: { en: 'Your app', de: 'Deine App' }, sub: 'responses.create', tone: 'app' },
        { id: 'af', x: 375, y: 390, w: 170, h: 64, label: 'Agent Framework', sub: { en: 'declarative YAML', de: 'deklaratives YAML' }, tone: 'app' },
        { id: 'hosted', x: 695, y: 390, w: 190, h: 64, label: { en: 'Hosted agent', de: 'Hosted Agent' }, sub: 'Foundry Agent Service', tone: 'foundry' },
      ],
      edges: [
        { id: 'e-dy', from: 'designer', to: 'yaml', bidir: true, label: { en: 'synced', de: 'synchron' } },
        { id: 'e-yw', from: 'yaml', to: 'wf', label: { en: 'Save (either view)', de: 'Save (jede Ansicht)' } },
        { id: 'e-aw', from: 'app', to: 'wf', label: { en: 'agent reference', de: 'Agent-Referenz' } },
        { id: 'e-ya', from: 'yaml', to: 'af', dashed: true, label: { en: 'export', de: 'exportieren' } },
        { id: 'e-ah', from: 'af', to: 'hosted', label: { en: 'deploy', de: 'Deployment' } },
        { id: 'e-ah2', from: 'app', to: 'hosted', dashed: true, label: { en: 'after migration', de: 'nach Migration' } },
      ],
      steps: [
        {
          title: { en: 'Two views, one definition', de: 'Zwei Ansichten, eine Definition' },
          text: {
            en: 'The visual canvas and the YAML view edit the same workflow definition — change one and the other follows. Notes on the canvas explain design decisions to future maintainers.',
            de: 'Der visuelle Canvas und die YAML-Ansicht bearbeiten dieselbe Workflow-Definition – änderst du eine, zieht die andere nach. Notizen auf dem Canvas erklären Designentscheidungen für spätere Maintainer.',
          },
          focus: ['designer', 'e-dy', 'yaml'],
        },
        {
          title: { en: 'Every Save is a version', de: 'Jedes Save ist eine Version' },
          text: {
            en: 'Foundry doesn\'t autosave. Whichever view you edited in, **Save** stores the shared definition and freezes a new version; the **Version** list lets you view or delete versions, but not change them.',
            de: 'Foundry speichert nicht automatisch. Egal, in welcher Ansicht du bearbeitet hast: **Save** speichert die gemeinsame Definition und friert eine neue Version ein; über die **Version**-Liste siehst du Versionen an oder löschst sie, ändern kannst du sie nicht.',
          },
          focus: ['e-yw', 'wf'],
        },
        {
          title: { en: 'Call it from your app', de: 'Aus deiner App aufrufen' },
          text: {
            en: 'A saved workflow is an agent of kind `workflow` in the project. The app gets the project\'s OpenAI-compatible client, creates a conversation and calls `responses.create` with an `agent_reference` (the agent\'s or workflow\'s name, so the call runs it). With `stream=True` it sees `response.output_item.done` per workflow action and `response.completed` at the end — supported until December 1, 2026.',
            de: 'Ein gespeicherter Workflow ist ein Agent der Art `workflow` im Projekt. Die App holt sich den OpenAI-kompatiblen Client des Projekts, erstellt eine Conversation und ruft `responses.create` mit einer `agent_reference` auf (dem Namen des Agents oder Workflows, damit der Aufruf ihn ausführt). Mit `stream=True` sieht sie `response.output_item.done` pro Workflow-Aktion und am Ende `response.completed` – unterstützt bis zum 1. Dezember 2026.',
          },
          focus: ['app', 'e-aw', 'wf'],
        },
        {
          title: { en: 'Migrate before December 1, 2026', de: 'Vor dem 1. Dezember 2026 migrieren' },
          text: {
            en: 'Export the YAML, run it with Agent Framework declarative workflows (or convert it to code) and deploy it as a hosted agent. Alternatives: Azure Logic Apps for a visual designer, A2A for simple agent-to-agent delegation.',
            de: 'Exportiere das YAML, führe es mit deklarativen Workflows in Agent Framework aus (oder wandle es in Code um) und stelle es als Hosted Agent bereit. Alternativen: Azure Logic Apps für einen visuellen Designer, A2A für einfache Delegation zwischen Agents.',
          },
          focus: ['e-ya', 'af', 'e-ah', 'hosted', 'e-ah2', 'app'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Workflow (preview)',
      text: {
        en: 'A UI-based, declarative sequence of actions in the Foundry portal that orchestrates agents and business logic. Use it for repeatable multi-agent processes, if/else logic and variables without code, and human-in-the-loop steps. It retires on December 1, 2026; new workflows belong in Microsoft Agent Framework.',
        de: 'Eine UI-basierte, deklarative Abfolge von Aktionen im Foundry-Portal, die Agents und Geschäftslogik orchestriert. Du nutzt sie für wiederholbare Multi-Agent-Abläufe, if/else-Logik und Variablen ohne Code sowie Human-in-the-loop-Schritte. Sie wird am 1. Dezember 2026 eingestellt; neue Workflows gehören in Microsoft Agent Framework.',
      },
    },
    {
      term: 'Workflow patterns',
      text: {
        en: '**Sequential** passes each agent\'s result to the next in a fixed order. **Human in the loop** asks a question in the conversation and waits for the answer (approvals, missing details). **Group chat** passes control between agents dynamically based on context or rules (escalation, fallback). Rebuilt in Agent Framework, choose group chat if an orchestrator should pick the next speaker, or handoff if the current agent should pass the conversation to a specialist; branching and human-in-the-loop steps carry over too.',
        de: '**Sequential** gibt das Ergebnis jedes Agents in fester Reihenfolge an den nächsten weiter. **Human in the loop** stellt in der Conversation eine Frage und wartet auf die Antwort (Freigaben, fehlende Angaben). **Group chat** übergibt die Kontrolle dynamisch nach Kontext oder Regeln zwischen Agents (Eskalation, Fallback). Baust du ihn in Agent Framework nach, wählst du Group chat, wenn ein Orchestrator den nächsten Sprecher bestimmen soll, oder Handoff, wenn der aktuelle Agent das Gespräch an einen Spezialisten übergeben soll; Verzweigungen und Human-in-the-loop-Schritte lassen sich ebenfalls übertragen.',
      },
    },
    {
      term: 'Node types',
      text: {
        en: '**Invoke agent** runs an existing or new agent; **logic** nodes are if/else, go to and for each; **data transformation** nodes set a variable or parse a value; **basic chat** nodes send a message or ask a question. Hosted agents can\'t be added to the designer.',
        de: '**Invoke agent** führt einen bestehenden oder neuen Agent aus; **Logik**-Knoten sind if/else, go to und for each; **Data-Transformation**-Knoten setzen eine Variable oder parsen einen Wert; **Basic-Chat**-Knoten senden eine Nachricht oder stellen eine Frage. Hosted Agents lassen sich nicht in den Designer einfügen.',
      },
    },
    {
      term: 'Structured agent output',
      text: {
        en: 'In the Invoke agent configuration, set **Text format** to **JSON Schema** and paste the schema. Under **Action settings**, save the output as a variable so later nodes can branch on fields such as `Local.Triage.category`. Never put secrets into schemas, prompts or variables.',
        de: 'In der Konfiguration von Invoke agent stellst du **Text format** auf **JSON Schema** und fügst das Schema ein. Unter **Action settings** speicherst du die Ausgabe als Variable, damit spätere Knoten nach Feldern wie `Local.Triage.category` verzweigen können. Geheimnisse gehören nie in Schemas, Prompts oder Variablen.',
      },
    },
    {
      term: 'Power Fx',
      text: {
        en: 'The low-code, Excel-like formula language of workflows, used for conditions, variable values and loops, for example `Upper(Local.Input)` or `If(Local.Confidence > 0.8, "Proceed", "Escalate")`. Comparisons use `=`, `<>`, `>`, `>=` (no `==`). A missing `Local.`/`System.` prefix causes "Name isn\'t valid"; a type mismatch needs `Text()` or `Value()`.',
        de: 'Die Low-Code-Formelsprache im Excel-Stil für Bedingungen, Variablenwerte und Schleifen, zum Beispiel `Upper(Local.Input)` oder `If(Local.Confidence > 0.8, "Proceed", "Escalate")`. Vergleiche nutzen `=`, `<>`, `>`, `>=` (kein `==`). Ein fehlendes Präfix `Local.`/`System.` führt zu „Name isn\'t valid“; bei einem Typkonflikt helfen `Text()` oder `Value()`.',
      },
    },
    {
      term: 'Versioning and YAML',
      text: {
        en: 'You edit the draft on the canvas or in the YAML view, which stay in sync. Foundry never saves automatically; each Save freezes a new version that you can view or delete (Version drop-down) but not change. The YAML file is the portable artifact you export for migration.',
        de: 'Du bearbeitest den Entwurf auf dem Canvas oder in der YAML-Ansicht, die synchron bleiben. Foundry speichert nie automatisch; jedes Save friert eine neue Version ein, die du ansehen oder löschen (Version-Dropdown), aber nicht ändern kannst. Die YAML-Datei ist das portable Artefakt, das du für die Migration exportierst.',
      },
    },
    {
      term: 'Successor: Agent Framework workflows',
      text: {
        en: 'Recommended for all new workflows. Declarative YAML runs with `WorkflowFactory` (actions such as `InvokeAzureAgent`, `If`, `ConditionGroup`, `Foreach`, `Question`); code-first workflows use `WorkflowBuilder` edges, prebuilt `SequentialBuilder`/`GroupChatBuilder` orchestrations and `request_info` for human input. Deploy as a hosted agent; Azure Logic Apps (visual) and A2A (simple delegation) are the other paths.',
        de: 'Empfohlen für alle neuen Workflows. Deklaratives YAML läuft mit `WorkflowFactory` (Aktionen wie `InvokeAzureAgent`, `If`, `ConditionGroup`, `Foreach`, `Question`); Code-first-Workflows nutzen `WorkflowBuilder`-Edges, fertige Orchestrierungen wie `SequentialBuilder`/`GroupChatBuilder` und `request_info` für menschliche Eingaben. Bereitstellung als Hosted Agent; Azure Logic Apps (visuell) und A2A (einfache Delegation) sind die weiteren Wege.',
      },
    },
  ],
  comparison: {
    title: { en: 'Designer node ↔ Agent Framework declarative action', de: 'Designer-Knoten ↔ deklarative Aktion in Agent Framework' },
    columns: [
      { en: 'Need', de: 'Bedarf' },
      { en: 'Workflow designer node', de: 'Knoten im Workflow-Designer' },
      { en: 'Agent Framework declarative YAML', de: 'Deklaratives YAML (Agent Framework)' },
    ],
    rows: [
      [{ en: 'Call an agent', de: 'Agent aufrufen' }, 'Invoke agent', 'InvokeAzureAgent'],
      [{ en: 'Ask a person and wait', de: 'Person fragen und warten' }, 'Ask a question', 'Question · RequestExternalInput'],
      [{ en: 'Send text to the user', de: 'Text an den Nutzer senden' }, 'Send message', 'SendActivity'],
      [{ en: 'Branch on a condition', de: 'Nach Bedingung verzweigen' }, 'If/else', 'If · ConditionGroup'],
      [{ en: 'Loop over a list', de: 'Über eine Liste iterieren' }, 'For each', 'Foreach'],
      [{ en: 'Jump to another step', de: 'Zu einem anderen Schritt springen' }, 'Go to', 'GotoAction'],
      [{ en: 'Store a value', de: 'Wert speichern' }, 'Set variable', 'SetVariable'],
    ],
  },
  code: [
    {
      title: { en: 'Run a saved workflow from Python (until December 1, 2026)', de: 'Gespeicherten Workflow aus Python starten (bis 1. Dezember 2026)' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

project = AIProjectClient(
    endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
    credential=DefaultAzureCredential(),
)
openai = project.get_openai_client()
conversation = openai.conversations.create()      # holds this run's history

stream = openai.responses.create(
    conversation=conversation.id,
    extra_body={"agent_reference": {"name": "triage-workflow", "type": "agent_reference"}},
    input="Users can't reset their password in the mobile app.",
    stream=True,
)
for event in stream:
    if event.type == "response.output_item.done" and event.item.type == "workflow_action":
        print("action", event.item.action_id, event.item.status)
    elif event.type == "response.completed":
        print(event.response.output_text)`,
      notes: [
        { en: 'A saved workflow is referenced by name, just like an agent: `agent_reference` goes into `extra_body` on every call of the run.', de: 'Ein gespeicherter Workflow wird wie ein Agent per Name referenziert: `agent_reference` steht bei jedem Aufruf des Laufs in `extra_body`.' },
        { en: 'When the workflow waits at an Ask a question node, send the approver\'s answer as `input` in another `responses.create` call with the same `conversation` and the same `agent_reference`. The docs name no dedicated pause event.', de: 'Wartet der Workflow an einem Ask-a-question-Knoten, schickst du die Antwort des Freigebenden als `input` in einem weiteren `responses.create`-Aufruf mit derselben `conversation` und derselben `agent_reference`. Ein eigenes Pause-Event nennen die Docs nicht.' },
        { en: 'Portal workflow execution ends on December 1, 2026. In Agent Framework the same pause is a `request_info` event that you answer with `workflow.run(responses={request_id: answer})`.', de: 'Die Ausführung von Portal-Workflows endet am 1. Dezember 2026. In Agent Framework ist dieselbe Pause ein `request_info`-Event, das du mit `workflow.run(responses={request_id: answer})` beantwortest.' },
      ],
    },
    {
      title: { en: 'Migration path: run the exported YAML with Agent Framework', de: 'Migrationsweg: exportiertes YAML mit Agent Framework ausführen' },
      code: `import asyncio
from agent_framework.declarative import WorkflowFactory
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

async def main() -> None:
    client = FoundryChatClient(
        project_endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
        model="gpt-5-mini",                      # deployment name
        credential=AzureCliCredential(),
    )
    factory = WorkflowFactory()
    factory.register_agent("TriageAgent", client.as_agent(
        name="TriageAgent", instructions="Classify the ticket and rate your confidence."))
    workflow = factory.create_workflow_from_yaml_path("triage.workflow.yaml")
    result = await workflow.run({"ticket": "Password reset fails on mobile"})
    for output in result.get_outputs():
        print(output)

asyncio.run(main())`,
      notes: [
        { en: 'Install `agent-framework-declarative`. In the YAML, values that start with `=` are Power Fx expressions, for example `condition: =Local.Approval = "yes"`.', de: 'Installiere `agent-framework-declarative`. Im YAML sind Werte, die mit `=` beginnen, Power-Fx-Ausdrücke, zum Beispiel `condition: =Local.Approval = "yes"`.' },
        { en: 'Agents that `InvokeAzureAgent` actions name in the YAML are registered with the factory; `model` is your deployment name, which can be any name you chose. Test, then deploy as a hosted agent.', de: 'Agents, die `InvokeAzureAgent`-Aktionen im YAML benennen, registrierst du bei der Factory; `model` ist dein Deployment-Name, den du frei wählen kannst. Teste und stelle dann als Hosted Agent bereit.' },
      ],
    },
  ],
  traps: [
    {
      en: 'Existing workflow → answer with designer nodes; "build a NEW workflow" → Microsoft Agent Framework, never the portal designer. Foundry workflows retire on December 1, 2026; afterwards YAML workflows still run only when deployed as a hosted agent.',
      de: 'Bestehender Workflow → Antwort mit Designer-Knoten; „baue einen NEUEN Workflow“ → Microsoft Agent Framework, nie der Portal-Designer. Foundry-Workflows werden am 1. Dezember 2026 eingestellt; danach laufen YAML-Workflows nur noch, wenn sie als Hosted Agent bereitgestellt sind.',
    },
    {
      en: 'Foundry doesn\'t save workflows automatically — unsaved changes don\'t run, and every Save creates a new immutable version.',
      de: 'Foundry speichert Workflows nicht automatisch – ungespeicherte Änderungen laufen nicht, und jedes Save erzeugt eine neue, unveränderliche Version.',
    },
    {
      en: 'Power Fx needs the scope prefix: `Local.Approval`, not `Approval`. Built-in values such as the last message live under `System.`.',
      de: 'Power Fx braucht das Scope-Präfix: `Local.Approval`, nicht `Approval`. Eingebaute Werte wie die letzte Nachricht liegen unter `System.`.',
    },
    {
      en: 'A **Send message** node only outputs text; to wait for a person\'s decision you need **Ask a question** plus a saved variable and an if/else.',
      de: 'Ein **Send message**-Knoten gibt nur Text aus; um auf die Entscheidung einer Person zu warten, brauchst du **Ask a question** plus gespeicherte Variable und if/else.',
    },
    {
      en: 'Hosted agents can\'t be added to the workflow designer — orchestrate inside a hosted agent with Agent Framework workflows instead.',
      de: 'Hosted Agents lassen sich nicht in den Workflow-Designer einfügen – orchestriere innerhalb eines Hosted Agent stattdessen mit Agent-Framework-Workflows.',
    },
  ],
  takeaways: [
    { en: 'Fixed order → sequential; a person must decide → human in the loop; dynamic expert routing → group chat.', de: 'Feste Reihenfolge → Sequential; eine Person entscheidet → Human in the loop; dynamisches Experten-Routing → Group chat.' },
    { en: 'Routable agent output = JSON schema response format + saved variable + Power Fx if/else.', de: 'Routbare Agent-Ausgabe = JSON-Schema-Antwortformat + gespeicherte Variable + Power-Fx-if/else.' },
    { en: 'From code: one conversation per run, `responses.create` with an agent reference, and further messages to answer pauses.', de: 'Per Code: eine Conversation pro Lauf, `responses.create` mit Agent-Referenz und weitere Nachrichten, um Pausen zu beantworten.' },
    { en: 'New workflows: Microsoft Agent Framework; keep the exported YAML as your migration artifact.', de: 'Neue Workflows: Microsoft Agent Framework; das exportierte YAML ist dein Migrationsartefakt.' },
  ],
  sources: [
    { title: 'Build a workflow in Microsoft Foundry (Preview)', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/workflow' },
    { title: 'Declarative workflows overview (Microsoft Agent Framework)', url: 'https://learn.microsoft.com/en-us/agent-framework/workflows/declarative?pivots=programming-language-python' },
    { title: 'Use and migrate declarative agent workflows with Microsoft Foundry Toolkit', url: 'https://learn.microsoft.com/en-us/azure/foundry/how-to/develop/vs-code-agents-workflow-low-code' },
    { title: 'Build with agents, conversations, and responses', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/runtime-components' },
    { title: 'Operators and identifiers in Power Fx', url: 'https://learn.microsoft.com/en-us/power-platform/power-fx/operators' },
  ],
}
