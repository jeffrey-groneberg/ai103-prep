import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'responsible-ai',
  summary: {
    en: 'Generative AI can produce harmful, false or manipulated output, so Microsoft frames responsible development as a four-stage process: **map** the potential harms, **measure** how often they occur, **mitigate** them in several layers, and **manage** the solution in production. Microsoft Foundry gives you a tool for each stage: the AI Red Teaming Agent and evaluators find and measure harms, **guardrails** (powered by Azure AI Content Safety classifiers) screen the input and output of models and agents, and monitoring with continuous evaluation keeps watching after release. Treat it as a loop, not a checklist: every mitigation and every production signal sends you back to measurement.',
    de: 'Generative KI kann schädliche, falsche oder manipulierte Ausgaben erzeugen. Microsoft beschreibt verantwortungsvolle Entwicklung deshalb als vierstufigen Prozess: potenzielle Schäden **mappen**, ihre Häufigkeit **messen**, sie in mehreren Schichten **mindern** und die Lösung im Betrieb **managen**. Microsoft Foundry liefert für jede Phase ein Werkzeug: Der AI Red Teaming Agent und Evaluatoren finden und messen Schäden, **Guardrails** (basierend auf Klassifizierern von Azure AI Content Safety) prüfen Ein- und Ausgaben von Modellen und Agents, und Monitoring mit Continuous Evaluation wacht nach dem Release weiter. Sieh es als Kreislauf, nicht als Checkliste: Jede Gegenmaßnahme und jedes Signal aus dem Betrieb führt dich zurück zum Messen.',
  },
  examFocus: {
    en: 'Expect scenarios that make you pick the right guardrail control (harm categories, Prompt Shields, protected material, PII — personally identifiable information, blocklists), set the correct blocking level or intervention point for models versus agents, choose evaluators (groundedness, relevance or safety) and read their scores, and decide between red teaming, continuous evaluation, scheduled evaluation and Azure Monitor safety metrics. For images, know **Analyze Image** for visual harms and OCR (optical character recognition) plus Prompt Shields for instructions hidden as text in images.',
    de: 'Rechne mit Szenarien, in denen du das passende Guardrail-Control wählst (Schadenskategorien, Prompt Shields, Protected Material, PII – personenbezogene Daten, Blocklisten), den richtigen Blocking Level oder Intervention Point für Modelle bzw. Agents festlegst, Evaluatoren auswählst (Groundedness, Relevance oder Safety) und ihre Scores liest und zwischen Red Teaming, Continuous Evaluation, Scheduled Evaluation und Sicherheitsmetriken in Azure Monitor entscheidest. Bei Bildern: **Analyze Image** für visuelle Schäden sowie OCR (optische Zeichenerkennung) plus Prompt Shields für Anweisungen, die als Text im Bild versteckt sind.',
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
        { id: 'toolStop', x: 80, y: 324, w: 170, h: 56, label: { en: 'Agent stops', de: 'Agent stoppt' }, tone: 'safety', shape: 'pill' },
      ],
      edges: [
        { id: 'e-in', from: 'user', to: 'inCtl' },
        { id: 'e-pass', from: 'inCtl', to: 'model' },
        { id: 'e-out', from: 'model', to: 'outCtl' },
        { id: 'e-resp', from: 'outCtl', to: 'resp' },
        { id: 'e-bin', from: 'inCtl', to: 'blockIn', label: { en: 'block', de: 'blockieren' } },
        { id: 'e-bout', from: 'outCtl', to: 'blockOut', label: { en: 'block', de: 'blockieren' } },
        { id: 'e-bout-resp', from: 'blockOut', to: 'resp', label: 'blocked: true', via: [[890, 70]] },
        { id: 'e-tool', from: 'model', to: 'toolCtl', bidir: true, label: { en: 'tool call/response', de: 'Tool-Call/-Antwort' } },
        { id: 'e-tools', from: 'toolCtl', to: 'tools', bidir: true },
        { id: 'e-tstop', from: 'toolCtl', to: 'toolStop', label: { en: 'block', de: 'blockieren' } },
      ],
      steps: [
        {
          title: { en: 'One guardrail, many controls', de: 'Ein Guardrail, viele Controls' },
          text: {
            en: 'A guardrail is a named set of controls that you assign to model deployments and agents. Each control names a risk, the intervention points to scan and an action. Models start with **Microsoft.DefaultV2**: the four harm categories at Medium, user prompt attack detection and protected material detection for text and code.',
            de: 'Ein Guardrail ist eine benannte Sammlung von Controls, die du Modell-Deployments und Agents zuweist. Jedes Control legt ein Risiko, die zu prüfenden Intervention Points und eine Aktion fest. Modelle starten mit **Microsoft.DefaultV2**: die vier Schadenskategorien auf Medium, Erkennung von User Prompt Attacks und Protected-Material-Erkennung für Text und Code.',
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
            en: 'For agents (preview), controls can also scan the tool call the model proposes and the tool response before it enters the agent memory — for example, an indirect attack hidden in a web page returned by Bing Grounding. When such a control blocks, the agent stops: the tool call isn\'t executed or the tool content isn\'t saved. Only tools that support moderation are scanned.',
            de: 'Bei Agents (Preview) können Controls zusätzlich den vom Modell vorgeschlagenen Tool Call und die Tool-Antwort prüfen, bevor sie ins Gedächtnis des Agents gelangt – etwa einen Indirect Attack in einer von Bing Grounding gelieferten Webseite. Blockiert ein solches Control, stoppt der Agent: Der Tool Call wird nicht ausgeführt bzw. der Tool-Inhalt nicht gespeichert. Geprüft werden nur Tools, die Moderation unterstützen.',
          },
          focus: ['e-tool', 'toolCtl', 'e-tools', 'tools', 'e-tstop', 'toolStop'],
        },
        {
          title: { en: 'Scan the output, annotate or block', de: 'Ausgabe prüfen: annotieren oder blockieren' },
          text: {
            en: 'Output controls check the completion for harms, protected material (text and code) and PII (preview). A blocked output raises no error: in the **Responses API** (OpenAI-compatible API that returns a response object; keeps state via `previous_response_id` or a conversation), the `content_filters` annotations then show `blocked: true` for the `completion`.',
            de: 'Ausgabe-Controls prüfen die Completion auf Schäden, Protected Material (Text und Code) und PII (Preview). Eine blockierte Ausgabe löst keinen Fehler aus: In der **Responses API** (OpenAI-kompatible API, die ein Response-Objekt zurückgibt; hält den Zustand über `previous_response_id` oder eine Conversation) zeigen die `content_filters`-Annotationen dann `blocked: true` für die `completion`.',
          },
          focus: ['e-out', 'outCtl', 'e-bout', 'blockOut', 'e-bout-resp', 'e-resp', 'resp'],
        },
      ],
    },
    {
      id: 'rai-cycle',
      title: { en: 'Map, measure, mitigate, manage — and repeat', de: 'Map, Measure, Mitigate, Manage – und wiederholen' },
      caption: {
        en: 'The four stages of responsible generative AI and the Foundry tools that support each one.',
        de: 'Die vier Phasen verantwortungsvoller generativer KI und die Foundry-Werkzeuge, die jede davon unterstützen.',
      },
      width: 960,
      height: 380,
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
        { id: 's5', from: 'redteam', to: 'monitor', dashed: true, label: { en: 'scheduled scans', de: 'geplante Scans' }, via: [[105, 345], [855, 345]] },
        { id: 'loop', from: 'manage', to: 'map', label: { en: 'new harms found', de: 'neue Schäden' }, via: [[855, 60], [105, 60]] },
      ],
      steps: [
        {
          title: { en: 'Map the harms', de: 'Schäden mappen' },
          text: {
            en: 'Identify the harms your scenario can cause (for example, wrong cooking times or a poison recipe), prioritize them by likelihood and impact, verify them with red teaming, then document and share the list. The AI Red Teaming Agent automates adversarial probing with attack strategies from PyRIT (Python Risk Identification Tool, Microsoft\'s open-source red-teaming framework) and reports the Attack Success Rate (ASR): successful attacks ÷ all attacks.',
            de: 'Erkenne die Schäden, die dein Szenario verursachen kann (etwa falsche Garzeiten oder ein Giftrezept), priorisiere sie nach Wahrscheinlichkeit und Auswirkung, prüfe sie per Red Teaming und dokumentiere die Liste für alle Beteiligten. Der AI Red Teaming Agent automatisiert adversariale Tests mit Angriffsstrategien aus PyRIT (Python Risk Identification Tool, das Open-Source-Red-Teaming-Framework von Microsoft) und meldet die Attack Success Rate (ASR): erfolgreiche Angriffe ÷ alle Angriffe.',
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
            en: 'Combine four layers: the **model** (choose or fine-tune it), the **safety system** (guardrails, Prompt Shields), the **system message and grounding** (instructions plus **RAG** — retrieve relevant content and ground the answer in it) and the **user experience** (constrained input, output validation, transparency). Then measure again against the baseline.',
            de: 'Kombiniere vier Ebenen: das **Modell** (auswählen oder fine-tunen), das **Safety-System** (Guardrails, Prompt Shields), **Systemnachricht und Grounding** (Anweisungen plus **RAG** – relevante Inhalte abrufen und die Antwort darauf stützen) und die **User Experience** (eingeschränkte Eingaben, Ausgabeprüfung, Transparenz). Miss danach erneut gegen die Baseline.',
          },
          focus: ['f2', 'mitigate', 'guard', 's3'],
        },
        {
          title: { en: 'Manage the release', de: 'Release managen' },
          text: {
            en: 'Before release, run legal, privacy, security and accessibility reviews. Release in phases with an incident response plan, a rollback plan, a way to block harmful responses and abusive users, user feedback and telemetry. In production, continuous and scheduled evaluation plus scheduled red-team scans keep measuring.',
            de: 'Führe vor dem Release Prüfungen zu Recht, Datenschutz, Sicherheit und Barrierefreiheit durch. Rolle gestaffelt aus – mit Incident-Response-Plan, Rollback-Plan, der Möglichkeit, schädliche Antworten und missbräuchliche Nutzer zu blockieren, Nutzerfeedback und Telemetrie. Im Betrieb messen Continuous und Scheduled Evaluation sowie geplante Red-Team-Scans weiter.',
          },
          focus: ['f3', 'manage', 'monitor', 's4', 's5'],
        },
        {
          title: { en: 'Close the loop', de: 'Den Kreis schließen' },
          text: {
            en: 'Monitoring alerts and user reports surface new harms. Add them to the harm list and run the cycle again. The stages correspond closely to the NIST AI Risk Management Framework (the AI risk framework of the US National Institute of Standards and Technology), whose functions are Govern, Map, Measure and Manage — mitigation falls under Manage there.',
            de: 'Monitoring-Alerts und Meldungen von Nutzern decken neue Schäden auf. Nimm sie in die Schadensliste auf und durchlaufe den Zyklus erneut. Die Phasen entsprechen weitgehend dem NIST AI Risk Management Framework (dem KI-Risikorahmenwerk des US-amerikanischen National Institute of Standards and Technology) mit den Funktionen Govern, Map, Measure und Manage – Mitigation gehört dort zu Manage.',
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
        en: 'A guardrail (previously called a content filter configuration; an RAI policy in the REST API) is a named set of controls assigned to model deployments and agents. Each control defines a risk, the intervention points to scan (user input, tool call, tool response, output) and an action: Annotate, or Annotate and block. A **prompt agent** (declarative agent: model + instructions + tools, versioned in Foundry) inherits its deployment\'s guardrail unless you assign its own (preview), which then fully overrides it. A **hosted agent** (your own agent code in a container that Foundry runs) gets an agent-level guardrail only through `rai_config` (without `rai_policy_name`: Microsoft.DefaultV2); deployment filters still apply to its model calls.',
        de: 'Ein Guardrail (früher Content-Filter-Konfiguration, in der REST API eine RAI-Policy) ist eine benannte Sammlung von Controls, die Modell-Deployments und Agents zugewiesen wird. Jedes Control legt ein Risiko, die zu prüfenden Intervention Points (User input, Tool call, Tool response, Output) und eine Aktion fest: Annotate oder Annotate and block. Ein **Prompt-Agent** (deklarativer Agent: Modell + Anweisungen + Tools, in Foundry versioniert) erbt den Guardrail seines Deployments, außer du weist ihm einen eigenen zu (Preview), der ihn dann vollständig ersetzt. Ein **Hosted Agent** (dein eigener Agent-Code in einem Container, den Foundry ausführt) erhält einen Guardrail auf Agent-Ebene nur über `rai_config` (ohne `rai_policy_name`: Microsoft.DefaultV2); für seine Modellaufrufe gelten weiterhin die Filter des Deployments.',
      },
    },
    {
      term: 'Severity and blocking level',
      text: {
        en: 'Guardrail classifiers rate hate, sexual, violence and self-harm content as safe, low, medium or high. The blocking level sets the strictness: **Low** blocks only high, **Medium** (default) blocks medium and high, **High** blocks low, medium and high. Content rated safe is never filtered. Risk and safety evaluators score severity 0–7 (very low 0–1, low 2–3, medium 4–5, high 6–7). The Content Safety APIs return plain numbers on the same scale: text 0, 2, 4 or 6 by default (0–7 with `EightSeverityLevels`), images 0, 2, 4 or 6 only.',
        de: 'Guardrail-Klassifizierer stufen Inhalte zu Hate, Sexual, Violence und Self-harm als safe, low, medium oder high ein. Der Blocking Level legt die Strenge fest: **Low** blockiert nur high, **Medium** (Standard) blockiert medium und high, **High** blockiert low, medium und high. Als safe eingestufte Inhalte werden nie gefiltert. Risk-and-Safety-Evaluatoren bewerten den Schweregrad mit 0–7 (sehr niedrig 0–1, niedrig 2–3, mittel 4–5, hoch 6–7). Die Content-Safety-APIs liefern reine Zahlen auf derselben Skala: Text standardmäßig 0, 2, 4 oder 6 (0–7 mit `EightSeverityLevels`), Bilder nur 0, 2, 4 oder 6.',
      },
    },
    {
      term: 'Prompt Shields',
      text: {
        en: 'Detect user prompt attacks (jailbreaks; formerly jailbreak risk detection) in the user input and document attacks (indirect prompt injection) in marked documents or agent tool responses. User prompt attack detection is on by default; document attack detection is off until you enable it. **Spotlighting** (preview, Chat Completions only) base64-encodes documents so that the model trusts them less than user and system prompts. For text inside images, run OCR first and send the extracted text to the Prompt Shields API as a document.',
        de: 'Erkennen User Prompt Attacks (Jailbreaks; früher Jailbreak Risk Detection) in der Nutzereingabe und Document Attacks (indirekte Prompt Injection) in markierten Dokumenten oder Tool-Antworten von Agents. Die Erkennung von User Prompt Attacks ist standardmäßig an, die von Document Attacks aus, bis du sie aktivierst. **Spotlighting** (Preview, nur Chat Completions) kodiert Dokumente in Base64, damit das Modell ihnen weniger traut als Nutzer- und Systemprompts. Text in Bildern extrahierst du zuerst per OCR und schickst ihn als Dokument an die Prompt-Shields-API.',
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
        en: 'Automates adversarial probing with PyRIT attack strategies — for example Base64 encoding, flipped characters or attacks spread over several turns — scores every attack-response pair with the risk and safety evaluators and reports the ASR. Run it in the cloud for agents, before deployment and on a schedule afterward.',
        de: 'Automatisiert adversariale Tests mit PyRIT-Angriffsstrategien – etwa Base64-Kodierung, umgedrehte Zeichen oder über mehrere Runden verteilte Angriffe –, bewertet jedes Angriff-Antwort-Paar mit den Risk-and-Safety-Evaluatoren und meldet die ASR. Führe ihn für Agents in der Cloud aus – vor dem Deployment und danach nach Zeitplan.',
      },
    },
    {
      term: 'Agent Monitoring Dashboard',
      text: {
        en: 'With an Application Insights resource connected to the project, an agent\'s **Monitor** tab shows token usage, latency, run success rate, evaluation scores and red-teaming results. Its settings add recurring evaluations, red team scans and alerts (preview); the table below shows which check fits which job.',
        de: 'Ist eine Application-Insights-Ressource mit dem Projekt verbunden, zeigt der Tab **Monitor** eines Agents Token-Verbrauch, Latenz, Run-Erfolgsquote, Evaluierungsscores und Red-Teaming-Ergebnisse. In den Einstellungen ergänzt du wiederkehrende Evaluierungen, Red-Team-Scans und Alerts (Preview); welche Prüfung wofür passt, zeigt die Tabelle unten.',
      },
    },
  ],
  comparison: {
    title: { en: 'Which control or tool for which job?', de: 'Welches Control oder Werkzeug für welche Aufgabe?' },
    columns: [
      { en: 'Job', de: 'Aufgabe' },
      { en: 'Use', de: 'Verwende' },
      { en: 'Runs on', de: 'Läuft auf' },
      { en: 'Good to know', de: 'Gut zu wissen' },
    ],
    rows: [
      [
        { en: 'Block hate, sexual, violent or self-harm content', de: 'Hass, sexuelle, gewalttätige oder selbstverletzende Inhalte blockieren' },
        { en: 'Guardrail: harm category controls with a blocking level', de: 'Guardrail: Controls für Schadenskategorien mit Blocking Level' },
        { en: 'User input and output', de: 'Nutzereingabe und Ausgabe' },
        { en: 'In DefaultV2 at Medium', de: 'In DefaultV2 auf Medium' },
      ],
      [
        { en: 'Stop jailbreaks in the prompt', de: 'Jailbreaks im Prompt stoppen' },
        { en: 'Guardrail: user prompt attack (Prompt Shields)', de: 'Guardrail: User Prompt Attack (Prompt Shields)' },
        { en: 'User input', de: 'Nutzereingabe' },
        { en: 'In DefaultV2', de: 'In DefaultV2' },
      ],
      [
        { en: 'Catch instructions hidden in documents or tool results', de: 'In Dokumenten oder Tool-Ergebnissen versteckte Anweisungen erkennen' },
        { en: 'Guardrail: document attack (Prompt Shields)', de: 'Guardrail: Document Attack (Prompt Shields)' },
        { en: 'Text inside `<documents>` delimiters (Chat Completions); tool responses (agents, preview)', de: 'Text in `<documents>`-Trennern (Chat Completions); Tool-Antworten (Agents, Preview)' },
        { en: 'Off by default — enable it', de: 'Standardmäßig aus – aktivieren' },
      ],
      [
        { en: 'Flag copyrighted text or code', de: 'Urheberrechtlich geschützten Text oder Code markieren' },
        { en: 'Guardrail: protected material (text, code)', de: 'Guardrail: Protected Material (Text, Code)' },
        { en: 'Output', de: 'Ausgabe' },
        { en: 'In DefaultV2', de: 'In DefaultV2' },
      ],
      [
        { en: 'Catch personal data such as email addresses', de: 'Personenbezogene Daten wie E-Mail-Adressen erkennen' },
        { en: 'Guardrail: PII (preview)', de: 'Guardrail: PII (Preview)' },
        { en: 'Output', de: 'Ausgabe' },
        { en: 'Not in DefaultV2', de: 'Nicht in DefaultV2' },
      ],
      [
        { en: 'Block your own forbidden terms', de: 'Eigene verbotene Begriffe blockieren' },
        { en: 'Guardrail: custom blocklist', de: 'Guardrail: eigene Blockliste' },
        { en: 'User input and/or output', de: 'Nutzereingabe und/oder Ausgabe' },
        { en: 'Azure OpenAI models only', de: 'Nur Azure-OpenAI-Modelle' },
      ],
      [
        { en: 'Check answers against the provided sources at runtime', de: 'Antworten zur Laufzeit gegen die Quellen prüfen' },
        { en: 'Guardrail: groundedness (preview)', de: 'Guardrail: Groundedness (Preview)' },
        { en: 'Output of models, not agents', de: 'Ausgabe von Modellen, nicht Agents' },
        { en: 'Retires April 30, 2027 — use the Groundedness evaluator', de: 'Wird am 30. April 2027 eingestellt – nutze den Groundedness-Evaluator' },
      ],
      [
        { en: 'Moderate uploaded images without a model call', de: 'Hochgeladene Bilder ohne Modellaufruf moderieren' },
        'API: Analyze Image (Azure AI Content Safety)',
        { en: 'The image', de: 'Das Bild' },
        { en: 'Four harm categories, severity 0, 2, 4 or 6', de: 'Vier Schadenskategorien, Schweregrad 0, 2, 4 oder 6' },
      ],
      [
        { en: 'Catch instructions written as text inside images', de: 'Als Text in Bildern geschriebene Anweisungen erkennen' },
        { en: 'Your app: OCR, then the Prompt Shields API', de: 'Deine App: OCR, dann die Prompt-Shields-API' },
        { en: 'Text extracted from the image, sent in `documents`', de: 'Aus dem Bild extrahierter Text, gesendet in `documents`' },
        { en: 'OCR (optical character recognition), e.g. Azure Document Intelligence in Foundry Tools', de: 'OCR (optische Zeichenerkennung), z. B. Azure Document Intelligence in Foundry Tools' },
      ],
      [
        { en: 'Probe for attacks before and after release', de: 'Vor und nach dem Release auf Angriffe testen' },
        'Foundry: AI Red Teaming Agent',
        { en: 'Generated attack prompts', de: 'Generierte Angriffsprompts' },
        { en: 'Reports the ASR per risk category', de: 'Meldet die ASR pro Risikokategorie' },
      ],
      [
        { en: 'Score real answers in production', de: 'Echte Antworten im Betrieb bewerten' },
        { en: 'Foundry: continuous evaluation', de: 'Foundry: Continuous Evaluation' },
        { en: 'Sampled live traffic', de: 'Stichproben aus dem Live-Traffic' },
        { en: 'Catches quality or safety drops as they happen', de: 'Erkennt Qualitäts- oder Sicherheitseinbrüche, sobald sie auftreten' },
      ],
      [
        { en: 'Detect drift: quality that slowly changes after model, prompt or data updates', de: 'Drift erkennen: Qualität, die sich nach Modell-, Prompt- oder Datenupdates schleichend ändert' },
        { en: 'Foundry: scheduled evaluation', de: 'Foundry: Scheduled Evaluation' },
        { en: 'The same test dataset on a fixed schedule', de: 'Dasselbe Testdataset nach festem Zeitplan' },
        { en: 'Scores stay comparable over time', de: 'Scores bleiben über die Zeit vergleichbar' },
      ],
      [
        { en: 'Alert on safety events', de: 'Bei Sicherheitsereignissen alarmieren' },
        'Azure Monitor: Blocked Volume, Harmful Volume Detected',
        { en: 'Platform metrics of the deployment', de: 'Plattformmetriken des Deployments' },
        { en: 'Split by `Category` to see which risk spikes', de: 'Nach `Category` aufteilen, um zu sehen, welches Risiko ansteigt' },
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
        model="gpt-5-mini",                   # deployment name
        input="Summarize our refund policy.",
    )
except BadRequestError as error:
    if error.code != "content_filter":
        raise
    print("Sorry, I can't help with that request.")   # input was blocked
else:
    # content_filters is a Foundry extension, so read it from model_extra
    filters = response.model_extra.get("content_filters", [])
    output_blocked = any(
        f["blocked"] and f["source_type"] == "completion" for f in filters
    )
    print("Sorry, I can't show that answer." if output_blocked
          else response.output_text)`,
      notes: [
        {
          en: 'Blocked input never reaches the model: the call fails with HTTP 400 and the error code `content_filter`.',
          de: 'Blockierte Eingaben erreichen das Modell nie: Der Aufruf scheitert mit HTTP 400 und dem Fehlercode `content_filter`.',
        },
        {
          en: 'Blocked output raises no error: its `content_filters` entry has `source_type` `completion` and `blocked` `true`, so show a fallback instead of `output_text`. Chat Completions use `prompt_filter_results`, `content_filter_results` and `finish_reason` `content_filter` instead.',
          de: 'Blockierte Ausgaben lösen keinen Fehler aus: Ihr `content_filters`-Eintrag hat `source_type` `completion` und `blocked` `true` – zeig dann einen Ersatztext statt `output_text`. Chat Completions nutzen stattdessen `prompt_filter_results`, `content_filter_results` und `finish_reason` `content_filter`.',
        },
        {
          en: '`model` takes your deployment name. A deployment can have any name; these samples call it `gpt-5-mini`.',
          de: '`model` erwartet den Namen deines Deployments. Ein Deployment kann beliebig heißen; diese Beispiele nennen es `gpt-5-mini`.',
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
         "initialization_parameters": {"model": "gpt-5-mini"},  # judge deployment
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
          en: 'Groundedness is an LLM judge that needs a judge deployment (passed as `model`, as in the how-to samples; some evaluator reference pages show `deployment_name`) and scores 1–5 (higher is better); violence runs on Microsoft-hosted safety models and scores severity 0–7 (lower is better).',
          de: 'Groundedness ist ein LLM-Judge, der ein Judge-Deployment braucht (übergeben als `model` wie in den How-to-Beispielen; manche Referenzseiten der Evaluatoren zeigen `deployment_name`), und vergibt 1–5 (höher ist besser); Violence läuft auf von Microsoft gehosteten Sicherheitsmodellen und bewertet den Schweregrad 0–7 (niedriger ist besser).',
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
      en: 'Document attack detection is **off by default**. Learn documents the `<documents>` delimiter only for Chat Completions messages (the Responses API page shows no separate format); for agents, add an indirect attack control at the **Tool response** intervention point.',
      de: 'Die Erkennung von Document Attacks ist **standardmäßig aus**. Learn dokumentiert den Trenner `<documents>` nur für Chat-Completions-Nachrichten (die Seite zur Responses API zeigt kein eigenes Format); bei Agents fügst du ein Indirect-Attack-Control am Intervention Point **Tool response** hinzu.',
    },
    {
      en: 'A prompt agent\'s own guardrail **fully overrides** its deployment\'s — the two never merge — and without one it inherits the deployment\'s. A hosted agent gets no agent-level guardrail unless `rai_config` is set. Agents support only **Annotate and block**, and Spotlighting and Groundedness controls do not apply to agents.',
      de: 'Der eigene Guardrail eines Prompt-Agents **ersetzt** den des Deployments vollständig – sie werden nie zusammengeführt –, und ohne eigenen erbt er den des Deployments. Ein Hosted Agent hat ohne `rai_config` keinen Guardrail auf Agent-Ebene. Agents unterstützen nur **Annotate and block**, und die Controls Spotlighting und Groundedness gelten nicht für Agents.',
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
