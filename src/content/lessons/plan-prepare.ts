import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'plan-prepare',
  summary: {
    en: 'Planning starts with the **AI capability** you need — generative AI and agents, natural language processing, speech, computer vision or information extraction — and with **where it runs**. Microsoft Foundry is the Azure platform for all of them: one **Foundry resource** is the governance boundary (networking, keys, RBAC, policy, model deployments, Foundry Tools), and the **projects** inside it are the workspaces where teams build agents, run evaluations and keep files. **Foundry Tools** (Azure Language, Speech, Translator, Vision, Document Intelligence, Content Understanding, Azure AI Content Safety) handle common tasks with predictable, purpose-built APIs, while models from the Foundry catalog handle open-ended generation and reasoning. You build with the Foundry portal, the Foundry SDK or OpenAI SDK, the Foundry Toolkit for VS Code and the Azure Developer CLI (`azd`); coding agents use the Foundry Skill and Foundry MCP Server. Security (Microsoft Entra ID, least-privilege roles, private networking) and responsible AI principles are part of the plan from day one.',
    de: 'Die Planung beginnt mit der **KI-Fähigkeit**, die du brauchst – generative KI und Agents, Verarbeitung natürlicher Sprache, Speech, Computer Vision oder Informationsextraktion – und mit der Frage, **wo sie läuft**. Microsoft Foundry ist die Azure-Plattform für all das: Eine **Foundry-Ressource** ist die Governance-Grenze (Netzwerk, Keys, RBAC, Policies, Modell-Deployments, Foundry Tools), und die **Projekte** darin sind die Arbeitsbereiche, in denen Teams Agents bauen, Evaluierungen ausführen und Dateien ablegen. **Foundry Tools** (Azure Language, Speech, Translator, Vision, Document Intelligence, Content Understanding, Azure AI Content Safety) erledigen Standardaufgaben mit vorhersehbaren, spezialisierten APIs, während Modelle aus dem Foundry-Katalog offene Generierung und Reasoning übernehmen. Du baust mit dem Foundry-Portal, dem Foundry SDK oder OpenAI SDK, dem Foundry Toolkit für VS Code und der Azure Developer CLI (`azd`); Coding Agents nutzen den Foundry Skill und den Foundry MCP Server. Sicherheit (Microsoft Entra ID, Rollen nach dem Least-Privilege-Prinzip, private Netzwerke) und Prinzipien verantwortungsvoller KI gehören vom ersten Tag an zum Plan.',
  },
  examFocus: {
    en: 'Expect scenario questions that make you pick the right building block (Foundry Tool vs model, Document Intelligence vs Content Understanding, file search vs Foundry IQ, prompt agent vs hosted agent) and developer tool, choose a resource topology (shared resource with projects vs one resource per production workload), name the resources of a standard agent setup, wire CI/CD with `azd`, GitHub Actions and OIDC, and secure access with the right Foundry role, keyless authentication, `disableLocalAuth` and private endpoints.',
    de: 'Rechne mit Szenariofragen, in denen du den passenden Baustein (Foundry Tool oder Modell, Document Intelligence oder Content Understanding, File Search oder Foundry IQ, Prompt Agent oder Hosted Agent) und das passende Entwicklertool wählst, eine Ressourcentopologie bestimmst (geteilte Ressource mit Projekten oder eine Ressource pro Produktions-Workload), die Ressourcen eines Standard-Agent-Setups benennst, CI/CD mit `azd`, GitHub Actions und OIDC verdrahtest und den Zugriff mit der richtigen Foundry-Rolle, schlüsselloser Anmeldung, `disableLocalAuth` und Private Endpoints absicherst.',
  },
  diagrams: [
    {
      id: 'foundry-hierarchy',
      title: { en: 'Foundry resource, projects and everything around them', de: 'Foundry-Ressource, Projekte und ihr Umfeld' },
      caption: {
        en: 'Governance lives on the Foundry resource, day-to-day work lives in projects, and data services stay separate Azure resources that you connect.',
        de: 'Governance sitzt an der Foundry-Ressource, die tägliche Arbeit in Projekten – und Datendienste bleiben eigene Azure-Ressourcen, die du verbindest.',
      },
      width: 960,
      height: 480,
      groups: [
        { id: 'g-sol', x: 10, y: 30, w: 160, h: 440, label: { en: 'Your side', de: 'Deine Seite' }, tone: 'app' },
        { id: 'g-res', x: 295, y: 20, w: 410, h: 380, label: 'Foundry resource', tone: 'foundry' },
        { id: 'g-proj', x: 310, y: 138, w: 380, h: 114, label: 'Foundry project', tone: 'foundry' },
        { id: 'g-ext', x: 776, y: 30, w: 180, h: 440, label: { en: 'Connected resources', de: 'Verbundene Ressourcen' }, tone: 'data' },
      ],
      nodes: [
        { id: 'n-app', x: 20, y: 96, w: 140, h: 60, label: { en: 'App or API', de: 'App oder API' }, sub: { en: 'managed identity', de: 'Managed Identity' }, tone: 'app' },
        { id: 'n-dev', x: 20, y: 174, w: 140, h: 60, label: { en: 'Developer', de: 'Entwickler:in' }, sub: { en: 'portal · VS Code', de: 'Portal · VS Code' }, tone: 'user', shape: 'actor' },
        { id: 'n-cicd', x: 20, y: 400, w: 140, h: 60, label: { en: 'CI/CD pipeline', de: 'CI/CD-Pipeline' }, sub: 'azd · GitHub Actions', tone: 'app' },
        { id: 'n-tools', x: 325, y: 54, w: 160, h: 64, label: 'Foundry Tools', sub: 'Language · Speech · …', tone: 'tool' },
        { id: 'n-sec', x: 525, y: 54, w: 160, h: 64, label: 'Governance', sub: { en: 'RBAC · network · CMK', de: 'RBAC · Netzwerk · CMK' }, tone: 'safety' },
        { id: 'n-ep', x: 325, y: 172, w: 160, h: 64, label: { en: 'Project endpoint', de: 'Project Endpoint' }, sub: '…/api/projects/<name>', tone: 'foundry' },
        { id: 'n-assets', x: 535, y: 172, w: 140, h: 64, label: { en: 'Agents · evals', de: 'Agents · Evals' }, sub: { en: 'files · datasets', de: 'Dateien · Datasets' }, tone: 'foundry' },
        { id: 'n-dep', x: 325, y: 316, w: 160, h: 64, label: { en: 'Model deployments', de: 'Modell-Deployments' }, sub: { en: 'shared by projects', de: 'von Projekten geteilt' }, tone: 'model', shape: 'store' },
        { id: 'n-conn', x: 525, y: 316, w: 160, h: 64, label: { en: 'Connections', de: 'Verbindungen' }, sub: { en: 'resource or project', de: 'Ressource oder Projekt' }, tone: 'foundry' },
        { id: 'n-search', x: 788, y: 100, w: 160, h: 56, label: 'Azure AI Search', sub: { en: 'indexes · vectors', de: 'Indizes · Vektoren' }, tone: 'data', shape: 'store' },
        { id: 'n-store', x: 788, y: 190, w: 160, h: 56, label: 'Storage · Cosmos DB', sub: { en: 'files · conversations', de: 'Dateien · Konversationen' }, tone: 'data', shape: 'store' },
        { id: 'n-kv', x: 788, y: 320, w: 160, h: 56, label: 'Azure Key Vault', sub: { en: 'optional BYO · secrets', de: 'optional BYO · Secrets' }, tone: 'safety' },
        { id: 'n-ai', x: 788, y: 400, w: 160, h: 56, label: 'Application Insights', sub: { en: 'traces · monitoring', de: 'Traces · Monitoring' }, tone: 'data', shape: 'store' },
      ],
      edges: [
        { id: 'e-app-tools', from: 'n-app', to: 'n-tools', label: { en: 'tool endpoint', de: 'Tool-Endpoint' } },
        { id: 'e-app', from: 'n-app', to: 'n-ep', label: { en: 'Entra ID token', de: 'Entra-ID-Token' } },
        { id: 'e-dev', from: 'n-dev', to: 'n-ep', label: { en: 'build', de: 'bauen' } },
        { id: 'e-cicd', from: 'n-cicd', to: 'g-res', via: [[500, 430]], label: 'azd provision' },
        { id: 'e-cicd-deploy', from: 'n-cicd', to: 'n-ep', label: 'azd deploy · eval' },
        { id: 'e-ep-assets', from: 'n-ep', to: 'n-assets' },
        { id: 'e-ep-dep', from: 'n-ep', to: 'n-dep', label: 'Responses API' },
        { id: 'e-conn-ext', from: 'n-conn', to: 'g-ext' },
        { id: 'e-assets-search', from: 'n-assets', to: 'n-search', dashed: true, label: 'BYO' },
        { id: 'e-assets-store', from: 'n-assets', to: 'n-store', dashed: true, label: 'BYO' },
      ],
      steps: [
        {
          title: { en: 'One resource, one boundary', de: 'Eine Ressource, eine Grenze' },
          text: {
            en: 'The Foundry resource (`Microsoft.CognitiveServices/accounts`, kind `AIServices`) is the top-level Azure resource. Networking, encryption, RBAC and Azure Policy are set here once and apply to everything inside it.',
            de: 'Die Foundry-Ressource (`Microsoft.CognitiveServices/accounts`, Kind `AIServices`) ist die oberste Azure-Ressource. Netzwerk, Verschlüsselung, RBAC und Azure Policy legst du hier einmal fest – sie gelten für alles darin.',
          },
          focus: ['g-res', 'n-sec'],
        },
        {
          title: { en: 'Shared building blocks', de: 'Geteilte Bausteine' },
          text: {
            en: 'Model deployments, Foundry Tools and resource-level connections sit on the resource, so every project reuses them without new IT setup. A connection stores an endpoint plus credential that agent tools (for example the Azure AI Search tool) reference instead of secrets in code. A deployment can have any name; code calls the model by that deployment name.',
            de: 'Modell-Deployments, Foundry Tools und Verbindungen auf Ressourcenebene hängen an der Ressource, sodass jedes Projekt sie ohne neues IT-Setup nutzt. Eine Verbindung speichert Endpoint plus Anmeldedaten, auf die Agent-Tools (etwa das Azure-AI-Search-Tool) statt Secrets im Code verweisen. Ein Deployment kann beliebig heißen; Code ruft das Modell über diesen Deployment-Namen auf.',
          },
          focus: ['n-dep', 'n-conn', 'n-tools'],
        },
        {
          title: { en: 'Projects isolate the work', de: 'Projekte trennen die Arbeit' },
          text: {
            en: 'A project is a subresource and the development boundary: agents, evaluations, files and datasets belong to it. Code reaches them through `https://<resource>.services.ai.azure.com/api/projects/<project>` and calls models with the **Responses API**: an OpenAI-compatible API that returns a response object and keeps multi-turn state via `previous_response_id` or a conversation (a durable item store).',
            de: 'Ein Projekt ist eine Subressource und die Entwicklungsgrenze: Agents, Evaluierungen, Dateien und Datasets gehören dazu. Code erreicht sie über `https://<resource>.services.ai.azure.com/api/projects/<project>` und ruft Modelle mit der **Responses API** auf: einer OpenAI-kompatiblen API, die ein Response-Objekt liefert und den Zustand über mehrere Runden per `previous_response_id` oder Conversation (ein dauerhafter Item-Speicher) hält.',
          },
          focus: ['g-proj', 'n-ep', 'n-assets', 'e-ep-assets', 'e-ep-dep', 'n-dep'],
        },
        {
          title: { en: 'Everyone signs in with Entra ID', de: 'Alle melden sich mit Entra ID an' },
          text: {
            en: 'Developers use their `az login`, apps use a managed identity — both for the project endpoint and for the Foundry Tools endpoint (`https://<resource>.cognitiveservices.azure.com/`). Each identity needs a data-plane role such as **Foundry User**; API keys don\'t work for agents and evaluations.',
            de: 'Entwickler:innen nutzen ihr `az login`, Apps eine Managed Identity – für den Project Endpoint ebenso wie für den Endpoint der Foundry Tools (`https://<resource>.cognitiveservices.azure.com/`). Jede Identität braucht eine Data-Plane-Rolle wie **Foundry User**; API-Keys funktionieren für Agents und Evaluierungen nicht.',
          },
          focus: ['n-dev', 'n-app', 'e-dev', 'e-app', 'e-app-tools', 'n-tools'],
        },
        {
          title: { en: 'Data services stay separate', de: 'Datendienste bleiben getrennt' },
          text: {
            en: 'Azure AI Search, Storage, Cosmos DB, Key Vault and Application Insights are independent resources with their own networking and access rules, reached through connections. In a standard agent setup (bring your own, BYO), vector stores land in your AI Search, files in your Storage and conversations in your Cosmos DB. Your own Key Vault is optional: by default, Foundry keeps connection secrets in a managed key vault.',
            de: 'Azure AI Search, Storage, Cosmos DB, Key Vault und Application Insights sind eigenständige Ressourcen mit eigenen Netzwerk- und Zugriffsregeln, erreichbar über Verbindungen. Im Standard-Agent-Setup (Bring Your Own, BYO) landen Vector Stores in deinem AI Search, Dateien in deinem Storage und Konversationen in deinem Cosmos DB. Ein eigener Key Vault ist optional: Standardmäßig speichert Foundry Verbindungsgeheimnisse in einem verwalteten Key Vault.',
          },
          focus: ['g-ext', 'e-conn-ext', 'e-assets-search', 'e-assets-store', 'n-search', 'n-store', 'n-kv', 'n-ai'],
        },
        {
          title: { en: 'Automate it', de: 'Automatisieren' },
          text: {
            en: '`azd provision` applies your Bicep or Terraform to the resource; `azd deploy` ships a new agent version into the project. `azd pipeline config` generates the GitHub Actions or Azure DevOps pipeline; on GitHub it signs in with an OIDC federated credential (GitHub\'s token is swapped for a Microsoft Entra token, so no secret is stored). `azd ai agent eval run` evaluates the deployed agent; to gate a release, pin production to the current version before you deploy and fail CI with `azd ai eval run start --fail-on`.',
            de: '`azd provision` wendet dein Bicep oder Terraform auf die Ressource an; `azd deploy` liefert eine neue Agent-Version ins Projekt. `azd pipeline config` erzeugt die Pipeline für GitHub Actions oder Azure DevOps; auf GitHub meldet sie sich per OIDC-Federated-Credential an (GitHubs Token wird gegen ein Microsoft-Entra-Token getauscht – kein gespeichertes Secret). `azd ai agent eval run` evaluiert den bereitgestellten Agent; für ein Release-Gate pinnst du Produktion vor dem Deployment auf die aktuelle Version und lässt CI per `azd ai eval run start --fail-on` an Qualitätsschwellen scheitern.',
          },
          focus: ['n-cicd', 'e-cicd', 'e-cicd-deploy', 'n-ep', 'n-assets'],
        },
      ],
    },
    {
      id: 'secure-access',
      title: { en: 'Keyless and private: how a request reaches Foundry', de: 'Schlüssellos und privat: So erreicht ein Request Foundry' },
      caption: {
        en: 'Identity, network and data controls stack up. Each layer closes a different door.',
        de: 'Identität, Netzwerk und Datenschutz bauen aufeinander auf. Jede Schicht schließt eine andere Tür.',
      },
      width: 960,
      height: 400,
      nodes: [
        { id: 's-entra', x: 20, y: 40, w: 150, h: 64, label: 'Microsoft Entra ID', sub: { en: 'scope ai.azure.com', de: 'Scope ai.azure.com' }, tone: 'safety' },
        { id: 's-key', x: 286, y: 40, w: 150, h: 64, label: { en: 'API key', de: 'API-Key' }, sub: { en: 'rejected: HTTP 401', de: 'abgelehnt: HTTP 401' }, tone: 'neutral' },
        { id: 's-policy', x: 532, y: 40, w: 150, h: 64, label: 'Azure Policy', sub: { en: 'enforces keys off', de: 'erzwingt Keys aus' }, tone: 'safety' },
        { id: 's-403', x: 790, y: 36, w: 130, h: 56, label: 'HTTP 403', sub: { en: 'call refused', de: 'Aufruf abgelehnt' }, tone: 'neutral', shape: 'pill' },
        { id: 's-app', x: 20, y: 170, w: 150, h: 64, label: { en: 'App in your VNet', de: 'App in deinem VNet' }, sub: { en: 'managed identity', de: 'Managed Identity' }, tone: 'app' },
        { id: 's-pe', x: 286, y: 170, w: 150, h: 64, label: { en: 'Private endpoint', de: 'Private Endpoint' }, sub: { en: '3 privatelink zones', de: '3 privatelink-Zonen' }, tone: 'safety' },
        { id: 's-res', x: 532, y: 170, w: 150, h: 64, label: 'Foundry resource', sub: { en: 'public access: off', de: 'Public Access: aus' }, tone: 'foundry' },
        { id: 's-rbac', x: 780, y: 164, w: 150, h: 76, label: { en: 'RBAC check', de: 'RBAC-Prüfung' }, sub: 'Foundry User /\nAgent Consumer?', tone: 'safety', shape: 'diamond' },
        { id: 's-agent', x: 532, y: 300, w: 150, h: 64, label: { en: 'Agent runtime', de: 'Agent-Laufzeit' }, sub: { en: 'VNet injection', de: 'VNet-Injection' }, tone: 'foundry' },
        { id: 's-byo', x: 780, y: 300, w: 170, h: 64, label: 'Cosmos DB · Storage', sub: { en: '+ AI Search, with CMK', de: '+ AI Search, mit CMK' }, tone: 'data', shape: 'store' },
      ],
      edges: [
        { id: 's-e1', from: 's-app', to: 's-entra', label: { en: 'get token', de: 'Token holen' } },
        { id: 's-e2', from: 's-app', to: 's-pe', label: { en: 'HTTPS + token', de: 'HTTPS + Token' } },
        { id: 's-e3', from: 's-pe', to: 's-res' },
        { id: 's-e6', from: 's-key', to: 's-pe', dashed: true, label: { en: 'API-key call', de: 'Key-Aufruf' } },
        { id: 's-e5', from: 's-policy', to: 's-res', dashed: true, label: { en: 'enforces', de: 'erzwingt' } },
        { id: 's-e4', from: 's-res', to: 's-rbac', label: 'dataActions?' },
        { id: 's-e9', from: 's-rbac', to: 's-403', label: { en: 'no role', de: 'keine Rolle' } },
        { id: 's-e7', from: 's-rbac', to: 's-agent', label: { en: 'allowed', de: 'erlaubt' } },
        { id: 's-e8', from: 's-agent', to: 's-byo', label: 'Private Link' },
      ],
      steps: [
        {
          title: { en: 'Identity first', de: 'Zuerst die Identität' },
          text: {
            en: 'The app runs with a managed identity. `DefaultAzureCredential` gets a Microsoft Entra token for the scope `https://ai.azure.com/.default` — no secret in code or configuration.',
            de: 'Die App läuft mit einer Managed Identity. `DefaultAzureCredential` holt ein Microsoft-Entra-Token für den Scope `https://ai.azure.com/.default` – ohne Geheimnis in Code oder Konfiguration.',
          },
          focus: ['s-app', 's-entra', 's-e1'],
        },
        {
          title: { en: 'A private way in', de: 'Ein privater Weg hinein' },
          text: {
            en: 'With public network access disabled, the only way in is a private endpoint in your VNet. Three private DNS zones (`privatelink.cognitiveservices.azure.com`, `privatelink.openai.azure.com`, `privatelink.services.ai.azure.com`) resolve the usual endpoint names to the private IP, so connection strings stay the same.',
            de: 'Ist der öffentliche Netzwerkzugriff deaktiviert, führt der einzige Weg über einen Private Endpoint in deinem VNet. Drei private DNS-Zonen (`privatelink.cognitiveservices.azure.com`, `privatelink.openai.azure.com`, `privatelink.services.ai.azure.com`) lösen die gewohnten Endpoint-Namen in die private IP auf – Connection Strings bleiben gleich.',
          },
          focus: ['s-e2', 's-pe', 's-e3', 's-res'],
        },
        {
          title: { en: 'Keys switched off', de: 'Keys abgeschaltet' },
          text: {
            en: 'Set `disableLocalAuth` to `true` once every caller uses tokens. A client that still sends an API key comes in through the same private endpoint but gets HTTP 401 after the change propagates. A built-in Azure Policy can require disabled key access for all resources in a subscription.',
            de: 'Setze `disableLocalAuth` auf `true`, sobald alle Aufrufer Tokens nutzen. Ein Client, der noch einen API-Key sendet, kommt zwar über denselben Private Endpoint, bekommt aber nach der Verteilung HTTP 401. Eine integrierte Azure Policy kann deaktivierten Key-Zugriff für alle Ressourcen eines Abonnements vorschreiben.',
          },
          focus: ['s-key', 's-e6', 's-policy', 's-e5', 's-res'],
        },
        {
          title: { en: 'Authorize every call', de: 'Jeden Aufruf autorisieren' },
          text: {
            en: 'Foundry checks Azure RBAC on each data-plane call. The identity needs a role with data actions: **Foundry User** to build, **Foundry Agent Consumer** to call agent endpoints (project or single-agent scope); a legacy Agent Application (the old publishing model) needs **Foundry User** on the application instead. Without a matching role, the call ends with HTTP 403.',
            de: 'Foundry prüft bei jedem Data-Plane-Aufruf Azure RBAC. Die Identität braucht eine Rolle mit Data Actions: **Foundry User** zum Bauen, **Foundry Agent Consumer**, um Agent-Endpoints aufzurufen (auf Projekt- oder Agent-Ebene); eine Legacy-Agent-Application (das alte Veröffentlichungsmodell) braucht stattdessen **Foundry User** auf der Application. Ohne passende Rolle endet der Aufruf mit HTTP 403.',
          },
          focus: ['s-e4', 's-rbac', 's-e9', 's-403'],
        },
        {
          title: { en: 'A private way out', de: 'Ein privater Weg hinaus' },
          text: {
            en: 'Allowed calls reach the agent runtime. Agents reach your data through VNet injection (a subnet delegated to `Microsoft.App/environments`) or a managed virtual network; with a standard agent setup, conversations, files and vectors land in your own Cosmos DB, Storage and AI Search, where customer-managed keys apply.',
            de: 'Erlaubte Aufrufe erreichen die Agent-Laufzeit. Agents erreichen deine Daten über VNet-Injection (ein an `Microsoft.App/environments` delegiertes Subnetz) oder ein verwaltetes virtuelles Netzwerk; im Standard-Agent-Setup landen Konversationen, Dateien und Vektoren in deinem eigenen Cosmos DB, Storage und AI Search – dort greifen kundenseitig verwaltete Schlüssel.',
          },
          focus: ['s-e7', 's-agent', 's-e8', 's-byo'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Foundry resource',
      text: {
        en: 'The top-level Azure resource (`Microsoft.CognitiveServices/accounts`, kind `AIServices`) and the governance boundary: networking, encryption, RBAC and policy are set here once and apply to all its projects. It replaces the former mix of hubs and separate service resources.',
        de: 'Die oberste Azure-Ressource (`Microsoft.CognitiveServices/accounts`, Kind `AIServices`) und die Governance-Grenze: Netzwerk, Verschlüsselung, RBAC und Policies legst du hier einmal fest, und sie gelten für alle ihre Projekte. Sie ersetzt die frühere Kombination aus Hubs und separaten Dienst-Ressourcen.',
      },
    },
    {
      term: 'Foundry project',
      text: {
        en: 'A subresource (`accounts/projects`) and the development boundary, reached through its project endpoint. Projects reuse the resource\'s deployments and connections and get their own managed identity. Hub-based projects exist only in the Foundry (classic) portal.',
        de: 'Eine Subressource (`accounts/projects`) und die Entwicklungsgrenze, erreichbar über ihren Project Endpoint. Projekte nutzen Deployments und Verbindungen der Ressource mit und haben eine eigene Managed Identity. Hub-basierte Projekte gibt es nur noch im Foundry-Portal (classic).',
      },
    },
    {
      term: 'Resource scope vs project scope',
      text: {
        en: '**Resource scope:** model deployments, Foundry Tools (Translator works only here), resource-level connections, network rules, keys and encryption. **Project scope:** agents, evaluations, files, datasets and project connections. **Topology rule:** experiments share one resource with a project per use case; a workload that needs its own network rules, keys, access control, quota or cost boundary — or isolated resource-level APIs — gets its own Foundry resource, the default for production.',
        de: '**Ressourcenebene:** Modell-Deployments, Foundry Tools (Translator nur hier), Verbindungen auf Ressourcenebene, Netzwerkregeln, Keys und Verschlüsselung. **Projektebene:** Agents, Evaluierungen, Dateien, Datasets und Projektverbindungen. **Topologie-Regel:** Experimente teilen sich eine Ressource mit einem Projekt pro Use Case; ein Workload, der eigene Netzwerkregeln, Keys, Zugriffssteuerung, Kontingent- oder Kostengrenzen – oder isolierte APIs der Ressourcenebene – braucht, bekommt eine eigene Foundry-Ressource, den Standard für Produktion.',
      },
    },
    {
      term: 'Foundry Tools',
      text: {
        en: 'Prebuilt, task-specific APIs hosted in your Foundry resource: Azure Language, Speech, Translator, Vision, Document Intelligence, Content Understanding and Azure AI Content Safety. They give predictable output and cost for common tasks and use tool-specific endpoints such as `https://<resource>.cognitiveservices.azure.com/`.',
        de: 'Vorgefertigte, aufgabenspezifische APIs in deiner Foundry-Ressource: Azure Language, Speech, Translator, Vision, Document Intelligence, Content Understanding und Azure AI Content Safety. Sie liefern für Standardaufgaben vorhersehbare Ergebnisse und Kosten und nutzen eigene Endpoints wie `https://<resource>.cognitiveservices.azure.com/`.',
      },
    },
    {
      term: 'Basic vs standard agent setup',
      text: {
        en: 'Basic setup keeps agent state in Microsoft-managed storage. Standard setup brings your own Azure Storage (files), Azure AI Search (vector stores) and Azure Cosmos DB for NoSQL (conversations, agent metadata), so data stays in your tenant and can use customer-managed keys and private networking.',
        de: 'Das Basic-Setup speichert den Agent-Zustand in von Microsoft verwaltetem Speicher. Das Standard-Setup bringt eigenes Azure Storage (Dateien), Azure AI Search (Vector Stores) und Azure Cosmos DB for NoSQL (Konversationen, Agent-Metadaten) mit – die Daten bleiben in deinem Tenant und können kundenseitig verwaltete Schlüssel und private Netzwerke nutzen.',
      },
    },
    {
      term: 'Control plane vs data plane',
      text: {
        en: 'Creating resources, projects, deployments and connections are control-plane `actions`; building agents, running evaluations and calling models are data-plane `dataActions`. Owner, Contributor and **Foundry Account Owner** have no data actions — builders need **Foundry User**; principals that only call agent endpoints need **Foundry Agent Consumer**.',
        de: 'Ressourcen, Projekte, Deployments und Verbindungen anlegen sind Control-Plane-`actions`; Agents bauen, Evaluierungen ausführen und Modelle aufrufen sind Data-Plane-`dataActions`. Owner, Contributor und **Foundry Account Owner** haben keine Data Actions – wer baut, braucht **Foundry User**; wer nur Agent-Endpoints aufruft, **Foundry Agent Consumer**.',
      },
    },
    {
      term: 'Responsible AI principles',
      text: {
        en: 'Fairness, reliability and safety, privacy and security, inclusiveness, transparency and accountability. Plan for them from day one: they shape your data choices, testing, what you tell users about the system and who owns its decisions.',
        de: 'Fairness, Zuverlässigkeit und Sicherheit, Datenschutz und Security, Inklusion, Transparenz und Verantwortlichkeit. Plane sie vom ersten Tag an ein: Sie prägen Datenauswahl, Tests, was du Nutzer:innen über das System sagst und wer für seine Entscheidungen geradesteht.',
      },
    },
  ],
  comparison: {
    title: { en: 'Which building block or developer tool fits the job?', de: 'Welcher Baustein oder welches Entwicklertool passt zur Aufgabe?' },
    columns: [
      { en: 'You need to …', de: 'Du willst …' },
      { en: 'Use', de: 'Nimm' },
      { en: 'Why · exam cue', de: 'Warum · Prüfungshinweis' },
    ],
    rows: [
      [
        { en: 'Send a prompt to a model, no tools', de: 'einen Prompt an ein Modell senden, ohne Tools' },
        { en: 'Model deployment + Responses API', de: 'Modell-Deployment + Responses API' },
        { en: 'Shortest path; add an agent only when you need tools', de: 'Kürzester Weg; ein Agent erst, wenn Tools nötig sind' },
      ],
      [
        { en: 'Extract fields from standard forms: invoices, receipts, IDs', de: 'Felder aus Standardformularen extrahieren: Rechnungen, Belege, Ausweise' },
        'Document Intelligence',
        { en: 'Prebuilt models for consistent, high-volume document extraction', de: 'Vorgefertigte Modelle für einheitliche Extraktion großer Dokumentmengen' },
      ],
      [
        { en: 'Extract or infer fields from varied documents, images, audio or video', de: 'Felder aus unterschiedlichen Dokumenten, Bildern, Audio oder Video extrahieren oder ableiten' },
        'Content Understanding',
        { en: 'One analyzer for every modality, generated fields, confidence scores and grounding', de: 'Ein Analyzer für alle Modalitäten, generierte Felder, Konfidenzwerte und Grounding' },
      ],
      [
        { en: 'Transcribe speech, translate text, detect PII, analyze images', de: 'Sprache transkribieren, Text übersetzen, PII erkennen, Bilder analysieren' },
        'Speech · Translator · Language · Vision',
        { en: 'Purpose-built Foundry Tools: predictable output and cost, no prompt engineering', de: 'Spezialisierte Foundry Tools: vorhersehbare Ausgabe und Kosten, kein Prompt Engineering' },
      ],
      [
        { en: 'Answer questions from files you upload', de: 'Fragen aus hochgeladenen Dateien beantworten' },
        { en: 'File search tool', de: 'File-Search-Tool' },
        { en: 'Parses, chunks and embeds the files into a vector store, then runs keyword + vector search', de: 'Zerlegt die Dateien, bettet sie in einen Vector Store ein und sucht per Keyword- und Vektorsuche' },
      ],
      [
        { en: 'Ground answers in many enterprise sources (SharePoint, Blob Storage, OneLake, web)', de: 'Antworten in vielen Unternehmensquellen verankern (SharePoint, Blob Storage, OneLake, Web)' },
        { en: 'Foundry IQ knowledge base', de: 'Foundry-IQ-Knowledge-Base' },
        { en: 'Agentic retrieval splits the question into subqueries, searches them in parallel and reranks; answers are cited and permission-aware', de: 'Agentic Retrieval zerlegt die Frage in Teilabfragen, sucht parallel und sortiert neu; Antworten mit Quellen und Berechtigungsprüfung' },
      ],
      [
        { en: 'Build an agent from a model, instructions and tools — no code of your own to run', de: 'einen Agent aus Modell, Anweisungen und Tools bauen – ohne eigenen Code, den du betreiben musst' },
        { en: 'Prompt agent', de: 'Prompt Agent' },
        { en: 'Declarative: model + instructions + tools, versioned in Foundry', de: 'Deklarativ: Modell + Anweisungen + Tools, in Foundry versioniert' },
      ],
      [
        { en: 'Write agent or multi-agent workflow code', de: 'Agent- oder Multi-Agent-Workflow-Code schreiben' },
        'Microsoft Agent Framework',
        { en: 'The SDK you code with (successor of Semantic Kernel and AutoGen); recommended for new workflows', de: 'Das SDK, mit dem du programmierst (Nachfolger von Semantic Kernel und AutoGen); empfohlen für neue Workflows' },
      ],
      [
        { en: 'Run your own agent code in Foundry', de: 'eigenen Agent-Code in Foundry betreiben' },
        { en: 'Hosted agent', de: 'Hosted Agent' },
        { en: 'Where that code runs: Foundry runs your container with its own endpoint and agent identity (Agent Framework, LangGraph …)', de: 'Wo dieser Code läuft: Foundry betreibt deinen Container mit eigenem Endpoint und eigener Agent-Identität (Agent Framework, LangGraph …)' },
      ],
      [
        { en: 'Explore models, prototype prompts, build prompt agents', de: 'Modelle erkunden, Prompts ausprobieren, Prompt Agents bauen' },
        { en: 'Foundry portal', de: 'Foundry-Portal' },
        { en: 'No code: model catalog, playgrounds, quick evaluations', de: 'Ohne Code: Modellkatalog, Playgrounds, schnelle Evaluierungen' },
      ],
      [
        { en: 'Use project features from code: agents, evaluations, datasets', de: 'Projekt-Features aus Code nutzen: Agents, Evaluierungen, Datasets' },
        'Foundry SDK (`azure-ai-projects` 2.x)',
        { en: '`AIProjectClient` on the project endpoint, Microsoft Entra ID only', de: '`AIProjectClient` am Project Endpoint, nur Microsoft Entra ID' },
      ],
      [
        { en: 'Call models with portable code', de: 'Modelle mit portablem Code aufrufen' },
        'OpenAI SDK',
        { en: '`/openai/v1/` route or `project.get_openai_client()`; `model` = deployment name', de: '`/openai/v1/`-Route oder `project.get_openai_client()`; `model` = Deployment-Name' },
      ],
      [
        { en: 'Scaffold, provision and deploy from a terminal or pipeline', de: 'Gerüst anlegen, provisionieren und bereitstellen – im Terminal oder in der Pipeline' },
        'Azure Developer CLI (`azd`)',
        { en: '`azd up` for infrastructure + agent; `azd pipeline config` for CI/CD', de: '`azd up` für Infrastruktur + Agent; `azd pipeline config` für CI/CD' },
      ],
      [
        { en: 'Build and debug agents in your editor', de: 'Agents im Editor bauen und debuggen' },
        { en: 'Foundry Toolkit for VS Code', de: 'Foundry Toolkit für VS Code' },
        { en: 'Agent Inspector for local test runs; includes the Foundry Skill', de: 'Agent Inspector für lokale Testläufe; enthält den Foundry Skill' },
      ],
      [
        { en: 'Let a coding agent such as GitHub Copilot work with Foundry', de: 'einen Coding Agent wie GitHub Copilot mit Foundry arbeiten lassen' },
        'Microsoft Foundry Skill + Foundry MCP Server (preview)',
        { en: 'MCP (Model Context Protocol) is the standard for exposing tools to agents; the server gives coding agents read and write tools for Foundry', de: 'MCP (Model Context Protocol) ist der Standard, um Agents Tools bereitzustellen; der Server gibt Coding Agents Lese- und Schreib-Tools für Foundry' },
      ],
    ],
  },
  code: [
    {
      title: { en: 'Foundry SDK: keyless connection and project inventory', de: 'Foundry SDK: schlüssellose Verbindung und Projektinventar' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# Local: az login. In Azure: the app's managed identity (role: Foundry User).
project = AIProjectClient(
    endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
    credential=DefaultAzureCredential(),
)

for deployment in project.deployments.list():
    print("deployment:", deployment.name, deployment.model_name)

for connection in project.connections.list():
    print("connection:", connection.name, connection.type, connection.target)`,
      notes: [
        { en: '`AIProjectClient` accepts only Microsoft Entra ID credentials — there is no API-key option for the project endpoint.', de: '`AIProjectClient` akzeptiert nur Microsoft-Entra-ID-Anmeldedaten – für den Project Endpoint gibt es keine API-Key-Option.' },
        { en: 'Deployments and resource-level connections are shared, so the project lists them without any extra setup.', de: 'Deployments und Verbindungen auf Ressourcenebene sind geteilt – das Projekt listet sie ohne zusätzliches Setup.' },
      ],
    },
    {
      title: { en: 'Foundry Tool: keyless PII redaction with Azure Language', de: 'Foundry Tool: schlüssellose PII-Schwärzung mit Azure Language' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.textanalytics import TextAnalyticsClient

language = TextAnalyticsClient(
    endpoint="https://<resource>.cognitiveservices.azure.com/",
    credential=DefaultAzureCredential(),
)

tickets = ["Call Anna Meyer at +49 170 1234567 about order 4711."]
for doc in language.recognize_pii_entities(tickets):
    if not doc.is_error:
        print(doc.redacted_text)
        print([(e.text, e.category) for e in doc.entities])`,
      notes: [
        { en: 'Foundry Tools use tool-specific endpoints on your Foundry resource (`cognitiveservices.azure.com`), not the project endpoint.', de: 'Foundry Tools nutzen eigene Endpoints auf deiner Foundry-Ressource (`cognitiveservices.azure.com`), nicht den Project Endpoint.' },
        { en: 'A purpose-built API returns the same structure every time: entity categories, confidence scores and the redacted text.', de: 'Eine spezialisierte API liefert immer dieselbe Struktur: Entitätskategorien, Konfidenzwerte und den geschwärzten Text.' },
      ],
    },
  ],
  traps: [
    {
      en: 'Owner, Contributor and **Foundry Account Owner** can manage the resource and deploy models, but they have no data actions — they still get authorization errors when building agents until they also get **Foundry User**.',
      de: 'Owner, Contributor und **Foundry Account Owner** können die Ressource verwalten und Modelle bereitstellen, haben aber keine Data Actions – beim Bauen von Agents scheitern sie, bis sie zusätzlich **Foundry User** bekommen.',
    },
    {
      en: 'API keys don\'t work for Foundry Agent Service, evaluations or `AIProjectClient`, and where they do work they grant full, unscoped access. Use Microsoft Entra ID and disable local auth once every caller uses tokens.',
      de: 'API-Keys funktionieren nicht für Foundry Agent Service, Evaluierungen oder `AIProjectClient` – und wo sie funktionieren, gewähren sie vollen, unbeschränkten Zugriff. Nutze Microsoft Entra ID und schalte Local Auth ab, sobald alle Aufrufer Tokens verwenden.',
    },
    {
      en: 'Connected resources (Azure AI Search, Storage, Key Vault, Cosmos DB) don\'t inherit the Foundry resource\'s private endpoint or RBAC — secure each one separately.',
      de: 'Verbundene Ressourcen (Azure AI Search, Storage, Key Vault, Cosmos DB) erben weder Private Endpoint noch RBAC der Foundry-Ressource – sichere jede einzeln ab.',
    },
    {
      en: 'Translator and other APIs that work only at Foundry resource scope aren\'t isolated by creating another project. If isolation is a must, use a separate Foundry resource.',
      de: 'Translator und andere APIs, die nur auf Ebene der Foundry-Ressource funktionieren, werden durch ein weiteres Projekt nicht isoliert. Ist Isolation Pflicht, nimm eine separate Foundry-Ressource.',
    },
    {
      en: 'The visual workflow designer in the Foundry portal retires on December 1, 2026. Build new multi-agent workflows in code with Microsoft Agent Framework (the SDK) and run them in Foundry as hosted agents (the runtime) — the two work together, they aren\'t alternatives.',
      de: 'Der visuelle Workflow-Designer im Foundry-Portal wird am 1. Dezember 2026 eingestellt. Baue neue Multi-Agent-Workflows im Code mit Microsoft Agent Framework (dem SDK) und betreibe sie in Foundry als Hosted Agents (der Laufzeit) – beides arbeitet zusammen, es sind keine Alternativen.',
    },
  ],
  takeaways: [
    { en: 'Foundry resource = governance boundary; project = development boundary.', de: 'Foundry-Ressource = Governance-Grenze; Projekt = Entwicklungsgrenze.' },
    { en: 'Prebuilt, repeatable task → Foundry Tool; open-ended generation or reasoning → model.', de: 'Standardisierte, wiederholbare Aufgabe → Foundry Tool; offene Generierung oder Reasoning → Modell.' },
    { en: 'Agent data in your tenant, CMK or private networking → standard agent setup (Storage, AI Search, Cosmos DB).', de: 'Agent-Daten im eigenen Tenant, CMK oder private Netzwerke → Standard-Agent-Setup (Storage, AI Search, Cosmos DB).' },
    { en: 'Production access = managed identity + least-privilege Foundry role + private endpoint, keys disabled.', de: 'Produktiver Zugriff = Managed Identity + Foundry-Rolle mit minimalen Rechten + Private Endpoint, Keys deaktiviert.' },
    { en: 'Automate with Bicep or Terraform and `azd`, sign pipelines in with OIDC and gate releases with evaluations.', de: 'Automatisiere mit Bicep oder Terraform und `azd`, melde Pipelines per OIDC an und sichere Releases mit Evaluierungen ab.' },
  ],
  sources: [
    { title: 'Microsoft Foundry architecture', url: 'https://learn.microsoft.com/en-us/azure/foundry/concepts/architecture' },
    { title: 'What are Foundry Tools?', url: 'https://learn.microsoft.com/en-us/azure/ai-services/what-are-ai-services' },
    { title: 'Role-based access control for Microsoft Foundry', url: 'https://learn.microsoft.com/en-us/azure/foundry/concepts/rbac-foundry' },
    { title: 'How to configure network isolation for Microsoft Foundry', url: 'https://learn.microsoft.com/en-us/azure/foundry/how-to/configure-private-link' },
    { title: 'Set up CI/CD for hosted agents with the Azure Developer CLI', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/set-up-ci-cd-cli' },
  ],
}
