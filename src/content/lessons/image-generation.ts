import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'image-generation',
  summary: {
    en: 'An image generation model creates **original** images from a text prompt and, optionally, reference images — it does not search a picture catalog. In Microsoft Foundry you deploy such a model (Azure OpenAI GPT-image models such as gpt-image-2 or gpt-image-1-mini, or Black Forest Labs FLUX models), try it in the playground, and call it with the Images API: `images.generate()` for text-to-image and `images.edit()` when you pass input images, optionally with a **mask** that marks the area to repaint. Controls such as `size`, `quality`, `n`, `output_format` and `background` shape the result; which values work depends on the model. Guardrails filter both the prompt and the generated image, and supported models attach C2PA Content Credentials that let others check an image\'s AI origin — as long as post-processing keeps that metadata. `dall-e-3` and gpt-image-1 are retired.',
    de: 'Ein Bildgenerierungsmodell erzeugt **neue** Bilder aus einem Text-Prompt und optional aus Referenzbildern – es durchsucht keinen Bildkatalog. In Microsoft Foundry stellst du so ein Modell bereit (Azure-OpenAI-GPT-image-Modelle wie gpt-image-2 oder gpt-image-1-mini oder FLUX-Modelle von Black Forest Labs), probierst es im Playground aus und rufst es über die Images API auf: `images.generate()` für Text-zu-Bild und `images.edit()`, wenn du Eingabebilder mitgibst – optional mit einer **Maske**, die den neu zu malenden Bereich markiert. Parameter wie `size`, `quality`, `n`, `output_format` und `background` formen das Ergebnis; welche Werte gehen, hängt vom Modell ab. Guardrails filtern sowohl den Prompt als auch das erzeugte Bild, und unterstützte Modelle hängen C2PA-Content-Credentials an, mit denen andere die KI-Herkunft eines Bildes prüfen können – solange die Nachbearbeitung diese Metadaten erhält. `dall-e-3` und gpt-image-1 sind eingestellt.',
  },
  examFocus: {
    en: 'Expect to choose between `images.generate` and `images.edit`, to place a `mask` correctly (transparent pixels = edit), to pick controls for a requirement (transparent PNG, several variations, faster drafts, custom sizes per model, `input_fidelity` for faces), and to spot retired or unsupported options (`dall-e-3`, URL responses for GPT-image). Safety questions cover the two filter outcomes (blocked prompt vs filtered image), the default guardrail for image models, custom blocklists for brand terms and C2PA Content Credentials.',
    de: 'Rechne damit, zwischen `images.generate` und `images.edit` zu wählen, eine `mask` richtig zu setzen (transparente Pixel = ändern), Parameter für eine Anforderung auszuwählen (transparentes PNG, mehrere Varianten, schnellere Entwürfe, Größen je Modell, `input_fidelity` für Gesichter) und eingestellte oder nicht unterstützte Optionen zu erkennen (`dall-e-3`, URL-Antworten bei GPT-image). Sicherheitsfragen drehen sich um die zwei Filterergebnisse (blockierter Prompt vs. gefiltertes Bild), die Standard-Guardrail für Bildmodelle, eigene Blocklisten für Markenbegriffe und C2PA-Content-Credentials.',
  },
  diagrams: [
    {
      id: 'image-gen-big-picture',
      title: { en: 'From prompt to a verifiable image', de: 'Vom Prompt zum nachweisbaren Bild' },
      caption: {
        en: 'With a GPT-image deployment, text goes to images.generate; input images, the prompt and an optional mask go to images.edit. Filters check the request and the result; supported models attach Content Credentials.',
        de: 'Mit einem GPT-image-Deployment geht Text an images.generate; Eingabebilder, Prompt und optionale Maske gehen an images.edit. Filter prüfen Anfrage und Ergebnis; unterstützte Modelle hängen Content Credentials an.',
      },
      width: 960,
      height: 400,
      groups: [
        { id: 'g-app', x: 210, y: 10, w: 220, h: 260, label: { en: 'Your app', de: 'Deine App' }, tone: 'app' },
        { id: 'g-res', x: 470, y: 20, w: 250, h: 354, label: 'Foundry resource', tone: 'platform' },
      ],
      nodes: [
        { id: 'prompt', x: 20, y: 60, w: 170, h: 64, label: { en: 'Text prompt', de: 'Text-Prompt' }, sub: { en: 'content + style', de: 'Inhalt + Stil' }, icon: 'users', tone: 'user', shape: 'pill' },
        { id: 'ref', x: 20, y: 183, w: 170, h: 64, label: { en: 'Reference images', de: 'Referenzbilder' }, sub: { en: 'input image(s),\nrequired for edit', de: 'Eingabebild(er),\nPflicht für edit' }, icon: 'image', tone: 'data', shape: 'doc' },
        { id: 'mask', x: 20, y: 300, w: 170, h: 64, label: { en: 'Mask (optional)', de: 'Maske (optional)' }, sub: { en: 'PNG, same size\ntransparent = edit', de: 'PNG, gleiche Größe\ntransparent = ändern' }, icon: 'image', tone: 'data', shape: 'doc' },
        { id: 'gen', x: 230, y: 60, w: 180, h: 64, label: 'images.generate', sub: { en: 'text → image', de: 'Text → Bild' }, icon: 'code', tone: 'app' },
        { id: 'edit', x: 230, y: 180, w: 180, h: 70, label: 'images.edit', sub: 'image + mask + prompt', icon: 'code', tone: 'app' },
        { id: 'inGuard', x: 490, y: 60, w: 210, h: 64, label: { en: 'Input filter', de: 'Eingabefilter' }, sub: { en: 'prompt + input images', de: 'Prompt + Eingabebilder' }, icon: 'content-safety', tone: 'safety' },
        { id: 'model', x: 490, y: 170, w: 210, h: 70, label: { en: 'Image model', de: 'Bildmodell' }, sub: { en: 'GPT-image deployment\ne.g. gpt-image-2', de: 'GPT-image-Deployment\nz. B. gpt-image-2' }, icon: 'foundry-models', tone: 'model' },
        { id: 'outGuard', x: 490, y: 290, w: 210, h: 64, label: { en: 'Output filter', de: 'Ausgabefilter' }, sub: { en: 'generated image', de: 'erzeugtes Bild' }, icon: 'content-safety', tone: 'safety' },
        { id: 'cc', x: 760, y: 150, w: 180, h: 64, label: 'Content Credentials', sub: { en: 'signed C2PA manifest', de: 'signiertes C2PA-Manifest' }, icon: 'content-safety', tone: 'safety' },
        { id: 'out', x: 760, y: 280, w: 180, h: 80, label: { en: 'Generated image', de: 'Erzeugtes Bild' }, sub: 'b64_json', icon: 'image', tone: 'data', shape: 'doc' },
      ],
      edges: [
        { id: 'e-pg', from: 'prompt', to: 'gen' },
        { id: 'e-pe', from: 'prompt', to: 'edit' },
        { id: 'e-ref', from: 'ref', to: 'edit' },
        { id: 'e-mask', from: 'mask', to: 'edit', dashed: true },
        { id: 'e-gi', from: 'gen', to: 'inGuard' },
        { id: 'e-ei', from: 'edit', to: 'inGuard' },
        { id: 'e-im', from: 'inGuard', to: 'model', label: { en: 'allowed', de: 'erlaubt' } },
        { id: 'e-mo', from: 'model', to: 'outGuard' },
        { id: 'e-oo', from: 'outGuard', to: 'out' },
        { id: 'e-cc', from: 'model', to: 'cc', dashed: true },
        { id: 'e-cco', from: 'cc', to: 'out', label: { en: 'attached', de: 'angehängt' }, dashed: true },
      ],
      steps: [
        {
          title: { en: 'Describe what you want', de: 'Beschreibe, was du willst' },
          text: {
            en: '`images.generate()` turns a text prompt — subject plus visual style, up to 4,000 characters — into one or more new images. The model generates; it never looks images up in a catalog.',
            de: '`images.generate()` macht aus einem Text-Prompt – Motiv plus Bildstil, bis zu 4.000 Zeichen – ein oder mehrere neue Bilder. Das Modell erzeugt; es schlägt nie Bilder in einem Katalog nach.',
          },
          focus: ['prompt', 'e-pg', 'gen'],
        },
        {
          title: { en: 'Edit with references and a mask', de: 'Bearbeiten mit Referenzen und Maske' },
          text: {
            en: '`images.edit()` takes input images plus a prompt as a multipart upload. An optional PNG mask with the same dimensions marks the area to repaint: fully transparent pixels are edited, the rest is kept.',
            de: '`images.edit()` nimmt Eingabebilder plus Prompt als Multipart-Upload entgegen. Eine optionale PNG-Maske mit denselben Abmessungen markiert den neu zu malenden Bereich: Vollständig transparente Pixel werden bearbeitet, der Rest bleibt.',
          },
          focus: ['ref', 'mask', 'e-pe', 'e-ref', 'e-mask', 'edit'],
        },
        {
          title: { en: 'Input filter', de: 'Eingabefilter' },
          text: {
            en: 'Before rendering, the deployment\'s guardrail checks the prompt and input images: harm categories, jailbreak attempts, public figures, studio characters and profanity. A blocked prompt returns an error and no image.',
            de: 'Vor dem Rendern prüft die Guardrail des Deployments Prompt und Eingabebilder: Schadenskategorien, Jailbreak-Versuche, Personen des öffentlichen Lebens, Studio-Figuren und Obszönitäten. Ein blockierter Prompt liefert einen Fehler und kein Bild.',
          },
          focus: ['e-gi', 'e-ei', 'inGuard', 'e-im'],
        },
        {
          title: { en: 'The model renders', de: 'Das Modell rendert' },
          text: {
            en: 'A GPT-image model renders the image with your `size`, `quality`, `n`, `output_format` and `background` settings. gpt-image-1-mini and gpt-image-2 return base64 only (`b64_json`) — there is no URL to download. FLUX models sit outside this pipeline: Foundry provides no built-in content filtering for them, and through the Images API they return an image URL instead.',
            de: 'Ein GPT-image-Modell rendert das Bild mit deinen Einstellungen für `size`, `quality`, `n`, `output_format` und `background`. gpt-image-1-mini und gpt-image-2 liefern nur Base64 (`b64_json`) – eine Download-URL gibt es nicht. FLUX-Modelle laufen nicht durch diese Pipeline: Foundry bringt für sie keine eingebaute Inhaltsfilterung mit, und über die Images API liefern sie stattdessen eine Bild-URL.',
          },
          focus: ['model', 'e-mo'],
        },
        {
          title: { en: 'Output filter and provenance', de: 'Ausgabefilter und Herkunftsnachweis' },
          text: {
            en: 'The generated image is classified too; if it is filtered you get an error instead of the image. Supported models attach C2PA Content Credentials — a signed manifest that marks the image as AI-generated; Microsoft can also embed invisible watermarks.',
            de: 'Auch das erzeugte Bild wird klassifiziert; wird es gefiltert, bekommst du statt des Bildes einen Fehler. Unterstützte Modelle hängen C2PA-Content-Credentials an – ein signiertes Manifest, das das Bild als KI-generiert kennzeichnet; zusätzlich kann Microsoft unsichtbare Wasserzeichen einbetten.',
          },
          focus: ['outGuard', 'e-oo', 'out', 'e-cc', 'cc', 'e-cco'],
        },
      ],
    },
    {
      id: 'edit-decision',
      title: { en: 'Generate, edit or inpaint?', de: 'Generieren, bearbeiten oder Inpainting?' },
      caption: {
        en: 'Two questions pick the call: do you pass an input image, and should only one area change?',
        de: 'Zwei Fragen bestimmen den Aufruf: Gibst du ein Eingabebild mit, und soll sich nur ein Bereich ändern?',
      },
      width: 960,
      height: 360,
      nodes: [
        { id: 'd1', x: 20, y: 140, w: 160, h: 80, label: { en: 'Input image?', de: 'Eingabebild?' }, icon: 'branch', tone: 'neutral', shape: 'diamond' },
        { id: 'gen', x: 237, y: 30, w: 205, h: 70, label: 'images.generate', sub: { en: 'text-to-image', de: 'Text zu Bild' }, icon: 'code', tone: 'app' },
        { id: 'd2', x: 237, y: 200, w: 205, h: 80, label: { en: 'Change one area only?', de: 'Nur einen Bereich?' }, icon: 'branch', tone: 'neutral', shape: 'diamond' },
        { id: 'maskEdit', x: 520, y: 130, w: 210, h: 70, label: 'images.edit + mask', sub: { en: 'inpainting', de: 'Inpainting' }, icon: 'code', tone: 'app' },
        { id: 'promptEdit', x: 520, y: 270, w: 210, h: 70, label: 'images.edit', sub: { en: 'prompt-driven change', de: 'Prompt-gesteuerte Änderung' }, icon: 'code', tone: 'app' },
        { id: 'fid', x: 790, y: 200, w: 150, h: 70, label: 'input_fidelity', sub: { en: 'high = keep faces', de: 'high: Züge erhalten' }, icon: 'image', tone: 'neutral' },
      ],
      edges: [
        { id: 'e-no', from: 'd1', to: 'gen', label: { en: 'no', de: 'nein' } },
        { id: 'e-yes', from: 'd1', to: 'd2', label: { en: 'yes', de: 'ja' } },
        { id: 'e-area', from: 'd2', to: 'maskEdit', label: { en: 'yes', de: 'ja' } },
        { id: 'e-whole', from: 'd2', to: 'promptEdit', label: { en: 'no', de: 'nein' } },
        { id: 'e-f1', from: 'maskEdit', to: 'fid', dashed: true },
        { id: 'e-f2', from: 'promptEdit', to: 'fid', dashed: true },
      ],
      steps: [
        {
          title: { en: 'Text only → generate', de: 'Nur Text → generate' },
          text: {
            en: 'No input image? Call `images.generate()` with a prompt and controls such as `size`, `quality`, `n` and `output_format`.',
            de: 'Kein Eingabebild? Rufe `images.generate()` mit einem Prompt und Parametern wie `size`, `quality`, `n` und `output_format` auf.',
          },
          focus: ['d1', 'e-no', 'gen'],
        },
        {
          title: { en: 'Input image → edit', de: 'Eingabebild → edit' },
          text: {
            en: 'As soon as you pass images — a photo to change or several reference images to combine — use `images.edit()`. It accepts more than one input image.',
            de: 'Sobald du Bilder mitgibst – ein Foto zum Ändern oder mehrere Referenzbilder zum Kombinieren –, nutzt du `images.edit()`. Es akzeptiert mehr als ein Eingabebild.',
          },
          focus: ['e-yes', 'd2'],
        },
        {
          title: { en: 'One area → add a mask', de: 'Ein Bereich → Maske dazu' },
          text: {
            en: 'To repaint only a region (inpainting), add a PNG mask with the same dimensions. Fully transparent pixels mark the region; with several input images the mask applies to the first one.',
            de: 'Um nur einen Bereich neu zu malen (Inpainting), gibst du eine PNG-Maske mit denselben Abmessungen mit. Vollständig transparente Pixel markieren den Bereich; bei mehreren Eingabebildern gilt die Maske für das erste.',
          },
          focus: ['e-area', 'maskEdit'],
        },
        {
          title: { en: 'Whole image → prompt only', de: 'Ganzes Bild → nur Prompt' },
          text: {
            en: 'Without a mask, the prompt may change the whole picture: restyle it, change the scene or merge reference images into a new composition.',
            de: 'Ohne Maske darf der Prompt das ganze Bild verändern: es umstylen, die Szene wechseln oder Referenzbilder zu einer neuen Komposition verbinden.',
          },
          focus: ['e-whole', 'promptEdit'],
        },
        {
          title: { en: 'Keep what matters', de: 'Wichtiges erhalten' },
          text: {
            en: '`input_fidelity="high"` makes the model match the style and facial features of the input more closely, so subtle edits leave unrelated areas alone. gpt-image-1-mini does not support it.',
            de: '`input_fidelity="high"` lässt das Modell Stil und Gesichtszüge der Eingabe genauer treffen, sodass feine Änderungen den Rest unberührt lassen. gpt-image-1-mini unterstützt das nicht.',
          },
          focus: ['e-f1', 'e-f2', 'fid'],
        },
      ],
    },
  ],
  concepts: [
    {
      term: 'GPT-image models',
      text: {
        en: 'Azure OpenAI image models: text and images in, image out. Generally available today: gpt-image-1-mini, gpt-image-2, gpt-image-2.5-flare and gpt-image-2.5-sunburst (see the table), plus gpt-image-1.5 until it retires on December 16, 2026. `dall-e-3` (March 4, 2026) and gpt-image-1 (October 23, 2026) are retired.',
        de: 'Azure-OpenAI-Bildmodelle: Text und Bilder rein, Bild raus. Heute allgemein verfügbar: gpt-image-1-mini, gpt-image-2, gpt-image-2.5-flare und gpt-image-2.5-sunburst (siehe Tabelle), dazu gpt-image-1.5 bis zu seiner Einstellung am 16. Dezember 2026. `dall-e-3` (4. März 2026) und gpt-image-1 (23. Oktober 2026) sind eingestellt.',
      },
    },
    {
      term: 'FLUX models',
      text: {
        en: 'Black Forest Labs models sold by Azure. FLUX.2 [pro] (up to 8 reference images) and FLUX.2 [flex] (up to 10) run on the BFL provider API — Black Forest Labs\' own REST route on your resource (`…/providers/blackforestlabs/v1/<model-path>`) with extra parameters such as `seed`. FLUX.1 Kontext [pro] (character-consistent edits) also works with `images.generate` and `images.edit`, FLUX1.1 [pro] (fast text-to-image) with `images.generate`; there the result is an image URL, not `b64_json`. Foundry doesn\'t provide built-in content filtering for FLUX models, so configure content safety (for example Azure AI Content Safety) in your app. Pick FLUX for multi-reference edits, character consistency or fast, low-cost generation.',
        de: 'Modelle von Black Forest Labs, die Azure anbietet. FLUX.2 [pro] (bis zu 8 Referenzbilder) und FLUX.2 [flex] (bis zu 10) laufen über die BFL-Provider-API – die eigene REST-Route von Black Forest Labs auf deiner Ressource (`…/providers/blackforestlabs/v1/<model-path>`) mit Zusatzparametern wie `seed`. FLUX.1 Kontext [pro] (figurentreue Bearbeitung) funktioniert auch mit `images.generate` und `images.edit`, FLUX1.1 [pro] (schnelles Text-zu-Bild) mit `images.generate`; dort ist das Ergebnis eine Bild-URL, kein `b64_json`. Foundry bringt für FLUX-Modelle keine eingebaute Inhaltsfilterung mit – richte also selbst Inhaltssicherheit ein (zum Beispiel Azure AI Content Safety). Wähle FLUX für Bearbeitung mit mehreren Referenzen, Figurentreue oder schnelle, günstige Generierung.',
      },
    },
    {
      term: 'images.generate, images.edit and masks',
      text: {
        en: '`images.generate()` turns a text prompt into 1–10 images; `images.edit()` takes one or more input images plus a prompt (multipart upload). An optional `mask` — a PNG of the same size whose fully transparent pixels mark the area to repaint (inpainting) — applies to the first image; `input_fidelity="high"` keeps faces and details closer to the input (not on gpt-image-1-mini). In chat apps, the Responses API (OpenAI-compatible API that returns a response object; keeps state via `previous_response_id` or a conversation) offers an `image_generation` tool for refining images over several turns.',
        de: '`images.generate()` macht aus einem Text-Prompt 1–10 Bilder; `images.edit()` nimmt ein oder mehrere Eingabebilder plus Prompt (Multipart-Upload). Eine optionale `mask` – ein PNG in gleicher Größe, dessen vollständig transparente Pixel den neu zu malenden Bereich markieren (Inpainting) – gilt für das erste Bild; `input_fidelity="high"` hält Gesichter und Details näher an der Eingabe (nicht bei gpt-image-1-mini). In Chat-Apps bietet die Responses API (OpenAI-kompatible API, die ein Response-Objekt zurückgibt und den Zustand über `previous_response_id` oder eine Conversation hält) das Tool `image_generation`, um Bilder über mehrere Runden zu verfeinern.',
      },
    },
    {
      term: 'Generation controls',
      text: {
        en: 'Request parameters that shape the result; sizes, quality levels and transparency per model are in the table. `n` sets 1–10 images per call, `output_format` picks PNG (default) or JPEG, `output_compression` (0–100) sets the JPEG compression level, and `stream=True` with `partial_images` returns preview images while the image renders — it improves perceived latency only.',
        de: 'Anfrageparameter, die das Ergebnis formen; Größen, Qualitätsstufen und Transparenz je Modell stehen in der Tabelle. `n` legt 1–10 Bilder pro Aufruf fest, `output_format` wählt PNG (Standard) oder JPEG, `output_compression` (0–100) setzt die JPEG-Kompressionsstufe, und `stream=True` mit `partial_images` liefert Vorschaubilder während des Renderns – das verbessert nur die gefühlte Wartezeit.',
      },
    },
    {
      term: 'Image content filtering',
      text: {
        en: 'The default guardrail screens image prompts and generated images for hate, sexual, violence and self-harm (medium threshold), and prompts for public figures, deceptive political content, studio characters, profanity and jailbreaks. A blocked prompt fails before generation; a filtered result returns an error instead of the image.',
        de: 'Die Standard-Guardrail prüft Bild-Prompts und erzeugte Bilder auf Hass, sexuelle Inhalte, Gewalt und Selbstverletzung (Schwelle Medium) und Prompts zusätzlich auf Personen des öffentlichen Lebens, täuschende politische Inhalte, Studio-Figuren, Obszönitäten und Jailbreaks. Ein blockierter Prompt scheitert vor der Generierung; ein gefiltertes Ergebnis liefert statt des Bildes einen Fehler.',
      },
    },
    {
      term: 'Custom blocklist',
      text: {
        en: 'Your own list of terms (exact words or regex patterns), such as competitor brand names, that a guardrail blocks. You create it in the Foundry portal under Guardrails → Blocklists and attach it to the input or output filter of the guardrail on your Azure OpenAI deployment. The default guardrail can\'t know your brand rules — it only covers built-in categories.',
        de: 'Deine eigene Liste von Begriffen (exakte Wörter oder Regex-Muster), etwa Namen von Konkurrenzmarken, die eine Guardrail blockiert. Du legst sie im Foundry-Portal unter Guardrails → Blocklists an und hängst sie an den Eingabe- oder Ausgabefilter der Guardrail deines Azure-OpenAI-Deployments. Die Standard-Guardrail kennt deine Markenregeln nicht – sie deckt nur eingebaute Kategorien ab.',
      },
    },
    {
      term: 'Content Credentials (C2PA)',
      text: {
        en: 'A cryptographically signed manifest that records that an image is AI-generated, by which service and when. Microsoft can also embed invisible watermarks, which may survive when metadata is removed. Verify files with the Content Provenance Detection API or website; cropping, resizing or format conversion can strip the metadata.',
        de: 'Ein kryptografisch signiertes Manifest, das festhält, dass ein Bild KI-generiert ist, von welchem Dienst und wann. Zusätzlich kann Microsoft unsichtbare Wasserzeichen einbetten, die auch ohne Metadaten erhalten bleiben können. Prüfe Dateien mit der Content Provenance Detection API oder Website; Zuschneiden, Skalieren oder Formatkonvertierung können die Metadaten entfernen.',
      },
    },
  ],
  comparison: {
    title: { en: 'Current GPT-image models at a glance', de: 'Aktuelle GPT-image-Modelle im Überblick' },
    columns: [
      { en: 'Feature', de: 'Merkmal' },
      { en: 'gpt-image-1-mini', de: 'gpt-image-1-mini' },
      { en: 'gpt-image-2', de: 'gpt-image-2' },
      { en: 'gpt-image-2.5-flare / -sunburst', de: 'gpt-image-2.5-flare / -sunburst' },
    ],
    rows: [
      [{ en: 'Status (retirement)', de: 'Status (Einstellung)' }, 'GA (2027-04-07)', 'GA (2027-10-21)', 'GA (2027-09-09)'],
      [
        { en: 'Best for', de: 'Ideal für' },
        { en: 'Fast, low-cost drafts and bulk jobs', de: 'Schnelle, günstige Entwürfe und Massenjobs' },
        { en: 'High resolution up to 4K, realism, better editing', de: 'Hohe Auflösung bis 4K, Realismus, bessere Bearbeitung' },
        { en: 'Flare: fastest everyday quality · Sunburst: most capable, precise edits', de: 'Flare: am schnellsten im Alltag · Sunburst: am leistungsfähigsten, präzise Bearbeitung' },
      ],
      [
        'size',
        { en: '1024x1024 (fastest) · 1024x1536 · 1536x1024', de: '1024x1024 (am schnellsten) · 1024x1536 · 1536x1024' },
        { en: 'Those sizes or custom WIDTHxHEIGHT (multiples of 16, ratio up to 3:1, long edge ≤ 3,840 px)', de: 'Diese Größen oder eigenes WIDTHxHEIGHT (Vielfache von 16, Verhältnis bis 3:1, lange Kante ≤ 3.840 px)' },
        { en: 'Custom WIDTHxHEIGHT (multiples of 16, ratio 1:3–3:1, ≤ 3,840 px; above 2560x1440 experimental)', de: 'Eigenes WIDTHxHEIGHT (Vielfache von 16, Verhältnis 1:3–3:1, ≤ 3.840 px; über 2560x1440 experimentell)' },
      ],
      [
        'quality',
        { en: 'low · medium · high (default medium)', de: 'low · medium · high (Standard medium)' },
        { en: 'low · medium · high (low = latency-optimized)', de: 'low · medium · high (low = latenzoptimiert)' },
        'low · medium · high · xhigh · max · auto',
      ],
      [{ en: 'Images per call (n)', de: 'Bilder pro Aufruf (n)' }, '1–10', '1–10', '1–10'],
      [
        { en: 'Output data', de: 'Ausgabedaten' },
        { en: 'base64 only (b64_json)', de: 'nur Base64 (b64_json)' },
        { en: 'base64 only (b64_json)', de: 'nur Base64 (b64_json)' },
        { en: 'Not stated in the how-to', de: 'Im How-to nicht angegeben' },
      ],
      [
        'background="transparent"',
        { en: 'Yes, with PNG', de: 'Ja, mit PNG' },
        { en: 'Preview, with PNG', de: 'Preview, mit PNG' },
        { en: 'Yes, with PNG', de: 'Ja, mit PNG' },
      ],
      [
        { en: 'Keeping faces in edits', de: 'Gesichter beim Bearbeiten erhalten' },
        { en: 'No input_fidelity, no face preservation', de: 'Kein input_fidelity, keine Gesichtserhaltung' },
        { en: 'Advanced face preservation', de: 'Erweiterte Gesichtserhaltung' },
        { en: 'Sunburst: highest editing precision', de: 'Sunburst: höchste Bearbeitungspräzision' },
      ],
    ],
  },
  code: [
    {
      title: { en: 'Generate images and handle both filter outcomes (keyless)', de: 'Bilder erzeugen und beide Filterergebnisse behandeln (schlüssellos)' },
      code: `import base64
from openai import OpenAI, APIStatusError
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

token_provider = get_bearer_token_provider(
    DefaultAzureCredential(), "https://ai.azure.com/.default"
)
client = OpenAI(
    base_url="https://<resource>.openai.azure.com/openai/v1/",
    api_key=token_provider,
)

try:
    result = client.images.generate(
        model="gpt-image-2",                   # deployment name
        prompt="Flat-lay photo of a blue trail-running shoe on wet slate, soft morning light",
        size="1536x1024",
        quality="medium",
        n=2,
        output_format="jpeg",
    )
except APIStatusError as err:
    if "Generated image was filtered" in str(err):
        print("Output filter: an image was generated but withheld.")
    elif "safety system" in str(err):
        print("Input filter: the prompt was blocked, nothing was generated.")
    raise

for i, item in enumerate(result.data):
    with open(f"shoe_{i}.jpg", "wb") as f:
        f.write(base64.b64decode(item.b64_json))`,
      notes: [
        { en: '`model` takes your deployment name — a deployment can have any name. gpt-image-2 returns base64 in `b64_json`; you decode it and write the bytes yourself.', de: '`model` nimmt deinen Deployment-Namen – ein Deployment kann beliebig heißen. gpt-image-2 liefert Base64 in `b64_json`; du dekodierst es und schreibst die Bytes selbst.' },
        { en: 'Both guardrail outcomes arrive as errors: "Your task failed as a result of our safety system" (prompt blocked) or "Generated image was filtered as a result of our safety system" (output withheld).', de: 'Beide Guardrail-Ergebnisse kommen als Fehler: „Your task failed as a result of our safety system“ (Prompt blockiert) oder „Generated image was filtered as a result of our safety system“ (Ausgabe zurückgehalten).' },
      ],
    },
    {
      title: { en: 'Inpaint one area with a mask', de: 'Einen Bereich mit Maske neu malen (Inpainting)' },
      code: `import base64
from openai import OpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

client = OpenAI(
    base_url="https://<resource>.openai.azure.com/openai/v1/",
    api_key=get_bearer_token_provider(DefaultAzureCredential(), "https://ai.azure.com/.default"),
)

with open("living-room.png", "rb") as image, open("sofa-mask.png", "rb") as mask:
    edited = client.images.edit(
        model="gpt-image-2",              # deployment name
        image=image,
        mask=mask,                        # transparent pixels = area to repaint
        prompt="The same living room with a green velvet sofa",
    )

with open("living-room-green.png", "wb") as f:
    f.write(base64.b64decode(edited.data[0].b64_json))`,
      notes: [
        { en: 'The mask is a PNG with the same dimensions as the image; only its transparent area is repainted.', de: 'Die Maske ist ein PNG mit denselben Abmessungen wie das Bild; nur ihr transparenter Bereich wird neu gemalt.' },
        { en: 'Describe the full desired result in the prompt, not just the changed object.', de: 'Beschreibe im Prompt das gewünschte Gesamtergebnis, nicht nur das geänderte Objekt.' },
      ],
    },
  ],
  traps: [
    {
      en: '`dall-e-3` (March 4, 2026) and gpt-image-1 (October 23, 2026) are retired, and gpt-image-1.5 retires on December 16, 2026 — build on gpt-image-2, gpt-image-1-mini or the gpt-image-2.5 models.',
      de: '`dall-e-3` (4. März 2026) und gpt-image-1 (23. Oktober 2026) sind eingestellt, gpt-image-1.5 folgt am 16. Dezember 2026 – setze auf gpt-image-2, gpt-image-1-mini oder die gpt-image-2.5-Modelle.',
    },
    {
      en: 'gpt-image-1-mini and gpt-image-2 return base64 only (`b64_json`); `response_format` isn\'t supported, so there is no image URL to download.',
      de: 'gpt-image-1-mini und gpt-image-2 liefern nur Base64 (`b64_json`); `response_format` wird nicht unterstützt – es gibt also keine Bild-URL zum Herunterladen.',
    },
    {
      en: 'In a mask, **transparent** pixels mark the edit area — not black or white ones. The mask must be a PNG with the same dimensions as the image.',
      de: 'In einer Maske markieren **transparente** Pixel den Bearbeitungsbereich – nicht schwarze oder weiße. Die Maske muss ein PNG mit denselben Abmessungen wie das Bild sein.',
    },
    {
      en: '`background="transparent"` needs `output_format="png"` (a JPEG can\'t store transparency); on gpt-image-2, transparent backgrounds are still in preview.',
      de: '`background="transparent"` braucht `output_format="png"` (ein JPEG kann keine Transparenz speichern); bei gpt-image-2 sind transparente Hintergründe noch Preview.',
    },
    {
      en: 'Content Credentials live in the file metadata: cropping, resizing or converting a generated image can strip them, so verify the file you actually publish.',
      de: 'Content Credentials stecken in den Dateimetadaten: Zuschneiden, Skalieren oder Konvertieren kann sie entfernen – prüfe also die Datei, die du tatsächlich veröffentlichst.',
    },
  ],
  takeaways: [
    { en: 'Text only → images.generate; input images → images.edit; one area only → add a mask.', de: 'Nur Text → images.generate; Eingabebilder → images.edit; nur ein Bereich → Maske dazu.' },
    { en: 'Pick controls per model: size, quality, n, output_format, background, input_fidelity.', de: 'Wähle Parameter passend zum Modell: size, quality, n, output_format, background, input_fidelity.' },
    { en: 'Handle both filter outcomes: a blocked prompt and a filtered image.', de: 'Behandle beide Filterergebnisse: blockierter Prompt und gefiltertes Bild.' },
    { en: 'Provenance = C2PA Content Credentials + invisible watermarks; verify after processing.', de: 'Herkunftsnachweis = C2PA-Content-Credentials + unsichtbare Wasserzeichen; nach der Bearbeitung prüfen.' },
    { en: 'Brand terms → custom blocklist; studio characters and public figures → default guardrail.', de: 'Markenbegriffe → eigene Blockliste; Studio-Figuren und Prominente → Standard-Guardrail.' },
  ],
  sources: [
    { title: 'Azure OpenAI image generation models (how-to)', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/dall-e' },
    { title: 'Deploy and use FLUX models in Microsoft Foundry', url: 'https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/use-foundry-models-flux' },
    { title: 'Default Guardrail policies for Microsoft Foundry', url: 'https://learn.microsoft.com/en-us/azure/foundry/guardrails/default-safety-policies' },
    { title: 'Content provenance for Foundry models', url: 'https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/content-safety/provenance-disclosure' },
    { title: 'How to use blocklists in Microsoft Foundry models', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/use-blocklists' },
  ],
}
