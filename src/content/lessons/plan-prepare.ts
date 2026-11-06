import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'plan-prepare',
  summary: {
    en: 'Planning starts with the **AI capability** you need — generative AI and agents, natural language processing, speech, computer vision or information extraction — and with **where it runs**. Microsoft Foundry is the Azure platform for all of them: one **Foundry resource** is the governance boundary (networking, keys, RBAC, policy, model deployments, Foundry Tools), and the **projects** inside it are the workspaces where teams build agents, run evaluations and keep files. **Foundry Tools** (Azure Language, Speech, Translator, Vision, Document Intelligence, Content Understanding, Azure AI Content Safety) handle common tasks with predictable, purpose-built APIs, while models from the Foundry catalog handle open-ended generation and reasoning. You build with the Foundry portal, the Foundry SDK or OpenAI SDK, the Foundry Toolkit for VS Code and the Azure Developer CLI (`azd`). Security (Microsoft Entra ID, least-privilege roles, private networking) and responsible AI principles are part of the plan from day one.',
    de: 'Die Planung beginnt mit der **KI-Fähigkeit**, die du brauchst – generative KI und Agents, Verarbeitung natürlicher Sprache, Speech, Computer Vision oder Informationsextraktion – und mit der Frage, **wo sie läuft**. Microsoft Foundry ist die Azure-Plattform für all das: Eine **Foundry-Ressource** ist die Governance-Grenze (Netzwerk, Keys, RBAC, Policies, Modell-Deployments, Foundry Tools), und die **Projekte** darin sind die Arbeitsbereiche, in denen Teams Agents bauen, Evaluierungen ausführen und Dateien ablegen. **Foundry Tools** (Azure Language, Speech, Translator, Vision, Document Intelligence, Content Understanding, Azure AI Content Safety) erledigen Standardaufgaben mit vorhersehbaren, spezialisierten APIs, während Modelle aus dem Foundry-Katalog offene Generierung und Reasoning übernehmen. Du baust mit dem Foundry-Portal, dem Foundry SDK oder OpenAI SDK, dem Foundry Toolkit für VS Code und der Azure Developer CLI (`azd`). Sicherheit (Microsoft Entra ID, Rollen nach dem Least-Privilege-Prinzip, private Netzwerke) und Prinzipien verantwortungsvoller KI gehören vom ersten Tag an zum Plan.',
  },
  examFocus: {
    en: 'Expect scenario questions that make you pick the right building block (Foundry Tool vs model, Foundry IQ vs file search, prompt agent vs hosted agent vs Microsoft Agent Framework), choose a resource topology (shared resource with projects vs one resource per production workload), name the resources of a standard agent setup, wire CI/CD with `azd`, GitHub Actions and OIDC, and secure access with the right Foundry role, keyless authentication, `disableLocalAuth` and private endpoints.',
    de: 'Rechne mit Szenariofragen, in denen du den passenden Baustein wählst (Foundry Tool oder Modell, Foundry IQ oder File Search, Prompt Agent, Hosted Agent oder Microsoft Agent Framework), eine Ressourcentopologie bestimmst (geteilte Ressource mit Projekten oder eine Ressource pro Produktions-Workload), die Ressourcen eines Standard-Agent-Setups benennst, CI/CD mit `azd`, GitHub Actions und OIDC verdrahtest und den Zugriff mit der richtigen Foundry-Rolle, schlüsselloser Anmeldung, `disableLocalAuth` und Private Endpoints absicherst.',
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
      height: 460,
      groups: [
        { id: 'g-sol', x: 10, y: 40, w: 200, h: 360, label: { en: 'Your side', de: 'Deine Seite' }, tone: 'app' },
        { id: 'g-res', x: 250, y: 20, w: 450, h: 400, label: 'Foundry resource', tone: 'foundry' },
        { id: 'g-proj', x: 270, y: 60, w: 410, h: 124, label: 'Foundry project', tone: 'foundry' },
        { id: 'g-ext', x: 740, y: 40, w: 210, h: 410, label: { en: 'Connected resources', de: 'Verbundene Ressourcen' }, tone: 'data' },
      ],
      nodes: [
        { id: 'n-dev', x: 30, y: 80, w: 160, h: 60, label: { en: 'Developer', de: 'Entwickler:in' }, sub: { en: 'portal · VS Code', de: 'Portal · VS Code' }, tone: 'user', shape: 'actor' },
        { id: 'n-app', x: 30, y: 200, w: 160, h: 60, label: { en: 'App or API', de: 'App oder API' }, sub: { en: 'managed identity', de: 'Managed Identity' }, tone: 'app' },
        { id: 'n-cicd', x: 30, y: 320, w: 160, h: 60, label: { en: 'CI/CD pipeline', de: 'CI/CD-Pipeline' }, sub: 'azd · GitHub Actions', tone: 'app' },
        { id: 'n-ep', x: 290, y: 100, w: 170, h: 64, label: { en: 'Project endpoint', de: 'Project Endpoint' }, sub: '…/api/projects/<name>', tone: 'foundry' },
        { id: 'n-assets', x: 500, y: 100, w: 160, h: 64, label: { en: 'Agents · evals', de: 'Agents · Evals' }, sub: { en: 'files · datasets', de: 'Dateien · Datasets' }, tone: 'foundry' },
        { id: 'n-dep', x: 290, y: 224, w: 170, h: 64, label: { en: 'Model deployments', de: 'Modell-Deployments' }, sub: { en: 'shared by projects', de: 'von Projekten geteilt' }, tone: 'model', shape: 'store' },
        { id: 'n-conn', x: 500, y: 224, w: 160, h: 64, label: { en: 'Connections', de: 'Verbindungen' }, sub: { en: 'resource or project', de: 'Ressource oder Projekt' }, tone: 'foundry' },
        { id: 'n-sec', x: 290, y: 328, w: 170, h: 64, label: 'Governance', sub: { en: 'RBAC · network · CMK', de: 'RBAC · Netzwerk · CMK' }, tone: 'safety' },
        { id: 'n-tools', x: 500, y: 328, w: 160, h: 64, label: 'Foundry Tools', sub: 'Language · Speech · …', tone: 'tool' },
        { id: 'n-search', x: 760, y: 80, w: 170, h: 56, label: 'Azure AI Search', sub: { en: 'indexes · vectors', de: 'Indizes · Vektoren' }, tone: 'data', shape: 'store' },
        { id: 'n-store', x: 760, y: 176, w: 170, h: 56, label: 'Storage · Cosmos DB', sub: { en: 'files · conversations', de: 'Dateien · Konversationen' }, tone: 'data', shape: 'store' },
        { id: 'n-kv', x: 760, y: 272, w: 170, h: 56, label: 'Azure Key Vault', sub: { en: 'connection secrets', de: 'Verbindungsgeheimnisse' }, tone: 'safety' },
        { id: 'n-ai', x: 760, y: 368, w: 170, h: 56, label: 'Application Insights', sub: { en: 'traces · monitoring', de: 'Traces · Monitoring' }, tone: 'data', shape: 'store' },
      ],
      edges: [
        { id: 'e-dev', from: 'n-dev', to: 'n-ep', label: { en: 'build', de: 'bauen' } },
        { id: 'e-app', from: 'n-app', to: 'n-ep', label: { en: 'Entra ID token', de: 'Entra-ID-Token' } },
        { id: 'e-cicd', from: 'n-cicd', to: 'n-sec', label: 'IaC + azd' },
        { id: 'e-ep-assets', from: 'n-ep', to: 'n-assets' },
        { id: 'e-ep-dep', from: 'n-ep', to: 'n-dep', label: 'Responses API' },
        { id: 'e-conn-ext', from: 'n-conn', to: 'g-ext' },
        { id: 'e-assets-store', from: 'n-assets', to: 'n-store', dashed: true, label: { en: 'BYO setup', de: 'BYO-Setup' } },
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
            en: 'Model deployments, resource-level connections and Foundry Tools sit on the resource, so every project reuses them without new IT setup. Some APIs, such as Translator, exist only at this resource scope.',
            de: 'Modell-Deployments, Verbindungen auf Ressourcenebene und Foundry Tools hängen an der Ressource, sodass jedes Projekt sie ohne neues IT-Setup nutzt. Manche APIs, etwa Translator, gibt es nur auf dieser Ressourcenebene.',
          },
          focus: ['n-dep', 'n-conn', 'n-tools'],
        },
        {
          title: { en: 'Projects isolate the work', de: 'Projekte trennen die Arbeit' },
          text: {
            en: 'A project is a subresource and the development boundary: agents, evaluations, files and datasets belong to it. Code reaches them through `https://<resource>.services.ai.azure.com/api/projects/<project>`.',
            de: 'Ein Projekt ist eine Subressource und die Entwicklungsgrenze: Agents, Evaluierungen, Dateien und Datasets gehören dazu. Code erreicht sie über `https://<resource>.services.ai.azure.com/api/projects/<project>`.',
          },
          focus: ['g-proj', 'n-ep', 'n-assets', 'e-ep-assets', 'e-ep-dep'],
        },
        {
          title: { en: 'Everyone signs in with Entra ID', de: 'Alle melden sich mit Entra ID an' },
          text: {
            en: 'Developers use their `az login`, apps use a managed identity. Each identity needs a data-plane role such as **Foundry User**; API keys don\'t work for agents and evaluations.',
            de: 'Entwickler:innen nutzen ihr `az login`, Apps eine Managed Identity. Jede Identität braucht eine Data-Plane-Rolle wie **Foundry User**; API-Keys funktionieren für Agents und Evaluierungen nicht.',
          },
          focus: ['n-dev', 'n-app', 'e-dev', 'e-app'],
        },
        {
          title: { en: 'Data services stay separate', de: 'Datendienste bleiben getrennt' },
          text: {
            en: 'Azure AI Search, Storage, Cosmos DB, Key Vault and Application Insights are independent resources with their own networking and access rules. In a standard agent setup (bring your own, BYO), agent files, vector stores and conversations land there.',
            de: 'Azure AI Search, Storage, Cosmos DB, Key Vault und Application Insights sind eigenständige Ressourcen mit eigenen Netzwerk- und Zugriffsregeln. Im Standard-Agent-Setup (Bring Your Own, BYO) landen Agent-Dateien, Vector Stores und Konversationen dort.',
          },
          focus: ['g-ext', 'e-conn-ext', 'e-assets-store', 'n-search', 'n-store', 'n-kv', 'n-ai'],
        },
        {
          title: { en: 'Automate it', de: 'Automatisieren' },
          text: {
            en: 'Infrastructure as code (Bicep or Terraform) applies the same governance in every environment, and `azd` ships agents from GitHub Actions or Azure DevOps, signing in with OIDC federated credentials instead of secrets.',
            de: 'Infrastructure as Code (Bicep oder Terraform) bringt dieselbe Governance in jede Umgebung, und `azd` liefert Agents aus GitHub Actions oder Azure DevOps aus – angemeldet über OIDC-Federated-Credentials statt Secrets.',
          },
          focus: ['n-cicd', 'e-cicd'],
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
        { id: 's-key', x: 276, y: 40, w: 150, h: 64, label: { en: 'API key', de: 'API-Key' }, sub: { en: 'rejected (keys off)', de: 'abgelehnt (Keys aus)' }, tone: 'neutral' },
        { id: 's-policy', x: 532, y: 40, w: 150, h: 64, label: 'Azure Policy', sub: { en: 'enforces keys off', de: 'erzwingt Keys aus' }, tone: 'safety' },
        { id: 's-app', x: 20, y: 170, w: 150, h: 64, label: { en: 'App in your VNet', de: 'App in deinem VNet' }, sub: { en: 'managed identity', de: 'Managed Identity' }, tone: 'app' },
        { id: 's-pe', x: 276, y: 170, w: 150, h: 64, label: { en: 'Private endpoint', de: 'Private Endpoint' }, sub: { en: 'privatelink DNS zone', de: 'privatelink-DNS-Zone' }, tone: 'safety' },
        { id: 's-res', x: 532, y: 170, w: 150, h: 64, label: 'Foundry resource', sub: { en: 'public access: off', de: 'Public Access: aus' }, tone: 'foundry' },
        { id: 's-rbac', x: 780, y: 167, w: 150, h: 70, label: { en: 'RBAC check', de: 'RBAC-Prüfung' }, sub: 'Foundry User?', tone: 'safety', shape: 'diamond' },
        { id: 's-agent', x: 532, y: 300, w: 150, h: 64, label: { en: 'Agent runtime', de: 'Agent-Laufzeit' }, sub: { en: 'VNet injection', de: 'VNet-Injection' }, tone: 'foundry' },
        { id: 's-byo', x: 780, y: 300, w: 170, h: 64, label: 'Cosmos DB · Storage', sub: { en: '+ AI Search, with CMK', de: '+ AI Search, mit CMK' }, tone: 'data', shape: 'store' },
      ],
      edges: [
        { id: 's-e1', from: 's-app', to: 's-entra', label: { en: 'get token', de: 'Token holen' } },
        { id: 's-e2', from: 's-app', to: 's-pe', label: 'HTTPS + token' },
        { id: 's-e3', from: 's-pe', to: 's-res' },
        { id: 's-e4', from: 's-res', to: 's-rbac', label: 'dataActions?' },
        { id: 's-e5', from: 's-policy', to: 's-res', dashed: true, label: { en: 'enforces', de: 'erzwingt' } },
        { id: 's-e6', from: 's-key', to: 's-res', dashed: true, label: 'HTTP 401' },
        { id: 's-e7', from: 's-res', to: 's-agent', label: { en: 'agents run', de: 'Agents laufen' } },
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
            en: 'With public network access disabled, the only way in is a private endpoint in your VNet. The `privatelink` DNS zone resolves the usual resource name to the private IP, so the connection string stays the same.',
            de: 'Ist der öffentliche Netzwerkzugriff deaktiviert, führt der einzige Weg über einen Private Endpoint in deinem VNet. Die `privatelink`-DNS-Zone löst den gewohnten Ressourcennamen in die private IP auf – der Connection String bleibt gleich.',
          },
          focus: ['s-e2', 's-pe', 's-e3', 's-res'],
        },
        {
          title: { en: 'Authorize every call', de: 'Jeden Aufruf autorisieren' },
          text: {
            en: 'Foundry checks Azure RBAC on each data-plane call. The identity needs a role with data actions: **Foundry User** to build, **Foundry Agent Consumer** to only call agents. A missing role returns HTTP 403.',
            de: 'Foundry prüft bei jedem Data-Plane-Aufruf Azure RBAC. Die Identität braucht eine Rolle mit Data Actions: **Foundry User** zum Bauen, **Foundry Agent Consumer**, um Agents nur aufzurufen. Fehlt die Rolle, kommt HTTP 403.',
          },
          focus: ['s-e4', 's-rbac'],
        },
        {
          title: { en: 'Keys switched off', de: 'Keys abgeschaltet' },
          text: {
            en: 'Set `disableLocalAuth` to `true` once every caller uses tokens; an old key then gets HTTP 401 after the change propagates. A built-in Azure Policy can require disabled key access for all resources in a subscription.',
            de: 'Setze `disableLocalAuth` auf `true`, sobald alle Aufrufer Tokens nutzen; ein alter Key bekommt dann nach der Verteilung HTTP 401. Eine integrierte Azure Policy kann deaktivierten Key-Zugriff für alle Ressourcen eines Abonnements vorschreiben.',
          },
          focus: ['s-key', 's-e6', 's-policy', 's-e5'],
        },
        {
          title: { en: 'A private way out', de: 'Ein privater Weg hinaus' },
          text: {
            en: 'Agents reach your data through VNet injection (a subnet delegated to `Microsoft.App/environments`) or a managed virtual network. With a standard agent setup, conversations, files and vectors land in your own Cosmos DB, Storage and AI Search, where customer-managed keys apply.',
            de: 'Agents erreichen deine Daten über VNet-Injection (ein an `Microsoft.App/environments` delegiertes Subnetz) oder ein verwaltetes virtuelles Netzwerk. Im Standard-Agent-Setup landen Konversationen, Dateien und Vektoren in deinem eigenen Cosmos DB, Storage und AI Search – dort greifen kundenseitig verwaltete Schlüssel.',
          },
          focus: ['s-agent', 's-e7', 's-e8', 's-byo'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Foundry resource',
      text: {
        en: 'The top-level Azure resource (`Microsoft.CognitiveServices/accounts`, kind `AIServices`). It is the governance boundary for networking, encryption, RBAC and policy, and it holds model deployments, Foundry Tools and shared connections. It replaces the former mix of hubs and separate service resources.',
        de: 'Die oberste Azure-Ressource (`Microsoft.CognitiveServices/accounts`, Kind `AIServices`). Sie ist die Governance-Grenze für Netzwerk, Verschlüsselung, RBAC und Policies und enthält Modell-Deployments, Foundry Tools und geteilte Verbindungen. Sie ersetzt die frühere Kombination aus Hubs und separaten Dienst-Ressourcen.',
      },
    },
    {
      term: 'Foundry project',
      text: {
        en: 'A subresource (`accounts/projects`) and the development boundary: agents, evaluations, files and datasets belong to one project and are reached through its project endpoint. Projects reuse the resource\'s deployments and connections and get their own managed identity. Hub-based projects exist only in the Foundry (classic) portal.',
        de: 'Eine Subressource (`accounts/projects`) und die Entwicklungsgrenze: Agents, Evaluierungen, Dateien und Datasets gehören zu einem Projekt und sind über dessen Project Endpoint erreichbar. Projekte nutzen Deployments und Verbindungen der Ressource mit und haben eine eigene Managed Identity. Hub-basierte Projekte gibt es nur noch im Foundry-Portal (classic).',
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
      term: 'Developer surfaces',
      text: {
        en: 'Foundry portal (explore, playgrounds, prompt agents), Foundry SDK `azure-ai-projects` 2.x (project features), OpenAI SDK (portable inference), Foundry Tools SDKs, the Foundry Toolkit for VS Code, the Azure Developer CLI (`azd`) for scaffolding and deploying agents, and the Microsoft Foundry Skill with the Foundry MCP Server for coding agents such as GitHub Copilot.',
        de: 'Foundry-Portal (Erkunden, Playgrounds, Prompt Agents), Foundry SDK `azure-ai-projects` 2.x (Projekt-Features), OpenAI SDK (portable Inferenz), Foundry-Tools-SDKs, das Foundry Toolkit für VS Code, die Azure Developer CLI (`azd`) zum Gerüstbau und Deployen von Agents sowie der Microsoft Foundry Skill mit dem Foundry MCP Server für Coding Agents wie GitHub Copilot.',
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
        en: 'Creating resources, projects, deployments and connections are control-plane `actions`; building agents, running evaluations and calling models are data-plane `dataActions`. Owner, Contributor and **Foundry Account Owner** have no data actions — builders need **Foundry User**, pure callers **Foundry Agent Consumer**.',
        de: 'Ressourcen, Projekte, Deployments und Verbindungen anlegen sind Control-Plane-`actions`; Agents bauen, Evaluierungen ausführen und Modelle aufrufen sind Data-Plane-`dataActions`. Owner, Contributor und **Foundry Account Owner** haben keine Data Actions – wer baut, braucht **Foundry User**, wer nur aufruft, **Foundry Agent Consumer**.',
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
    title: { en: 'Which Foundry building block fits the job?', de: 'Welcher Foundry-Baustein passt zur Aufgabe?' },
    columns: [
      { en: 'You need to …', de: 'Du willst …' },
      { en: 'Start with', de: 'Starte mit' },
      { en: 'Why', de: 'Warum' },
    ],
    rows: [
      [
        { en: 'Send a prompt to a model, no tools', de: 'einen Prompt an ein Modell senden, ohne Tools' },
        { en: 'Model deployment + Responses API', de: 'Modell-Deployment + Responses API' },
        { en: 'Shortest path; add an agent only when you need tools', de: 'Kürzester Weg; ein Agent erst, wenn Tools nötig sind' },
      ],
      [
        { en: 'Run a prebuilt task: invoice fields, transcription, translation, PII, image analysis', de: 'eine Standardaufgabe lösen: Rechnungsfelder, Transkription, Übersetzung, PII, Bildanalyse' },
        'Foundry Tools',
        { en: 'Predictable output and cost, no prompt engineering', de: 'Vorhersehbare Ausgabe und Kosten, kein Prompt Engineering' },
      ],
      [
        { en: 'Ground answers in enterprise content', de: 'Antworten in Unternehmensinhalten verankern' },
        'Foundry IQ (Azure AI Search)',
        { en: 'Agentic retrieval, citations, permission-aware', de: 'Agentic Retrieval, Quellenangaben, berechtigungsbewusst' },
      ],
      [
        { en: 'Build an agent from instructions, model and tools', de: 'einen Agent aus Anweisungen, Modell und Tools bauen' },
        { en: 'Prompt agent', de: 'Prompt Agent' },
        { en: 'No runtime or container to manage', de: 'Keine Laufzeit und kein Container zu verwalten' },
      ],
      [
        { en: 'Run your own agent code (LangGraph, Agent Framework …)', de: 'eigenen Agent-Code ausführen (LangGraph, Agent Framework …)' },
        { en: 'Hosted agent', de: 'Hosted Agent' },
        { en: 'Managed endpoint, scaling and identity for your container', de: 'Verwalteter Endpoint, Skalierung und Identität für deinen Container' },
      ],
      [
        { en: 'Orchestrate several agents and steps', de: 'mehrere Agents und Schritte orchestrieren' },
        'Microsoft Agent Framework',
        { en: 'The portal workflow designer retires on December 1, 2026', de: 'Der Workflow-Designer im Portal wird am 1. Dezember 2026 eingestellt' },
      ],
      [
        { en: 'Extract fields from documents, images, audio and video', de: 'Felder aus Dokumenten, Bildern, Audio und Video extrahieren' },
        'Content Understanding',
        { en: 'One schema, confidence scores and grounding', de: 'Ein Schema, Konfidenzwerte und Grounding' },
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
      en: 'The visual workflow designer in the Foundry portal retires on December 1, 2026 — build new multi-agent workflows with Microsoft Agent Framework and run them as hosted agents.',
      de: 'Der visuelle Workflow-Designer im Foundry-Portal wird am 1. Dezember 2026 eingestellt – baue neue Multi-Agent-Workflows mit Microsoft Agent Framework und betreibe sie als Hosted Agents.',
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
