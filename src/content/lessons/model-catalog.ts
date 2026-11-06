import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'model-catalog',
  summary: {
    en: 'The Foundry model catalog holds thousands of models in two groups: **Foundry Models sold by Azure** (hosted, billed and supported by Microsoft, covered by Azure SLAs, including all Azure OpenAI models) and **models from partners and community** (supported by their providers, often billed through Azure Marketplace). You shortlist candidates with model cards and **leaderboards** (quality, safety, cost, throughput) and then **deploy** one — normally as a Serverless API deployment whose **deployment type** decides where inference data is processed and how you pay. Every deployment draws on your **quota** in tokens per minute or on reserved **provisioned throughput units (PTUs)**, so you plan rate limits and cost from the start. Before your app calls the deployment by name, you test it in the playground and **evaluate** it systematically with built-in evaluators on your own data.',
    de: 'Der Foundry-Modellkatalog enthält Tausende Modelle in zwei Gruppen: **Foundry Models sold by Azure** (von Microsoft gehostet, abgerechnet und unterstützt, mit Azure-SLAs, inklusive aller Azure-OpenAI-Modelle) und **Modelle von Partnern und Community** (vom jeweiligen Anbieter unterstützt, oft über Azure Marketplace abgerechnet). Du erstellst mit Model Cards und **Leaderboards** (Qualität, Sicherheit, Kosten, Durchsatz) eine Shortlist und **stellst** dann ein Modell **bereit** – meist als Serverless-API-Deployment, dessen **Deployment-Typ** festlegt, wo Inferenzdaten verarbeitet werden und wie du bezahlst. Jedes Deployment zehrt von deinem **Kontingent** in Tokens pro Minute oder von reservierten **Provisioned Throughput Units (PTUs)** – Ratenlimits und Kosten planst du also von Anfang an mit. Bevor deine App das Deployment per Namen aufruft, testest du es im Playground und **evaluierst** es systematisch mit integrierten Evaluatoren auf deinen eigenen Daten.',
  },
  examFocus: {
    en: 'Expect requirement-driven choices: which deployment type fits data residency, throughput and cost (Global Standard, Data Zone, Standard, Provisioned, Batch, Developer), when managed compute applies, how TPM/RPM quota and HTTP 429 work, when PTUs, spillover, batch or model router save money, how to configure a deployment (name, SKU, version upgrade policy, content filter policy) and which evaluator answers which question — including which ones need ground truth.',
    de: 'Rechne mit anforderungsgetriebenen Entscheidungen: Welcher Deployment-Typ passt zu Datenresidenz, Durchsatz und Kosten (Global Standard, Data Zone, Standard, Provisioned, Batch, Developer), wann Managed Compute passt, wie TPM/RPM-Kontingent und HTTP 429 funktionieren, wann PTUs, Spillover, Batch oder Model Router Geld sparen, wie du ein Deployment konfigurierst (Name, SKU, Versions-Upgrade-Richtlinie, Content-Filter-Richtlinie) und welcher Evaluator welche Frage beantwortet – inklusive der Frage, welche Ground Truth brauchen.',
  },
  diagrams: [
    {
      id: 'select-deploy-evaluate',
      title: { en: 'The select → deploy → evaluate loop', de: 'Der Kreislauf Auswählen → Bereitstellen → Evaluieren' },
      caption: {
        en: 'Benchmarks shortlist, the playground gives a first feel, evaluations on your own data decide — and failing scores send you around the loop again.',
        de: 'Benchmarks liefern die Shortlist, der Playground einen ersten Eindruck, Evaluierungen auf deinen Daten entscheiden – und schwache Scores schicken dich erneut durch die Schleife.',
      },
      width: 960,
      height: 420,
      nodes: [
        { id: 'c-cat', x: 20, y: 50, w: 170, h: 64, label: { en: 'Model catalog', de: 'Modellkatalog' }, sub: { en: 'filters · model cards', de: 'Filter · Model Cards' }, tone: 'foundry', shape: 'doc' },
        { id: 'c-board', x: 300, y: 50, w: 180, h: 64, label: 'Leaderboards', sub: { en: 'quality · safety · cost', de: 'Qualität · Safety · Kosten' }, tone: 'foundry' },
        { id: 'c-dep', x: 590, y: 50, w: 190, h: 64, label: 'Deployment', sub: { en: 'type · name · capacity', de: 'Typ · Name · Kapazität' }, tone: 'model', shape: 'store' },
        { id: 'c-play', x: 590, y: 190, w: 190, h: 64, label: 'Playground', sub: { en: 'manual, up to 3 models', de: 'manuell, bis zu 3 Modelle' }, tone: 'foundry' },
        { id: 'c-app', x: 20, y: 325, w: 170, h: 64, label: { en: 'Your app', de: 'Deine App' }, sub: { en: 'model = deployment', de: 'model = Deployment' }, tone: 'app' },
        { id: 'c-gate', x: 300, y: 320, w: 180, h: 74, label: { en: 'Meets the bar?', de: 'Gut genug?' }, tone: 'neutral', shape: 'diamond' },
        { id: 'c-eval', x: 300, y: 190, w: 180, h: 64, label: { en: 'Evaluation', de: 'Evaluierung' }, sub: { en: 'evaluators + dataset', de: 'Evaluatoren + Dataset' }, tone: 'foundry' },
        { id: 'c-iter', x: 590, y: 325, w: 190, h: 64, label: { en: 'Improve', de: 'Verbessern' }, sub: { en: 'prompt · RAG · model', de: 'Prompt · RAG · Modell' }, tone: 'neutral' },
      ],
      edges: [
        { id: 'c-e1', from: 'c-cat', to: 'c-board', label: { en: 'shortlist', de: 'Shortlist' } },
        { id: 'c-e2', from: 'c-board', to: 'c-dep', label: { en: 'deploy', de: 'bereitstellen' } },
        { id: 'c-e3', from: 'c-dep', to: 'c-play', label: { en: 'try it', de: 'ausprobieren' } },
        { id: 'c-e4', from: 'c-play', to: 'c-eval', label: { en: 'test data', de: 'Testdaten' } },
        { id: 'c-e5', from: 'c-eval', to: 'c-gate', label: 'scores' },
        { id: 'c-e6', from: 'c-gate', to: 'c-app', label: { en: 'yes', de: 'ja' } },
        { id: 'c-e7', from: 'c-gate', to: 'c-iter', label: { en: 'no', de: 'nein' } },
        { id: 'c-e8', from: 'c-iter', to: 'c-cat', dashed: true, via: [[870, 357], [870, 30], [105, 30]], label: { en: 'try again', de: 'neuer Versuch' } },
      ],
      steps: [
        {
          title: { en: 'Discover', de: 'Entdecken' },
          text: {
            en: 'The catalog has two groups: Foundry Models sold by Azure (Microsoft-hosted and supported, billed through Azure meters) and models from partners and community (supported by their providers, often via Azure Marketplace). Filter by collection, capability, inference task, lifecycle or deployment option, then read the model card.',
            de: 'Der Katalog hat zwei Gruppen: Foundry Models sold by Azure (von Microsoft gehostet und unterstützt, über Azure-Meter abgerechnet) und Modelle von Partnern und Community (vom Anbieter unterstützt, oft über Azure Marketplace). Filtere nach Collection, Fähigkeit, Inferenzaufgabe, Lebenszyklus oder Deployment-Option und lies dann die Model Card.',
          },
          focus: ['c-cat'],
        },
        {
          title: { en: 'Compare', de: 'Vergleichen' },
          text: {
            en: 'Leaderboards rank models by quality index, safety (attack success rate — lower is better), cost and throughput (time to first token, generated tokens per second). Scenario leaderboards, trade-off charts and a side-by-side view of up to three models narrow the list.',
            de: 'Leaderboards ordnen Modelle nach Quality Index, Sicherheit (Attack Success Rate – niedriger ist besser), Kosten und Durchsatz (Time to First Token, generierte Tokens pro Sekunde). Szenario-Leaderboards, Trade-off-Diagramme und ein Direktvergleich von bis zu drei Modellen verkleinern die Liste.',
          },
          focus: ['c-board', 'c-e1'],
        },
        {
          title: { en: 'Deploy', de: 'Bereitstellen' },
          text: {
            en: 'A deployment makes the model callable. You choose the deployment type (Global Standard by default), the deployment name your code will pass as `model`, and the capacity taken from your tokens-per-minute quota.',
            de: 'Ein Deployment macht das Modell aufrufbar. Du wählst den Deployment-Typ (standardmäßig Global Standard), den Deployment-Namen, den dein Code als `model` übergibt, und die Kapazität aus deinem Tokens-pro-Minute-Kontingent.',
          },
          focus: ['c-dep', 'c-e2'],
        },
        {
          title: { en: 'Try it by hand', de: 'Von Hand ausprobieren' },
          text: {
            en: 'After deployment you land in the playground: set a system message, change temperature or max tokens, compare up to three models with a synced prompt, and copy sample code from the Code tab.',
            de: 'Nach dem Deployment landest du im Playground: Systemnachricht setzen, Temperatur oder Max Tokens ändern, bis zu drei Modelle mit synchronisiertem Prompt vergleichen und Beispielcode aus dem Code-Tab übernehmen.',
          },
          focus: ['c-play', 'c-e3'],
        },
        {
          title: { en: 'Measure at scale', de: 'Im großen Stil messen' },
          text: {
            en: 'An evaluation scores a test dataset with built-in evaluators: AI-assisted quality (groundedness, relevance, coherence, fluency) judged by a model deployment, textual similarity against ground truth (F1, BLEU, ROUGE …) and risk and safety evaluators.',
            de: 'Eine Evaluierung bewertet ein Test-Dataset mit integrierten Evaluatoren: KI-gestützte Qualität (Groundedness, Relevance, Coherence, Fluency), beurteilt von einem Modell-Deployment, Textähnlichkeit gegen Ground Truth (F1, BLEU, ROUGE …) sowie Risiko- und Sicherheits-Evaluatoren.',
          },
          focus: ['c-eval', 'c-e4', 'c-e5', 'c-gate'],
        },
        {
          title: { en: 'Ship or iterate', de: 'Ausliefern oder iterieren' },
          text: {
            en: 'If the scores meet your bar, the app calls the deployment by name. If not, improve — prompt engineering, retrieval (RAG), another model or fine-tuning — and evaluate again.',
            de: 'Erreichen die Scores deine Messlatte, ruft die App das Deployment per Namen auf. Wenn nicht, verbesserst du – Prompt Engineering, Retrieval (RAG), ein anderes Modell oder Fine-Tuning – und evaluierst erneut.',
          },
          focus: ['c-e6', 'c-app', 'c-e7', 'c-iter', 'c-e8'],
        },
      ],
    },
    {
      id: 'deployment-type-decision',
      title: { en: 'Picking a deployment type', de: 'Den Deployment-Typ wählen' },
      caption: {
        en: 'Start on Global Standard and move only when a requirement forces you to.',
        de: 'Starte mit Global Standard und wechsle nur, wenn eine Anforderung dich dazu zwingt.',
      },
      width: 960,
      height: 260,
      nodes: [
        { id: 't-start', x: 10, y: 45, w: 130, h: 64, label: 'Global Standard', sub: { en: 'default start', de: 'Standardstart' }, tone: 'model' },
        { id: 't-q1', x: 192, y: 40, w: 150, h: 74, label: { en: '24-h async job?', de: 'Asynchron, 24 h?' }, tone: 'neutral', shape: 'diamond' },
        { id: 't-q2', x: 394, y: 40, w: 150, h: 74, label: { en: 'Steady high load?', de: 'Hohe Dauerlast?' }, tone: 'neutral', shape: 'diamond' },
        { id: 't-q3', x: 596, y: 40, w: 150, h: 74, label: { en: 'Must stay in zone?', de: 'Daten in Zone/Geo?' }, tone: 'neutral', shape: 'diamond' },
        { id: 't-q4', x: 798, y: 40, w: 150, h: 74, label: { en: 'Fine-tuned test?', de: 'Fine-Tuning-Test?' }, tone: 'neutral', shape: 'diamond' },
        { id: 't-r1', x: 192, y: 170, w: 150, h: 64, label: 'Global Batch', sub: { en: 'or Data Zone Batch', de: 'oder Data Zone Batch' }, tone: 'model' },
        { id: 't-r2', x: 394, y: 170, w: 150, h: 64, label: 'Provisioned (PTU)', sub: { en: 'reserved, hourly', de: 'reserviert, stündlich' }, tone: 'model' },
        { id: 't-r3', x: 596, y: 170, w: 150, h: 64, label: 'Data Zone Standard', sub: { en: 'or Standard (geo)', de: 'oder Standard (Geo)' }, tone: 'model' },
        { id: 't-r4', x: 798, y: 170, w: 150, h: 64, label: 'Developer', sub: { en: '24 h, no SLA', de: '24 h, kein SLA' }, tone: 'model' },
      ],
      edges: [
        { id: 't-e0', from: 't-start', to: 't-q1' },
        { id: 't-e1', from: 't-q1', to: 't-r1', label: { en: 'yes', de: 'ja' } },
        { id: 't-e2', from: 't-q1', to: 't-q2', label: { en: 'no', de: 'nein' } },
        { id: 't-e3', from: 't-q2', to: 't-r2', label: { en: 'yes', de: 'ja' } },
        { id: 't-e4', from: 't-q2', to: 't-q3', label: { en: 'no', de: 'nein' } },
        { id: 't-e5', from: 't-q3', to: 't-r3', label: { en: 'yes', de: 'ja' } },
        { id: 't-e6', from: 't-q3', to: 't-q4', label: { en: 'no', de: 'nein' } },
        { id: 't-e7', from: 't-q4', to: 't-r4', label: { en: 'yes', de: 'ja' } },
        { id: 't-e8', from: 't-q4', to: 't-start', dashed: true, via: [[873, 20], [75, 20]], label: { en: 'no: keep default', de: 'nein: Standard' } },
      ],
      steps: [
        {
          title: { en: 'Start with Global Standard', de: 'Mit Global Standard starten' },
          text: {
            en: 'Global Standard gets new models first and has the lowest price, the broadest region coverage and the highest default quota. Prompts may be processed in any Azure region; data at rest stays in your geography.',
            de: 'Global Standard bekommt neue Modelle zuerst und hat den niedrigsten Preis, die breiteste Regionsabdeckung und das höchste Standardkontingent. Prompts können in jeder Azure-Region verarbeitet werden; ruhende Daten bleiben in deiner Geografie.',
          },
          focus: ['t-start'],
        },
        {
          title: { en: 'Bulk work → Batch', de: 'Massenarbeit → Batch' },
          text: {
            en: 'Jobs that can wait go to Global Batch or Data Zone Batch: one JSONL file of requests, a 24-hour target turnaround, 50 % less cost than Global Standard and a separate enqueued-token quota that leaves online traffic alone.',
            de: 'Jobs, die warten können, gehen an Global Batch oder Data Zone Batch: eine JSONL-Datei mit Requests, Zielbearbeitung in 24 Stunden, 50 % weniger Kosten als Global Standard und ein eigenes Kontingent für eingereihte Tokens, das den Online-Traffic nicht stört.',
          },
          focus: ['t-e0', 't-q1', 't-e1', 't-r1'],
        },
        {
          title: { en: 'Steady load → Provisioned', de: 'Dauerlast → Provisioned' },
          text: {
            en: 'For high, predictable traffic with tight latency, reserve PTUs (Global, Data Zone or Regional Provisioned). You pay per PTU per hour whether or not you send requests; spillover can send overflow to a standard deployment.',
            de: 'Für hohen, planbaren Traffic mit engen Latenzvorgaben reservierst du PTUs (Global, Data Zone oder Regional Provisioned). Du zahlst pro PTU und Stunde – egal, ob Requests kommen; Spillover kann Überlauf an ein Standard-Deployment schicken.',
          },
          focus: ['t-e2', 't-q2', 't-e3', 't-r2'],
        },
        {
          title: { en: 'Residency → Data Zone or Standard', de: 'Residenz → Data Zone oder Standard' },
          text: {
            en: 'Data Zone types keep inference inside the US, EU or APAC data zone. Standard and Regional Provisioned keep it inside one Azure geography, but new models arrive there last.',
            de: 'Data-Zone-Typen halten die Inferenz in der Datenzone US, EU oder APAC. Standard und Regional Provisioned halten sie in einer Azure-Geografie – neue Modelle kommen dort aber zuletzt an.',
          },
          focus: ['t-e4', 't-q3', 't-e5', 't-r3'],
        },
        {
          title: { en: 'Fine-tuned check → Developer', de: 'Fine-Tuning-Check → Developer' },
          text: {
            en: 'Developer deployments exist only to evaluate fine-tuned models: pay per token, no SLA, no data residency guarantee, deleted automatically after 24 hours. For everything else, stay on Global Standard.',
            de: 'Developer-Deployments dienen nur zum Evaluieren feinabgestimmter Modelle: Abrechnung pro Token, kein SLA, keine Datenresidenz-Garantie, automatische Löschung nach 24 Stunden. Für alles andere bleibst du bei Global Standard.',
          },
          focus: ['t-e6', 't-q4', 't-e7', 't-r4', 't-e8'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Models sold by Azure vs partners and community',
      text: {
        en: 'Foundry Models sold by Azure are hosted, billed (Azure meters) and supported by Microsoft and covered by Azure SLAs; they include all Azure OpenAI models plus selected models from other providers. Models from partners and community are supported by their providers, and many are billed through Azure Marketplace, so deploying them needs Marketplace permissions.',
        de: 'Foundry Models sold by Azure werden von Microsoft gehostet, über Azure-Meter abgerechnet und unterstützt und sind durch Azure-SLAs abgedeckt; dazu gehören alle Azure-OpenAI-Modelle plus ausgewählte Modelle anderer Anbieter. Modelle von Partnern und Community werden vom Anbieter unterstützt und oft über Azure Marketplace abgerechnet – zum Bereitstellen brauchst du dann Marketplace-Berechtigungen.',
      },
    },
    {
      term: 'Model leaderboards',
      text: {
        en: 'Rank catalog models by quality index (higher is better), safety (attack success rate, lower is better), cost and throughput (time to first token, generated tokens per second). Scenario leaderboards such as reasoning, coding or math, trade-off charts and a comparison of up to three models help you shortlist — public benchmarks don\'t replace tests on your data.',
        de: 'Ordnen Katalogmodelle nach Quality Index (höher ist besser), Sicherheit (Attack Success Rate, niedriger ist besser), Kosten und Durchsatz (Time to First Token, generierte Tokens pro Sekunde). Szenario-Leaderboards wie Reasoning, Coding oder Mathe, Trade-off-Diagramme und der Vergleich von bis zu drei Modellen helfen bei der Shortlist – öffentliche Benchmarks ersetzen keine Tests mit deinen Daten.',
      },
    },
    {
      term: 'Deployment and deployment type',
      text: {
        en: 'A deployment makes a model callable under a name you choose. **Serverless API** deployments (preferred) use a deployment type that decides data processing and billing: Global Standard, Data Zone, Standard, Provisioned, Batch or Developer. **Managed compute** (preview) hosts open-source models such as the Hugging Face collection on dedicated GPUs, billed per accelerator hour.',
        de: 'Ein Deployment macht ein Modell unter einem selbst gewählten Namen aufrufbar. **Serverless-API**-Deployments (bevorzugt) nutzen einen Deployment-Typ, der Datenverarbeitung und Abrechnung bestimmt: Global Standard, Data Zone, Standard, Provisioned, Batch oder Developer. **Managed Compute** (Preview) hostet Open-Source-Modelle wie die Hugging-Face-Collection auf dedizierten GPUs, abgerechnet pro Beschleuniger-Stunde.',
      },
    },
    {
      term: 'Quota and rate limits (TPM/RPM)',
      text: {
        en: 'Quota is granted per subscription, region, model and deployment type in tokens per minute (TPM). The TPM you assign to a deployment becomes its TPM limit plus a proportional requests-per-minute (RPM) limit, checked over short windows. Exceeding them returns HTTP 429 with a `retry-after-ms` header. Viewing quota needs **Cognitive Services Usages Reader** at subscription scope.',
        de: 'Kontingent wird pro Abonnement, Region, Modell und Deployment-Typ in Tokens pro Minute (TPM) vergeben. Die einem Deployment zugewiesenen TPM werden sein TPM-Limit plus ein proportionales Requests-pro-Minute-Limit (RPM), das über kurze Zeitfenster geprüft wird. Überschreitungen liefern HTTP 429 mit einem `retry-after-ms`-Header. Zum Einsehen des Kontingents brauchst du **Cognitive Services Usages Reader** auf Abonnementebene.',
      },
    },
    {
      term: 'Provisioned throughput (PTU) and spillover',
      text: {
        en: 'PTUs reserve model processing capacity, billed per PTU per hour regardless of traffic. PTU quota is model-independent but per region and deployment type, and quota doesn\'t guarantee capacity. Azure Reservations lower the hourly rate; spillover routes overflow (for example 429s) to a standard deployment of the same model.',
        de: 'PTUs reservieren Modell-Rechenkapazität, abgerechnet pro PTU und Stunde – unabhängig vom Traffic. PTU-Kontingent ist modellunabhängig, gilt aber pro Region und Deployment-Typ, und Kontingent garantiert keine Kapazität. Azure Reservations senken den Stundenpreis; Spillover leitet Überlauf (etwa 429er) an ein Standard-Deployment desselben Modells.',
      },
    },
    {
      term: 'Model router',
      text: {
        en: 'A deployable model that picks the most suitable underlying model for each prompt. Routing modes: Balanced (default), Cost and Quality; a model subset limits the candidates. The effective context window is that of the smallest model in the routing set.',
        de: 'Ein bereitstellbares Modell, das für jeden Prompt das passendste zugrunde liegende Modell wählt. Routing-Modi: Balanced (Standard), Cost und Quality; ein Model Subset begrenzt die Kandidaten. Das effektive Kontextfenster ist das des kleinsten Modells im Routing-Set.',
      },
    },
    {
      term: 'Evaluators',
      text: {
        en: 'Manual checks (playground tests, human ratings, user studies) catch tone and usefulness; automated evaluators scale. AI-assisted quality evaluators use a judge model deployment: groundedness (claims supported by the context), relevance (answers the query), coherence and fluency. Textual similarity metrics (F1, BLEU, ROUGE, METEOR, GLEU) compare against ground truth. Risk and safety evaluators flag hate and unfairness, sexual, violent and self-harm content, protected material and indirect attacks.',
        de: 'Manuelle Prüfungen (Playground-Tests, menschliche Bewertungen, Nutzerstudien) erfassen Ton und Nützlichkeit; automatisierte Evaluatoren skalieren. KI-gestützte Qualitäts-Evaluatoren nutzen ein Modell-Deployment als Richter: Groundedness (Aussagen durch den Kontext gedeckt), Relevance (beantwortet die Frage), Coherence und Fluency. Textähnlichkeits-Metriken (F1, BLEU, ROUGE, METEOR, GLEU) vergleichen mit Ground Truth. Risiko- und Sicherheits-Evaluatoren erkennen Hass und Unfairness, sexuelle, gewalttätige und selbstverletzende Inhalte, geschütztes Material und indirekte Angriffe.',
      },
    },
  ],
  comparison: {
    title: { en: 'Deployment types at a glance', de: 'Deployment-Typen im Überblick' },
    columns: [
      { en: 'Deployment type', de: 'Deployment-Typ' },
      { en: 'SKU code', de: 'SKU-Code' },
      { en: 'Inference processed', de: 'Inferenz verarbeitet' },
      { en: 'Billing', de: 'Abrechnung' },
      { en: 'Best for', de: 'Ideal für' },
    ],
    rows: [
      [
        'Global Standard',
        'GlobalStandard',
        { en: 'Any Azure region', de: 'In jeder Azure-Region' },
        { en: 'Pay per token', de: 'Pro Token' },
        { en: 'Default start, newest models, highest quota', de: 'Standardstart, neueste Modelle, höchstes Kontingent' },
      ],
      [
        'Data Zone Standard',
        'DataZoneStandard',
        { en: 'Inside the US, EU or APAC zone', de: 'Innerhalb der Zone US, EU oder APAC' },
        { en: 'Pay per token', de: 'Pro Token' },
        { en: 'Data zone compliance', de: 'Datenzonen-Compliance' },
      ],
      [
        'Standard',
        'Standard',
        { en: 'Inside one Azure geography', de: 'Innerhalb einer Azure-Geografie' },
        { en: 'Pay per token', de: 'Pro Token' },
        { en: 'Geography compliance, low volume', de: 'Geografie-Compliance, geringes Volumen' },
      ],
      [
        'Global / Data Zone / Regional Provisioned',
        'GlobalProvisionedManaged · DataZoneProvisionedManaged · ProvisionedManaged',
        { en: 'Global, data zone or geography', de: 'Global, Datenzone oder Geografie' },
        { en: 'Reserved PTUs per hour', de: 'Reservierte PTUs pro Stunde' },
        { en: 'Predictable throughput, low latency variance', de: 'Planbarer Durchsatz, geringe Latenzschwankung' },
      ],
      [
        'Global / Data Zone Batch',
        'GlobalBatch · DataZoneBatch',
        { en: 'Global or data zone', de: 'Global oder Datenzone' },
        { en: '50 % less, 24-hour target', de: '50 % günstiger, Ziel 24 Stunden' },
        { en: 'Large asynchronous jobs', de: 'Große asynchrone Jobs' },
      ],
      [
        'Developer',
        'DeveloperTier',
        { en: 'Any Azure region', de: 'In jeder Azure-Region' },
        { en: 'Pay per token, no SLA', de: 'Pro Token, kein SLA' },
        { en: 'Evaluating fine-tuned models (24-hour lifetime)', de: 'Feinabgestimmte Modelle evaluieren (24 Stunden Lebensdauer)' },
      ],
    ],
  },
  code: [
    {
      title: { en: 'Create a deployment as code (control plane)', de: 'Ein Deployment als Code anlegen (Control Plane)' },
      code: `from azure.identity import DefaultAzureCredential
from azure.mgmt.cognitiveservices import CognitiveServicesManagementClient
from azure.mgmt.cognitiveservices.models import (
    Deployment, DeploymentModel, DeploymentProperties, Sku,
)

client = CognitiveServicesManagementClient(DefaultAzureCredential(), "<subscription-id>")

deployment = client.deployments.begin_create_or_update(
    "<resource-group>",
    "<foundry-resource>",
    "support-chat",                                    # deployment name = model= in your app
    Deployment(
        sku=Sku(name="DataZoneStandard", capacity=50),  # deployment type + quota units
        properties=DeploymentProperties(
            model=DeploymentModel(format="OpenAI", name="<model>", version="<version>"),
            version_upgrade_option="OnceCurrentVersionExpired",
            rai_policy_name="Microsoft.DefaultV2",       # content filter (guardrail) policy
        ),
    ),
).result()
print(deployment.properties.provisioning_state)`,
      notes: [
        { en: 'This is a control-plane (ARM) call: the identity needs a role that can manage deployments, such as Foundry Account Owner — calling the model later is a separate data-plane permission.', de: 'Das ist ein Control-Plane-Aufruf (ARM): Die Identität braucht eine Rolle, die Deployments verwalten darf, etwa Foundry Account Owner – den Modellaufruf später regelt eine separate Data-Plane-Berechtigung.' },
        { en: '`capacity` is the share of your TPM quota in model-specific units; `version_upgrade_option` decides whether the deployment follows new default versions, upgrades only at retirement or never upgrades.', de: '`capacity` ist der Anteil an deinem TPM-Kontingent in modellspezifischen Einheiten; `version_upgrade_option` legt fest, ob das Deployment neuen Standardversionen folgt, erst bei Ausmusterung oder nie aktualisiert wird.' },
      ],
    },
    {
      title: { en: 'Run a cloud evaluation with built-in evaluators', de: 'Eine Cloud-Evaluierung mit integrierten Evaluatoren ausführen' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

project = AIProjectClient(
    endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
    credential=DefaultAzureCredential(),
)
openai = project.get_openai_client()
data_id = project.datasets.upload_file(name="rag-tests", version="1", file_path="rag_tests.jsonl").id

evaluation = openai.evals.create(
    name="rag-quality",
    data_source_config={"type": "custom", "item_schema": {"type": "object", "properties": {
        "query": {"type": "string"}, "context": {"type": "string"}, "response": {"type": "string"}}}},
    testing_criteria=[
        {"type": "azure_ai_evaluator", "name": "groundedness", "evaluator_name": "builtin.groundedness",
         "initialization_parameters": {"model": "gpt-5-mini"},   # judge model deployment
         "data_mapping": {"context": "{{item.context}}", "response": "{{item.response}}"}},
        {"type": "azure_ai_evaluator", "name": "violence", "evaluator_name": "builtin.violence",
         "data_mapping": {"query": "{{item.query}}", "response": "{{item.response}}"}},
    ],
)
run = openai.evals.runs.create(
    eval_id=evaluation.id, name="run-1",
    data_source={"type": "jsonl", "source": {"type": "file_id", "id": data_id}},
)
print(run.id, run.status)`,
      notes: [
        { en: 'AI-assisted quality evaluators such as groundedness need a judge model deployment; safety evaluators such as violence don\'t.', de: 'KI-gestützte Qualitäts-Evaluatoren wie Groundedness brauchen ein Modell-Deployment als Richter; Sicherheits-Evaluatoren wie Violence nicht.' },
        { en: '`data_mapping` binds each evaluator input to a dataset column with `{{item.<field>}}`; results are stored in the project and visible in the portal.', de: '`data_mapping` verbindet jeden Evaluator-Eingang über `{{item.<feld>}}` mit einer Dataset-Spalte; die Ergebnisse landen im Projekt und sind im Portal sichtbar.' },
      ],
    },
  ],
  traps: [
    {
      en: 'The `model` parameter takes your **deployment name** — not the catalog model name if you renamed the deployment, and never the asset ID that Azure Policy uses.',
      de: 'Der Parameter `model` erwartet deinen **Deployment-Namen** – nicht den Katalog-Modellnamen, wenn du das Deployment umbenannt hast, und nie die Asset-ID, die Azure Policy verwendet.',
    },
    {
      en: 'Not every 429 means you need more quota. If `x-ratelimit-limit-tokens` is below your configured TPM, the service is temporarily throttling — retry with backoff or move steady traffic to PTUs instead of filing a quota request.',
      de: 'Nicht jeder 429 bedeutet, dass du mehr Kontingent brauchst. Liegt `x-ratelimit-limit-tokens` unter deinen konfigurierten TPM, drosselt der Dienst vorübergehend – wiederhole mit Backoff oder verlege Dauerlast auf PTUs, statt Kontingent zu beantragen.',
    },
    {
      en: 'Neither PTU quota nor an Azure Reservation guarantees capacity. Create the provisioned deployment first, then buy the reservation to lock in the discount.',
      de: 'Weder PTU-Kontingent noch eine Azure Reservation garantiert Kapazität. Lege zuerst das Provisioned-Deployment an und kaufe dann die Reservierung für den Rabatt.',
    },
    {
      en: 'Global deployment types may process prompts in any Azure region. Data residency requirements call for Data Zone or Standard types, not Global ones.',
      de: 'Globale Deployment-Typen dürfen Prompts in jeder Azure-Region verarbeiten. Datenresidenz-Anforderungen verlangen Data-Zone- oder Standard-Typen, keine globalen.',
    },
    {
      en: 'On the safety leaderboard, a higher WMDP score means more knowledge of hazardous capabilities — not a safer model. For HarmBench, a lower attack success rate is better.',
      de: 'Im Sicherheits-Leaderboard bedeutet ein höherer WMDP-Score mehr Wissen über gefährliche Fähigkeiten – kein sichereres Modell. Bei HarmBench ist eine niedrigere Attack Success Rate besser.',
    },
  ],
  takeaways: [
    { en: 'Start on Global Standard; switch only for residency, reserved throughput, batch or fine-tuned tests.', de: 'Starte mit Global Standard; wechsle nur für Residenz, reservierten Durchsatz, Batch oder Fine-Tuning-Tests.' },
    { en: 'Quota is TPM per subscription, region, model and deployment type — deployments share it.', de: 'Kontingent ist TPM pro Abonnement, Region, Modell und Deployment-Typ – Deployments teilen es sich.' },
    { en: 'Steady, latency-critical load → PTUs plus spillover; bulk async work → Batch; mixed prompt complexity → model router.', de: 'Dauerlast mit Latenzanspruch → PTUs plus Spillover; asynchrone Massenarbeit → Batch; gemischte Prompt-Komplexität → Model Router.' },
    { en: 'Groundedness and relevance work without ground truth; F1, BLEU, ROUGE and response completeness need it.', de: 'Groundedness und Relevance funktionieren ohne Ground Truth; F1, BLEU, ROUGE und Response Completeness brauchen sie.' },
    { en: 'Shortlist with benchmarks, decide with evaluations on your own data, then ship the deployment name.', de: 'Shortlist mit Benchmarks, Entscheidung mit Evaluierungen auf deinen Daten, dann den Deployment-Namen ausliefern.' },
  ],
  sources: [
    { title: 'Overview of Microsoft Foundry Models', url: 'https://learn.microsoft.com/en-us/azure/foundry/concepts/foundry-models-overview' },
    { title: 'Deployment types for Microsoft Foundry Models', url: 'https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/deployment-types' },
    { title: 'Manage Azure OpenAI in Microsoft Foundry Models quota', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/quota' },
    { title: 'What is provisioned throughput for Foundry Models?', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/provisioned-throughput' },
    { title: 'Built-in evaluators reference', url: 'https://learn.microsoft.com/en-us/azure/foundry/concepts/built-in-evaluators' },
  ],
}
