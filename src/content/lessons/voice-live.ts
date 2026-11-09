import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'voice-live',
  summary: {
    en: 'The **Voice Live API** (part of Azure Speech in Foundry Tools) is a fully managed speech-to-speech service for voice agents. Over one real-time connection your client streams microphone audio in and plays synthesized speech out; in between, Voice Live handles noise suppression, echo cancellation, turn detection, speech recognition, a generative model or Foundry agent, and text to speech. In *model mode* you deploy nothing — you name a fully managed model such as `gpt-realtime` or `gpt-5-mini`; in *agent mode* you connect to a Foundry agent, whose model is your own deployment. Either way, you configure the session with a `session.update` event. In Python, the async `azure-ai-voicelive` client library wraps the WebSocket and hands you typed events such as `RESPONSE_AUDIO_DELTA`.',
    de: 'Die **Voice Live API** (Teil von Azure Speech in Foundry Tools) ist ein vollständig verwalteter Speech-to-Speech-Dienst für Voice Agents. Über eine Echtzeitverbindung streamt dein Client Mikrofonaudio hinein und spielt synthetisierte Sprache ab; dazwischen übernimmt Voice Live Rauschunterdrückung, Echounterdrückung, Turn-Erkennung, Spracherkennung, ein generatives Modell oder einen Foundry-Agent sowie Text to Speech. Im *Modellmodus* stellst du nichts bereit – du nennst ein vollständig verwaltetes Modell wie `gpt-realtime` oder `gpt-5-mini`; im *Agent-Modus* verbindest du dich mit einem Foundry-Agent, dessen Modell dein eigenes Deployment ist. In beiden Fällen konfigurierst du die Session mit einem `session.update`-Event. In Python kapselt die asynchrone Clientbibliothek `azure-ai-voicelive` den WebSocket und liefert dir typisierte Events wie `RESPONSE_AUDIO_DELTA`.',
  },
  examFocus: {
    en: 'Expect questions on session configuration (`turn_detection` types such as `server_vad` and `azure_semantic_vad`, `input_audio_noise_reduction`, `input_audio_echo_cancellation`, `input_audio_transcription` with phrase lists and custom speech, `voice` types `azure-standard` and `azure-custom`), on events (`session.updated`, `input_audio_buffer.speech_started`, `response.audio.delta`, `response.done`), on authentication (Microsoft Entra ID vs API key — agent mode requires Entra ID), on connecting a Foundry agent (`agent_name`, `project_name`, settings in agent metadata) and on when a native audio model beats a cascaded pipeline.',
    de: 'Rechne mit Fragen zur Session-Konfiguration (`turn_detection`-Typen wie `server_vad` und `azure_semantic_vad`, `input_audio_noise_reduction`, `input_audio_echo_cancellation`, `input_audio_transcription` mit Phrasenlisten und Custom Speech, `voice`-Typen `azure-standard` und `azure-custom`), zu Events (`session.updated`, `input_audio_buffer.speech_started`, `response.audio.delta`, `response.done`), zur Authentifizierung (Microsoft Entra ID vs. API-Key – der Agent-Modus verlangt Entra ID), zur Anbindung eines Foundry-Agents (`agent_name`, `project_name`, Einstellungen in Agent-Metadaten) und dazu, wann ein natives Audiomodell eine kaskadierte Pipeline schlägt.',
  },
  diagrams: [
    {
      id: 'voice-live-pipeline',
      title: { en: 'Inside a Voice Live session', de: 'Was in einer Voice-Live-Session passiert' },
      caption: {
        en: 'Audio goes in and comes out over one connection; Voice Live runs the whole speech pipeline in between.',
        de: 'Audio geht über eine Verbindung hinein und heraus; Voice Live betreibt dazwischen die komplette Sprach-Pipeline.',
      },
      width: 960,
      height: 430,
      groups: [
        { id: 'g-vl', x: 435, y: 20, w: 505, h: 384, label: { en: 'Voice Live session · one real-time connection', de: 'Voice-Live-Session · eine Echtzeitverbindung' }, tone: 'foundry' },
      ],
      nodes: [
        { id: 'mic', x: 20, y: 60, w: 150, h: 64, label: { en: 'Microphone', de: 'Mikrofon' }, sub: 'PCM16 audio', icon: 'mobile', tone: 'user', shape: 'actor' },
        { id: 'client', x: 180, y: 190, w: 150, h: 64, label: { en: 'Client app', de: 'Client-App' }, sub: 'azure-ai-voicelive', icon: 'browser', tone: 'app' },
        { id: 'speaker', x: 20, y: 320, w: 150, h: 64, label: { en: 'Speaker', de: 'Lautsprecher' }, sub: { en: 'plays deltas', de: 'spielt Deltas ab' }, icon: 'mobile', tone: 'user', shape: 'actor' },
        { id: 'noise', x: 452, y: 60, w: 216, h: 64, label: { en: 'Noise suppression', de: 'Rauschunterdrückung' }, sub: { en: '+ echo cancellation', de: '+ Echounterdrückung' }, icon: 'speech', tone: 'foundry' },
        { id: 'turn', x: 710, y: 60, w: 210, h: 64, label: { en: 'Turn detection', de: 'Turn-Erkennung' }, sub: 'server_vad · azure_semantic_vad', icon: 'speech', tone: 'foundry' },
        { id: 'stt', x: 710, y: 190, w: 210, h: 64, label: { en: 'Speech to text', de: 'Speech to Text' }, sub: { en: 'azure-speech · phrase list', de: 'azure-speech · Phrasenliste' }, icon: 'speech', tone: 'foundry' },
        { id: 'model', x: 452, y: 190, w: 216, h: 64, label: { en: 'Model or agent call', de: 'Modell oder Agent-Aufruf' }, sub: 'gpt-realtime · gpt-5-mini · …', icon: 'foundry-models', tone: 'model' },
        { id: 'tts', x: 452, y: 320, w: 216, h: 64, label: { en: 'Text to speech', de: 'Text to Speech' }, sub: { en: 'Azure standard · HD · custom', de: 'Azure Standard · HD · Custom' }, icon: 'speech', tone: 'foundry' },
      ],
      edges: [
        { id: 'v1', from: 'mic', to: 'client' },
        { id: 'v2', from: 'client', to: 'noise', label: { en: 'audio in', de: 'Audio rein' } },
        { id: 'v3', from: 'noise', to: 'turn' },
        { id: 'v4', from: 'turn', to: 'stt' },
        { id: 'v5', from: 'stt', to: 'model' },
        { id: 'v6', from: 'model', to: 'tts' },
        { id: 'v7', from: 'tts', to: 'client', label: { en: 'audio out', de: 'Audio raus' } },
        { id: 'v8', from: 'client', to: 'speaker' },
        { id: 'v9', from: 'turn', to: 'model', label: { en: 'native audio', de: 'natives Audio' }, dashed: true },
        { id: 'v10', from: 'model', to: 'client', label: { en: 'native voice', de: 'native Stimme' }, dashed: true },
      ],
      steps: [
        {
          title: { en: 'One connection, one session', de: 'Eine Verbindung, eine Session' },
          text: {
            en: 'The client opens one real-time connection to Voice Live for a model or an agent — WebSocket from a server, or WebRTC (the browser standard for low-latency audio and video), which is recommended for browser and mobile clients. Then it sends `session.update` with voice, turn detection and audio processing; Voice Live confirms with `session.updated`.',
            de: 'Der Client öffnet eine Echtzeitverbindung zu Voice Live für ein Modell oder einen Agent – per WebSocket von einem Server oder per WebRTC (Browserstandard für Audio und Video mit geringer Latenz), empfohlen für Browser- und Mobil-Clients. Dann sendet er `session.update` mit Stimme, Turn-Erkennung und Audioverarbeitung; Voice Live bestätigt mit `session.updated`.',
          },
          focus: ['client', 'g-vl'],
        },
        {
          title: { en: 'Clean the audio', de: 'Audio säubern' },
          text: {
            en: 'The client streams PCM16 microphone audio (uncompressed 16-bit samples, 24 kHz by default) with `input_audio_buffer.append`. `azure_deep_noise_suppression` removes background noise, and `server_echo_cancellation` removes the agent’s own voice — no client-side echo cancellation needed.',
            de: 'Der Client streamt PCM16-Mikrofonaudio (unkomprimierte 16-Bit-Samples, standardmäßig 24 kHz) mit `input_audio_buffer.append`. `azure_deep_noise_suppression` entfernt Hintergrundgeräusche, und `server_echo_cancellation` entfernt die eigene Stimme des Agents – eine Echounterdrückung im Client ist nicht nötig.',
          },
          focus: ['mic', 'v1', 'v2', 'noise'],
        },
        {
          title: { en: 'Detect the turn', de: 'Den Turn erkennen' },
          text: {
            en: 'Turn detection uses VAD (voice activity detection). `server_vad` (default) reacts to volume; `azure_semantic_vad` judges from meaning whether the user is done, works with all models and can ignore filler words. When the user starts talking you get `input_audio_buffer.speech_started` — also mid-answer (*barge-in*: the user interrupts the agent).',
            de: 'Die Turn-Erkennung nutzt VAD (Voice Activity Detection, Sprachaktivitätserkennung). `server_vad` (Standard) reagiert auf Lautstärke; `azure_semantic_vad` beurteilt anhand der Bedeutung, ob der Nutzer fertig ist, funktioniert mit allen Modellen und kann Füllwörter ignorieren. Beginnt der Nutzer zu sprechen, kommt `input_audio_buffer.speech_started` – auch mitten in einer Antwort (*Barge-in*: Der Nutzer unterbricht den Agent).',
          },
          focus: ['turn', 'v3'],
        },
        {
          title: { en: 'Understand: two paths', de: 'Verstehen: zwei Wege' },
          text: {
            en: 'Text models such as `gpt-5-mini` and Foundry agents receive an `azure-speech` transcript — this is where phrase lists and custom speech apply. Realtime models such as `gpt-realtime` take the audio natively. In agent mode, Voice Live calls your Foundry agent, which runs in your project (next diagram).',
            de: 'Textmodelle wie `gpt-5-mini` und Foundry-Agents bekommen ein `azure-speech`-Transkript – hier greifen Phrasenlisten und Custom Speech. Realtime-Modelle wie `gpt-realtime` nehmen das Audio nativ entgegen. Im Agent-Modus ruft Voice Live deinen Foundry-Agent auf, der in deinem Projekt läuft (nächstes Diagramm).',
          },
          focus: ['stt', 'model', 'v4', 'v5', 'v9'],
        },
        {
          title: { en: 'Speak back', de: 'Zurücksprechen' },
          text: {
            en: 'Text to speech speaks the reply with the configured Azure voice (standard, HD or custom); a realtime model can instead answer in its own OpenAI voice (dashed). Either way the audio streams as `response.audio.delta` chunks until `response.done`. The client plays the chunks and stops immediately on `speech_started`.',
            de: 'Text to Speech spricht die Antwort mit der eingestellten Azure-Stimme (Standard, HD oder Custom); ein Realtime-Modell kann stattdessen mit seiner eigenen OpenAI-Stimme antworten (gestrichelt). In beiden Fällen streamt das Audio als `response.audio.delta`-Chunks bis `response.done`. Der Client spielt die Chunks ab und stoppt sofort bei `speech_started`.',
          },
          focus: ['tts', 'v6', 'v7', 'v10', 'v8', 'speaker'],
        },
      ],
    },
    {
      id: 'voice-live-agent',
      title: { en: 'Voice Live in front of a Foundry agent', de: 'Voice Live vor einem Foundry-Agent' },
      caption: {
        en: 'The agent keeps instructions and tools; Voice Live adds the speech layer and is reached with an Entra ID token.',
        de: 'Der Agent behält Anweisungen und Tools; Voice Live ergänzt die Sprachschicht und wird mit einem Entra-ID-Token erreicht.',
      },
      width: 960,
      height: 420,
      groups: [
        { id: 'g-proj', x: 680, y: 20, w: 270, h: 384, label: { en: 'Foundry project', de: 'Foundry-Projekt' }, tone: 'foundry' },
      ],
      nodes: [
        { id: 'caller', x: 20, y: 190, w: 130, h: 64, label: { en: 'Caller', de: 'Anrufer' }, icon: 'users', tone: 'user', shape: 'actor' },
        { id: 'app', x: 210, y: 190, w: 160, h: 64, label: { en: 'Client app', de: 'Client-App' }, sub: { en: 'Entra ID token', de: 'Entra-ID-Token' }, icon: 'browser', tone: 'app' },
        { id: 'vl', x: 460, y: 190, w: 160, h: 64, label: 'Voice Live', sub: { en: 'STT · turns · TTS', de: 'STT · Turns · TTS' }, icon: 'speech', tone: 'foundry' },
        { id: 'settings', x: 700, y: 50, w: 230, h: 64, label: { en: 'Voice Live settings', de: 'Voice-Live-Einstellungen' }, sub: { en: 'agent metadata (JSON)', de: 'Agent-Metadaten (JSON)' }, icon: 'gear', tone: 'data', shape: 'doc' },
        { id: 'agent', x: 700, y: 190, w: 230, h: 64, label: { en: 'Prompt agent version', de: 'Prompt-Agent-Version' }, sub: { en: 'instructions · tools · model', de: 'Anweisungen · Tools · Modell' }, icon: 'foundry-agent-service', tone: 'foundry' },
        { id: 'conv', x: 700, y: 320, w: 230, h: 64, label: { en: 'Conversation', de: 'Konversation' }, sub: 'conversation_id (optional)', icon: 'table', tone: 'data', shape: 'store' },
      ],
      edges: [
        { id: 'w1', from: 'caller', to: 'app', label: { en: 'audio', de: 'Audio' }, bidir: true },
        { id: 'w2', from: 'app', to: 'vl', label: 'WebSocket', bidir: true },
        { id: 'w3', from: 'vl', to: 'agent', label: { en: 'text', de: 'Text' }, bidir: true },
        { id: 'w6', from: 'agent', to: 'settings', label: { en: 'metadata', de: 'Metadaten' }, dashed: true },
        { id: 'w4', from: 'settings', to: 'vl', label: { en: 'loaded at connect', de: 'beim Verbinden' }, dashed: true },
        { id: 'w5', from: 'agent', to: 'conv', label: { en: 'history', de: 'Verlauf' }, dashed: true, bidir: true },
      ],
      steps: [
        {
          title: { en: 'Add a voice to a text agent', de: 'Einem Textagent eine Stimme geben' },
          text: {
            en: 'Voice Live wraps an existing Foundry **prompt agent** (declarative agent: model + instructions + tools, versioned in Foundry): it turns speech into text for the agent and the agent’s text answer back into speech. Instructions, tools and knowledge stay in the agent.',
            de: 'Voice Live legt sich um einen bestehenden Foundry-**Prompt-Agent** (deklarativer Agent: Modell + Instructions + Tools, versioniert in Foundry): Es macht aus Sprache Text für den Agent und aus der Textantwort des Agents wieder Sprache. Anweisungen, Tools und Wissen bleiben im Agent.',
          },
          focus: ['vl', 'w3', 'agent'],
        },
        {
          title: { en: 'Settings travel with the agent', de: 'Einstellungen reisen mit dem Agent' },
          text: {
            en: 'Store the Voice Live settings — voice, turn detection, noise suppression, transcription — as JSON in the agent version’s metadata under `microsoft.voice-live.configuration`, split into 512-character chunks (further keys `….configuration.1`, `….configuration.2`, …). Voice Live applies them to the session when a client connects; settings sent in `session.update` come on top. In the portal you switch on **voice mode** in the agent playground and pick these settings in the configuration pane.',
            de: 'Speichere die Voice-Live-Einstellungen – Stimme, Turn-Erkennung, Rauschunterdrückung, Transkription – als JSON in den Metadaten der Agent-Version unter `microsoft.voice-live.configuration`, aufgeteilt in Blöcke zu 512 Zeichen (weitere Schlüssel `….configuration.1`, `….configuration.2`, …). Voice Live wendet sie auf die Session an, sobald sich ein Client verbindet; Einstellungen aus `session.update` kommen hinzu. Im Portal schaltest du im Agent-Playground den **Voice mode** ein und wählst diese Einstellungen im Konfigurationsbereich.',
          },
          focus: ['agent', 'w6', 'settings', 'w4', 'vl'],
        },
        {
          title: { en: 'Connect by name with Entra ID', de: 'Per Name mit Entra ID verbinden' },
          text: {
            en: 'The client calls `connect()` with `agent_name` and `project_name` (optionally `agent_version` or `conversation_id`). Agent mode requires a Microsoft Entra ID credential — API keys aren’t supported for agent invocation.',
            de: 'Der Client ruft `connect()` mit `agent_name` und `project_name` auf (optional `agent_version` oder `conversation_id`). Der Agent-Modus verlangt eine Microsoft-Entra-ID-Anmeldung – API-Keys werden für den Agent-Aufruf nicht unterstützt.',
          },
          focus: ['app', 'w2'],
        },
        {
          title: { en: 'A spoken turn', de: 'Ein gesprochener Turn' },
          text: {
            en: 'Caller audio → Voice Live (turn detection, speech to text) → agent → text reply → Voice Live (text to speech) → caller. Don’t send `instructions` in `session.update`: with an agent they aren’t supported.',
            de: 'Audio des Anrufers → Voice Live (Turn-Erkennung, Speech to Text) → Agent → Textantwort → Voice Live (Text to Speech) → Anrufer. Sende keine `instructions` in `session.update`: Mit einem Agent werden sie nicht unterstützt.',
          },
          focus: ['caller', 'w1', 'app', 'w2', 'vl', 'w3', 'agent'],
        },
        {
          title: { en: 'Keep the conversation', de: 'Das Gespräch fortführen' },
          text: {
            en: 'Pass `conversation_id` to continue an earlier **conversation** (durable item store for multi-turn state); the agent reads it and appends each turn. The stored history consists of text turns — after a barge-in it can differ from what the caller actually heard.',
            de: 'Übergib `conversation_id`, um eine frühere **Konversation** fortzusetzen (dauerhafter Item-Speicher für Zustand über mehrere Runden); der Agent liest ihn und hängt jeden Turn an. Der gespeicherte Verlauf besteht aus Text-Turns – nach einem Barge-in kann er von dem abweichen, was der Anrufer tatsächlich gehört hat.',
          },
          focus: ['agent', 'w5', 'conv'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Voice Live API',
      text: {
        en: 'A fully managed speech-to-speech API for voice agents. Its real-time events largely match the Azure OpenAI Realtime API, and it adds Azure features such as noise suppression, echo cancellation, semantic end-of-turn detection and avatars (set `avatar` in the session; the video streams over WebRTC after `session.avatar.connect`). The pricing tier (Pro, Standard or Lite) follows the model you choose; in model mode there is nothing to deploy.',
        de: 'Eine vollständig verwaltete Speech-to-Speech-API für Voice Agents. Ihre Echtzeit-Events entsprechen weitgehend der Azure OpenAI Realtime API, und sie ergänzt Azure-Funktionen wie Rauschunterdrückung, Echounterdrückung, semantische Erkennung des Turn-Endes und Avatare (`avatar` in der Session setzen; das Video streamt nach `session.avatar.connect` per WebRTC). Der Preistarif (Pro, Standard oder Lite) richtet sich nach dem gewählten Modell; im Modellmodus stellst du nichts bereit.',
      },
    },
    {
      term: 'session.update',
      text: {
        en: 'Usually the first client event: it sets instructions, voice, turn detection, audio formats (`pcm16`, or `g711_ulaw`/`g711_alaw` — G.711 telephone codecs at 8 kHz), audio processing and transcription. The service confirms with `session.updated`; audio then flows with `input_audio_buffer.append` (the buffer can also be committed or cleared). With a Foundry agent, `instructions` aren’t supported — the agent owns them.',
        de: 'Meist das erste Client-Event: Es setzt Anweisungen, Stimme, Turn-Erkennung, Audioformate (`pcm16` oder `g711_ulaw`/`g711_alaw` – G.711-Telefoniecodecs mit 8 kHz), Audioverarbeitung und Transkription. Der Dienst bestätigt mit `session.updated`; danach fließt Audio mit `input_audio_buffer.append` (der Puffer lässt sich auch committen oder leeren). Mit einem Foundry-Agent werden `instructions` nicht unterstützt – die gehören dem Agent.',
      },
    },
    {
      term: 'Turn detection',
      text: {
        en: '`server_vad` (default) detects speech by volume; `semantic_vad` uses meaning but works only with `gpt-realtime` models; `azure_semantic_vad` works with all models, can remove filler words to avoid false barge-ins and supports `interrupt_response`. It primarily supports English (its filler-word list is English); `azure_semantic_vad_multilingual` adds languages such as German. `silence_duration_ms` defaults to 500 ms.',
        de: '`server_vad` (Standard) erkennt Sprache an der Lautstärke; `semantic_vad` nutzt die Bedeutung, funktioniert aber nur mit `gpt-realtime`-Modellen; `azure_semantic_vad` funktioniert mit allen Modellen, kann Füllwörter entfernen, um falsche Barge-ins zu vermeiden, und unterstützt `interrupt_response`. Es unterstützt vor allem Englisch (die Füllwortliste ist englisch); `azure_semantic_vad_multilingual` ergänzt Sprachen wie Deutsch. `silence_duration_ms` liegt standardmäßig bei 500 ms.',
      },
    },
    {
      term: 'Audio enhancements',
      text: {
        en: '`input_audio_noise_reduction` with `azure_deep_noise_suppression` removes background noise; `input_audio_echo_cancellation` with `server_echo_cancellation` removes the agent’s own voice picked up from a speaker, so the client needs no echo cancellation of its own.',
        de: '`input_audio_noise_reduction` mit `azure_deep_noise_suppression` entfernt Hintergrundgeräusche; `input_audio_echo_cancellation` mit `server_echo_cancellation` entfernt die eigene Stimme des Agents, die über einen Lautsprecher ins Mikrofon gelangt – der Client braucht keine eigene Echounterdrückung.',
      },
    },
    {
      term: 'Input transcription and customization',
      text: {
        en: 'Text models and agents can’t hear, so Voice Live transcribes the input with `azure-speech` (`input_audio_transcription.model`, active automatically). You tune that transcript with a `phrase_list` (words boosted per session, no training) or `custom_speech` (locale → model ID on the same Foundry resource). Native audio models hear the audio themselves; transcription for them (for example `gpt-4o-mini-transcribe`) runs separately and only gives you the user’s words as text — a rough guide for captions or logs.',
        de: 'Textmodelle und Agents können nicht hören, deshalb transkribiert Voice Live die Eingabe mit `azure-speech` (`input_audio_transcription.model`, automatisch aktiv). Dieses Transkript verbesserst du mit einer `phrase_list` (pro Session verstärkte Wörter, ohne Training) oder `custom_speech` (Gebietsschema → Modell-ID auf derselben Foundry-Ressource). Native Audiomodelle hören das Audio selbst; eine Transkription für sie (zum Beispiel `gpt-4o-mini-transcribe`) läuft getrennt und liefert dir nur die Worte des Nutzers als Text – ein grober Anhaltspunkt für Untertitel oder Logs.',
      },
    },
    {
      term: 'Voices',
      text: {
        en: '`voice` sets the output voice: `azure-standard` for neural and HD voices (HD voices accept `temperature`; `rate` from 0.5 to 1.5 changes the speed) and `azure-custom` plus `endpoint_id` for a professional custom voice, which requires approved limited access.',
        de: '`voice` legt die Ausgabestimme fest: `azure-standard` für neuronale und HD-Stimmen (HD-Stimmen akzeptieren `temperature`; `rate` von 0,5 bis 1,5 ändert das Tempo) und `azure-custom` plus `endpoint_id` für eine professionelle Custom Voice, die einen genehmigten eingeschränkten Zugang erfordert.',
      },
    },
    {
      term: 'Voice Live with a Foundry agent',
      text: {
        en: 'Instead of a model, the client connects with `agent_name`, `project_name` and a Microsoft Entra ID credential (keys aren’t supported in agent mode). The agent’s model is your own deployment in the project. For new voice experiences, Foundry voice agents (preview) keep model, voice, greeting and tools in one voice agent definition that runs on Voice Live.',
        de: 'Statt mit einem Modell verbindet sich der Client mit `agent_name`, `project_name` und einer Microsoft-Entra-ID-Anmeldung (Keys werden im Agent-Modus nicht unterstützt). Das Modell des Agents ist dein eigenes Deployment im Projekt. Für neue Sprachanwendungen bündeln Foundry-Voice-Agents (Preview) Modell, Stimme, Begrüßung und Tools in einer Voice-Agent-Definition, die auf Voice Live läuft.',
      },
    },
  ],
  comparison: {
    title: { en: 'Native audio or cascaded?', de: 'Natives Audio oder kaskadiert?' },
    columns: [
      { en: 'Option', de: 'Option' },
      { en: 'Audio path', de: 'Audioweg' },
      { en: 'Choose it for', de: 'Wähle es für' },
      { en: 'Trade-off', de: 'Nachteil' },
    ],
    rows: [
      [
        { en: 'Native audio model (`gpt-realtime`)', de: 'Natives Audiomodell (`gpt-realtime`)' },
        { en: 'The model hears and speaks the audio itself', de: 'Das Modell hört und spricht das Audio selbst' },
        { en: 'Natural, low-latency conversation', de: 'Natürliche Gespräche mit geringer Latenz' },
        { en: 'Phrase lists and custom speech don’t shape what the model hears', de: 'Phrasenlisten und Custom Speech beeinflussen nicht, was das Modell hört' },
      ],
      [
        { en: 'Cascaded text model (`gpt-5-mini`)', de: 'Kaskadiertes Textmodell (`gpt-5-mini`)' },
        { en: '`azure-speech` → text model → Azure voice', de: '`azure-speech` → Textmodell → Azure-Stimme' },
        { en: 'Broad model and voice choice; control over transcription, phrase lists, custom speech and turn detection', de: 'Große Modell- und Stimmauswahl; Kontrolle über Transkription, Phrasenlisten, Custom Speech und Turn-Erkennung' },
        { en: 'Each stage adds latency', de: 'Jede Stufe erhöht die Latenz' },
      ],
      [
        { en: 'Foundry text agent (agent mode)', de: 'Foundry-Textagent (Agent-Modus)' },
        { en: 'Cascaded, with the agent and its model deployment in the middle', de: 'Kaskadiert, mit dem Agent und seinem Modell-Deployment in der Mitte' },
        { en: 'Adding voice to an existing agent with its instructions and tools', de: 'Einem bestehenden Agent mit Anweisungen und Tools eine Stimme geben' },
        { en: 'Entra ID only; no `instructions` in `session.update`', de: 'Nur Entra ID; keine `instructions` in `session.update`' },
      ],
      [
        { en: 'Foundry voice agent (preview)', de: 'Foundry-Voice-Agent (Preview)' },
        { en: 'Native or cascaded, derived from the chosen model', de: 'Nativ oder kaskadiert, abgeleitet vom gewählten Modell' },
        { en: 'New voice experiences with built-in telephony, voice-pipeline tracing or service-managed models', de: 'Neue Sprachanwendungen mit integrierter Telefonie, Tracing der Sprach-Pipeline oder dienstverwalteten Modellen' },
        { en: 'Preview: check support before production', de: 'Preview: vor dem Produktiveinsatz den Support prüfen' },
      ],
    ],
  },
  code: [
    {
      title: { en: 'Voice Live session with a model (async Python)', de: 'Voice-Live-Session mit einem Modell (async Python)' },
      code: `import asyncio, os
from azure.identity.aio import DefaultAzureCredential
from azure.ai.voicelive.aio import connect
from azure.ai.voicelive.models import (
    RequestSession, Modality, InputAudioFormat, OutputAudioFormat, AzureStandardVoice,
    AzureSemanticVad, AudioNoiseReduction, AudioEchoCancellation, ServerEventType,
)

# Stubs for your audio helpers (for example with PyAudio):
def start_microphone(conn): ...  # send base64 PCM16 via conn.input_audio_buffer.append(audio=...)
def stop_playback(): ...         # drop queued speaker audio
def play(audio): ...             # queue one chunk for the speaker

async def main():
    credential = DefaultAzureCredential()
    try:
        async with connect(
            endpoint=os.environ["AZURE_VOICELIVE_ENDPOINT"],  # resource endpoint
            credential=credential,
            model="gpt-realtime",                              # fully managed, no deployment
        ) as conn:
            await conn.session.update(session=RequestSession(
                modalities=[Modality.TEXT, Modality.AUDIO],
                instructions="You are a friendly store assistant. Keep answers short.",
                voice=AzureStandardVoice(name="en-US-Ava:DragonHDLatestNeural"),
                input_audio_format=InputAudioFormat.PCM16,
                output_audio_format=OutputAudioFormat.PCM16,
                turn_detection=AzureSemanticVad(silence_duration_ms=500),
                input_audio_noise_reduction=AudioNoiseReduction(type="azure_deep_noise_suppression"),
                input_audio_echo_cancellation=AudioEchoCancellation(),
            ))
            async for event in conn:
                if event.type == ServerEventType.SESSION_UPDATED:
                    start_microphone(conn)  # settings apply now: start streaming
                elif event.type == ServerEventType.INPUT_AUDIO_BUFFER_SPEECH_STARTED:
                    stop_playback()         # barge-in: the user is talking
                elif event.type == ServerEventType.RESPONSE_AUDIO_DELTA:
                    play(event.delta)       # next chunk of the spoken reply
                elif event.type == ServerEventType.ERROR:
                    print(event.error.message)
    finally:
        await credential.close()

asyncio.run(main())`,
      notes: [
        {
          en: 'The Python SDK is async-only since version 1.0.0; `connect()` opens the WebSocket session and yields typed server events.',
          de: 'Das Python SDK ist seit Version 1.0.0 rein asynchron; `connect()` öffnet die WebSocket-Session und liefert typisierte Server-Events.',
        },
        {
          en: 'The training module uses `model="gpt-4o"` (now deprecated) and `ServerVad` (still fine). `AzureSemanticVad` detects the end of a turn from meaning and can ignore filler words.',
          de: 'Das Trainingsmodul nutzt `model="gpt-4o"` (inzwischen veraltet) und `ServerVad` (weiterhin in Ordnung). `AzureSemanticVad` erkennt das Turn-Ende anhand der Bedeutung und kann Füllwörter ignorieren.',
        },
        {
          en: 'Keyless access to Voice Live needs the Cognitive Services User and Foundry User roles; tokens use the scope `https://ai.azure.com/.default`. Roles differ by API: for the Speech SDK, use Cognitive Services Speech User.',
          de: 'Schlüsselloser Zugriff auf Voice Live braucht die Rollen Cognitive Services User und Foundry User; Tokens nutzen den Scope `https://ai.azure.com/.default`. Die Rollen unterscheiden sich je API: Für das Speech SDK nutzt du Cognitive Services Speech User.',
        },
      ],
    },
    {
      title: { en: 'Connect Voice Live to a Foundry agent', de: 'Voice Live mit einem Foundry-Agent verbinden' },
      code: `import asyncio, os
from azure.identity.aio import AzureCliCredential
from azure.ai.voicelive.aio import connect
from azure.ai.voicelive.models import RequestSession, Modality, InputAudioFormat, OutputAudioFormat

async def talk_to_agent():
    async with connect(
        endpoint=os.environ["AZURE_VOICELIVE_ENDPOINT"],
        credential=AzureCliCredential(),        # agent mode: Microsoft Entra ID only
        api_version="2026-01-01-preview",
        agent_name="store-assistant",
        project_name="contoso-retail",
        # agent_version="3", conversation_id="<id>"   # optional
    ) as conn:
        # The agent owns instructions and tools; voice, VAD and noise settings
        # can come from the agent's Voice Live metadata.
        await conn.session.update(session=RequestSession(
            modalities=[Modality.TEXT, Modality.AUDIO],
            input_audio_format=InputAudioFormat.PCM16,
            output_audio_format=OutputAudioFormat.PCM16,
        ))
        async for event in conn:
            ...                                  # same event handling as above

asyncio.run(talk_to_agent())`,
      notes: [
        {
          en: 'The training module passes `agent_config={"agent_name": …, "project_name": …}`; the current quickstart passes the same values as keyword arguments of `connect()`.',
          de: 'Das Trainingsmodul übergibt `agent_config={"agent_name": …, "project_name": …}`; der aktuelle Quickstart übergibt dieselben Werte als Schlüsselwortargumente von `connect()`.',
        },
        {
          en: 'Store voice settings with the agent: the JSON goes into the agent version’s metadata in chunks of 512 characters — `microsoft.voice-live.configuration`, then `microsoft.voice-live.configuration.1`, `.2` and so on.',
          de: 'Speichere Spracheinstellungen beim Agent: Das JSON kommt in Blöcken zu 512 Zeichen in die Metadaten der Agent-Version – `microsoft.voice-live.configuration`, dann `microsoft.voice-live.configuration.1`, `.2` und so weiter.',
        },
      ],
    },
    {
      title: { en: 'Tune input transcription (phrase list, custom speech)', de: 'Eingabetranskription anpassen (Phrasenliste, Custom Speech)' },
      code: `from azure.ai.voicelive.models import RequestSession, AudioInputTranscriptionOptions, AzureSemanticVadMultilingual

async def tune_input(conn):                                  # conn: the connection from connect(...)
    await conn.session.update(session=RequestSession(
        input_audio_transcription=AudioInputTranscriptionOptions(
            model="azure-speech",                            # text models and agents (active by default)
            language="de-DE",
            phrase_list=["Contoso", "Akkuschrauber X2"],    # boost words, no training
            # custom_speech={"de-DE": "<custom-speech-model-id>"},  # optional: your trained model
        ),
        turn_detection=AzureSemanticVadMultilingual(),     # azure_semantic_vad is mainly English
    ))`,
      notes: [
        {
          en: 'You can put these fields into the first `session.update`. The custom speech model must be on the same Foundry resource as Voice Live.',
          de: 'Diese Felder kannst du schon ins erste `session.update` schreiben. Das Custom-Speech-Modell muss auf derselben Foundry-Ressource wie Voice Live liegen.',
        },
      ],
    },
  ],
  traps: [
    {
      en: 'In model mode you don’t deploy anything — Voice Live models are fully managed; you just name one (`model=…`). In agent mode, the agent’s model is your own deployment.',
      de: 'Im Modellmodus stellst du nichts bereit – Voice-Live-Modelle sind vollständig verwaltet; du nennst einfach eines (`model=…`). Im Agent-Modus ist das Modell des Agents dein eigenes Deployment.',
    },
    {
      en: 'Agent mode needs Microsoft Entra ID — API keys aren’t supported for agent invocation — and `instructions` in `session.update` aren’t supported with an agent.',
      de: 'Der Agent-Modus braucht Microsoft Entra ID – API-Keys werden für den Agent-Aufruf nicht unterstützt –, und `instructions` in `session.update` werden mit einem Agent nicht unterstützt.',
    },
    {
      en: '`semantic_vad` works only with `gpt-realtime` models; `azure_semantic_vad` works with all models but primarily supports English — use `azure_semantic_vad_multilingual` for German. Without a setting, `server_vad` applies.',
      de: '`semantic_vad` funktioniert nur mit `gpt-realtime`-Modellen; `azure_semantic_vad` funktioniert mit allen Modellen, unterstützt aber vor allem Englisch – für Deutsch nimmst du `azure_semantic_vad_multilingual`. Ohne Einstellung gilt `server_vad`.',
    },
    {
      en: 'Custom speech in Voice Live works only with `azure-speech` transcription, and the model must be on the same Foundry resource — copy it there if it was trained elsewhere.',
      de: 'Custom Speech funktioniert in Voice Live nur mit der Transkription `azure-speech`, und das Modell muss auf derselben Foundry-Ressource liegen – kopiere es dorthin, wenn es woanders trainiert wurde.',
    },
    {
      en: 'On `input_audio_buffer.speech_started`, clear the playback queue; a client that keeps playing makes the agent talk over the user.',
      de: 'Bei `input_audio_buffer.speech_started` leerst du die Wiedergabe-Warteschlange; ein Client, der weiterspielt, lässt den Agent dem Nutzer ins Wort fallen.',
    },
  ],
  takeaways: [
    {
      en: 'Voice Live = one managed speech-to-speech session: audio in, audio out, events in between.',
      de: 'Voice Live = eine verwaltete Speech-to-Speech-Session: Audio rein, Audio raus, Events dazwischen.',
    },
    {
      en: 'Configure with `session.update`; react to `speech_started`, `response.audio.delta` and `response.done`.',
      de: 'Mit `session.update` konfigurieren; auf `speech_started`, `response.audio.delta` und `response.done` reagieren.',
    },
    {
      en: 'Customize input with `phrase_list` or `custom_speech` on `azure-speech`, output with `azure-standard` or `azure-custom` voices.',
      de: 'Eingabe mit `phrase_list` oder `custom_speech` auf `azure-speech` anpassen, Ausgabe mit `azure-standard`- oder `azure-custom`-Stimmen.',
    },
    {
      en: 'Native audio: `gpt-realtime` models; cascaded: text models such as `gpt-5-mini` and agents via `azure-speech`.',
      de: 'Natives Audio: `gpt-realtime`-Modelle; kaskadiert: Textmodelle wie `gpt-5-mini` und Agents über `azure-speech`.',
    },
  ],
  sources: [
    { title: 'Voice Live API for real-time voice agents', url: 'https://learn.microsoft.com/en-us/azure/ai-services/speech-service/voice-live' },
    { title: 'How to use the Voice Live API', url: 'https://learn.microsoft.com/en-us/azure/ai-services/speech-service/voice-live-how-to' },
    { title: 'How to customize Voice Live input and output', url: 'https://learn.microsoft.com/en-us/azure/ai-services/speech-service/voice-live-how-to-customize' },
    { title: 'Quickstart: Voice Live with Foundry Agent Service', url: 'https://learn.microsoft.com/en-us/azure/ai-services/speech-service/voice-live-agents-quickstart' },
    { title: 'Azure AI VoiceLive client library for Python', url: 'https://learn.microsoft.com/en-us/python/api/overview/azure/ai-voicelive-readme' },
  ],
}
