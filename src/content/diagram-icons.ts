/**
 * Official Azure Architecture Icons (Azure Public Service Icons V25, November 2026) used in the lesson diagrams.
 * Source: https://learn.microsoft.com/azure/architecture/icons/ — Microsoft permits their use in architectural
 * diagrams, training materials and documentation; the files in src/assets/azure-icons/<id>.svg are unaltered copies.
 * Every diagram node names one of these ids; product nodes use the product icon, general building blocks use the
 * general icons of the same set.
 */
export const DIAGRAM_ICONS = {
  "ai-search": { name: "Azure AI Search", source: "ai + machine learning/10044-icon-service-Cognitive-Search.svg" },
  "api-connections": { name: "API Connections", source: "web/10048-icon-service-API-Connections.svg" },
  "app-insights": { name: "Application Insights", source: "monitor/00012-icon-service-Application-Insights.svg" },
  "app-registration": { name: "App Registrations", source: "identity/10232-icon-service-App-Registrations.svg" },
  "app-service": { name: "App Services", source: "web/10035-icon-service-App-Services.svg" },
  "azure-openai": { name: "Azure OpenAI", source: "ai + machine learning/03438-icon-service-Azure-OpenAI.svg" },
  "bot-service": { name: "Bot Services", source: "ai + machine learning/10165-icon-service-Bot-Services.svg" },
  "branch": { name: "Branch (general)", source: "general/10782-icon-service-Branch.svg" },
  "browser": { name: "Browser (general)", source: "general/10783-icon-service-Browser.svg" },
  "builds": { name: "Builds (general)", source: "general/10785-icon-service-Builds.svg" },
  "code": { name: "Code (general)", source: "general/10787-icon-service-Code.svg" },
  "conditional-access": { name: "Conditional Access", source: "security/10233-icon-service-Conditional-Access.svg" },
  "container-apps": { name: "Container Apps Environments", source: "other/02989-icon-service-Container-Apps-Environments.svg" },
  "content-safety": { name: "Content Safety", source: "ai + machine learning/03390-icon-service-Content-Safety.svg" },
  "cosmos-db": { name: "Azure Cosmos DB", source: "databases/10121-icon-service-Azure-Cosmos-DB.svg" },
  "document-intelligence": { name: "Document Intelligence (Form Recognizers)", source: "ai + machine learning/00819-icon-service-Form-Recognizers.svg" },
  "entra-roles": { name: "Entra Roles and Administrators", source: "identity/10340-icon-service-Entra-Identity-Roles-and-Administrators.svg" },
  "error": { name: "Error (general)", source: "general/10798-icon-service-Error.svg" },
  "file": { name: "File (general)", source: "general/10800-icon-service-File.svg" },
  "files": { name: "Files (general)", source: "general/10801-icon-service-Files.svg" },
  "foundry": { name: "Microsoft Foundry", source: "ai + machine learning/035746832-icon-service-AI-Foundry.svg" },
  "foundry-agent-service": { name: "Foundry Agent Service", source: "ai + machine learning/038470523-icon-service-Foundry-Agent-Service.svg" },
  "foundry-iq": { name: "Foundry IQ", source: "ai + machine learning/038470497-icon-service-Azure-AI-Foundry-IQ.svg" },
  "foundry-models": { name: "Foundry Models", source: "ai + machine learning/038470614-icon-service-Foundry-Models.svg" },
  "foundry-project": { name: "Foundry Project", source: "ai + machine learning/036509415-icon-service-Foundry-Project.svg" },
  "foundry-tools": { name: "Foundry Tools (Azure AI services)", source: "ai + machine learning/10162-icon-service-Cognitive-Services.svg" },
  "functions": { name: "Function Apps", source: "compute/10029-icon-service-Function-Apps.svg" },
  "gear": { name: "Gear (general)", source: "general/10805-icon-service-Gear.svg" },
  "globe": { name: "Globe (general)", source: "general/10808-icon-service-Globe-Success.svg" },
  "guide": { name: "Guide (general)", source: "general/10810-icon-service-Guide.svg" },
  "image": { name: "Image (general)", source: "general/10812-icon-service-Image.svg" },
  "key-vault": { name: "Key Vaults", source: "security/10245-icon-service-Key-Vaults.svg" },
  "language": { name: "Azure Language", source: "ai + machine learning/02876-icon-service-Language.svg" },
  "managed-identity": { name: "Managed Identities", source: "identity/10227-icon-service-Managed-Identities.svg" },
  "management-portal": { name: "Management Portal (general)", source: "general/10820-icon-service-Management-Portal.svg" },
  "media": { name: "Media File (general)", source: "general/10821-icon-service-Media-File.svg" },
  "metrics": { name: "Metrics", source: "monitor/00020-icon-service-Metrics.svg" },
  "mobile": { name: "Mobile (general)", source: "general/10822-icon-service-Mobile.svg" },
  "monitor": { name: "Azure Monitor", source: "monitor/00001-icon-service-Monitor.svg" },
  "policy": { name: "Azure Policy", source: "management + governance/10316-icon-service-Policy.svg" },
  "private-endpoint": { name: "Private Endpoints", source: "other/02579-icon-service-Private-Endpoints.svg" },
  "resource-linked": { name: "Resource Linked (general)", source: "general/10831-icon-service-Resource-Linked.svg" },
  "scheduler": { name: "Scheduler (general)", source: "general/10833-icon-service-Scheduler.svg" },
  "search": { name: "Search (general)", source: "general/10834-icon-service-Search.svg" },
  "search-grid": { name: "Search Grid (general)", source: "general/10856-icon-service-Search-Grid.svg" },
  "server-farm": { name: "Server Farm (general)", source: "general/10835-icon-service-Server-Farm.svg" },
  "speech": { name: "Azure Speech", source: "ai + machine learning/00797-icon-service-Speech-Services.svg" },
  "storage": { name: "Storage Accounts", source: "storage/10086-icon-service-Storage-Accounts.svg" },
  "storage-container": { name: "Storage Container (general)", source: "general/10839-icon-service-Storage-Container.svg" },
  "storage-queue": { name: "Storage Queue (general)", source: "general/10840-icon-service-Storage-Queue.svg" },
  "table": { name: "Table (general)", source: "general/10841-icon-service-Table.svg" },
  "toolbox": { name: "Toolbox (general)", source: "general/10844-icon-service-Toolbox.svg" },
  "translator": { name: "Azure Translator", source: "ai + machine learning/00800-icon-service-Translator-Text.svg" },
  "users": { name: "Users", source: "identity/10230-icon-service-Users.svg" },
  "workflow": { name: "Workflow (general)", source: "general/10852-icon-service-Workflow.svg" },
} as const satisfies Record<string, { name: string; source: string }>

export type DiagramIconId = keyof typeof DIAGRAM_ICONS

export function isDiagramIcon(id: unknown): id is DiagramIconId {
  return typeof id === "string" && Object.hasOwn(DIAGRAM_ICONS, id)
}
