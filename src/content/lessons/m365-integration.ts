import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'm365-integration',
  summary: {
    en: 'Building an agent in Foundry is half the job — people should be able to use it where they already work. Every new Foundry agent gets a **stable endpoint** and its own **Microsoft Entra agent identity** the moment you create it; **publishing** now means distributing that endpoint to **Microsoft 365 Copilot and Teams**. The quickest path is **Publish** › **Teams and Microsoft Copilot** in the Foundry portal: Foundry builds the Teams app package, handles the bot registration and lets you choose who can use the agent. For custom SSO, middleware or multi-environment pipelines you build a proxy app with the **Microsoft 365 Agents Toolkit** instead. To give the agent workplace context — mail, meetings, files, chats — you add **Work IQ**, which always acts with the signed-in user’s own permissions.',
    de: 'Einen Agent in Foundry zu bauen ist nur die halbe Arbeit – Menschen sollen ihn dort nutzen können, wo sie ohnehin arbeiten. Jeder neue Foundry-Agent bekommt beim Anlegen einen **stabilen Endpoint** und eine eigene **Microsoft-Entra-Agent-Identität**; **Veröffentlichen** heißt heute, diesen Endpoint an **Microsoft 365 Copilot und Teams** zu verteilen. Am schnellsten geht das im Foundry-Portal über **Publish** › **Teams and Microsoft Copilot**: Foundry baut das Teams-App-Paket, übernimmt die Bot-Registrierung und lässt dich wählen, wer den Agent nutzen darf. Für eigenes SSO, Middleware oder Pipelines über mehrere Umgebungen baust du stattdessen eine Proxy-App mit dem **Microsoft 365 Agents Toolkit**. Arbeitskontext – Mails, Meetings, Dateien, Chats – bekommt der Agent über **Work IQ**, das immer mit den eigenen Berechtigungen des angemeldeten Nutzers arbeitet.',
  },
  examFocus: {
    en: 'Expect questions on choosing the publishing path (direct publish, Download & customize, Agents Toolkit) and the scope (**Just you** vs **People in your organization** with admin approval), on what publishing configures (Activity protocol, `BotServiceRbac` / `BotServiceTenant`), on rolling out versions with the version selector, on fixing “works in the playground, fails in Teams” with roles for the right identity, and on setting up Work IQ with delegated `WorkIQAgent.Ask`, admin consent and an OAuth **project connection** (stored endpoint + credential that tools reference instead of secrets in code).',
    de: 'Rechne mit Fragen zur Wahl des Veröffentlichungswegs (Direct publish, Download & customize, Agents Toolkit) und des Scopes (**Just you** vs. **People in your organization** mit Admin-Freigabe), dazu, was das Veröffentlichen konfiguriert (Activity-Protokoll, `BotServiceRbac` / `BotServiceTenant`), zum Ausrollen von Versionen über den Version Selector, zur Lösung von „läuft im Playground, scheitert in Teams“ über Rollen für die richtige Identität und zum Einrichten von Work IQ mit delegiertem `WorkIQAgent.Ask`, Admin-Consent und einer OAuth-**Projektverbindung** (gespeicherter Endpoint + Anmeldedaten, auf die Tools verweisen, statt Geheimnisse im Code).',
  },
  diagrams: [
    {
      id: 'm365-publish',
      title: { en: 'From Foundry agent to Teams and Microsoft 365 Copilot', de: 'Vom Foundry-Agent zu Teams und Microsoft 365 Copilot' },
      caption: {
        en: 'Publishing distributes the agent’s stable endpoint as a Teams app package. At runtime, Teams and Microsoft 365 Copilot call that same endpoint over the Activity protocol, and Work IQ brings the user’s Microsoft 365 work context into the agent.',
        de: 'Veröffentlichen verteilt den stabilen Endpoint des Agents als Teams-App-Paket. Zur Laufzeit rufen Teams und Microsoft 365 Copilot genau diesen Endpoint über das Activity-Protokoll auf, und Work IQ holt den Microsoft-365-Arbeitskontext des Nutzers in den Agent.',
      },
      width: 960,
      height: 480,
      groups: [
        { id: 'g-proj', x: 10, y: 20, w: 300, h: 440, label: 'Foundry project', tone: 'foundry' },
        { id: 'g-m365', x: 600, y: 20, w: 350, h: 440, label: 'Microsoft 365', tone: 'external' },
        { id: 'g-chan', x: 620, y: 130, w: 310, h: 200, label: { en: 'Channels', de: 'Kanäle' }, tone: 'external' },
      ],
      nodes: [
        { id: 'ver', x: 40, y: 60, w: 240, h: 56, label: { en: 'Agent versions', de: 'Agent-Versionen' }, sub: 'v1 · v2 · v3', tone: 'foundry' },
        { id: 'agent', x: 40, y: 194, w: 240, h: 72, label: { en: 'Agent endpoint', de: 'Agent-Endpoint' }, sub: { en: 'stable URL · own identity', de: 'stabile URL · eigene Identität' }, tone: 'foundry' },
        { id: 'wiqtool', x: 40, y: 380, w: 240, h: 64, label: { en: 'Work IQ MCP tool', de: 'Work-IQ-MCP-Tool' }, sub: 'OAuth · WorkIQAgent.Ask', tone: 'tool' },
        { id: 'pkg', x: 350, y: 52, w: 180, h: 72, label: { en: 'App package (.zip)', de: 'App-Paket (.zip)' }, sub: { en: 'manifest.json · icons', de: 'manifest.json · Icons' }, tone: 'neutral', shape: 'doc' },
        { id: 'admin', x: 630, y: 60, w: 290, h: 56, label: { en: 'M365 admin center', de: 'M365 Admin Center' }, sub: { en: 'approves org-wide scope', de: 'genehmigt den Org-Scope' }, tone: 'safety' },
        { id: 'copilot', x: 640, y: 168, w: 270, h: 56, label: 'Microsoft 365 Copilot', sub: { en: 'agent store', de: 'Agent Store' }, tone: 'external' },
        { id: 'teams', x: 640, y: 248, w: 270, h: 56, label: 'Microsoft Teams', sub: { en: 'chat with the agent', de: 'Chat mit dem Agent' }, tone: 'external' },
        { id: 'workiq', x: 630, y: 384, w: 290, h: 56, label: 'Work IQ', sub: { en: 'mail · meetings · files · chats', de: 'Mail · Meetings · Dateien · Chats' }, tone: 'data' },
      ],
      edges: [
        { id: 'e-ver', from: 'ver', to: 'agent', label: { en: 'active version', de: 'aktive Version' } },
        { id: 'e-publish', from: 'agent', to: 'pkg', label: 'Publish' },
        { id: 'e-admin', from: 'pkg', to: 'admin', label: { en: 'org scope', de: 'Org-Scope' }, dashed: true },
        { id: 'e-store', from: 'pkg', to: 'g-chan' },
        { id: 'e-activity', from: 'g-chan', to: 'agent', label: { en: 'Activity protocol', de: 'Activity-Protokoll' }, dashed: true, bidir: true },
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
            en: 'Select **Publish** › **Teams and Microsoft Copilot** and enter name, publish version, descriptions and developer — the publish version (major.minor.patch) versions the app package, not the agent. Foundry validates the fields, compiles a Teams app manifest package, handles the bot registration and enables the Activity protocol plus a Bot Service authorization scheme.',
            de: 'Wähle **Publish** › **Teams and Microsoft Copilot** und gib Name, Publish-Version, Beschreibungen und Entwickler an – die Publish-Version (major.minor.patch) versioniert das App-Paket, nicht den Agent. Foundry prüft die Felder, erzeugt ein Teams-App-Manifest-Paket, übernimmt die Bot-Registrierung und aktiviert das Activity-Protokoll plus ein Bot-Service-Autorisierungsschema.',
          },
          focus: ['agent', 'e-publish', 'pkg'],
        },
        {
          title: { en: 'Into the catalogs — org-wide needs approval', de: 'In die Kataloge – org-weit braucht Freigabe' },
          text: {
            en: 'Foundry submits the package to the Microsoft 365 Copilot and Teams agent catalogs. **Just you** is available immediately under **Your agents**. **People in your organization** sends a request to the Microsoft 365 admin center; after an admin approves it, the agent appears for the whole tenant under **Built by your org**.',
            de: 'Foundry reicht das Paket bei den Agent-Katalogen von Microsoft 365 Copilot und Teams ein. **Just you** ist sofort unter **Your agents** verfügbar. **People in your organization** schickt eine Anfrage ins Microsoft 365 Admin Center; nach der Freigabe durch einen Admin erscheint der Agent für den ganzen Tenant unter **Built by your org**.',
          },
          focus: ['pkg', 'e-store', 'g-chan', 'e-admin', 'admin'],
        },
        {
          title: { en: 'Meet users where they work', de: 'Nutzer dort abholen, wo sie arbeiten' },
          text: {
            en: 'Users chat with the agent in Teams or Microsoft 365 Copilot. Each message travels as an activity over the Activity protocol to the agent’s stable endpoint; Foundry checks the Bot Service authorization scheme, routes the activity to the active agent version and returns the response through the channel. That’s why a new active version reaches users without republishing.',
            de: 'Nutzer chatten mit dem Agent in Teams oder Microsoft 365 Copilot. Jede Nachricht geht als Activity über das Activity-Protokoll an den stabilen Endpoint des Agents; Foundry prüft das Bot-Service-Autorisierungsschema, leitet die Activity an die aktive Agent-Version weiter und schickt die Antwort über den Kanal zurück. Deshalb erreicht eine neue aktive Version die Nutzer ohne erneutes Veröffentlichen.',
          },
          focus: ['g-chan', 'copilot', 'teams', 'e-activity', 'agent'],
        },
        {
          title: { en: 'Work context with Work IQ', de: 'Arbeitskontext mit Work IQ' },
          text: {
            en: 'With the Work IQ **MCP** tool (Model Context Protocol: standard for exposing tools to agents), the agent grounds answers in the signed-in user’s mail, meetings, files and chats. Requests run with delegated permissions, so Microsoft 365 permissions and sensitivity labels are honored. The one-time setup is in the notes of the second code sample.',
            de: 'Mit dem Work-IQ-**MCP**-Tool (Model Context Protocol: Standard, um Agents Tools bereitzustellen) stützt der Agent seine Antworten auf Mails, Meetings, Dateien und Chats des angemeldeten Nutzers. Die Anfragen laufen mit delegierten Berechtigungen – Microsoft-365-Berechtigungen und Vertraulichkeitslabels gelten also weiter. Die einmalige Einrichtung steht in den Notizen zum zweiten Codebeispiel.',
          },
          focus: ['e-tool', 'wiqtool', 'e-workiq', 'workiq'],
        },
      ],
    },
    {
      id: 'm365-scope',
      title: { en: 'The publish scope decides who sees — and who can call — the agent', de: 'Der Publish-Scope bestimmt, wer den Agent sieht – und aufrufen darf' },
      caption: {
        en: 'At publish time the scope sets two things: the Bot Service authorization scheme (who may call the endpoint) and store visibility (org-wide listing only after admin approval).',
        de: 'Beim Veröffentlichen legt der Scope zweierlei fest: das Bot-Service-Autorisierungsschema (wer den Endpoint aufrufen darf) und die Sichtbarkeit im Store (org-weite Listung erst nach Admin-Freigabe).',
      },
      width: 960,
      height: 260,
      nodes: [
        { id: 's-just', x: 20, y: 40, w: 190, h: 64, label: { en: 'Just you', de: 'Just you (nur du)' }, sub: 'publishScope: Shared', tone: 'user' },
        { id: 's-rbac', x: 260, y: 40, w: 200, h: 64, label: 'BotServiceRbac', sub: { en: 'caller needs Azure RBAC', de: 'Aufrufer braucht Azure-RBAC' }, tone: 'safety' },
        { id: 's-yours', x: 760, y: 40, w: 180, h: 64, label: 'Your agents', sub: { en: 'share via link', de: 'per Link teilen' }, tone: 'external' },
        { id: 's-org', x: 20, y: 150, w: 190, h: 64, label: { en: 'People in your org', de: 'People in your org' }, sub: 'publishScope: Tenant', tone: 'user' },
        { id: 's-tenant', x: 260, y: 150, w: 200, h: 64, label: 'BotServiceTenant', sub: { en: 'any user in your tenant', de: 'jeder Nutzer im Tenant' }, tone: 'safety' },
        { id: 's-approve', x: 510, y: 150, w: 200, h: 64, label: { en: 'Admin approval', de: 'Admin-Freigabe' }, sub: 'Microsoft 365 admin center', tone: 'safety' },
        { id: 's-built', x: 760, y: 150, w: 180, h: 64, label: 'Built by your org', sub: { en: 'whole tenant', de: 'ganzer Tenant' }, tone: 'external' },
      ],
      edges: [
        { id: 'r-just', from: 's-just', to: 's-rbac' },
        { id: 'r-yours', from: 's-rbac', to: 's-yours', label: { en: 'no approval', de: 'ohne Freigabe' } },
        { id: 'r-org', from: 's-org', to: 's-tenant' },
        { id: 'r-approve', from: 's-tenant', to: 's-approve' },
        { id: 'r-built', from: 's-approve', to: 's-built' },
      ],
      steps: [
        {
          title: { en: 'Just you', de: 'Just you' },
          text: {
            en: 'No admin approval: the agent is available at once under **Your agents** and you share it by sending its link. Foundry sets `BotServiceRbac`, so each caller needs an Azure role that allows invoking the agent endpoint — give selected users **Foundry Agent Consumer** on the project or on this agent.',
            de: 'Keine Admin-Freigabe: Der Agent ist sofort unter **Your agents** verfügbar, und du teilst ihn per Link. Foundry setzt `BotServiceRbac` – jeder Aufrufer braucht also eine Azure-Rolle, die den Aufruf des Agent-Endpoints erlaubt: Gib ausgewählten Nutzern **Foundry Agent Consumer** auf dem Projekt oder auf diesem Agent.',
          },
          focus: ['s-just', 'r-just', 's-rbac', 'r-yours', 's-yours'],
        },
        {
          title: { en: 'People in your organization', de: 'People in your organization' },
          text: {
            en: 'Publishing with this scope sets `BotServiceTenant` right away: any signed-in user in your tenant may call the agent, while guest users can’t interact with it. At the same time, the agent goes to the Microsoft 365 admin center as a request.',
            de: 'Veröffentlichen mit diesem Scope setzt sofort `BotServiceTenant`: Jeder angemeldete Nutzer deines Tenants darf den Agent aufrufen, Gastnutzer können dagegen nicht mit ihm interagieren. Gleichzeitig geht der Agent als Anfrage ins Microsoft 365 Admin Center.',
          },
          focus: ['s-org', 'r-org', 's-tenant'],
        },
        {
          title: { en: 'Approval, then tenant-wide listing', de: 'Freigabe, dann Listung im ganzen Tenant' },
          text: {
            en: 'A Microsoft 365 admin reviews the request in the Microsoft 365 admin center and approves it. Only then does the agent appear under **Built by your org** for everyone in the tenant; app policies in your tenant still control which users can access it.',
            de: 'Ein Microsoft-365-Admin prüft die Anfrage im Microsoft 365 Admin Center und gibt sie frei. Erst dann erscheint der Agent für alle im Tenant unter **Built by your org**; App-Richtlinien deines Tenants steuern weiterhin, welche Nutzer darauf zugreifen können.',
          },
          focus: ['s-tenant', 'r-approve', 's-approve', 'r-built', 's-built'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Agent endpoint and agent identity',
      text: {
        en: 'Every new Foundry agent gets a stable endpoint and a unique Microsoft Entra agent identity at creation. Microsoft 365 Copilot, Teams and your own apps — for example through the **Responses API** (OpenAI-compatible API that returns a response object; keeps state via `previous_response_id` or a conversation) — all call that same endpoint. A new agent identity starts without permissions: grant roles on downstream resources to whichever identity a tool’s connection uses (agent identity or project managed identity). The older model, which created a separate **Agent Application** resource at publish time, is legacy.',
        de: 'Jeder neue Foundry-Agent bekommt beim Anlegen einen stabilen Endpoint und eine eigene Microsoft-Entra-Agent-Identität. Microsoft 365 Copilot, Teams und deine eigenen Apps – etwa über die **Responses API** (OpenAI-kompatible API, die ein Response-Objekt liefert; hält Zustand über `previous_response_id` oder eine Conversation) – rufen alle denselben Endpoint auf. Eine neue Agent-Identität startet ohne Berechtigungen: Vergib Rollen auf nachgelagerten Ressourcen an die Identität, die die Verbindung eines Tools nutzt (Agent-Identität oder Managed Identity des Projekts). Das ältere Modell, das beim Veröffentlichen eine separate **Agent Application**-Ressource erzeugte, gilt als Legacy.',
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
        en: '**Just you** (REST `Shared`): no approval, listed under **Your agents**, shared by link; `BotServiceRbac` admits only callers with an invoke role — assign **Foundry Agent Consumer** on the project or the agent (legacy Agent Applications used **Foundry User** on the application instead). **People in your organization** (REST `Tenant`): sets `BotServiceTenant` at publish; after Microsoft 365 admin approval it’s listed under **Built by your org** for everyone in the tenant.',
        de: '**Just you** (REST `Shared`): keine Freigabe, gelistet unter **Your agents**, Teilen per Link; `BotServiceRbac` lässt nur Aufrufer mit einer Aufrufrolle zu – weise **Foundry Agent Consumer** auf dem Projekt oder dem Agent zu (Legacy-Agent-Applications nutzten stattdessen **Foundry User** auf der Anwendung). **People in your organization** (REST `Tenant`): setzt beim Veröffentlichen `BotServiceTenant`; nach der Freigabe durch einen Microsoft-365-Admin ist der Agent unter **Built by your org** für alle im Tenant gelistet.',
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
        en: 'The workplace intelligence layer over Microsoft 365 — mail, meetings, OneDrive and SharePoint files, Teams messages, people — reachable through A2A, MCP and REST. It always acts as the signed-in user (delegated; app-only isn’t supported), so Microsoft 365 permissions, sensitivity labels and policies apply. Creating its connection needs **Foundry Project Manager**; the developer, the agent’s runtime identity and users in the OAuth flow need **Foundry User** on the project. Usage is billed with Copilot Credits, and calls may be processed outside the Azure compliance boundary.',
        de: 'Die Workplace-Intelligence-Schicht über Microsoft 365 – Mails, Meetings, Dateien in OneDrive und SharePoint, Teams-Nachrichten, Personen –, erreichbar über A2A, MCP und REST. Sie handelt immer als angemeldeter Nutzer (delegiert; App-only wird nicht unterstützt), daher gelten Microsoft-365-Berechtigungen, Vertraulichkeitslabels und Richtlinien. Das Anlegen ihrer Verbindung braucht **Foundry Project Manager**; Entwickler, die Laufzeitidentität des Agents und Nutzer im OAuth-Flow brauchen **Foundry User** auf dem Projekt. Abgerechnet wird über Copilot Credits, und Aufrufe können außerhalb der Azure-Compliance-Grenze verarbeitet werden.',
      },
    },
    {
      term: 'Test and iterate',
      text: {
        en: 'The playground doesn’t show the published experience: there you call the agent as yourself, in Teams each user does. Test in Teams and Microsoft 365 Copilot across clients with several users, including one without access to restricted content. Users who can’t find the agent point to scope, pending approval or tenant app policies — and the agent store refreshes only about once an hour. Then fix, create a new version and roll it out.',
        de: 'Der Playground zeigt nicht das veröffentlichte Erlebnis: Dort rufst du den Agent als du selbst auf, in Teams tut das jeder Nutzer. Teste in Teams und Microsoft 365 Copilot über mehrere Clients mit verschiedenen Nutzern, auch mit einem ohne Zugriff auf geschützte Inhalte. Nutzer, die den Agent nicht finden, deuten auf Scope, ausstehende Freigabe oder App-Richtlinien des Tenants – und der Agent Store aktualisiert sich nur etwa einmal pro Stunde. Dann korrigieren, neue Version erstellen und ausrollen.',
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
            # exactly one rule at 100 %: the endpoint can't split traffic between versions
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
          en: '`update_details()` merge-patches the agent’s endpoint settings. In the portal you set the same thing under **Details** › **Active version** or with the arrow next to **Active version** in the Publish dialog.',
          de: '`update_details()` aktualisiert die Endpoint-Einstellungen des Agents per Merge-Patch. Im Portal setzt du dasselbe unter **Details** › **Active version** oder über den Pfeil neben **Active version** im Publish-Dialog.',
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
        model="gpt-5-mini",  # deployment name
        instructions=(
            "Use Work IQ for questions about the user's mail, meetings and files. "
            "If nothing relevant is found, say so instead of guessing."
        ),
        tools=[work_iq],
    ),
)`,
      notes: [
        {
          en: 'One-time setup: a Global Administrator provisions the Work IQ service principal; a single-tenant app registration gets the delegated `WorkIQAgent.Ask` permission, tenant-wide admin consent and a client secret; a **Foundry Project Manager** creates the Work IQ MCP connection from those values (its fields can’t be edited later); finally, the OAuth redirect URL that Foundry displays is added to the app registration as a Web redirect URI.',
          de: 'Einmalige Einrichtung: Ein Global Administrator stellt den Work-IQ-Service-Principal bereit; eine Single-Tenant-App-Registrierung bekommt die delegierte Berechtigung `WorkIQAgent.Ask`, tenantweiten Admin-Consent und ein Client Secret; ein **Foundry Project Manager** legt daraus die Work-IQ-MCP-Verbindung an (ihre Felder lassen sich danach nicht mehr ändern); zuletzt wird die OAuth-Redirect-URL, die Foundry anzeigt, als Web-Redirect-URI in der App-Registrierung eingetragen.',
        },
        {
          en: 'This MCP path (`type: mcp` with the Work IQ MCP endpoint) is generally available. The Foundry article marked “(preview)” describes the built-in `WorkIQPreviewTool` (`work_iq_preview`), which calls the Work IQ A2A endpoint and is still in preview.',
          de: 'Dieser MCP-Weg (`type: mcp` mit dem Work-IQ-MCP-Endpoint) ist allgemein verfügbar. Der mit „(preview)“ markierte Foundry-Artikel beschreibt das eingebaute `WorkIQPreviewTool` (`work_iq_preview`), das den Work-IQ-A2A-Endpoint aufruft und noch Preview ist.',
        },
        {
          en: 'On first use, Foundry may ask the user to sign in and consent; answers depend on that user’s Microsoft 365 permissions. `model` takes a deployment name, which can be any name you chose.',
          de: 'Beim ersten Aufruf fragt Foundry den Nutzer eventuell nach Anmeldung und Zustimmung; die Antworten hängen von seinen Microsoft-365-Berechtigungen ab. `model` erwartet einen Deployment-Namen, den du frei wählen kannst.',
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
      en: '**People in your organization** isn’t listed for the tenant until a Microsoft 365 admin approves the request in the Microsoft 365 admin center; until then nobody finds it under **Built by your org**.',
      de: '**People in your organization** wird erst für den Tenant gelistet, wenn ein Microsoft-365-Admin die Anfrage im Microsoft 365 Admin Center freigibt; bis dahin findet ihn niemand unter **Built by your org**.',
    },
    {
      en: '“Works in the playground, fails in Teams”: check the identity the failing tool’s connection uses. Agent-identity or project-managed-identity connections need a role on the resource (a new agent identity starts with none, and a migrated agent gets a new identity whose roles don’t transfer); delegated tools run as each Teams user, who needs the access you had in the playground.',
      de: '„Läuft im Playground, scheitert in Teams“: Prüfe, welche Identität die Verbindung des scheiternden Tools nutzt. Verbindungen mit Agent-Identität oder Managed Identity des Projekts brauchen eine Rolle auf der Ressource (eine neue Agent-Identität startet ohne, und ein migrierter Agent bekommt eine neue Identität, deren Rollen nicht mitwandern); delegierte Tools laufen als jeder Teams-Nutzer, der den Zugriff braucht, den du im Playground hattest.',
    },
    {
      en: 'Work IQ never runs app-only: it acts as the signed-in user, and admin consent for `WorkIQAgent.Ask` doesn’t widen what that user can see.',
      de: 'Work IQ läuft nie App-only: Es handelt als angemeldeter Nutzer, und Admin-Consent für `WorkIQAgent.Ask` erweitert nicht, was dieser Nutzer sehen darf.',
    },
    {
      en: 'Published agents don’t support streaming responses or citations, and file uploads and image generation work in Teams but not in Microsoft 365 Copilot. If users must see sources (for example under Web IQ’s link-back rule), instruct the agent to write the source links into the answer text.',
      de: 'Veröffentlichte Agents unterstützen kein Streaming und keine Zitate; Datei-Uploads und Bildgenerierung funktionieren in Teams, aber nicht in Microsoft 365 Copilot. Müssen Nutzer Quellen sehen (etwa wegen der Link-Pflicht von Web IQ), weise den Agent an, die Quellenlinks in den Antworttext zu schreiben.',
    },
  ],
  takeaways: [
    { en: 'Default path: **Publish** › **Teams and Microsoft Copilot** in the Foundry portal; use the Agents Toolkit only for custom SSO, middleware or multi-environment pipelines.', de: 'Standardweg: **Publish** › **Teams and Microsoft Copilot** im Foundry-Portal; das Agents Toolkit nur für eigenes SSO, Middleware oder Pipelines über mehrere Umgebungen.' },
    { en: '**Just you** = instant, no approval; **People in your organization** = admin approval, then **Built by your org**.', de: '**Just you** = sofort, ohne Freigabe; **People in your organization** = Admin-Freigabe, dann **Built by your org**.' },
    { en: 'Roll out new behavior with the version selector; republish only to change store metadata (with a new app version).', de: 'Neues Verhalten rollst du über den Version Selector aus; neu veröffentlichen nur, um Store-Metadaten zu ändern (mit neuer App-Version).' },
    { en: 'Work IQ = delegated Microsoft 365 work context: admin consent for `WorkIQAgent.Ask`, an OAuth connection created by a **Foundry Project Manager**, and **Foundry User** for the developer, the agent’s runtime identity and OAuth users.', de: 'Work IQ = delegierter Microsoft-365-Arbeitskontext: Admin-Consent für `WorkIQAgent.Ask`, eine OAuth-Verbindung, angelegt von einem **Foundry Project Manager**, und **Foundry User** für Entwickler, Laufzeitidentität des Agents und OAuth-Nutzer.' },
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
