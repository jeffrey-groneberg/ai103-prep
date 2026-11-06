import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'speech-service',
  summary: {
    en: 'Azure Speech in Foundry Tools is the dedicated speech service that comes with your Foundry resource. It converts **speech to text** (real-time, fast or batch), **text to speech** (neural, HD and custom voices) and lets you improve recognition for your domain with **custom speech**. In Python you use the Speech SDK (`azure-cognitiveservices-speech`) in a fixed pattern: a `SpeechConfig` holds the connection and settings, an `AudioConfig` picks the microphone, a file or the speaker, and a `SpeechRecognizer` or `SpeechSynthesizer` does the work. When plain text is not enough, **SSML** gives you control over voice, speaking style, pauses and pronunciation.',
    de: 'Azure Speech in Foundry Tools ist der spezialisierte Sprachdienst, der zu deiner Foundry-Ressource gehört. Er wandelt **Sprache in Text** um (Echtzeit, schnell oder Batch), **Text in Sprache** (neuronale, HD- und Custom-Stimmen) und lässt dich die Erkennung mit **Custom Speech** an deine Fachdomäne anpassen. In Python nutzt du das Speech SDK (`azure-cognitiveservices-speech`) nach einem festen Muster: Eine `SpeechConfig` enthält Verbindung und Einstellungen, eine `AudioConfig` wählt Mikrofon, Datei oder Lautsprecher, und ein `SpeechRecognizer` oder `SpeechSynthesizer` erledigt die Arbeit. Reicht Klartext nicht aus, gibt dir **SSML** Kontrolle über Stimme, Sprechstil, Pausen und Aussprache.',
  },
  examFocus: {
    en: 'Expect code fragments with `SpeechConfig`, `AudioConfig` / `AudioOutputConfig`, `SpeechRecognizer.recognize_once_async()` vs continuous recognition, `SpeechSynthesizer.speak_text_async()` / `speak_ssml_async()` and `ResultReason` values; voice names and output formats; SSML elements (`voice`, `mstts:express-as`, `prosody`, `break`, `say-as`); and custom speech decisions — which training data fixes which problem and when a deployed endpoint (`endpoint_id`) is needed.',
    de: 'Rechne mit Codefragmenten zu `SpeechConfig`, `AudioConfig` / `AudioOutputConfig`, `SpeechRecognizer.recognize_once_async()` vs. kontinuierlicher Erkennung, `SpeechSynthesizer.speak_text_async()` / `speak_ssml_async()` und `ResultReason`-Werten; mit Stimmnamen und Ausgabeformaten; mit SSML-Elementen (`voice`, `mstts:express-as`, `prosody`, `break`, `say-as`); und mit Custom-Speech-Entscheidungen – welche Trainingsdaten welches Problem lösen und wann ein bereitgestellter Endpoint (`endpoint_id`) nötig ist.',
  },
  diagrams: [
    {
      id: 'speech-sdk-pipelines',
      title: { en: 'Speech SDK: two pipelines around one SpeechConfig', de: 'Speech SDK: zwei Pipelines rund um eine SpeechConfig' },
      caption: {
        en: 'Recognition (top) and synthesis (bottom) share one SpeechConfig. A custom speech model plugs into recognition through its endpoint ID.',
        de: 'Erkennung (oben) und Synthese (unten) teilen sich eine SpeechConfig. Ein Custom-Speech-Modell hängt sich über seine Endpoint-ID in die Erkennung ein.',
      },
      width: 960,
      height: 430,
      groups: [
        { id: 'g-app', x: 10, y: 20, w: 480, h: 390, label: { en: 'Your app (Speech SDK)', de: 'Deine App (Speech SDK)' }, tone: 'app' },
        { id: 'g-res', x: 540, y: 20, w: 410, h: 390, label: { en: 'Foundry resource · Azure Speech', de: 'Foundry-Ressource · Azure Speech' }, tone: 'foundry' },
      ],
      nodes: [
        { id: 'a1', x: 30, y: 60, w: 190, h: 64, label: 'AudioConfig', sub: { en: 'microphone or WAV file', de: 'Mikrofon oder WAV-Datei' }, tone: 'app' },
        { id: 'a2', x: 280, y: 60, w: 190, h: 64, label: 'SpeechRecognizer', sub: 'recognize_once_async()', tone: 'app' },
        { id: 'a6', x: 30, y: 190, w: 190, h: 64, label: 'AudioOutputConfig', sub: { en: 'speaker, file or None', de: 'Lautsprecher, Datei, None' }, tone: 'app' },
        { id: 'a3', x: 280, y: 190, w: 190, h: 64, label: 'SpeechConfig', sub: { en: 'endpoint + key or token', de: 'Endpoint + Key oder Token' }, tone: 'app' },
        { id: 'a4', x: 30, y: 320, w: 190, h: 64, label: { en: 'SSML or plain text', de: 'SSML oder Klartext' }, sub: '<speak><voice>…</voice>', tone: 'app', shape: 'doc' },
        { id: 'a5', x: 280, y: 320, w: 190, h: 64, label: 'SpeechSynthesizer', sub: 'speak_ssml_async()', tone: 'app' },
        { id: 'f1', x: 570, y: 60, w: 360, h: 64, label: { en: 'Speech to text', de: 'Speech to Text' }, sub: { en: 'real-time · fast · batch', de: 'Echtzeit · schnell · Batch' }, tone: 'foundry' },
        { id: 'f3', x: 570, y: 190, w: 360, h: 64, label: { en: 'Custom speech model', de: 'Custom-Speech-Modell' }, sub: { en: 'your data · WER · endpoint', de: 'eigene Daten · WER · Endpoint' }, tone: 'model', shape: 'store' },
        { id: 'f2', x: 570, y: 320, w: 360, h: 64, label: { en: 'Text to speech', de: 'Text to Speech' }, sub: { en: 'neural · HD · custom voices', de: 'Neural · HD · Custom Voice' }, tone: 'foundry' },
      ],
      edges: [
        { id: 's1', from: 'a1', to: 'a2' },
        { id: 's2', from: 'a2', to: 'f1', label: { en: 'audio → text', de: 'Audio → Text' }, bidir: true },
        { id: 's3', from: 'a3', to: 'a2' },
        { id: 's4', from: 'a3', to: 'a5' },
        { id: 's5', from: 'a3', to: 'f3', label: 'endpoint_id' },
        { id: 's6', from: 'f3', to: 'f1', label: { en: 'replaces base', de: 'ersetzt Basis' }, dashed: true },
        { id: 's7', from: 'a4', to: 'a5' },
        { id: 's8', from: 'a5', to: 'f2', label: { en: 'SSML → audio', de: 'SSML → Audio' }, bidir: true },
        { id: 's9', from: 'a5', to: 'a6', label: { en: 'audio out', de: 'Audio raus' } },
      ],
      steps: [
        {
          title: { en: 'One resource, two directions', de: 'Eine Ressource, zwei Richtungen' },
          text: {
            en: 'Azure Speech in Foundry Tools comes with your Foundry resource. **Speech to text** turns audio into text (real-time, fast or batch); **text to speech** turns text or SSML into audio with neural, HD or custom voices.',
            de: 'Azure Speech in Foundry Tools gehört zu deiner Foundry-Ressource. **Speech to Text** macht aus Audio Text (Echtzeit, schnell oder Batch); **Text to Speech** macht aus Text oder SSML Audio – mit neuronalen, HD- oder Custom-Stimmen.',
          },
          focus: ['g-res', 'f1', 'f2'],
        },
        {
          title: { en: 'SpeechConfig comes first', de: 'Zuerst die SpeechConfig' },
          text: {
            en: '`SpeechConfig` holds the connection — the resource endpoint plus a key, or a Microsoft Entra token credential with a custom-domain endpoint — and settings such as `speech_recognition_language`, `speech_synthesis_voice_name` and the output format.',
            de: '`SpeechConfig` enthält die Verbindung – den Ressourcen-Endpoint plus Key oder eine Microsoft-Entra-Token-Anmeldung mit Custom-Domain-Endpoint – und Einstellungen wie `speech_recognition_language`, `speech_synthesis_voice_name` und das Ausgabeformat.',
          },
          focus: ['a3', 's3', 's4'],
        },
        {
          title: { en: 'Recognize speech', de: 'Sprache erkennen' },
          text: {
            en: '`AudioConfig` picks the input (default microphone or a file). `recognize_once_async()` returns one utterance — it ends at silence or after 15 seconds; use continuous recognition for longer audio. Check `result.reason` for `RecognizedSpeech`.',
            de: '`AudioConfig` wählt die Eingabe (Standardmikrofon oder Datei). `recognize_once_async()` liefert eine Äußerung – Schluss ist bei Stille oder nach 15 Sekunden; für längeres Audio nutzt du die kontinuierliche Erkennung. Prüfe `result.reason` auf `RecognizedSpeech`.',
          },
          focus: ['a1', 's1', 'a2', 's2', 'f1'],
        },
        {
          title: { en: 'Plug in custom speech', de: 'Custom Speech einbinden' },
          text: {
            en: 'A custom speech model augments the base model with your vocabulary or acoustics. After you deploy it to an endpoint, set `speech_config.endpoint_id`, and recognition uses your model instead of the base model.',
            de: 'Ein Custom-Speech-Modell erweitert das Basismodell um dein Vokabular oder deine Akustik. Nach dem Deployment auf einen Endpoint setzt du `speech_config.endpoint_id`, und die Erkennung nutzt dein Modell statt des Basismodells.',
          },
          focus: ['f3', 's5', 's6'],
        },
        {
          title: { en: 'Synthesize speech', de: 'Sprache synthetisieren' },
          text: {
            en: '`speak_text_async()` reads plain text with the configured voice; `speak_ssml_async()` takes SSML for styles, pauses and pronunciation. `AudioOutputConfig` sends audio to the speaker or a file — or pass `None` to keep the bytes in memory.',
            de: '`speak_text_async()` liest Klartext mit der eingestellten Stimme vor; `speak_ssml_async()` nimmt SSML für Stile, Pausen und Aussprache. `AudioOutputConfig` schickt Audio an Lautsprecher oder Datei – oder übergib `None`, um die Bytes im Speicher zu behalten.',
          },
          focus: ['a4', 's7', 'a5', 's8', 'f2', 's9', 'a6'],
        },
      ],
    },
    {
      id: 'ssml-anatomy',
      title: { en: 'Anatomy of an SSML document', de: 'Aufbau eines SSML-Dokuments' },
      caption: {
        en: 'speak is the root, voice picks the speaker, and the elements inside shape how the text is spoken.',
        de: 'speak ist die Wurzel, voice wählt die Stimme, und die Elemente darin formen, wie der Text gesprochen wird.',
      },
      width: 960,
      height: 330,
      groups: [
        { id: 'g-speak', x: 10, y: 15, w: 940, h: 300, label: '<speak version="1.0" xmlns="…/synthesis" xml:lang="en-US">', tone: 'neutral' },
        { id: 'g-voice', x: 30, y: 55, w: 900, h: 245, label: '<voice name="en-US-JennyNeural">', tone: 'app' },
      ],
      nodes: [
        { id: 'x1', x: 50, y: 95, w: 260, h: 64, label: 'mstts:express-as', sub: 'style="cheerful"', tone: 'app' },
        { id: 'x2', x: 350, y: 95, w: 260, h: 64, label: 'prosody', sub: 'rate="-10%" pitch="+5%"', tone: 'app' },
        { id: 'x3', x: 650, y: 95, w: 260, h: 64, label: 'break', sub: 'time="500ms"', tone: 'app' },
        { id: 'x4', x: 50, y: 205, w: 260, h: 64, label: 'say-as', sub: 'interpret-as="date"', tone: 'app' },
        { id: 'x5', x: 350, y: 205, w: 260, h: 64, label: 'phoneme', sub: 'alphabet="ipa" ph="…"', tone: 'app' },
        { id: 'x6', x: 650, y: 205, w: 260, h: 64, label: 'audio', sub: 'src="https://…/chime.wav"', tone: 'app' },
      ],
      edges: [],
      steps: [
        {
          title: { en: 'The root element', de: 'Das Wurzelelement' },
          text: {
            en: 'Every SSML document starts with `speak`: `version="1.0"`, the W3C `xmlns` and a required `xml:lang`. Add `xmlns:mstts` to use Microsoft extensions such as `mstts:express-as`.',
            de: 'Jedes SSML-Dokument beginnt mit `speak`: `version="1.0"`, dem W3C-`xmlns` und dem Pflichtattribut `xml:lang`. Ergänze `xmlns:mstts`, um Microsoft-Erweiterungen wie `mstts:express-as` zu nutzen.',
          },
          focus: ['g-speak'],
        },
        {
          title: { en: 'Choose the voice', de: 'Die Stimme wählen' },
          text: {
            en: '`speak` must contain at least one `voice`; its `name` picks the voice. Several `voice` elements in one document create a dialog between voices.',
            de: '`speak` muss mindestens ein `voice`-Element enthalten; dessen `name` wählt die Stimme. Mehrere `voice`-Elemente in einem Dokument ergeben einen Dialog zwischen Stimmen.',
          },
          focus: ['g-voice'],
        },
        {
          title: { en: 'Style and delivery', de: 'Stil und Vortrag' },
          text: {
            en: '`mstts:express-as` applies a speaking style such as cheerful or customerservice — only for voices that support it (`styledegree` 0.01–2 scales it). `prosody` adjusts rate, pitch and volume.',
            de: '`mstts:express-as` setzt einen Sprechstil wie cheerful oder customerservice – nur bei Stimmen, die ihn unterstützen (`styledegree` 0,01–2 skaliert ihn). `prosody` ändert Tempo, Tonhöhe und Lautstärke.',
          },
          focus: ['x1', 'x2'],
        },
        {
          title: { en: 'Pauses and reading rules', de: 'Pausen und Leseregeln' },
          text: {
            en: '`break` inserts a pause by `strength` (x-weak … x-strong) or `time` (up to 20,000 ms). `say-as` tells the engine to read text as a date, time, number, telephone number or single characters.',
            de: '`break` fügt eine Pause per `strength` (x-weak … x-strong) oder `time` (bis 20.000 ms) ein. `say-as` sagt der Engine, Text als Datum, Uhrzeit, Zahl, Telefonnummer oder einzelne Zeichen zu lesen.',
          },
          focus: ['x3', 'x4'],
        },
        {
          title: { en: 'Pronunciation and audio', de: 'Aussprache und Audio' },
          text: {
            en: '`phoneme` spells a pronunciation phonetically (for example in IPA); `audio` inserts a recorded clip. Escape `&`, `<` and `>` in text, and remember that HD voices don’t support every element.',
            de: '`phoneme` gibt eine Aussprache phonetisch vor (zum Beispiel in IPA); `audio` fügt einen aufgenommenen Clip ein. Maskiere `&`, `<` und `>` im Text – und denk daran, dass HD-Stimmen nicht jedes Element unterstützen.',
          },
          focus: ['x5', 'x6'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'SpeechConfig',
      text: {
        en: 'The starting object of the Speech SDK (`azure-cognitiveservices-speech`). It holds the endpoint (or region) with a key or an Entra token credential, plus settings such as `speech_recognition_language`, `speech_synthesis_voice_name`, the synthesis output format and `endpoint_id` for a custom model.',
        de: 'Das Startobjekt des Speech SDK (`azure-cognitiveservices-speech`). Es enthält den Endpoint (oder die Region) mit Key oder Entra-Token-Anmeldung sowie Einstellungen wie `speech_recognition_language`, `speech_synthesis_voice_name`, das Ausgabeformat der Synthese und `endpoint_id` für ein Custom-Modell.',
      },
    },
    {
      term: 'AudioConfig and AudioOutputConfig',
      text: {
        en: '`AudioConfig` sets the input (default microphone, or `filename=`). `AudioOutputConfig` sets where synthesized audio goes (default speaker or a file); passing `audio_config=None` to the synthesizer keeps the audio in the result so you can save it with `AudioDataStream`.',
        de: '`AudioConfig` legt die Eingabe fest (Standardmikrofon oder `filename=`). `AudioOutputConfig` legt fest, wohin synthetisiertes Audio geht (Standardlautsprecher oder Datei); mit `audio_config=None` bleibt das Audio im Ergebnis, und du speicherst es mit `AudioDataStream`.',
      },
    },
    {
      term: 'Real-time, fast and batch transcription',
      text: {
        en: 'Real-time recognition streams audio through the Speech SDK with interim results. The fast transcription API returns a transcript synchronously for files under 2 hours and 300 MB. Batch transcription processes large volumes asynchronously and writes results to storage.',
        de: 'Die Echtzeiterkennung streamt Audio über das Speech SDK und liefert Zwischenergebnisse. Die Fast-Transcription-API liefert synchron ein Transkript für Dateien unter 2 Stunden und 300 MB. Die Batch-Transkription verarbeitet große Mengen asynchron und schreibt die Ergebnisse in einen Storage.',
      },
    },
    {
      term: 'Neural and HD voices',
      text: {
        en: 'Voice names combine locale and name, such as `en-US-JennyNeural`. HD voices such as `en-US-Ava:DragonHDLatestNeural` are LLM-based, pick up emotional cues from the text and accept a `temperature`. Custom voice (professional or personal voice) requires approved limited access.',
        de: 'Stimmnamen kombinieren Gebietsschema und Namen, etwa `en-US-JennyNeural`. HD-Stimmen wie `en-US-Ava:DragonHDLatestNeural` basieren auf LLMs, erkennen emotionale Hinweise im Text und akzeptieren eine `temperature`. Custom Voice (Professional oder Personal Voice) erfordert einen genehmigten eingeschränkten Zugang.',
      },
    },
    {
      term: 'SSML',
      text: {
        en: 'Speech Synthesis Markup Language is XML for fine control over synthesis: `speak` (with `xml:lang`), `voice`, `mstts:express-as`, `prosody`, `break`, `say-as`, `phoneme` and `audio`. You send it with `speak_ssml_async()`.',
        de: 'Speech Synthesis Markup Language ist XML zur Feinsteuerung der Synthese: `speak` (mit `xml:lang`), `voice`, `mstts:express-as`, `prosody`, `break`, `say-as`, `phoneme` und `audio`. Du sendest es mit `speak_ssml_async()`.',
      },
    },
    {
      term: 'Custom speech',
      text: {
        en: 'Fine-tune a base speech-to-text model for one locale with your own data: plain or structured text for vocabulary, pronunciation data for unusual words, audio with human-labeled transcripts for accents and noise. Measure the word error rate (WER), then deploy the model to a custom endpoint.',
        de: 'Ein Basismodell für Speech to Text wird für ein Gebietsschema mit eigenen Daten feinabgestimmt: Klartext oder strukturierter Text für Vokabular, Aussprachedaten für ungewöhnliche Wörter, Audio mit menschlich erstellten Transkripten für Akzente und Störgeräusche. Du misst die Wortfehlerrate (WER) und stellst das Modell dann auf einem Custom-Endpoint bereit.',
      },
    },
    {
      term: 'Keyless access to Speech',
      text: {
        en: 'For Microsoft Entra ID, the resource needs a custom-domain endpoint (`https://<name>.cognitiveservices.azure.com`) and your identity needs a data-plane role: the Speech docs recommend **Cognitive Services Speech User** or **Cognitive Services Speech Contributor** (Foundry User also covers Speech). Generic Owner or Contributor roles don’t grant access to the speech APIs. Pass `token_credential` and `endpoint` to `SpeechConfig`.',
        de: 'Für Microsoft Entra ID braucht die Ressource einen Custom-Domain-Endpoint (`https://<name>.cognitiveservices.azure.com`) und deine Identität eine Data-Plane-Rolle: Die Speech-Doku empfiehlt **Cognitive Services Speech User** oder **Cognitive Services Speech Contributor** (auch Foundry User deckt Speech ab). Die allgemeinen Rollen Owner oder Contributor geben keinen Zugriff auf die Speech-APIs. Übergib `token_credential` und `endpoint` an `SpeechConfig`.',
      },
    },
  ],
  comparison: {
    title: { en: 'Which transcription option?', de: 'Welche Transkriptionsoption?' },
    columns: [
      { en: 'Option', de: 'Option' },
      { en: 'How it works', de: 'Funktionsweise' },
      { en: 'Best for', de: 'Ideal für' },
      { en: 'Good to know', de: 'Gut zu wissen' },
    ],
    rows: [
      [
        { en: 'Real-time (Speech SDK)', de: 'Echtzeit (Speech SDK)' },
        { en: 'Streams microphone or file audio with interim results', de: 'Streamt Mikrofon- oder Dateiaudio mit Zwischenergebnissen' },
        { en: 'Live captions, dictation, voice agents', de: 'Live-Untertitel, Diktat, Voice Agents' },
        { en: 'Custom model through a deployed endpoint (`endpoint_id`)', de: 'Custom-Modell über einen bereitgestellten Endpoint (`endpoint_id`)' },
      ],
      [
        { en: 'Fast transcription', de: 'Fast Transcription' },
        { en: 'Synchronous REST call per file, faster than real time', de: 'Synchroner REST-Aufruf pro Datei, schneller als Echtzeit' },
        { en: 'Voicemail, meeting notes, quick subtitles', de: 'Voicemail, Besprechungsnotizen, schnelle Untertitel' },
        { en: 'Files under 2 hours and 300 MB; diarization and phrase lists', de: 'Dateien unter 2 Stunden und 300 MB; Diarisierung und Phrasenlisten' },
      ],
      [
        { en: 'Batch transcription', de: 'Batch-Transkription' },
        { en: 'Asynchronous jobs over many stored files', de: 'Asynchrone Jobs über viele gespeicherte Dateien' },
        { en: 'Call-center archives, post-call analytics', de: 'Callcenter-Archive, Analysen nach dem Anruf' },
        { en: 'Results land in storage; a custom model needs no hosted endpoint', de: 'Ergebnisse landen im Storage; ein Custom-Modell braucht keinen gehosteten Endpoint' },
      ],
    ],
  },
  code: [
    {
      title: { en: 'Speech to text with keyless authentication', de: 'Speech to Text mit schlüsselloser Anmeldung' },
      code: `import azure.cognitiveservices.speech as speechsdk
from azure.identity import DefaultAzureCredential

speech_config = speechsdk.SpeechConfig(
    token_credential=DefaultAzureCredential(),
    endpoint="https://<custom-domain>.cognitiveservices.azure.com/",
)
speech_config.speech_recognition_language = "en-US"
# speech_config.endpoint_id = "<custom-speech-endpoint-id>"  # use your custom model

audio_config = speechsdk.audio.AudioConfig(filename="order.wav")  # or use_default_microphone=True
recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)

result = recognizer.recognize_once_async().get()   # one utterance: ends at silence or 15 s
if result.reason == speechsdk.ResultReason.RecognizedSpeech:
    print(result.text)
elif result.reason == speechsdk.ResultReason.NoMatch:
    print("No speech could be recognized.")
elif result.reason == speechsdk.ResultReason.Canceled:
    print(result.cancellation_details.reason)`,
      notes: [
        {
          en: 'The training module uses `SpeechConfig(subscription=<key>, endpoint=<endpoint>)`; with a key, keep it in Azure Key Vault.',
          de: 'Das Trainingsmodul nutzt `SpeechConfig(subscription=<key>, endpoint=<endpoint>)`; einen Key bewahrst du in Azure Key Vault auf.',
        },
        {
          en: 'For long audio, connect a handler to `recognizer.recognized` and call `start_continuous_recognition()` … `stop_continuous_recognition()`.',
          de: 'Für langes Audio verbindest du einen Handler mit `recognizer.recognized` und rufst `start_continuous_recognition()` … `stop_continuous_recognition()` auf.',
        },
      ],
    },
    {
      title: { en: 'Text to speech with SSML and a fixed output format', de: 'Text to Speech mit SSML und festem Ausgabeformat' },
      code: `import azure.cognitiveservices.speech as speechsdk
from azure.identity import DefaultAzureCredential

speech_config = speechsdk.SpeechConfig(
    token_credential=DefaultAzureCredential(),
    endpoint="https://<custom-domain>.cognitiveservices.azure.com/",
)
speech_config.set_speech_synthesis_output_format(
    speechsdk.SpeechSynthesisOutputFormat.Riff24Khz16BitMonoPcm
)
synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=None)

ssml = """<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis"
       xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="en-US">
  <voice name="en-US-JennyNeural">
    <mstts:express-as style="cheerful">Good news: your order has shipped!</mstts:express-as>
    <break time="500ms"/>
    It arrives on <say-as interpret-as="date" format="mdy">11-12-2026</say-as>.
  </voice>
</speak>"""

result = synthesizer.speak_ssml_async(ssml).get()
if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
    speechsdk.AudioDataStream(result).save_to_wav_file("shipped.wav")`,
      notes: [
        {
          en: 'For plain text, set `speech_synthesis_voice_name` (for example `en-US-Ava:DragonHDLatestNeural`) and call `speak_text_async()`.',
          de: 'Für Klartext setzt du `speech_synthesis_voice_name` (zum Beispiel `en-US-Ava:DragonHDLatestNeural`) und rufst `speak_text_async()` auf.',
        },
        {
          en: '`audio_config=None` keeps the audio in the result; `AudioOutputConfig(use_default_speaker=True)` would play it instead. The format enum fixes file type, sample rate and bit depth.',
          de: '`audio_config=None` behält das Audio im Ergebnis; `AudioOutputConfig(use_default_speaker=True)` würde es stattdessen abspielen. Das Format-Enum legt Dateityp, Abtastrate und Bittiefe fest.',
        },
      ],
    },
  ],
  traps: [
    {
      en: '`recognize_once_async()` stops after one utterance (silence or 15 seconds). Transcribing a whole call that way loses everything after the first pause — use continuous recognition or batch transcription.',
      de: '`recognize_once_async()` stoppt nach einer Äußerung (Stille oder 15 Sekunden). Wer so einen ganzen Anruf transkribiert, verliert alles nach der ersten Pause – nutze kontinuierliche Erkennung oder Batch-Transkription.',
    },
    {
      en: 'Keyless Entra ID access to Speech needs a custom-domain endpoint and a data-plane role such as Cognitive Services Speech User; the generic Owner or Contributor roles don’t grant access to the speech APIs.',
      de: 'Schlüsselloser Entra-ID-Zugriff auf Speech braucht einen Custom-Domain-Endpoint und eine Data-Plane-Rolle wie Cognitive Services Speech User; die allgemeinen Rollen Owner oder Contributor geben keinen Zugriff auf die Speech-APIs.',
    },
    {
      en: 'Real-time recognition with a custom speech model needs a deployed custom endpoint (`endpoint_id`); batch transcription can use the custom model without one — and without its hosting cost.',
      de: 'Echtzeiterkennung mit einem Custom-Speech-Modell braucht einen bereitgestellten Custom-Endpoint (`endpoint_id`); die Batch-Transkription kann das Custom-Modell ohne Endpoint nutzen – und ohne dessen Hosting-Kosten.',
    },
    {
      en: '`mstts:express-as` styles exist only for some voices; a missing or invalid style makes the service ignore the whole element. HD voices don’t support every SSML element, for example `mstts:silence` or `bookmark`.',
      de: '`mstts:express-as`-Stile gibt es nur für manche Stimmen; ein fehlender oder ungültiger Stil lässt den Dienst das ganze Element ignorieren. HD-Stimmen unterstützen nicht jedes SSML-Element, zum Beispiel `mstts:silence` oder `bookmark`.',
    },
    {
      en: 'Custom speech improves *recognition*; custom voice changes *synthesis* and requires approved limited access.',
      de: 'Custom Speech verbessert die *Erkennung*; Custom Voice verändert die *Synthese* und erfordert einen genehmigten eingeschränkten Zugang.',
    },
  ],
  takeaways: [
    {
      en: '`SpeechConfig` → `AudioConfig` → `SpeechRecognizer` or `SpeechSynthesizer` → check `result.reason`.',
      de: '`SpeechConfig` → `AudioConfig` → `SpeechRecognizer` oder `SpeechSynthesizer` → `result.reason` prüfen.',
    },
    {
      en: 'One utterance: `recognize_once_async()`; long audio: continuous recognition or batch transcription.',
      de: 'Eine Äußerung: `recognize_once_async()`; langes Audio: kontinuierliche Erkennung oder Batch-Transkription.',
    },
    {
      en: 'Plain text: `speak_text_async()`; styles, pauses and pronunciation: SSML with `speak_ssml_async()`.',
      de: 'Klartext: `speak_text_async()`; Stile, Pausen und Aussprache: SSML mit `speak_ssml_async()`.',
    },
    {
      en: 'Vocabulary problems → text data for custom speech; accents and noise → audio with human-labeled transcripts.',
      de: 'Vokabularprobleme → Textdaten für Custom Speech; Akzente und Störgeräusche → Audio mit menschlich erstellten Transkripten.',
    },
  ],
  sources: [
    { title: 'What is speech to text?', url: 'https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-to-text' },
    { title: 'What is text to speech?', url: 'https://learn.microsoft.com/en-us/azure/ai-services/speech-service/text-to-speech' },
    { title: 'SSML document structure and events', url: 'https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-synthesis-markup-structure' },
    { title: 'What is custom speech?', url: 'https://learn.microsoft.com/en-us/azure/ai-services/speech-service/custom-speech-overview' },
    { title: 'Microsoft Entra authentication with the Speech SDK', url: 'https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-configure-azure-ad-auth' },
  ],
}
