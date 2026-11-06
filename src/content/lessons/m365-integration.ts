import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'm365-integration',
  summary: {
    en: 'Building an agent in Foundry is half the job — people should be able to use it where they already work. Every new Foundry agent gets a **stable endpoint** and its own **Microsoft Entra agent identity** the moment you create it; **publishing** now means distributing that endpoint to **Microsoft 365 Copilot and Teams**. The quickest path is **Publish** › **Teams and Microsoft Copilot** in the Foundry portal: Foundry builds the Teams app package, handles the bot registration and lets you choose who can use the agent. For custom SSO, middleware or multi-environment pipelines you build a proxy app with the **Microsoft 365 Agents Toolkit** instead. To give the agent workplace context — mail, meetings, files, chats — you add **Work IQ**, which always acts with the signed-in user’s own permissions.',
    de: 'Einen Agent in Foundry zu bauen ist nur die halbe Arbeit – Menschen sollen ihn dort nutzen können, wo sie ohnehin arbeiten. Jeder neue Foundry-Agent bekommt beim Anlegen einen **stabilen Endpoint** und eine eigene **Microsoft-Entra-Agent-Identität**; **Veröffentlichen** heißt heute, diesen Endpoint an **Microsoft 365 Copilot und Teams** zu verteilen. Am schnellsten geht das im Foundry-Portal über **Publish** › **Teams and Microsoft Copilot**: Foundry baut das Teams-App-Paket, übernimmt die Bot-Registrierung und lässt dich wählen, wer den Agent nutzen darf. Für eigenes SSO, Middleware oder Pipelines über mehrere Umgebungen baust du stattdessen eine Proxy-App mit dem **Microsoft 365 Agents Toolkit**. Arbeitskontext – Mails, Meetings, Dateien, Chats – bekommt der Agent über **Work IQ**, das immer mit den eigenen Berechtigungen des angemeldeten Nutzers arbeitet.',
  },
  examFocus: {
    en: 'Expect questions on choosing the publishing path (direct publish, Download & customize, Agents Toolkit) and the scope (**Just you** vs **People in your organization** with admin approval), on what publishing configures (Activity protocol, `BotServiceRbac` / `BotServiceTenant`), on rolling out versions with the version selector, on fixing “works in the playground, fails in Teams” with RBAC for the agent identity, and on setting up Work IQ with delegated `WorkIQAgent.Ask`, admin consent and an OAuth connection.',
    de: 'Rechne mit Fragen zur Wahl des Veröffentlichungswegs (Direct publish, Download & customize, Agents Toolkit) und des Scopes (**Just you** vs. **People in your organization** mit Admin-Freigabe), dazu, was das Veröffentlichen konfiguriert (Activity-Protokoll, `BotServiceRbac` / `BotServiceTenant`), zum Ausrollen von Versionen über den Version Selector, zur Lösung von „läuft im Playground, scheitert in Teams“ über RBAC für die Agent-Identität und zum Einrichten von Work IQ mit delegiertem `WorkIQAgent.Ask`, Admin-Consent und einer OAuth-Verbindung.',
  },
  diagrams: [
    {
      id: 'm365-publish',
      title: { en: 'From Foundry agent to Teams and Microsoft 365 Copilot', de: 'Vom Foundry-Agent zu Teams und Microsoft 365 Copilot' },
      caption: {
        en: 'Publishing distributes the agent’s stable endpoint as a Teams app package; Work IQ brings the user’s Microsoft 365 work context back into the agent.',
        de: 'Veröffentlichen verteilt den stabilen Endpoint des Agents als Teams-App-Paket; Work IQ holt den Microsoft-365-Arbeitskontext des Nutzers zurück in den Agent.',
      },
      width: 960,
      height: 450,
      groups: [
        { id: 'g-proj', x: 10, y: 20, w: 300, h: 414, label: 'Foundry project', tone: 'foundry' },
        { id: 'g-m365', x: 610, y: 20, w: 340, h: 414, label: 'Microsoft 365', tone: 'external' },
      ],
      nodes: [
        { id: 'ver', x: 40, y: 50, w: 240, h: 56, label: { en: 'Agent versions', de: 'Agent-Versionen' }, sub: 'v1 · v2 · v3', tone: 'foundry' },
        { id: 'agent', x: 40, y: 148, w: 240, h: 72, label: { en: 'Agent endpoint', de: 'Agent-Endpoint' }, sub: { en: 'stable URL · own identity', de: 'stabile URL · eigene Identität' }, tone: 'foundry' },
        { id: 'wiqtool', x: 40, y: 340, w: 240, h: 72, label: { en: 'Work IQ MCP tool', de: 'Work-IQ-MCP-Tool' }, sub: 'OAuth · WorkIQAgent.Ask', tone: 'tool' },
        { id: 'pkg', x: 370, y: 148, w: 180, h: 72, label: { en: 'App package (.zip)', de: 'App-Paket (.zip)' }, sub: { en: 'manifest.json · icons', de: 'manifest.json · Icons' }, tone: 'neutral', shape: 'doc' },
        { id: 'copilot', x: 640, y: 60, w: 280, h: 56, label: 'Microsoft 365 Copilot', sub: { en: 'agent store', de: 'Agent Store' }, tone: 'external' },
        { id: 'teams', x: 640, y: 156, w: 280, h: 56, label: 'Microsoft Teams', sub: { en: 'chat with the agent', de: 'Chat mit dem Agent' }, tone: 'external' },
        { id: 'admin', x: 640, y: 252, w: 280, h: 56, label: { en: 'M365 admin center', de: 'M365 Admin Center' }, sub: { en: 'approves org-wide scope', de: 'genehmigt den Org-Scope' }, tone: 'safety' },
        { id: 'workiq', x: 640, y: 348, w: 280, h: 56, label: 'Work IQ', sub: { en: 'mail · meetings · files · chats', de: 'Mail · Meetings · Dateien · Chats' }, tone: 'data' },
      ],
      edges: [
        { id: 'e-ver', from: 'ver', to: 'agent', label: { en: 'active version', de: 'aktive Version' } },
        { id: 'e-publish', from: 'agent', to: 'pkg', label: 'Publish' },
        { id: 'e-copilot', from: 'pkg', to: 'copilot' },
        { id: 'e-teams', from: 'pkg', to: 'teams' },
        { id: 'e-admin', from: 'pkg', to: 'admin', label: { en: 'org scope', de: 'Org-Scope' }, dashed: true },
        { id: 'e-tool', from: 'agent', to: 'wiqtool', label: { en: 'tool call', de: 'Tool-Aufruf' } },
        { id: 'e-workiq', from: 'wiqtool', to: 'workiq', label: { en: 'delegated user', de: 'delegierter Nutzer' }, bidir: true },
      ],
      steps: [
        {
          title: { en: 'Endpoint from day one', de: 'Endpoint ab dem ersten Tag' },
          text: {
            en: 'Every new agent has a stable endpoint and its own Microsoft Entra agent identity from the moment you create it. The version selector decides which version that endpoint serves — **Always use latest** by default, or a pinned version.',
            de: 'Jeder neue Agent hat ab dem Anlegen einen stabilen Endpoint und eine eigene Microsoft-Entra-Agent-Identität. Der Version Selector bestimmt, welche Version dieser Endpoint ausliefert – standardmäßig **Always use latest** oder eine fest gepinnte Version.',
          },
          focus: ['ver', 'e-ver', 'agent'],
        },
        {
          title: { en: 'Publish', de: 'Veröffentlichen' },
          text: {
            en: 'Select **Publish** › **Teams and Microsoft Copilot** and enter name, version, descriptions and developer. Foundry validates them, compiles a Teams app manifest package, handles the bot registration and enables the Activity protocol plus a Bot Service authorization scheme.',
            de: 'Wähle **Publish** › **Teams and Microsoft Copilot** und gib Name, Version, Beschreibungen und Entwickler an. Foundry prüft die Angaben, erzeugt ein Teams-App-Manifest-Paket, übernimmt die Bot-Registrierung und aktiviert das Activity-Protokoll plus ein Bot-Service-Autorisierungsschema.',
          },
          focus: ['agent', 'e-publish', 'pkg'],
        },
        {
          title: { en: 'Meet users where they work', de: 'Nutzer dort abholen, wo sie arbeiten' },
          text: {
            en: 'Foundry submits the package to the Microsoft 365 Copilot and Teams agent catalogs. Both surfaces call the same stable endpoint, so a new active version reaches them without republishing.',
            de: 'Foundry reicht das Paket bei den Agent-Katalogen von Microsoft 365 Copilot und Teams ein. Beide Oberflächen rufen denselben stabilen Endpoint auf – eine neue aktive Version erreicht sie also ohne erneutes Veröffentlichen.',
          },
          focus: ['pkg', 'e-copilot', 'e-teams', 'copilot', 'teams'],
        },
        {
          title: { en: 'Org-wide needs approval', de: 'Org-weit braucht Freigabe' },
          text: {
            en: '**Just you** is available immediately under **Your agents**. **People in your organization** sends a request to the Microsoft 365 admin center; after an admin approves it, the agent appears for the whole tenant under **Built by your org**.',
            de: '**Just you** ist sofort unter **Your agents** verfügbar. **People in your organization** schickt eine Anfrage ins Microsoft 365 Admin Center; nach der Freigabe durch einen Admin erscheint der Agent für den ganzen Tenant unter **Built by your org**.',
          },
          focus: ['e-admin', 'admin'],
        },
        {
          title: { en: 'Work context with Work IQ', de: 'Arbeitskontext mit Work IQ' },
          text: {
            en: 'With the Work IQ MCP tool, the agent grounds answers in the signed-in user’s mail, meetings, files and chats. Requests run with delegated permissions, so Microsoft 365 permissions and sensitivity labels are honored.',
            de: 'Mit dem Work-IQ-MCP-Tool stützt der Agent seine Antworten auf Mails, Meetings, Dateien und Chats des angemeldeten Nutzers. Die Anfragen laufen mit delegierten Berechtigungen – Microsoft-365-Berechtigungen und Vertraulichkeitslabels gelten also weiter.',
          },
          focus: ['e-tool', 'wiqtool', 'e-workiq', 'workiq'],
        },
      ],
    },
    {
      id: 'm365-scope',
      title: { en: 'The publish scope decides who sees — and who can call — the agent', de: 'Der Publish-Scope bestimmt, wer den Agent sieht – und aufrufen darf' },
      caption: {
        en: 'Visibility comes from the scope; Foundry sets the matching Bot Service authorization scheme that decides who may call the endpoint.',
        de: 'Die Sichtbarkeit ergibt sich aus dem Scope; Foundry setzt das passende Bot-Service-Autorisierungsschema, das bestimmt, wer den Endpoint aufrufen darf.',
      },
      width: 960,
      height: 260,
      nodes: [
        { id: 's-just', x: 20, y: 40, w: 190, h: 64, label: { en: 'Just you', de: 'Just you (nur du)' }, sub: 'publishScope: Shared', tone: 'user' },
        { id: 's-rbac', x: 510, y: 40, w: 200, h: 64, label: 'BotServiceRbac', sub: { en: 'caller needs Azure RBAC', de: 'Aufrufer braucht Azure-RBAC' }, tone: 'safety' },
        { id: 's-yours', x: 760, y: 40, w: 180, h: 64, label: 'Your agents', sub: { en: 'share via link', de: 'per Link teilen' }, tone: 'external' },
        { id: 's-org', x: 20, y: 150, w: 190, h: 64, label: { en: 'People in your org', de: 'People in your org' }, sub: 'publishScope: Tenant', tone: 'user' },
        { id: 's-approve', x: 260, y: 150, w: 200, h: 64, label: { en: 'Admin approval', de: 'Admin-Freigabe' }, sub: 'Microsoft 365 admin center', tone: 'safety' },
        { id: 's-tenant', x: 510, y: 150, w: 200, h: 64, label: 'BotServiceTenant', sub: { en: 'any user in your tenant', de: 'jeder Nutzer im Tenant' }, tone: 'safety' },
        { id: 's-built', x: 760, y: 150, w: 180, h: 64, label: 'Built by your org', sub: { en: 'whole tenant', de: 'ganzer Tenant' }, tone: 'external' },
      ],
      edges: [
        { id: 'r-just', from: 's-just', to: 's-rbac', label: { en: 'no approval', de: 'ohne Freigabe' } },
        { id: 'r-yours', from: 's-rbac', to: 's-yours' },
        { id: 'r-org', from: 's-org', to: 's-approve' },
        { id: 'r-tenant', from: 's-approve', to: 's-tenant' },
        { id: 'r-built', from: 's-tenant', to: 's-built' },
      ],
      steps: [
        {
          title: { en: 'Just you', de: 'Just you' },
          text: {
            en: 'No admin approval: the agent is available at once under **Your agents** and you share it by sending its link. Foundry sets `BotServiceRbac`, so callers need the required Azure permissions on the agent — for example, colleagues in a Teams chat with Foundry access to the project.',
            de: 'Keine Admin-Freigabe: Der Agent ist sofort unter **Your agents** verfügbar, und du teilst ihn per Link. Foundry setzt `BotServiceRbac` – Aufrufer brauchen also die nötigen Azure-Berechtigungen auf dem Agent, etwa Kolleginnen in einem Teams-Chat mit Foundry-Zugriff aufs Projekt.',
          },
          focus: ['s-just', 'r-just', 's-rbac', 'r-yours', 's-yours'],
        },
        {
          title: { en: 'People in your organization', de: 'People in your organization' },
          text: {
            en: 'The agent is submitted as a request. A Microsoft 365 admin reviews it in the Microsoft 365 admin center (**Agents** › **All** › **Requested**) and approves it; tenant app policies still control who may use it.',
            de: 'Der Agent wird als Anfrage eingereicht. Ein Microsoft-365-Admin prüft sie im Microsoft 365 Admin Center (**Agents** › **All** › **Requested**) und gibt sie frei; App-Richtlinien des Tenants steuern weiterhin, wer ihn nutzen darf.',
          },
          focus: ['s-org', 'r-org', 's-approve'],
        },
        {
          title: { en: 'Tenant-wide access', de: 'Zugriff im ganzen Tenant' },
          text: {
            en: 'After approval, Foundry’s `BotServiceTenant` scheme lets any signed-in user in your tenant call the agent, and it appears under **Built by your org**. Callers must belong to the project’s tenant — guest users can’t interact with the agent.',
            de: 'Nach der Freigabe erlaubt das Schema `BotServiceTenant` jedem angemeldeten Nutzer deines Tenants den Aufruf, und der Agent erscheint unter **Built by your org**. Aufrufer müssen zum Tenant des Projekts gehören – Gastnutzer können nicht mit dem Agent interagieren.',
          },
          focus: ['r-tenant', 's-tenant', 'r-built', 's-built'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Agent endpoint and agent identity',
      text: {
        en: 'Every new Foundry agent gets a stable endpoint and a unique Microsoft Entra agent identity at creation. Microsoft 365 Copilot, Teams and your own apps (for example over the Responses protocol) all call that same endpoint, and downstream resources such as Azure AI Search need RBAC roles for that identity. The older model, which created a separate **Agent Application** resource at publish time, is legacy.',
        de: 'Jeder neue Foundry-Agent bekommt beim Anlegen einen stabilen Endpoint und eine eigene Microsoft-Entra-Agent-Identität. Microsoft 365 Copilot, Teams und deine eigenen Apps (etwa über das Responses-Protokoll) rufen alle denselben Endpoint auf, und nachgelagerte Ressourcen wie Azure AI Search brauchen RBAC-Rollen für diese Identität. Das ältere Modell, das beim Veröffentlichen eine separate **Agent Application**-Ressource erzeugte, gilt als Legacy.',
      },
    },
    {
      term: 'Version selector',
      text: {
        en: 'Decides which agent version the endpoint serves: **Always use latest** (default — every new version goes live at once, also in Teams and Microsoft 365 Copilot) or a pinned active version. Only one version receives traffic at a time; there’s no traffic splitting.',
        de: 'Bestimmt, welche Agent-Version der Endpoint ausliefert: **Always use latest** (Standard – jede neue Version ist sofort live, auch in Teams und Microsoft 365 Copilot) oder eine gepinnte aktive Version. Es bekommt immer nur eine Version Traffic; Traffic-Splitting gibt es nicht.',
      },
    },
    {
      term: 'Publish to Microsoft 365 Copilot and Teams',
      text: {
        en: 'Foundry validates your metadata, compiles a Teams app manifest package (`manifest.json` plus color and outline icons), submits it to the agent catalogs, enables the `activity` protocol and sets `BotServiceRbac` or `BotServiceTenant`. **Download & customize** gives you the validated ZIP instead, to adjust metadata and upload it in Teams yourself. From then on, Microsoft 365 and Teams process and store agent metadata and responses under Microsoft 365 terms.',
        de: 'Foundry prüft deine Metadaten, erzeugt ein Teams-App-Manifest-Paket (`manifest.json` plus Farb- und Outline-Icon), reicht es bei den Agent-Katalogen ein, aktiviert das `activity`-Protokoll und setzt `BotServiceRbac` oder `BotServiceTenant`. **Download & customize** liefert dir stattdessen das geprüfte ZIP, um Metadaten anzupassen und es selbst in Teams hochzuladen. Ab dann verarbeiten und speichern Microsoft 365 und Teams Agent-Metadaten und Antworten nach Microsoft-365-Bedingungen.',
      },
    },
    {
      term: 'Publish scope',
      text: {
        en: '**Just you** (REST `Shared`): no approval, listed under **Your agents**, shared by link, callers need Azure permissions (`BotServiceRbac`). **People in your organization** (REST `Tenant`): Microsoft 365 admin approval, then listed under **Built by your org** for everyone in the tenant (`BotServiceTenant`).',
        de: '**Just you** (REST `Shared`): keine Freigabe, gelistet unter **Your agents**, Teilen per Link, Aufrufer brauchen Azure-Berechtigungen (`BotServiceRbac`). **People in your organization** (REST `Tenant`): Freigabe durch einen Microsoft-365-Admin, danach unter **Built by your org** für alle im Tenant (`BotServiceTenant`).',
      },
    },
    {
      term: 'Microsoft 365 Agents Toolkit',
      text: {
        en: 'Extension for Visual Studio Code and Visual Studio. For Foundry agents you build a proxy (custom engine agent) app that sits between Microsoft 365 and your agent — the choice for custom SSO, middleware, multi-environment deployment and CI/CD. Test locally in the **Microsoft 365 Agents Playground**, which simulates Teams.',
        de: 'Erweiterung für Visual Studio Code und Visual Studio. Für Foundry-Agents baust du damit eine Proxy-App (Custom Engine Agent) zwischen Microsoft 365 und deinem Agent – die Wahl für eigenes SSO, Middleware, mehrere Umgebungen und CI/CD. Lokal testest du im **Microsoft 365 Agents Playground**, der Teams simuliert.',
      },
    },
    {
      term: 'Work IQ',
      text: {
        en: 'The workplace intelligence layer over Microsoft 365 — mail, meetings, OneDrive and SharePoint files, Teams messages, people — reachable through A2A, MCP and REST. It always acts as the signed-in user (delegated; app-only isn’t supported), so Microsoft 365 permissions, sensitivity labels and policies apply. Usage is billed with Copilot Credits, and calls may be processed outside the Azure compliance boundary.',
        de: 'Die Workplace-Intelligence-Schicht über Microsoft 365 – Mails, Meetings, Dateien in OneDrive und SharePoint, Teams-Nachrichten, Personen –, erreichbar über A2A, MCP und REST. Sie handelt immer als angemeldeter Nutzer (delegiert; App-only wird nicht unterstützt), daher gelten Microsoft-365-Berechtigungen, Vertraulichkeitslabels und Richtlinien. Abgerechnet wird über Copilot Credits, und Aufrufe können außerhalb der Azure-Compliance-Grenze verarbeitet werden.',
      },
    },
    {
      term: 'Test and iterate',
      text: {
        en: 'The playground doesn’t show the published experience. Test in Teams and Microsoft 365 Copilot across clients with several users, including one without access to restricted content. Tools that fail only after publishing point to missing roles for the agent identity; users who can’t find the agent point to scope, pending approval or tenant app policies. Then fix, create a new version and roll it out.',
        de: 'Der Playground zeigt nicht das veröffentlichte Erlebnis. Teste in Teams und Microsoft 365 Copilot über mehrere Clients mit verschiedenen Nutzern, auch mit einem ohne Zugriff auf geschützte Inhalte. Tools, die erst nach dem Veröffentlichen scheitern, deuten auf fehlende Rollen der Agent-Identität; Nutzer, die den Agent nicht finden, auf Scope, ausstehende Freigabe oder App-Richtlinien des Tenants. Dann korrigieren, neue Version erstellen und ausrollen.',
      },
    },
  ],
  comparison: {
    title: { en: 'Foundry portal publish or Microsoft 365 Agents Toolkit?', de: 'Veröffentlichen im Foundry-Portal oder Microsoft 365 Agents Toolkit?' },
    columns: [
      { en: 'Aspect', de: 'Aspekt' },
      { en: 'Publish from the Foundry portal', de: 'Veröffentlichen im Foundry-Portal' },
      { en: 'Microsoft 365 Agents Toolkit', de: 'Microsoft 365 Agents Toolkit' },
    ],
    rows: [
      [{ en: 'Tooling', de: 'Werkzeug' }, 'Foundry portal', 'Visual Studio Code / Visual Studio'],
      [{ en: 'Code you write', de: 'Eigener Code' }, { en: 'None', de: 'Keiner' }, { en: 'A proxy app (custom engine agent)', de: 'Eine Proxy-App (Custom Engine Agent)' }],
      [
        { en: 'Bot and package', de: 'Bot und Paket' },
        { en: 'Foundry handles the bot registration and builds the app package', de: 'Foundry übernimmt die Bot-Registrierung und baut das App-Paket' },
        { en: 'You build, provision and deploy the proxy app', de: 'Du baust, provisionierst und deployst die Proxy-App' },
      ],
      [
        { en: 'Best for', de: 'Ideal für' },
        { en: 'Fast rollout with minimal setup', de: 'Schnelles Ausrollen mit minimalem Setup' },
        { en: 'Custom SSO, middleware, multi-environment deployment, CI/CD', de: 'Eigenes SSO, Middleware, mehrere Umgebungen, CI/CD' },
      ],
      [
        { en: 'Testing', de: 'Testen' },
        { en: 'Foundry playground, then Teams and Microsoft 365 Copilot', de: 'Foundry-Playground, dann Teams und Microsoft 365 Copilot' },
        { en: 'Microsoft 365 Agents Playground plus full IDE debugging', de: 'Microsoft 365 Agents Playground plus volles IDE-Debugging' },
      ],
    ],
  },
  code: [
    {
      title: { en: 'Pin the version that Teams and Microsoft 365 Copilot users get', de: 'Die Version pinnen, die Nutzer in Teams und Microsoft 365 Copilot bekommen' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient
from azure.ai.projects.models import (
    AgentEndpointConfig,
    FixedRatioVersionSelectionRule,
    VersionSelector,
)

project = AIProjectClient(
    endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
    credential=DefaultAzureCredential(),
)
# Serve version 2 until you deliberately switch; newer versions get no traffic yet
project.agents.update_details(
    agent_name="helpdesk-agent",
    agent_endpoint=AgentEndpointConfig(
        version_selector=VersionSelector(version_selection_rules=[
            FixedRatioVersionSelectionRule(agent_version="2", traffic_percentage=100),
        ]),
    ),
)`,
      notes: [
        {
          en: 'The endpoint URL never changes, so pointing the selector at a new version rolls it out to Teams and Microsoft 365 Copilot without republishing.',
          de: 'Die Endpoint-URL ändert sich nie – zeigt der Selector auf eine neue Version, erreicht sie Teams und Microsoft 365 Copilot ohne erneutes Veröffentlichen.',
        },
        {
          en: 'These endpoint settings use preview SDK features; in the portal you set the same thing under **Details** › **Active version**.',
          de: 'Diese Endpoint-Einstellungen nutzen Preview-Features des SDK; im Portal setzt du dasselbe unter **Details** › **Active version**.',
        },
      ],
    },
    {
      title: { en: 'Add Work IQ to an agent through the MCP tool', de: 'Work IQ über das MCP-Tool an einen Agent hängen' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient
from azure.ai.projects.models import PromptAgentDefinition, MCPTool

project = AIProjectClient(
    endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
    credential=DefaultAzureCredential(),
)
work_iq = MCPTool(
    server_label="work-iq",
    server_url="https://workiq.svc.cloud.microsoft/mcp",
    require_approval="always",
    project_connection_id="work-iq-oauth",   # OAuth connection, delegated WorkIQAgent.Ask
)
agent = project.agents.create_version(
    agent_name="helpdesk-agent",
    definition=PromptAgentDefinition(
        model="gpt-5-mini",
        instructions=(
            "Use Work IQ for questions about the user's mail, meetings and files. "
            "If nothing relevant is found, say so instead of guessing."
        ),
        tools=[work_iq],
    ),
)`,
      notes: [
        {
          en: 'This is the generally available MCP path; the built-in `WorkIQPreviewTool` (A2A) is still in preview.',
          de: 'Das ist der allgemein verfügbare MCP-Weg; das eingebaute `WorkIQPreviewTool` (A2A) ist noch Preview.',
        },
        {
          en: 'On first use, Foundry may ask the user to sign in and consent; answers depend on that user’s Microsoft 365 permissions.',
          de: 'Beim ersten Aufruf fragt Foundry den Nutzer eventuell nach Anmeldung und Zustimmung; die Antworten hängen von seinen Microsoft-365-Berechtigungen ab.',
        },
      ],
    },
  ],
  traps: [
    {
      en: 'With the default **Always use latest**, every new agent version goes live in Teams and Microsoft 365 Copilot immediately — pin a version for production and switch deliberately.',
      de: 'Mit dem Standard **Always use latest** geht jede neue Agent-Version sofort in Teams und Microsoft 365 Copilot live – pinne für Produktion eine Version und wechsle bewusst.',
    },
    {
      en: '**People in your organization** isn’t live until a Microsoft 365 admin approves the request in the Microsoft 365 admin center; until then nobody finds it under **Built by your org**.',
      de: '**People in your organization** ist erst live, wenn ein Microsoft-365-Admin die Anfrage im Microsoft 365 Admin Center freigibt; bis dahin findet ihn niemand unter **Built by your org**.',
    },
    {
      en: '“Works in the playground, fails in Teams” usually means the agent’s identity lacks RBAC on a downstream resource — assign the roles to the agent identity, not to your developer account.',
      de: '„Läuft im Playground, scheitert in Teams“ heißt meist: Der Agent-Identität fehlt RBAC auf einer nachgelagerten Ressource – weise die Rollen der Agent-Identität zu, nicht deinem Entwicklerkonto.',
    },
    {
      en: 'Work IQ never runs app-only: it acts as the signed-in user, and admin consent for `WorkIQAgent.Ask` doesn’t widen what that user can see.',
      de: 'Work IQ läuft nie App-only: Es handelt als angemeldeter Nutzer, und Admin-Consent für `WorkIQAgent.Ask` erweitert nicht, was dieser Nutzer sehen darf.',
    },
    {
      en: 'Published agents don’t support streaming responses or citations, and file uploads and image generation work in Teams but not in Microsoft 365 Copilot.',
      de: 'Veröffentlichte Agents unterstützen kein Streaming und keine Zitate; Datei-Uploads und Bildgenerierung funktionieren in Teams, aber nicht in Microsoft 365 Copilot.',
    },
  ],
  takeaways: [
    { en: 'Default path: **Publish** › **Teams and Microsoft Copilot** in the Foundry portal; use the Agents Toolkit only for custom SSO, middleware or multi-environment pipelines.', de: 'Standardweg: **Publish** › **Teams and Microsoft Copilot** im Foundry-Portal; das Agents Toolkit nur für eigenes SSO, Middleware oder Pipelines über mehrere Umgebungen.' },
    { en: '**Just you** = instant, no approval; **People in your organization** = admin approval, then **Built by your org**.', de: '**Just you** = sofort, ohne Freigabe; **People in your organization** = Admin-Freigabe, dann **Built by your org**.' },
    { en: 'Roll out new behavior with the version selector; republish only to change store metadata (with a new app version).', de: 'Neues Verhalten rollst du über den Version Selector aus; neu veröffentlichen nur, um Store-Metadaten zu ändern (mit neuer App-Version).' },
    { en: 'Work IQ = delegated Microsoft 365 work context: admin consent, an OAuth connection (**Foundry Project Manager**) and **Foundry User** for callers.', de: 'Work IQ = delegierter Microsoft-365-Arbeitskontext: Admin-Consent, eine OAuth-Verbindung (**Foundry Project Manager**) und **Foundry User** für die Aufrufer.' },
    { en: 'Test in Teams and Microsoft 365 Copilot with several users and accounts before a wide rollout.', de: 'Teste in Teams und Microsoft 365 Copilot mit mehreren Nutzern und Konten, bevor du breit ausrollst.' },
  ],
  sources: [
    { title: 'Publish agents to Microsoft Copilot and Microsoft Teams in the Foundry portal', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot' },
    { title: 'Publish agents to Microsoft Copilot and Microsoft Teams by using the REST API', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot-virtual-network' },
    { title: 'Configure and share your agent', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/configure-agent' },
    { title: 'Connect agents to Microsoft 365 with Work IQ (preview)', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/work-iq' },
    { title: 'Custom engine agents for Microsoft 365 overview', url: 'https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/overview-custom-engine-agent' },
  ],
}
