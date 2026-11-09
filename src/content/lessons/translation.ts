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
      height: 490,
      groups: [
        { id: 'g-speech', x: 190, y: 190, w: 600, h: 130, label: 'Azure Speech · TranslationRecognizer', tone: 'foundry' },
        { id: 'g-llm', x: 190, y: 344, w: 600, h: 126, label: { en: 'LLM-based speech translation', de: 'LLM-basierte Sprachübersetzung' }, tone: 'model' },
      ],
      nodes: [
        { id: 't_in', x: 20, y: 54, w: 140, h: 64, label: { en: 'Source text', de: 'Quelltext' }, sub: { en: '+ target languages', de: '+ Zielsprachen' }, icon: 'file', tone: 'data', shape: 'doc' },
        { id: 't_tr', x: 210, y: 54, w: 180, h: 64, label: 'Azure Translator', sub: 'api-version 2026-06-06', icon: 'translator', tone: 'foundry' },
        { id: 'nmt', x: 450, y: 10, w: 210, h: 56, label: { en: 'NMT (default)', de: 'NMT (Standard)' }, sub: 'deploymentName: general', icon: 'translator', tone: 'model' },
        { id: 'llm', x: 450, y: 106, w: 210, h: 56, label: { en: 'LLM deployment', de: 'LLM-Deployment' }, sub: { en: 'tone · gender · adaptive', de: 'Ton · Gender · adaptiv' }, icon: 'translator', tone: 'model' },
        { id: 't_out', x: 720, y: 54, w: 180, h: 64, label: { en: 'Translated text', de: 'Übersetzter Text' }, sub: 'value[].translations', icon: 'file', tone: 'data', shape: 'doc' },
        { id: 's_in', x: 20, y: 230, w: 150, h: 64, label: { en: 'Speaker', de: 'Sprecher:in' }, sub: { en: 'mic or file', de: 'Mikro oder Datei' }, icon: 'users', tone: 'user', shape: 'actor' },
        { id: 'rec', x: 210, y: 230, w: 160, h: 64, label: { en: 'Recognize', de: 'Erkennen' }, sub: { en: 'locale: en-US', de: 'Locale: en-US' }, icon: 'speech', tone: 'foundry' },
        { id: 'trn', x: 420, y: 230, w: 160, h: 64, label: { en: 'Translate', de: 'Übersetzen' }, sub: 'add_target_language', icon: 'translator', tone: 'foundry' },
        { id: 'syn', x: 630, y: 230, w: 140, h: 64, label: { en: 'Synthesize', de: 'Synthetisieren' }, sub: 'voice_name', icon: 'speech', tone: 'foundry' },
        { id: 's_out', x: 830, y: 230, w: 120, h: 64, label: { en: 'Listener', de: 'Zuhörer:in' }, sub: { en: 'audio + text', de: 'Audio + Text' }, icon: 'users', tone: 'user', shape: 'actor' },
        { id: 'llm_sp', x: 210, y: 376, w: 270, h: 56, label: 'Azure LLM Speech', sub: { en: 'task: translate · file → text', de: 'task: translate · Datei → Text' }, icon: 'speech', tone: 'foundry' },
        { id: 'llm_rt', x: 520, y: 376, w: 250, h: 56, label: 'gpt-realtime-translate', sub: { en: 'live audio → speech + text', de: 'Live-Audio → Sprache + Text' }, icon: 'translator', tone: 'model' },
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
        { id: 'e-rt-out', from: 'llm_rt', to: 's_out', dashed: true, via: [[890, 404]] },
        { id: 'e-sp-out', from: 'llm_sp', to: 's_out', dashed: true, via: [[345, 452], [890, 452]] },
      ],
      steps: [
        {
          title: { en: 'Text in, targets out', de: 'Text rein, Ziele raus' },
          text: {
            en: 'You send text plus one or more target languages. In API `2026-06-06` that\'s an `inputs` array whose items carry a `targets` array; if you omit the source `language`, the translate call detects it.',
            de: 'Du schickst Text plus eine oder mehrere Zielsprachen. In API `2026-06-06` ist das ein `inputs`-Array, dessen Einträge ein `targets`-Array tragen; lässt du die Quell-`language` weg, erkennt der Translate-Aufruf sie selbst.',
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
            en: 'Set `deploymentName` to the name of your GPT deployment (any name you chose) to unlock `tone` (formal, informal, neutral), `gender` (female, male, neutral) and adaptive custom translation. This needs a Foundry resource, the resource type that hosts model deployments; it is billed per token and allows 50 texts of up to 5,000 characters.',
            de: 'Setz `deploymentName` auf den Namen deines GPT-Deployments (frei gewählt), um `tone` (formal, informal, neutral), `gender` (female, male, neutral) und adaptive Custom Translation freizuschalten. Das braucht eine Foundry-Ressource, den Ressourcentyp, der Modell-Deployments hostet; abgerechnet wird pro Token, und erlaubt sind 50 Texte à bis zu 5.000 Zeichen.',
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
            en: 'For live streams, `gpt-realtime-translate` on the Realtime API (low-latency audio API over WebSockets, WebRTC or SIP) translates audio continuously and returns translated speech plus a transcript. For recorded files, Azure LLM Speech runs `task: translate` on the fast transcription endpoint and returns translated text.',
            de: 'Für Live-Streams übersetzt `gpt-realtime-translate` über die Realtime API (Audio-API mit niedriger Latenz über WebSockets, WebRTC oder SIP) Audio kontinuierlich und liefert übersetzte Sprache plus Transkript. Für aufgezeichnete Dateien führt Azure LLM Speech `task: translate` auf dem Fast-Transcription-Endpoint aus und liefert übersetzten Text.',
          },
          focus: ['e-sin-llm', 'g-llm', 'llm_rt', 'llm_sp', 'e-rt-out', 'e-sp-out', 's_out'],
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
        { id: 'n1', x: 20, y: 105, w: 210, h: 70, label: 'TranslationRecognizer', sub: 'recognize_once_async()', icon: 'translator', tone: 'app' },
        { id: 'n2', x: 280, y: 100, w: 170, h: 80, label: { en: 'One target\nconfigured?', de: 'Ein Ziel\nkonfiguriert?' }, icon: 'branch', tone: 'neutral', shape: 'diamond' },
        { id: 'n3', x: 540, y: 20, w: 220, h: 70, label: { en: 'Event-based synthesis', de: 'Ereignisbasierte Synthese' }, sub: { en: 'voice_name + synthesizing\naudio during recognition', de: 'voice_name + synthesizing\nAudio während der Erkennung' }, icon: 'speech', tone: 'app' },
        { id: 'n4', x: 540, y: 190, w: 220, h: 70, label: { en: 'Manual synthesis', de: 'Manuelle Synthese' }, sub: { en: 'SpeechSynthesizer per language\nafter recognition', de: 'SpeechSynthesizer je Sprache\nnach der Erkennung' }, icon: 'speech', tone: 'app' },
        { id: 'n5', x: 791, y: 105, w: 168, h: 70, label: { en: 'Translated audio', de: 'Übersetztes Audio' }, sub: { en: 'file or speaker', de: 'Datei/Lautsprecher' }, icon: 'media', tone: 'data' },
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
            en: 'Before calling `recognize_once_async()`, set `voice_name` to a voice in the target language and connect a handler to `synthesizing`. The audio then arrives during recognition, possibly in several events: save each non-empty `evt.result.audio` (for example to its own file); an empty one means synthesis is complete.',
            de: 'Setz vor dem Aufruf von `recognize_once_async()` `voice_name` auf eine Stimme der Zielsprache und verbinde einen Handler mit `synthesizing`. Das Audio kommt dann während der Erkennung, eventuell in mehreren Events: Speichere jedes nicht leere `evt.result.audio` (etwa in einer eigenen Datei); ein leeres bedeutet, dass die Synthese fertig ist.',
          },
          focus: ['e2', 'n3', 'e4'],
        },
        {
          title: { en: 'Several targets: manual', de: 'Mehrere Ziele: manuell' },
          text: {
            en: 'Event-based synthesis doesn\'t support multiple targets. After recognition, loop over `translations`, set `speech_synthesis_voice_name` on a `SpeechConfig` per language and call `SpeechSynthesizer.speak_text_async()`.',
            de: 'Ereignisbasierte Synthese unterstützt keine mehreren Ziele. Iteriere nach der Erkennung über `translations`, setz pro Sprache `speech_synthesis_voice_name` auf einer `SpeechConfig` und ruf `SpeechSynthesizer.speak_text_async()` auf.',
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
        en: 'Cloud translation for text and documents, available through a Translator resource (NMT and Custom Translator; region *Global* or one Azure region — a *regional resource*) or a Foundry resource, which can also host the LLM deployments that LLM translation needs. Text calls go to the global endpoint `api.cognitive.microsofttranslator.com` or your custom-domain endpoint `https://<resource>.cognitiveservices.azure.com` (see the authentication sample below). The Languages operation (`get_supported_languages()` in Python) needs no authentication.',
        de: 'Clouddienst für die Übersetzung von Text und Dokumenten, verfügbar über eine Translator-Ressource (NMT und Custom Translator; Region *Global* oder eine Azure-Region – eine *regionale Ressource*) oder über eine Foundry-Ressource, die zusätzlich die LLM-Deployments für die LLM-Übersetzung hosten kann. Textaufrufe gehen an den globalen Endpoint `api.cognitive.microsofttranslator.com` oder an deinen Custom-Domain-Endpoint `https://<resource>.cognitiveservices.azure.com` (siehe Authentifizierungsbeispiel unten). Die Languages-Operation (`get_supported_languages()` in Python) braucht keine Authentifizierung.',
      },
    },
    {
      term: 'NMT vs. LLM translation',
      text: {
        en: 'API `2026-06-06` (GA) puts per-target settings into `targets`: `deploymentName` is `general` (NMT, the default), a custom model ID, or your LLM deployment — which requires a Foundry resource and isn\'t available behind a private endpoint. Only LLM translation supports `tone` (formal, informal, neutral), `gender` (female, male, neutral — it picks gendered word forms, for example *la doctora* vs. *el doctor*) and adaptive custom translation. NMT is billed per character, LLM per token.',
        de: 'API `2026-06-06` (GA) legt Einstellungen pro Ziel in `targets` ab: `deploymentName` ist `general` (NMT, Standard), eine Custom-Modell-ID oder dein LLM-Deployment – das eine Foundry-Ressource voraussetzt und hinter einem Private Endpoint nicht verfügbar ist. Nur die LLM-Übersetzung unterstützt `tone` (formal, informal, neutral), `gender` (female, male, neutral – wählt geschlechtsspezifische Wortformen, etwa *la doctora* vs. *el doctor*) und adaptive Custom Translation. NMT wird pro Zeichen abgerechnet, LLM pro Token.',
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
        en: 'Speech SDK class for speech translation. `SpeechTranslationConfig` sets `speech_recognition_language` (a source locale such as `en-US`) and `add_target_language()` (codes such as `fr`); `result.translations` maps each code to its text.',
        de: 'Speech-SDK-Klasse für Sprachübersetzung. `SpeechTranslationConfig` setzt `speech_recognition_language` (ein Quell-Locale wie `en-US`) und `add_target_language()` (Codes wie `fr`); `result.translations` ordnet jedem Code seinen Text zu.',
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
      { en: 'How you call it', de: 'Wie du es aufrufst' },
      { en: 'Output', de: 'Ausgabe' },
      { en: 'Choose it when', de: 'Wähle es, wenn' },
    ],
    rows: [
      ['Translator — NMT (general)', { en: 'REST or `TextTranslationClient`', de: 'REST oder `TextTranslationClient`' }, { en: 'Text', de: 'Text' }, { en: 'High volume at the lowest cost per character', de: 'Hohe Volumen zu den niedrigsten Kosten pro Zeichen' }],
      ['Translator — LLM deployment', { en: 'Same call, `deploymentName` = your deployment (Foundry resource)', de: 'Gleicher Aufruf, `deploymentName` = dein Deployment (Foundry-Ressource)' }, { en: 'Text', de: 'Text' }, { en: 'You need tone, gender or adaptive custom translation', de: 'Du Ton, Gender oder adaptive Custom Translation brauchst' }],
      [{ en: 'Document translation', de: 'Dokumentübersetzung' }, { en: 'REST, `SingleDocumentTranslationClient` or `DocumentTranslationClient`', de: 'REST, `SingleDocumentTranslationClient` oder `DocumentTranslationClient`' }, { en: 'Files with layout kept', de: 'Dateien mit erhaltenem Layout' }, { en: 'Sync for one file without storage; batch for many or large files in Blob Storage', de: 'Synchron für eine Datei ohne Speicher; Batch für viele oder große Dateien in Blob Storage' }],
      ['Speech — TranslationRecognizer', { en: 'Speech SDK; source locale or up to 10 candidate languages', de: 'Speech SDK; Quell-Locale oder bis zu 10 Kandidatensprachen' }, { en: 'Text, optionally speech in a prebuilt voice', de: 'Text, optional Sprache mit einer Standardstimme' }, { en: 'Your app translates speech in real time and knows the likely input languages', de: 'Deine App Sprache in Echtzeit übersetzt und die wahrscheinlichen Eingabesprachen kennt' }],
      ['Speech — Live Interpreter', { en: 'Same `TranslationRecognizer` with an empty `AutoDetectSourceLanguageConfig()` on the universal v2 endpoint', de: 'Gleicher `TranslationRecognizer` mit leerer `AutoDetectSourceLanguageConfig()` am Universal-v2-Endpoint' }, { en: 'Speech in a natural voice that keeps the speaker\'s style (+ text)', de: 'Sprache mit natürlicher Stimme, die den Stil der Sprechenden bewahrt (+ Text)' }, { en: 'Input languages are unknown or switch mid-conversation', de: 'Eingabesprachen unbekannt sind oder im Gespräch wechseln' }],
      ['Azure LLM Speech (translate)', { en: 'Fast transcription REST or `azure-ai-transcription`, `task` = `translate`', de: 'Fast-Transcription-REST oder `azure-ai-transcription`, `task` = `translate`' }, { en: 'Text from a recorded file', de: 'Text aus einer aufgezeichneten Datei' }, { en: 'Recorded audio needs LLM-quality translation, not real time', de: 'Aufgezeichnetes Audio LLM-Qualität braucht, aber keine Echtzeit' }],
      ['gpt-realtime-translate', { en: 'Realtime API with your Foundry model deployment', de: 'Realtime API mit deinem Foundry-Modell-Deployment' }, { en: 'Translated speech + transcript, continuously', de: 'Übersetzte Sprache + Transkript, kontinuierlich' }, { en: 'A live stream must be translated by an LLM with minimal delay', de: 'Ein Live-Stream mit minimaler Verzögerung von einem LLM übersetzt werden soll' }],
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
          en: '`azure-ai-translation-text` 2.x targets API `2026-06-06`. For plain strings, `to_language` is an SDK shortcut; per-target options go into `TranslationTarget` objects — the shape of the REST `targets` array.',
          de: '`azure-ai-translation-text` 2.x zielt auf API `2026-06-06`. Für einfache Strings ist `to_language` eine SDK-Abkürzung; Optionen pro Ziel gehören in `TranslationTarget`-Objekte – die Form des REST-Arrays `targets`.',
        },
        {
          en: '`detected_language` is only returned when you don\'t specify the source language.',
          de: '`detected_language` kommt nur zurück, wenn du die Quellsprache nicht angibst.',
        },
        {
          en: '`deployment_name` is the name you gave your LLM deployment (any name you chose); `general` would select NMT.',
          de: '`deployment_name` ist der Name, den du deinem LLM-Deployment gegeben hast (frei gewählt); `general` würde NMT auswählen.',
        },
      ],
    },
    {
      title: { en: 'Speech SDK: speech-to-speech translation of one utterance into German', de: 'Speech SDK: Speech-to-Speech-Übersetzung einer Äußerung ins Deutsche' },
      code: `import azure.cognitiveservices.speech as speechsdk
from azure.identity import DefaultAzureCredential

config = speechsdk.translation.SpeechTranslationConfig(
    token_credential=DefaultAzureCredential(),
    endpoint="https://<resource>.cognitiveservices.azure.com/",  # custom-domain endpoint
)
config.speech_recognition_language = "en-US"   # source locale
config.add_target_language("de")               # target language code
config.voice_name = "de-DE-KatjaNeural"        # voice for the translated audio

recognizer = speechsdk.translation.TranslationRecognizer(
    translation_config=config,
    audio_config=speechsdk.audio.AudioConfig(use_default_microphone=True),
)
parts = []

def save_audio(evt):
    if evt.result.audio:  # an empty result marks the end of synthesis
        parts.append(evt.result.audio)
        with open(f"translation-{len(parts)}.wav", "wb") as f:
            f.write(evt.result.audio)

recognizer.synthesizing.connect(save_audio)
result = recognizer.recognize_once_async().get()
if result.reason == speechsdk.ResultReason.TranslatedSpeech:
    print(result.text, "->", result.translations["de"])`,
      notes: [
        {
          en: 'Microsoft Entra ID needs the custom-domain endpoint plus the **Cognitive Services Speech User** (or Speech Contributor) role; key plus region works for quick tests.',
          de: 'Microsoft Entra ID braucht den Custom-Domain-Endpoint plus die Rolle **Cognitive Services Speech User** (oder Speech Contributor); Key plus Region reicht für schnelle Tests.',
        },
        {
          en: '`recognize_once_async()` handles one utterance; for an ongoing conversation use `start_continuous_recognition()` with the `recognized` event.',
          de: '`recognize_once_async()` verarbeitet eine Äußerung; für ein laufendes Gespräch nutzt du `start_continuous_recognition()` mit dem Event `recognized`.',
        },
        {
          en: 'Event-based synthesis needs exactly one target language and a voice of that language; each non-empty result goes to its own file, as in the Live Interpreter sample on Learn.',
          de: 'Ereignisbasierte Synthese braucht genau eine Zielsprache und eine Stimme dieser Sprache; jedes nicht leere Ergebnis landet in einer eigenen Datei, wie im Live-Interpreter-Beispiel auf Learn.',
        },
      ],
    },
    {
      title: { en: 'Four ways to authenticate TextTranslationClient', de: 'Vier Wege, TextTranslationClient zu authentifizieren' },
      code: `from azure.core.credentials import AzureKeyCredential
from azure.identity import DefaultAzureCredential
from azure.ai.translation.text import TextTranslationClient

key, token, region = AzureKeyCredential("<key>"), DefaultAzureCredential(), "westeurope"
resource_id = "/subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.CognitiveServices/accounts/<resource>"
custom = "https://<resource>.cognitiveservices.azure.com"  # custom-domain endpoint

global_key = TextTranslationClient(credential=key, region=region)
global_entra = TextTranslationClient(credential=token, resource_id=resource_id, region=region)
custom_key = TextTranslationClient(endpoint=custom, credential=key, region=region)
custom_entra = TextTranslationClient(endpoint=custom, credential=token)`,
      notes: [
        {
          en: 'Without `endpoint`, the client calls the global endpoint `api.cognitive.microsofttranslator.com`. In REST, a key goes into `Ocp-Apim-Subscription-Key` and an Entra token into the `Authorization` header; on the global endpoint, Entra calls also send `Ocp-Apim-ResourceId` (from the resource\'s **Properties** page).',
          de: 'Ohne `endpoint` ruft der Client den globalen Endpoint `api.cognitive.microsofttranslator.com` auf. Per REST steht ein Key im Header `Ocp-Apim-Subscription-Key` und ein Entra-Token im Header `Authorization`; am globalen Endpoint senden Entra-Aufrufe zusätzlich `Ocp-Apim-ResourceId` (von der Seite **Properties** der Ressource).',
        },
        {
          en: '`region` (header `Ocp-Apim-Subscription-Region`) is your resource\'s Azure region. The SDK needs it with a key; with Entra ID on the global endpoint you add it for a regional resource — one created in a specific region instead of *Global*.',
          de: '`region` (Header `Ocp-Apim-Subscription-Region`) ist die Azure-Region deiner Ressource. Das SDK braucht sie mit Key; mit Entra ID am globalen Endpoint gibst du sie bei einer regionalen Ressource an – einer, die in einer bestimmten Region statt *Global* angelegt ist.',
        },
        {
          en: 'Entra ID needs a role such as **Cognitive Services User** on the resource. If the resource only allows selected networks, only the custom-domain endpoint works.',
          de: 'Entra ID braucht eine Rolle wie **Cognitive Services User** auf der Ressource. Erlaubt die Ressource nur ausgewählte Netzwerke, funktioniert nur der Custom-Domain-Endpoint.',
        },
      ],
    },
  ],
  traps: [
    {
      en: '`2026-06-06` isn\'t a drop-in upgrade from v3.0: a `targets` array replaces `to`, and the separate Detect, BreakSentence and Dictionary Lookup operations are gone — detect languages with Azure Language (the translate call itself still auto-detects its source).',
      de: '`2026-06-06` ist kein Drop-in-Upgrade von v3.0: Ein `targets`-Array ersetzt `to`, und die separaten Operationen Detect, BreakSentence und Dictionary Lookup entfallen – Sprachen erkennst du mit Azure Language (der Translate-Aufruf selbst erkennt seine Quellsprache weiterhin).',
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
    { en: 'Keyless Translator: Entra token + Cognitive Services User; custom-domain endpoint → token only, global endpoint → plus resource ID (and region if regional).', de: 'Schlüsselloser Translator: Entra-Token + Cognitive Services User; Custom-Domain-Endpoint → nur Token, globaler Endpoint → plus Ressourcen-ID (und Region, wenn regional).' },
  ],
  sources: [
    { title: 'What is Azure text translation?', url: 'https://learn.microsoft.com/en-us/azure/ai-services/translator/text-translation/overview' },
    { title: 'Translate (2026-06-06)', url: 'https://learn.microsoft.com/en-us/azure/ai-services/translator/text-translation/2026-06-06/translate-api' },
    { title: 'Translator: authentication and authorization', url: 'https://learn.microsoft.com/en-us/azure/ai-services/translator/text-translation/reference/authentication' },
    { title: 'How to recognize and translate speech', url: 'https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-translate-speech' },
    { title: 'GPT Realtime Translate overview', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/gpt-realtime-translate' },
  ],
}
