import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'agents-vscode',
  summary: {
    en: 'An **AI agent** is a service that uses a model to understand a request, decide which **tools** to call, and act on behalf of a user. **Foundry Agent Service** runs agents for you: a **prompt agent** is pure configuration (model + instructions + tools), a **hosted agent** is your own code in a container that Foundry hosts. You build in the Foundry portal or in VS Code with the **Microsoft Foundry Toolkit**, and every saved change becomes an immutable **agent version** behind a stable endpoint. Apps talk to the agent through the Responses API and keep context in **conversations**, while **tracing, monitoring and evaluation** in Application Insights show what the agent did and how well it did it.',
    de: 'Ein **KI-Agent** ist ein Dienst, der mit einem Modell eine Anfrage versteht, entscheidet, welche **Tools** er aufruft, und im Auftrag eines Nutzers handelt. **Foundry Agent Service** betreibt Agents für dich: Ein **Prompt Agent** ist reine Konfiguration (Modell + Anweisungen + Tools), ein **Hosted Agent** ist dein eigener Code in einem Container, den Foundry hostet. Du baust im Foundry-Portal oder in VS Code mit dem **Microsoft Foundry Toolkit**, und jede gespeicherte Änderung wird zu einer unveränderlichen **Agent Version** hinter einem stabilen Endpoint. Apps sprechen über die Responses API mit dem Agent und halten den Kontext in **Conversations**; **Tracing, Monitoring und Evaluierung** in Application Insights zeigen, was der Agent getan hat und wie gut.',
  },
  examFocus: {
    en: 'Expect scenarios where you pick the agent type, put role and rules into `instructions`, choose a conversation-tracking approach (`conversation`, `previous_response_id`, `store=False`) and pin the endpoint’s `version_selector`. Observability is heavily tested: Traces view vs Monitor tab, span-level latency and token usage, which agent evaluator answers which question, continuous evaluation rules, cluster analysis, evaluation gates in GitHub Actions, and who may read sensitive trace content.',
    de: 'Rechne mit Szenarien, in denen du den Agent-Typ wählst, Rolle und Regeln in `instructions` schreibst, einen Ansatz zur Gesprächsverfolgung wählst (`conversation`, `previous_response_id`, `store=False`) und den `version_selector` des Endpoints festlegst. Observability wird intensiv geprüft: Traces-Ansicht vs. Monitor-Tab, Latenz und Token-Verbrauch auf Span-Ebene, welcher Agent-Evaluator welche Frage beantwortet, Regeln für kontinuierliche Evaluierung, Cluster-Analyse, Evaluierungs-Gates in GitHub Actions und wer sensible Trace-Inhalte lesen darf.',
  },
  diagrams: [
    {
      id: 'agent-loop',
      title: { en: 'The agent loop: from message to response', de: 'Die Agent-Schleife: von der Nachricht zur Antwort' },
      caption: {
        en: 'Your app sends input into a conversation; the agent version (model + instructions + tools) decides, calls tools and appends its response to the same conversation.',
        de: 'Deine App schickt Input in eine Conversation; die Agent Version (Modell + Anweisungen + Tools) entscheidet, ruft Tools auf und hängt ihre Antwort an dieselbe Conversation an.',
      },
      width: 960,
      height: 400,
      groups: [{ id: 'g-proj', x: 400, y: 20, w: 540, h: 360, label: 'Foundry project', tone: 'foundry' }],
      nodes: [
        { id: 'user', x: 20, y: 60, w: 130, h: 64, label: { en: 'Customer', de: 'Kunde' }, tone: 'user', shape: 'actor' },
        { id: 'app', x: 190, y: 57, w: 170, h: 70, label: { en: 'Your app', de: 'Deine App' }, sub: 'responses.create()', tone: 'app' },
        { id: 'conv', x: 420, y: 57, w: 200, h: 70, label: 'Conversation', sub: { en: 'messages · tool items', de: 'Nachrichten · Tool-Items' }, tone: 'data', shape: 'store' },
        { id: 'agentver', x: 700, y: 57, w: 200, h: 70, label: 'Agent version', sub: { en: 'model · instructions · tools', de: 'Modell · Anweisungen · Tools' }, tone: 'foundry' },
        { id: 'model', x: 700, y: 180, w: 200, h: 64, label: 'Model deployment', sub: { en: 'e.g. gpt-4.1', de: 'z. B. gpt-4.1' }, tone: 'model' },
        { id: 'tools', x: 700, y: 290, w: 200, h: 64, label: 'Tools', sub: { en: 'file search, MCP, functions', de: 'File Search, MCP, Funktionen' }, tone: 'tool' },
        { id: 'resp', x: 420, y: 290, w: 200, h: 64, label: 'Response', sub: { en: 'output items · output_text', de: 'Output-Items · output_text' }, tone: 'model', shape: 'pill' },
      ],
      edges: [
        { id: 'e-u-a', from: 'user', to: 'app' },
        { id: 'e-a-c', from: 'app', to: 'conv', label: { en: 'input', de: 'Input' } },
        { id: 'e-c-v', from: 'conv', to: 'agentver', label: { en: 'history', de: 'Verlauf' } },
        { id: 'e-v-m', from: 'agentver', to: 'model', label: { en: 'decide', de: 'entscheiden' } },
        { id: 'e-m-t', from: 'model', to: 'tools', label: { en: 'tool calls', de: 'Tool-Aufrufe' } },
        { id: 'e-t-r', from: 'tools', to: 'resp', label: { en: 'results', de: 'Ergebnis' } },
        { id: 'e-r-a', from: 'resp', to: 'app', label: { en: 'answer', de: 'Antwort' }, via: [[275, 322]] },
        { id: 'e-r-c', from: 'resp', to: 'conv', label: { en: 'appended', de: 'angehängt' }, dashed: true },
      ],
      steps: [
        {
          title: { en: 'Message in', de: 'Nachricht kommt an' },
          text: {
            en: 'Your app receives the customer’s message and calls `responses.create(conversation=…, input=…)` on the client from `project.get_openai_client(agent_name=…)`.',
            de: 'Deine App empfängt die Nachricht des Kunden und ruft `responses.create(conversation=…, input=…)` auf dem Client aus `project.get_openai_client(agent_name=…)` auf.',
          },
          focus: ['user', 'e-u-a', 'app'],
        },
        {
          title: { en: 'Conversation supplies history', de: 'Conversation liefert den Verlauf' },
          text: {
            en: 'A conversation stores **items**: messages, tool calls and tool outputs. The whole conversation is sent as input, so follow-up questions work; if it exceeds the context window, the input is truncated but the conversation itself is not.',
            de: 'Eine Conversation speichert **Items**: Nachrichten, Tool-Aufrufe und Tool-Ausgaben. Die ganze Conversation geht als Input mit, daher funktionieren Folgefragen; überschreitet sie das Kontextfenster, wird der Input gekürzt, die Conversation selbst aber nicht.',
          },
          focus: ['e-a-c', 'conv', 'e-c-v'],
        },
        {
          title: { en: 'The agent version decides', de: 'Die Agent Version entscheidet' },
          text: {
            en: 'The agent version is an immutable snapshot of model deployment, instructions and tools. Its model reads instructions, history and tool descriptions and decides whether it can answer directly or needs a tool.',
            de: 'Die Agent Version ist ein unveränderlicher Schnappschuss aus Modell-Deployment, Anweisungen und Tools. Ihr Modell liest Anweisungen, Verlauf und Tool-Beschreibungen und entscheidet, ob es direkt antwortet oder ein Tool braucht.',
          },
          focus: ['agentver', 'e-v-m', 'model'],
        },
        {
          title: { en: 'Tools act', de: 'Tools handeln' },
          text: {
            en: 'Service-side tools such as file search or MCP run automatically. A **function tool** is different: the response returns a `function_call` item, and your app must run the code and send back a `function_call_output`.',
            de: 'Serverseitige Tools wie File Search oder MCP laufen automatisch. Ein **Function Tool** ist anders: Die Antwort enthält ein `function_call`-Item, und deine App muss den Code ausführen und ein `function_call_output` zurückschicken.',
          },
          focus: ['e-m-t', 'tools', 'e-t-r'],
        },
        {
          title: { en: 'Answer and remember', de: 'Antworten und merken' },
          text: {
            en: 'The response carries output items and `output_text` for the user. It is appended to the same conversation, so the next turn sees it.',
            de: 'Die Antwort enthält Output-Items und `output_text` für den Nutzer. Sie wird an dieselbe Conversation angehängt, sodass die nächste Runde sie sieht.',
          },
          focus: ['resp', 'e-r-a', 'e-r-c'],
        },
      ],
    },
    {
      id: 'observe-improve',
      title: { en: 'Observe, evaluate, improve', de: 'Beobachten, evaluieren, verbessern' },
      caption: {
        en: 'Spans flow into Application Insights. Traces explain single requests, the Monitor tab and continuous evaluation watch production, and error analysis feeds the next version through a CI/CD evaluation gate.',
        de: 'Spans landen in Application Insights. Traces erklären einzelne Anfragen, Monitor-Tab und kontinuierliche Evaluierung beobachten die Produktion, und die Fehleranalyse speist über ein CI/CD-Evaluierungs-Gate die nächste Version.',
      },
      width: 960,
      height: 440,
      nodes: [
        { id: 'gate', x: 30, y: 30, w: 200, h: 70, label: { en: 'CI/CD eval gate', de: 'CI/CD-Eval-Gate' }, sub: 'ai-agent-evals Action', tone: 'app' },
        { id: 'agent', x: 380, y: 30, w: 200, h: 70, label: { en: 'Deployed agent', de: 'Produktiver Agent' }, sub: { en: 'pinned version', de: 'gepinnte Version' }, tone: 'foundry' },
        { id: 'appins', x: 730, y: 28, w: 200, h: 74, label: 'Application Insights', sub: { en: 'OpenTelemetry spans', de: 'OpenTelemetry-Spans' }, tone: 'data', shape: 'store' },
        { id: 'traces', x: 30, y: 190, w: 200, h: 70, label: { en: 'Traces view', de: 'Traces-Ansicht' }, sub: { en: 'spans · latency · tokens', de: 'Spans · Latenz · Tokens' }, tone: 'foundry' },
        { id: 'monitor', x: 380, y: 190, w: 200, h: 70, label: { en: 'Monitor tab', de: 'Monitor-Tab' }, sub: { en: 'tokens · latency · success', de: 'Tokens · Latenz · Erfolg' }, tone: 'foundry' },
        { id: 'conteval', x: 730, y: 190, w: 200, h: 70, label: { en: 'Continuous eval', de: 'Kontinuierliche Eval.' }, sub: { en: 'evaluators on live traffic', de: 'Evaluatoren auf Live-Traffic' }, tone: 'safety' },
        { id: 'analysis', x: 380, y: 330, w: 200, h: 70, label: { en: 'Error analysis', de: 'Fehleranalyse' }, sub: { en: 'clusters · Insights', de: 'Cluster · Insights' }, tone: 'foundry' },
      ],
      edges: [
        { id: 'e-ga', from: 'gate', to: 'agent', label: { en: 'promote', de: 'freigeben' } },
        { id: 'e-aa', from: 'agent', to: 'appins', label: { en: 'spans', de: 'Spans' } },
        { id: 'e-at', from: 'appins', to: 'traces', via: [[830, 145], [130, 145]] },
        { id: 'e-am', from: 'appins', to: 'monitor', via: [[830, 145], [480, 145]] },
        { id: 'e-ac', from: 'appins', to: 'conteval' },
        { id: 'e-ta', from: 'traces', to: 'analysis', label: { en: 'traces', de: 'Traces' }, via: [[130, 365]] },
        { id: 'e-ca', from: 'conteval', to: 'analysis', label: { en: 'scores', de: 'Scores' }, via: [[830, 365]] },
        { id: 'e-loop', from: 'analysis', to: 'gate', label: { en: 'fix → new version', de: 'Fix → neue Version' }, dashed: true, via: [[480, 420], [15, 420], [15, 65]] },
      ],
      steps: [
        {
          title: { en: 'Every run leaves spans', de: 'Jeder Lauf hinterlässt Spans' },
          text: {
            en: 'Connect Application Insights to the project and Foundry records **server-side traces** for prompt and hosted agents with no code change. Client-side tracing (OpenTelemetry in your app) adds spans for your own code.',
            de: 'Verbinde Application Insights mit dem Projekt, und Foundry zeichnet **serverseitige Traces** für Prompt und Hosted Agents ohne Codeänderung auf. Clientseitiges Tracing (OpenTelemetry in deiner App) ergänzt Spans für deinen eigenen Code.',
          },
          focus: ['agent', 'e-aa', 'appins'],
        },
        {
          title: { en: 'Debug one request', de: 'Eine Anfrage debuggen' },
          text: {
            en: 'A trace is a tree of spans: every model call and tool call with inputs, outputs, token counts and duration. Comparing span durations shows whether the model or a tool causes latency; the portal keeps 90 days searchable.',
            de: 'Ein Trace ist ein Baum aus Spans: jeder Modell- und Tool-Aufruf mit Input, Output, Token-Zahlen und Dauer. Der Vergleich der Span-Dauern zeigt, ob das Modell oder ein Tool die Latenz verursacht; das Portal hält 90 Tage durchsuchbar.',
          },
          focus: ['e-at', 'traces'],
        },
        {
          title: { en: 'Watch the whole agent', de: 'Den ganzen Agent beobachten' },
          text: {
            en: 'The agent’s **Monitor** tab aggregates token usage, latency, run success rate, evaluation scores and red-team results. Alerts (preview) flag anomalies in these signals.',
            de: 'Der **Monitor**-Tab des Agents bündelt Token-Verbrauch, Latenz, Erfolgsquote der Läufe, Evaluierungs-Scores und Red-Team-Ergebnisse. Alerts (Preview) melden Auffälligkeiten in diesen Signalen.',
          },
          focus: ['e-am', 'monitor'],
        },
        {
          title: { en: 'Score live traffic', de: 'Live-Traffic bewerten' },
          text: {
            en: 'A **continuous evaluation** rule runs evaluators such as task adherence or violence on completed responses, capped by `max_hourly_runs`. These scores are your production quality and safety signals.',
            de: 'Eine Regel für **kontinuierliche Evaluierung** führt Evaluatoren wie Task Adherence oder Violence auf abgeschlossenen Antworten aus, begrenzt durch `max_hourly_runs`. Diese Scores sind deine Qualitäts- und Sicherheitssignale in der Produktion.',
          },
          focus: ['e-ac', 'conteval'],
        },
        {
          title: { en: 'Analyze and ship the fix', de: 'Analysieren und Fix ausliefern' },
          text: {
            en: '**Cluster analysis** groups failing evaluation rows; **Insights** (preview) groups recurring trace behavior. Fix instructions or tools, save a new version, let the CI/CD gate compare it with the baseline, then move the version selector.',
            de: 'Die **Cluster-Analyse** gruppiert fehlgeschlagene Evaluierungszeilen; **Insights** (Preview) gruppiert wiederkehrendes Verhalten in Traces. Korrigiere Anweisungen oder Tools, speichere eine neue Version, lass das CI/CD-Gate sie mit der Baseline vergleichen und stelle dann den Version Selector um.',
          },
          focus: ['e-ta', 'e-ca', 'analysis', 'e-loop', 'gate', 'e-ga'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Prompt agent vs hosted agent',
      text: {
        en: 'A **prompt agent** is configuration only — model deployment, instructions, tools — and Foundry runs it without code or containers. A **hosted agent** is your own code (for example Microsoft Agent Framework or LangGraph) shipped as a container image or .zip that Foundry runs with a managed endpoint, scaling and identity. Declarative workflows in Foundry retire on December 1, 2026; build new workflows with Microsoft Agent Framework.',
        de: 'Ein **Prompt Agent** ist reine Konfiguration – Modell-Deployment, Anweisungen, Tools – und Foundry betreibt ihn ohne Code oder Container. Ein **Hosted Agent** ist dein eigener Code (z. B. Microsoft Agent Framework oder LangGraph) als Container-Image oder .zip, den Foundry mit verwaltetem Endpoint, Skalierung und Identität betreibt. Deklarative Workflows in Foundry werden am 1. Dezember 2026 eingestellt; neue Workflows baust du mit Microsoft Agent Framework.',
      },
    },
    {
      term: 'Agent version',
      text: {
        en: 'An immutable snapshot of an agent’s configuration. Any change — even one word of the instructions — creates a new version (`create_version()` in code, **Save to Foundry** in VS Code). Code refers to it as `<agent_name>:<version>`; unsaved edits can be tried in the playground, but conversation history, monitoring and full evaluations need a saved version.',
        de: 'Ein unveränderlicher Schnappschuss der Agent-Konfiguration. Jede Änderung – selbst ein Wort in den Anweisungen – erzeugt eine neue Version (`create_version()` im Code, **Save to Foundry** in VS Code). Code verweist darauf als `<agent_name>:<version>`; ungespeicherte Änderungen kannst du im Playground testen, aber Gesprächsverlauf, Monitoring und vollständige Evaluierungen brauchen eine gespeicherte Version.',
      },
    },
    {
      term: 'Conversations, items and responses',
      text: {
        en: 'A **response** is one run of the agent. A **conversation** is a durable object that stores **items** — messages, tool calls, tool outputs — and is passed as `conversation=<id>`. Without a conversation you can chain stored responses with `previous_response_id`, or set `store=False` and resend the history yourself.',
        de: 'Eine **Response** ist ein Lauf des Agents. Eine **Conversation** ist ein dauerhaftes Objekt, das **Items** speichert – Nachrichten, Tool-Aufrufe, Tool-Ausgaben – und als `conversation=<id>` übergeben wird. Ohne Conversation verkettest du gespeicherte Antworten mit `previous_response_id` oder setzt `store=False` und schickst den Verlauf selbst mit.',
      },
    },
    {
      term: 'Microsoft Foundry Toolkit for Visual Studio Code',
      text: {
        en: 'The VS Code extension for Foundry (the new name for AI Toolkit; it also absorbs the former separate Foundry extension). **Agent Builder** configures prompt agents and saves versions, the **Tool Catalog** adds tools, MCP servers and toolboxes, **Agent Inspector** debugs local runs, and **View Code** generates a client that calls the selected saved version.',
        de: 'Die VS-Code-Erweiterung für Foundry (der neue Name des AI Toolkit; sie enthält auch die frühere separate Foundry-Erweiterung). **Agent Builder** konfiguriert Prompt Agents und speichert Versionen, der **Tool Catalog** fügt Tools, MCP-Server und Toolboxes hinzu, **Agent Inspector** debuggt lokale Läufe, und **View Code** erzeugt einen Client für die gewählte gespeicherte Version.',
      },
    },
    {
      term: 'Agent endpoint and version selector',
      text: {
        en: 'Every agent has a stable endpoint from the moment it is created. Its `version_selector` sends 100 % of traffic either to the latest version (default) or to one pinned version; only one version is active at a time. Callers use Microsoft Entra ID — **Foundry Agent Consumer** is the least-privilege role for invoking — and API keys aren’t supported.',
        de: 'Jeder Agent hat ab seiner Erstellung einen stabilen Endpoint. Sein `version_selector` leitet 100 % des Traffics entweder an die neueste Version (Standard) oder an eine festgelegte Version; aktiv ist immer nur eine Version. Aufrufer nutzen Microsoft Entra ID – **Foundry Agent Consumer** ist die Rolle mit den geringsten Rechten zum Aufrufen – API-Keys werden nicht unterstützt.',
      },
    },
    {
      term: 'Agent identity',
      text: {
        en: 'Each new agent gets its own Microsoft Entra agent identity that tools use to reach downstream services. It starts without any permissions, and roles of the project identity don’t transfer — grant the identity the roles its tools need, or calls that worked in development fail with authorization errors.',
        de: 'Jeder neue Agent erhält eine eigene Microsoft-Entra-Agent-Identität, mit der Tools nachgelagerte Dienste erreichen. Sie startet ohne Berechtigungen, und Rollen der Projektidentität werden nicht übertragen – gib der Identität die Rollen, die ihre Tools brauchen, sonst scheitern Aufrufe, die in der Entwicklung funktionierten, mit Autorisierungsfehlern.',
      },
    },
    {
      term: 'Tracing',
      text: {
        en: 'Foundry stores OpenTelemetry **spans** — model calls, tool calls with arguments and results, token counts, durations — in the **Application Insights** resource connected to the project. Server-side tracing needs no code; client-side tracing adds your app’s spans. Viewers need **Log Analytics Reader** on that resource.',
        de: 'Foundry speichert OpenTelemetry-**Spans** – Modellaufrufe, Tool-Aufrufe mit Argumenten und Ergebnissen, Token-Zahlen, Dauern – in der mit dem Projekt verbundenen **Application Insights**-Ressource. Serverseitiges Tracing braucht keinen Code; clientseitiges Tracing ergänzt die Spans deiner App. Wer Traces ansehen will, braucht **Log Analytics Reader** auf dieser Ressource.',
      },
    },
  ],
  comparison: {
    title: { en: 'Which observability feature answers which question?', de: 'Welches Observability-Feature beantwortet welche Frage?' },
    columns: [
      { en: 'Feature', de: 'Feature' },
      { en: 'Answers', de: 'Beantwortet' },
      { en: 'Based on', de: 'Grundlage' },
    ],
    rows: [
      [
        { en: 'Traces view', de: 'Traces-Ansicht' },
        { en: 'Why was this one response slow or wrong? Which tool ran with which arguments?', de: 'Warum war diese eine Antwort langsam oder falsch? Welches Tool lief mit welchen Argumenten?' },
        { en: 'Spans in Application Insights (90 days in the portal)', de: 'Spans in Application Insights (90 Tage im Portal)' },
      ],
      [
        { en: 'Monitor tab', de: 'Monitor-Tab' },
        { en: 'How is the agent doing overall: tokens, latency, run success rate?', de: 'Wie läuft der Agent insgesamt: Tokens, Latenz, Erfolgsquote?' },
        { en: 'Aggregated telemetry plus evaluation and red-team results', de: 'Aggregierte Telemetrie plus Evaluierungs- und Red-Team-Ergebnisse' },
      ],
      [
        { en: 'Continuous evaluation', de: 'Kontinuierliche Evaluierung' },
        { en: 'Are live responses still good and safe?', de: 'Sind Live-Antworten weiterhin gut und sicher?' },
        { en: 'Evaluators on completed responses, capped per hour', de: 'Evaluatoren auf abgeschlossenen Antworten, pro Stunde begrenzt' },
      ],
      [
        { en: 'Evaluation run', de: 'Evaluierungslauf' },
        { en: 'Is version N better than the baseline before release?', de: 'Ist Version N vor dem Release besser als die Baseline?' },
        { en: 'Test dataset + evaluators, also in GitHub Actions', de: 'Test-Dataset + Evaluatoren, auch in GitHub Actions' },
      ],
      [
        { en: 'Cluster analysis / Insights (preview)', de: 'Cluster-Analyse / Insights (Preview)' },
        { en: 'Which failure patterns keep recurring, and why?', de: 'Welche Fehlermuster wiederholen sich, und warum?' },
        { en: 'Evaluation results / production traces', de: 'Evaluierungsergebnisse / Produktions-Traces' },
      ],
    ],
  },
  code: [
    {
      title: { en: 'Create a prompt agent version and chat in a conversation', de: 'Prompt-Agent-Version anlegen und in einer Conversation chatten' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient
from azure.ai.projects.models import PromptAgentDefinition

project = AIProjectClient(
    endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
    credential=DefaultAzureCredential(),
)

agent = project.agents.create_version(          # each call = new immutable version
    agent_name="support-agent",
    definition=PromptAgentDefinition(
        model="gpt-4.1",                         # your deployment name
        instructions=(
            "You are Fabrikam's support agent. Answer order questions politely. "
            "Never promise refunds. Ask for the order number if it is missing."
        ),
        temperature=0.3,
    ),
)
print(agent.name, agent.version)

openai = project.get_openai_client(agent_name=agent.name)
conversation = openai.conversations.create()      # server-side history
openai.responses.create(conversation=conversation.id, input="Where is my order?")
reply = openai.responses.create(conversation=conversation.id, input="It is FAB-1042.")
print(reply.output_text)`,
      notes: [
        { en: '`create_version()` never edits an existing version; it adds the next one.', de: '`create_version()` ändert nie eine bestehende Version, sondern fügt die nächste hinzu.' },
        { en: '`instructions` carry the agent’s role, goals and boundaries for every turn.', de: '`instructions` tragen Rolle, Ziele und Grenzen des Agents in jede Runde.' },
        { en: 'Reusing `conversation.id` lets the second turn refer to the first.', de: 'Durch die wiederverwendete `conversation.id` kann sich die zweite Runde auf die erste beziehen.' },
      ],
    },
    {
      title: { en: 'Client-side tracing to Application Insights', de: 'Clientseitiges Tracing nach Application Insights' },
      code: `import os
os.environ["AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING"] = "true"   # opt in first

from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.monitor.opentelemetry import configure_azure_monitor

project = AIProjectClient(
    endpoint=os.environ["FOUNDRY_PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential(),
)
configure_azure_monitor(
    connection_string=project.telemetry.get_application_insights_connection_string()
)

openai = project.get_openai_client(agent_name="support-agent")
response = openai.responses.create(input="Status of order FAB-1042?")
print(response.output_text, response.usage.total_tokens)`,
      notes: [
        { en: 'Install `azure-ai-projects opentelemetry-sdk azure-core-tracing-opentelemetry azure-monitor-opentelemetry`.', de: 'Installiere `azure-ai-projects opentelemetry-sdk azure-core-tracing-opentelemetry azure-monitor-opentelemetry`.' },
        { en: 'Message content is recorded only if `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` is `true` — keep that for development.', de: 'Nachrichteninhalte werden nur aufgezeichnet, wenn `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` auf `true` steht – das gehört in die Entwicklung.' },
        { en: 'Spans appear in the Traces view after a few minutes.', de: 'Die Spans erscheinen nach einigen Minuten in der Traces-Ansicht.' },
      ],
    },
  ],
  traps: [
    {
      en: 'Unsaved playground edits are not a version: to compare versions, keep conversation history, monitor or run full evaluations, save first.',
      de: 'Ungespeicherte Änderungen im Playground sind keine Version: Um Versionen zu vergleichen, Verlauf zu behalten, zu überwachen oder vollständig zu evaluieren, musst du zuerst speichern.',
    },
    {
      en: 'The default routing **Always use latest** serves a newly saved version immediately — even in Teams. Pin the `version_selector` in production; splitting traffic between versions isn’t supported.',
      de: 'Das Standard-Routing **Always use latest** liefert eine neu gespeicherte Version sofort aus – auch in Teams. Lege den `version_selector` in der Produktion fest; Traffic auf mehrere Versionen aufzuteilen wird nicht unterstützt.',
    },
    {
      en: 'A new agent identity has no permissions. Tool calls that worked during development fail with authorization errors until you assign roles to the agent identity itself.',
      de: 'Eine neue Agent-Identität hat keine Berechtigungen. Tool-Aufrufe, die in der Entwicklung funktionierten, scheitern mit Autorisierungsfehlern, bis du der Agent-Identität selbst Rollen zuweist.',
    },
    {
      en: 'No traces? Connect Application Insights to the project first and give viewers **Log Analytics Reader** (plus **Privileged Monitoring Data Reader** for protected tables).',
      de: 'Keine Traces? Verbinde zuerst Application Insights mit dem Projekt und gib Betrachtern **Log Analytics Reader** (plus **Privileged Monitoring Data Reader** für geschützte Tabellen).',
    },
    {
      en: 'The training module still lists YAML workflow agents, but declarative workflows in Foundry retire on December 1, 2026 — use Microsoft Agent Framework for new orchestration.',
      de: 'Das Trainingsmodul nennt noch YAML-Workflow-Agents, aber deklarative Workflows in Foundry werden am 1. Dezember 2026 eingestellt – nutze Microsoft Agent Framework für neue Orchestrierung.',
    },
  ],
  takeaways: [
    { en: 'Prompt agent = configuration; hosted agent = your code in a Foundry-managed container.', de: 'Prompt Agent = Konfiguration; Hosted Agent = dein Code in einem von Foundry verwalteten Container.' },
    { en: 'Every change is a new immutable version — pin the endpoint to the version you trust.', de: 'Jede Änderung ist eine neue, unveränderliche Version – binde den Endpoint an die Version, der du vertraust.' },
    { en: 'Keep multi-turn context with conversations; use `store=False` when nothing may be persisted.', de: 'Halte Kontext über Runden mit Conversations; nutze `store=False`, wenn nichts gespeichert werden darf.' },
    { en: 'Traces explain one request; the Monitor tab and continuous evaluation watch the whole agent.', de: 'Traces erklären eine Anfrage; Monitor-Tab und kontinuierliche Evaluierung beobachten den ganzen Agent.' },
    { en: 'Gate releases with evaluations in CI (`microsoft/ai-agent-evals`) before you move the version selector.', de: 'Sichere Releases mit Evaluierungen in der CI (`microsoft/ai-agent-evals`) ab, bevor du den Version Selector umstellst.' },
  ],
  sources: [
    { title: 'Agents in Microsoft Foundry', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/overview' },
    { title: 'Create a prompt agent with Microsoft Foundry Toolkit for Visual Studio Code', url: 'https://learn.microsoft.com/en-us/azure/foundry/how-to/develop/create-prompt-agent-visual-studio-code' },
    { title: 'Configure and share your agent', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/configure-agent' },
    { title: 'Set up tracing in Microsoft Foundry', url: 'https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/trace-agent-setup' },
    { title: 'Monitor agents with the Agent Monitoring Dashboard', url: 'https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/how-to-monitor-agents-dashboard' },
  ],
}
