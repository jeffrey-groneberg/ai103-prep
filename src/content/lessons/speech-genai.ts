import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'speech-genai',
  summary: {
    en: 'Some Foundry models are built for audio. **Transcription models** such as `gpt-transcribe` turn a recording into text, **text-to-speech models** such as `gpt-4o-mini-tts` turn text into natural speech, **audio chat models** such as `gpt-audio` listen to audio and answer in text or speech, and **realtime models** such as `gpt-realtime` hold a live spoken conversation. You deploy them like any other model and call them through the OpenAI-compatible APIs of your Foundry resource: `audio.transcriptions`, `audio.speech`, Chat Completions with audio content, or the Realtime API. Picking the right one is mostly about the shape of the job: a file or a live stream, text or speech as output, and whether the model must *understand* the audio or only write it down.',
    de: 'Einige Foundry-Modelle sind auf Audio spezialisiert. **Transkriptionsmodelle** wie `gpt-transcribe` machen aus einer Aufnahme Text, **Text-to-Speech-Modelle** wie `gpt-4o-mini-tts` machen aus Text natürliche Sprache, **Audio-Chatmodelle** wie `gpt-audio` hören Audio zu und antworten mit Text oder Sprache, und **Realtime-Modelle** wie `gpt-realtime` führen ein Live-Gespräch. Du stellst sie wie jedes andere Modell bereit und rufst sie über die OpenAI-kompatiblen APIs deiner Foundry-Ressource auf: `audio.transcriptions`, `audio.speech`, Chat Completions mit Audioinhalt oder die Realtime API. Die Wahl hängt vor allem von der Form der Aufgabe ab: Datei oder Live-Stream, Text oder Sprache als Ausgabe – und ob das Modell das Audio *verstehen* oder nur mitschreiben soll.',
  },
  examFocus: {
    en: 'Expect scenarios that ask you to pick the right speech-capable model and call: transcription (`gpt-transcribe` or `gpt-4o-mini-transcribe` via `audio.transcriptions.create()`) vs synthesis (`gpt-4o-mini-tts` via `audio.speech.create()` with `voice` and `instructions`) vs reasoning over audio (`gpt-audio` with an `input_audio` content part in Chat Completions) vs live conversation (`gpt-realtime`). Know the request shapes (file upload vs base64), the size limits (25 MB for transcription, 20 MB for audio chat) and where results land (`text`, `message.audio.transcript`, `message.audio.data`).',
    de: 'Rechne mit Szenarien, in denen du das passende sprachfähige Modell und den passenden Aufruf wählst: Transkription (`gpt-transcribe` oder `gpt-4o-mini-transcribe` über `audio.transcriptions.create()`) vs. Sprachsynthese (`gpt-4o-mini-tts` über `audio.speech.create()` mit `voice` und `instructions`) vs. Reasoning über Audio (`gpt-audio` mit einem `input_audio`-Inhaltsteil in Chat Completions) vs. Live-Gespräch (`gpt-realtime`). Kenne die Request-Formen (Datei-Upload vs. Base64), die Größenlimits (25 MB für Transkription, 20 MB für Audio-Chat) und wo die Ergebnisse landen (`text`, `message.audio.transcript`, `message.audio.data`).',
  },
  diagrams: [
    {
      id: 'speech-model-paths',
      title: { en: 'Four audio jobs, four model families', de: 'Vier Audioaufgaben, vier Modellfamilien' },
      caption: {
        en: 'All four are deployed in your Foundry resource and called by deployment name — what differs is the input, the output and the API call.',
        de: 'Alle vier werden in deiner Foundry-Ressource bereitgestellt und über den Deployment-Namen aufgerufen – unterschiedlich sind Eingabe, Ausgabe und API-Aufruf.',
      },
      width: 960,
      height: 450,
      groups: [
        { id: 'g-res', x: 305, y: 20, w: 330, h: 420, label: { en: 'Foundry resource · model deployments', de: 'Foundry-Ressource · Modell-Deployments' }, tone: 'foundry' },
      ],
      nodes: [
        { id: 'in-file', x: 20, y: 60, w: 200, h: 60, label: { en: 'Recorded audio', de: 'Aufgenommenes Audio' }, sub: 'mp3 · wav · m4a · ≤ 25 MB', icon: 'media', tone: 'data', shape: 'doc' },
        { id: 'm-stt', x: 330, y: 60, w: 280, h: 60, label: 'gpt-transcribe', sub: 'audio.transcriptions.create()', icon: 'foundry-models', tone: 'model' },
        { id: 'out-text', x: 740, y: 60, w: 200, h: 60, label: { en: 'Transcript', de: 'Transkript' }, sub: 'transcript.text', icon: 'file', tone: 'data', shape: 'doc' },
        { id: 'in-text', x: 20, y: 160, w: 200, h: 60, label: { en: 'Text + style hint', de: 'Text + Stilvorgabe' }, sub: 'input · instructions', icon: 'code', tone: 'app' },
        { id: 'm-tts', x: 330, y: 160, w: 280, h: 60, label: 'gpt-4o-mini-tts', sub: 'audio.speech.create(voice=…)', icon: 'foundry-models', tone: 'model' },
        { id: 'out-audio', x: 740, y: 160, w: 200, h: 60, label: { en: 'Speech audio file', de: 'Sprach-Audiodatei' }, sub: 'mp3 · wav · opus · …', icon: 'media', tone: 'data', shape: 'doc' },
        { id: 'in-mixed', x: 20, y: 260, w: 200, h: 60, label: { en: 'Audio + question', de: 'Audio + Frage' }, sub: { en: 'input_audio (base64)', de: 'input_audio (Base64)' }, icon: 'code', tone: 'app' },
        { id: 'm-chat', x: 330, y: 260, w: 280, h: 60, label: 'gpt-audio · gpt-audio-mini', sub: 'chat.completions + modalities', icon: 'foundry-models', tone: 'model' },
        { id: 'out-both', x: 740, y: 260, w: 200, h: 60, label: { en: 'Text and/or speech', de: 'Text und/oder Sprache' }, sub: { en: 'message.content (text)\nmessage.audio (speech)', de: 'message.content (Text)\nmessage.audio (Sprache)' }, icon: 'media', tone: 'app' },
        { id: 'in-mic', x: 20, y: 360, w: 200, h: 60, label: { en: 'Live microphone', de: 'Live-Mikrofon' }, sub: 'WebRTC · WebSocket · SIP', icon: 'mobile', tone: 'user', shape: 'actor' },
        { id: 'm-rt', x: 330, y: 360, w: 280, h: 60, label: 'gpt-realtime', sub: 'Realtime API · /openai/v1', icon: 'foundry-models', tone: 'model' },
        { id: 'out-spk', x: 740, y: 360, w: 200, h: 60, label: { en: 'Spoken reply', de: 'Gesprochene Antwort' }, sub: { en: 'streamed audio', de: 'gestreamtes Audio' }, icon: 'mobile', tone: 'user', shape: 'actor' },
      ],
      edges: [
        { id: 'e1', from: 'in-file', to: 'm-stt' },
        { id: 'e2', from: 'm-stt', to: 'out-text' },
        { id: 'e3', from: 'in-text', to: 'm-tts' },
        { id: 'e4', from: 'm-tts', to: 'out-audio' },
        { id: 'e5', from: 'in-mixed', to: 'm-chat' },
        { id: 'e6', from: 'm-chat', to: 'out-both' },
        { id: 'e7', from: 'in-mic', to: 'm-rt', label: { en: 'live audio', de: 'Live-Audio' } },
        { id: 'e8', from: 'm-rt', to: 'out-spk' },
      ],
      steps: [
        {
          title: { en: 'Pick the model by the job', de: 'Modell nach Aufgabe wählen' },
          text: {
            en: 'Foundry Models includes specialized audio models. You deploy them like any other model and pass the **deployment name** (any name you choose when deploying) as `model`. Ask first: is the job transcribing, speaking, understanding audio, or a live conversation?',
            de: 'Foundry Models enthält spezialisierte Audiomodelle. Du stellst sie wie jedes andere Modell bereit und übergibst den **Deployment-Namen** (frei wählbar beim Bereitstellen) als `model`. Frag dich zuerst: Geht es ums Mitschreiben, ums Sprechen, ums Verstehen von Audio oder um ein Live-Gespräch?',
          },
          focus: ['g-res', 'm-stt', 'm-tts', 'm-chat', 'm-rt'],
        },
        {
          title: { en: 'Transcribe a recording', de: 'Aufnahme transkribieren' },
          text: {
            en: '`audio.transcriptions.create()` uploads one file (mp3, mp4, mpeg, mpga, m4a, wav or webm; max 25 MB) and returns its `text`. A `language` hint such as `en` improves accuracy and latency; bigger files go to Azure Speech fast or batch transcription.',
            de: '`audio.transcriptions.create()` lädt eine Datei hoch (mp3, mp4, mpeg, mpga, m4a, wav oder webm; max. 25 MB) und liefert deren `text`. Ein `language`-Hinweis wie `en` verbessert Genauigkeit und Latenz; größere Dateien gehen an Fast oder Batch Transcription von Azure Speech.',
          },
          focus: ['in-file', 'e1', 'm-stt', 'e2', 'out-text'],
        },
        {
          title: { en: 'Synthesize speech', de: 'Sprache erzeugen' },
          text: {
            en: '`audio.speech.create()` turns up to 4,096 characters into audio with a `voice` such as `alloy`. With `gpt-4o-mini-tts`, `instructions` describe the delivery: calm, upbeat, slow …',
            de: '`audio.speech.create()` macht aus bis zu 4.096 Zeichen Audio mit einer `voice` wie `alloy`. Mit `gpt-4o-mini-tts` beschreiben `instructions` die Sprechweise: ruhig, fröhlich, langsam …',
          },
          focus: ['in-text', 'e3', 'm-tts', 'e4', 'out-audio'],
        },
        {
          title: { en: 'Reason over audio', de: 'Über Audio nachdenken' },
          text: {
            en: 'Audio chat models take an `input_audio` part next to your text question in Chat Completions and can answer in text (`message.content`), speech (`message.audio`, with a transcript) or both — one call instead of a transcribe-then-ask pipeline.',
            de: 'Audio-Chatmodelle nehmen in Chat Completions einen `input_audio`-Teil neben deiner Textfrage an und antworten mit Text (`message.content`), Sprache (`message.audio`, mit Transkript) oder beidem – ein Aufruf statt einer Pipeline aus Transkribieren und Fragen.',
          },
          focus: ['in-mixed', 'e5', 'm-chat', 'e6', 'out-both'],
        },
        {
          title: { en: 'Talk in real time', de: 'In Echtzeit sprechen' },
          text: {
            en: 'Realtime models take live audio in and stream the spoken reply back over WebRTC (browsers), WebSocket (servers) or SIP (phones). Voice activity detection decides when the user has finished — the basis for voice agents.',
            de: 'Realtime-Modelle nehmen Live-Audio an und streamen die gesprochene Antwort zurück – über WebRTC (Browser), WebSocket (Server) oder SIP (Telefonie). Die Sprachaktivitätserkennung entscheidet, wann der Nutzer fertig ist – die Basis für Voice Agents.',
          },
          focus: ['in-mic', 'e7', 'm-rt', 'e8', 'out-spk'],
        },
      ],
    },
    {
      id: 'audio-chat-request',
      title: { en: 'Anatomy of an audio question in Chat Completions', de: 'Aufbau einer Audiofrage in Chat Completions' },
      caption: {
        en: 'The audio travels inside the request as base64; the spoken answer comes back as base64 audio plus a transcript.',
        de: 'Das Audio reist als Base64 im Request mit; die gesprochene Antwort kommt als Base64-Audio plus Transkript zurück.',
      },
      width: 960,
      height: 300,
      nodes: [
        { id: 'n-file', x: 20, y: 40, w: 150, h: 64, label: 'voicemail.wav', sub: { en: 'max 20 MB', de: 'max. 20 MB' }, icon: 'media', tone: 'data', shape: 'doc' },
        { id: 'n-b64', x: 240, y: 40, w: 160, h: 64, label: { en: 'base64 string', de: 'Base64-String' }, sub: 'b64encode(bytes)', icon: 'code', tone: 'app' },
        { id: 'n-msg', x: 470, y: 40, w: 220, h: 64, label: { en: 'User message', de: 'Nutzernachricht' }, sub: { en: 'text + input_audio parts', de: 'Teile: text + input_audio' }, icon: 'code', tone: 'app' },
        { id: 'n-model', x: 760, y: 40, w: 180, h: 64, label: 'gpt-audio-mini', sub: 'modalities + audio', icon: 'foundry-models', tone: 'model' },
        { id: 'n-reply', x: 760, y: 200, w: 180, h: 64, label: 'message.audio', sub: 'transcript · data · id', icon: 'media', tone: 'app' },
        { id: 'n-next', x: 440, y: 200, w: 220, h: 64, label: { en: 'Follow-up turn', de: 'Folgerunde' }, sub: { en: 'assistant audio.id + new text', de: 'assistant audio.id + neuer Text' }, icon: 'code', tone: 'app' },
      ],
      edges: [
        { id: 'a1', from: 'n-file', to: 'n-b64', label: { en: 'encode', de: 'kodieren' } },
        { id: 'a2', from: 'n-b64', to: 'n-msg' },
        { id: 'a3', from: 'n-msg', to: 'n-model' },
        { id: 'a4', from: 'n-model', to: 'n-reply', label: { en: 'reply', de: 'Antwort' } },
        { id: 'a5', from: 'n-reply', to: 'n-next', label: 'audio.id' },
        { id: 'a6', from: 'n-next', to: 'n-model', label: { en: 'next call', de: 'nächster Aufruf' } },
      ],
      steps: [
        {
          title: { en: 'Encode the audio', de: 'Audio kodieren' },
          text: {
            en: 'Chat Completions has no file upload for audio. Read the bytes and base64-encode them; the recording can be up to 20 MB.',
            de: 'Chat Completions kennt keinen Datei-Upload für Audio. Lies die Bytes und kodiere sie mit Base64; die Aufnahme darf bis zu 20 MB groß sein.',
          },
          focus: ['n-file', 'a1', 'n-b64'],
        },
        {
          title: { en: 'Build one user message', de: 'Eine Nutzernachricht bauen' },
          text: {
            en: 'Put two content parts into one user message: a `text` part with your question and an `input_audio` part with `data` (base64) and `format` (for example `wav`).',
            de: 'Lege zwei Inhaltsteile in eine Nutzernachricht: einen `text`-Teil mit deiner Frage und einen `input_audio`-Teil mit `data` (Base64) und `format` (zum Beispiel `wav`).',
          },
          focus: ['a2', 'n-msg'],
        },
        {
          title: { en: 'Ask for text, speech or both', de: 'Text, Sprache oder beides anfordern' },
          text: {
            en: 'Call your `gpt-audio-mini` (or `gpt-audio`) deployment. `modalities=["text", "audio"]` plus `audio={"voice": …, "format": …}` requests a spoken answer; voices include alloy, coral, sage and verse.',
            de: 'Rufe dein `gpt-audio-mini`-Deployment (oder `gpt-audio`) auf. `modalities=["text", "audio"]` plus `audio={"voice": …, "format": …}` fordert eine gesprochene Antwort an; Stimmen sind etwa alloy, coral, sage und verse.',
          },
          focus: ['a3', 'n-model'],
        },
        {
          title: { en: 'Read the reply', de: 'Antwort auslesen' },
          text: {
            en: '`message.audio.transcript` holds the text of the spoken answer, `message.audio.data` the base64 audio, and `message.audio.id` a handle for later turns.',
            de: '`message.audio.transcript` enthält den Text der gesprochenen Antwort, `message.audio.data` das Base64-Audio und `message.audio.id` einen Verweis für spätere Runden.',
          },
          focus: ['a4', 'n-reply'],
        },
        {
          title: { en: 'Continue the conversation', de: 'Gespräch fortsetzen' },
          text: {
            en: 'Chat Completions is stateless: resend the history and reference the earlier spoken answer as `{"role": "assistant", "audio": {"id": …}}` instead of resending its audio.',
            de: 'Chat Completions ist zustandslos: Sende den Verlauf erneut und verweise auf die frühere gesprochene Antwort mit `{"role": "assistant", "audio": {"id": …}}`, statt ihr Audio erneut zu senden.',
          },
          focus: ['a5', 'n-next', 'a6'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Speech-capable model',
      text: {
        en: 'A Foundry model built for audio: transcription (`gpt-transcribe`, `gpt-4o-mini-transcribe`, `gpt-4o-transcribe-diarize` with *diarization* — labeling who said what), text to speech (`gpt-4o-mini-tts`), audio chat (`gpt-audio`, `gpt-audio-mini`) or realtime (`gpt-realtime`). Find them with the catalog filters; availability varies by region. Model lists change: `gpt-4o-transcribe` (still named in the training module) was retired on 2026-10-15, and `whisper`, `tts` and `tts-hd` retire on 2026-12-15.',
        de: 'Ein Foundry-Modell, das für Audio gebaut ist: Transkription (`gpt-transcribe`, `gpt-4o-mini-transcribe`, `gpt-4o-transcribe-diarize` mit *Diarisierung* – Zuordnung, wer was gesagt hat), Text to Speech (`gpt-4o-mini-tts`), Audio-Chat (`gpt-audio`, `gpt-audio-mini`) oder Realtime (`gpt-realtime`). Du findest sie über die Katalogfilter; die Verfügbarkeit hängt von der Region ab. Modelllisten ändern sich: `gpt-4o-transcribe` (im Trainingsmodul noch genannt) wurde am 2026-10-15 eingestellt, `whisper`, `tts` und `tts-hd` werden am 2026-12-15 eingestellt.',
      },
    },
    {
      term: 'Audio transcriptions API',
      text: {
        en: '`audio.transcriptions.create(model=…, file=…)` uploads one recorded file (mp3, mp4, mpeg, mpga, m4a, wav or webm, max 25 MB) and returns its `text`. An optional `language` hint in ISO-639-1 format (`en`) improves accuracy. `whisper` (retiring 2026-12-15) can also translate speech into English with `audio.translations.create()`.',
        de: '`audio.transcriptions.create(model=…, file=…)` lädt eine aufgenommene Datei hoch (mp3, mp4, mpeg, mpga, m4a, wav oder webm, max. 25 MB) und liefert deren `text`. Ein optionaler `language`-Hinweis im ISO-639-1-Format (`en`) verbessert die Genauigkeit. `whisper` (wird am 2026-12-15 eingestellt) übersetzt Sprache außerdem mit `audio.translations.create()` ins Englische.',
      },
    },
    {
      term: 'Audio speech API',
      text: {
        en: '`audio.speech.create(model=…, voice=…, input=…)` turns up to 4,096 characters of text into audio (`response_format` such as mp3 or wav). `gpt-4o-mini-tts` also accepts `instructions` that describe tone and style; `speed` ranges from 0.25 to 4.0. In Python, `audio.speech.with_streaming_response.create(…)` is the same call — it just streams the bytes straight into a file.',
        de: '`audio.speech.create(model=…, voice=…, input=…)` macht aus bis zu 4.096 Zeichen Text Audio (`response_format` etwa mp3 oder wav). `gpt-4o-mini-tts` akzeptiert zusätzlich `instructions`, die Ton und Stil beschreiben; `speed` reicht von 0,25 bis 4,0. In Python ist `audio.speech.with_streaming_response.create(…)` derselbe Aufruf – er streamt die Bytes nur direkt in eine Datei.',
      },
    },
    {
      term: 'Audio-capable chat model',
      text: {
        en: '`gpt-audio` and `gpt-audio-mini` add audio to Chat Completions: send audio as an `input_audio` content part (base64 `data` plus `format`), and set `modalities` and an `audio` voice and format to get speech back. Audio input is limited to 20 MB.',
        de: '`gpt-audio` und `gpt-audio-mini` erweitern Chat Completions um Audio: Du schickst Audio als `input_audio`-Inhaltsteil (Base64-`data` plus `format`) und setzt `modalities` sowie Stimme und Format in `audio`, um Sprache zurückzubekommen. Audioeingaben sind auf 20 MB begrenzt.',
      },
    },
    {
      term: 'Realtime API',
      text: {
        en: 'Low-latency speech-in, speech-out sessions with `gpt-realtime` models over WebRTC (browser and mobile clients), WebSocket (server to server) or SIP (telephony). A `session.update` event sets voice, instructions and turn detection (`server_vad`, `semantic_vad`); its GA path `/openai/v1/realtime` takes no `api-version` (unlike the audio calls in the samples).',
        de: 'Sessions mit geringer Latenz, Sprache rein und Sprache raus, mit `gpt-realtime`-Modellen über WebRTC (Browser- und Mobil-Clients), WebSocket (Server zu Server) oder SIP (Telefonie). Ein `session.update`-Event setzt Stimme, Anweisungen und Turn-Erkennung (`server_vad`, `semantic_vad`); sein GA-Pfad `/openai/v1/realtime` kommt ohne `api-version` aus (anders als die Audioaufrufe in den Beispielen).',
      },
    },
    {
      term: 'Endpoint, sign-in and API version',
      text: {
        en: 'The samples call your Foundry resource’s Azure OpenAI endpoint `https://<resource>.openai.azure.com/` (portal: **Keys and Endpoint**) — the same resource whose projects use `https://<resource>.services.ai.azure.com/api/projects/<project>`. Sign in keyless with a token provider for `https://ai.azure.com/.default` and a data-plane role (the audio quickstart assigns Cognitive Services User; roles differ by API — the Speech SDK and Voice Live use others). Like the docs, the audio calls pin a dated `api_version` on `AzureOpenAI` (audio chat needs `2025-01-01-preview` or later); `model` is your deployment name.',
        de: 'Die Beispiele rufen den Azure-OpenAI-Endpoint deiner Foundry-Ressource auf, `https://<resource>.openai.azure.com/` (Portal: **Keys and Endpoint**) – dieselbe Ressource, deren Projekte `https://<resource>.services.ai.azure.com/api/projects/<project>` nutzen. Melde dich schlüssellos mit einem Token-Provider für `https://ai.azure.com/.default` und einer Data-Plane-Rolle an (der Audio-Quickstart vergibt Cognitive Services User; die Rollen unterscheiden sich je API – Speech SDK und Voice Live nutzen andere). Wie in der Doku fixieren die Audioaufrufe eine datierte `api_version` auf `AzureOpenAI` (Audio-Chat braucht `2025-01-01-preview` oder neuer); `model` ist dein Deployment-Name.',
      },
    },
  ],
  comparison: {
    title: { en: 'Which audio path fits the job?', de: 'Welcher Audioweg passt zur Aufgabe?' },
    columns: [
      { en: 'Option', de: 'Option' },
      { en: 'In → out', de: 'Rein → raus' },
      { en: 'Call', de: 'Aufruf' },
      { en: 'Good for', de: 'Gut für' },
      { en: 'Watch out', de: 'Achtung' },
    ],
    rows: [
      [
        { en: 'Transcription model', de: 'Transkriptionsmodell' },
        { en: 'audio file → text', de: 'Audiodatei → Text' },
        'audio.transcriptions.create',
        { en: 'Call notes, captions for recordings', de: 'Gesprächsnotizen, Untertitel für Aufnahmen' },
        { en: 'Max 25 MB per file; text only', de: 'Max. 25 MB pro Datei; nur Text' },
      ],
      [
        { en: 'Text-to-speech model', de: 'Text-to-Speech-Modell' },
        { en: 'text → audio', de: 'Text → Audio' },
        'audio.speech.create',
        { en: 'Read-aloud UIs, notifications', de: 'Vorlese-Oberflächen, Benachrichtigungen' },
        { en: 'Max 4,096 characters; `instructions` need gpt-4o-mini-tts', de: 'Max. 4.096 Zeichen; `instructions` nur mit gpt-4o-mini-tts' },
      ],
      [
        { en: 'Audio chat model', de: 'Audio-Chatmodell' },
        { en: 'text + audio → text and/or audio', de: 'Text + Audio → Text und/oder Audio' },
        'chat.completions + input_audio',
        { en: 'Questions about a recording, spoken answers', de: 'Fragen zu einer Aufnahme, gesprochene Antworten' },
        { en: 'Max 20 MB audio, sent as base64', de: 'Max. 20 MB Audio, als Base64 gesendet' },
      ],
      [
        { en: 'Realtime model', de: 'Realtime-Modell' },
        { en: 'live audio ↔ live audio', de: 'Live-Audio ↔ Live-Audio' },
        { en: 'Realtime API session', de: 'Realtime-API-Session' },
        { en: 'Voice assistants, support agents', de: 'Sprachassistenten, Support-Agents' },
        { en: 'Session-based; WebRTC, WebSocket or SIP', de: 'Session-basiert; WebRTC, WebSocket oder SIP' },
      ],
      [
        'Azure Speech fast transcription',
        { en: 'audio file → text, synchronous', de: 'Audiodatei → Text, synchron' },
        'Fast transcription REST API',
        { en: 'Longer recordings, diarization', de: 'Längere Aufnahmen, Diarisierung' },
        { en: 'Files under 5 hours and 500 MB', de: 'Dateien unter 5 Stunden und 500 MB' },
      ],
      [
        'Azure Speech batch transcription',
        { en: 'many large files → text', de: 'viele große Dateien → Text' },
        'Speech to text REST API',
        { en: 'Archives, diarization, word timestamps', de: 'Archive, Diarisierung, Wort-Zeitstempel' },
        { en: 'Asynchronous; files up to 1 GB', de: 'Asynchron; Dateien bis 1 GB' },
      ],
    ],
  },
  code: [
    {
      title: { en: 'Transcribe a recording and synthesize a reply (keyless)', de: 'Aufnahme transkribieren und Antwort vertonen (schlüssellos)' },
      code: `from openai import AzureOpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

token_provider = get_bearer_token_provider(
    DefaultAzureCredential(), "https://ai.azure.com/.default"
)
client = AzureOpenAI(
    azure_endpoint="https://<resource>.openai.azure.com/",
    azure_ad_token_provider=token_provider,
    api_version="2025-03-01-preview",
)

# Speech to text: one request per file (max 25 MB)
with open("support-call.mp3", "rb") as audio:
    transcript = client.audio.transcriptions.create(
        model="gpt-transcribe",             # deployment name
        file=audio,
        language="en",                      # optional ISO-639-1 hint
    )
print(transcript.text)

# Text to speech: describe the delivery in plain words
with client.audio.speech.with_streaming_response.create(
    model="gpt-4o-mini-tts",                # deployment name
    voice="alloy",
    input="Thanks for calling. Your ticket number is 4 2 7.",
    instructions="Speak in a calm, friendly tone.",
    response_format="mp3",
) as response:
    response.stream_to_file("reply.mp3")`,
      notes: [
        {
          en: 'Same calls and `api_version` as the training module, but keyless: the token provider replaces the API key. The module’s `gpt-4o-transcribe` was retired in October 2026; current docs use `gpt-transcribe` for offline transcription.',
          de: 'Dieselben Aufrufe und dieselbe `api_version` wie im Trainingsmodul, aber schlüssellos: Der Token-Provider ersetzt den API-Key. Das im Modul genutzte `gpt-4o-transcribe` wurde im Oktober 2026 eingestellt; die aktuelle Doku nutzt `gpt-transcribe` für Offline-Transkription.',
        },
        {
          en: '`instructions` work with `gpt-4o-mini-tts`, not with the older `tts` / `tts-hd` models (retiring 2026-12-15; some quickstarts call them `tts-1` / `tts-1-hd`).',
          de: '`instructions` funktionieren mit `gpt-4o-mini-tts`, nicht mit den älteren Modellen `tts` / `tts-hd` (werden am 2026-12-15 eingestellt; manche Quickstarts nennen sie `tts-1` / `tts-1-hd`).',
        },
        {
          en: 'Recordings over 25 MB: split them or use Azure Speech — fast transcription (under 5 hours and 500 MB) or batch transcription (files up to 1 GB).',
          de: 'Aufnahmen über 25 MB: aufteilen oder Azure Speech nutzen – Fast Transcription (unter 5 Stunden und 500 MB) oder Batch-Transkription (Dateien bis 1 GB).',
        },
      ],
    },
    {
      title: { en: 'Ask a question about an audio clip with gpt-audio', de: 'Mit gpt-audio eine Frage zu einem Audioclip stellen' },
      code: `import base64
from openai import AzureOpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

client = AzureOpenAI(
    azure_endpoint="https://<resource>.openai.azure.com/",
    azure_ad_token_provider=get_bearer_token_provider(
        DefaultAzureCredential(), "https://ai.azure.com/.default"
    ),
    api_version="2025-01-01-preview",        # audio completions start with this version
)

with open("voicemail.wav", "rb") as f:
    audio_b64 = base64.b64encode(f.read()).decode("utf-8")

completion = client.chat.completions.create(
    model="gpt-audio-mini",                  # deployment name
    modalities=["text", "audio"],
    audio={"voice": "alloy", "format": "wav"},
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "What does the caller want, and how urgent is it?"},
            {"type": "input_audio", "input_audio": {"data": audio_b64, "format": "wav"}},
        ],
    }],
)
answer = completion.choices[0].message.audio
print(answer.transcript)                     # text of the spoken answer
with open("answer.wav", "wb") as out:
    out.write(base64.b64decode(answer.data)) # the spoken answer itself`,
      notes: [
        {
          en: 'The audio travels inside the request as base64 — there is no file upload here, and the limit is 20 MB.',
          de: 'Das Audio reist als Base64 im Request mit – hier gibt es keinen Datei-Upload, und das Limit liegt bei 20 MB.',
        },
        {
          en: 'For a follow-up turn, resend the history and reference this answer as `{"role": "assistant", "audio": {"id": answer.id}}`.',
          de: 'Für eine Folgerunde sendest du den Verlauf erneut und verweist auf diese Antwort mit `{"role": "assistant", "audio": {"id": answer.id}}`.',
        },
        {
          en: 'Why a different `api_version` than the first sample? The audio chat quickstart pins `2025-01-01-preview`, the version that introduced audio completions — pin the version the doc for each call shows.',
          de: 'Warum eine andere `api_version` als im ersten Beispiel? Der Audio-Chat-Quickstart fixiert `2025-01-01-preview`, die Version, mit der Audio Completions kamen – fixiere jeweils die Version, die die Doku für den Aufruf zeigt.',
        },
      ],
    },
  ],
  traps: [
    {
      en: 'A transcription model only writes down what was said. If the scenario asks the model to *judge* or *answer questions about* the audio in one call, you need an audio chat model such as `gpt-audio`.',
      de: 'Ein Transkriptionsmodell schreibt nur mit, was gesagt wurde. Soll das Modell das Audio in einem Aufruf *bewerten* oder *Fragen dazu beantworten*, brauchst du ein Audio-Chatmodell wie `gpt-audio`.',
    },
    {
      en: '`audio.transcriptions.create()` takes a file upload; Chat Completions takes audio as a base64 `input_audio` part with `data` and `format`. Mixing up the two request shapes is a classic code-completion trap.',
      de: '`audio.transcriptions.create()` erwartet einen Datei-Upload; Chat Completions erwartet Audio als Base64-Teil `input_audio` mit `data` und `format`. Diese beiden Request-Formen zu verwechseln ist eine klassische Codefallen-Frage.',
    },
    {
      en: 'Size limits differ: 25 MB per file for the transcription API, 20 MB of audio for audio chat. Larger recordings go to Azure Speech: fast transcription (synchronous, under 5 hours and 500 MB) or batch transcription (asynchronous, up to 1 GB per file).',
      de: 'Die Größenlimits unterscheiden sich: 25 MB pro Datei für die Transkriptions-API, 20 MB Audio für Audio-Chat. Größere Aufnahmen gehen an Azure Speech: Fast Transcription (synchron, unter 5 Stunden und 500 MB) oder Batch-Transkription (asynchron, bis 1 GB pro Datei).',
    },
    {
      en: 'Chat Completions has no `output_text` — with audio output, read `choices[0].message.audio.transcript` for the text and `.data` for the audio.',
      de: 'Chat Completions kennt kein `output_text` – bei Audioausgabe liest du `choices[0].message.audio.transcript` für den Text und `.data` für das Audio.',
    },
    {
      en: 'Watch model currency: `gpt-4o-transcribe` from the training module was retired on 2026-10-15, and `whisper`, `tts` and `tts-hd` retire on 2026-12-15. `gpt-4o-mini-tts` speaks but can’t transcribe, and `instructions` don’t work with `tts-1`/`tts-1-hd`.',
      de: 'Achte auf die Modellaktualität: `gpt-4o-transcribe` aus dem Trainingsmodul wurde am 2026-10-15 eingestellt, `whisper`, `tts` und `tts-hd` werden am 2026-12-15 eingestellt. `gpt-4o-mini-tts` spricht, kann aber nicht transkribieren, und `instructions` funktionieren nicht mit `tts-1`/`tts-1-hd`.',
    },
  ],
  takeaways: [
    {
      en: 'The job decides the model: transcribe → `gpt-transcribe`/`gpt-4o-mini-transcribe`, speak → `gpt-4o-mini-tts`, understand audio → `gpt-audio`, converse live → `gpt-realtime`.',
      de: 'Die Aufgabe bestimmt das Modell: mitschreiben → `gpt-transcribe`/`gpt-4o-mini-transcribe`, sprechen → `gpt-4o-mini-tts`, Audio verstehen → `gpt-audio`, live sprechen → `gpt-realtime`.',
    },
    {
      en: 'File in, text out = `audio.transcriptions`; text in, audio out = `audio.speech`.',
      de: 'Datei rein, Text raus = `audio.transcriptions`; Text rein, Audio raus = `audio.speech`.',
    },
    {
      en: 'Reasoning over audio = Chat Completions with an `input_audio` part plus `modalities`.',
      de: 'Reasoning über Audio = Chat Completions mit einem `input_audio`-Teil plus `modalities`.',
    },
    {
      en: 'Authenticate with Entra ID tokens (`https://ai.azure.com/.default`) and pass deployment names as `model`.',
      de: 'Melde dich mit Entra-ID-Tokens an (`https://ai.azure.com/.default`) und übergib Deployment-Namen als `model`.',
    },
  ],
  sources: [
    { title: 'Foundry Models sold by Azure (audio models)', url: 'https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure' },
    { title: 'Quickstart: Get started with Azure OpenAI audio generation', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/audio-completions-quickstart' },
    { title: 'What are OpenAI transcription models?', url: 'https://learn.microsoft.com/en-us/azure/ai-services/speech-service/transcribe-overview' },
    { title: 'Use the GPT Realtime API for speech and audio', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/realtime-audio' },
    { title: 'Azure OpenAI image, audio, and video REST API reference (v1 preview)', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/reference-preview-latest' },
  ],
}
