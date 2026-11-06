import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'translation',
  summary: {
    en: 'Microsoft Foundry offers two Foundry Tools for translation. **Azure Translator** translates text between more than 100 languages with neural machine translation (NMT) by default; since API version `2026-06-06` you can pick an **LLM deployment** per target language instead and control tone and gender. Translator also translates whole documents and supports custom models for domain terminology. **Azure Speech** translates spoken audio in real time: a `TranslationRecognizer` recognizes the speech, translates it and can speak the result in another voice. For LLM-based speech translation you use **Azure LLM Speech** for recorded files or **GPT Realtime Translate** for live streams.',
    de: 'Microsoft Foundry bietet zwei Foundry Tools für Übersetzungen. **Azure Translator** übersetzt Text zwischen mehr als 100 Sprachen standardmäßig mit neuronaler maschineller Übersetzung (NMT); seit API-Version `2026-06-06` kannst du stattdessen pro Zielsprache ein **LLM-Deployment** wählen und Ton und Gender steuern. Translator übersetzt außerdem ganze Dokumente und unterstützt eigene Modelle für Fachterminologie. **Azure Speech** übersetzt gesprochene Sprache in Echtzeit: Ein `TranslationRecognizer` erkennt das Gesprochene, übersetzt es und kann das Ergebnis mit einer anderen Stimme sprechen. Für LLM-basierte Sprachübersetzung nutzt du **Azure LLM Speech** für aufgezeichnete Dateien oder **GPT Realtime Translate** für Live-Streams.',
  },
  examFocus: {
    en: 'Expect "which option fits" scenarios (NMT vs. LLM vs. document translation vs. speech), the `2026-06-06` request shape (`inputs`, `targets`, `deploymentName`, `tone`, `gender`) versus v3.0 (`to`, `from`, `category`), the methods removed in `2026-06-06` (Detect, BreakSentence, Dictionary Lookup), keyless authentication rules, and Speech SDK details: `speech_recognition_language` (a locale), `add_target_language()` (a language code), `voice_name` with the `synthesizing` event (one target only) and manual synthesis for several targets.',
    de: 'Rechne mit Szenarien nach dem Muster „Welche Option passt?“ (NMT vs. LLM vs. Dokumentübersetzung vs. Speech), mit der Anfrageform von `2026-06-06` (`inputs`, `targets`, `deploymentName`, `tone`, `gender`) im Vergleich zu v3.0 (`to`, `from`, `category`), mit den in `2026-06-06` entfernten Methoden (Detect, BreakSentence, Dictionary Lookup), mit Regeln zur schlüssellosen Anmeldung und mit Details des Speech SDK: `speech_recognition_language` (ein Locale), `add_target_language()` (ein Sprachcode), `voice_name` mit dem Event `synthesizing` (nur ein Ziel) und manuelle Synthese für mehrere Ziele.',
  },
  diagrams: [
    {
      id: 'translation-routes',
      title: { en: 'Translation routes in Microsoft Foundry', de: 'Übersetzungswege in Microsoft Foundry' },
      caption: {
        en: 'Text goes through Azure Translator (NMT or your LLM deployment). Speech goes through Azure Speech — or through an LLM-based audio model.',
        de: 'Text läuft über Azure Translator (NMT oder dein LLM-Deployment). Sprache läuft über Azure Speech – oder über ein LLM-basiertes Audiomodell.',
      },
      width: 960,
      height: 460,
      groups: [
        { id: 'g-speech', x: 190, y: 190, w: 600, h: 130, label: 'Azure Speech · TranslationRecognizer', tone: 'foundry' },
        { id: 'g-llm', x: 190, y: 344, w: 600, h: 108, label: { en: 'LLM-based speech translation', de: 'LLM-basierte Sprachübersetzung' }, tone: 'model' },
      ],
      nodes: [
        { id: 't_in', x: 20, y: 54, w: 140, h: 64, label: { en: 'Source text', de: 'Quelltext' }, sub: { en: '+ target languages', de: '+ Zielsprachen' }, tone: 'data', shape: 'doc' },
        { id: 't_tr', x: 210, y: 54, w: 180, h: 64, label: 'Azure Translator', sub: 'api-version 2026-06-06', tone: 'foundry' },
        { id: 'nmt', x: 450, y: 10, w: 210, h: 56, label: { en: 'NMT (default)', de: 'NMT (Standard)' }, sub: 'deploymentName: general', tone: 'model' },
        { id: 'llm', x: 450, y: 106, w: 210, h: 56, label: { en: 'LLM deployment', de: 'LLM-Deployment' }, sub: { en: 'tone · gender · adaptive', de: 'Ton · Gender · adaptiv' }, tone: 'model' },
        { id: 't_out', x: 720, y: 54, w: 180, h: 64, label: { en: 'Translated text', de: 'Übersetzter Text' }, sub: 'value[].translations', tone: 'data', shape: 'doc' },
        { id: 's_in', x: 20, y: 230, w: 150, h: 64, label: { en: 'Speaker', de: 'Sprecher:in' }, sub: { en: 'mic or file', de: 'Mikro oder Datei' }, tone: 'user', shape: 'actor' },
        { id: 'rec', x: 210, y: 230, w: 160, h: 64, label: { en: 'Recognize', de: 'Erkennen' }, sub: { en: 'locale: en-US', de: 'Locale: en-US' }, tone: 'foundry' },
        { id: 'trn', x: 420, y: 230, w: 160, h: 64, label: { en: 'Translate', de: 'Übersetzen' }, sub: 'add_target_language', tone: 'foundry' },
        { id: 'syn', x: 630, y: 230, w: 140, h: 64, label: { en: 'Synthesize', de: 'Synthetisieren' }, sub: 'voice_name', tone: 'foundry' },
        { id: 's_out', x: 830, y: 230, w: 120, h: 64, label: { en: 'Listener', de: 'Zuhörer:in' }, sub: { en: 'audio + text', de: 'Audio + Text' }, tone: 'user', shape: 'actor' },
        { id: 'llm_rt', x: 210, y: 376, w: 270, h: 56, label: 'gpt-realtime-translate', sub: { en: 'live audio → speech + text', de: 'Live-Audio → Sprache + Text' }, tone: 'model' },
        { id: 'llm_sp', x: 520, y: 376, w: 250, h: 56, label: 'Azure LLM Speech', sub: { en: 'task: translate · files', de: 'task: translate · Dateien' }, tone: 'foundry' },
      ],
      edges: [
        { id: 'e-tin-ttr', from: 't_in', to: 't_tr' },
        { id: 'e-ttr-nmt', from: 't_tr', to: 'nmt' },
        { id: 'e-ttr-llm', from: 't_tr', to: 'llm' },
        { id: 'e-nmt-tout', from: 'nmt', to: 't_out' },
        { id: 'e-llm-tout', from: 'llm', to: 't_out' },
        { id: 'e-sin-rec', from: 's_in', to: 'rec' },
        { id: 'e-rec-trn', from: 'rec', to: 'trn' },
        { id: 'e-trn-syn', from: 'trn', to: 'syn' },
        { id: 'e-syn-sout', from: 'syn', to: 's_out' },
        { id: 'e-sin-llm', from: 's_in', to: 'g-llm', label: { en: 'LLM route', de: 'LLM-Weg' }, dashed: true, via: [[95, 398]] },
      ],
      steps: [
        {
          title: { en: 'Text in, targets out', de: 'Text rein, Ziele raus' },
          text: {
            en: 'You send text plus one or more target languages. In API `2026-06-06` that\'s an `inputs` array whose items carry a `targets` array; if you omit the source `language`, Translator detects it.',
            de: 'Du schickst Text plus eine oder mehrere Zielsprachen. In API `2026-06-06` ist das ein `inputs`-Array, dessen Einträge ein `targets`-Array tragen; lässt du die Quell-`language` weg, erkennt Translator sie selbst.',
          },
          focus: ['t_in', 'e-tin-ttr', 't_tr'],
        },
        {
          title: { en: 'NMT by default', de: 'Standardmäßig NMT' },
          text: {
            en: 'Without a `deploymentName`, Translator uses `general` — neural machine translation, billed per character. One request takes up to 1,000 texts and 50,000 characters, counted across all target languages.',
            de: 'Ohne `deploymentName` nutzt Translator `general` – neuronale maschinelle Übersetzung, abgerechnet pro Zeichen. Eine Anfrage fasst bis zu 1.000 Texte und 50.000 Zeichen, gezählt über alle Zielsprachen.',
          },
          focus: ['e-ttr-nmt', 'nmt', 'e-nmt-tout', 't_out'],
        },
        {
          title: { en: 'Or your LLM deployment', de: 'Oder dein LLM-Deployment' },
          text: {
            en: 'Set `deploymentName` to a GPT deployment to unlock `tone`, `gender` and adaptive custom translation. This needs a Foundry resource, is billed per token and allows 50 texts of up to 5,000 characters.',
            de: 'Setz `deploymentName` auf ein GPT-Deployment, um `tone`, `gender` und adaptive Custom Translation freizuschalten. Das braucht eine Foundry-Ressource, wird pro Token abgerechnet und erlaubt 50 Texte à bis zu 5.000 Zeichen.',
          },
          focus: ['e-ttr-llm', 'llm', 'e-llm-tout'],
        },
        {
          title: { en: 'Speech: recognize, then translate', de: 'Sprache: erkennen, dann übersetzen' },
          text: {
            en: 'A `TranslationRecognizer` first recognizes speech in the source locale (`speech_recognition_language`), then translates it into every language added with `add_target_language()`.',
            de: 'Ein `TranslationRecognizer` erkennt zuerst das Gesprochene im Quell-Locale (`speech_recognition_language`) und übersetzt es dann in jede Sprache, die du mit `add_target_language()` hinzugefügt hast.',
          },
          focus: ['g-speech', 's_in', 'e-sin-rec', 'rec', 'e-rec-trn', 'trn'],
        },
        {
          title: { en: 'Speak the translation', de: 'Übersetzung aussprechen' },
          text: {
            en: 'Set `voice_name` and handle the `synthesizing` event to receive translated audio, or synthesize each text yourself. Live Interpreter adds automatic language detection and a natural voice that keeps the speaker\'s style.',
            de: 'Setz `voice_name` und behandle das Event `synthesizing`, um übersetztes Audio zu erhalten, oder synthetisiere jeden Text selbst. Live Interpreter ergänzt automatische Sprachenerkennung und eine natürliche Stimme, die den Stil der Sprechenden bewahrt.',
          },
          focus: ['e-trn-syn', 'syn', 'e-syn-sout', 's_out'],
        },
        {
          title: { en: 'LLM-based speech options', de: 'LLM-basierte Sprachoptionen' },
          text: {
            en: 'For live streams, `gpt-realtime-translate` (Realtime API) translates audio continuously and returns speech plus a transcript. For recorded files, Azure LLM Speech runs `task: translate` on the fast transcription endpoint.',
            de: 'Für Live-Streams übersetzt `gpt-realtime-translate` (Realtime API) Audio kontinuierlich und liefert Sprache plus Transkript. Für aufgezeichnete Dateien führt Azure LLM Speech `task: translate` auf dem Fast-Transcription-Endpoint aus.',
          },
          focus: ['e-sin-llm', 'g-llm', 'llm_rt', 'llm_sp'],
        },
      ],
    },
    {
      id: 'speech-synthesis-choice',
      title: { en: 'Turning translations into speech', de: 'Übersetzungen in Sprache verwandeln' },
      caption: {
        en: 'Event-based synthesis is the shortcut for exactly one target language; for several targets you synthesize each translation yourself.',
        de: 'Ereignisbasierte Synthese ist die Abkürzung für genau eine Zielsprache; bei mehreren Zielen synthetisierst du jede Übersetzung selbst.',
      },
      width: 960,
      height: 290,
      nodes: [
        { id: 'n1', x: 20, y: 105, w: 210, h: 70, label: 'TranslationRecognizer', sub: 'recognize_once_async()', tone: 'app' },
        { id: 'n2', x: 280, y: 100, w: 170, h: 80, label: { en: 'One target\nlanguage?', de: 'Nur eine\nZielsprache?' }, tone: 'neutral', shape: 'diamond' },
        { id: 'n3', x: 510, y: 20, w: 240, h: 70, label: { en: 'Event-based synthesis', de: 'Ereignisbasierte Synthese' }, sub: 'voice_name + synthesizing', tone: 'app' },
        { id: 'n4', x: 510, y: 190, w: 240, h: 70, label: { en: 'Manual synthesis', de: 'Manuelle Synthese' }, sub: { en: 'SpeechSynthesizer per language', de: 'SpeechSynthesizer je Sprache' }, tone: 'app' },
        { id: 'n5', x: 800, y: 105, w: 150, h: 70, label: { en: 'Translated audio', de: 'Übersetztes Audio' }, sub: { en: 'file or speaker', de: 'Datei/Lautsprecher' }, tone: 'data' },
      ],
      edges: [
        { id: 'e1', from: 'n1', to: 'n2' },
        { id: 'e2', from: 'n2', to: 'n3', label: { en: 'yes', de: 'ja' } },
        { id: 'e3', from: 'n2', to: 'n4', label: { en: 'no', de: 'nein' } },
        { id: 'e4', from: 'n3', to: 'n5' },
        { id: 'e5', from: 'n4', to: 'n5' },
      ],
      steps: [
        {
          title: { en: 'Recognize and translate', de: 'Erkennen und übersetzen' },
          text: {
            en: '`recognize_once_async().get()` returns a result whose `reason` is `TranslatedSpeech`. `result.text` holds the source transcript, and `result.translations` maps each target code to its text.',
            de: '`recognize_once_async().get()` liefert ein Ergebnis mit `reason` gleich `TranslatedSpeech`. `result.text` enthält das Quelltranskript, und `result.translations` ordnet jedem Zielcode seinen Text zu.',
          },
          focus: ['n1'],
        },
        {
          title: { en: 'How many targets?', de: 'Wie viele Ziele?' },
          text: {
            en: 'The synthesis method depends on how many target languages you added to the configuration.',
            de: 'Die Synthesemethode hängt davon ab, wie viele Zielsprachen du der Konfiguration hinzugefügt hast.',
          },
          focus: ['e1', 'n2'],
        },
        {
          title: { en: 'One target: event-based', de: 'Ein Ziel: ereignisbasiert' },
          text: {
            en: 'Set `voice_name` to a voice in the target language and connect a handler to `synthesizing`. `evt.result.audio` delivers the audio bytes; an empty chunk means synthesis is complete.',
            de: 'Setz `voice_name` auf eine Stimme der Zielsprache und verbinde einen Handler mit `synthesizing`. `evt.result.audio` liefert die Audiobytes; ein leerer Block bedeutet, dass die Synthese fertig ist.',
          },
          focus: ['e2', 'n3', 'e4'],
        },
        {
          title: { en: 'Several targets: manual', de: 'Mehrere Ziele: manuell' },
          text: {
            en: 'Event-based synthesis doesn\'t support multiple targets. Loop over `translations`, set `speech_synthesis_voice_name` on a `SpeechConfig` per language and call `SpeechSynthesizer.speak_text_async()`.',
            de: 'Ereignisbasierte Synthese unterstützt keine mehreren Ziele. Iteriere über `translations`, setz pro Sprache `speech_synthesis_voice_name` auf einer `SpeechConfig` und ruf `SpeechSynthesizer.speak_text_async()` auf.',
          },
          focus: ['e3', 'n4', 'e5'],
        },
        {
          title: { en: 'Audio out', de: 'Audio raus' },
          text: {
            en: 'Write the audio to a file or play it on the speaker. The speech translation price covers up to two target languages; each further language adds text translation charges.',
            de: 'Schreib das Audio in eine Datei oder spiel es über den Lautsprecher ab. Der Preis für Sprachübersetzung deckt bis zu zwei Zielsprachen ab; jede weitere Sprache kostet zusätzlich Textübersetzung.',
          },
          focus: ['n5'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Azure Translator in Foundry Tools',
      text: {
        en: 'Cloud service that translates text and documents; its Languages operation (`get_supported_languages()` in Python) lists the supported languages and needs no authentication. Text calls go to the global endpoint `api.cognitive.microsofttranslator.com` or your resource\'s custom endpoint with `Ocp-Apim-Subscription-Key` (plus `Ocp-Apim-Subscription-Region` for regional resources). Keyless calls send a Microsoft Entra token — on the global endpoint together with `Ocp-Apim-ResourceId` — and need a role such as Cognitive Services User.',
        de: 'Clouddienst, der Text und Dokumente übersetzt; seine Languages-Operation (`get_supported_languages()` in Python) listet die unterstützten Sprachen und braucht keine Authentifizierung. Textaufrufe gehen an den globalen Endpoint `api.cognitive.microsofttranslator.com` oder den Custom Endpoint deiner Ressource, mit `Ocp-Apim-Subscription-Key` (plus `Ocp-Apim-Subscription-Region` bei regionalen Ressourcen). Schlüssellose Aufrufe senden ein Microsoft-Entra-Token – am globalen Endpoint zusammen mit `Ocp-Apim-ResourceId` – und brauchen eine Rolle wie Cognitive Services User.',
      },
    },
    {
      term: 'NMT vs. LLM translation',
      text: {
        en: 'API `2026-06-06` (GA) puts per-target settings into `targets`: `deploymentName` is `general` (NMT, the default), a custom model ID, or your LLM deployment — which requires a Foundry resource and isn\'t available behind a private endpoint. Only LLM translation supports `tone` (formal, informal, neutral), `gender` and adaptive custom translation. NMT is billed per character, LLM per token.',
        de: 'API `2026-06-06` (GA) legt Einstellungen pro Ziel in `targets` ab: `deploymentName` ist `general` (NMT, Standard), eine Custom-Modell-ID oder dein LLM-Deployment – das eine Foundry-Ressource voraussetzt und hinter einem Private Endpoint nicht verfügbar ist. Nur die LLM-Übersetzung unterstützt `tone` (formal, informal, neutral), `gender` und adaptive Custom Translation. NMT wird pro Zeichen abgerechnet, LLM pro Token.',
      },
    },
    {
      term: 'Transliteration',
      text: {
        en: 'Changes the script, not the language — for example Japanese text from `Jpan` to `Latn` characters. Python: `client.transliterate(body=[...], language="ja", from_script="Jpan", to_script="Latn")`.',
        de: 'Ändert die Schrift, nicht die Sprache – etwa japanischen Text von `Jpan`- in `Latn`-Zeichen. Python: `client.transliterate(body=[...], language="ja", from_script="Jpan", to_script="Latn")`.',
      },
    },
    {
      term: 'Document translation',
      text: {
        en: 'Translates whole files while keeping their layout. The synchronous API handles one file and returns it directly without a storage account; asynchronous batch translation processes many or large files in Azure Blob Storage containers authorized by SAS tokens or a managed identity. Both support custom glossaries.',
        de: 'Übersetzt ganze Dateien und behält ihr Layout. Die synchrone API verarbeitet eine Datei und gibt sie direkt zurück, ohne Speicherkonto; die asynchrone Batch-Übersetzung verarbeitet viele oder große Dateien in Azure-Blob-Storage-Containern, autorisiert per SAS-Token oder Managed Identity. Beide unterstützen eigene Glossare.',
      },
    },
    {
      term: 'Custom translation',
      text: {
        en: 'Custom Translator trains NMT models on your parallel sentences for domain terminology; you call them with their category ID (v3.0 `category`, `2026-06-06` `deploymentName`). Adaptive custom translation steers an LLM with up to five `referenceTextPairs` or an `adaptiveDatasetId` built from 5 to 10,000 segment pairs.',
        de: 'Custom Translator trainiert NMT-Modelle auf deinen parallelen Sätzen für Fachterminologie; du rufst sie über ihre Kategorie-ID auf (v3.0 `category`, `2026-06-06` `deploymentName`). Adaptive Custom Translation steuert ein LLM mit bis zu fünf `referenceTextPairs` oder einer `adaptiveDatasetId`, die aus 5 bis 10.000 Segmentpaaren entsteht.',
      },
    },
    {
      term: 'TranslationRecognizer',
      text: {
        en: 'Speech SDK class for speech translation. `SpeechTranslationConfig` sets `speech_recognition_language` (a source locale such as `en-US`) and `add_target_language()` (codes such as `fr`); `result.translations` maps each code to its text. If the input language is unknown, use language identification (up to 10 candidates) or Live Interpreter.',
        de: 'Speech-SDK-Klasse für Sprachübersetzung. `SpeechTranslationConfig` setzt `speech_recognition_language` (ein Quell-Locale wie `en-US`) und `add_target_language()` (Codes wie `fr`); `result.translations` ordnet jedem Code seinen Text zu. Ist die Eingabesprache unbekannt, nutze Sprachenerkennung mit bis zu 10 Kandidaten oder Live Interpreter.',
      },
    },
    {
      term: 'LLM-based speech translation',
      text: {
        en: 'Azure LLM Speech translates recorded audio files: enhanced mode on the fast transcription endpoint with `task` set to `translate` and a `targetLanguage`. GPT Realtime Translate (`gpt-realtime-translate`, Realtime API) translates live audio continuously and returns translated speech plus a transcript.',
        de: 'Azure LLM Speech übersetzt aufgezeichnete Audiodateien: Enhanced Mode auf dem Fast-Transcription-Endpoint mit `task` gleich `translate` und einer `targetLanguage`. GPT Realtime Translate (`gpt-realtime-translate`, Realtime API) übersetzt Live-Audio kontinuierlich und liefert übersetzte Sprache plus Transkript.',
      },
    },
  ],
  comparison: {
    title: { en: 'Which translation option fits?', de: 'Welche Übersetzungsoption passt?' },
    columns: [
      { en: 'Option', de: 'Option' },
      { en: 'Input → output', de: 'Eingabe → Ausgabe' },
      { en: 'Best for', de: 'Ideal für' },
    ],
    rows: [
      ['Translator — NMT (general)', { en: 'Text → text', de: 'Text → Text' }, { en: 'High volume, lowest cost per character, 100+ languages', de: 'Hohe Volumen, niedrigste Kosten pro Zeichen, 100+ Sprachen' }],
      ['Translator — LLM deployment', { en: 'Text → text', de: 'Text → Text' }, { en: 'Tone, gender, adaptive custom translation (Foundry resource)', de: 'Ton, Gender, adaptive Custom Translation (Foundry-Ressource)' }],
      [{ en: 'Document translation', de: 'Dokumentübersetzung' }, { en: 'Files → files', de: 'Dateien → Dateien' }, { en: 'Keep layout; sync for one file, batch via Blob Storage', de: 'Layout behalten; synchron für eine Datei, Batch über Blob Storage' }],
      ['Speech — TranslationRecognizer', { en: 'Audio → text (+ speech)', de: 'Audio → Text (+ Sprache)' }, { en: 'Real-time translation in your app with the Speech SDK', de: 'Echtzeitübersetzung in deiner App mit dem Speech SDK' }],
      ['Speech — Live Interpreter', { en: 'Audio → speech', de: 'Audio → Sprache' }, { en: 'Unknown or switching input languages, natural voice', de: 'Unbekannte oder wechselnde Eingabesprachen, natürliche Stimme' }],
      ['Azure LLM Speech (translate)', { en: 'Audio file → text', de: 'Audiodatei → Text' }, { en: 'Recorded audio with LLM quality', de: 'Aufgezeichnetes Audio in LLM-Qualität' }],
      ['gpt-realtime-translate', { en: 'Live audio → speech + text', de: 'Live-Audio → Sprache + Text' }, { en: 'Continuous, low-latency live streams', de: 'Kontinuierliche Live-Streams mit niedriger Latenz' }],
    ],
  },
  code: [
    {
      title: { en: 'Translator SDK: NMT and an LLM target with formal tone', de: 'Translator SDK: NMT und ein LLM-Ziel mit formellem Ton' },
      code: `from azure.identity import DefaultAzureCredential
from azure.ai.translation.text import TextTranslationClient
from azure.ai.translation.text.models import TranslateInputItem, TranslationTarget

client = TextTranslationClient(
    endpoint="https://<resource>.cognitiveservices.azure.com",
    credential=DefaultAzureCredential(),
)

# NMT (default): source language detected, two targets
result = client.translate(body=["Your order has shipped."], to_language=["de", "ja"])
print(result[0].detected_language.language)
for translation in result[0].translations:
    print(translation.language, translation.text)

# LLM deployment with formal tone (needs a Foundry resource)
item = TranslateInputItem(
    text="Can you send me the signed contract?",
    language="en",
    targets=[TranslationTarget(language="de", deployment_name="<gpt-deployment>", tone="formal")],
)
print(client.translate(body=[item])[0].translations[0].text)`,
      notes: [
        {
          en: '`azure-ai-translation-text` 2.x targets API `2026-06-06`. An endpoint plus a token credential means keyless access through your resource\'s custom endpoint; with a key on the global endpoint you pass `AzureKeyCredential` and `region`.',
          de: '`azure-ai-translation-text` 2.x zielt auf API `2026-06-06`. Endpoint plus Token-Credential heißt schlüsselloser Zugriff über den Custom Endpoint deiner Ressource; mit Key am globalen Endpoint übergibst du `AzureKeyCredential` und `region`.',
        },
        {
          en: '`detected_language` is only returned when you don\'t specify the source language.',
          de: '`detected_language` kommt nur zurück, wenn du die Quellsprache nicht angibst.',
        },
        {
          en: '`TranslationTarget` carries per-target options such as `deployment_name`, `tone` and `gender`.',
          de: '`TranslationTarget` trägt Optionen pro Ziel wie `deployment_name`, `tone` und `gender`.',
        },
      ],
    },
    {
      title: { en: 'Speech SDK: speech-to-speech translation into German', de: 'Speech SDK: Speech-to-Speech-Übersetzung ins Deutsche' },
      code: `import azure.cognitiveservices.speech as speechsdk
from azure.identity import DefaultAzureCredential

config = speechsdk.translation.SpeechTranslationConfig(
    token_credential=DefaultAzureCredential(),
    endpoint="https://<resource>.cognitiveservices.azure.com/",  # custom domain
)
config.speech_recognition_language = "en-US"   # source locale
config.add_target_language("de")               # target language code
config.voice_name = "de-DE-KatjaNeural"        # voice for the translated audio

recognizer = speechsdk.translation.TranslationRecognizer(
    translation_config=config,
    audio_config=speechsdk.audio.AudioConfig(use_default_microphone=True),
)

def save_audio(evt):
    if evt.result.audio:  # an empty chunk means synthesis finished
        with open("translation.wav", "wb") as f:
            f.write(evt.result.audio)

recognizer.synthesizing.connect(save_audio)
result = recognizer.recognize_once_async().get()
if result.reason == speechsdk.ResultReason.TranslatedSpeech:
    print(result.text, "->", result.translations["de"])`,
      notes: [
        {
          en: 'Microsoft Entra authentication needs the custom-domain endpoint and a Speech role assignment; key plus region works for quick tests.',
          de: 'Die Microsoft-Entra-Anmeldung braucht den Endpoint mit Custom Domain und eine Speech-Rollenzuweisung; Key plus Region reicht für schnelle Tests.',
        },
        {
          en: 'The recognition language is a locale (`en-US`); target languages are language codes (`de`).',
          de: 'Die Erkennungssprache ist ein Locale (`en-US`); Zielsprachen sind Sprachcodes (`de`).',
        },
        {
          en: 'Event-based synthesis only works with one target language, and the voice must speak that language.',
          de: 'Ereignisbasierte Synthese funktioniert nur mit einer Zielsprache, und die Stimme muss diese Sprache sprechen.',
        },
      ],
    },
  ],
  traps: [
    {
      en: '`2026-06-06` isn\'t a drop-in upgrade from v3.0: a `targets` array replaces `to`, and Detect, BreakSentence and Dictionary Lookup are gone — use Azure Language for language detection.',
      de: '`2026-06-06` ist kein Drop-in-Upgrade von v3.0: Ein `targets`-Array ersetzt `to`, und Detect, BreakSentence und Dictionary Lookup entfallen – für die Sprachenerkennung nutzt du Azure Language.',
    },
    {
      en: '`tone`, `gender` and adaptive custom translation only apply to LLM translation, which needs a Foundry resource and isn\'t available when the Translator resource uses a private endpoint.',
      de: '`tone`, `gender` und adaptive Custom Translation gelten nur für die LLM-Übersetzung, die eine Foundry-Ressource braucht und nicht verfügbar ist, wenn die Translator-Ressource einen Private Endpoint nutzt.',
    },
    {
      en: 'Event-based synthesis (`voice_name` plus the `synthesizing` event) supports **one** target language; for several targets, synthesize each translation with a `SpeechSynthesizer`.',
      de: 'Ereignisbasierte Synthese (`voice_name` plus Event `synthesizing`) unterstützt **eine** Zielsprache; bei mehreren Zielen synthetisierst du jede Übersetzung mit einem `SpeechSynthesizer`.',
    },
    {
      en: '`speech_recognition_language` takes a locale (`en-US`), while target languages take language codes (`de`, `zh-Hans`). Mixing them up is a classic error.',
      de: '`speech_recognition_language` erwartet ein Locale (`en-US`), Zielsprachen erwarten Sprachcodes (`de`, `zh-Hans`). Beides zu verwechseln ist ein Klassiker.',
    },
    {
      en: 'Batch document translation needs Azure Blob Storage containers; the synchronous single-file API doesn\'t — and the Foundry portal only offers the synchronous variant.',
      de: 'Die Batch-Dokumentübersetzung braucht Azure-Blob-Storage-Container; die synchrone Einzeldatei-API nicht – und das Foundry-Portal bietet nur die synchrone Variante.',
    },
  ],
  takeaways: [
    { en: 'High-volume text → Translator NMT; tone, gender or adaptive needs → Translator with an LLM deployment.', de: 'Text in großen Mengen → Translator NMT; Ton, Gender oder adaptive Anforderungen → Translator mit LLM-Deployment.' },
    { en: 'Files → document translation: sync for one file, async batch with Blob Storage.', de: 'Dateien → Dokumentübersetzung: synchron für eine Datei, asynchroner Batch mit Blob Storage.' },
    { en: 'Live speech in an app → `TranslationRecognizer`; unknown or switching languages → Live Interpreter.', de: 'Live-Sprache in einer App → `TranslationRecognizer`; unbekannte oder wechselnde Sprachen → Live Interpreter.' },
    { en: 'LLM speech translation: Azure LLM Speech for recordings, GPT Realtime Translate for live streams.', de: 'LLM-Sprachübersetzung: Azure LLM Speech für Aufnahmen, GPT Realtime Translate für Live-Streams.' },
  ],
  sources: [
    { title: 'What is Azure text translation?', url: 'https://learn.microsoft.com/en-us/azure/ai-services/translator/text-translation/overview' },
    { title: 'Translate (2026-06-06)', url: 'https://learn.microsoft.com/en-us/azure/ai-services/translator/text-translation/2026-06-06/translate-api' },
    { title: 'What is Azure Translator document translation?', url: 'https://learn.microsoft.com/en-us/azure/ai-services/translator/document-translation/overview' },
    { title: 'How to recognize and translate speech', url: 'https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-translate-speech' },
    { title: 'GPT Realtime Translate overview', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/gpt-realtime-translate' },
  ],
}
