import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'responsible-ai',
  summary: {
    en: 'Generative AI can produce harmful, false or manipulated output, so Microsoft frames responsible development as a four-stage process: **map** the potential harms, **measure** how often they occur, **mitigate** them in several layers, and **manage** the solution in production. Microsoft Foundry gives you a tool for each stage: the AI Red Teaming Agent and evaluators find and measure harms, **guardrails** (powered by Azure AI Content Safety classifiers) screen the input and output of models and agents, and monitoring with continuous evaluation keeps watching after release. Treat it as a loop, not a checklist: every mitigation and every production signal sends you back to measurement.',
    de: 'Generative KI kann schädliche, falsche oder manipulierte Ausgaben erzeugen. Microsoft beschreibt verantwortungsvolle Entwicklung deshalb als vierstufigen Prozess: potenzielle Schäden **mappen**, ihre Häufigkeit **messen**, sie in mehreren Schichten **mindern** und die Lösung im Betrieb **managen**. Microsoft Foundry liefert für jede Phase ein Werkzeug: Der AI Red Teaming Agent und Evaluatoren finden und messen Schäden, **Guardrails** (basierend auf Klassifizierern von Azure AI Content Safety) prüfen Ein- und Ausgaben von Modellen und Agents, und Monitoring mit Continuous Evaluation wacht nach dem Release weiter. Sieh es als Kreislauf, nicht als Checkliste: Jede Gegenmaßnahme und jedes Signal aus dem Betrieb führt dich zurück zum Messen.',
  },
  examFocus: {
    en: 'Expect scenarios that make you pick the right guardrail control (harm categories, Prompt Shields, protected material, PII, blocklists), set the correct blocking level or intervention point for models versus agents, choose evaluators (groundedness, relevance or safety) and read their scores, and decide between red teaming, continuous evaluation, scheduled evaluation and Azure Monitor safety metrics. For images, know **Analyze Image** for visual harms and OCR plus Prompt Shields for instructions hidden as text in images.',
    de: 'Rechne mit Szenarien, in denen du das passende Guardrail-Control wählst (Schadenskategorien, Prompt Shields, Protected Material, PII, Blocklisten), den richtigen Blocking Level oder Intervention Point für Modelle bzw. Agents festlegst, Evaluatoren auswählst (Groundedness, Relevance oder Safety) und ihre Scores liest und zwischen Red Teaming, Continuous Evaluation, Scheduled Evaluation und Sicherheitsmetriken in Azure Monitor entscheidest. Bei Bildern: **Analyze Image** für visuelle Schäden sowie OCR plus Prompt Shields für Anweisungen, die als Text im Bild versteckt sind.',
  },
  diagrams: [
    {
      id: 'guardrail-pipeline',
      title: { en: 'How a guardrail screens a request', de: 'Wie ein Guardrail eine Anfrage prüft' },
      caption: {
        en: 'Safety-toned boxes are the controls of one guardrail. Every check returns annotations; controls set to Annotate and block also stop the request or filter the completion.',
        de: 'Die Safety-Boxen sind die Controls eines Guardrails. Jede Prüfung liefert Annotationen; Controls mit Annotate and block stoppen zusätzlich die Anfrage oder filtern die Completion.',
      },
      width: 960,
      height: 420,
      nodes: [
        { id: 'user', x: 10, y: 180, w: 130, h: 70, label: { en: 'User', de: 'Nutzer' }, sub: { en: 'prompt +\ndocuments', de: 'Prompt +\nDokumente' }, tone: 'user', shape: 'actor' },
        { id: 'inCtl', x: 182, y: 180, w: 170, h: 70, label: { en: 'Input controls', de: 'Eingabe-Controls' }, sub: { en: 'Prompt Shields, harms', de: 'Prompt Shields, Schäden' }, tone: 'safety' },
        { id: 'model', x: 405, y: 180, w: 150, h: 70, label: { en: 'Model or agent', de: 'Modell oder Agent' }, sub: { en: 'your deployment', de: 'dein Deployment' }, tone: 'model' },
        { id: 'outCtl', x: 607, y: 180, w: 170, h: 70, label: { en: 'Output controls', de: 'Ausgabe-Controls' }, sub: { en: 'harms, protected, PII', de: 'Schäden, Copyright, PII' }, tone: 'safety' },
        { id: 'resp', x: 830, y: 180, w: 120, h: 70, label: { en: 'Response', de: 'Antwort' }, sub: { en: '+ annotations', de: '+ Annotationen' }, tone: 'app', shape: 'pill' },
        { id: 'blockIn', x: 182, y: 40, w: 170, h: 60, label: { en: 'Request blocked', de: 'Anfrage blockiert' }, sub: 'HTTP 400 content_filter', tone: 'safety', shape: 'pill' },
        { id: 'blockOut', x: 607, y: 40, w: 170, h: 60, label: { en: 'Output filtered', de: 'Ausgabe gefiltert' }, sub: { en: 'filtered completion', de: 'gefilterte Completion' }, tone: 'safety', shape: 'pill' },
        { id: 'toolCtl', x: 405, y: 320, w: 150, h: 64, label: { en: 'Tool controls', de: 'Tool-Controls' }, sub: { en: 'agents, preview', de: 'Agents, Preview' }, tone: 'safety' },
        { id: 'tools', x: 607, y: 320, w: 170, h: 64, label: { en: 'Agent tools', de: 'Agent-Tools' }, sub: 'AI Search, Bing, OpenAPI', tone: 'tool' },
      ],
      edges: [
        { id: 'e-in', from: 'user', to: 'inCtl' },
        { id: 'e-pass', from: 'inCtl', to: 'model' },
        { id: 'e-out', from: 'model', to: 'outCtl' },
        { id: 'e-resp', from: 'outCtl', to: 'resp' },
        { id: 'e-bin', from: 'inCtl', to: 'blockIn', label: { en: 'block', de: 'blockieren' } },
        { id: 'e-bout', from: 'outCtl', to: 'blockOut', label: { en: 'block', de: 'blockieren' } },
        { id: 'e-tool', from: 'model', to: 'toolCtl', bidir: true, label: { en: 'tool call/response', de: 'Tool-Call/-Antwort' } },
        { id: 'e-tools', from: 'toolCtl', to: 'tools', bidir: true },
      ],
      steps: [
        {
          title: { en: 'One guardrail, many controls', de: 'Ein Guardrail, viele Controls' },
          text: {
            en: 'A guardrail is a named set of controls that you assign to model deployments and agents. Each control names a risk, the intervention points to scan and an action. Models start with **Microsoft.DefaultV2**: the four harm categories at Medium plus user prompt attack detection.',
            de: 'Ein Guardrail ist eine benannte Sammlung von Controls, die du Modell-Deployments und Agents zuweist. Jedes Control legt ein Risiko, die zu prüfenden Intervention Points und eine Aktion fest. Modelle starten mit **Microsoft.DefaultV2**: die vier Schadenskategorien auf Medium plus Erkennung von User Prompt Attacks.',
          },
          focus: ['inCtl', 'outCtl', 'toolCtl'],
        },
        {
          title: { en: 'Scan the input', de: 'Eingabe prüfen' },
          text: {
            en: 'Input controls check the prompt. Prompt Shields catch jailbreaks (user prompt attacks) and, once you enable it, instructions hidden in delimited documents (document attacks). The harm categories and your custom blocklists apply here too.',
            de: 'Eingabe-Controls prüfen den Prompt. Prompt Shields erkennen Jailbreaks (User Prompt Attacks) und – sobald du sie aktivierst – Anweisungen, die in abgegrenzten Dokumenten versteckt sind (Document Attacks). Auch die Schadenskategorien und deine eigenen Blocklisten greifen hier.',
          },
          focus: ['user', 'e-in', 'inCtl'],
        },
        {
          title: { en: 'Block before the model', de: 'Vor dem Modell blockieren' },
          text: {
            en: 'When a control set to **Annotate and block** fires on the input, the request never reaches the model: the API returns HTTP 400 with the error code `content_filter`. Otherwise the prompt passes on.',
            de: 'Schlägt ein Control mit **Annotate and block** bei der Eingabe an, erreicht die Anfrage das Modell nie: Die API liefert HTTP 400 mit dem Fehlercode `content_filter`. Andernfalls geht der Prompt weiter.',
          },
          focus: ['e-bin', 'blockIn', 'e-pass', 'model'],
        },
        {
          title: { en: 'Agents: guard tool traffic', de: 'Agents: Tool-Verkehr absichern' },
          text: {
            en: 'For agents (preview), controls can also scan the tool call the model proposes and the tool response before it enters the agent memory — for example, an indirect attack hidden in a web page returned by Bing Grounding. Only tools that support moderation are scanned.',
            de: 'Bei Agents (Preview) können Controls zusätzlich den vom Modell vorgeschlagenen Tool Call und die Tool-Antwort prüfen, bevor sie ins Gedächtnis des Agents gelangt – etwa einen Indirect Attack in einer von Bing Grounding gelieferten Webseite. Geprüft werden nur Tools, die Moderation unterstützen.',
          },
          focus: ['e-tool', 'toolCtl', 'e-tools', 'tools'],
        },
        {
          title: { en: 'Scan the output, annotate or block', de: 'Ausgabe prüfen: annotieren oder blockieren' },
          text: {
            en: 'Output controls check the completion for harms, protected material (text and code) and PII (preview). A blocked output is filtered; otherwise the response carries annotations — `content_filters` in the Responses API — with categories, severities and `blocked` flags.',
            de: 'Ausgabe-Controls prüfen die Completion auf Schäden, Protected Material (Text und Code) und PII (Preview). Eine blockierte Ausgabe wird gefiltert; sonst trägt die Antwort Annotationen – `content_filters` in der Responses API – mit Kategorien, Schweregraden und `blocked`-Flags.',
          },
          focus: ['e-out', 'outCtl', 'e-bout', 'blockOut', 'e-resp', 'resp'],
        },
      ],
    },
    {
      id: 'rai-cycle',
      title: { en: 'Map, measure, mitigate, manage — and repeat', de: 'Map, Measure, Mitigate, Manage – und wiederholen' },
      caption: {
        en: 'The four stages of responsible generative AI and the Foundry tools that support each one. The loop mirrors the NIST AI Risk Management Framework.',
        de: 'Die vier Phasen verantwortungsvoller generativer KI und die Foundry-Werkzeuge, die jede davon unterstützen. Der Kreislauf entspricht dem NIST AI Risk Management Framework.',
      },
      width: 960,
      height: 340,
      nodes: [
        { id: 'map', x: 10, y: 110, w: 190, h: 70, label: '1 · Map', sub: { en: 'identify, rank, red-team', de: 'erkennen, gewichten, testen' }, tone: 'neutral' },
        { id: 'measure', x: 260, y: 110, w: 190, h: 70, label: '2 · Measure', sub: { en: 'baseline from test prompts', de: 'Baseline aus Testprompts' }, tone: 'neutral' },
        { id: 'mitigate', x: 510, y: 110, w: 190, h: 70, label: '3 · Mitigate', sub: { en: 'four layers, then re-test', de: 'vier Ebenen, neu messen' }, tone: 'neutral' },
        { id: 'manage', x: 760, y: 110, w: 190, h: 70, label: '4 · Manage', sub: { en: 'release in phases, monitor', de: 'Rollout + Monitoring' }, tone: 'neutral' },
        { id: 'redteam', x: 10, y: 250, w: 190, h: 64, label: 'AI Red Teaming Agent', sub: { en: 'PyRIT attacks, ASR', de: 'PyRIT-Angriffe, ASR' }, tone: 'foundry' },
        { id: 'evals', x: 260, y: 250, w: 190, h: 64, label: { en: 'Evaluators', de: 'Evaluatoren' }, sub: { en: 'quality + risk & safety', de: 'Qualität + Risk & Safety' }, tone: 'foundry' },
        { id: 'guard', x: 510, y: 250, w: 190, h: 64, label: 'Guardrails', sub: { en: '+ safety system message', de: '+ Safety-Systemnachricht' }, tone: 'safety' },
        { id: 'monitor', x: 760, y: 250, w: 190, h: 64, label: 'Monitoring', sub: 'continuous + scheduled eval', tone: 'foundry' },
      ],
      edges: [
        { id: 'f1', from: 'map', to: 'measure' },
        { id: 'f2', from: 'measure', to: 'mitigate', bidir: true },
        { id: 'f3', from: 'mitigate', to: 'manage' },
        { id: 's1', from: 'redteam', to: 'map', dashed: true },
        { id: 's2', from: 'evals', to: 'measure', dashed: true },
        { id: 's3', from: 'guard', to: 'mitigate', dashed: true },
        { id: 's4', from: 'monitor', to: 'manage', dashed: true },
        { id: 'loop', from: 'manage', to: 'map', label: { en: 'new harms found', de: 'neue Schäden' }, via: [[855, 60], [105, 60]] },
      ],
      steps: [
        {
          title: { en: 'Map the harms', de: 'Schäden mappen' },
          text: {
            en: 'Identify the harms your scenario can cause (for example, wrong cooking times or a poison recipe), prioritize them by likelihood and impact, verify them with red teaming, then document and share the list. The AI Red Teaming Agent automates adversarial probing with PyRIT attack strategies and reports the Attack Success Rate (ASR).',
            de: 'Erkenne die Schäden, die dein Szenario verursachen kann (etwa falsche Garzeiten oder ein Giftrezept), priorisiere sie nach Wahrscheinlichkeit und Auswirkung, prüfe sie per Red Teaming und dokumentiere die Liste für alle Beteiligten. Der AI Red Teaming Agent automatisiert adversariale Tests mit PyRIT-Angriffsstrategien und meldet die Attack Success Rate (ASR).',
          },
          focus: ['map', 'redteam', 's1'],
        },
        {
          title: { en: 'Measure a baseline', de: 'Baseline messen' },
          text: {
            en: 'Run diverse prompts that target each harm, collect the outputs and classify them with strict criteria. Start manually on a small set, then automate with evaluators: quality (groundedness, relevance, coherence) and risk and safety (violence, hate and unfairness, protected material and more).',
            de: 'Führe vielfältige Prompts aus, die gezielt jeden Schaden provozieren, sammle die Ausgaben und klassifiziere sie nach strengen Kriterien. Starte manuell mit wenigen Fällen und automatisiere dann mit Evaluatoren: Qualität (Groundedness, Relevance, Coherence) sowie Risk und Safety (Violence, Hate and Unfairness, Protected Material und mehr).',
          },
          focus: ['f1', 'measure', 'evals', 's2'],
        },
        {
          title: { en: 'Mitigate in layers', de: 'In Schichten mindern' },
          text: {
            en: 'Combine four layers: the **model** (choose or fine-tune it), the **safety system** (guardrails, Prompt Shields), the **system message and grounding** (instructions, RAG data) and the **user experience** (constrained input, output validation, transparency). Then measure again against the baseline.',
            de: 'Kombiniere vier Ebenen: das **Modell** (auswählen oder fine-tunen), das **Safety-System** (Guardrails, Prompt Shields), **Systemnachricht und Grounding** (Anweisungen, RAG-Daten) und die **User Experience** (eingeschränkte Eingaben, Ausgabeprüfung, Transparenz). Miss danach erneut gegen die Baseline.',
          },
          focus: ['f2', 'mitigate', 'guard', 's3'],
        },
        {
          title: { en: 'Manage the release', de: 'Release managen' },
          text: {
            en: 'Before release, run legal, privacy, security and accessibility reviews. Release in phases with an incident response plan, a rollback plan, a way to block harmful responses and abusive users, user feedback and telemetry. In production, continuous and scheduled evaluation keep measuring.',
            de: 'Führe vor dem Release Prüfungen zu Recht, Datenschutz, Sicherheit und Barrierefreiheit durch. Rolle gestaffelt aus – mit Incident-Response-Plan, Rollback-Plan, der Möglichkeit, schädliche Antworten und missbräuchliche Nutzer zu blockieren, Nutzerfeedback und Telemetrie. Im Betrieb messen Continuous und Scheduled Evaluation weiter.',
          },
          focus: ['f3', 'manage', 'monitor', 's4'],
        },
        {
          title: { en: 'Close the loop', de: 'Den Kreis schließen' },
          text: {
            en: 'Monitoring alerts and user reports surface new harms. Add them to the harm list and run the cycle again. The stages correspond to the functions of the NIST AI Risk Management Framework.',
            de: 'Monitoring-Alerts und Meldungen von Nutzern decken neue Schäden auf. Nimm sie in die Schadensliste auf und durchlaufe den Zyklus erneut. Die Phasen entsprechen den Funktionen des NIST AI Risk Management Framework.',
          },
          focus: ['loop', 'map'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Guardrail and controls',
      text: {
        en: 'A guardrail (previously called a content filter configuration; an RAI policy in the REST API) is a named set of controls assigned to model deployments and agents. Each control defines a risk, the intervention points to scan (user input, tool call, tool response, output) and an action: Annotate, or Annotate and block. An agent guardrail fully overrides the guardrail of its model.',
        de: 'Ein Guardrail (früher Content-Filter-Konfiguration, in der REST API eine RAI-Policy) ist eine benannte Sammlung von Controls, die Modell-Deployments und Agents zugewiesen wird. Jedes Control legt ein Risiko, die zu prüfenden Intervention Points (User input, Tool call, Tool response, Output) und eine Aktion fest: Annotate oder Annotate and block. Der Guardrail eines Agents ersetzt den seines Modells vollständig.',
      },
    },
    {
      term: 'Severity and blocking level',
      text: {
        en: 'Classifiers rate hate, sexual, violence and self-harm content as safe, low, medium or high. The blocking level sets the strictness: **Low** blocks only high, **Medium** (default) blocks medium and high, **High** blocks low, medium and high. Content rated safe is never filtered.',
        de: 'Klassifizierer stufen Inhalte zu Hate, Sexual, Violence und Self-harm als safe, low, medium oder high ein. Der Blocking Level legt die Strenge fest: **Low** blockiert nur high, **Medium** (Standard) blockiert medium und high, **High** blockiert low, medium und high. Als safe eingestufte Inhalte werden nie gefiltert.',
      },
    },
    {
      term: 'Prompt Shields',
      text: {
        en: 'Detect user prompt attacks (jailbreaks; formerly jailbreak risk detection) in the user input and document attacks (indirect prompt injection) in delimited documents or agent tool responses. User prompt attack detection is on by default; document attack detection is off until you enable it. Spotlighting (preview) adds base64 encoding of documents for Chat Completions models.',
        de: 'Erkennen User Prompt Attacks (Jailbreaks; früher Jailbreak Risk Detection) in der Nutzereingabe und Document Attacks (indirekte Prompt Injection) in abgegrenzten Dokumenten oder Tool-Antworten von Agents. Die Erkennung von User Prompt Attacks ist standardmäßig an, die von Document Attacks aus, bis du sie aktivierst. Spotlighting (Preview) kodiert Dokumente bei Chat-Completions-Modellen zusätzlich in Base64.',
      },
    },
    {
      term: 'Layered mitigation',
      text: {
        en: 'No single control is enough. Mitigate at the model layer (choose or fine-tune the model), the safety system layer (guardrails), the system message and grounding layer (behavior rules, RAG with trusted data) and the user experience layer (constrained input, output validation, transparent documentation).',
        de: 'Kein einzelnes Control reicht aus. Mindere auf der Modellebene (Modell auswählen oder fine-tunen), der Safety-System-Ebene (Guardrails), der Ebene Systemnachricht und Grounding (Verhaltensregeln, RAG mit vertrauenswürdigen Daten) und der User-Experience-Ebene (eingeschränkte Eingaben, Ausgabeprüfung, transparente Dokumentation).',
      },
    },
    {
      term: 'Evaluators',
      text: {
        en: 'Scoring methods for model and agent outputs. Quality and RAG evaluators such as groundedness, relevance, coherence and fluency are LLM judges that score 1–5. Risk and safety evaluators run on Microsoft-hosted models: the content-harm ones (violence, sexual, self-harm, hate and unfairness) score severity 0–7, while protected material, indirect attack, code vulnerability and ungrounded attributes return pass or fail. Results carry a pass/fail label and a reason that explains them.',
        de: 'Bewertungsmethoden für Ausgaben von Modellen und Agents. Qualitäts- und RAG-Evaluatoren wie Groundedness, Relevance, Coherence und Fluency sind LLM-Judges mit Scores von 1–5. Risk-and-Safety-Evaluatoren laufen auf von Microsoft gehosteten Modellen: Die für Schadensinhalte (Violence, Sexual, Self-Harm, Hate and Unfairness) bewerten den Schweregrad 0–7, Protected Material, Indirect Attack, Code Vulnerability und Ungrounded Attributes liefern pass oder fail. Ergebnisse tragen ein Pass/Fail-Label und eine Begründung (reason).',
      },
    },
    {
      term: 'AI Red Teaming Agent',
      text: {
        en: 'Automates adversarial probing with PyRIT attack strategies such as Base64, Flip, Jailbreak or Crescendo, scores every attack-response pair with the risk and safety evaluators and reports the Attack Success Rate (ASR). Run it in the cloud for agents, before deployment and on a schedule afterward.',
        de: 'Automatisiert adversariale Tests mit PyRIT-Angriffsstrategien wie Base64, Flip, Jailbreak oder Crescendo, bewertet jedes Angriff-Antwort-Paar mit den Risk-and-Safety-Evaluatoren und meldet die Attack Success Rate (ASR). Führe ihn für Agents in der Cloud aus – vor dem Deployment und danach nach Zeitplan.',
      },
    },
    {
      term: 'Continuous evaluation and monitoring',
      text: {
        en: 'With Application Insights connected, the Agent Monitoring Dashboard shows token usage, latency, run success rate, evaluation scores and red-teaming results. Continuous evaluation samples live traffic, scheduled evaluation re-runs test datasets to catch drift, and Azure Monitor metrics such as **Blocked Volume** and **Harmful Volume Detected** track safety events.',
        de: 'Mit verbundenem Application Insights zeigt das Agent Monitoring Dashboard Token-Verbrauch, Latenz, Run-Erfolgsquote, Evaluierungsscores und Red-Teaming-Ergebnisse. Continuous Evaluation bewertet Stichproben des Live-Traffics, Scheduled Evaluation wiederholt Testdatasets, um Drift zu erkennen, und Azure-Monitor-Metriken wie **Blocked Volume** und **Harmful Volume Detected** verfolgen Sicherheitsereignisse.',
      },
    },
  ],
  comparison: {
    title: { en: 'Which guardrail control for which risk?', de: 'Welches Guardrail-Control für welches Risiko?' },
    columns: [
      { en: 'Risk', de: 'Risiko' },
      { en: 'Control', de: 'Control' },
      { en: 'Intervention point', de: 'Intervention Point' },
      { en: 'In Microsoft.DefaultV2', de: 'In Microsoft.DefaultV2' },
    ],
    rows: [
      [
        { en: 'Hate, sexual, violence, self-harm', de: 'Hass, sexuelle Inhalte, Gewalt, Selbstverletzung' },
        { en: 'Harm category controls with a blocking level', de: 'Controls für Schadenskategorien mit Blocking Level' },
        { en: 'User input and output', de: 'Nutzereingabe und Ausgabe' },
        { en: 'On, Medium', de: 'An, Medium' },
      ],
      [
        { en: 'Jailbreak in the prompt', de: 'Jailbreak im Prompt' },
        'User prompt attack (Prompt Shields)',
        { en: 'User input', de: 'Nutzereingabe' },
        { en: 'On', de: 'An' },
      ],
      [
        { en: 'Hidden instructions in documents or tool results', de: 'Versteckte Anweisungen in Dokumenten oder Tool-Ergebnissen' },
        'Document attack (Prompt Shields)',
        { en: 'User input (delimited documents); tool response for agents (preview)', de: 'Nutzereingabe (abgegrenzte Dokumente); Tool-Antwort bei Agents (Preview)' },
        { en: 'Off — enable it', de: 'Aus – aktivieren' },
      ],
      [
        { en: 'Copyrighted text or code', de: 'Urheberrechtlich geschützter Text oder Code' },
        'Protected material (text, code)',
        { en: 'Output', de: 'Ausgabe' },
        { en: 'On', de: 'An' },
      ],
      [
        { en: 'Personal data such as emails or ID numbers', de: 'Personenbezogene Daten wie E-Mails oder Ausweisnummern' },
        'PII (preview)',
        { en: 'Output', de: 'Ausgabe' },
        { en: 'No — add it', de: 'Nein – hinzufügen' },
      ],
      [
        { en: 'Your own forbidden terms', de: 'Eigene verbotene Begriffe' },
        { en: 'Custom blocklist (Azure OpenAI models)', de: 'Eigene Blockliste (Azure-OpenAI-Modelle)' },
        { en: 'User input and/or output', de: 'Nutzereingabe und/oder Ausgabe' },
        { en: 'No — create it', de: 'Nein – anlegen' },
      ],
    ],
  },
  code: [
    {
      title: { en: 'Handle guardrail results with the Responses API', de: 'Guardrail-Ergebnisse mit der Responses API behandeln' },
      code: `from openai import OpenAI, BadRequestError
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

token_provider = get_bearer_token_provider(
    DefaultAzureCredential(), "https://ai.azure.com/.default"
)
client = OpenAI(
    base_url="https://<resource>.openai.azure.com/openai/v1/",
    api_key=token_provider,
)

try:
    response = client.responses.create(
        model="gpt-4.1",                      # deployment with your guardrail
        input="Summarize our refund policy.",
    )
except BadRequestError as error:
    if error.code == "content_filter":        # an input control blocked it
        print("Sorry, I can't help with that request.")
    else:
        raise
else:
    # content_filters is a Foundry extension, so read it from model_extra
    for result in response.model_extra.get("content_filters", []):
        print(result["source_type"], result["blocked"])
    print(response.output_text)`,
      notes: [
        {
          en: 'A prompt blocked by an input control never reaches the model: the API answers HTTP 400 with the error code `content_filter`.',
          de: 'Ein von einem Eingabe-Control blockierter Prompt erreicht das Modell nie: Die API antwortet mit HTTP 400 und dem Fehlercode `content_filter`.',
        },
        {
          en: 'Successful responses carry a top-level `content_filters` array (`source_type`, `blocked`, per-category results). It is not part of the OpenAI schema, so read it from `model_extra`.',
          de: 'Erfolgreiche Antworten enthalten ein Array `content_filters` auf oberster Ebene (`source_type`, `blocked`, Ergebnisse pro Kategorie). Es gehört nicht zum OpenAI-Schema, daher liest du es aus `model_extra`.',
        },
        {
          en: 'Chat Completions report the same results as `prompt_filter_results` and `content_filter_results`; a filtered completion ends with `finish_reason` set to `content_filter`.',
          de: 'Chat Completions liefern dieselben Ergebnisse als `prompt_filter_results` und `content_filter_results`; eine gefilterte Completion endet mit `finish_reason` = `content_filter`.',
        },
      ],
    },
    {
      title: { en: 'Measure groundedness and violence with a cloud evaluation', de: 'Groundedness und Violence per Cloud-Evaluierung messen' },
      code: `import time
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

project = AIProjectClient(
    endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
    credential=DefaultAzureCredential(),
)
openai = project.get_openai_client()
data_id = project.datasets.upload_file(       # JSONL: query, context, response
    name="rag-tests", version="1", file_path="rag_tests.jsonl"
).id

query_response = {"query": "{{item.query}}", "response": "{{item.response}}"}
evaluation = openai.evals.create(
    name="rag-quality-and-safety",
    data_source_config={"type": "custom", "item_schema": {
        "type": "object",
        "properties": {"query": {"type": "string"},
                       "context": {"type": "string"},
                       "response": {"type": "string"}}}},
    testing_criteria=[
        {"type": "azure_ai_evaluator", "name": "groundedness",
         "evaluator_name": "builtin.groundedness",
         "initialization_parameters": {"model": "gpt-4.1"},  # LLM judge
         "data_mapping": {**query_response, "context": "{{item.context}}"}},
        {"type": "azure_ai_evaluator", "name": "violence",
         "evaluator_name": "builtin.violence",             # hosted, no judge
         "data_mapping": query_response},
    ],
)
run = openai.evals.runs.create(
    eval_id=evaluation.id, name="baseline",
    data_source={"type": "jsonl", "source": {"type": "file_id", "id": data_id}},
)
while run.status not in ("completed", "failed", "canceled"):
    time.sleep(5)
    run = openai.evals.runs.retrieve(run_id=run.id, eval_id=evaluation.id)
print(run.status, run.report_url)`,
      notes: [
        {
          en: 'Groundedness is an LLM judge that needs a judge deployment and scores 1–5 (higher is better); violence runs on Microsoft-hosted safety models and scores severity 0–7 (lower is better).',
          de: 'Groundedness ist ein LLM-Judge, der ein Judge-Deployment braucht, und vergibt 1–5 (höher ist besser); Violence läuft auf von Microsoft gehosteten Sicherheitsmodellen und bewertet den Schweregrad 0–7 (niedriger ist besser).',
        },
        {
          en: '`{{item.field}}` maps dataset columns to evaluator inputs. Groundedness needs `context` to spot claims that the retrieved data does not support.',
          de: '`{{item.field}}` ordnet Dataset-Spalten den Eingaben der Evaluatoren zu. Groundedness braucht `context`, um Aussagen zu finden, die die abgerufenen Daten nicht stützen.',
        },
        {
          en: 'Each row gets a `score`, a pass/fail `label`, the `threshold` and a `reason` that explains the score. Open `report_url` or list `openai.evals.runs.output_items` to review them.',
          de: 'Jede Zeile erhält `score`, ein Pass/Fail-`label`, den `threshold` und einen `reason`, der den Score erklärt. Öffne `report_url` oder liste `openai.evals.runs.output_items` auf, um sie zu prüfen.',
        },
      ],
    },
  ],
  traps: [
    {
      en: 'Blocking levels describe strictness, not a threshold: **High** blocks low, medium and high severity; **Low** blocks only high-severity content.',
      de: 'Blocking Levels beschreiben die Strenge, keinen Schwellenwert: **High** blockiert niedrige, mittlere und hohe Schweregrade; **Low** blockiert nur hohe.',
    },
    {
      en: 'Document attack detection is **off by default**. In Chat Completions calls, wrap retrieved content in the `<documents>` delimiter so it can be scanned; for agents, add an indirect attack control at the **Tool response** intervention point.',
      de: 'Die Erkennung von Document Attacks ist **standardmäßig aus**. In Chat-Completions-Aufrufen umschließt du abgerufene Inhalte mit dem Trenner `<documents>`, damit sie geprüft werden; bei Agents fügst du ein Indirect-Attack-Control am Intervention Point **Tool response** hinzu.',
    },
    {
      en: 'An agent guardrail **fully overrides** the model guardrail — the two never merge. Agents support only **Annotate and block**, and Spotlighting and Groundedness controls do not apply to agents.',
      de: 'Der Guardrail eines Agents **ersetzt** den des Modells vollständig – sie werden nie zusammengeführt. Agents unterstützen nur **Annotate and block**, und die Controls Spotlighting und Groundedness gelten nicht für Agents.',
    },
    {
      en: 'Evaluator scales point in opposite directions: quality evaluators score 1–5 and pass at or above the threshold (default 3); content-harm safety evaluators score severity 0–7 and pass at or below it (default 3).',
      de: 'Die Skalen der Evaluatoren laufen in entgegengesetzte Richtungen: Qualitäts-Evaluatoren vergeben 1–5 und bestehen ab dem Schwellenwert (Standard 3); Safety-Evaluatoren für Schadensinhalte bewerten den Schweregrad 0–7 und bestehen bis zum Schwellenwert (Standard 3).',
    },
    {
      en: 'The Groundedness guardrail control (preview) is scheduled to retire on April 30, 2027. Measure grounding quality with the Groundedness evaluator in evaluations and continuous evaluation instead.',
      de: 'Das Guardrail-Control Groundedness (Preview) wird am 30. April 2027 eingestellt. Miss die Grounding-Qualität stattdessen mit dem Groundedness-Evaluator in Evaluierungen und in der Continuous Evaluation.',
    },
  ],
  takeaways: [
    { en: 'Map → Measure → Mitigate → Manage — and measure again after every mitigation.', de: 'Map → Measure → Mitigate → Manage – und nach jeder Gegenmaßnahme erneut messen.' },
    {
      en: 'Choose the control by risk: harms → blocking level, attacks → Prompt Shields, copyright → protected material, personal data → PII, your own terms → blocklist.',
      de: 'Wähle das Control nach Risiko: Schäden → Blocking Level, Angriffe → Prompt Shields, Urheberrecht → Protected Material, personenbezogene Daten → PII, eigene Begriffe → Blockliste.',
    },
    {
      en: 'Before release, measure with evaluators and the AI Red Teaming Agent; after release, monitor with continuous and scheduled evaluation.',
      de: 'Vor dem Release mit Evaluatoren und dem AI Red Teaming Agent messen, danach mit Continuous und Scheduled Evaluation überwachen.',
    },
    {
      en: 'Text inside an image is untrusted input: extract it with OCR and screen it with Prompt Shields; classify visual harm with Analyze Image.',
      de: 'Text in einem Bild ist nicht vertrauenswürdige Eingabe: per OCR extrahieren und mit Prompt Shields prüfen; visuelle Schäden mit Analyze Image klassifizieren.',
    },
  ],
  sources: [
    { title: 'Guardrails and controls overview in Microsoft Foundry', url: 'https://learn.microsoft.com/en-us/azure/foundry/guardrails/guardrails-overview' },
    { title: 'Prompt Shields in Microsoft Foundry', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/content-filter-prompt-shields' },
    { title: 'Built-in evaluators reference', url: 'https://learn.microsoft.com/en-us/azure/foundry/concepts/built-in-evaluators' },
    { title: 'Introduction to cloud evaluation with Microsoft Foundry SDK', url: 'https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/cloud-evaluation' },
    { title: 'Monitor agents with the Agent Monitoring Dashboard', url: 'https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/how-to-monitor-agents-dashboard' },
  ],
}
