import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'speech-mcp-agent',
  summary: {
    en: 'The **Azure Speech MCP server** (preview) packages Azure Speech in Foundry Tools as two tools that any MCP-capable agent can call: **speech to text** (recognize) and **text to speech** (synthesize). You add it to a Foundry agent from the tool catalog and supply your Foundry resource name, its key and a Blob container SAS URL; from then on the agent’s model decides by itself when a prompt needs a transcription or spoken audio. Audio never travels inside the chat: the tool reads input audio from a public or SAS URL and writes generated speech as a WAV file into your container, and the agent replies with a link. A client app talks to the agent through the Responses API and approves tool calls when required.',
    de: 'Der **Azure Speech MCP Server** (Preview) verpackt Azure Speech in Foundry Tools als zwei Tools, die jeder MCP-fähige Agent aufrufen kann: **Speech to Text** (recognize) und **Text to Speech** (synthesize). Du fügst ihn einem Foundry-Agent aus dem Tool-Katalog hinzu und gibst den Namen deiner Foundry-Ressource, ihren Key und eine SAS-URL für einen Blob-Container an; danach entscheidet das Modell des Agents selbst, wann ein Prompt eine Transkription oder gesprochenes Audio braucht. Audio reist nie im Chat: Das Tool liest Eingabeaudio von einer öffentlichen URL oder SAS-URL und schreibt erzeugte Sprache als WAV-Datei in deinen Container, und der Agent antwortet mit einem Link. Eine Client-App spricht über die Responses API mit dem Agent und gibt Tool-Aufrufe frei, wenn das nötig ist.',
  },
  examFocus: {
    en: 'Expect questions on the connection setup (`foundry-resource-name`, the `Bearer` key, an `X-Blob-Container-Url` SAS URL with read and write permissions), the storage behavior (SAS or public URL in, WAV link out), the prerequisites (a tool-calling model, MCP support in the resource), MCP concepts (dynamic tool discovery, `require_approval`, `allowed_tools`, approvals in the same conversation) and how a client app invokes the agent with `responses.create()`.',
    de: 'Rechne mit Fragen zur Verbindungseinrichtung (`foundry-resource-name`, der `Bearer`-Key, eine SAS-URL in `X-Blob-Container-Url` mit Lese- und Schreibrechten), zum Speicherverhalten (SAS- oder öffentliche URL rein, WAV-Link raus), zu den Voraussetzungen (ein Modell mit Tool Calling, MCP-Unterstützung der Ressource), zu MCP-Konzepten (dynamische Tool-Erkennung, `require_approval`, `allowed_tools`, Freigaben in derselben Konversation) und dazu, wie eine Client-App den Agent mit `responses.create()` aufruft.',
  },
  diagrams: [
    {
      id: 'speech-mcp-flow',
      title: { en: 'How a Foundry agent uses the Azure Speech MCP server', de: 'Wie ein Foundry-Agent den Azure Speech MCP Server nutzt' },
      caption: {
        en: 'The agent decides when to call the speech tools; audio files flow through Blob Storage, not through the chat.',
        de: 'Der Agent entscheidet, wann er die Sprach-Tools aufruft; Audiodateien laufen über den Blob Storage, nicht über den Chat.',
      },
      width: 960,
      height: 440,
      groups: [
        { id: 'g-proj', x: 230, y: 25, w: 220, h: 260, label: { en: 'Foundry project', de: 'Foundry-Projekt' }, tone: 'foundry' },
        { id: 'g-res', x: 765, y: 70, w: 190, h: 304, label: { en: 'Foundry resource', de: 'Foundry-Ressource' }, tone: 'foundry' },
      ],
      nodes: [
        { id: 'user', x: 20, y: 60, w: 130, h: 64, label: { en: 'User', de: 'Nutzer' }, sub: { en: 'asks in chat', de: 'fragt im Chat' }, tone: 'user', shape: 'actor' },
        { id: 'client', x: 20, y: 200, w: 140, h: 64, label: { en: 'Client app', de: 'Client-App' }, sub: 'responses.create()', tone: 'app' },
        { id: 'approval', x: 250, y: 60, w: 180, h: 64, label: { en: 'Tool approval', de: 'Tool-Freigabe' }, sub: 'mcp_approval_request', tone: 'safety', shape: 'pill' },
        { id: 'agent', x: 250, y: 200, w: 180, h: 64, label: { en: 'Speech agent', de: 'Speech-Agent' }, sub: { en: 'prompt agent · gpt-4.1', de: 'Prompt Agent · gpt-4.1' }, tone: 'foundry' },
        { id: 'mcp', x: 520, y: 200, w: 200, h: 64, label: { en: 'Azure Speech MCP server', de: 'Azure Speech MCP Server' }, sub: { en: 'remote MCP · preview', de: 'Remote-MCP · Preview' }, tone: 'tool' },
        { id: 'stt', x: 785, y: 110, w: 150, h: 64, label: { en: 'Speech to text', de: 'Speech to Text' }, sub: 'recognize', tone: 'foundry' },
        { id: 'tts', x: 785, y: 290, w: 150, h: 64, label: { en: 'Text to speech', de: 'Text to Speech' }, sub: 'synthesize', tone: 'foundry' },
        { id: 'blob', x: 520, y: 340, w: 200, h: 64, label: { en: 'Blob container', de: 'Blob-Container' }, sub: { en: 'SAS URL · WAV files', de: 'SAS-URL · WAV-Dateien' }, tone: 'data', shape: 'store' },
      ],
      edges: [
        { id: 'm1', from: 'user', to: 'client', label: { en: 'prompt', de: 'Prompt' } },
        { id: 'm2', from: 'client', to: 'agent', label: 'agent_name' },
        { id: 'm3', from: 'agent', to: 'mcp', label: { en: 'tool call', de: 'Tool-Aufruf' } },
        { id: 'm4', from: 'agent', to: 'approval', dashed: true },
        { id: 'm5', from: 'approval', to: 'client', label: { en: 'approve?', de: 'freigeben?' } },
        { id: 'm6', from: 'mcp', to: 'stt' },
        { id: 'm7', from: 'mcp', to: 'tts' },
        { id: 'm8', from: 'mcp', to: 'blob', label: { en: 'audio files', de: 'Audiodateien' }, bidir: true },
      ],
      steps: [
        {
          title: { en: 'Ask in plain language', de: 'In normaler Sprache fragen' },
          text: {
            en: 'The user simply says what they need — “transcribe this call” or “read this aloud”. The client app sends the prompt to the agent with `responses.create()`; no speech code lives in the app.',
            de: 'Der Nutzer sagt einfach, was er braucht – „transkribiere diesen Anruf“ oder „lies das vor“. Die Client-App schickt den Prompt mit `responses.create()` an den Agent; in der App steckt kein Sprachcode.',
          },
          focus: ['user', 'm1', 'client', 'm2', 'agent'],
        },
        {
          title: { en: 'Discover tools at runtime', de: 'Tools zur Laufzeit entdecken' },
          text: {
            en: 'Over MCP, the agent receives the server’s tool catalog with descriptions. Its model matches the request to *recognize* or *synthesize* — no routing logic in your code, and new tools appear without changing the agent.',
            de: 'Über MCP erhält der Agent den Tool-Katalog des Servers samt Beschreibungen. Sein Modell ordnet die Anfrage *recognize* oder *synthesize* zu – ohne Routing-Logik in deinem Code, und neue Tools erscheinen, ohne den Agent zu ändern.',
          },
          focus: ['agent', 'm3', 'mcp'],
        },
        {
          title: { en: 'Approve the tool call', de: 'Tool-Aufruf freigeben' },
          text: {
            en: 'With `require_approval="always"` (the default) the response carries an `mcp_approval_request`. The app reviews the tool and its arguments and answers with an `mcp_approval_response` in the same conversation.',
            de: 'Mit `require_approval="always"` (Standard) enthält die Antwort einen `mcp_approval_request`. Die App prüft Tool und Argumente und antwortet in derselben Konversation mit einer `mcp_approval_response`.',
          },
          focus: ['approval', 'm4', 'm5'],
        },
        {
          title: { en: 'Azure Speech does the work', de: 'Azure Speech erledigt die Arbeit' },
          text: {
            en: 'The MCP server calls Azure Speech in your Foundry resource, authenticated with the resource key from the `Bearer` field. Prompts can ask for a language, phrase hints, profanity handling or a voice such as `en-GB-SoniaNeural`.',
            de: 'Der MCP-Server ruft Azure Speech in deiner Foundry-Ressource auf, authentifiziert mit dem Ressourcen-Key aus dem Feld `Bearer`. Prompts können eine Sprache, Phrasenhinweise, den Umgang mit Schimpfwörtern oder eine Stimme wie `en-GB-SoniaNeural` anfordern.',
          },
          focus: ['mcp', 'm6', 'm7', 'g-res', 'stt', 'tts'],
        },
        {
          title: { en: 'Audio lives in Blob Storage', de: 'Audio liegt im Blob Storage' },
          text: {
            en: 'Speech to text reads audio from a public or SAS URL. Text to speech writes a WAV file into the container from `X-Blob-Container-Url` (read and write SAS), and the agent replies with a link to it.',
            de: 'Speech to Text liest Audio von einer öffentlichen URL oder SAS-URL. Text to Speech schreibt eine WAV-Datei in den Container aus `X-Blob-Container-Url` (SAS mit Lese- und Schreibrechten), und der Agent antwortet mit einem Link darauf.',
          },
          focus: ['blob', 'm8'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Model Context Protocol (MCP)',
      text: {
        en: 'An open protocol for connecting agents to tools: a **host** runs the agent, its **client** connects to MCP **servers** that expose tools, resources and prompts. The agent discovers the tool catalog at runtime (*dynamic tool discovery*), so tools can change without changing the agent.',
        de: 'Ein offenes Protokoll, das Agents mit Tools verbindet: Ein **Host** führt den Agent aus, sein **Client** verbindet sich mit MCP-**Servern**, die Tools, Ressourcen und Prompts bereitstellen. Der Agent entdeckt den Tool-Katalog zur Laufzeit (*dynamische Tool-Erkennung*), daher können sich Tools ändern, ohne dass du den Agent änderst.',
      },
    },
    {
      term: 'Azure Speech MCP server',
      text: {
        en: 'A remote MCP server (preview) that exposes Azure Speech as tools: *recognize* (speech to text, with language, phrase hints, profanity handling and simple or detailed output) and *synthesize* (text to speech with a chosen voice and language). It uses the speech capabilities of your Foundry resource.',
        de: 'Ein Remote-MCP-Server (Preview), der Azure Speech als Tools bereitstellt: *recognize* (Speech to Text mit Sprache, Phrasenhinweisen, Umgang mit Schimpfwörtern und einfacher oder detaillierter Ausgabe) und *synthesize* (Text to Speech mit gewählter Stimme und Sprache). Er nutzt die Sprachfunktionen deiner Foundry-Ressource.',
      },
    },
    {
      term: 'Blob container SAS URL',
      text: {
        en: 'Passed as `X-Blob-Container-Url` with read and write permissions; generated speech lands here as WAV files. Your account needs the Storage Blob Data Contributor role to generate SAS URLs. Treat SAS URLs and keys as secrets: shortest practical expiry, scoped to one container.',
        de: 'Wird als `X-Blob-Container-Url` mit Lese- und Schreibrechten übergeben; erzeugte Sprache landet hier als WAV-Dateien. Dein Konto braucht die Rolle Storage Blob Data Contributor, um SAS-URLs zu erzeugen. Behandle SAS-URLs und Keys als Geheimnisse: kürzest mögliche Gültigkeit, auf einen Container beschränkt.',
      },
    },
    {
      term: 'Tool approval',
      text: {
        en: '`require_approval` defaults to `always`: the response contains an `mcp_approval_request` item, and your app answers with an `mcp_approval_response` (`approve=True`, `approval_request_id`) in the same conversation. In the agent playground you can approve once or always.',
        de: '`require_approval` steht standardmäßig auf `always`: Die Antwort enthält ein Element `mcp_approval_request`, und deine App antwortet in derselben Konversation mit einer `mcp_approval_response` (`approve=True`, `approval_request_id`). Im Agent-Playground kannst du einmalig oder dauerhaft freigeben.',
      },
    },
    {
      term: 'server_label, allowed_tools and project connections',
      text: {
        en: 'Each MCP tool needs a unique `server_label` and a `server_url`. `allowed_tools` limits which tools the agent may call — an empty list allows all of them. A project connection stores authentication details so no secrets live in your code.',
        de: 'Jedes MCP-Tool braucht ein eindeutiges `server_label` und eine `server_url`. `allowed_tools` begrenzt, welche Tools der Agent aufrufen darf – eine leere Liste erlaubt alle. Eine Projektverbindung speichert Anmeldedaten, damit keine Geheimnisse in deinem Code stehen.',
      },
    },
    {
      term: 'Tool-calling model',
      text: {
        en: 'The agent’s model must support tool calling (for example `gpt-4o` or later). Without it, the agent can’t invoke the Speech MCP server and won’t even list speech capabilities.',
        de: 'Das Modell des Agents muss Tool Calling unterstützen (zum Beispiel `gpt-4o` oder neuer). Ohne diese Fähigkeit kann der Agent den Speech-MCP-Server nicht aufrufen und nennt nicht einmal Sprachfunktionen.',
      },
    },
  ],
  comparison: {
    title: { en: 'Three ways to give an agent a voice', de: 'Drei Wege, einem Agent eine Stimme zu geben' },
    columns: [
      { en: 'Option', de: 'Option' },
      { en: 'How speech flows', de: 'Wie Sprache fließt' },
      { en: 'Best for', de: 'Ideal für' },
      { en: 'You manage', de: 'Du verwaltest' },
    ],
    rows: [
      [
        { en: 'Speech SDK in your app', de: 'Speech SDK in deiner App' },
        { en: 'Your code recognizes speech before and synthesizes speech after each agent call', de: 'Dein Code erkennt Sprache vor und synthetisiert Sprache nach jedem Agent-Aufruf' },
        { en: 'Full control of microphones, speakers and formats', de: 'Volle Kontrolle über Mikrofone, Lautsprecher und Formate' },
        { en: 'Audio devices and both code paths', de: 'Audiogeräte und beide Codepfade' },
      ],
      [
        'Azure Speech MCP server',
        { en: 'The agent calls recognize or synthesize on demand; audio files live in Blob Storage', de: 'Der Agent ruft recognize oder synthesize bei Bedarf auf; Audiodateien liegen im Blob Storage' },
        { en: 'File-based speech tasks inside a chat agent', de: 'Dateibasierte Sprachaufgaben in einem Chat-Agent' },
        { en: 'Storage account, SAS URL and key', de: 'Storage-Konto, SAS-URL und Key' },
      ],
      [
        'Voice Live',
        { en: 'One real-time speech-to-speech session around a model or agent', de: 'Eine Echtzeit-Speech-to-Speech-Session rund um ein Modell oder einen Agent' },
        { en: 'Live spoken conversations', de: 'Live-Gespräche' },
        { en: 'Client audio streaming and events', de: 'Audiostreaming und Events im Client' },
      ],
    ],
  },
  code: [
    {
      title: { en: 'Call the speech agent and approve the MCP tool call', de: 'Den Speech-Agent aufrufen und den MCP-Tool-Aufruf freigeben' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient
from openai.types.responses.response_input_param import McpApprovalResponse

project = AIProjectClient(
    endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
    credential=DefaultAzureCredential(),
    allow_preview=True,                      # required for get_openai_client(agent_name=...)
)
openai = project.get_openai_client(agent_name="speech-agent")
conversation = openai.conversations.create()

response = openai.responses.create(
    conversation=conversation.id,
    input='Synthesize "Your order has shipped" with the voice en-GB-SoniaNeural.',
)
approvals = [
    McpApprovalResponse(type="mcp_approval_response", approve=True, approval_request_id=item.id)
    for item in response.output
    if item.type == "mcp_approval_request"   # review server, tool and arguments first
]
if approvals:
    response = openai.responses.create(conversation=conversation.id, input=approvals)

print(response.output_text)                  # contains a link to the WAV file in your container`,
      notes: [
        {
          en: 'The training module calls the agent with `extra_body={"agent_reference": {"name": …, "type": "agent_reference"}}`; current SDK docs bind the client to the agent with `get_openai_client(agent_name=…)` instead.',
          de: 'Das Trainingsmodul ruft den Agent mit `extra_body={"agent_reference": {"name": …, "type": "agent_reference"}}` auf; die aktuelle SDK-Doku bindet den Client stattdessen mit `get_openai_client(agent_name=…)` an den Agent.',
        },
        {
          en: 'Send approval responses in the same conversation — otherwise the agent never continues. In production, let a person or a policy review the tool and arguments first.',
          de: 'Sende Freigaben in derselben Konversation – sonst macht der Agent nie weiter. In Produktion prüft zuerst ein Mensch oder eine Richtlinie Tool und Argumente.',
        },
      ],
    },
    {
      title: { en: 'Attach the Speech MCP server in code', de: 'Den Speech-MCP-Server per Code anbinden' },
      code: `from azure.ai.projects.models import MCPTool, PromptAgentDefinition

speech_tool = MCPTool(
    server_label="azure-speech",
    server_url="https://<foundry-resource>.cognitiveservices.azure.com/speech/mcp",
    require_approval="always",
    project_connection_id="<project-connection-id>",   # stores the auth details
)
agent = project.agents.create_version(
    agent_name="speech-agent",
    definition=PromptAgentDefinition(
        model="gpt-4.1",                                # must support tool calling
        instructions="Use the Azure Speech tools to transcribe audio and generate speech.",
        tools=[speech_tool],
    ),
)`,
      notes: [
        {
          en: 'The server URL pattern comes from the training module; in the portal you simply pick **Azure Speech MCP Server** from the tool catalog.',
          de: 'Das URL-Muster des Servers stammt aus dem Trainingsmodul; im Portal wählst du einfach **Azure Speech MCP Server** aus dem Tool-Katalog.',
        },
        {
          en: 'Add `allowed_tools=["…"]` to restrict the tools; leaving it empty allows every tool the server exposes.',
          de: 'Mit `allowed_tools=["…"]` schränkst du die Tools ein; bleibt die Liste leer, ist jedes Tool des Servers erlaubt.',
        },
      ],
    },
  ],
  traps: [
    {
      en: 'Synthesized speech doesn’t come back as audio bytes in the chat: the tool writes a WAV file into the container from `X-Blob-Container-Url`, and the agent answers with a link.',
      de: 'Synthetisierte Sprache kommt nicht als Audiobytes im Chat zurück: Das Tool schreibt eine WAV-Datei in den Container aus `X-Blob-Container-Url`, und der Agent antwortet mit einem Link.',
    },
    {
      en: 'Speech to text needs a URL the service can read — a public URL or a SAS URL with read permission. A local path such as `./call.wav` doesn’t work with the remote server.',
      de: 'Speech to Text braucht eine URL, die der Dienst lesen kann – eine öffentliche URL oder eine SAS-URL mit Leserecht. Ein lokaler Pfad wie `./call.wav` funktioniert mit dem Remote-Server nicht.',
    },
    {
      en: 'If the agent doesn’t list or use the speech tools although the connection works, check the model first: it must support tool calling.',
      de: 'Wenn der Agent die Sprach-Tools trotz funktionierender Verbindung weder nennt noch nutzt, prüfe zuerst das Modell: Es muss Tool Calling unterstützen.',
    },
    {
      en: '`allowed_tools: []` doesn’t block anything — an empty list allows all tools. And `require_approval` defaults to `always`.',
      de: '`allowed_tools: []` blockiert nichts – eine leere Liste erlaubt alle Tools. Und `require_approval` steht standardmäßig auf `always`.',
    },
    {
      en: 'The Speech MCP tool isn’t supported in network-secured Foundry, and MCP tools need the Agent Service Enterprise tier — the error `Invalid tool value(s): mcp` means the resource doesn’t support them.',
      de: 'Das Speech-MCP-Tool wird in netzwerkgesichertem Foundry nicht unterstützt, und MCP-Tools brauchen den Enterprise-Tarif des Agent Service – der Fehler `Invalid tool value(s): mcp` bedeutet, dass die Ressource sie nicht unterstützt.',
    },
  ],
  takeaways: [
    {
      en: 'Speech MCP = speech as on-demand agent tools; the model picks recognize or synthesize from the prompt.',
      de: 'Speech MCP = Sprache als Agent-Tools auf Abruf; das Modell wählt recognize oder synthesize anhand des Prompts.',
    },
    {
      en: 'Connection = resource name + resource key (`Bearer`) + container SAS URL (`X-Blob-Container-Url`).',
      de: 'Verbindung = Ressourcenname + Ressourcen-Key (`Bearer`) + Container-SAS-URL (`X-Blob-Container-Url`).',
    },
    {
      en: 'Audio in via URL, speech out as a WAV file in Blob Storage plus a link.',
      de: 'Audio rein per URL, Sprache raus als WAV-Datei im Blob Storage plus Link.',
    },
    {
      en: 'Approve MCP tool calls in the same conversation; restrict tools with `allowed_tools`.',
      de: 'MCP-Tool-Aufrufe in derselben Konversation freigeben; Tools mit `allowed_tools` einschränken.',
    },
  ],
  sources: [
    { title: 'Connect Azure Speech in Foundry Tools to an agent', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/azure-ai-speech' },
    { title: 'Connect agents to Model Context Protocol servers', url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/model-context-protocol' },
    { title: 'Azure Speech in Foundry Tools for the Azure MCP Server', url: 'https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/tools/ai-services-speech' },
    { title: 'AIProjectClient class (azure-ai-projects)', url: 'https://learn.microsoft.com/en-us/python/api/azure-ai-projects/azure.ai.projects.aiprojectclient' },
  ],
}
