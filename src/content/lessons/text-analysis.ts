import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'text-analysis',
  summary: {
    en: '**Azure Language in Foundry Tools** is a prebuilt natural language processing (NLP) service that you call through your Microsoft Foundry resource endpoint — no model training and no prompt writing. You send one or more *documents* (plain strings) and get JSON back with predictions and confidence scores: the **language** of each text, **named entities** such as people, places and dates, and **personally identifiable information (PII)** together with a redacted copy of the text. Language detection, named entity recognition (NER), PII detection and Text Analytics for health are the *core* features. Older features such as sentiment analysis, key phrase extraction and summarization are *legacy* and retire on March 31, 2029 — for those tasks, and for any JSON shape of your own, you prompt a Foundry model and enforce a JSON schema with **structured outputs**.',
    de: '**Azure Language in Foundry Tools** ist ein vorgefertigter Dienst für die Verarbeitung natürlicher Sprache (NLP), den du über den Endpoint deiner Microsoft-Foundry-Ressource aufrufst – ohne Modelltraining und ohne Prompts. Du schickst ein oder mehrere *Dokumente* (einfache Strings) und bekommst JSON mit Vorhersagen und Konfidenzwerten zurück: die **Sprache** jedes Texts, **benannte Entitäten** wie Personen, Orte und Datumsangaben sowie **personenbezogene Daten (PII)** samt geschwärzter Kopie des Texts. Sprachenerkennung, Named Entity Recognition (NER), PII-Erkennung und Text Analytics for health sind die *Kernfunktionen*. Ältere Funktionen wie Stimmungsanalyse, Schlüsselwortextraktion und Zusammenfassung sind *Legacy* und werden am 31. März 2029 eingestellt – für diese Aufgaben und für jedes eigene JSON-Format promptest du ein Foundry-Modell und erzwingst mit **Structured Outputs** ein JSON-Schema.',
  },
  examFocus: {
    en: 'Expect scenarios that make you pick the right feature or method — `detect_language()`, `recognize_entities()`, `recognize_pii_entities()` with `redacted_text` and `categories_filter` — and read the result (`primary_language.iso6391_name`, `confidence_score`, entity `category`). Watch for retirement traps: sentiment, key phrases and summaries are legacy in Azure Language, so a *new* solution uses a Foundry model with structured outputs (`responses.parse(text_format=…)` → `output_parsed`). Know the PII redaction policies and how to adapt output to a domain (custom NER, `entitySynonyms`, `valueExclusionPolicy`, prompt + schema).',
    de: 'Rechne mit Szenarien, in denen du die passende Funktion oder Methode wählst – `detect_language()`, `recognize_entities()`, `recognize_pii_entities()` mit `redacted_text` und `categories_filter` – und das Ergebnis richtig liest (`primary_language.iso6391_name`, `confidence_score`, `category` einer Entität). Achte auf Fallen rund um auslaufende Funktionen: Stimmung, Schlüsselwörter und Zusammenfassungen sind in Azure Language Legacy, eine *neue* Lösung nutzt daher ein Foundry-Modell mit Structured Outputs (`responses.parse(text_format=…)` → `output_parsed`). Kenne die PII-Schwärzungsrichtlinien und die Wege, Ausgaben an eine Fachdomäne anzupassen (Custom NER, `entitySynonyms`, `valueExclusionPolicy`, Prompt + Schema).',
  },
  diagrams: [
    {
      id: 'ta-two-routes',
      title: { en: 'Two routes from raw text to JSON', de: 'Zwei Wege vom Rohtext zum JSON' },
      caption: {
        en: 'Top: prebuilt Azure Language features return fixed JSON. Bottom: a Foundry model returns JSON in the shape you define. Choose per task, or combine both.',
        de: 'Oben: Vorgefertigte Azure-Language-Funktionen liefern festes JSON. Unten: Ein Foundry-Modell liefert JSON in der Form, die du festlegst. Wähle je Aufgabe – oder kombiniere beide.',
      },
      width: 960,
      height: 400,
      groups: [{ id: 'g-lang', x: 190, y: 20, w: 600, h: 150, label: 'Azure Language in Foundry Tools', tone: 'foundry' }],
      nodes: [
        { id: 'txt', x: 20, y: 185, w: 130, h: 64, label: { en: 'Raw text', de: 'Rohtext' }, sub: { en: 'reviews, emails', de: 'Bewertungen, Mails' }, tone: 'data', shape: 'doc' },
        { id: 'det', x: 210, y: 70, w: 150, h: 64, label: { en: 'Detect language', de: 'Sprache erkennen' }, sub: 'detect_language', tone: 'foundry' },
        { id: 'ner', x: 415, y: 70, w: 150, h: 64, label: { en: 'Named entities', de: 'Entitäten (NER)' }, sub: 'recognize_entities', tone: 'foundry' },
        { id: 'pii', x: 620, y: 70, w: 150, h: 64, label: { en: 'PII detection', de: 'PII-Erkennung' }, sub: 'redacted_text', tone: 'foundry' },
        { id: 'json1', x: 830, y: 70, w: 120, h: 64, label: { en: 'JSON results', de: 'JSON-Ergebnis' }, sub: { en: 'scores, offsets', de: 'Scores, Offsets' }, tone: 'data', shape: 'doc' },
        { id: 'prompt', x: 210, y: 300, w: 150, h: 64, label: { en: 'Prompt + schema', de: 'Prompt + Schema' }, sub: 'responses.parse()', tone: 'app' },
        { id: 'llm', x: 470, y: 300, w: 160, h: 64, label: { en: 'Foundry model', de: 'Foundry-Modell' }, sub: { en: 'LLM deployment', de: 'LLM-Deployment' }, tone: 'model' },
        { id: 'json2', x: 830, y: 300, w: 120, h: 64, label: { en: 'Typed JSON', de: 'Schema-JSON' }, sub: 'output_parsed', tone: 'data', shape: 'doc' },
      ],
      edges: [
        { id: 'e-txt-det', from: 'txt', to: 'det' },
        { id: 'e-det-ner', from: 'det', to: 'ner' },
        { id: 'e-ner-pii', from: 'ner', to: 'pii' },
        { id: 'e-pii-json', from: 'pii', to: 'json1' },
        { id: 'e-txt-prompt', from: 'txt', to: 'prompt' },
        { id: 'e-prompt-llm', from: 'prompt', to: 'llm', label: 'Responses API' },
        { id: 'e-llm-json2', from: 'llm', to: 'json2', label: { en: 'schema-valid', de: 'schemakonform' } },
      ],
      steps: [
        {
          title: { en: 'Documents in', de: 'Dokumente rein' },
          text: {
            en: 'Both routes start with plain text. Azure Language calls each string a *document* and takes several per request (5 for NER and PII, 1,000 for language detection); synchronous calls allow up to 5,120 characters per document.',
            de: 'Beide Wege beginnen mit einfachem Text. Azure Language nennt jeden String ein *Dokument* und nimmt mehrere pro Anfrage an (5 bei NER und PII, 1.000 bei der Sprachenerkennung); synchrone Aufrufe erlauben bis zu 5.120 Zeichen pro Dokument.',
          },
          focus: ['txt'],
        },
        {
          title: { en: 'Detect the language', de: 'Sprache erkennen' },
          text: {
            en: '`detect_language()` returns `primary_language` with `name`, `iso6391_name` and a `confidence_score` between 0 and 1. Mixed-language text gives the dominant language with a lower score; text such as numbers only gives `(Unknown)` and 0.',
            de: '`detect_language()` liefert `primary_language` mit `name`, `iso6391_name` und einem `confidence_score` zwischen 0 und 1. Gemischtsprachiger Text ergibt die dominante Sprache mit niedrigerem Score; Text wie reine Zahlen ergibt `(Unknown)` und 0.',
          },
          focus: ['e-txt-det', 'det'],
        },
        {
          title: { en: 'Extract entities', de: 'Entitäten extrahieren' },
          text: {
            en: '`recognize_entities()` tags people, organizations, locations, dates and more with a `category` and a confidence score. Pass the detected language code — otherwise English is assumed.',
            de: '`recognize_entities()` markiert Personen, Organisationen, Orte, Datumsangaben und mehr mit einer `category` und einem Konfidenzwert. Übergib den erkannten Sprachcode – sonst wird Englisch angenommen.',
          },
          focus: ['e-det-ner', 'ner'],
        },
        {
          title: { en: 'Find and redact PII', de: 'PII finden und schwärzen' },
          text: {
            en: '`recognize_pii_entities()` returns the sensitive entities **and** a `redacted_text` copy in one call. All results arrive as JSON with categories, offsets and confidence scores.',
            de: '`recognize_pii_entities()` liefert die sensiblen Entitäten **und** eine Kopie `redacted_text` in einem Aufruf. Alle Ergebnisse kommen als JSON mit Kategorien, Offsets und Konfidenzwerten.',
          },
          focus: ['e-ner-pii', 'pii', 'e-pii-json', 'json1'],
        },
        {
          title: { en: 'The generative route', de: 'Der generative Weg' },
          text: {
            en: 'Summaries, topics, sentiment and tone are legacy features in Azure Language. For new solutions you prompt a Foundry model through the Responses API and describe exactly which fields you want.',
            de: 'Zusammenfassungen, Themen, Stimmung und Tonalität sind in Azure Language Legacy-Funktionen. Für neue Lösungen promptest du ein Foundry-Modell über die Responses API und beschreibst genau, welche Felder du brauchst.',
          },
          focus: ['e-txt-prompt', 'prompt', 'e-prompt-llm', 'llm'],
        },
        {
          title: { en: 'Enforce the schema', de: 'Schema erzwingen' },
          text: {
            en: 'Structured outputs bind the answer to your JSON schema: `responses.parse(text_format=Model)` sends a Pydantic model as the schema and returns a typed object in `output_parsed`.',
            de: 'Structured Outputs binden die Antwort an dein JSON-Schema: `responses.parse(text_format=Model)` schickt ein Pydantic-Modell als Schema und liefert ein typisiertes Objekt in `output_parsed`.',
          },
          focus: ['e-llm-json2', 'json2'],
        },
      ],
    },
    {
      id: 'pii-redaction',
      title: { en: 'One detection, four ways to hide it', de: 'Eine Erkennung, vier Arten zu verbergen' },
      caption: {
        en: 'Newer PII API versions let you choose a redaction policy per request — and combine a default policy with overrides for specific entity types.',
        de: 'Neuere Versionen der PII-API lassen dich pro Anfrage eine Schwärzungsrichtlinie wählen – und eine Standardrichtlinie mit Ausnahmen für bestimmte Entitätstypen kombinieren.',
      },
      width: 960,
      height: 400,
      nodes: [
        { id: 'in', x: 20, y: 165, w: 180, h: 70, label: { en: 'Input text', de: 'Eingabetext' }, sub: 'John Doe … 424-878-9193', tone: 'data', shape: 'doc' },
        { id: 'svc', x: 250, y: 165, w: 180, h: 70, label: { en: 'PII detection', de: 'PII-Erkennung' }, sub: 'redactionPolicies', tone: 'foundry' },
        { id: 'o1', x: 500, y: 20, w: 440, h: 60, label: { en: 'characterMask (default)', de: 'characterMask (Standard)' }, sub: '******** received a call from ************', tone: 'data' },
        { id: 'o2', x: 500, y: 120, w: 440, h: 60, label: 'entityMask', sub: '[PERSON_1] received a call from [PHONENUMBER_1]', tone: 'data' },
        { id: 'o3', x: 500, y: 220, w: 440, h: 60, label: 'syntheticReplacement', sub: 'Sam Johnson received a call from 401-255-6901', tone: 'data' },
        { id: 'o4', x: 500, y: 320, w: 440, h: 60, label: 'noMask', sub: { en: 'entities only, no redactedText field', de: 'nur Entitäten, kein Feld redactedText' }, tone: 'data' },
      ],
      edges: [
        { id: 'e-in-svc', from: 'in', to: 'svc' },
        { id: 'e-o1', from: 'svc', to: 'o1', via: [[465, 200], [465, 50]] },
        { id: 'e-o2', from: 'svc', to: 'o2', via: [[465, 200], [465, 150]] },
        { id: 'e-o3', from: 'svc', to: 'o3', via: [[465, 200], [465, 250]] },
        { id: 'e-o4', from: 'svc', to: 'o4', via: [[465, 200], [465, 350]] },
      ],
      steps: [
        {
          title: { en: 'Detect first, then decide how to hide', de: 'Erst erkennen, dann verbergen' },
          text: {
            en: 'PII detection returns each entity with category, offset and confidence plus a redacted copy of the text. `piiCategories` (Python: `categories_filter`) controls *what* is detected; the redaction policy controls *how* it is hidden.',
            de: 'Die PII-Erkennung liefert jede Entität mit Kategorie, Offset und Konfidenz plus eine geschwärzte Kopie des Texts. `piiCategories` (Python: `categories_filter`) steuert, *was* erkannt wird; die Schwärzungsrichtlinie steuert, *wie* es verborgen wird.',
          },
          focus: ['in', 'e-in-svc', 'svc'],
        },
        {
          title: { en: 'characterMask — the default', de: 'characterMask – der Standard' },
          text: {
            en: 'Every character of a detected value is replaced, so length and offsets stay intact. `redactionCharacter` chooses the symbol, for example `-` instead of `*`.',
            de: 'Jedes Zeichen eines erkannten Werts wird ersetzt, Länge und Offsets bleiben also erhalten. `redactionCharacter` wählt das Symbol, zum Beispiel `-` statt `*`.',
          },
          focus: ['e-o1', 'o1'],
        },
        {
          title: { en: 'entityMask — show the type', de: 'entityMask – den Typ zeigen' },
          text: {
            en: 'Each value becomes its entity type plus a counter, such as `[PERSON_1]`. Readers still see *what kind* of data was removed, which keeps transcripts useful for analysis.',
            de: 'Jeder Wert wird zu seinem Entitätstyp plus Zähler, etwa `[PERSON_1]`. Lesende sehen weiterhin, *welche Art* von Daten entfernt wurde – Transkripte bleiben so für Analysen nützlich.',
          },
          focus: ['e-o2', 'o2'],
        },
        {
          title: { en: 'syntheticReplacement — anonymize', de: 'syntheticReplacement – anonymisieren' },
          text: {
            en: 'Detected values are swapped for realistic fake values from a predefined set. Use it when text must look natural, for example for test data.',
            de: 'Erkannte Werte werden gegen realistische Ersatzwerte aus einem vordefinierten Satz getauscht. Nutze das, wenn Text natürlich wirken muss, etwa für Testdaten.',
          },
          focus: ['e-o3', 'o3'],
        },
        {
          title: { en: 'noMask — detect only', de: 'noMask – nur erkennen' },
          text: {
            en: 'The response contains the entities but no `redactedText`. Use it when you only need to flag or route messages. A `confidenceScoreThreshold` drops detections below a minimum score.',
            de: 'Die Antwort enthält die Entitäten, aber kein `redactedText`. Nutze das, wenn du Nachrichten nur markieren oder weiterleiten willst. Ein `confidenceScoreThreshold` verwirft Erkennungen unter einem Mindestwert.',
          },
          focus: ['e-o4', 'o4'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Azure Language in Foundry Tools',
      text: {
        en: 'Prebuilt NLP over REST or the Python SDK `azure-ai-textanalytics` (`TextAnalyticsClient`). You call your Foundry resource endpoint (`https://<resource>.cognitiveservices.azure.com`) with a key or, better, Microsoft Entra ID via `DefaultAzureCredential` — which requires a custom subdomain endpoint. Playgrounds in the Foundry portal let you try features without code.',
        de: 'Vorgefertigtes NLP per REST oder über das Python SDK `azure-ai-textanalytics` (`TextAnalyticsClient`). Du rufst den Endpoint deiner Foundry-Ressource auf (`https://<resource>.cognitiveservices.azure.com`) – mit Key oder besser mit Microsoft Entra ID über `DefaultAzureCredential`, was einen Endpoint mit Custom Subdomain voraussetzt. Playgrounds im Foundry-Portal lassen dich Funktionen ohne Code ausprobieren.',
      },
    },
    {
      term: 'Core vs. legacy features',
      text: {
        en: 'Core and recommended for new work: language detection, prebuilt and custom NER, PII detection, Text Analytics for health. Legacy, supported only for existing apps and retiring: sentiment analysis and opinion mining, key phrase extraction, summarization, entity linking, conversational language understanding, custom question answering and custom text classification.',
        de: 'Kern und für Neues empfohlen: Sprachenerkennung, vorgefertigte und Custom NER, PII-Erkennung, Text Analytics for health. Legacy, nur noch für bestehende Apps unterstützt und vor der Einstellung: Stimmungsanalyse und Opinion Mining, Schlüsselwortextraktion, Zusammenfassung, Entity Linking, Conversational Language Understanding, Custom Question Answering und Custom Text Classification.',
      },
    },
    {
      term: 'Language detection',
      text: {
        en: '`detect_language()` returns `primary_language` with `name`, `iso6391_name` and a `confidence_score` (0–1). An optional `country_hint` helps with ambiguous text. Language detection accepts up to 1,000 documents per request.',
        de: '`detect_language()` liefert `primary_language` mit `name`, `iso6391_name` und einem `confidence_score` (0–1). Ein optionaler `country_hint` hilft bei mehrdeutigem Text. Die Sprachenerkennung akzeptiert bis zu 1.000 Dokumente pro Anfrage.',
      },
    },
    {
      term: 'Named entity recognition (NER)',
      text: {
        en: '`recognize_entities()` returns entities with `text`, `category` (Person, PersonType, Location, Organization, DateTime, …), offsets and confidence — without training. The REST options `inclusionList`, `exclusionList` and `overlapPolicy` tailor which entity tags come back.',
        de: '`recognize_entities()` liefert Entitäten mit `text`, `category` (Person, PersonType, Location, Organization, DateTime, …), Offsets und Konfidenz – ganz ohne Training. Die REST-Optionen `inclusionList`, `exclusionList` und `overlapPolicy` steuern, welche Entitäts-Tags zurückkommen.',
      },
    },
    {
      term: 'PII detection and redaction',
      text: {
        en: '`recognize_pii_entities()` returns PII entities plus `redacted_text`. Narrow it with `categories_filter` (REST: `piiCategories`) or `domain_filter="phi"` for health data; in REST you also choose a redaction policy and a `confidenceScoreThreshold`. Variants exist for conversations and native documents (PDF, DOCX, TXT).',
        de: '`recognize_pii_entities()` liefert PII-Entitäten plus `redacted_text`. Eingrenzen kannst du mit `categories_filter` (REST: `piiCategories`) oder `domain_filter="phi"` für Gesundheitsdaten; per REST wählst du zusätzlich eine Schwärzungsrichtlinie und einen `confidenceScoreThreshold`. Varianten gibt es für Konversationen und native Dokumente (PDF, DOCX, TXT).',
      },
    },
    {
      term: 'Structured outputs',
      text: {
        en: 'Makes a Foundry model return JSON that follows your JSON schema: `text.format` in the Responses API (SDK: `responses.parse(text_format=Model)` → `output_parsed`) or `response_format` in Chat Completions. JSON mode only guarantees valid JSON, not your schema. Every field must be required and objects need `additionalProperties: false`.',
        de: 'Lässt ein Foundry-Modell JSON zurückgeben, das deinem JSON-Schema folgt: `text.format` in der Responses API (SDK: `responses.parse(text_format=Model)` → `output_parsed`) oder `response_format` bei Chat Completions. Der JSON-Modus garantiert nur gültiges JSON, nicht dein Schema. Jedes Feld muss Pflicht sein, und Objekte brauchen `additionalProperties: false`.',
      },
    },
    {
      term: 'Domain adaptation',
      text: {
        en: 'Prebuilt PII learns your vocabulary with `entitySynonyms` (for example *BAN* for a bank account number) and skips listed values with `valueExclusionPolicy`. New entity types need custom NER trained on labeled text. Domain outputs such as compliance summaries come from a Foundry model with instructions, examples and a schema.',
        de: 'Die vorgefertigte PII-Erkennung lernt dein Vokabular über `entitySynonyms` (etwa *BAN* für eine Kontonummer) und überspringt gelistete Werte per `valueExclusionPolicy`. Neue Entitätstypen brauchen Custom NER, trainiert auf beschrifteten Texten. Fachliche Ausgaben wie Compliance-Zusammenfassungen liefert ein Foundry-Modell mit Anweisungen, Beispielen und Schema.',
      },
    },
  ],
  comparison: {
    title: { en: 'Azure Language feature or prompted model?', de: 'Azure-Language-Funktion oder gepromptetes Modell?' },
    columns: [
      { en: 'Aspect', de: 'Aspekt' },
      { en: 'Azure Language (core features)', de: 'Azure Language (Kernfunktionen)' },
      { en: 'Foundry model + structured outputs', de: 'Foundry-Modell + Structured Outputs' },
    ],
    rows: [
      [
        { en: 'Best for', de: 'Ideal für' },
        { en: 'Language detection, NER, PII, health entities', de: 'Sprachenerkennung, NER, PII, Gesundheitsentitäten' },
        { en: 'Summaries, topics, sentiment, tone, custom fields', de: 'Zusammenfassungen, Themen, Stimmung, Tonalität, eigene Felder' },
      ],
      [
        { en: 'Output', de: 'Ausgabe' },
        { en: 'Fixed JSON with categories, offsets, scores', de: 'Festes JSON mit Kategorien, Offsets, Scores' },
        { en: 'Your own JSON schema', de: 'Dein eigenes JSON-Schema' },
      ],
      [
        { en: 'Customization', de: 'Anpassung' },
        { en: 'Parameters, custom NER, synonyms, exclusions', de: 'Parameter, Custom NER, Synonyme, Ausschlüsse' },
        { en: 'Instructions, examples, schema', de: 'Anweisungen, Beispiele, Schema' },
      ],
      [
        { en: 'Billing', de: 'Abrechnung' },
        { en: 'Per text record (1,000 characters)', de: 'Pro Textdatensatz (1.000 Zeichen)' },
        { en: 'Per input and output token', de: 'Pro Input- und Output-Token' },
      ],
      [
        { en: 'New projects', de: 'Neue Projekte' },
        { en: 'Yes for core features; legacy ones retire', de: 'Ja für Kernfunktionen; Legacy-Funktionen laufen aus' },
        { en: 'Recommended replacement for legacy tasks', de: 'Empfohlener Ersatz für Legacy-Aufgaben' },
      ],
    ],
  },
  code: [
    {
      title: { en: 'Keyless language detection, NER and PII redaction', de: 'Schlüssellose Sprachenerkennung, NER und PII-Schwärzung' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.textanalytics import TextAnalyticsClient

client = TextAnalyticsClient(
    endpoint="https://<resource>.cognitiveservices.azure.com",
    credential=DefaultAzureCredential(),
)
docs = ["Bonjour, je suis Marie Dupont de Contoso. Appelez-moi au 06 12 34 56 78."]

lang = client.detect_language(docs)[0].primary_language
print(lang.name, lang.iso6391_name, lang.confidence_score)

for entity in client.recognize_entities(docs, language=lang.iso6391_name)[0].entities:
    print(entity.text, entity.category, entity.confidence_score)

pii = client.recognize_pii_entities(
    docs, language=lang.iso6391_name, categories_filter=["Person", "PhoneNumber"]
)[0]
print(pii.redacted_text)`,
      notes: [
        {
          en: 'The endpoint is the Foundry **resource** endpoint, not the project endpoint. Entra ID sign-in needs this custom-subdomain form of the endpoint plus a role assignment for your identity.',
          de: 'Der Endpoint ist der **Ressourcen**-Endpoint von Foundry, nicht der Project Endpoint. Die Entra-ID-Anmeldung braucht genau diese Endpoint-Form mit Custom Subdomain plus eine Rollenzuweisung für deine Identität.',
        },
        {
          en: 'Passing `iso6391_name` as `language` matters: NER and PII assume English when you omit it.',
          de: '`iso6391_name` als `language` zu übergeben ist wichtig: NER und PII nehmen ohne Angabe Englisch an.',
        },
        {
          en: '`redacted_text` comes back with the PII result — `categories_filter` limits redaction to the listed types.',
          de: '`redacted_text` kommt mit dem PII-Ergebnis zurück – `categories_filter` begrenzt die Schwärzung auf die gelisteten Typen.',
        },
      ],
    },
    {
      title: { en: 'Sentiment, tone, topics and summary as typed JSON', de: 'Stimmung, Tonalität, Themen und Zusammenfassung als typisiertes JSON' },
      code: `from typing import Literal
from pydantic import BaseModel
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

class ReviewInsights(BaseModel):
    sentiment: Literal["positive", "neutral", "negative", "mixed"]
    tone: str
    topics: list[str]
    people: list[str]
    summary: str

project = AIProjectClient(
    endpoint="https://<resource>.services.ai.azure.com/api/projects/<project>",
    credential=DefaultAzureCredential(),
)
openai = project.get_openai_client()

response = openai.responses.parse(
    model="gpt-4.1",  # your deployment name
    instructions="Extract insights from the review. Use only facts stated in the text.",
    input="Ana, the courier, was friendly, but my order arrived two weeks late.",
    text_format=ReviewInsights,
)
print(response.output_parsed)`,
      notes: [
        {
          en: '`text_format` turns the Pydantic model into a strict JSON schema; `output_parsed` returns a `ReviewInsights` object.',
          de: '`text_format` macht aus dem Pydantic-Modell ein striktes JSON-Schema; `output_parsed` liefert ein `ReviewInsights`-Objekt.',
        },
        {
          en: '`Literal` becomes an enum, so the sentiment label can only be one of the four allowed values.',
          de: '`Literal` wird zu einem Enum – das Stimmungslabel kann also nur einer der vier erlaubten Werte sein.',
        },
      ],
    },
  ],
  traps: [
    {
      en: 'Sentiment analysis, key phrase extraction and summarization still run in Azure Language but are **legacy** (retiring March 31, 2029). For a *new* solution, the expected answer is a Foundry model — not the legacy API.',
      de: 'Stimmungsanalyse, Schlüsselwortextraktion und Zusammenfassung laufen noch in Azure Language, sind aber **Legacy** (Einstellung am 31. März 2029). Für eine *neue* Lösung ist ein Foundry-Modell die erwartete Antwort – nicht die Legacy-API.',
    },
    {
      en: '`TextAnalyticsClient` takes the **resource** endpoint (`*.cognitiveservices.azure.com`), not the project endpoint — and Entra ID authentication requires a custom subdomain endpoint.',
      de: '`TextAnalyticsClient` erwartet den **Ressourcen**-Endpoint (`*.cognitiveservices.azure.com`), nicht den Project Endpoint – und die Entra-ID-Anmeldung setzt einen Endpoint mit Custom Subdomain voraus.',
    },
    {
      en: 'Without a `language` value, NER and PII assume English. Detect the language first and pass the code for non-English text.',
      de: 'Ohne `language` nehmen NER und PII Englisch an. Erkenne zuerst die Sprache und übergib den Code bei nicht englischen Texten.',
    },
    {
      en: 'Synchronous requests allow 5,120 characters per document and only 5 documents per NER or PII request (1,000 for language detection). Larger inputs need chunking or the asynchronous API.',
      de: 'Synchrone Anfragen erlauben 5.120 Zeichen pro Dokument und nur 5 Dokumente pro NER- oder PII-Anfrage (1.000 bei der Sprachenerkennung). Größere Eingaben brauchen Chunking oder die asynchrone API.',
    },
    {
      en: 'PII detection is not content moderation: hate, sexual, violence and self-harm are detected by Azure AI Content Safety, which powers Foundry guardrails.',
      de: 'PII-Erkennung ist keine Inhaltsmoderation: Hass, sexuelle Inhalte, Gewalt und Selbstverletzung erkennt Azure AI Content Safety, das die Foundry-Guardrails antreibt.',
    },
  ],
  takeaways: [
    { en: 'Language, entities, PII → Azure Language core features.', de: 'Sprache, Entitäten, PII → Kernfunktionen von Azure Language.' },
    { en: 'Summaries, topics, sentiment, tone, custom fields → Foundry model + structured outputs.', de: 'Zusammenfassungen, Themen, Stimmung, Tonalität, eigene Felder → Foundry-Modell + Structured Outputs.' },
    { en: 'PII: categories decide *what* is hidden, the redaction policy decides *how*.', de: 'PII: Kategorien bestimmen, *was* verborgen wird, die Schwärzungsrichtlinie, *wie*.' },
    { en: 'Keyless: `DefaultAzureCredential` plus a custom subdomain endpoint.', de: 'Schlüssellos: `DefaultAzureCredential` plus Endpoint mit Custom Subdomain.' },
  ],
  sources: [
    { title: 'What is Azure Language in Foundry Tools?', url: 'https://learn.microsoft.com/en-us/azure/ai-services/language-service/overview' },
    { title: 'Detect and redact PII in text', url: 'https://learn.microsoft.com/en-us/azure/ai-services/language-service/personally-identifiable-information/how-to/redact-text-pii' },
    { title: 'Azure Text Analytics client library for Python', url: 'https://learn.microsoft.com/en-us/python/api/overview/azure/ai-textanalytics-readme' },
    { title: 'Structured outputs', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/structured-outputs' },
    { title: 'What are sentiment analysis and opinion mining?', url: 'https://learn.microsoft.com/en-us/azure/ai-services/language-service/sentiment-opinion-mining/overview' },
  ],
}
