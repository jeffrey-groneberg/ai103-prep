import type { Lesson } from '../../lib/types.ts'

export const lesson: Lesson = {
  module: 'image-generation',
  summary: {
    en: 'An image generation model creates **original** images from a text prompt and, optionally, reference images — it does not search a picture catalog. In Microsoft Foundry you deploy such a model (Azure OpenAI GPT-image models such as gpt-image-2 or gpt-image-1.5, or Black Forest Labs FLUX models), try it in the playground, and call it with the Images API: `images.generate()` for text-to-image and `images.edit()` when you pass input images, optionally with a **mask** that marks the area to repaint. Controls such as `size`, `quality`, `n`, `output_format` and `background` shape the result, and GPT-image models return base64 data (`b64_json`). Guardrails filter both the prompt and the generated image, and supported models attach C2PA Content Credentials so published images stay verifiably AI-generated. The older `dall-e-3` model was retired on March 4, 2026.',
    de: 'Ein Bildgenerierungsmodell erzeugt **neue** Bilder aus einem Text-Prompt und optional aus Referenzbildern – es durchsucht keinen Bildkatalog. In Microsoft Foundry stellst du so ein Modell bereit (Azure-OpenAI-GPT-image-Modelle wie gpt-image-2 oder gpt-image-1.5 oder FLUX-Modelle von Black Forest Labs), probierst es im Playground aus und rufst es über die Images API auf: `images.generate()` für Text-zu-Bild und `images.edit()`, wenn du Eingabebilder mitgibst – optional mit einer **Maske**, die den neu zu malenden Bereich markiert. Parameter wie `size`, `quality`, `n`, `output_format` und `background` formen das Ergebnis; GPT-image-Modelle liefern Base64-Daten (`b64_json`). Guardrails filtern sowohl den Prompt als auch das erzeugte Bild, und unterstützte Modelle hängen C2PA-Content-Credentials an, damit veröffentlichte Bilder nachweisbar als KI-generiert erkennbar bleiben. Das ältere Modell `dall-e-3` wurde am 4. März 2026 eingestellt.',
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
        en: 'Text goes to images.generate; input images and a mask go to images.edit. Filters check the request and the result; supported models attach Content Credentials.',
        de: 'Text geht an images.generate; Eingabebilder und Maske gehen an images.edit. Filter prüfen Anfrage und Ergebnis; unterstützte Modelle hängen Content Credentials an.',
      },
      width: 960,
      height: 400,
      groups: [
        { id: 'g-app', x: 210, y: 10, w: 220, h: 260, label: { en: 'Your app', de: 'Deine App' }, tone: 'app' },
        { id: 'g-res', x: 470, y: 20, w: 250, h: 354, label: 'Foundry resource', tone: 'foundry' },
      ],
      nodes: [
        { id: 'prompt', x: 20, y: 40, w: 170, h: 64, label: { en: 'Text prompt', de: 'Text-Prompt' }, sub: { en: 'content + style', de: 'Inhalt + Stil' }, tone: 'user', shape: 'pill' },
        { id: 'ref', x: 20, y: 183, w: 170, h: 64, label: { en: 'Reference images', de: 'Referenzbilder' }, sub: { en: 'optional input images', de: 'optionale Eingabebilder' }, tone: 'data', shape: 'doc' },
        { id: 'mask', x: 20, y: 300, w: 170, h: 64, label: { en: 'Mask (PNG)', de: 'Maske (PNG)' }, sub: { en: 'transparent = edit', de: 'transparent = ändern' }, tone: 'data', shape: 'doc' },
        { id: 'gen', x: 230, y: 40, w: 180, h: 64, label: 'images.generate', sub: { en: 'text → image', de: 'Text → Bild' }, tone: 'app' },
        { id: 'edit', x: 230, y: 180, w: 180, h: 70, label: 'images.edit', sub: 'image + mask + prompt', tone: 'app' },
        { id: 'inGuard', x: 490, y: 60, w: 210, h: 64, label: { en: 'Input filter', de: 'Eingabefilter' }, sub: { en: 'prompt + input images', de: 'Prompt + Eingabebilder' }, tone: 'safety' },
        { id: 'model', x: 490, y: 170, w: 210, h: 70, label: { en: 'Image model', de: 'Bildmodell' }, sub: 'gpt-image-2 · FLUX · …', tone: 'model' },
        { id: 'outGuard', x: 490, y: 290, w: 210, h: 64, label: { en: 'Output filter', de: 'Ausgabefilter' }, sub: { en: 'generated image', de: 'erzeugtes Bild' }, tone: 'safety' },
        { id: 'cc', x: 760, y: 150, w: 180, h: 64, label: 'Content Credentials', sub: { en: 'signed C2PA manifest', de: 'signiertes C2PA-Manifest' }, tone: 'safety' },
        { id: 'out', x: 760, y: 280, w: 180, h: 80, label: { en: 'Generated image', de: 'Erzeugtes Bild' }, sub: 'b64_json', tone: 'data', shape: 'doc' },
      ],
      edges: [
        { id: 'e-pg', from: 'prompt', to: 'gen' },
        { id: 'e-pe', from: 'prompt', to: 'edit', dashed: true },
        { id: 'e-ref', from: 'ref', to: 'edit' },
        { id: 'e-mask', from: 'mask', to: 'edit', label: 'mask' },
        { id: 'e-gi', from: 'gen', to: 'inGuard' },
        { id: 'e-ei', from: 'edit', to: 'inGuard' },
        { id: 'e-im', from: 'inGuard', to: 'model', label: { en: 'allowed', de: 'erlaubt' } },
        { id: 'e-mo', from: 'model', to: 'outGuard' },
        { id: 'e-oo', from: 'outGuard', to: 'out', label: { en: 'passed', de: 'frei' } },
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
            en: 'A GPT-image or FLUX model renders the image with your `size`, `quality`, `n`, `output_format` and `background` settings. GPT-image models always return base64 (`b64_json`) — there is no URL to download.',
            de: 'Ein GPT-image- oder FLUX-Modell rendert das Bild mit deinen Einstellungen für `size`, `quality`, `n`, `output_format` und `background`. GPT-image-Modelle liefern immer Base64 (`b64_json`) – eine Download-URL gibt es nicht.',
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
        { id: 'd1', x: 20, y: 140, w: 160, h: 80, label: { en: 'Input image?', de: 'Eingabebild?' }, tone: 'neutral', shape: 'diamond' },
        { id: 'gen', x: 240, y: 30, w: 200, h: 70, label: 'images.generate', sub: { en: 'text-to-image', de: 'Text zu Bild' }, tone: 'app' },
        { id: 'd2', x: 240, y: 200, w: 200, h: 80, label: { en: 'Change one area only?', de: 'Nur einen Bereich?' }, tone: 'neutral', shape: 'diamond' },
        { id: 'maskEdit', x: 520, y: 130, w: 210, h: 70, label: 'images.edit + mask', sub: { en: 'inpainting', de: 'Inpainting' }, tone: 'app' },
        { id: 'promptEdit', x: 520, y: 270, w: 210, h: 70, label: 'images.edit', sub: { en: 'prompt-driven change', de: 'Prompt-gesteuerte Änderung' }, tone: 'app' },
        { id: 'fid', x: 790, y: 200, w: 150, h: 70, label: 'input_fidelity', sub: { en: 'high = keep faces', de: 'high: Züge erhalten' }, tone: 'neutral' },
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
        en: 'Azure OpenAI image models that take text and image input: gpt-image-1, gpt-image-1-mini and gpt-image-1.5 (limited access preview), gpt-image-2 and the gpt-image-2.5 models (generally available). The gpt-image-1 series and gpt-image-2 return base64 only. `dall-e-3` was retired on March 4, 2026.',
        de: 'Azure-OpenAI-Bildmodelle mit Text- und Bildeingabe: gpt-image-1, gpt-image-1-mini und gpt-image-1.5 (Limited Access Preview), gpt-image-2 und die gpt-image-2.5-Modelle (allgemein verfügbar). Die gpt-image-1-Serie und gpt-image-2 liefern nur Base64. `dall-e-3` wurde am 4. März 2026 eingestellt.',
      },
    },
    {
      term: 'FLUX models',
      text: {
        en: 'Black Forest Labs models sold by Azure: FLUX.2 [pro] and FLUX.2 [flex] (multi-reference editing with up to 8 or 10 images via the BFL provider API), FLUX.1 Kontext [pro] (character-consistent in-context editing, also via the Images API) and FLUX1.1 [pro] (fast text-to-image).',
        de: 'Modelle von Black Forest Labs, die Azure anbietet: FLUX.2 [pro] und FLUX.2 [flex] (Bearbeitung mit bis zu 8 bzw. 10 Referenzbildern über die BFL-Provider-API), FLUX.1 Kontext [pro] (figurentreue In-Context-Bearbeitung, auch über die Images API) und FLUX1.1 [pro] (schnelles Text-zu-Bild).',
      },
    },
    {
      term: 'images.generate vs images.edit',
      text: {
        en: '`images.generate()` turns a text prompt into 1–10 images. `images.edit()` takes one or more input images plus a prompt (multipart upload) to modify them or combine references. Both return `data[i].b64_json` for GPT-image models.',
        de: '`images.generate()` macht aus einem Text-Prompt 1–10 Bilder. `images.edit()` nimmt ein oder mehrere Eingabebilder plus Prompt (Multipart-Upload), um sie zu ändern oder Referenzen zu kombinieren. Beide liefern bei GPT-image-Modellen `data[i].b64_json`.',
      },
    },
    {
      term: 'Mask (inpainting)',
      text: {
        en: 'A PNG with the same dimensions as the input image. Fully transparent pixels (alpha 0) mark where the model may repaint; everything else is preserved. With several input images, the mask applies to the first.',
        de: 'Ein PNG mit denselben Abmessungen wie das Eingabebild. Vollständig transparente Pixel (Alpha 0) markieren, wo das Modell neu malen darf; alles andere bleibt erhalten. Bei mehreren Eingabebildern gilt die Maske für das erste.',
      },
    },
    {
      term: 'Generation controls',
      text: {
        en: '`size` (gpt-image-1 series: 1024x1024, 1024x1536, 1536x1024; gpt-image-2: custom WIDTHxHEIGHT in multiples of 16 up to 3,840 px), `quality` (low, medium, high — lower is faster), `n` (1–10), `output_format` (PNG default or JPEG) with `output_compression`, `background="transparent"` with PNG, and `stream` with `partial_images`.',
        de: '`size` (gpt-image-1-Serie: 1024x1024, 1024x1536, 1536x1024; gpt-image-2: eigenes WIDTHxHEIGHT in Vielfachen von 16 bis 3.840 px), `quality` (low, medium, high – niedriger ist schneller), `n` (1–10), `output_format` (Standard PNG oder JPEG) mit `output_compression`, `background="transparent"` mit PNG sowie `stream` mit `partial_images`.',
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
      term: 'Content Credentials (C2PA)',
      text: {
        en: 'A cryptographically signed manifest that records that an image is AI-generated, by which service and when. Microsoft can also embed invisible watermarks, which may survive when metadata is removed. Verify files with the Content Provenance Detection API or website; cropping, resizing or format conversion can strip the metadata.',
        de: 'Ein kryptografisch signiertes Manifest, das festhält, dass ein Bild KI-generiert ist, von welchem Dienst und wann. Zusätzlich kann Microsoft unsichtbare Wasserzeichen einbetten, die auch ohne Metadaten erhalten bleiben können. Prüfe Dateien mit der Content Provenance Detection API oder Website; Zuschneiden, Skalieren oder Formatkonvertierung können die Metadaten entfernen.',
      },
    },
  ],
  comparison: {
    title: { en: 'Which control for which requirement?', de: 'Welcher Parameter für welche Anforderung?' },
    columns: [
      { en: 'Requirement', de: 'Anforderung' },
      { en: 'Control', de: 'Parameter' },
      { en: 'Watch out', de: 'Achtung' },
    ],
    rows: [
      [{ en: 'Transparent cut-out', de: 'Freisteller mit Transparenz' }, 'background="transparent" + output_format="png"', { en: 'Documented for the gpt-image-1 series; JPEG cannot be transparent', de: 'Für die gpt-image-1-Serie dokumentiert; JPEG kann keine Transparenz' }],
      [{ en: 'Several options per call', de: 'Mehrere Varianten pro Aufruf' }, 'n', { en: '1–10, default 1', de: '1–10, Standard 1' }],
      [{ en: 'Faster drafts', de: 'Schnellere Entwürfe' }, 'quality="low", size="1024x1024"', { en: 'Square images generate faster', de: 'Quadratische Bilder entstehen schneller' }],
      [{ en: 'Banner or 4K format', de: 'Banner- oder 4K-Format' }, 'gpt-image-2 + size="WIDTHxHEIGHT"', { en: 'Multiples of 16, long edge ≤ 3,840 px', de: 'Vielfache von 16, lange Kante ≤ 3.840 px' }],
      [{ en: 'Repaint one area', de: 'Einen Bereich neu malen' }, 'images.edit + mask', { en: 'Transparent pixels = edit area', de: 'Transparente Pixel = Bearbeitungsbereich' }],
      [{ en: 'Keep faces and details', de: 'Gesichter und Details erhalten' }, 'input_fidelity="high"', { en: 'Not supported by gpt-image-1-mini', de: 'Von gpt-image-1-mini nicht unterstützt' }],
      [{ en: 'Show progress', de: 'Fortschritt zeigen' }, 'stream=True + partial_images', { en: 'Improves perceived latency only', de: 'Verbessert nur die gefühlte Wartezeit' }],
    ],
  },
  code: [
    {
      title: { en: 'Generate images with a GPT-image deployment (keyless)', de: 'Bilder mit einem GPT-image-Deployment erzeugen (schlüssellos)' },
      code: `import base64
from openai import OpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

token_provider = get_bearer_token_provider(
    DefaultAzureCredential(), "https://ai.azure.com/.default"
)
client = OpenAI(
    base_url="https://<resource>.openai.azure.com/openai/v1/",
    api_key=token_provider,
)

result = client.images.generate(
    model="gpt-image-1.5",                 # your deployment name
    prompt="Flat-lay photo of a blue trail-running shoe on wet slate, soft morning light",
    size="1536x1024",
    quality="medium",
    n=2,
    output_format="jpeg",
)
for i, item in enumerate(result.data):
    with open(f"shoe_{i}.jpg", "wb") as f:
        f.write(base64.b64decode(item.b64_json))`,
      notes: [
        { en: 'GPT-image models return base64 in `b64_json`; decode it and write the bytes yourself.', de: 'GPT-image-Modelle liefern Base64 in `b64_json`; du dekodierst es und schreibst die Bytes selbst.' },
        { en: 'Allowed sizes depend on the model: the gpt-image-1 series supports three fixed sizes, gpt-image-2 custom sizes.', de: 'Erlaubte Größen hängen vom Modell ab: Die gpt-image-1-Serie kennt drei feste Größen, gpt-image-2 eigene Größen.' },
      ],
    },
    {
      title: { en: 'Inpaint one area with a mask', de: 'Einen Bereich mit Maske neu malen (Inpainting)' },
      code: `with open("living-room.png", "rb") as image, open("sofa-mask.png", "rb") as mask:
    edited = client.images.edit(
        model="gpt-image-1.5",
        image=image,
        mask=mask,                # transparent pixels = area to repaint
        prompt="The same living room with a green velvet sofa",
        input_fidelity="high",    # stay close to the input outside the edit
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
      en: '`dall-e-3` was retired on March 4, 2026 — existing deployments no longer work. Use a GPT-image model.',
      de: '`dall-e-3` wurde am 4. März 2026 eingestellt – bestehende Deployments funktionieren nicht mehr. Nutze ein GPT-image-Modell.',
    },
    {
      en: 'GPT-image models always return base64 (`b64_json`); `response_format` is not supported, so there is no image URL to download.',
      de: 'GPT-image-Modelle liefern immer Base64 (`b64_json`); `response_format` wird nicht unterstützt – es gibt also keine Bild-URL zum Herunterladen.',
    },
    {
      en: 'In a mask, **transparent** pixels mark the edit area — not black or white ones. The mask must be a PNG with the same dimensions as the image.',
      de: 'In einer Maske markieren **transparente** Pixel den Bearbeitungsbereich – nicht schwarze oder weiße. Die Maske muss ein PNG mit denselben Abmessungen wie das Bild sein.',
    },
    {
      en: '`background="transparent"` needs `output_format="png"`; a JPEG cannot store transparency.',
      de: '`background="transparent"` braucht `output_format="png"`; ein JPEG kann keine Transparenz speichern.',
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
