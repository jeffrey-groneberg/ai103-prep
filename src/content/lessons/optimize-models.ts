import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'optimize-models',
  summary: {
    en: 'When a model\'s answers aren\'t good enough, first ask *what* is wrong. Wrong tone, format or behavior → start with **prompt engineering**: a clear system message, examples and tuned parameters — cheap and instant. Missing knowledge (private, recent or fast-changing data) → use Retrieval Augmented Generation (**RAG**: retrieve relevant content and ground the answer in it). Behavior that stays inconsistent despite good prompts, or prompts that grew long and costly → **fine-tune** on examples. The strategies combine, and you measure every change against a baseline with evaluators.',
    de: 'Wenn die Antworten eines Modells nicht gut genug sind, frag zuerst, *was* falsch ist. Falscher Ton, falsches Format oder Verhalten → beginne mit **Prompt Engineering**: klare Systemnachricht, Beispiele und passende Parameter – günstig und sofort wirksam. Fehlendes Wissen (private, aktuelle oder schnell veränderliche Daten) → nutze Retrieval Augmented Generation (**RAG**: relevante Inhalte abrufen und die Antwort darauf stützen). Verhalten, das trotz guter Prompts inkonsistent bleibt, oder Prompts, die lang und teuer geworden sind → **Fine-Tuning** mit Beispielen. Die Strategien lassen sich kombinieren, und jede Änderung misst du mit Evaluatoren gegen eine Baseline.',
  },
  examFocus: {
    en: 'Expect symptom-to-strategy scenarios (invented or outdated facts → RAG; inconsistent style despite good prompts → fine-tuning; quick format fixes → prompt engineering), parameter questions (`temperature` or `top_p`, and why reasoning models use `reasoning.effort` and `max_output_tokens` instead), fine-tuning method choice by training signal (supervised fine-tuning = SFT, direct preference optimization = DPO, reinforcement fine-tuning = RFT), structured outputs for domain extraction, model router routing modes, and safe reflection loops with evaluators.',
    de: 'Rechne mit Szenarien von Symptom zu Strategie (erfundene oder veraltete Fakten → RAG; inkonsistenter Stil trotz guter Prompts → Fine-Tuning; schnelle Formatkorrekturen → Prompt Engineering), mit Parameterfragen (`temperature` oder `top_p` und warum Reasoning-Modelle stattdessen `reasoning.effort` und `max_output_tokens` nutzen), mit der Wahl der Fine-Tuning-Methode je nach Trainingssignal (Supervised Fine-Tuning = SFT, Direct Preference Optimization = DPO, Reinforcement Fine-Tuning = RFT), Structured Outputs für Fachextraktion, den Routing-Modi des Model Routers und sicheren Reflexionsschleifen mit Evaluatoren.',
  },
  diagrams: [
    {
      id: 'optimization-map',
      title: { en: 'What is wrong? Pick the optimization strategy', de: 'Was hakt? Die passende Optimierungsstrategie wählen' },
      caption: {
        en: 'Diagnose the symptom first. Prompt engineering is the cheapest layer; RAG adds knowledge; fine-tuning locks in behavior.',
        de: 'Erst das Symptom diagnostizieren. Prompt Engineering ist die günstigste Schicht; RAG ergänzt Wissen; Fine-Tuning festigt Verhalten.',
      },
      width: 960,
      height: 470,
      nodes: [
        { id: 'N1', x: 5, y: 180, w: 160, h: 70, label: { en: 'Evaluate baseline', de: 'Baseline messen' }, sub: { en: 'test set + evaluators', de: 'Testset + Evaluatoren' }, icon: 'metrics', tone: 'foundry' },
        { id: 'D', x: 200, y: 175, w: 160, h: 80, label: { en: "What's wrong?", de: 'Was hakt?' }, icon: 'branch', tone: 'neutral', shape: 'diamond' },
        {
          id: 'S1',
          x: 472,
          y: 30,
          w: 240,
          h: 74,
          label: 'Prompt engineering',
          sub: { en: 'system message · few-shot · params', de: 'Systemprompt · Few-Shot · Parameter' },
          icon: 'guide',
          tone: 'app',
        },
        {
          id: 'S2',
          x: 472,
          y: 178,
          w: 240,
          h: 74,
          label: { en: 'RAG (grounding)', de: 'RAG (Grounding)' },
          sub: { en: 'retrieve · augment · generate', de: 'abrufen · anreichern · generieren' },
          icon: 'search',
          tone: 'data',
        },
        { id: 'S3', x: 472, y: 326, w: 240, h: 74, label: 'Fine-tuning', sub: 'SFT · DPO · RFT', icon: 'foundry-models', tone: 'model' },
        { id: 'C', x: 761, y: 178, w: 187, h: 74, label: { en: 'Combine + re-test', de: 'Kombinieren + testen' }, sub: { en: 'e.g. prompts + RAG', de: 'z. B. Prompts + RAG' }, icon: 'gear', tone: 'neutral' },
      ],
      edges: [
        { id: 'd0', from: 'N1', to: 'D' },
        { id: 'd1', from: 'D', to: 'S1', label: { en: 'format · tone', de: 'Format · Ton' } },
        { id: 'd2', from: 'D', to: 'S2', label: { en: 'knowledge gap', de: 'Wissenslücke' } },
        { id: 'd3', from: 'D', to: 'S3', label: { en: 'drifts · long prompts', de: 'Drift · lange Prompts' } },
        { id: 'd4', from: 'S1', to: 'C', dashed: true },
        { id: 'd5', from: 'S2', to: 'C', dashed: true },
        { id: 'd6', from: 'S3', to: 'C', dashed: true },
        { id: 'd7', from: 'C', to: 'N1', label: { en: 're-evaluate', de: 'erneut evaluieren' }, dashed: true, via: [[855, 440], [85, 440]] },
      ],
      steps: [
        {
          title: { en: 'Measure, then diagnose', de: 'Messen, dann diagnostizieren' },
          text: {
            en: 'Test the unoptimized model against a test set with evaluators first — without a baseline you can\'t tell whether a change helped. Then ask: what exactly is wrong?',
            de: 'Teste das Modell zuerst unoptimiert mit einem Testset und Evaluatoren – ohne Baseline erkennst du nicht, ob eine Änderung hilft. Dann frag: Was genau ist falsch?',
          },
          focus: ['N1', 'd0', 'D'],
        },
        {
          title: { en: 'Behavior → prompt engineering', de: 'Verhalten → Prompt Engineering' },
          text: {
            en: 'Wrong tone, format or scope? Refine the system message. On non-reasoning models add few-shot examples and delimiters and tune `temperature` or `top_p`; on reasoning models state goal, constraints and output format and tune `reasoning.effort`. No extra infrastructure needed.',
            de: 'Falscher Ton, falsches Format oder Thema? Verfeinere die Systemnachricht. Bei Nicht-Reasoning-Modellen ergänzt du Few-Shot-Beispiele und Trennzeichen und stimmst `temperature` oder `top_p` ab; bei Reasoning-Modellen nennst du Ziel, Vorgaben und Ausgabeformat und stimmst `reasoning.effort` ab. Keine zusätzliche Infrastruktur nötig.',
          },
          focus: ['d1', 'S1'],
        },
        {
          title: { en: 'Knowledge gap → RAG', de: 'Wissenslücke → RAG' },
          text: {
            en: 'Invented or outdated facts mean the model lacks data. Retrieve relevant chunks from an index (for example Azure AI Search with hybrid search), add them to the prompt and let the model answer with citations.',
            de: 'Erfundene oder veraltete Fakten heißen: Dem Modell fehlen Daten. Rufe passende Chunks aus einem Index ab (etwa Azure AI Search mit hybrider Suche), füge sie dem Prompt hinzu und lass das Modell mit Quellenangaben antworten.',
          },
          focus: ['d2', 'S2'],
        },
        {
          title: { en: 'Inconsistency → fine-tuning', de: 'Inkonsistenz → Fine-Tuning' },
          text: {
            en: 'If style or format still drifts despite good prompts, or prompts became long and costly, fine-tune: supervised fine-tuning (SFT) with demonstrations, direct preference optimization (DPO) with preferred/rejected pairs, reinforcement fine-tuning (RFT) with a grader.',
            de: 'Driftet Stil oder Format trotz guter Prompts weiter, oder sind die Prompts lang und teuer geworden, hilft Fine-Tuning: Supervised Fine-Tuning (SFT) mit Beispielen, Direct Preference Optimization (DPO) mit bevorzugten/abgelehnten Paaren, Reinforcement Fine-Tuning (RFT) mit einem Grader.',
          },
          focus: ['d3', 'S3'],
        },
        {
          title: { en: 'Combine and re-test', de: 'Kombinieren und erneut testen' },
          text: {
            en: 'Strategies stack: prompts set behavior and guardrails, RAG supplies facts, fine-tuning locks in style. Re-run the same evaluation after every change.',
            de: 'Die Strategien ergänzen sich: Prompts setzen Verhalten und Leitplanken, RAG liefert Fakten, Fine-Tuning festigt den Stil. Führe nach jeder Änderung dieselbe Evaluierung erneut aus.',
          },
          focus: ['d4', 'd5', 'd6', 'C', 'd7', 'N1'],
        },
      ],
    },
    {
      id: 'reflection-loop',
      title: { en: 'A bounded self-critique loop', de: 'Eine begrenzte Selbstkritik-Schleife' },
      caption: {
        en: 'A judge scores each draft against explicit criteria; its reason becomes feedback. A hard iteration cap keeps the loop safe.',
        de: 'Ein Judge bewertet jeden Entwurf anhand klarer Kriterien; seine Begründung wird zum Feedback. Ein festes Rundenlimit hält die Schleife sicher.',
      },
      width: 960,
      height: 440,
      nodes: [
        { id: 'R', x: 10, y: 60, w: 160, h: 64, label: { en: 'Task + criteria', de: 'Aufgabe +\nKriterien' }, icon: 'users', tone: 'user', shape: 'pill' },
        { id: 'G', x: 240, y: 56, w: 180, h: 72, label: { en: 'Generator model', de: 'Generator-Modell' }, sub: { en: 'writes the draft', de: 'schreibt den Entwurf' }, icon: 'foundry-models', tone: 'model' },
        { id: 'J', x: 495, y: 56, w: 200, h: 72, label: { en: 'Judge / evaluator', de: 'Judge / Evaluator' }, sub: { en: 'score or pass/fail + reason', de: 'Score oder Pass/Fail + Grund' }, icon: 'metrics', tone: 'foundry' },
        { id: 'P', x: 505, y: 200, w: 180, h: 80, label: { en: 'Passes?', de: 'Bestanden?' }, icon: 'branch', tone: 'neutral', shape: 'diamond' },
        { id: 'A', x: 765, y: 206, w: 170, h: 68, label: { en: 'Final answer', de: 'Finale Antwort' }, icon: 'file', tone: 'app', shape: 'pill' },
        { id: 'K', x: 250, y: 200, w: 160, h: 80, label: { en: 'Rounds left?', de: 'Runden übrig?' }, icon: 'branch', tone: 'neutral', shape: 'diamond' },
        { id: 'X', x: 240, y: 350, w: 180, h: 70, label: { en: 'Stop + escalate', de: 'Stopp + eskalieren' }, sub: { en: 'max rounds reached', de: 'max. Runden erreicht' }, icon: 'conditional-access', tone: 'safety' },
      ],
      edges: [
        { id: 'l1', from: 'R', to: 'G', label: { en: 'prompt', de: 'Prompt' } },
        { id: 'l2', from: 'G', to: 'J', label: { en: 'draft', de: 'Entwurf' } },
        { id: 'l3', from: 'J', to: 'P', label: { en: 'verdict', de: 'Urteil' } },
        { id: 'l4', from: 'P', to: 'A', label: { en: 'yes', de: 'ja' } },
        { id: 'l5', from: 'P', to: 'K', label: { en: 'no', de: 'nein' } },
        { id: 'l7', from: 'K', to: 'G', label: { en: 'yes: feedback', de: 'ja: Feedback' }, dashed: true },
        { id: 'l6', from: 'K', to: 'X', label: { en: 'no', de: 'nein' } },
      ],
      steps: [
        {
          title: { en: 'Generate with criteria', de: 'Mit Kriterien generieren' },
          text: {
            en: 'Give the generator the task plus explicit success criteria, for example "answer every part of the request" and "support conclusions with evidence".',
            de: 'Gib dem Generator die Aufgabe plus klare Erfolgskriterien, zum Beispiel „beantworte jeden Teil der Anfrage“ und „belege Schlussfolgerungen“.',
          },
          focus: ['R', 'l1', 'G'],
        },
        {
          title: { en: 'Judge the draft', de: 'Den Entwurf bewerten' },
          text: {
            en: 'A second call — a judge model or a Foundry evaluator — checks the draft and returns a verdict with a reason. Groundedness scores 1–5 and passes at 3 or higher by default; task adherence returns pass/fail.',
            de: 'Ein zweiter Aufruf – ein Judge-Modell oder ein Foundry-Evaluator – prüft den Entwurf und liefert ein Urteil mit Begründung. Groundedness vergibt 1–5 und gilt standardmäßig ab 3 als bestanden; Task Adherence liefert Pass/Fail.',
          },
          focus: ['l2', 'J', 'l3', 'P'],
        },
        {
          title: { en: 'Revise with feedback', de: 'Mit Feedback überarbeiten' },
          text: {
            en: 'If the draft fails and rounds are left, the judge\'s reason becomes feedback for the next attempt. That is model reflection — without exposing any raw chain of thought.',
            de: 'Fällt der Entwurf durch und sind noch Runden übrig, wird die Begründung des Judges zum Feedback für den nächsten Versuch. Das ist Modell-Reflexion – ganz ohne rohe Chain of Thought offenzulegen.',
          },
          focus: ['l5', 'K', 'l7', 'G'],
        },
        {
          title: { en: 'Stop safely', de: 'Sicher beenden' },
          text: {
            en: 'A passing draft becomes the final answer. Always bound the loop with a maximum number of rounds — in Microsoft Agent Framework\'s experimental loop middleware, that\'s `max_iterations`. When no rounds are left, stop and escalate instead of looping forever.',
            de: 'Ein bestandener Entwurf wird zur finalen Antwort. Begrenze die Schleife immer mit einer maximalen Rundenzahl – in der experimentellen Loop-Middleware des Microsoft Agent Framework ist das `max_iterations`. Sind keine Runden mehr übrig, stoppe und eskaliere, statt endlos weiterzulaufen.',
          },
          focus: ['l4', 'A', 'K', 'l6', 'X'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'System message',
      text: {
        en: 'The highest-level instructions, sent as `instructions` in the Responses API (OpenAI-compatible API that returns a response object; keeps state via `previous_response_id` or a conversation) or as a system/developer message. A good one states the role, boundaries, output format and a "when unsure" policy. It influences behavior but doesn\'t guarantee it — test it and layer it with content filtering and evaluation.',
        de: 'Die oberste Anweisungsebene, gesendet als `instructions` in der Responses API (OpenAI-kompatible API, die ein Response-Objekt liefert; hält den Zustand über `previous_response_id` oder eine Conversation) oder als System-/Developer-Nachricht. Eine gute nennt Rolle, Grenzen, Ausgabeformat und eine Regel für den Fall von Unsicherheit. Sie beeinflusst das Verhalten, garantiert es aber nicht – teste sie und kombiniere sie mit Inhaltsfiltern und Evaluierung.',
      },
    },
    {
      term: 'Prompt patterns',
      text: {
        en: 'Classic techniques for **non-reasoning** models; the docs don\'t recommend them for reasoning models such as `gpt-5-mini`, which work best with a clear goal, firm constraints and an explicit output format. **Few-shot**: show input → output examples (zero-shot = none, one-shot = one). **Chain-of-thought**: ask the model to work step by step. **Delimiters**: `---`, Markdown or XML tags separate instructions from content. **Cue**: words that start the answer, e.g. ending the prompt with `One possible search query is:`. **Recency bias**: text at the end of a prompt can outweigh the beginning, so repeat the key instruction there.',
        de: 'Klassische Techniken für **Nicht-Reasoning**-Modelle; für Reasoning-Modelle wie `gpt-5-mini` empfiehlt die Doku sie nicht – die arbeiten am besten mit klarem Ziel, festen Vorgaben und explizitem Ausgabeformat. **Few-Shot**: Beispiele Eingabe → Ausgabe zeigen (Zero-Shot = keines, One-Shot = eines). **Chain-of-Thought**: das Modell schrittweise arbeiten lassen. **Trennzeichen**: `---`, Markdown oder XML-Tags trennen Anweisungen von Inhalten. **Cue**: Wörter, mit denen die Antwort beginnt, z. B. den Prompt mit `One possible search query is:` beenden. **Recency Bias**: Text am Ende eines Prompts kann stärker wirken als der Anfang – wiederhole dort die Kernanweisung.',
      },
    },
    {
      term: 'Generation parameters',
      text: {
        en: '`temperature` (0–2) and `top_p` control randomness on **non-reasoning** models — change one, not both: low for facts, higher for creative text. **Reasoning** models (the model catalog\'s reasoning filter; every GA GPT-5.x model such as `gpt-5-mini`) reject them; only a few newer ones such as GPT-6 Astra accept them, so check the model\'s row in the reasoning doc. Steer reasoning models with `reasoning={"effort": …}` (values vary by model). In the Responses API, `max_output_tokens` caps the output including the billed reasoning tokens (`max_tokens` is a Chat Completions parameter).',
        de: '`temperature` (0–2) und `top_p` steuern bei **Nicht-Reasoning**-Modellen die Zufälligkeit – ändere einen, nicht beide: niedrig für Fakten, höher für kreative Texte. **Reasoning**-Modelle (Reasoning-Filter im Modellkatalog; jedes GA-Modell der Reihe GPT-5.x wie `gpt-5-mini`) lehnen sie ab; nur wenige neuere wie GPT-6 Astra akzeptieren sie – prüfe die Zeile des Modells in der Reasoning-Doku. Reasoning-Modelle steuerst du mit `reasoning={"effort": …}` (Werte je nach Modell). In der Responses API begrenzt `max_output_tokens` die Ausgabe inklusive der abgerechneten Reasoning-Tokens (`max_tokens` ist ein Chat-Completions-Parameter).',
      },
    },
    {
      term: 'Retrieval Augmented Generation (RAG)',
      text: {
        en: 'Retrieve relevant content from an index, augment the prompt with it, generate a grounded answer with citations. Use it for private or frequently changing data. In Azure AI Search, hybrid queries (keyword + vector) with semantic ranking give strong relevance; for new solutions the docs recommend agentic retrieval (Foundry IQ).',
        de: 'Relevante Inhalte aus einem Index abrufen, den Prompt damit anreichern, eine fundierte Antwort mit Quellen generieren. Nutze RAG für private oder häufig wechselnde Daten. In Azure AI Search liefern hybride Abfragen (Keyword + Vektor) mit semantischem Ranking hohe Relevanz; für neue Lösungen empfiehlt die Doku Agentic Retrieval (Foundry IQ).',
      },
    },
    {
      term: 'Fine-tuning (SFT, DPO, RFT)',
      text: {
        en: 'Further trains a model\'s weights on task data in JSONL files. **Supervised fine-tuning (SFT)** learns from demonstrations (prompt + ideal response), **direct preference optimization (DPO)** from preferred vs. rejected responses to the same input, **reinforcement fine-tuning (RFT)** from a grader that scores outputs. It aligns style and format, improves tool use and lets you use shorter prompts — but adds training and hosting costs, doesn\'t replace retrieval for fresh facts, and not every model supports every method. Training uses **LoRA** (low-rank adaptation): it updates only a small set of important parameters instead of all weights, so it runs faster and cheaper. **Distillation** uses a large teacher model\'s outputs as SFT training data for a smaller model, so the smaller model can reach similar quality on that task at lower cost and latency.',
        de: 'Trainiert die Gewichte eines Modells mit Aufgabendaten in JSONL-Dateien weiter. **Supervised Fine-Tuning (SFT)** lernt aus Beispielen (Prompt + ideale Antwort), **Direct Preference Optimization (DPO)** aus bevorzugten vs. abgelehnten Antworten auf dieselbe Eingabe, **Reinforcement Fine-Tuning (RFT)** von einem Grader, der Ausgaben bewertet. Es vereinheitlicht Stil und Format, verbessert die Tool-Nutzung und erlaubt kürzere Prompts – kostet aber Training und Hosting, ersetzt kein Retrieval für aktuelle Fakten, und nicht jedes Modell unterstützt jede Methode. Das Training nutzt **LoRA** (Low-Rank Adaptation): Es passt nur einen kleinen Teil wichtiger Parameter an statt aller Gewichte und läuft dadurch schneller und günstiger. **Destillation** nutzt die Ausgaben eines großen Teacher-Modells als SFT-Trainingsdaten für ein kleineres Modell, das so bei dieser Aufgabe ähnliche Qualität mit weniger Kosten und Latenz erreichen kann.',
      },
    },
    {
      term: 'Reflection and self-critique',
      text: {
        en: 'A generator drafts, a judge (often an LLM-as-judge evaluator such as groundedness or task adherence) scores the draft against criteria and returns a reason, and that reason feeds the next draft. Always cap the iterations. On reasoning models, inspect the thinking only through `reasoning.summary`.',
        de: 'Ein Generator entwirft, ein Judge (oft ein LLM-as-Judge-Evaluator wie Groundedness oder Task Adherence) bewertet den Entwurf anhand von Kriterien und liefert eine Begründung, die in den nächsten Entwurf einfließt. Begrenze immer die Runden. Bei Reasoning-Modellen schaust du dir das Denken nur über `reasoning.summary` an.',
      },
    },
    {
      term: 'Model router',
      text: {
        en: 'A trained model you deploy once; for each prompt it picks a suitable underlying model. Routing modes: Balanced (default), Cost, Quality; a model subset limits the pool, and the response\'s `model` field shows which model answered. A router deployment can also serve as a Foundry agent\'s model: each agent request is routed separately, and only models that support the agent\'s tools are eligible. Direct Chat Completions calls can send a session ID (session affinity, preview) so a conversation\'s turns try the same model first.',
        de: 'Ein trainiertes Modell, das du einmal bereitstellst; pro Prompt wählt es ein passendes zugrunde liegendes Modell. Routing-Modi: Balanced (Standard), Cost, Quality; ein Model Subset begrenzt die Auswahl, und das Feld `model` der Antwort zeigt, welches Modell geantwortet hat. Ein Router-Deployment kann auch als Modell eines Foundry-Agents dienen: Jede Anfrage des Agents wird einzeln geroutet, und infrage kommen nur Modelle, die seine Tools unterstützen. Direkte Chat-Completions-Aufrufe können eine Session-ID mitschicken (Session Affinity, Preview), damit die Runden eines Gesprächs zuerst dasselbe Modell versuchen.',
      },
    },
  ],
  comparison: {
    title: { en: 'Prompt engineering, RAG or fine-tuning?', de: 'Prompt Engineering, RAG oder Fine-Tuning?' },
    columns: [
      { en: 'Aspect', de: 'Aspekt' },
      { en: 'Prompt engineering', de: 'Prompt Engineering' },
      { en: 'RAG', de: 'RAG' },
      { en: 'Fine-tuning', de: 'Fine-Tuning' },
    ],
    rows: [
      [
        { en: 'Fixes', de: 'Behebt' },
        { en: 'Tone, format, behavior', de: 'Ton, Format, Verhalten' },
        { en: 'Missing, private or changing knowledge', de: 'Fehlendes, privates oder veränderliches Wissen' },
        { en: 'Inconsistent behavior, long prompts', de: 'Inkonsistentes Verhalten, lange Prompts' },
      ],
      [
        { en: 'Effort', de: 'Aufwand' },
        { en: 'Low — start here', de: 'Gering – hier starten' },
        { en: 'Medium — index and embeddings', de: 'Mittel – Index und Embeddings' },
        { en: 'High — training data and jobs', de: 'Hoch – Trainingsdaten und Jobs' },
      ],
      [
        { en: 'Ongoing cost', de: 'Laufende Kosten' },
        { en: 'Tokens only', de: 'Nur Tokens' },
        { en: 'Search + storage + extra input tokens', de: 'Suche + Speicher + zusätzliche Input-Tokens' },
        { en: 'Training + hosting + tokens', de: 'Training + Hosting + Tokens' },
      ],
      [
        { en: 'When data changes', de: 'Wenn sich Daten ändern' },
        { en: 'Edit the prompt', de: 'Prompt anpassen' },
        { en: 'Update the index — no retraining', de: 'Index aktualisieren – kein Neutraining' },
        { en: 'Retrain and redeploy', de: 'Neu trainieren und bereitstellen' },
      ],
      [
        { en: 'Typical combination', de: 'Typische Kombination' },
        { en: 'Always the base layer', de: 'Immer die Basisschicht' },
        { en: 'Prompts + RAG (most common)', de: 'Prompts + RAG (am häufigsten)' },
        { en: '+ RAG when facts also matter', de: '+ RAG, wenn auch Fakten zählen' },
      ],
    ],
  },
  code: [
    {
      title: { en: 'Prompting a reasoning model: system message, output format and effort', de: 'Ein Reasoning-Modell prompten: Systemnachricht, Ausgabeformat und Effort' },
      code: `from openai import OpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

client = OpenAI(
    base_url="https://<resource>.openai.azure.com/openai/v1/",
    api_key=get_bearer_token_provider(
        DefaultAzureCredential(), "https://ai.azure.com/.default"),
)

response = client.responses.create(
    model="gpt-5-mini",                     # deployment name (reasoning model)
    instructions=(
        "You route IT tickets. Reply with exactly one label: Hardware, "
        "Access request, Password reset. If none fits, reply Unknown."
    ),
    input="I forgot my password.",
    reasoning={"effort": "low"},            # no temperature on reasoning models
)
print(response.output_text)                 # Password reset`,
      notes: [
        {
          en: '`instructions` is the system message. For a reasoning model, state the goal, the constraints (allowed labels, fallback "Unknown") and the output format; classic few-shot or step-by-step prompting isn\'t recommended here. `model` takes the deployment name, which can be any name you chose.',
          de: '`instructions` ist die Systemnachricht. Bei einem Reasoning-Modell nennst du Ziel, Vorgaben (erlaubte Labels, Fallback „Unknown“) und Ausgabeformat; klassisches Few-Shot- oder Schritt-für-Schritt-Prompting wird hier nicht empfohlen. `model` erwartet den Deployment-Namen, und den kannst du frei wählen.',
        },
        {
          en: '`gpt-5-mini` rejects `temperature` and `top_p`; `low` effort suits simple tasks where speed and cost matter. On a non-reasoning deployment you\'d instead pass example user/assistant turns in `input` (few-shot) and set a low `temperature` — tune it or `top_p`, not both.',
          de: '`gpt-5-mini` lehnt `temperature` und `top_p` ab; Effort `low` passt zu einfachen Aufgaben, bei denen Tempo und Kosten zählen. Bei einem Nicht-Reasoning-Deployment gibst du stattdessen Beispielrunden aus User und Assistant in `input` mit (Few-Shot) und setzt eine niedrige `temperature` – stimme sie oder `top_p` ab, nicht beides.',
        },
      ],
    },
    {
      title: { en: 'Reasoning model + structured output for domain extraction', de: 'Reasoning-Modell + Structured Output für Fachextraktion' },
      code: `from typing import Literal
from pydantic import BaseModel

class Obligation(BaseModel):
    regulation: str
    obligation: str
    deadline: str      # "not stated" if the text has none
    risk_level: Literal["low", "medium", "high"]

policy_text = open("policy.txt", encoding="utf-8").read()

result = client.responses.parse(        # same client as above
    model="gpt-5-mini",                 # deployment name
    reasoning={"effort": "low"},        # gpt-5-mini doesn't support temperature
    instructions="Extract the main obligation. Use only the given text; "
                 "write 'not stated' for missing values.",
    input=policy_text,
    text_format=Obligation,             # sent as text.format json_schema
    max_output_tokens=25000,            # includes reasoning tokens
)
print(result.status, result.output_parsed)`,
      notes: [
        {
          en: '`responses.parse` turns the Pydantic class into a strict JSON schema (`text.format`) and returns the typed object in `output_parsed`.',
          de: '`responses.parse` macht aus der Pydantic-Klasse ein striktes JSON-Schema (`text.format`) und liefert das typisierte Objekt in `output_parsed`.',
        },
        {
          en: 'Check `status`: if reasoning tokens use up `max_output_tokens`, the response ends as `incomplete` before any visible text.',
          de: 'Prüfe `status`: Verbrauchen Reasoning-Tokens das `max_output_tokens`-Budget, endet die Antwort als `incomplete`, bevor sichtbarer Text entsteht.',
        },
      ],
    },
    {
      title: { en: 'Fine-tuning: submit a supervised fine-tuning (SFT) job', de: 'Fine-Tuning: einen Supervised-Fine-Tuning-Job (SFT) starten' },
      code: `# client from the first sample; train.jsonl = one SFT example per line:
# {"messages": [{"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]}
with open("train.jsonl", "rb") as f:
    training_file = client.files.create(file=f, purpose="fine-tune")
client.files.wait_for_processing(training_file.id)
job = client.fine_tuning.jobs.create(
    model="<base-model>",              # an SFT-capable model from the supported list
    training_file=training_file.id,
    method={"type": "supervised"},     # DPO: {"type": "dpo"}
    extra_body={"trainingType": "GlobalStandard"},  # Global training
)
print(job.id, job.status)`,
      notes: [
        {
          en: 'Each SFT line is a conversation that ends with the ideal assistant answer. A DPO line pairs a preferred with a rejected answer: `{"input": {"messages": [...]}, "preferred_output": [...], "non_preferred_output": [...]}`.',
          de: 'Jede SFT-Zeile ist ein Gespräch, das mit der idealen Assistant-Antwort endet. Eine DPO-Zeile stellt eine bevorzugte einer abgelehnten Antwort gegenüber: `{"input": {"messages": [...]}, "preferred_output": [...], "non_preferred_output": [...]}`.',
        },
        {
          en: 'Check the supported-models table first: methods and training types differ per model. When the job succeeds, deploy the fine-tuned model in the Foundry portal and call it by its deployment name.',
          de: 'Prüfe zuerst die Tabelle der unterstützten Modelle: Methoden und Trainingstypen unterscheiden sich je Modell. Ist der Job erfolgreich, stellst du das feinabgestimmte Modell im Foundry-Portal bereit und rufst es über seinen Deployment-Namen auf.',
        },
      ],
    },
  ],
  traps: [
    {
      en: 'Fine-tuning doesn\'t add fresh knowledge. For private or daily-changing data use RAG — retraining for every data change is slow and expensive.',
      de: 'Fine-Tuning bringt kein aktuelles Wissen. Für private oder täglich wechselnde Daten nutzt du RAG – Neutraining bei jeder Datenänderung ist langsam und teuer.',
    },
    {
      en: 'Chain-of-thought prompting is for non-reasoning models. Asking a reasoning model to print its raw reasoning isn\'t supported and may violate the Acceptable Use Policy — use `reasoning.summary` instead.',
      de: 'Chain-of-Thought-Prompting ist für Nicht-Reasoning-Modelle. Ein Reasoning-Modell aufzufordern, sein rohes Reasoning auszugeben, wird nicht unterstützt und kann gegen die Acceptable Use Policy verstoßen – nutze stattdessen `reasoning.summary`.',
    },
    {
      en: 'Don\'t send `temperature` or `top_p` to `gpt-5-mini` or the other GPT-5 reasoning models, and don\'t use `max_tokens` (a Chat Completions parameter) — the Responses API limit is `max_output_tokens`. Set it too low and the response ends `incomplete` with no visible text, because reasoning tokens count toward it.',
      de: 'Schick `temperature` oder `top_p` nicht an `gpt-5-mini` oder die anderen GPT-5-Reasoning-Modelle und nutze kein `max_tokens` (ein Chat-Completions-Parameter) – das Limit der Responses API heißt `max_output_tokens`. Ist es zu niedrig, endet die Antwort als `incomplete` ohne sichtbaren Text, weil Reasoning-Tokens mitzählen.',
    },
    {
      en: 'A prompt can\'t guarantee a fixed business rule such as a refund limit. Enforce it in a deterministic code step of a workflow next to the LLM steps, and route high-risk cases to a human-in-the-loop step where a person approves.',
      de: 'Ein Prompt kann eine feste Geschäftsregel wie eine Erstattungsgrenze nicht garantieren. Setz sie als deterministischen Codeschritt in einem Workflow neben den LLM-Schritten um und leite riskante Fälle an einen Human-in-the-Loop-Schritt, in dem eine Person freigibt.',
    },
    {
      en: 'Model router\'s context window is limited by its smallest underlying model, and `temperature`/`top_p` are ignored when it picks a reasoning model — use a model subset for long prompts.',
      de: 'Das Kontextfenster des Model Routers ist durch sein kleinstes zugrunde liegendes Modell begrenzt, und `temperature`/`top_p` werden ignoriert, wenn er ein Reasoning-Modell wählt – nutze für lange Prompts ein Model Subset.',
    },
    {
      en: 'Model router needs no deployments of its underlying models — except Claude. Deploy each Claude model in the same Foundry resource with a matching SKU (deployment type) before you add it to the model subset, or the router deployment fails with `InvalidResourceProperties`.',
      de: 'Model Router braucht keine eigenen Deployments seiner zugrunde liegenden Modelle – außer bei Claude. Stelle jedes Claude-Modell zuerst in derselben Foundry-Ressource mit passender SKU (Deployment-Typ) bereit, bevor du es ins Model Subset aufnimmst, sonst schlägt das Router-Deployment mit `InvalidResourceProperties` fehl.',
    },
  ],
  takeaways: [
    {
      en: 'Diagnose first: behavior → prompts, knowledge → RAG, consistency or prompt cost → fine-tuning.',
      de: 'Erst diagnostizieren: Verhalten → Prompts, Wissen → RAG, Konsistenz oder Prompt-Kosten → Fine-Tuning.',
    },
    {
      en: 'Start with prompt engineering and a measured baseline; add RAG or fine-tuning only when evaluation shows a gap.',
      de: 'Starte mit Prompt Engineering und einer gemessenen Baseline; ergänze RAG oder Fine-Tuning erst, wenn die Evaluierung eine Lücke zeigt.',
    },
    {
      en: 'Pick the fine-tuning method by your data: demonstrations → SFT, preference pairs → DPO, a reliable grader → RFT.',
      de: 'Wähle die Fine-Tuning-Methode nach deinen Daten: Beispiele → SFT, Präferenzpaare → DPO, verlässlicher Grader → RFT.',
    },
    {
      en: 'Bound every self-critique loop and judge against explicit criteria.',
      de: 'Begrenze jede Selbstkritik-Schleife und bewerte gegen klare Kriterien.',
    },
    {
      en: 'Use structured outputs when downstream code needs reliable JSON.',
      de: 'Nutze Structured Outputs, wenn nachgelagerter Code verlässliches JSON braucht.',
    },
    {
      en: 'Optimize the context (RAG) when knowledge is missing; optimize the model (fine-tuning) when format, style or tone must stay consistent. Prompt engineering underpins both, and you can combine them.',
      de: 'Optimiere den Kontext (RAG), wenn Wissen fehlt; optimiere das Modell (Fine-Tuning), wenn Format, Stil oder Ton konsistent bleiben müssen. Prompt Engineering ist die Basis für beides, und du kannst beides kombinieren.',
    },
  ],
  sources: [
    { title: 'Prompt engineering techniques', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering' },
    { title: 'Azure OpenAI reasoning models', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/reasoning' },
    { title: 'Retrieval augmented generation (RAG) and indexes', url: 'https://learn.microsoft.com/en-us/azure/foundry/concepts/retrieval-augmented-generation' },
    { title: 'Fine-tuning in Microsoft Foundry', url: 'https://learn.microsoft.com/en-us/azure/foundry/fine-tuning/overview' },
    { title: 'Model router for Microsoft Foundry', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-router' },
    { title: 'Use model router for Microsoft Foundry', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/model-router' },
    { title: 'Use model router with Foundry agents', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/model-router-agents' },
    { title: 'Fine-tune a model for consistent behavior', url: 'https://learn.microsoft.com/en-us/training/modules/optimize-generative-ai-model-performance/4-fine-tune-model' },
    { title: 'Compare and combine optimization strategies', url: 'https://learn.microsoft.com/en-us/training/modules/optimize-generative-ai-model-performance/5-compare-combine-strategies' },
  ],
}
