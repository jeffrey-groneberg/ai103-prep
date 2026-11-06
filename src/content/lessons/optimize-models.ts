import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'optimize-models',
  summary: {
    en: 'When a model\'s answers aren\'t good enough, first ask *what* is wrong. Wrong tone, format or behavior → start with **prompt engineering**: a clear system message, examples and tuned parameters — cheap and instant. Missing knowledge (private, recent or fast-changing data) → **ground** the model with Retrieval Augmented Generation (RAG). Behavior that stays inconsistent despite good prompts, or prompts that grew long and costly → **fine-tune** on examples. The strategies combine, and you measure every change against a baseline with evaluators.',
    de: 'Wenn die Antworten eines Modells nicht gut genug sind, frag zuerst, *was* falsch ist. Falscher Ton, falsches Format oder Verhalten → beginne mit **Prompt Engineering**: klare Systemnachricht, Beispiele und passende Parameter – günstig und sofort wirksam. Fehlendes Wissen (private, aktuelle oder schnell veränderliche Daten) → verankere das Modell per Retrieval Augmented Generation (**RAG**). Verhalten, das trotz guter Prompts inkonsistent bleibt, oder Prompts, die lang und teuer geworden sind → **Fine-Tuning** mit Beispielen. Die Strategien lassen sich kombinieren, und jede Änderung misst du mit Evaluatoren gegen eine Baseline.',
  },
  examFocus: {
    en: 'Expect symptom-to-strategy scenarios (invented or outdated facts → RAG; inconsistent style despite good prompts → fine-tuning; quick format fixes → prompt engineering), parameter questions (`temperature` or `top_p`, and why reasoning models use `reasoning.effort` and `max_output_tokens` instead), fine-tuning method choice (SFT, DPO or RFT by training signal), structured outputs for domain extraction, model router routing modes, and safe reflection loops with evaluators.',
    de: 'Rechne mit Szenarien von Symptom zu Strategie (erfundene oder veraltete Fakten → RAG; inkonsistenter Stil trotz guter Prompts → Fine-Tuning; schnelle Formatkorrekturen → Prompt Engineering), mit Parameterfragen (`temperature` oder `top_p` und warum Reasoning-Modelle stattdessen `reasoning.effort` und `max_output_tokens` nutzen), mit der Wahl der Fine-Tuning-Methode (SFT, DPO oder RFT je nach Trainingssignal), Structured Outputs für Fachextraktion, den Routing-Modi des Model Routers und sicheren Reflexionsschleifen mit Evaluatoren.',
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
      height: 430,
      nodes: [
        { id: 'N1', x: 10, y: 180, w: 150, h: 70, label: { en: 'Evaluate baseline', de: 'Baseline messen' }, sub: { en: 'test set + evaluators', de: 'Testset + Evaluatoren' }, tone: 'foundry' },
        { id: 'D', x: 200, y: 175, w: 160, h: 80, label: { en: "What's wrong?", de: 'Was hakt?' }, tone: 'neutral', shape: 'diamond' },
        {
          id: 'S1',
          x: 472,
          y: 30,
          w: 240,
          h: 74,
          label: 'Prompt engineering',
          sub: { en: 'system message · few-shot · params', de: 'Systemprompt · Few-Shot · Parameter' },
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
          tone: 'data',
        },
        { id: 'S3', x: 472, y: 326, w: 240, h: 74, label: 'Fine-tuning', sub: 'SFT · DPO · RFT', tone: 'model' },
        { id: 'C', x: 765, y: 178, w: 180, h: 74, label: { en: 'Combine + re-test', de: 'Kombinieren + testen' }, sub: { en: 'e.g. prompts + RAG', de: 'z. B. Prompts + RAG' }, tone: 'neutral' },
      ],
      edges: [
        { id: 'd0', from: 'N1', to: 'D' },
        { id: 'd1', from: 'D', to: 'S1', label: { en: 'format · tone', de: 'Format · Ton' } },
        { id: 'd2', from: 'D', to: 'S2', label: { en: 'knowledge gap', de: 'Wissenslücke' } },
        { id: 'd3', from: 'D', to: 'S3', label: { en: 'inconsistent', de: 'inkonsistent' } },
        { id: 'd4', from: 'S1', to: 'C', dashed: true },
        { id: 'd5', from: 'S2', to: 'C', dashed: true },
        { id: 'd6', from: 'S3', to: 'C', dashed: true },
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
            en: 'Wrong tone, format or scope? Refine the system message, add few-shot examples, use delimiters and tune `temperature` or `top_p` — or `reasoning.effort` on reasoning models. No extra infrastructure needed.',
            de: 'Falscher Ton, falsches Format oder Thema? Verfeinere die Systemnachricht, ergänze Few-Shot-Beispiele, nutze Trennzeichen und stimme `temperature` oder `top_p` ab – bei Reasoning-Modellen `reasoning.effort`. Keine zusätzliche Infrastruktur nötig.',
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
            en: 'If style or format still drifts despite good prompts, or prompts became long and costly, fine-tune: SFT with demonstrations, DPO with preferred/rejected pairs, RFT with a grader.',
            de: 'Driftet Stil oder Format trotz guter Prompts weiter, oder sind die Prompts lang und teuer geworden, hilft Fine-Tuning: SFT mit Beispielen, DPO mit bevorzugten/abgelehnten Paaren, RFT mit einem Grader.',
          },
          focus: ['d3', 'S3'],
        },
        {
          title: { en: 'Combine and re-test', de: 'Kombinieren und erneut testen' },
          text: {
            en: 'Strategies stack: prompts set behavior and guardrails, RAG supplies facts, fine-tuning locks in style. Re-run the same evaluation after every change.',
            de: 'Die Strategien ergänzen sich: Prompts setzen Verhalten und Leitplanken, RAG liefert Fakten, Fine-Tuning festigt den Stil. Führe nach jeder Änderung dieselbe Evaluierung erneut aus.',
          },
          focus: ['d4', 'd5', 'd6', 'C'],
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
        { id: 'R', x: 10, y: 60, w: 160, h: 64, label: { en: 'Task + criteria', de: 'Aufgabe + Kriterien' }, tone: 'user', shape: 'pill' },
        { id: 'G', x: 240, y: 56, w: 180, h: 72, label: { en: 'Generator model', de: 'Generator-Modell' }, sub: { en: 'writes the draft', de: 'schreibt den Entwurf' }, tone: 'model' },
        { id: 'J', x: 495, y: 56, w: 200, h: 72, label: { en: 'Judge / evaluator', de: 'Judge / Evaluator' }, sub: { en: 'score 1–5 + reason', de: 'Score 1–5 + Begründung' }, tone: 'foundry' },
        { id: 'P', x: 505, y: 200, w: 180, h: 80, label: { en: 'Passes?', de: 'Bestanden?' }, tone: 'neutral', shape: 'diamond' },
        { id: 'A', x: 765, y: 206, w: 170, h: 68, label: { en: 'Final answer', de: 'Finale Antwort' }, tone: 'app', shape: 'pill' },
        { id: 'X', x: 505, y: 350, w: 180, h: 70, label: { en: 'Stop + escalate', de: 'Stopp + eskalieren' }, sub: { en: 'after max rounds', de: 'nach max. Runden' }, tone: 'safety' },
      ],
      edges: [
        { id: 'l1', from: 'R', to: 'G', label: { en: 'prompt', de: 'Prompt' } },
        { id: 'l2', from: 'G', to: 'J', label: { en: 'draft', de: 'Entwurf' } },
        { id: 'l3', from: 'J', to: 'P', label: { en: 'verdict', de: 'Urteil' } },
        { id: 'l4', from: 'P', to: 'A', label: { en: 'yes', de: 'ja' } },
        { id: 'l5', from: 'P', to: 'G', label: { en: 'no: feedback', de: 'nein: Feedback' }, dashed: true, via: [[330, 240]] },
        { id: 'l6', from: 'P', to: 'X', label: { en: 'cap reached', de: 'Limit erreicht' } },
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
            en: 'A second call — a judge model or a Foundry evaluator such as groundedness or task adherence — scores the draft. LLM-as-judge evaluators return a 1–5 score, pass/fail against a threshold (default 3) and a reason.',
            de: 'Ein zweiter Aufruf – ein Judge-Modell oder ein Foundry-Evaluator wie Groundedness oder Task Adherence – bewertet den Entwurf. LLM-as-Judge-Evaluatoren liefern einen Score von 1–5, Pass/Fail gegen einen Schwellenwert (Standard 3) und eine Begründung.',
          },
          focus: ['l2', 'J', 'l3', 'P'],
        },
        {
          title: { en: 'Revise with feedback', de: 'Mit Feedback überarbeiten' },
          text: {
            en: 'If the draft fails, the judge\'s reason becomes feedback for the next attempt. That is model reflection — without exposing any raw chain of thought.',
            de: 'Fällt der Entwurf durch, wird die Begründung des Judges zum Feedback für den nächsten Versuch. Das ist Modell-Reflexion – ganz ohne rohe Chain of Thought offenzulegen.',
          },
          focus: ['l5', 'G'],
        },
        {
          title: { en: 'Stop safely', de: 'Sicher beenden' },
          text: {
            en: 'Always bound the loop. In Microsoft Agent Framework (experimental loop middleware) the default is 10 runs, and judge-driven loops default to 5. When the cap is hit, stop and escalate instead of looping forever.',
            de: 'Begrenze die Schleife immer. Im Microsoft Agent Framework (experimentelle Loop-Middleware) liegt der Standard bei 10 Durchläufen, Judge-Schleifen bei 5. Ist das Limit erreicht, stoppe und eskaliere, statt endlos weiterzulaufen.',
          },
          focus: ['l4', 'A', 'l6', 'X'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'System message',
      text: {
        en: 'The highest-level instructions, sent as `instructions` (or a system/developer message). A good one states the role, boundaries, output format and a "when unsure" policy. It influences behavior but doesn\'t guarantee it — test it and layer it with content filtering and evaluation.',
        de: 'Die oberste Anweisungsebene, gesendet als `instructions` (oder als System-/Developer-Nachricht). Eine gute nennt Rolle, Grenzen, Ausgabeformat und eine Regel für den Fall von Unsicherheit. Sie beeinflusst das Verhalten, garantiert es aber nicht – teste sie und kombiniere sie mit Inhaltsfiltern und Evaluierung.',
      },
    },
    {
      term: 'Prompt patterns',
      text: {
        en: 'Few-shot examples teach a pattern (zero-shot = none, one-shot = one). Chain-of-thought asks a non-reasoning model to work step by step. Delimiters (`---`, Markdown, XML) separate instructions from content, a cue primes the format, and repeating the key instruction at the end counters recency bias.',
        de: 'Few-Shot-Beispiele vermitteln ein Muster (Zero-Shot = keines, One-Shot = eines). Chain-of-Thought lässt ein Nicht-Reasoning-Modell schrittweise vorgehen. Trennzeichen (`---`, Markdown, XML) trennen Anweisungen von Inhalten, ein Cue gibt das Format vor, und die Wiederholung der Kernanweisung am Ende wirkt dem Recency Bias entgegen.',
      },
    },
    {
      term: 'Generation parameters',
      text: {
        en: '`temperature` (0–2) and `top_p` control randomness — change one, not both: low for facts, higher for creative text. Reasoning models (except GPT-6 Astra) don\'t support them; you steer those with `reasoning.effort` (`none` … `max`, model-dependent) and cap output with `max_output_tokens`, which also counts the billed reasoning tokens.',
        de: '`temperature` (0–2) und `top_p` steuern die Zufälligkeit – ändere einen, nicht beide: niedrig für Fakten, höher für kreative Texte. Reasoning-Modelle (außer GPT-6 Astra) unterstützen sie nicht; die steuerst du mit `reasoning.effort` (`none` … `max`, je nach Modell) und begrenzt die Ausgabe mit `max_output_tokens`, das auch die abgerechneten Reasoning-Tokens zählt.',
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
        en: 'Further trains a model\'s weights on task data. **SFT** learns from demonstrations (prompt + ideal response, JSONL), **DPO** from preferred vs. rejected responses, **RFT** from a grader that scores outputs. It improves consistency, tool use and prompt length — but adds training and hosting costs and doesn\'t replace retrieval for fresh facts.',
        de: 'Trainiert die Gewichte eines Modells mit Aufgabendaten weiter. **SFT** lernt aus Beispielen (Prompt + ideale Antwort, JSONL), **DPO** aus bevorzugten vs. abgelehnten Antworten, **RFT** von einem Grader, der Ausgaben bewertet. Das verbessert Konsistenz, Tool-Nutzung und Prompt-Länge – kostet aber Training und Hosting und ersetzt kein Retrieval für aktuelle Fakten.',
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
        en: 'A trained model you deploy once; for each prompt it picks a suitable underlying model. Routing modes: Balanced (default), Cost, Quality; a model subset limits the pool, and the response\'s `model` field shows which model answered. For fixed business rules, put deterministic code next to LLM steps in a workflow.',
        de: 'Ein trainiertes Modell, das du einmal bereitstellst; pro Prompt wählt es ein passendes zugrunde liegendes Modell. Routing-Modi: Balanced (Standard), Cost, Quality; ein Model Subset begrenzt die Auswahl, und das Feld `model` der Antwort zeigt, welches Modell geantwortet hat. Für feste Geschäftsregeln stellst du deterministischen Code neben LLM-Schritte in einem Workflow.',
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
      title: { en: 'Prompt engineering: system message, few-shot and temperature', de: 'Prompt Engineering: Systemnachricht, Few-Shot und Temperatur' },
      code: `from openai import OpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

client = OpenAI(
    base_url="https://<resource>.openai.azure.com/openai/v1/",
    api_key=get_bearer_token_provider(
        DefaultAzureCredential(), "https://ai.azure.com/.default"),
)

examples = [   # few-shot: pin down the exact label set
    {"role": "user", "content": "My laptop screen flickers."},
    {"role": "assistant", "content": "Hardware"},
    {"role": "user", "content": "I need access to the finance share."},
    {"role": "assistant", "content": "Access request"},
]
response = client.responses.create(
    model="gpt-4.1",                        # non-reasoning deployment
    instructions=(
        "You route IT tickets. Reply with one label: Hardware, "
        "Access request, Password reset. If none fits, reply Unknown."
    ),
    input=examples + [{"role": "user", "content": "I forgot my password."}],
    temperature=0.2,                        # focused, repeatable labels
)
print(response.output_text)                 # Password reset`,
      notes: [
        {
          en: '`instructions` is the system message: role, allowed labels and a fallback ("Unknown") for unclear input.',
          de: '`instructions` ist die Systemnachricht: Rolle, erlaubte Labels und ein Fallback („Unknown“) für unklare Eingaben.',
        },
        {
          en: 'The example turns are few-shot learning; a low `temperature` keeps classification repeatable — tune it or `top_p`, not both.',
          de: 'Die Beispielrunden sind Few-Shot-Learning; eine niedrige `temperature` hält die Klassifizierung reproduzierbar – stimme sie oder `top_p` ab, nicht beides.',
        },
      ],
    },
    {
      title: { en: 'Reasoning model + structured output for domain extraction', de: 'Reasoning-Modell + Structured Output für Fachextraktion' },
      code: `from pydantic import BaseModel

class Obligation(BaseModel):
    regulation: str
    obligation: str
    deadline: str      # "not stated" if the text has none
    risk_level: str    # low | medium | high

result = client.responses.parse(        # same client as above
    model="gpt-5-mini",                 # reasoning deployment
    reasoning={"effort": "low"},        # no temperature on reasoning models
    instructions="Extract the main obligation. Use only the given text; "
                 "write 'not stated' for missing values.",
    input=policy_text,
    text_format=Obligation,             # sent as text.format json_schema
    max_output_tokens=4000,             # includes reasoning tokens
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
      en: 'Reasoning models don\'t support `temperature`, `top_p` or `max_tokens` (except GPT-6 Astra), and a low `max_output_tokens` can return `incomplete` with no visible text because reasoning tokens count toward it.',
      de: 'Reasoning-Modelle unterstützen `temperature`, `top_p` und `max_tokens` nicht (außer GPT-6 Astra), und ein niedriges `max_output_tokens` kann `incomplete` ohne sichtbaren Text liefern, weil Reasoning-Tokens mitzählen.',
    },
    {
      en: 'A system message influences behavior but never guarantees it — and adjust `temperature` or `top_p`, not both at once.',
      de: 'Eine Systemnachricht beeinflusst das Verhalten, garantiert es aber nie – und passe `temperature` oder `top_p` an, nicht beide gleichzeitig.',
    },
    {
      en: 'Model router\'s context window is limited by its smallest underlying model, and `temperature`/`top_p` are ignored when it picks a reasoning model — use a model subset for long prompts.',
      de: 'Das Kontextfenster des Model Routers ist durch sein kleinstes zugrunde liegendes Modell begrenzt, und `temperature`/`top_p` werden ignoriert, wenn er ein Reasoning-Modell wählt – nutze für lange Prompts ein Model Subset.',
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
  ],
  sources: [
    { title: 'Prompt engineering techniques', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering' },
    { title: 'Azure OpenAI reasoning models', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/reasoning' },
    { title: 'Retrieval augmented generation (RAG) and indexes', url: 'https://learn.microsoft.com/en-us/azure/foundry/concepts/retrieval-augmented-generation' },
    { title: 'Fine-tuning in Microsoft Foundry', url: 'https://learn.microsoft.com/en-us/azure/foundry/fine-tuning/overview' },
    { title: 'Model router for Microsoft Foundry', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-router' },
  ],
}
