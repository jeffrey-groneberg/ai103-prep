import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'foundry-chat-app',
  summary: {
    en: 'A chat app needs three decisions before the first line of code: which **endpoint** to call, which **client SDK** to use, and how to **authenticate**. In Microsoft Foundry, every project exposes a *project endpoint* (used by the Foundry SDK) and the resource exposes an *Azure OpenAI v1 endpoint* (used by the OpenAI SDK). Both reach the same model deployments. For generating text, the **Responses API** is the recommended choice for new apps; the **Chat Completions API** remains for compatibility.',
    de: 'Eine Chat-App braucht vor der ersten Codezeile drei Entscheidungen: welcher **Endpoint**, welches **Client-SDK** und welche **Authentifizierung**. In Microsoft Foundry hat jedes Projekt einen *Project Endpoint* (für das Foundry SDK), und die Ressource bietet einen *Azure-OpenAI-v1-Endpoint* (für das OpenAI SDK). Beide erreichen dieselben Modell-Deployments. Für die Textgenerierung ist die **Responses API** die empfohlene Wahl für neue Apps; die **Chat Completions API** bleibt aus Kompatibilitätsgründen.',
  },
  examFocus: {
    en: 'Expect questions that hand you an endpoint URL or a code fragment and ask which client, method or parameter fits: `AIProjectClient` vs `OpenAI`, `get_openai_client()`, `responses.create()` with `instructions`, `previous_response_id`, `temperature` or `max_output_tokens`, and keyless authentication with `DefaultAzureCredential`.',
    de: 'Rechne mit Fragen, die dir eine Endpoint-URL oder ein Codefragment zeigen und nach dem passenden Client, der Methode oder dem Parameter fragen: `AIProjectClient` vs. `OpenAI`, `get_openai_client()`, `responses.create()` mit `instructions`, `previous_response_id`, `temperature` oder `max_output_tokens` sowie schlüssellose Anmeldung mit `DefaultAzureCredential`.',
  },
  diagrams: [
    {
      id: 'foundry-endpoints',
      title: { en: 'Two endpoints, two SDKs, one set of deployments', de: 'Zwei Endpoints, zwei SDKs, dieselben Deployments' },
      caption: {
        en: 'The Foundry SDK talks to the project endpoint; the OpenAI SDK talks to the Azure OpenAI v1 endpoint. Only the project route unlocks agents, evaluations and tracing.',
        de: 'Das Foundry SDK spricht mit dem Project Endpoint, das OpenAI SDK mit dem Azure-OpenAI-v1-Endpoint. Nur der Projektweg öffnet Agents, Evaluierungen und Tracing.',
      },
      width: 960,
      height: 450,
      groups: [
        { id: 'g-app', x: 10, y: 40, w: 290, h: 380, label: { en: 'Your app (Python)', de: 'Deine App (Python)' }, tone: 'app' },
        { id: 'g-res', x: 340, y: 20, w: 610, h: 410, label: 'Foundry resource', tone: 'foundry' },
        { id: 'g-proj', x: 360, y: 56, w: 300, h: 224, label: 'Foundry project', tone: 'foundry' },
      ],
      nodes: [
        { id: 'sdkF', x: 35, y: 120, w: 240, h: 70, label: 'Foundry SDK', sub: 'AIProjectClient', tone: 'app' },
        { id: 'sdkO', x: 35, y: 300, w: 240, h: 70, label: 'OpenAI SDK', sub: 'OpenAI(base_url=…/v1/)', tone: 'app' },
        { id: 'epP', x: 385, y: 100, w: 250, h: 60, label: 'Project endpoint', sub: '…/api/projects/<project>', tone: 'foundry' },
        { id: 'feat', x: 385, y: 200, w: 250, h: 60, label: 'Agents · evals · tracing', sub: { en: 'project features', de: 'Projekt-Features' }, tone: 'foundry' },
        { id: 'epA', x: 385, y: 330, w: 250, h: 64, label: 'Azure OpenAI endpoint', sub: '…openai.azure.com/openai/v1/', tone: 'foundry' },
        { id: 'dep', x: 715, y: 190, w: 210, h: 74, label: 'Model deployments', sub: 'gpt-4.1 · DeepSeek · …', tone: 'model', shape: 'store' },
      ],
      edges: [
        { id: 'e-f-p', from: 'sdkF', to: 'epP', label: 'Entra ID' },
        { id: 'e-o-a', from: 'sdkO', to: 'epA', label: { en: 'token or key', de: 'Token oder Key' } },
        { id: 'e-p-d', from: 'epP', to: 'dep', label: 'Responses API' },
        { id: 'e-a-d', from: 'epA', to: 'dep', label: 'Responses · Chat' },
        { id: 'e-p-f', from: 'epP', to: 'feat' },
      ],
      steps: [
        {
          title: { en: 'Pick a client', de: 'Client wählen' },
          text: {
            en: 'Your code sends prompts through an OpenAI-compatible client. You get that client either from the Foundry SDK (`azure-ai-projects`) or directly from the OpenAI SDK (`openai`).',
            de: 'Dein Code schickt Prompts über einen OpenAI-kompatiblen Client. Den bekommst du entweder aus dem Foundry SDK (`azure-ai-projects`) oder direkt aus dem OpenAI SDK (`openai`).',
          },
          focus: ['sdkF', 'sdkO'],
        },
        {
          title: { en: 'Foundry SDK → project endpoint', de: 'Foundry SDK → Project Endpoint' },
          text: {
            en: '`AIProjectClient` connects to `https://<resource>.services.ai.azure.com/api/projects/<project>` with a Microsoft Entra ID credential. `get_openai_client()` hands you the chat client.',
            de: '`AIProjectClient` verbindet sich mit `https://<resource>.services.ai.azure.com/api/projects/<project>` über eine Microsoft-Entra-ID-Anmeldung. `get_openai_client()` liefert dir den Chat-Client.',
          },
          focus: ['sdkF', 'e-f-p', 'epP'],
        },
        {
          title: { en: 'OpenAI SDK → v1 endpoint', de: 'OpenAI SDK → v1-Endpoint' },
          text: {
            en: 'The plain `OpenAI()` client sets `base_url` to `https://<resource>.openai.azure.com/openai/v1/`. It authenticates with an Entra token provider (scope `https://ai.azure.com/.default`) or, less securely, an API key.',
            de: 'Der einfache `OpenAI()`-Client setzt `base_url` auf `https://<resource>.openai.azure.com/openai/v1/`. Er authentifiziert sich über einen Entra-Token-Provider (Scope `https://ai.azure.com/.default`) oder, weniger sicher, mit einem API-Key.',
          },
          focus: ['sdkO', 'e-o-a', 'epA'],
        },
        {
          title: { en: 'Same deployments', de: 'Dieselben Deployments' },
          text: {
            en: 'Both routes reach the same model deployments. In `responses.create(model=...)` the `model` value is your **deployment name**.',
            de: 'Beide Wege erreichen dieselben Modell-Deployments. In `responses.create(model=...)` ist `model` der **Name deines Deployments**.',
          },
          focus: ['e-p-d', 'e-a-d', 'dep'],
        },
        {
          title: { en: 'Project-only features', de: 'Nur über das Projekt' },
          text: {
            en: 'Agents, evaluations, tracing, connections and datasets live in the project. Only the project client gives you access to them — the OpenAI SDK covers the OpenAI API surface (models, files, fine-tuning) but no project features.',
            de: 'Agents, Evaluierungen, Tracing, Verbindungen und Datasets leben im Projekt. Nur der Projekt-Client gibt dir Zugriff darauf – das OpenAI SDK deckt die OpenAI-API ab (Modelle, Dateien, Fine-Tuning), aber keine Projekt-Features.',
          },
          focus: ['epP', 'e-p-f', 'feat'],
        },
      ],
    },
    {
      id: 'responses-state',
      title: { en: 'How the Responses API keeps a conversation going', de: 'Wie die Responses API ein Gespräch fortführt' },
      caption: {
        en: 'Each call returns an id. Passing it as previous_response_id on the next call carries the earlier turns forward — and their tokens.',
        de: 'Jeder Aufruf liefert eine ID. Als previous_response_id im nächsten Aufruf übergeben, trägt sie die früheren Runden weiter – samt ihrer Tokens.',
      },
      width: 960,
      height: 280,
      nodes: [
        { id: 'u1', x: 10, y: 30, w: 160, h: 60, label: { en: 'User turn 1', de: 'Nutzer, Runde 1' }, tone: 'user', shape: 'actor' },
        { id: 'c1', x: 215, y: 30, w: 210, h: 60, label: 'responses.create', sub: 'input + instructions', tone: 'app' },
        { id: 'r1', x: 470, y: 30, w: 180, h: 60, label: 'Response A', sub: 'id: resp_A', tone: 'model' },
        { id: 'u2', x: 10, y: 180, w: 160, h: 60, label: { en: 'User turn 2', de: 'Nutzer, Runde 2' }, tone: 'user', shape: 'actor' },
        { id: 'c2', x: 215, y: 180, w: 250, h: 60, label: 'responses.create', sub: 'previous_response_id=resp_A', tone: 'app' },
        { id: 'r2', x: 510, y: 180, w: 180, h: 60, label: 'Response B', sub: { en: 'knows turn 1', de: 'kennt Runde 1' }, tone: 'model' },
        { id: 'st', x: 735, y: 100, w: 205, h: 64, label: { en: 'Stored responses', de: 'Gespeicherte Antworten' }, sub: { en: 'retained 30 days', de: '30 Tage gespeichert' }, tone: 'data', shape: 'store' },
      ],
      edges: [
        { id: 'a1', from: 'u1', to: 'c1' },
        { id: 'a2', from: 'c1', to: 'r1' },
        { id: 'a3', from: 'r1', to: 'c2', label: 'resp_A' },
        { id: 'a4', from: 'u2', to: 'c2' },
        { id: 'a5', from: 'c2', to: 'r2' },
        { id: 'a6', from: 'r1', to: 'st', dashed: true },
        { id: 'a7', from: 'r2', to: 'st', dashed: true },
      ],
      steps: [
        {
          title: { en: 'First turn', de: 'Erste Runde' },
          text: {
            en: 'The app sends `input` (the user message) plus `instructions` (the system prompt). The response carries `output_text`, an `id` and `usage` token counts.',
            de: 'Die App sendet `input` (die Nutzernachricht) plus `instructions` (den Systemprompt). Die Antwort enthält `output_text`, eine `id` und die Token-Zahlen in `usage`.',
          },
          focus: ['u1', 'a1', 'c1', 'a2', 'r1'],
        },
        {
          title: { en: 'Chain the next turn', de: 'Nächste Runde verketten' },
          text: {
            en: 'For the follow-up, pass only the new message and set `previous_response_id` to the last response id. The service supplies the earlier context.',
            de: 'Für die Folgefrage übergibst du nur die neue Nachricht und setzt `previous_response_id` auf die letzte Antwort-ID. Den früheren Kontext ergänzt der Dienst.',
          },
          focus: ['a3', 'u2', 'a4', 'c2'],
        },
        {
          title: { en: 'Answer with context', de: 'Antwort mit Kontext' },
          text: {
            en: 'Response B can refer to turn 1. Remember: the earlier turns still count as input tokens on every call — chaining is convenient, not cheaper.',
            de: 'Antwort B kann sich auf Runde 1 beziehen. Aber: Die früheren Runden zählen bei jedem Aufruf weiter als Input-Tokens – Verkettung ist bequem, nicht billiger.',
          },
          focus: ['a5', 'r2'],
        },
        {
          title: { en: 'Stored server-side', de: 'Serverseitig gespeichert' },
          text: {
            en: 'Responses are stored (30 days by default), so `responses.retrieve(id)` can fetch an earlier answer. Alternatively you manage the history yourself as an `input` list.',
            de: 'Antworten werden gespeichert (standardmäßig 30 Tage), daher holt `responses.retrieve(id)` eine frühere Antwort zurück. Alternativ verwaltest du den Verlauf selbst als `input`-Liste.',
          },
          focus: ['a6', 'a7', 'st'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Project endpoint',
      text: {
        en: 'URL of a Foundry project, shaped `https://<resource>.services.ai.azure.com/api/projects/<project>`. You pass it to `AIProjectClient`; it is the entry point for models, agents, evaluations and tracing.',
        de: 'URL eines Foundry-Projekts im Format `https://<resource>.services.ai.azure.com/api/projects/<project>`. Du übergibst sie an `AIProjectClient`; sie ist der Einstieg für Modelle, Agents, Evaluierungen und Tracing.',
      },
    },
    {
      term: 'Azure OpenAI v1 endpoint',
      text: {
        en: '`https://<resource>.openai.azure.com/openai/v1/` — a stable route for the plain `OpenAI()` client without monthly `api-version` parameters. `AzureOpenAI()` is only needed when you must pin a specific API version.',
        de: '`https://<resource>.openai.azure.com/openai/v1/` – eine stabile Route für den einfachen `OpenAI()`-Client ohne monatliche `api-version`-Parameter. `AzureOpenAI()` brauchst du nur, wenn du eine bestimmte API-Version festnageln musst.',
      },
    },
    {
      term: 'Responses API',
      text: {
        en: 'The recommended API for new chat apps. It unifies the older Chat Completions and Assistants patterns, keeps state via `previous_response_id` or conversations, and works with Azure OpenAI models and with Foundry Models sold by Azure that support it, such as DeepSeek, Llama or Grok.',
        de: 'Die empfohlene API für neue Chat-Apps. Sie vereint die älteren Muster von Chat Completions und Assistants, hält den Zustand über `previous_response_id` oder Conversations und funktioniert mit Azure-OpenAI-Modellen sowie mit von Azure verkauften Foundry Models, die sie unterstützen, etwa DeepSeek, Llama oder Grok.',
      },
    },
    {
      term: 'Chat Completions API',
      text: {
        en: 'The established, stateless API: you send the full `messages` list with `system`, `user` and `assistant` roles on every call. Widely compatible across models and tools.',
        de: 'Die etablierte, zustandslose API: Du schickst bei jedem Aufruf die komplette `messages`-Liste mit den Rollen `system`, `user` und `assistant`. Breit kompatibel über Modelle und Tools hinweg.',
      },
    },
    {
      term: 'Keyless authentication',
      text: {
        en: '`DefaultAzureCredential` picks up your `az login`, a managed identity or another Entra ID source. The identity needs a data-plane role on the resource, for example **Foundry User**. Keys belong in Azure Key Vault if you must use them.',
        de: '`DefaultAzureCredential` nutzt dein `az login`, eine Managed Identity oder eine andere Entra-ID-Quelle. Die Identität braucht eine Data-Plane-Rolle auf der Ressource, zum Beispiel **Foundry User**. Wenn Keys nötig sind, gehören sie in Azure Key Vault.',
      },
    },
    {
      term: 'Generation parameters',
      text: {
        en: '`instructions` set the system prompt, `temperature` (0–2) or `top_p` control randomness, `max_output_tokens` caps the answer length and `stream=True` returns incremental events for responsive UIs.',
        de: '`instructions` setzt den Systemprompt, `temperature` (0–2) oder `top_p` steuern die Zufälligkeit, `max_output_tokens` begrenzt die Antwortlänge und `stream=True` liefert schrittweise Events für reaktionsschnelle Oberflächen.',
      },
    },
    {
      term: 'Model playground',
      text: {
        en: 'The portal page you land on after deploying a model. Try system prompts and parameters (temperature, top_p, max tokens), add tools such as web search or code interpreter, compare up to three models side by side, then export a ready-to-run sample from the **Code** tab.',
        de: 'Die Portalseite, auf der du nach dem Bereitstellen eines Modells landest. Probiere Systemprompts und Parameter (Temperatur, top_p, Max Tokens), füge Tools wie Websuche oder Code Interpreter hinzu, vergleiche bis zu drei Modelle nebeneinander und exportiere dann über den Tab **Code** ein lauffähiges Beispiel.',
      },
    },
  ],
  comparison: {
    title: { en: 'Foundry SDK or OpenAI SDK?', de: 'Foundry SDK oder OpenAI SDK?' },
    columns: [
      { en: 'Aspect', de: 'Aspekt' },
      { en: 'Foundry SDK (azure-ai-projects)', de: 'Foundry SDK (azure-ai-projects)' },
      { en: 'OpenAI SDK (openai)', de: 'OpenAI SDK (openai)' },
    ],
    rows: [
      [{ en: 'Endpoint', de: 'Endpoint' }, 'Project endpoint', 'Azure OpenAI v1 endpoint'],
      [{ en: 'Client', de: 'Client' }, 'AIProjectClient → get_openai_client()', 'OpenAI(base_url=…/openai/v1/)'],
      [
        { en: 'Agents, evaluations, tracing', de: 'Agents, Evaluierungen, Tracing' },
        { en: 'Yes', de: 'Ja' },
        { en: 'No — OpenAI API only', de: 'Nein – nur OpenAI-API' },
      ],
      [
        { en: 'Best for', de: 'Ideal für' },
        { en: 'Apps that use project features', de: 'Apps mit Projekt-Features' },
        { en: 'Portable OpenAI-compatible code', de: 'Portablen OpenAI-kompatiblen Code' },
      ],
      [
        { en: 'Recommended auth', de: 'Empfohlene Anmeldung' },
        'DefaultAzureCredential',
        { en: 'Entra token provider (or key)', de: 'Entra-Token-Provider (oder Key)' },
      ],
    ],
  },
  code: [
    {
      title: { en: 'Foundry SDK: multi-turn chat with the Responses API', de: 'Foundry SDK: mehrstufiger Chat mit der Responses API' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

project = AIProjectClient(
    endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
    credential=DefaultAzureCredential(),
)
openai = project.get_openai_client()

first = openai.responses.create(
    model="gpt-4.1",                      # your deployment name
    instructions="You are a concise Azure tutor.",
    input="What is a Foundry project?",
)
follow_up = openai.responses.create(
    model="gpt-4.1",
    instructions="You are a concise Azure tutor.",
    input="How do I connect to it from Python?",
    previous_response_id=first.id,        # carries turn 1 forward
    max_output_tokens=300,
)
print(follow_up.output_text, follow_up.usage.total_tokens)`,
      notes: [
        { en: '`get_openai_client()` returns an OpenAI-compatible client bound to the project.', de: '`get_openai_client()` liefert einen OpenAI-kompatiblen Client, der an das Projekt gebunden ist.' },
        { en: '`previous_response_id` chains turns without resending the history yourself.', de: '`previous_response_id` verkettet Runden, ohne dass du den Verlauf selbst erneut sendest.' },
      ],
    },
    {
      title: { en: 'OpenAI SDK: keyless Chat Completions on the v1 endpoint', de: 'OpenAI SDK: schlüssellose Chat Completions am v1-Endpoint' },
      code: `from openai import OpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

token_provider = get_bearer_token_provider(
    DefaultAzureCredential(), "https://ai.azure.com/.default"
)
client = OpenAI(
    base_url="https://<resource>.openai.azure.com/openai/v1/",
    api_key=token_provider,
)

completion = client.chat.completions.create(
    model="gpt-4.1",
    messages=[
        {"role": "system", "content": "You are a concise Azure tutor."},
        {"role": "user", "content": "Explain tokens in one sentence."},
    ],
)
print(completion.choices[0].message.content)`,
      notes: [
        { en: 'The token provider replaces an API key; no secret lives in code.', de: 'Der Token-Provider ersetzt einen API-Key; kein Geheimnis steht im Code.' },
        { en: 'Chat Completions is stateless: you resend the whole `messages` list each turn.', de: 'Chat Completions ist zustandslos: Du sendest in jeder Runde die ganze `messages`-Liste.' },
      ],
    },
  ],
  traps: [
    {
      en: '`AIProjectClient` needs the **project endpoint** (`services.ai.azure.com/api/projects/…`), not the `openai.azure.com` URL.',
      de: '`AIProjectClient` braucht den **Project Endpoint** (`services.ai.azure.com/api/projects/…`), nicht die `openai.azure.com`-URL.',
    },
    {
      en: 'The `model` argument is the **deployment name** you chose, which may differ from the catalog model name.',
      de: 'Das Argument `model` ist der **Deployment-Name**, den du vergeben hast – er kann vom Modellnamen im Katalog abweichen.',
    },
    {
      en: '`previous_response_id` does not reduce cost: earlier turns are still billed as input tokens.',
      de: '`previous_response_id` senkt keine Kosten: Frühere Runden werden weiterhin als Input-Tokens berechnet.',
    },
    {
      en: 'Agents, evaluations and tracing are not available through the plain OpenAI SDK — choose the Foundry SDK when a scenario needs them.',
      de: 'Agents, Evaluierungen und Tracing gibt es nicht über das reine OpenAI SDK – wähle das Foundry SDK, wenn ein Szenario sie braucht.',
    },
  ],
  takeaways: [
    { en: 'New chat apps: Responses API first; Chat Completions for compatibility.', de: 'Neue Chat-Apps: zuerst Responses API; Chat Completions für Kompatibilität.' },
    { en: 'Production apps authenticate with Microsoft Entra ID, not keys.', de: 'Produktive Apps melden sich mit Microsoft Entra ID an, nicht mit Keys.' },
    { en: 'Project endpoint + Foundry SDK = models plus agents, evaluations and tracing.', de: 'Project Endpoint + Foundry SDK = Modelle plus Agents, Evaluierungen und Tracing.' },
    { en: 'Stream long answers (`stream=True`) so the UI never looks frozen.', de: 'Lange Antworten streamen (`stream=True`), damit die Oberfläche nie einfriert.' },
  ],
  sources: [
    { title: 'Quickstart: Get started with Microsoft Foundry SDK', url: 'https://learn.microsoft.com/en-us/azure/foundry/quickstarts/get-started-code' },
    { title: 'Use the Azure OpenAI Responses API', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses' },
    { title: 'What is Microsoft Foundry?', url: 'https://learn.microsoft.com/en-us/azure/foundry/what-is-foundry' },
    { title: 'Role-based access control for Microsoft Foundry', url: 'https://learn.microsoft.com/en-us/azure/foundry/concepts/rbac-foundry' },
    { title: 'Microsoft Foundry Playgrounds', url: 'https://learn.microsoft.com/en-us/azure/foundry/concepts/concept-playgrounds' },
  ],
}
