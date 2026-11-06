import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'video-generation',
  summary: {
    en: '**Sora 2** (preview model — check the retirement schedule for availability) is OpenAI\'s video model in Microsoft Foundry. It turns a text prompt — optionally with a reference image for the first frame — into a short video with audio, and it can **remix** a finished video with a targeted change. Because rendering takes minutes, the API is **asynchronous**: `videos.create()` returns a job with status `queued`, you poll `videos.retrieve()` until the status is `completed` (or `failed`), and then `videos.download_content()` saves the MP4 — within 24 hours of job creation. The controls are deliberately few: `size` (`1280x720` landscape or `720x1280` portrait), `seconds` (a string: `"4"`, `"8"` or `"12"`), `input_reference` and remix. Built-in safety rejects real people, human faces in input images, copyrighted characters and music, and content that is not suitable for audiences under 18.',
    de: '**Sora 2** (Preview-Modell – prüfe die Verfügbarkeit im Retirement-Zeitplan) ist das Videomodell von OpenAI in Microsoft Foundry. Es macht aus einem Text-Prompt – optional mit einem Referenzbild für den ersten Frame – ein kurzes Video mit Ton und kann ein fertiges Video per **Remix** gezielt ändern. Weil das Rendern Minuten dauert, arbeitet die API **asynchron**: `videos.create()` liefert einen Job mit Status `queued`, du fragst `videos.retrieve()` ab, bis der Status `completed` (oder `failed`) ist, und speicherst das MP4 dann mit `videos.download_content()` – innerhalb von 24 Stunden ab Job-Erstellung. Die Parameter sind bewusst wenige: `size` (`1280x720` quer oder `720x1280` hoch), `seconds` (ein String: `"4"`, `"8"` oder `"12"`), `input_reference` und Remix. Eingebaute Sicherheitsregeln lehnen reale Personen, menschliche Gesichter in Eingabebildern, urheberrechtlich geschützte Figuren und Musik sowie Inhalte ab, die nicht für Personen unter 18 geeignet sind.',
  },
  examFocus: {
    en: 'Expect to order the asynchronous flow, to pick the right SDK call (`videos.create`, `videos.retrieve`, `videos.download_content`, `videos.remix`), to choose `size`, `seconds` and `input_reference` for a requirement — remembering that the reference image must match the size exactly and that the defaults are a 4-second portrait clip — to apply remix best practice (one focused change), to write shot-style prompts and to know which requests Sora 2 rejects.',
    de: 'Rechne damit, den asynchronen Ablauf zu ordnen, den richtigen SDK-Aufruf zu wählen (`videos.create`, `videos.retrieve`, `videos.download_content`, `videos.remix`), `size`, `seconds` und `input_reference` passend zu einer Anforderung zu setzen – das Referenzbild muss exakt zur Größe passen, und ohne Angaben entsteht ein 4-Sekunden-Clip im Hochformat –, Remix richtig einzusetzen (eine gezielte Änderung), Prompts wie eine Shot-Beschreibung zu formulieren und zu wissen, welche Anfragen Sora 2 ablehnt.',
  },
  diagrams: [
    {
      id: 'sora-job-flow',
      title: { en: 'The asynchronous video job', de: 'Der asynchrone Video-Job' },
      caption: {
        en: 'Create a job, poll its status, then download or remix the completed video. Sora 2 is a preview model — check the retirement schedule for availability.',
        de: 'Job anlegen, Status abfragen, dann das fertige Video herunterladen oder remixen. Sora 2 ist ein Preview-Modell – prüfe die Verfügbarkeit im Retirement-Zeitplan.',
      },
      width: 960,
      height: 440,
      groups: [
        { id: 'g-res', x: 750, y: 10, w: 200, h: 120, label: 'Foundry resource', tone: 'foundry' },
      ],
      nodes: [
        { id: 'prompt', x: 20, y: 40, w: 220, h: 70, label: { en: 'Prompt + settings', de: 'Prompt + Einstellungen' }, sub: { en: 'size · seconds\n+ optional input_reference', de: 'size · seconds\n+ optionale input_reference' }, tone: 'user', shape: 'pill' },
        { id: 'create', x: 290, y: 40, w: 200, h: 70, label: 'videos.create', sub: { en: 'returns id · status queued', de: 'liefert id · Status queued' }, tone: 'app' },
        { id: 'sora', x: 770, y: 40, w: 170, h: 70, label: 'sora-2', sub: { en: 'preview · check the\nretirement schedule', de: 'Preview · prüfe den\nRetirement-Zeitplan' }, tone: 'model' },
        { id: 'fail', x: 20, y: 190, w: 200, h: 80, label: { en: 'Failure', de: 'Fehler' }, sub: { en: 'catch the exception\nor read video.error', de: 'Ausnahme abfangen\noder video.error lesen' }, tone: 'safety' },
        { id: 'poll', x: 290, y: 190, w: 200, h: 80, label: { en: 'Status?', de: 'Status?' }, tone: 'neutral', shape: 'diamond' },
        { id: 'done', x: 550, y: 195, w: 180, h: 70, label: { en: 'Completed video', de: 'Fertiges Video' }, sub: 'video.id', tone: 'data', shape: 'pill' },
        { id: 'download', x: 780, y: 195, w: 160, h: 70, label: 'download_content', sub: 'variant="video"', tone: 'app' },
        { id: 'wait', x: 290, y: 340, w: 200, h: 70, label: { en: 'Wait, then retrieve', de: 'Warten, dann abrufen' }, sub: { en: 'videos.retrieve(video.id)\nwhile queued · in_progress', de: 'videos.retrieve(video.id)\nbei queued · in_progress' }, tone: 'neutral', shape: 'pill' },
        { id: 'remix', x: 550, y: 340, w: 180, h: 70, label: 'videos.remix', sub: { en: 'new job · one change', de: 'neuer Job · 1 Änderung' }, tone: 'app' },
        { id: 'mp4', x: 780, y: 340, w: 160, h: 70, label: 'MP4', sub: { en: 'until 24 h after\njob creation', de: 'bis 24 h nach\nJob-Erstellung' }, tone: 'data', shape: 'doc' },
      ],
      edges: [
        { id: 'e1', from: 'prompt', to: 'create' },
        { id: 'e2', from: 'create', to: 'sora', label: { en: 'async job', de: 'asynchroner Job' } },
        { id: 'e3', from: 'create', to: 'poll' },
        { id: 'e400', from: 'create', to: 'fail', label: 'HTTP 400' },
        { id: 'e4', from: 'poll', to: 'wait', bidir: true },
        { id: 'e6', from: 'poll', to: 'fail', label: 'failed' },
        { id: 'e5', from: 'poll', to: 'done' },
        { id: 'e7', from: 'done', to: 'download' },
        { id: 'e10', from: 'download', to: 'mp4' },
        { id: 'e8', from: 'done', to: 'remix', label: 'video_id' },
        { id: 'e9', from: 'remix', to: 'poll', label: { en: 'new job', de: 'neuer Job' } },
      ],
      steps: [
        {
          title: { en: 'Create the job', de: 'Job anlegen' },
          text: {
            en: '`videos.create(model, prompt, size, seconds, input_reference)` returns at once with a video `id` and status `queued`; the sora-2 deployment (a preview model) renders in the background for about 1–5 minutes.',
            de: '`videos.create(model, prompt, size, seconds, input_reference)` kommt sofort mit einer Video-`id` und dem Status `queued` zurück; das sora-2-Deployment (ein Preview-Modell) rendert etwa 1–5 Minuten im Hintergrund.',
          },
          focus: ['prompt', 'e1', 'create', 'e2', 'sora'],
        },
        {
          title: { en: 'Poll the status', de: 'Status abfragen' },
          text: {
            en: 'Call `videos.retrieve(video.id)` about every 20 seconds while the status is `queued` or `in_progress`. With the `AsyncOpenAI` client, `await client.videos.create_and_poll(model=…, prompt=…)` (inside an `async def`) wraps this loop.',
            de: 'Rufe etwa alle 20 Sekunden `videos.retrieve(video.id)` auf, solange der Status `queued` oder `in_progress` ist. Mit dem Client `AsyncOpenAI` kapselt `await client.videos.create_and_poll(model=…, prompt=…)` (in einer `async def`) diese Schleife.',
          },
          focus: ['e3', 'poll', 'e4', 'wait'],
        },
        {
          title: { en: 'Handle failures', de: 'Fehler behandeln' },
          text: {
            en: 'Two kinds of failure: a request the API can\'t accept (for example an unsupported size) fails at once with HTTP 400, so `videos.create()` raises; a content-policy violation — such as a real person or a face in the reference image — typically ends the job as `failed`. Read `video.error` and change the prompt or input.',
            de: 'Zwei Fehlerarten: Eine Anfrage, die die API nicht annimmt (etwa eine nicht unterstützte Größe), scheitert sofort mit HTTP 400 – `videos.create()` löst also eine Ausnahme aus; ein Verstoß gegen Inhaltsregeln – etwa eine reale Person oder ein Gesicht im Referenzbild – beendet den Job in der Regel als `failed`. Lies `video.error` und ändere Prompt oder Eingabe.',
          },
          focus: ['e400', 'e6', 'fail'],
        },
        {
          title: { en: 'Download in time', de: 'Rechtzeitig herunterladen' },
          text: {
            en: 'When the status is `completed`, `videos.download_content(video.id, variant="video")` returns the MP4 and `write_to_file()` saves it. A job and its video stay available for 24 hours after the job was created.',
            de: 'Ist der Status `completed`, liefert `videos.download_content(video.id, variant="video")` das MP4, und `write_to_file()` speichert es. Job und Video bleiben 24 Stunden nach dem Anlegen des Jobs abrufbar.',
          },
          focus: ['e5', 'done', 'e7', 'download', 'e10', 'mp4'],
        },
        {
          title: { en: 'Remix for targeted edits', de: 'Remix für gezielte Änderungen' },
          text: {
            en: 'A remix needs only the `id` of a completed video — not the downloaded file. `videos.remix(video_id, prompt)` starts a new job that keeps the structure, motion and framing and applies one focused change; you poll it like any other job.',
            de: 'Ein Remix braucht nur die `id` eines fertigen Videos – nicht die heruntergeladene Datei. `videos.remix(video_id, prompt)` startet einen neuen Job, der Struktur, Bewegung und Bildausschnitt beibehält und eine gezielte Änderung anwendet; du fragst ihn ab wie jeden anderen Job.',
          },
          focus: ['done', 'e8', 'remix', 'e9'],
        },
      ],
    },
    {
      id: 'sora-three-inputs',
      title: { en: 'Three ways to start a Sora 2 video', de: 'Drei Wege zu einem Sora-2-Video' },
      caption: {
        en: 'Text to video, image to video with input_reference, and video to video with remix.',
        de: 'Text zu Video, Bild zu Video mit input_reference und Video zu Video mit Remix.',
      },
      width: 960,
      height: 420,
      nodes: [
        { id: 'r1in', x: 20, y: 30, w: 200, h: 60, label: { en: 'Text prompt', de: 'Text-Prompt' }, sub: { en: 'shot · subject · action', de: 'Shot · Motiv · Aktion' }, tone: 'user', shape: 'pill' },
        { id: 'r1call', x: 290, y: 30, w: 210, h: 60, label: 'videos.create', sub: 'size · seconds', tone: 'app' },
        { id: 'r1out', x: 570, y: 30, w: 170, h: 60, label: { en: 'New clip', de: 'Neuer Clip' }, sub: { en: '4, 8 or 12 s + audio', de: '4, 8 oder 12 s + Audio' }, tone: 'data', shape: 'doc' },
        { id: 'r2in', x: 20, y: 170, w: 200, h: 70, label: { en: 'Reference image', de: 'Referenzbild' }, sub: { en: 'exact size, no faces', de: 'exakte Größe, keine Gesichter' }, tone: 'data', shape: 'doc' },
        { id: 'r2call', x: 290, y: 170, w: 210, h: 70, label: 'videos.create', sub: '+ input_reference', tone: 'app' },
        { id: 'r2out', x: 570, y: 170, w: 170, h: 70, label: { en: 'Image in motion', de: 'Bild in Bewegung' }, sub: { en: 'image = first frame', de: 'Bild = erster Frame' }, tone: 'data', shape: 'doc' },
        { id: 'r3in', x: 20, y: 320, w: 200, h: 70, label: { en: 'Completed video', de: 'Fertiges Video' }, sub: { en: 'any completed Sora video', de: 'jedes fertige Sora-Video' }, tone: 'data', shape: 'pill' },
        { id: 'r3call', x: 290, y: 320, w: 210, h: 70, label: 'videos.remix', sub: { en: 'one focused change', de: 'eine gezielte Änderung' }, tone: 'app' },
        { id: 'r3out', x: 570, y: 320, w: 170, h: 70, label: { en: 'Remixed clip', de: 'Remix-Clip' }, sub: { en: 'same framing', de: 'gleiche Bildführung' }, tone: 'data', shape: 'doc' },
      ],
      edges: [
        { id: 'e-r1a', from: 'r1in', to: 'r1call' },
        { id: 'e-r1b', from: 'r1call', to: 'r1out' },
        { id: 'e-r2a', from: 'r2in', to: 'r2call' },
        { id: 'e-r2b', from: 'r2call', to: 'r2out' },
        { id: 'e-r3a', from: 'r3in', to: 'r3call', label: 'video_id' },
        { id: 'e-r3b', from: 'r3call', to: 'r3out' },
        { id: 'e-loop', from: 'r1out', to: 'r3in', label: 'video.id', dashed: true, via: [[770, 60], [770, 280], [120, 280]] },
        { id: 'e-loop2', from: 'r2out', to: 'r3in', dashed: true, via: [[770, 205], [770, 280], [120, 280]] },
      ],
      steps: [
        {
          title: { en: 'Text → video', de: 'Text → Video' },
          text: {
            en: 'Describe the shot like a cinematographer: framing, subject, action in beats, lighting and style. Sora 2 also generates audio, so you can put a spoken line in quotes.',
            de: 'Beschreibe den Shot wie für ein Kamerateam: Bildausschnitt, Motiv, Aktion in Schritten, Licht und Stil. Sora 2 erzeugt auch Ton – du kannst also einen gesprochenen Satz in Anführungszeichen vorgeben.',
          },
          focus: ['r1in', 'e-r1a', 'r1call', 'e-r1b', 'r1out'],
        },
        {
          title: { en: 'Image → video', de: 'Bild → Video' },
          text: {
            en: '`input_reference` takes one JPEG, PNG or WebP image as the anchor for the first frame; the prompt says what happens next. The image must match `size` exactly (1280x720 or 720x1280), and images with human faces are currently rejected.',
            de: '`input_reference` nimmt ein JPEG-, PNG- oder WebP-Bild als Anker für den ersten Frame; der Prompt sagt, was danach passiert. Das Bild muss exakt zu `size` passen (1280x720 oder 720x1280), und Bilder mit menschlichen Gesichtern werden derzeit abgelehnt.',
          },
          focus: ['r2in', 'e-r2a', 'r2call', 'e-r2b', 'r2out'],
        },
        {
          title: { en: 'Video → video (remix)', de: 'Video → Video (Remix)' },
          text: {
            en: 'Take the `id` of any completed Sora video — made from text or from an image — and call `videos.remix(video_id=…, prompt=…)`. Describe only what should change — one clear adjustment keeps the result faithful to the original.',
            de: 'Nimm die `id` eines beliebigen fertigen Sora-Videos – aus Text oder aus einem Bild erzeugt – und rufe `videos.remix(video_id=…, prompt=…)` auf. Beschreibe nur, was sich ändern soll – eine klare Anpassung hält das Ergebnis nah am Original.',
          },
          focus: ['e-loop', 'e-loop2', 'r3in', 'e-r3a', 'r3call', 'e-r3b', 'r3out'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'Sora 2 (preview)',
      text: {
        en: 'OpenAI\'s video generation model in Foundry (model ID `sora-2`). It supports text → video, image → video and generated video → video (remix), generates audio, uses the Azure OpenAI v1 API and is billed per second of video.',
        de: 'Das Videogenerierungsmodell von OpenAI in Foundry (Modell-ID `sora-2`). Es unterstützt Text → Video, Bild → Video und generiertes Video → Video (Remix), erzeugt Ton, nutzt die Azure-OpenAI-v1-API und wird pro Videosekunde abgerechnet.',
      },
    },
    {
      term: 'Asynchronous video job',
      text: {
        en: '`videos.create()` returns a video object with an `id` and status `queued`. You poll `videos.retrieve()` through `in_progress` until `completed`, `failed` or `cancelled`. Rendering takes about 1–5 minutes. Limit: at most two creation jobs can run at the same time — wait until one finishes before you create another.',
        de: '`videos.create()` liefert ein Video-Objekt mit `id` und Status `queued`. Du fragst `videos.retrieve()` über `in_progress` ab, bis `completed`, `failed` oder `cancelled` erreicht ist. Das Rendern dauert etwa 1–5 Minuten. Limit: Höchstens zwei Erstellungsjobs laufen gleichzeitig – warte, bis einer fertig ist, bevor du den nächsten anlegst.',
      },
    },
    {
      term: 'size and seconds',
      text: {
        en: '`size` is `"720x1280"` (portrait, the default) or `"1280x720"` (landscape). `seconds` is a string, too: `"4"` (the default), `"8"` or `"12"`. Shorter clips follow instructions more reliably, so two 4-second clips can beat one 8-second clip.',
        de: '`size` ist `"720x1280"` (Hochformat, Standard) oder `"1280x720"` (Querformat). Auch `seconds` ist ein String: `"4"` (Standard), `"8"` oder `"12"`. Kürzere Clips folgen Anweisungen zuverlässiger – zwei 4-Sekunden-Clips können besser sein als ein 8-Sekunden-Clip.',
      },
    },
    {
      term: 'input_reference',
      text: {
        en: 'A single reference image (JPEG, PNG or WebP) that anchors the first frame while the prompt describes what happens next. Its resolution must match the requested `size` exactly.',
        de: 'Ein einzelnes Referenzbild (JPEG, PNG oder WebP), das den ersten Frame verankert, während der Prompt beschreibt, was danach passiert. Seine Auflösung muss exakt zur angeforderten `size` passen.',
      },
    },
    {
      term: 'Remix',
      text: {
        en: '`videos.remix(video_id=…, prompt=…)` reuses the structure, motion, framing and scene transitions of a **completed Sora video** — you can\'t upload your own clip — and applies your change; the new video reports `remixed_from_video_id`. The documented call takes only `video_id` and `prompt` (no `size` or `seconds`). Narrow, single changes keep the highest fidelity.',
        de: '`videos.remix(video_id=…, prompt=…)` übernimmt Struktur, Bewegung, Bildausschnitt und Szenenübergänge eines **fertigen Sora-Videos** – eigene Clips kannst du nicht hochladen – und wendet deine Änderung an; das neue Video meldet `remixed_from_video_id`. Der dokumentierte Aufruf nimmt nur `video_id` und `prompt` (kein `size` oder `seconds`). Enge, einzelne Änderungen erhalten die höchste Treue.',
      },
    },
    {
      term: 'Sora 2 content restrictions',
      text: {
        en: 'On top of input and output moderation, Sora 2 accepts only content suitable for audiences under 18, rejects copyrighted characters and copyrighted music, cannot generate real people (including public figures) and rejects input images with human faces.',
        de: 'Zusätzlich zur Moderation von Ein- und Ausgaben akzeptiert Sora 2 nur Inhalte, die für Personen unter 18 geeignet sind, lehnt urheberrechtlich geschützte Figuren und Musik ab, erzeugt keine realen Personen (auch keine Prominenten) und lehnt Eingabebilder mit menschlichen Gesichtern ab.',
      },
    },
    {
      term: 'Shot-style prompt',
      text: {
        en: 'Describe a shot like a storyboard: camera framing, subject details, action in beats, setting, lighting and palette, camera motion and style. Keep each prompt single-purpose and write it in English or another Latin-script language.',
        de: 'Beschreibe einen Shot wie ein Storyboard: Bildausschnitt, Motivdetails, Aktion in Schritten, Umgebung, Licht und Farbpalette, Kamerabewegung und Stil. Halte jeden Prompt auf ein Ziel fokussiert und schreibe ihn auf Englisch oder in einer anderen Sprache mit lateinischer Schrift.',
      },
    },
  ],
  comparison: {
    title: { en: 'Sora 2 controls at a glance', de: 'Sora-2-Parameter im Überblick' },
    columns: [
      { en: 'Control', de: 'Parameter' },
      { en: 'Values', de: 'Werte' },
      { en: 'Tip', de: 'Tipp' },
    ],
    rows: [
      ['size', { en: '"720x1280" (default) · "1280x720"', de: '"720x1280" (Standard) · "1280x720"' }, { en: 'Portrait for stories, landscape for web pages', de: 'Hochformat für Stories, Querformat für Webseiten' }],
      ['seconds', { en: 'String: "4" (default) · "8" · "12"', de: 'String: "4" (Standard) · "8" · "12"' }, { en: 'Shorter clips follow the prompt more reliably', de: 'Kürzere Clips folgen dem Prompt zuverlässiger' }],
      ['input_reference', { en: 'One JPEG, PNG or WebP image', de: 'Ein JPEG-, PNG- oder WebP-Bild' }, { en: 'Must match size exactly; no human faces', de: 'Muss exakt zu size passen; keine menschlichen Gesichter' }],
      ['videos.remix', { en: 'Completed video_id + prompt', de: 'Fertige video_id + Prompt' }, { en: 'One focused change per remix', de: 'Eine gezielte Änderung pro Remix' }],
      ['download_content', 'variant="video"', { en: 'Within 24 hours of job creation', de: 'Innerhalb von 24 Stunden ab Job-Erstellung' }],
    ],
  },
  code: [
    {
      title: { en: 'Create, poll and download a video (keyless)', de: 'Video erzeugen, abfragen und herunterladen (schlüssellos)' },
      code: `import time
from openai import OpenAI, BadRequestError
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

token_provider = get_bearer_token_provider(
    DefaultAzureCredential(), "https://ai.azure.com/.default"
)
client = OpenAI(
    base_url="https://<resource>.openai.azure.com/openai/v1/",
    api_key=token_provider,
)

try:
    video = client.videos.create(
        model="sora-2",                        # deployment name
        prompt="Wide shot at golden hour: a cyclist pedals three times, brakes and stops at a crosswalk",
        size="1280x720",
        seconds="8",
    )
except BadRequestError as err:                 # rejected at once, e.g. unsupported size
    raise SystemExit(f"Request rejected: {err}")

while video.status not in ("completed", "failed", "cancelled"):
    time.sleep(20)
    video = client.videos.retrieve(video.id)

if video.status == "completed":
    client.videos.download_content(video.id, variant="video").write_to_file("ride.mp4")
else:
    print(video.status, video.error)           # e.g. content-policy violation`,
      notes: [
        { en: '`model` takes your deployment name — a deployment can have any name. `videos.create()` only starts the job; the loop polls until a final status.', de: '`model` nimmt deinen Deployment-Namen – ein Deployment kann beliebig heißen. `videos.create()` startet nur den Job; die Schleife fragt bis zu einem Endstatus ab.' },
        { en: 'A job expires 24 hours after it was created, so download promptly; afterwards you must generate the video again.', de: 'Ein Job läuft 24 Stunden nach dem Anlegen ab – lade also zügig herunter; danach musst du das Video neu erzeugen.' },
      ],
    },
    {
      title: { en: 'Image to video, then remix', de: 'Bild zu Video, danach Remix' },
      code: `import time
from openai import OpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

client = OpenAI(
    base_url="https://<resource>.openai.azure.com/openai/v1/",
    api_key=get_bearer_token_provider(DefaultAzureCredential(), "https://ai.azure.com/.default"),
)

def wait(video):
    while video.status not in ("completed", "failed", "cancelled"):
        time.sleep(20)
        video = client.videos.retrieve(video.id)
    return video

with open("cup-1280x720.png", "rb") as still:          # must match size exactly
    first = wait(client.videos.create(model="sora-2", prompt="The camera slowly pushes in as steam rises",
                                      size="1280x720", seconds="4", input_reference=still))
if first.status != "completed":                          # remix needs a completed video
    raise SystemExit(f"{first.status}: {first.error}")

remix = wait(client.videos.remix(video_id=first.id, prompt="Same shot, new palette: teal, sand and rust"))
if remix.status == "completed":
    client.videos.download_content(remix.id, variant="video").write_to_file("cup-remix.mp4")
else:
    print(remix.status, remix.error)`,
      notes: [
        { en: 'The reference image anchors the first frame and must have exactly the requested size.', de: 'Das Referenzbild verankert den ersten Frame und muss exakt die angeforderte Größe haben.' },
        { en: 'Check the status before you remix or download: only a completed video can be remixed, and a remix can fail like any other job.', de: 'Prüfe den Status, bevor du remixt oder herunterlädst: Nur ein fertiges Video lässt sich remixen, und auch ein Remix kann wie jeder Job scheitern.' },
      ],
    },
  ],
  traps: [
    {
      en: '`videos.create()` does not return the video — it returns a job. Poll `videos.retrieve()` and call `download_content()` once the status is `completed`.',
      de: '`videos.create()` liefert nicht das Video, sondern einen Job. Frage `videos.retrieve()` ab und rufe `download_content()` auf, sobald der Status `completed` ist.',
    },
    {
      en: '`input_reference` must match the requested `size` exactly — resize a 2560×1440 photo to 1280×720 before you pass it.',
      de: '`input_reference` muss exakt zur angeforderten `size` passen – skaliere ein 2560×1440-Foto auf 1280×720, bevor du es übergibst.',
    },
    {
      en: 'Leaving out `size` and `seconds` gives you a 4-second portrait clip (720x1280).',
      de: 'Ohne `size` und `seconds` bekommst du einen 4-Sekunden-Clip im Hochformat (720x1280).',
    },
    {
      en: 'Remix needs the `id` of a completed video and works best with one change; calling `videos.create()` again starts from scratch and loses the original structure.',
      de: 'Remix braucht die `id` eines fertigen Videos und funktioniert am besten mit einer Änderung; ein neuer `videos.create()`-Aufruf beginnt bei null und verliert die Struktur des Originals.',
    },
    {
      en: 'Real people (including public figures), human faces in reference images, copyrighted characters and copyrighted music are rejected — such jobs fail by design.',
      de: 'Reale Personen (auch Prominente), menschliche Gesichter in Referenzbildern, geschützte Figuren und geschützte Musik werden abgelehnt – solche Jobs scheitern absichtlich.',
    },
  ],
  takeaways: [
    { en: 'create → retrieve (poll) → download_content, within 24 hours of job creation.', de: 'create → retrieve (abfragen) → download_content, innerhalb von 24 Stunden ab Job-Erstellung.' },
    { en: 'Set `size` and `seconds` explicitly instead of relying on the defaults.', de: 'Setze `size` und `seconds` explizit, statt dich auf die Standardwerte zu verlassen.' },
    { en: 'Image to video = `input_reference` with an image of exactly the target size.', de: 'Bild zu Video = `input_reference` mit einem Bild in exakt der Zielgröße.' },
    { en: 'Edit generated videos with `videos.remix()`, one change at a time.', de: 'Bearbeite generierte Videos mit `videos.remix()`, eine Änderung nach der anderen.' },
    { en: 'Prompt like a cinematographer and respect Sora 2\'s content rules.', de: 'Formuliere Prompts wie für ein Kamerateam und beachte die Inhaltsregeln von Sora 2.' },
  ],
  sources: [
    { title: 'Video generation with Sora 2 (preview)', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/video-generation' },
    { title: 'Foundry Models sold by Azure (video generation models)', url: 'https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure' },
    { title: 'Generate video from a prompt (training unit)', url: 'https://learn.microsoft.com/en-us/training/modules/generate-video-with-foundry/3-generate-video-from-prompt' },
    { title: 'Generate video in Python (training unit)', url: 'https://learn.microsoft.com/en-us/training/modules/generate-video-with-foundry/4-generate-video-in-python' },
  ],
}
