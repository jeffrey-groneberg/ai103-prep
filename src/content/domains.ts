import type { Domain } from '../lib/types.ts'

/**
 * The exam's skills outline: domains with their official weight ranges, skill groups and bullets.
 * English bullet text is quoted verbatim from the study guide (exam.json links.studyGuide, version
 * skillsOutlineDate, "Skills measured as of April 16, 2026"); German text is a translation. Bullet ids
 * ("1.2.3" = domain 1, group 2, bullet 3) are the app's own numbering, because the study guide does not number its bullets.
 */
export const domains: Domain[] = [
  {
    id: 'D1',
    title: { en: 'Plan and manage an Azure AI solution', de: 'Azure-KI-Lösung planen und verwalten' },
    short: { en: 'Plan & manage', de: 'Planen & verwalten' },
    weight: [25, 30],
    icon: 'cloud',
    groups: [
      {
        id: '1.1',
        title: { en: 'Choose the appropriate Foundry services for generative AI and agents', de: 'Passende Foundry-Dienste für generative KI und Agents wählen' },
        bullets: [
          { id: '1.1.1', en: 'Choose an appropriate model for each task, including large language models (LLMs), small language models, multimodal models, and Foundry Tools', de: 'Passendes Modell je Aufgabe wählen: LLMs, Small Language Models, multimodale Modelle und Foundry Tools' },
          { id: '1.1.2', en: 'Choose the appropriate Foundry services for generative tasks, grounding, vector search, agent workflows, or multimodal processing', de: 'Passende Foundry-Dienste für generative Aufgaben, Grounding, Vektorsuche, Agent-Workflows oder multimodale Verarbeitung wählen' },
          { id: '1.1.3', en: 'Choose an appropriate method for retrieval and indexing', de: 'Passende Methode für Retrieval und Indexierung wählen' },
          { id: '1.1.4', en: 'Choose appropriate memory, tool, and knowledge integration services for agent solutions', de: 'Passende Dienste für Memory, Tools und Wissensanbindung von Agents wählen' },
        ],
      },
      {
        id: '1.2',
        title: { en: 'Set up AI solutions in Foundry', de: 'KI-Lösungen in Foundry einrichten' },
        bullets: [
          { id: '1.2.1', en: 'Design Azure infrastructure for AI apps and agent-based solutions', de: 'Azure-Infrastruktur für KI-Apps und Agent-Lösungen entwerfen' },
          { id: '1.2.2', en: 'Choose appropriate deployment options', de: 'Passende Bereitstellungsoptionen wählen' },
          { id: '1.2.3', en: 'Configure model and agent deployments', de: 'Modell- und Agent-Bereitstellungen konfigurieren' },
          { id: '1.2.4', en: 'Integrate Foundry projects with continuous integration and continuous deployment (CI/CD) pipelines', de: 'Foundry-Projekte in CI/CD-Pipelines integrieren' },
        ],
      },
      {
        id: '1.3',
        title: { en: 'Manage, monitor, and secure AI systems', de: 'KI-Systeme verwalten, überwachen und absichern' },
        bullets: [
          { id: '1.3.1', en: 'Manage quotas, scaling, rate limits, and cost footprints for model and agent workloads', de: 'Kontingente, Skalierung, Ratenlimits und Kosten für Modell- und Agent-Workloads steuern' },
          { id: '1.3.2', en: 'Monitor model performance, drift, safety events, and grounding quality', de: 'Modellleistung, Drift, Sicherheitsereignisse und Grounding-Qualität überwachen' },
          { id: '1.3.3', en: 'Monitor data ingestion quality, search index health, and relevance performance', de: 'Qualität der Datenaufnahme, Zustand des Suchindex und Relevanz überwachen' },
          { id: '1.3.4', en: 'Configure security, including managed identity, private networking, keyless credentials, and role policies', de: 'Sicherheit konfigurieren: Managed Identity, private Netzwerke, schlüssellose Anmeldung und Rollen' },
        ],
      },
      {
        id: '1.4',
        title: { en: 'Implement responsible AI across generative AI and agentic systems', de: 'Verantwortungsvolle KI in generativen und agentischen Systemen umsetzen' },
        bullets: [
          { id: '1.4.1', en: 'Configure safety filters, guardrails, risk detection, and content moderation', de: 'Sicherheitsfilter, Guardrails, Risikoerkennung und Inhaltsmoderation konfigurieren' },
          { id: '1.4.2', en: 'Apply responsible AI instrumentation, including evaluators, safety evaluations, and explanation tooling', de: 'Responsible-AI-Instrumentierung anwenden: Evaluatoren, Sicherheitsevaluierungen und Erklärwerkzeuge' },
          { id: '1.4.3', en: 'Implement auditing through trace logging, provenance metadata, and approval workflows', de: 'Auditing über Trace-Logging, Herkunftsmetadaten und Genehmigungsworkflows umsetzen' },
          { id: '1.4.4', en: 'Govern agent behavior with oversight modes, constraints, and tool-access controls', de: 'Agent-Verhalten über Aufsichtsmodi, Einschränkungen und Tool-Zugriffskontrollen steuern' },
        ],
      },
    ],
  },
  {
    id: 'D2',
    title: { en: 'Implement generative AI and agentic solutions', de: 'Generative KI und agentische Lösungen implementieren' },
    short: { en: 'GenAI & agents', de: 'GenAI & Agents' },
    weight: [30, 35],
    icon: 'brain',
    groups: [
      {
        id: '2.1',
        title: { en: 'Build generative applications by using Foundry', de: 'Generative Anwendungen mit Foundry bauen' },
        bullets: [
          { id: '2.1.1', en: 'Deploy and consume LLMs, small models, code models, and multimodal models', de: 'LLMs, kleine Modelle, Code-Modelle und multimodale Modelle bereitstellen und nutzen' },
          { id: '2.1.2', en: 'Implement retrieval-augmented generation (RAG) in an application', de: 'Retrieval-Augmented Generation (RAG) in einer Anwendung umsetzen' },
          { id: '2.1.3', en: 'Design workflows, tool-augmented flows, and multistep reasoning pipelines', de: 'Workflows, Tool-gestützte Abläufe und mehrstufige Reasoning-Pipelines entwerfen' },
          { id: '2.1.4', en: 'Evaluate models and apps, including detecting fabrications, relevance, quality, and safety', de: 'Modelle und Apps evaluieren: Erfindungen, Relevanz, Qualität und Sicherheit erkennen' },
          { id: '2.1.5', en: 'Integrate generative workflows into applications by using Foundry SDKs and connectors', de: 'Generative Workflows mit Foundry-SDKs und Connectors in Anwendungen integrieren' },
          { id: '2.1.6', en: 'Configure an application to connect to a Foundry project', de: 'Eine Anwendung mit einem Foundry-Projekt verbinden' },
        ],
      },
      {
        id: '2.2',
        title: { en: 'Build agents by using Foundry', de: 'Agents mit Foundry bauen' },
        bullets: [
          { id: '2.2.1', en: 'Define agent roles, goals, conversation-tracking approach, and tool schemas', de: 'Rollen, Ziele, Gesprächsverfolgung und Tool-Schemas von Agents definieren' },
          { id: '2.2.2', en: 'Build agents that integrate retrieval, function-calling, and conversation memory', de: 'Agents mit Retrieval, Function Calling und Gesprächsgedächtnis bauen' },
          { id: '2.2.3', en: 'Integrate agent tools, including APIs, knowledge stores, search, content understanding, and custom functions', de: 'Agent-Tools integrieren: APIs, Wissensspeicher, Suche, Content Understanding und eigene Funktionen' },
          { id: '2.2.4', en: 'Implement orchestrated multi-agent solutions', de: 'Orchestrierte Multi-Agent-Lösungen umsetzen' },
          { id: '2.2.5', en: 'Build autonomous or semiautonomous workflows with safeguards and approval flow controls', de: 'Autonome oder teilautonome Workflows mit Schutzmechanismen und Genehmigungsschritten bauen' },
          { id: '2.2.6', en: 'Integrate monitoring into deployed agents, evaluate agent behavior, and perform error analysis', de: 'Bereitgestellte Agents überwachen, ihr Verhalten evaluieren und Fehler analysieren' },
        ],
      },
      {
        id: '2.3',
        title: { en: 'Optimize and operationalize generative AI systems', de: 'Generative KI-Systeme optimieren und betreiben' },
        bullets: [
          { id: '2.3.1', en: 'Tune generation behavior, such as prompt engineering and adjusting model parameters', de: 'Generierungsverhalten abstimmen: Prompt Engineering und Modellparameter' },
          { id: '2.3.2', en: 'Implement model reflection, chain-of-thought evaluations, and self-critique loops', de: 'Modell-Reflexion, Chain-of-Thought-Evaluierung und Selbstkritik-Schleifen umsetzen' },
          { id: '2.3.3', en: 'Set up observability by implementing tracing, token analytics, safety signals, and latency breakdowns', de: 'Observability einrichten: Tracing, Token-Analysen, Sicherheitssignale und Latenzaufschlüsselung' },
          { id: '2.3.4', en: 'Orchestrate multiple models, flows, or hybrid LLM and rules engines', de: 'Mehrere Modelle, Flows oder hybride LLM- und Regel-Engines orchestrieren' },
        ],
      },
    ],
  },
  {
    id: 'D3',
    title: { en: 'Implement computer vision solutions', de: 'Computer-Vision-Lösungen implementieren' },
    short: { en: 'Computer vision', de: 'Computer Vision' },
    weight: [10, 15],
    icon: 'eye',
    groups: [
      {
        id: '3.1',
        title: { en: 'Design and implement image- and video-generation solutions', de: 'Bild- und Videogenerierung entwerfen und umsetzen' },
        bullets: [
          { id: '3.1.1', en: 'Implement a solution that generates images from text prompts and reference media', de: 'Bilder aus Text-Prompts und Referenzmedien generieren' },
          { id: '3.1.2', en: 'Implement a solution that generates videos from text prompts and reference media', de: 'Videos aus Text-Prompts und Referenzmedien generieren' },
          { id: '3.1.3', en: 'Configure image-editing workflows, including inpainting, mask‑based edits, and prompt‑driven modifications', de: 'Bildbearbeitung konfigurieren: Inpainting, maskenbasierte und Prompt-gesteuerte Änderungen' },
          { id: '3.1.4', en: 'Implement workflows to edit generated videos', de: 'Workflows zum Bearbeiten generierter Videos umsetzen' },
          { id: '3.1.5', en: 'Select and apply appropriate generation and editing controls provided by the platform', de: 'Passende Generierungs- und Bearbeitungsparameter der Plattform wählen und anwenden' },
        ],
      },
      {
        id: '3.2',
        title: { en: 'Design and implement multimodal understanding workflows', de: 'Multimodale Verstehens-Workflows entwerfen und umsetzen' },
        bullets: [
          { id: '3.2.1', en: 'Build a solution that analyzes visual context by using multimodal models', de: 'Visuellen Kontext mit multimodalen Modellen analysieren' },
          { id: '3.2.2', en: 'Configure apps to produce concise or detailed captions for single or multiple images', de: 'Knappe oder ausführliche Bildbeschreibungen für ein oder mehrere Bilder erzeugen' },
          { id: '3.2.3', en: 'Implement a solution that enables question‑answering grounded in visual evidence', de: 'Fragen beantworten, die auf visuellen Belegen beruhen' },
          { id: '3.2.4', en: 'Configure generation of alt‑text and extended image descriptions aligned to accessibility guidelines', de: 'Alt-Texte und erweiterte Bildbeschreibungen gemäß Barrierefreiheits-Richtlinien erzeugen' },
          { id: '3.2.5', en: 'Implement visual understanding by configuring Azure Content Understanding in Foundry Tools to extract visual characteristics', de: 'Visuelle Merkmale mit Azure Content Understanding in Foundry Tools extrahieren' },
          { id: '3.2.6', en: 'Implement video analysis workflows to process and interpret video segments', de: 'Videoanalyse-Workflows für Videosegmente umsetzen' },
          { id: '3.2.7', en: 'Configure single‑task and pro‑mode Content Understanding pipelines', de: 'Content-Understanding-Pipelines für Einzelaufgaben und Pro-Modus konfigurieren' },
          { id: '3.2.8', en: 'Implement solutions that identify objects, components, or regions within images or video', de: 'Objekte, Komponenten oder Bereiche in Bildern oder Videos identifizieren' },
        ],
      },
      {
        id: '3.3',
        title: { en: 'Implement responsible AI for multimodal content', de: 'Verantwortungsvolle KI für multimodale Inhalte umsetzen' },
        bullets: [
          { id: '3.3.1', en: 'Implement filters to classify unsafe or disallowed visual content', de: 'Filter zur Klassifizierung unsicherer oder unzulässiger Bildinhalte umsetzen' },
          { id: '3.3.2', en: 'Detect and mitigate indirect prompt injection by using embedded text in images', de: 'Indirekte Prompt Injection über eingebetteten Text in Bildern erkennen und abwehren' },
          { id: '3.3.3', en: 'Enforce visual policy rules, such as applying watermarks, flagging prohibited symbols, upholding brand usage requirements, and detecting potentially inappropriate content', de: 'Visuelle Richtlinien durchsetzen: Wasserzeichen, verbotene Symbole, Markenvorgaben und potenziell unangemessene Inhalte' },
        ],
      },
    ],
  },
  {
    id: 'D4',
    title: { en: 'Implement text analysis solutions', de: 'Textanalyse-Lösungen implementieren' },
    short: { en: 'Text & speech', de: 'Text & Sprache' },
    weight: [10, 15],
    icon: 'textList',
    groups: [
      {
        id: '4.1',
        title: { en: 'Apply language model text analysis', de: 'Textanalyse mit Sprachmodellen anwenden' },
        bullets: [
          { id: '4.1.1', en: 'Implement solutions to extract entities, topics, summaries, and structured JSON outputs by using generative prompting and Foundry Tools', de: 'Entitäten, Themen, Zusammenfassungen und strukturiertes JSON per generativem Prompting und Foundry Tools extrahieren' },
          { id: '4.1.2', en: 'Configure detection of sentiment, tone, safety issues, and sensitive content', de: 'Erkennung von Stimmung, Tonalität, Sicherheitsproblemen und sensiblen Inhalten konfigurieren' },
          { id: '4.1.3', en: 'Build solutions that translate text by using Azure Translator in Foundry Tools or LLM‑powered translation flows', de: 'Text mit Azure Translator in Foundry Tools oder LLM-basierten Abläufen übersetzen' },
          { id: '4.1.4', en: 'Customize language model outputs for domain tasks, such as compliance summarization and domain extraction', de: 'Sprachmodell-Ausgaben für Fachaufgaben anpassen, etwa Compliance-Zusammenfassungen und Fachextraktion' },
        ],
      },
      {
        id: '4.2',
        title: { en: 'Implement speech solutions', de: 'Sprachlösungen (Speech) umsetzen' },
        bullets: [
          { id: '4.2.1', en: 'Implement workflows to convert speech to text and text to speech for agentic interactions', de: 'Speech-to-Text und Text-to-Speech für agentische Interaktionen umsetzen' },
          { id: '4.2.2', en: 'Integrate speech as an agent modality, including custom speech models', de: 'Sprache als Agent-Modalität integrieren, inklusive Custom-Speech-Modellen' },
          { id: '4.2.3', en: 'Enable multimodal reasoning from audio inputs', de: 'Multimodales Reasoning über Audioeingaben ermöglichen' },
          { id: '4.2.4', en: 'Translate speech into other languages by using language models and Foundry Tools', de: 'Gesprochene Sprache mit Sprachmodellen und Foundry Tools übersetzen' },
        ],
      },
    ],
  },
  {
    id: 'D5',
    title: { en: 'Implement information extraction solutions', de: 'Lösungen zur Informationsextraktion implementieren' },
    short: { en: 'Information extraction', de: 'Informationsextraktion' },
    weight: [10, 15],
    icon: 'documentSearch',
    groups: [
      {
        id: '5.1',
        title: { en: 'Build retrieval and grounding pipelines', de: 'Retrieval- und Grounding-Pipelines bauen' },
        bullets: [
          { id: '5.1.1', en: 'Ingest and index content, such as documents, images, audio, and video', de: 'Inhalte wie Dokumente, Bilder, Audio und Video aufnehmen und indexieren' },
          { id: '5.1.2', en: 'Configure semantic search, hybrid search, and vector search for grounding', de: 'Semantische, hybride und Vektorsuche für Grounding konfigurieren' },
          { id: '5.1.3', en: 'Implement enrichment by using custom or built-in skills for text, images, and layout', de: 'Anreicherung mit eigenen oder integrierten Skills für Text, Bilder und Layout umsetzen' },
          { id: '5.1.4', en: 'Configure RAG ingestion flow, including documents and using optical character recognition (OCR)', de: 'RAG-Aufnahmefluss für Dokumente inklusive OCR konfigurieren' },
          { id: '5.1.5', en: 'Connect retrieval pipelines directly to workflows and agent tools', de: 'Retrieval-Pipelines direkt an Workflows und Agent-Tools anbinden' },
        ],
      },
      {
        id: '5.2',
        title: { en: 'Extract content from documents', de: 'Inhalte aus Dokumenten extrahieren' },
        bullets: [
          { id: '5.2.1', en: 'Extract information by using multimodal pipelines that combine OCR, layout analysis, and field extraction', de: 'Informationen mit multimodalen Pipelines aus OCR, Layoutanalyse und Feldextraktion gewinnen' },
          { id: '5.2.2', en: 'Produce clean, grounded representations to use with agents and RAG by using Content Understanding', de: 'Saubere, belegbare Darstellungen für Agents und RAG mit Content Understanding erzeugen' },
          { id: '5.2.3', en: 'Implement analyzers for generating structured or markdown outputs for downstream reasoning by using Content Understanding', de: 'Analyzer für strukturierte oder Markdown-Ausgaben mit Content Understanding umsetzen' },
        ],
      },
    ],
  },
]

