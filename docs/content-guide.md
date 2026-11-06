# Content guide

How lessons and questions in AI-103 Prep are researched, written and validated. Every contributor (human or agent) follows this guide.

## 1. Content policy (non-negotiable)

- **Original only.** Write every question and lesson yourself. Do not copy or closely paraphrase Microsoft Learn module knowledge checks, module assessments or the official Practice Assessment. Link to them instead.
- **No dumps.** Never fetch, read or use ExamTopics or any other dump / brain-dump site. They violate the Microsoft Certification Exam Agreement.
- **Current docs only.** Ground every fact in a current `learn.microsoft.com` documentation page that you actually opened during this research. Prefer product docs (`/azure/foundry/…`, `/azure/ai-services/…`, `/azure/search/…`, `/agent-framework/…`) over training-module pages. Training modules (`/training/modules/…`) show what the course teaches; when a module page and a product doc disagree, the product doc wins.
- **Renamed or retired things never appear under old names.** If the docs say something was renamed (for example Azure AI User → **Foundry User**), use the new name. Old names may appear only when the text explicitly frames them as former names ("formerly …"). The validator rejects common outdated names.
- **Preview features** are fine when the docs present them as commonly used; say "(preview)" in lessons when the docs do.

## 2. Verified platform facts (2026-11-06)

Use these consistently; verify anything beyond them yourself.

| Topic | Current fact |
|---|---|
| Brand | **Microsoft Foundry** (formerly Azure AI Studio / Azure AI Foundry); portal at `ai.azure.com`. Hub-based projects live only in the **Foundry (classic)** portal. |
| Prebuilt services | **Foundry Tools** (formerly Azure AI services), e.g. *Azure Language in Foundry Tools*, *Azure Speech in Foundry Tools*, *Azure Translator in Foundry Tools*, *Azure Content Understanding in Foundry Tools*, *Azure Document Intelligence in Foundry Tools*. |
| Resource model | One **Foundry resource** containing **projects** (replaces hub + Azure OpenAI + Azure AI Services). |
| Project endpoint | `https://<resource>.services.ai.azure.com/api/projects/<project>` |
| Azure OpenAI v1 endpoint | `https://<resource>.openai.azure.com/openai/v1/` used with `OpenAI(base_url=…)`; token scope `https://ai.azure.com/.default` |
| SDK | `azure-ai-projects` **2.x** (`pip install "azure-ai-projects>=2.3.0"`): `AIProjectClient(endpoint=…, credential=DefaultAzureCredential())`, `project.get_openai_client()` |
| Model calls | Responses API: `openai.responses.create(model=<deployment>, input=…, instructions=…)`, `response.output_text`, `previous_response_id`; Chat Completions still available. Responses retained 30 days by default. |
| Agents (v2) | Foundry Agent Service uses the Responses API. Terminology: **Conversations, Items, Responses, Agent Versions** (formerly threads, messages, runs, assistants). `project.agents.create_version(agent_name=…, definition=PromptAgentDefinition(model=…, instructions=…))`. Invoke an agent either on the shared project endpoint — `openai = project.get_openai_client()`, `openai.responses.create(conversation=conv.id, input=…, extra_body={"agent_reference": {"name": …, "type": "agent_reference"}})` — or on the agent's dedicated endpoint with `project.get_openai_client(agent_name=…)`, which in `azure-ai-projects` 2.10 requires `AIProjectClient(..., allow_preview=True)` (otherwise `ValueError`). Agent kinds: **prompt agents** (declarative), **hosted agents** (your container/code), voice-based prompt agents. |
| Workflows | Foundry (portal/declarative) workflows retire on **December 1, 2026**; new workflows should use Microsoft Agent Framework workflows. |
| RBAC | **Foundry User** (build/develop, data actions), **Foundry Project Manager**, **Foundry Account Owner**, **Foundry Owner**, **Foundry Agent Consumer** (formerly Azure AI User / Project Manager / Account Owner / Owner). |
| Agent frameworks | **Microsoft Agent Framework** (successor of Semantic Kernel agents and AutoGen); orchestration patterns: sequential, concurrent, group chat, handoff, Magentic (builders in `agent_framework.orchestrations`). 2026 Python renames: `ChatAgent` → `Agent`, threads → `AgentSession` (`create_session()`), `run_stream` → `run(stream=True)`, `@ai_function` → `@tool`. |
| Model currency | Never present a **retired or deprecated** model as the solution (Learn [model retirement schedule](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirement-schedule), snapshot in `src/content/model-lifecycle.json`; `npm run validate` rejects them unless the sentence frames them as retired/deprecated/replaced). As of 2026-11-06: **retired** `gpt-4o-transcribe` (2026-10-15), `gpt-image-1` (2026-10-23), `dall-e-3`; **deprecated** `gpt-4.1`/`-mini`/`-nano`, `gpt-4o`, `gpt-4o-mini`, `o1`, `o3`, `o3-mini`, `o4-mini` (o-series retire 2026-11-19); retiring soon: `whisper`, `tts`, `tts-hd` (2026-12-15), `gpt-image-1.5` (2026-12-16). Current GA examples: `gpt-5-mini` (default for chat/agent samples, as in the Foundry quickstarts), `gpt-5.1`, `gpt-5.2`, `gpt-5.4(-mini)`, `gpt-4o-mini-transcribe` (2025-12-15), `gpt-4o-transcribe-diarize`, `gpt-4o-mini-tts` (2025-12-15), `gpt-realtime`, `gpt-image-2`, `gpt-image-1-mini`, `text-embedding-3-small/-large`. `sora-2` stays (the video docs still document it as available preview although the schedule lists past dates — say "preview; check the retirement schedule"). Verify any other model on the schedule before using it. |
| Deployment names | `model=` takes the **deployment name**. Samples write `model="gpt-5-mini"  # deployment name` like the quickstarts; say once per lesson that a deployment can have any name. |
| Reasoning models | All GA GPT-5.x models are reasoning models: they reject `temperature`/`top_p` (verify per model in the [reasoning](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/reasoning) doc) and use `reasoning={"effort": …}`. In the Responses API the output limit is `max_output_tokens` (`max_tokens` is a Chat Completions parameter). Never set `temperature` on a reasoning model in a sample. |
| MCP approval | `require_approval` defaults to `"always"`. Values: `"always"`, `"never"`, or per tool `{"never": {"tool_names": [...]}}` / `{"always": {"tool_names": [...]}}` (SDK `MCPToolRequireApproval`/`MCPToolFilter`; the how-to prose shows a shortened list form). Approval round trip: `mcp_approval_request` item → next request sends `{"type": "mcp_approval_response", "approve": True, "approval_request_id": …}` with `previous_response_id`; repeat while new requests arrive. |
| Identities | The **tool connection's authentication type** decides which identity a downstream service sees: agent identity (the agent's own Entra identity, used for its outbound calls) or the project managed identity — grant roles to that one. Callers of a **published** agent (Agent Application) need **Foundry User** (or a custom role) on the Agent Application; **Foundry Agent Consumer** covers direct agent endpoint calls only. |
| Agent setup | **Basic setup**: Foundry manages agent state storage. **Standard setup**: bring your own Azure Storage, Azure AI Search and Azure Cosmos DB for NoSQL so all agent data stays in your tenant (optionally with private networking/BYO VNet). |
| Speech/Voice roles | Roles differ by API — say which one: Speech SDK/REST with Microsoft Entra ID → **Cognitive Services Speech User** (or Speech Contributor) **plus a custom-domain endpoint**; Voice Live with Entra ID → **Cognitive Services User** and **Foundry User**. |
| Shared terms | Define at first use in each lesson (one line, same wording): **Responses API** (OpenAI-compatible API that returns a response object; keeps state via `previous_response_id` or a conversation), **conversation** (durable item store for multi-turn state), **prompt agent** (declarative agent: model + instructions + tools, versioned in Foundry) vs **hosted agent** (your own agent code in a container that Foundry runs), **project connection** (stored endpoint + credential that tools reference instead of secrets in code), **MCP** (Model Context Protocol: standard for exposing tools to agents), **RAG** (retrieve relevant content and ground the answer in it). |

## 3. Question rules

File: `src/content/questions/<module-id>.json` (one file per module, validated against `src/content/schema/question-file.schema.json`). Case studies: `src/content/cases/<case-id>.json` (schema `case-file.schema.json`).

- `id`: `q-<module-id>-NN` (two digits, continue numbering in existing files).
- `domain` must match the domain of `skill` (`1.x.x` → `D1`, …). `skill` is the primary skills-outline bullet; `skills` may list secondary bullets.
- `difficulty`: 1 = recall a fact, 2 = apply it to a short scenario, 3 = analyze a scenario with trade-offs or multiple constraints. Aim for roughly 25 % / 50 % / 25 %.
- Type mix per author: about 45 % `single`, 20 % `multi`, 10–15 % each `order`, `match`, `code`.
  - `single`: 4 options (3–6 allowed), exactly one correct.
  - `multi`: 4–6 options, 2–3 correct. Say **"Which TWO …"** / **"Welche ZWEI …"** (or THREE) in the stem.
  - `order`: 3–6 items listed in the correct order (the UI shuffles).
  - `match`: 3–4 prompts, 4–5 targets including at least one distractor.
  - `code`: Python only, current SDK calls, 1–3 blanks `{{b1}}`, 3 options per blank. Keep templates short (≤ 15 lines).
- Stems are scenario-first and exam-like ("Your company …", "You need to …" / "Dein Unternehmen …", "Du musst …"). One clear ask. No trick negations, no "all of the above". Address the learner with "du" in German.
- Distractors are plausible: real products, real parameters, real methods that fit a different scenario. Never invent fake APIs as distractors unless the option's `why` says it does not exist.
- Every option/item/prompt/blank option has a `why` (1–2 sentences) explaining why it is right or wrong. `explanation` states the takeaway rule.
- `sources`: 1–3 specific doc URLs (en-us) that prove the correct answer. Open each URL to confirm it exists.
- `lastVerified`: the date you checked the docs (`2026-11-06`).
- Bilingual: `en` in clear exam-style English; `de` in natural German with product, API and parameter names kept in English. Code stays identical.
- Text format: markdown-lite only — `**bold**`, `` `code` ``. No HTML, no line breaks inside options.
- Case studies: a scenario of 150–300 words (company, current environment, requirements, constraints) and 3–5 questions that reference it with `caseId`; the scenario must be needed to answer.

## 4. Lesson rules

File: `src/content/lessons/<module-id>.ts` exporting `export const lesson: Lesson = {…}` (pure data, `import type` only). Follow `src/content/lessons/foundry-chat-app.ts` as the reference.

Anatomy (the app renders it in this order):

1. `summary` — 3–5 sentences, explain from the ground up (the learner has little hands-on experience).
2. `examFocus` — how the exam probes this module's skills.
3. `diagrams` — 1–2 step-through diagrams (the "big picture" first).
4. `concepts` — 4–7 terms (English term + 1–3 sentence explanation).
5. `comparison` — optional "which service/option for what" table.
6. `code` — 1–2 minimal Python samples using the current SDK, with 1–3 notes each.
7. `traps` — 3–5 exam traps; `takeaways` — 3–5 short rules.
8. `sources` — 2–5 docs pages.

### Diagram rules

- Canvas width 960; height 240–460. Coordinates are top-left based.
- Nodes: `w ≥ 120`, `h` 56–80. Label capacity ≈ `(w − 16) / 7.4` characters per line, sub capacity ≈ `(w − 16) / 6.2`; `actor` nodes reserve another 26 px for the person icon. Use `\n` for a second label line. Product names stay English (plain string); generic words get `{ en, de }`.
- Edge labels render as pills `chars × 6.4 + 14` px wide and 20 px high, centered on the edge midpoint. The gap between two connected nodes must exceed that width (plus ~20 px) for labelled edges; keep labels ≤ 18 characters. Unlabelled edges need ≥ 40 px.
- Lay out flows left → right or top → bottom in rows/columns so straight arrows never cross a node. Use `via` points for detours. The validator uses the renderer's geometry (`src/lib/geometry.ts`): an arrow through another node is an error, a label pill on a node is a warning.
- `groups` draw containment (Foundry resource ⊃ project, "Your app", "Azure AI Search"). Keep 20 px padding; groups must contain their nodes completely; leave 30 px at the top of a group for its label.
- Tones encode meaning (never color alone, labels always present): `user` people, `app` your code/SDK, `foundry` Foundry platform resources, `model` models/deployments, `data` stores/indexes/files, `tool` tools/functions/MCP, `safety` guardrails/identity/security, `external` external systems/web, `neutral` other.
- Shapes: `box` (default), `pill` (events/messages), `store` (databases, indexes, storage), `doc` (documents/files), `actor` (people), `diamond` (decisions).
- 3–6 steps. Each step focuses the nodes/edges/groups it talks about and explains one idea in 1–3 sentences.

## 5. Workflow

1. Research the module: open the training module page and its units, then the product docs and code samples (Microsoft Learn MCP tools: `microsoft_docs_search`, `microsoft_docs_fetch`, `microsoft_code_sample_search`).
2. Write the lesson, then the questions.
3. Run `npm run validate -- --only <module-id>[,<module-id>…]` until there are no errors (fix warnings too).
4. Never edit files owned by another module.
