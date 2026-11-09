---
name: AI-103 Prep
description: "A Microsoft Learn–style study app for Exam AI-103 whose craft lives in the guided path and the step-through diagrams."
colors:
  # Neutrals (Fluent 2)
  bg: "#f5f5f5"
  surface: "#ffffff"
  surface-alt: "#fafafa"
  surface-sunken: "#f0f0f0"
  line: "#e0e0e0"
  line-soft: "#ebebeb"
  line-strong: "#d1d1d1"
  line-firm: "#c7c7c7" # literal in components.css and pages.css; no custom property
  ink: "#242424"
  ink-2: "#424242"
  ink-3: "#616161"
  ink-disabled: "#bdbdbd"
  # Brand (Fluent 2 web brand ramp)
  brand: "#0f6cbd"
  brand-hover: "#115ea3"
  brand-press: "#0f548c"
  brand-ink: "#0f548c"
  brand-tint: "#ebf3fc"
  brand-tint-2: "#cfe4fa"
  brand-soft: "#96c6fa"
  brand-wash: "#f5f9fe" # literal in components.css and content.css; no custom property
  # Mastery ramp of the skills map (literals in pages.css and components.css)
  mastery-seen: "#dbe9fa"
  mastery-seen-line: "#b4d6fa"
  mastery-sure: "#62abf5"
  mastery-sure-line: "#479ef5"
  mastery-sure-ink: "#0a2e4a"
  # Status
  ok: "#107c10"
  ok-ink: "#0e700e"
  ok-tint: "#f1faf1"
  ok-line: "#9fd89f"
  bad: "#c50f1f"
  bad-ink: "#b10e1c"
  bad-tint: "#fdf3f4"
  bad-line: "#eeacb2"
  warn: "#bc4b09"
  warn-tint: "#fff9f5"
  warn-line: "#fdcfb4"
  mark: "#c48a00"
  # Exam domains (fill · ink · tint)
  d1: "#0f6cbd"
  d1-ink: "#0f548c"
  d1-tint: "#ebf3fc"
  d2: "#038387"
  d2-ink: "#026367"
  d2-tint: "#e6f4f4"
  d3: "#c239b3"
  d3-ink: "#8e2483"
  d3-tint: "#faeef8"
  d4: "#498205"
  d4-ink: "#3b6b04"
  d4-tint: "#eef6e6"
  d5: "#ca5010"
  d5-ink: "#9c3d0a"
  d5-tint: "#fdf0e8"
  # Diagram tones (fill · stroke · ink)
  tone-user-fill: "#fff8e6"
  tone-user-stroke: "#b98200"
  tone-user-ink: "#6e4d00"
  tone-app-fill: "#ebf3fc"
  tone-app-stroke: "#0f6cbd"
  tone-app-ink: "#0f548c"
  tone-foundry-fill: "#f0effc"
  tone-foundry-stroke: "#5b5fc7"
  tone-foundry-ink: "#3d3f99"
  tone-model-fill: "#e6f4f4"
  tone-model-stroke: "#038387"
  tone-model-ink: "#025b5e"
  tone-data-fill: "#eef1f4"
  tone-data-stroke: "#52657a"
  tone-data-ink: "#34495e"
  tone-tool-fill: "#fdf0e8"
  tone-tool-stroke: "#ca5010"
  tone-tool-ink: "#8a3707"
  tone-safety-fill: "#fdf3f4"
  tone-safety-stroke: "#c50f1f"
  tone-safety-ink: "#8e0a16"
  tone-external-fill: "#f0f7e9"
  tone-external-stroke: "#498205"
  tone-external-ink: "#355e04"
  tone-neutral-fill: "#ffffff"
  tone-neutral-stroke: "#8a8a8a"
  tone-neutral-ink: "#424242"
  diagram-dim-ink: "#858585" # literal in content.css; no custom property
  # Code (VS Code Light+)
  code-bg: "#f7f7f7"
  tok-keyword: "#0000ff"
  tok-string: "#a31515"
  tok-comment: "#008000"
  tok-number: "#098658"
  tok-call: "#795e26"
  tok-class: "#1f6e86"
  tok-builtin: "#795e26"
typography:
  display:
    fontFamily: "'Segoe UI Variable Display', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: "36px"
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "'Segoe UI Variable Display', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: "32px"
    letterSpacing: "-0.01em"
  section:
    fontFamily: "'Segoe UI Variable Display', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: "30px"
  subheadline:
    fontFamily: "'Segoe UI Variable Display', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: "28px"
  title:
    fontFamily: "'Segoe UI Variable Display', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: "24px"
  diagram-title:
    fontFamily: "'Segoe UI Variable Text', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: "22px"
  stem:
    fontFamily: "'Segoe UI Variable Text', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: "26px"
  lead:
    fontFamily: "'Segoe UI Variable Text', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "27px"
  reading:
    fontFamily: "'Segoe UI Variable Text', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "24px"
  item:
    fontFamily: "'Segoe UI Variable Text', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: "22px"
  body:
    fontFamily: "'Segoe UI Variable Text', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
  body-strong:
    fontFamily: "'Segoe UI Variable Text', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: "20px"
  meta:
    fontFamily: "'Segoe UI Variable Text', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "18px"
  label:
    fontFamily: "'Segoe UI Variable Text', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: "16px"
  caption:
    fontFamily: "'Segoe UI Variable Text', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
  chip:
    fontFamily: "'Segoe UI Variable Text', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "11.5px"
    fontWeight: 700
    letterSpacing: "0.02em"
  badge:
    fontFamily: "'Segoe UI Variable Text', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: "20px"
  code:
    fontFamily: "'Cascadia Code Variable', 'Cascadia Code', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: "21px"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  tile: "6px"
  circle: "50%"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "20px"
  s6: "24px"
  s8: "32px"
  s10: "40px"
  s12: "48px"
  s16: "64px"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.surface}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "32px"
  button-primary-hover:
    backgroundColor: "{colors.brand-hover}"
  button-primary-active:
    backgroundColor: "{colors.brand-press}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "32px"
  button-secondary-hover:
    backgroundColor: "{colors.surface-alt}"
  button-subtle:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "32px"
  button-subtle-hover:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink}"
  button-subtle-on:
    textColor: "{colors.brand}"
  button-danger:
    backgroundColor: "{colors.bad}"
    textColor: "{colors.surface}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "32px"
  button-danger-hover:
    backgroundColor: "{colors.bad-ink}"
  button-disabled:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink-disabled}"
  button-small:
    padding: "0 10px"
    height: "28px"
  button-large:
    padding: "0 20px"
    height: "40px"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.sm}"
    size: "28px"
  icon-button-hover:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink}"
  icon-button-large:
    size: "40px"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "20px 24px 24px"
  lesson-body:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "24px 32px 32px"
  callout:
    backgroundColor: "{colors.surface-alt}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  callout-exam:
    backgroundColor: "{colors.brand-wash}"
  callout-warn:
    backgroundColor: "{colors.warn-tint}"
  domain-chip-d1:
    backgroundColor: "{colors.d1-tint}"
    textColor: "{colors.d1-ink}"
    typography: "{typography.chip}"
    rounded: "{rounded.sm}"
    padding: "0 7px"
    height: "20px"
  domain-chip-d2:
    backgroundColor: "{colors.d2-tint}"
    textColor: "{colors.d2-ink}"
    typography: "{typography.chip}"
    rounded: "{rounded.sm}"
    padding: "0 7px"
    height: "20px"
  domain-chip-d3:
    backgroundColor: "{colors.d3-tint}"
    textColor: "{colors.d3-ink}"
    typography: "{typography.chip}"
    rounded: "{rounded.sm}"
    padding: "0 7px"
    height: "20px"
  domain-chip-d4:
    backgroundColor: "{colors.d4-tint}"
    textColor: "{colors.d4-ink}"
    typography: "{typography.chip}"
    rounded: "{rounded.sm}"
    padding: "0 7px"
    height: "20px"
  domain-chip-d5:
    backgroundColor: "{colors.d5-tint}"
    textColor: "{colors.d5-ink}"
    typography: "{typography.chip}"
    rounded: "{rounded.sm}"
    padding: "0 7px"
    height: "20px"
  skill-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.sm}"
    padding: "0 6px"
    height: "20px"
  tag:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.sm}"
    padding: "0 6px"
    height: "20px"
  tag-brand:
    backgroundColor: "{colors.brand-tint}"
    textColor: "{colors.brand-ink}"
  status-pill:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink-2}"
    rounded: "11px"
    padding: "0 8px"
    height: "22px"
  status-pill-on:
    backgroundColor: "{colors.brand-tint}"
    textColor: "{colors.brand-ink}"
  status-pill-ok:
    backgroundColor: "{colors.ok-tint}"
    textColor: "{colors.ok-ink}"
  status-pill-bad:
    backgroundColor: "{colors.bad-tint}"
    textColor: "{colors.bad-ink}"
  toggle-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-2}"
    rounded: "15px"
    padding: "0 12px"
    height: "30px"
  toggle-chip-pressed:
    backgroundColor: "{colors.brand-tint}"
    textColor: "{colors.brand-ink}"
  segmented-option:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    padding: "6px 14px"
  segmented-option-pressed:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.surface}"
  select:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "0 10px"
    height: "34px"
  count-badge:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.surface}"
    typography: "{typography.badge}"
    rounded: "10px"
    padding: "0 6px"
    height: "20px"
  topnav-link:
    textColor: "{colors.ink-2}"
    typography: "{typography.body}"
    padding: "0 12px"
    height: "56px"
  topnav-link-hover:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.ink}"
  topnav-link-active:
    textColor: "{colors.brand}"
    typography: "{typography.body-strong}"
  tabbar-link:
    textColor: "{colors.ink-3}"
    typography: "{typography.badge}"
    padding: "8px 0 6px"
  tabbar-link-active:
    textColor: "{colors.brand}"
  menu-link:
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "44px"
  menu-link-active:
    backgroundColor: "{colors.brand-tint}"
    textColor: "{colors.brand}"
  station-dot:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.circle}"
    size: "20px"
  station-dot-done:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.surface}"
  station-dot-next:
    backgroundColor: "{colors.surface}"
    size: "28px"
  stepper-dot:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-3}"
    rounded: "{rounded.circle}"
    size: "28px"
  stepper-dot-current:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.surface}"
  stepper-dot-done:
    backgroundColor: "{colors.brand-tint}"
    textColor: "{colors.brand}"
  choice:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 14px"
  choice-hover:
    backgroundColor: "{colors.brand-wash}"
  choice-picked:
    backgroundColor: "{colors.brand-tint}"
  choice-correct:
    backgroundColor: "{colors.ok-tint}"
  choice-wrong:
    backgroundColor: "{colors.bad-tint}"
  choice-letter:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.sm}"
    size: "24px"
  choice-letter-picked:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.surface}"
  session-bar:
    backgroundColor: "{colors.surface}"
  session-bar-correct:
    backgroundColor: "{colors.ok-tint}"
    textColor: "{colors.ok-ink}"
  session-bar-wrong:
    backgroundColor: "{colors.bad-tint}"
    textColor: "{colors.bad-ink}"
  diagram-frame:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
  diagram-canvas:
    backgroundColor: "{colors.surface-alt}"
    padding: "12px 16px"
  diagram-edge-label:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-2}"
    rounded: "10px"
    padding: "0 9px"
    height: "20px"
  diagram-edge-label-focus:
    textColor: "{colors.brand-ink}"
  diagram-step-dot:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.circle}"
    size: "28px"
  diagram-step-dot-done:
    backgroundColor: "{colors.brand-tint}"
    textColor: "{colors.brand-ink}"
  diagram-step-dot-active:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.surface}"
  diagram-narration:
    backgroundColor: "{colors.brand-wash}"
    textColor: "{colors.ink-2}"
    typography: "{typography.reading}"
    padding: "12px 20px 16px"
  diagram-summary:
    backgroundColor: "{colors.brand-wash}"
    rounded: "{rounded.md}"
    padding: "16px 10px"
  diagram-summary-tile:
    rounded: "{rounded.lg}"
    size: "46px"
  meter:
    backgroundColor: "{colors.surface-sunken}"
    rounded: "4px"
    height: "8px"
  meter-large:
    rounded: "6px"
    height: "12px"
  skill-tile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-3}"
    rounded: "{rounded.tile}"
    width: "44px"
    height: "36px"
  skill-tile-seen:
    backgroundColor: "{colors.mastery-seen}"
    textColor: "{colors.brand-ink}"
  skill-tile-sure:
    backgroundColor: "{colors.mastery-sure}"
    textColor: "{colors.mastery-sure-ink}"
  skill-tile-mastered:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.surface}"
  tooltip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    typography: "{typography.caption}"
    rounded: "{rounded.sm}"
    padding: "6px 10px"
  code-block:
    backgroundColor: "{colors.code-bg}"
    textColor: "{colors.ink}"
    typography: "{typography.code}"
    rounded: "{rounded.md}"
    padding: "14px 16px"
  inline-code:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "1px 5px"
  code-blank:
    backgroundColor: "{colors.brand-tint}"
    textColor: "{colors.brand-ink}"
    rounded: "{rounded.sm}"
    padding: "0 8px"
    height: "26px"
  exam-clock:
    backgroundColor: "{colors.brand-tint}"
    textColor: "{colors.brand-ink}"
    rounded: "14px"
    padding: "0 10px"
    height: "28px"
  exam-clock-low:
    backgroundColor: "{colors.bad-tint}"
    textColor: "{colors.bad-ink}"
  zettel-box:
    backgroundColor: "{colors.surface-alt}"
    rounded: "{rounded.md}"
    padding: "10px 12px 12px"
  zettel-box-goal:
    backgroundColor: "{colors.brand-tint}"
    textColor: "{colors.brand-ink}"
  zettel-divider:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "8px 12px 8px 14px"
    height: "56px"
  zettel-divider-tab:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.brand-ink}"
    rounded: "{rounded.sm}"
    padding: "0 10px"
    height: "20px"
  zettel-divider-path:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.ink}"
  zettel-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
  zettel-rate-miss:
    backgroundColor: "{colors.bad-tint}"
    textColor: "{colors.bad-ink}"
    rounded: "{rounded.sm}"
    height: "52px"
  zettel-rate-hit:
    backgroundColor: "{colors.ok-tint}"
    textColor: "{colors.ok-ink}"
    rounded: "{rounded.sm}"
    height: "52px"
---

# Design System: AI-103 Prep

## Overview

**Creative North Star: "The Category Standard, Played Straight"**

AI-103 Prep is a Microsoft Learn–style study app assembled from Fluent 2 parts: a #f5f5f5 ground, white panels lifted by soft two-part shadows, one brand blue, the Segoe UI stack for everything you read and Cascadia Code for everything you type. It does not reinvent the category; it plays it straight and puts the craft where the direction contract puts it, “in the guided path and the step-through diagrams,” and where PRODUCT.md puts it, in “the precision of every state.”

The density is a study desk's: data-dense where the learner checks where they stand (31 stations, readiness meters, the skills map, tables) and generous where they read (prose held near 54 characters at 15–17px). Picture first: every lesson opens on a hand-built SVG diagram whose nodes are typed by tone and whose steps light one part at a time while the rest recedes but stays legible. Every screen keeps the next step in view: the “Als Nächstes dran” card, the Wiederholen count in the nav, the session bar's single “Weiter”.

Two rejections are confirmed. The generic card-grid dashboard template: the contract's thesis refuses it, so the home is a guided path beside a next-step column, not a grid of stat tiles. And gamification: no achievement badges, streak pressure or confetti. The craft bar is Microsoft Learn, Khan Academy and Duolingo without the game layer.

**Key Characteristics:**
- Fluent 2 neutrals: a #f5f5f5 ground with white panels at 8px corners on the soft shadow-4.
- One brand blue (#0f6cbd) for “act here” and “you are here”; status green and red appear only after an answer is revealed (the one exception: the exam clock turns red in its last 10 minutes).
- Five domain hues for the five exam domains and nine diagram tones for node types, always paired with words.
- Segoe UI stack, sentence case, no uppercase, tabular numerals for every count.
- Signatures: the step-through diagram (typed tones, six shapes, measured labels, focus/context/dim), the guided path of stations and the Zettelkasten box (three compartments, exact counts, the card that flies into its compartment).
- Phones get a five-tab bar plus a Menü; below 1100px the Menü also holds the secondary sections; sticky parts stick only while they fit.

Names: the north star and the ground, surface, brand, domain, tone and mastery names come from the direction contract, PRODUCT.md and the build's own labels; where those sources name nothing (Brand Wash, Quiet Wash, Sunken Grey, Firm Line, Receded Text Grey and every rule title), the name was derived from the contract.

## Colors

Fluent 2's light palette played straight: near-white neutrals, one saturated brand blue, and colour spent only on meaning (domains, node types, verdicts).

### Primary
- **Fluent Brand Blue** (#0f6cbd): primary buttons, the active nav link and its 3px underline, the current stepper step and next station, the active diagram step dot and lit arrow, focus rings, the count badge and links. Hover darkens to #115ea3, press to #0f548c.
- **Brand Ink** (#0f548c): text on brand tints (tags, toggle chips, code blanks, the exam clock, done step dots).
- **Brand Tint** (#ebf3fc) and **Brand Tint Deep** (#cfe4fa): picked answers, done steps, answered exam cells and the “Als Nächstes” tag; Tint Deep also borders the brand-wash containers and is the text-selection colour.
- **Brand Soft** (#96c6fa): the first level of the mastery bar.
- **Brand Wash** (#f5f9fe): a literal, not a custom property. The quiet blue containers: diagram narration, the home thumbnail, exam callouts, answer hover, empty matching slots.
- **Mastery ramp** (literals from the Fluent brand ramp, named by the skills-map legend): Gesehen tiles #dbe9fa on #b4d6fa; Sicher tiles #62abf5 on #479ef5 with #0a2e4a numbers; Gemeistert is Fluent Brand Blue with white numbers. #479ef5 also fills the mastery bar's middle level and Leitner box 4.

### Secondary
The five domain hues, each a fill · ink · tint triple: D1 Planen & verwalten (#0f6cbd, the brand blue itself), D2 GenAI & Agents (#038387), D3 Computer Vision (#c239b3), D4 Text & Sprache (#498205), D5 Informationsextraktion (#ca5010). Fills draw readiness meters, due stack-bar segments, legend dots and domain icons; -ink sets domain-chip text; -tint backs domain chips and pressed domain filters, with the fill as their border.

### Tertiary
- **Diagram tones**: nine node types, each fill · stroke · ink. Person (user, amber), Deine App / SDK (app, blue), Foundry-Plattform (foundry, indigo), Modell (model, teal), Daten / Index (data, slate), Tool / Funktion (tool, orange), Sicherheit / Guardrail (safety, red), Externes System (external, green), Sonstiges (neutral, grey). Fills are pale, strokes saturated at 1.5px, and the ink colours group titles and the thumbnail's tile icons.
- **Receded Text Grey** (#858585): the one colour dimmed diagram text takes; it keeps at least 3:1 on the canvas.

### Neutral
- **Fluent Ground** (#f5f5f5): the page behind everything.
- **Fluent Surface** (#ffffff): panels, bars, controls, choices, diagram frames; white text on brand and status fills uses the same value.
- **Quiet Wash** (#fafafa): hover fills, the diagram canvas, callouts, pools and zebra rows.
- **Sunken Grey** (#f0f0f0): meter tracks, inline code, tags, subtle-button hover, disabled buttons.
- **Hairline** (#e0e0e0) and **Soft Hairline** (#ebebeb): container borders, dividers, table rows.
- **Control Line** (#d1d1d1): borders of buttons, chips, selects, choices and segmented controls.
- **Firm Line** (#c7c7c7): a literal for secondary-button hover borders, unstarted station rings and unstarted skill tiles.
- **Fluent Ink** (#242424), **Secondary Ink** (#424242), **Tertiary Ink** (#616161), **Disabled Ink** (#bdbdbd): headings and body; explanations and secondary copy; meta, captions and labels; disabled controls and drag grips.

### Status
- **Correct** (#107c10, ink #0e700e, tint #f1faf1, line #9fd89f) and **Wrong** (#c50f1f, ink #b10e1c, tint #fdf3f4, line #eeacb2): revealed answers, the session bar, feedback banners, results. Wrong tint and ink also mark the exam clock in its last 10 minutes.
- **Trap Orange** (#bc4b09, tint #fff9f5, line #fdcfb4): warning callouts and the icons of the Prüfungsfallen list.
- **Marked Amber** (#c48a00): flagged exam questions.

### Code
VS Code Light+ on #f7f7f7: keywords #0000ff, strings #a31515, comments #008000 in italics, numbers #098658, calls, builtins and decorators #795e26, classes #1f6e86.

### Named Rules
**The You-Are-Here Rule.** Brand blue means “act here” or “you are here”: a primary button, the current step, the next station, the lit arrow, the focus ring. It never decorates.

**The Domain Hue Rule.** The five domain hues identify exam domains and nothing else. Domain-coloured text uses its -ink step on its -tint; icons, bars and dots use the fill.

**The Verdict Rule.** Green and red appear only after an answer is revealed, and always with an icon and a word (check or dismiss circle plus “richtig” or “falsch”, “Nicht ganz”), never colour alone. The single exception is the exam clock, which takes the Wrong tint and ink in its last 10 minutes; the remaining time stays readable as text.

**The Typed Tone Rule.** In diagrams colour encodes node type, never order or emphasis. Emphasis belongs to the step state, and every diagram carries a legend of the tones it uses.

## Typography

**Display Font:** Segoe UI Variable Display (with Segoe UI, system-ui, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial)
**Body Font:** Segoe UI Variable Text (with the same fallbacks)
**Label/Mono Font:** Cascadia Code Variable, bundled through @fontsource-variable/cascadia-code (with Cascadia Code, ui-monospace, SFMono-Regular, Menlo, Consolas)

**Character:** Fluent's own voice. Segoe UI's open, neutral forms carry every role, with the Display optical size only on headings and a slight negative tracking there; Cascadia Code, ligatures off, carries every identifier. Segoe UI is not bundled, so it renders where it is installed and the platform UI face stands in elsewhere; the diagram's text metrics were measured with the wider macOS face, so labels fit with room to spare on Windows.

### Hierarchy
- **Display** (600, 28px/36px, −0.015em; 24px/32px on phones): page titles.
- **Headline** (600, 24px/32px, −0.01em; 20px/28px on phones): the module title in “Als Nächstes dran”.
- **Section** (600, 22px/30px): lesson section headings.
- **Subheadline** (600, 20px/28px): learning-path titles on Lernen.
- **Title** (600, 18px/24px): panel titles and the brand name.
- **Diagram title** (600, 16px/22px, text face): diagram titles; feedback-banner titles use 16px/600 too.
- **Stem** (400, 17px/26px; 16px/24px on phones; ~54ch): question stems.
- **Lead** (400, 16px/27px, ~54ch): the lesson's opening paragraph.
- **Reading** (400, 15px/24px): callout text, diagram narration, explanations, traps and takeaways, the next-card summary.
- **Item** (600, 15px/22px): module rows, glossary terms, code-sample and case-panel titles, narration titles. Answer text uses the same 15px/22px at 400.
- **Body** (400, 14px/20px) and **Body strong** (600): the default; buttons, Heute titles, path-group titles and subheads are Body strong.
- **Meta** (400, 13px/18px): table-of-contents links and Heute meta lines.
- **Label** (600, 12px/16px, Tertiary Ink): table heads and rail-box titles.
- **Caption** (400, 12px/16px): meta lines, legends, notes, the footer.
- **Chip** (700, 11.5px, +0.02em): domain chips. Skill chips use 11.5px at 600.
- **Badge** (600, 11px/20px): the count badge; tab-bar labels use 11px/600.
- **Code** (400, 13.5px/21px, Cascadia): code blocks. Inline code sits at 0.88em on Sunken Grey.

### Named Rules
**The Reading Measure Rule.** Prose holds near 54ch: the lesson lead, callouts, traps and takeaways, the question stem, the explanation. Diagram narration and caption run to 56ch, per-option explanations to 56ch plus their 64px indent. Explanatory text never runs the full panel width.

**The Sentence-Case Rule.** Nothing is uppercased: titles, buttons, tabs and labels are sentence-case German. The only positive tracking in the system is the domain chip's +0.02em.

**The Tabular Numbers Rule.** Every number that counts or changes (badges, chips, step dots, percentages, timers, scores, skill IDs, dates) uses tabular numerals.

## Layout

One 1240px column with 24px side padding (32px top, 48px bottom) holds white panels that float on the ground 20px apart. The 56px top bar is full-bleed and sticky; in-page anchors land 72px below the top edge.

- **Home:** a two-column grid. The guided path sits in a 300–400px column on the left; the right column (1fr) stacks “Als Nächstes dran”, then the Zettelkasten panel, then a two-up pair, Heute and Prüfungsbereitschaft, stretched to equal height. The right column sticks 76px from the top only while it fits the window (measured: viewport wider than 1100px and column height plus 84px within the window height); otherwise it scrolls with the page. At 1100px and below the grid collapses and the next-step column moves above the path; at 900px the pair stacks.
- **Lesson:** a white reading panel (24px top, 32px sides and bottom) beside a 260px sticky rail with “Auf dieser Seite” and the study-guide skills, 32px apart; sections are 40px apart (32px on phones). The glossary flows in two balanced columns of at least 280px. At 1100px the rail disappears; on phones the panel runs edge to edge with no corners, no shadow and 16px padding.
- **Sessions and exam:** practice, review and a Zettelkasten round run in a 900px column over a fixed bottom bar; the exam runner uses a 1040px body between a sticky header (under the top bar) and a fixed bottom bar. On phones these routes hide the tab bar and footer.
- **Zettelkasten:** the overview puts the box panel (320–420px) beside the register (1fr); at 1100px the register drops below and the box panel and an open editor sit side by side while they fit. A register page holds the compact box with its actions (at most 760px), then the module's cards in an auto-fill grid of at least 340px columns.
- **Progress and Coverage:** one column of full-width panels with no sidebar. Progress stacks the skills map, the module table, past simulations and data export/import; wide tables sit in a keyboard-focusable region that scrolls sideways on phones.
- **Grids:** Practice is 1.5fr beside a column of at least 260px; Review, exam setup and Resources are two-up. All stack at 900px.
- **Rhythm:** a 4px base (4, 8, 12, 16, 20, 24, 32, 40, 48, 64). Components use 8–16 inside, panels and grid cells sit 20 apart, panels pad 24, lesson sections sit 40 apart.
- **Breakpoints:** 1100px (home and Zettelkasten single column, lesson rail hidden, Fortschritt and Ressourcen move into the Menü), 900px (two-up grids stack), 760px (phone shell: tab bar, tighter padding, scrolling diagram canvas), 560px (register dividers and the home box panel restack) and the 380px `summary` container query of the thumbnail.
- **Phones:** pages pad 20px 16px with 104px of bottom clearance above the safe-area-aware tab bar. Shell padding never drops below the notch insets (`max(16px, env(safe-area-inset-left/right))` on the top bar, pages, tab bar and the session and exam bars), so nothing slides under the camera housing when an iPhone is held sideways. Phones held sideways (760px wide or less and 500px high or less) get a 48px top bar and a compact tab bar with icon and label side by side.
- **Installed app:** the same site installs as a PWA (standalone, white status bar, 103 icon) and works offline; nothing in the layout depends on running installed.

### Named Rules
**The Sticky-Only-If-It-Fits Rule.** A column sticks only while all of it fits the window; nothing may end up out of reach. Case-study panels cap their height and scroll inside.

**The No-Sideways-Page Rule.** The page itself never scrolls sideways, down to 320px. Only diagram canvases, code blocks and, above 560px, wide tables scroll inside their own frame; grid tracks that hold questions, results or code are `minmax(0, 1fr)` so a long line can't widen them.

**The Next-Step-First Rule.** When columns collapse, “Als Nächstes dran” moves to the top.

**The Finger-Size Rule.** Where the main pointer is a finger, targets are at least 44px tall: buttons, segmented controls, selects, list and table links, breadcrumbs. Icon buttons, diagram step dots, filter chips and skills tiles are at least 40px, and each whole guided-path station is one tap target. Selects use 16px text so iOS never zooms the page on focus.

## Elevation & Depth

The contract's “soft offset shadows” are Fluent's two-part shadows: a 2px ambient blur at 12% plus a key shadow at 14% that grows with elevation. Panels rest at shadow-4, hover and lift go to shadow-8, the phone menu flyout uses shadow-16. These are the CSS custom properties `--shadow-4`, `--shadow-8` and `--shadow-16`; the frontmatter schema has no shadow group, so their values are listed below and in the sidecar (`.impeccable/design.json`). Inside a panel everything rests flat on hairlines and tints, and the bars (top bar, tab bar, session and exam bars) are flat white with a 1px hairline edge.

### Shadow Vocabulary
- **Rest** (`box-shadow: 0 0 2px rgb(0 0 0 / 0.12), 0 2px 4px rgb(0 0 0 / 0.14)`): panels and the lesson body.
- **Lift** (`box-shadow: 0 0 2px rgb(0 0 0 / 0.12), 0 4px 8px rgb(0 0 0 / 0.14)`): the hovered thumbnail, a hovered skills tile, the tile tooltip.
- **Flyout** (`box-shadow: 0 0 2px rgb(0 0 0 / 0.12), 0 8px 16px rgb(0 0 0 / 0.14)`): the phone Menü panel.
- **Diagram focus** (`filter: drop-shadow(0 3px 6px rgb(0 0 0 / 0.16))`): the nodes a step lights.
- **Selection ring** (`box-shadow: inset 0 0 0 1px` in the state colour): picked, correct and wrong answers double their 1px border inward.

### Named Rules
**The Soft Fluent Shadow Rule.** Depth uses only the shipped Fluent ramp: never a hard offset shadow, never a heavier custom one.

**The Flat-Inside Rule.** Inside a panel, containers rest flat; shadow appears there only in response to the learner (the hovered thumbnail, the focused diagram node).

## Shapes

Gentle Fluent corners: 8px on containers, 4px on controls. Circles mark sequence and position, half-height pills mark status and counts, and 12px belongs to the diagram's own forms.

- **Containers** (8px): panels, callouts, choices, diagram frames, code blocks, explanations, the case panel, result items, the thumbnail.
- **Controls** (4px): buttons, selects, segmented controls, chips, tags, answer letters, ordering items, exam overview cells, inline code, tooltips.
- **Circles:** stations, stepper and diagram step dots, the narration number, module indexes, legend dots, ordering position numbers.
- **Pills** (half the height): count badge (20px tall), status pill (22px), exam clock (28px), toggle chips (30px), meters (8px and 12px), diagram edge labels (20px).
- **Diagram forms:** nodes at 8px, groups at 12px with a 6/4 dash, thumbnail tiles at 12px, skills tiles at 6px, legend swatches at 3px; the app mark is a 32px square at 7px.
- **Borders:** 1px hairlines throughout; 1.5px for diagram strokes and thumbnail tiles; 2px for station rings and the path rail. In the interface a dashed border means open or missing: the empty answer zone, an empty matching slot, an unresolved code blank, the correct option the learner missed. In diagrams dashes mark group containment and authored dashed edges.
- The active tab's 3px underline has 2px top corners.

### Named Rules
**The Two-Radius Rule.** 8px contains, 4px controls; anything rounder is a position marker, a status pill or a diagram form.

## Components

### Buttons
Calm and exact: Fluent buttons that change colour on hover (150ms) and never lift or scale.
- **Shape:** gently squared (4px), 32px tall by default, 28px small, 40px large; 1px border; 14px/600 text (13px small, 15px large) with a 6px gap to a 16–18px Fluent icon, an arrow on forward actions. On touch screens (coarse pointer) every button is at least 44px tall (large 48px).
- **Primary:** brand fill, white text; hover #115ea3, press #0f548c. One per region: the next-card action, “Weiter”, “Lektion starten”.
- **Secondary:** white with a Control Line border and Fluent Ink text; hover Quiet Wash with a Firm Line border.
- **Subtle:** transparent with Secondary Ink; hover Sunken Grey and Fluent Ink. Its on state (“Markiert”, “Als gelesen markiert”) turns the text brand.
- **Danger:** red fill, white text, hover red ink; destructive resets only, and always as the second step: the first button only asks (“Lernstand löschen”, “Zurücklegen” after “Alle zurück in Fach 1”), with a subtle Abbrechen beside it.
- **Disabled:** Sunken Grey fill, Hairline border, Disabled Ink text, not-allowed cursor.
- **Focus:** a 2px brand outline at 2px offset. Joined controls (segmented controls and the DE/EN toggle) clip anything outside their buttons, so there focus is drawn inside: a 2px Fluent Ink outline at −2px with a 1px white inner line, visible on white and on brand fills.
- **Icon buttons:** 28px (40px large) transparent squares at 4px in Secondary Ink; hover Sunken Grey.

### Chips and Tags
- **Domain chip:** 20px, 4px corners, domain tint fill and domain ink text, 11.5px/700 with +0.02em (“D2”).
- **Skill chip:** 20px, white with a Control Line border, 11.5px/600 (“2.1.6”).
- **Tag:** 20px on Sunken Grey, 12px/600; the brand variant (“Als Nächstes”) is Brand Tint with Brand Ink.
- **Status pill:** a 22px pill at 12px/600 on Sunken Grey; on, ok and bad variants take the brand, correct and wrong tint with their ink.
- **Filter chip:** a 30px pill, white with a Control Line border, 13px/600; hover darkens the border and text. Pressed is Brand Tint with a brand border and Brand Ink; a pressed domain filter takes its domain tint, fill border and ink.

### Cards / Containers
- **Panel:** white, 8px, shadow-4, padded 20px 24px 24px (16px on phones). The title is 18px/24px display 600; a head row can carry a 600-weight brand link with a chevron at the right.
- **Callout:** Quiet Wash with a Hairline, 8px, 12px 16px padding and a 20px icon. The exam variant is Brand Wash with a Brand Tint Deep border and a brand icon; the warning variant takes the trap tint, line and icon colour.
- **Heute card:** rows of a 22px brand icon, a title with meta, and a small button, divided by hairlines. The due row adds an 8px segment bar in domain fills (2px gaps) with a dot legend, and its button turns primary when something is due.
- **Prüfungsbereitschaft card:** one row per domain: a 20px icon in the domain colour, name and weight, a tabular percentage and an 8px meter in the domain fill.
- **Explanation, inline quiz, case panel, result item:** white or Quiet Wash with a Hairline at 8px, never a shadow.

### Inputs / Fields
- **Select:** 34px, white, Control Line border with a Tertiary Ink bottom edge (Fluent's underline), 4px, 14px.
- **Segmented control:** a joined 4px group with Control Line dividers, 13px/600 Secondary Ink, 6px 14px padding; hover Quiet Wash; pressed is a brand fill with white text. The DE/EN content-language toggle in the top bar is built the same way, with 4px 10px padding and a 40px minimum width (44×36px on touch screens).
- **Matching slot:** a select drawn as a dashed brand slot on Brand Wash until it is filled, then a solid Control Line border and 600 weight.
- **Code blank:** an inline 26px select with a dashed brand border on Brand Tint, Cascadia 13px/600; it resolves to solid green or red.
- **Ordering:** a pool on Quiet Wash and a dashed answer zone; items are 4px white rows with a grip, a 22px Brand Tint position number and up/down icon buttons as the keyboard alternative to dragging.

### Navigation
- **Top bar:** 56px, white, hairline below, sticky. The app mark (a 32px brand square at 7px with “103” in white 12.5px/700) sits beside “AI-103 Prep” in 18px/600 display. Links (Start, Lernen, Üben, Prüfung, Wiederholen, Zettelkasten, Fortschritt, Ressourcen) are 14px Secondary Ink with 12px side padding; hover is Quiet Wash with rounded top corners; active is brand at 600 with a 3px brand underline inset 12px. The DE/EN toggle sits at the right.
- **Medium widths (1100px and below):** Fortschritt and Ressourcen leave the top bar so the links never crowd; the Menü button appears at the right and its flyout lists them with Abdeckung.
- **Wiederholen badge:** a 20px brand pill with the number of due reviews in white 11px/600. On phones it becomes an 8px brand dot with a 2px white ring on the tab icon.
- **Phones (760px and below):** the links hide. A fixed bottom tab bar holds Start, Lernen, Üben, Prüfung and Wiederholen as 22px Fluent icons (filled when active) over 11px/600 labels, Tertiary Ink, active brand. The header's Menü (a 40px icon button that turns into a close icon) opens a 220px flyout (8px, hairline, shadow-16) with Zettelkasten, Fortschritt, Ressourcen and Abdeckung as 44px rows; the active row is Brand Tint with brand text. The Zettelkasten is also one tap away in its home panel, right under “Als Nächstes dran”.
- **Breadcrumb:** 13px Tertiary Ink with 14px chevrons.
- **“Auf dieser Seite”:** a 1px hairline track with 13px/18px Secondary Ink links; hover draws a brand edge and brand text; the current section gets a 2px brand edge, Fluent Ink at 600 and aria-current="location". The current section is the last one whose heading has passed 56px plus 25% of the window height, or the last section once the page is scrolled to the end.

**The Next-Step Signal Rule.** The Wiederholen count stays in the navigation on purpose: it is Product Principle 1 (“Always show the next step”) in the chrome, a pointer to due work rather than a reward.

### Guided Path (signature)
The home's left column: four learning paths, 31 stations on a vertical rail.
- **Rail:** a 2px Hairline connector from dot to dot that turns brand once the station is done.
- **Dots** (20px): untouched is a 2px Firm Line ring on white; started is a brand ring half filled with Brand Tint Deep; done is a brand disc with a white 14px check; next grows to 28px, a brand ring around a brand core with a 4px Brand Tint halo, with a 600-weight title and the “Als Nächstes” tag.
- **Text:** the module title at 14px/20px (hover brand), then a 12px/16px Tertiary Ink meta line (“Modul 2 · 18 Fragen · 6/18 beantwortet”).
- **Module stepper** (in the next card): Lektion, Fragen, Wiederholung as 28px circles joined by 2px lines. The current step is a brand fill with a brand label; a done step is Brand Tint with a brand check, and its line turns brand. At 420px and below the 12px labels move under the circles so all three steps fit.

### Next-Step Card and Diagram Thumbnail
“Als Nächstes dran” stacks the headline module title, a meta line, the stepper, then the diagram thumbnail beside the summary (1.25fr to 1fr, summary at 15px/24px), then the large primary action, with a secondary “Direkt zu den Fragen” while the lesson is unread.

The thumbnail restates the lesson's first diagram as three tone tiles:
- Brand Wash with a Brand Tint Deep border, 8px, 16px 10px padding; hover turns the border brand and lifts it to shadow-8.
- Tiles are 46px at 12px corners: tone fill, 1.5px tone stroke and, centred in the tile, the node's own 24px official Azure icon (the same icon the diagram draws beside that label). Labels are 13px/18px/600, subs 12px/16px Tertiary Ink, centred.
- It follows the step-through order and draws an 18px arrow only where the diagram has a real edge; otherwise it leaves a plain 18px gap.
- The authors' `\n` line breaks are kept. Natural words hyphenate only from 10 characters (`hyphenate-limit-chars: 10 4 4`); code tokens never hyphenate and wrap only at “.”, “/”, “_” and camelCase seams; a non-breaking space before “·” keeps separators off line starts.
- Below a 380px container width (the `summary` container query) it switches to one tile per row: a 40px tile on the left, label and sub on the right, arrows turned to point down.

### Step-Through Diagram (signature)
Sixty hand-built SVG diagrams on a 960-wide canvas, each opening its lesson's big picture.
- **Frame:** white, Hairline, 8px. A head (title 16px/22px/600, caption 14px/20px Tertiary Ink at 56ch), a Quiet Wash canvas with a 16px dot grid (#e3e3e3) between soft hairlines, controls, narration, legend.
- **Nodes:** the nine typed tones with a pale fill and 1.5px tone stroke; label 14px/600 Fluent Ink, sub 12px Tertiary Ink. Shapes: box (8px), pill, store (a cylinder), doc (a 14px folded corner), actor (a box for a person or device) and diamond (14px points). Groups take their tone's fill at 55%, a 1px 6/4 dashed stroke, 12px corners and a 12.5px/600 title in tone ink.
- **Icons:** every node carries one official Azure Architecture Icon (Azure Public Service Icons V25, unaltered SVGs in `src/assets/azure-icons/`, registry in `src/content/diagram-icons.ts`) at 18px, 6px before the label's first line and centred on the label block, so label lines budget 24px more width. Named products take their product icon (Foundry, Foundry Agent Service, Foundry IQ, Foundry Models, Azure AI Search, Speech, Language, Translator, Content Safety, Document Intelligence, Key Vault and so on); generic blocks take the set's general icons (code, file, browser, gear, workflow, users, mobile). A dimmed node greys its icon and fades it to 45%.
- **Arrows:** 1.5px #8a8a8a with 7px triangular heads, optionally two-headed or dashed (5/4). They start and end on each shape's drawn outline.
- **Labels:** node text is measured with the real font and checked to fit each shape in each language. Edge labels are white 20px pills (10px corners, Hairline, 11.5px/600 Secondary Ink).
- **Step states:** focus thickens the stroke to 2.5px and adds the drop shadow; a lit arrow turns brand, 2.5px, dashed 8/6 and flowing, and its label gets a brand border with Brand Ink text. Context keeps the endpoints of a lit arrow at full strength. Dim fades shapes to 32%, arrows to 25%, label pills to 60% and groups to 55%, while all text turns Receded Text Grey. Changes ease over 280ms.
- **Controls:** Zurück (secondary, small), numbered 28px step dots (done Brand Tint, active brand), “Schritt für Schritt” then “Weiter” (primary, small), Abspielen/Pause (subtle, 4.2s per step) and Gesamtbild (subtle; back to the whole picture). Arrow keys step through, Escape returns to the whole picture.
- **Narration:** a Brand Wash panel under a Brand Tint Deep rule, at least 76px tall: a 22px brand number and a 15px/22px/600 title, then 15px/24px Secondary Ink text at 56ch, announced politely to screen readers.
- **Legend:** 12px Tertiary Ink with 14×10px swatches (3px corners, tone fill and 1.5px stroke) for the tones the diagram uses.
- **Phones:** the drawing keeps a 640px minimum width and the canvas scrolls sideways under a “Diagramm seitlich wischen” hint. Each step scrolls to its own nodes; arrow endpoints join the view, nearest first, only while everything still fits, and otherwise the view aligns left on the step's nodes.
- **Quality gate:** the content validator (`npm run validate`) and a Playwright render audit (`npm run audit:diagrams`) enforce text fit (icon included), a known icon on every node, the icon inside its shape and clear of the text, arrow contact, label placement, no edges through nodes or group titles, and canvas bounds; the current result is 0 errors in EN and DE.

**The Icon-Terms Rule.** Official Azure icons appear only inside diagrams and their thumbnail, always next to the name of what they stand for, at their own proportions: never cropped, flipped, rotated, recoloured or distorted, and never standing for this app. The app's own mark stays the 103 square.

**The Readable Recede Rule.** When a step lights its parts, the rest recedes but stays legible: fills and strokes fade, text only turns Receded Text Grey (at least 3:1), and the endpoints of a lit arrow stay at full strength as context.

**The Twenty-Pixel Rule.** An edge label sits on its arrow only when at least 20px of arrow stays visible on each side; otherwise it moves beside the arrow (above or right first, then below or left), clear of nodes, group titles, other labels and other arrows. Arrow length is measured between the two shapes' drawn outlines, so a label pill of width w stays on a straight horizontal arrow only if the outlines are at least w + 40px apart (its height + 40px on a vertical arrow). When a label finds no free spot at all, `npm run validate` fails and reports the arrow length it would need.

**The Real-Edge Rule.** The thumbnail draws an arrow only where the diagram has an edge between those two nodes; everywhere else it leaves a plain gap.

### Zettelkasten (signature)
A Leitner card box with three compartments. The front of a card asks a question with four exam-style answer options, the back reveals the right one and briefly explains every option; a right answer moves the card one compartment forward, a wrong one sends it back to Fach 1, and the goal is every card in Fach 3.
- **The box:** a 1.5px Firm Line tray on Quiet Wash, 8px, cut into three equal compartments by 1.5px walls. An axis line above names the ends (“hinten · Start”, “vorne · Ziel”, 11px/600 Tertiary Ink). Each compartment shows “Fach n” (12px/600 Secondary Ink), its exact count (24px/600 display, tabular; Fach 3 in Brand Ink) and its cards as a stack of 1px card edges: Firm Line on white in Fach 1, Brand Soft on white in Fach 2, brand on Brand Tint in Fach 3. Stack height follows the square root of the count, at least 8%, so a few cards stay visible beside hundreds; an empty compartment shows a dashed “leer” slot. A 20px white circle with a brand forward arrow sits on each wall. The compact box (home panel, register page, round, end screen) uses 20px counts and 36px stacks.
- **The rule, drawn:** the full box (overview) adds a caption above (“Richtig – der Zettel wandert ein Fach nach vorn”, the arrow beside it) and a dashed return path below that runs from Fach 3 and Fach 2 back to an arrowhead under Fach 1 (“Falsch – zurück nach hinten in Fach 1”). Captions are Tertiary Ink with the bold verb in Fluent Ink: they explain, they are not links.
- **Register:** one index divider per learning path and per module, in course order. A divider is a white 8px row with a hairline (Firm Line and Quiet Wash for a learning path) and a 20px tab on top (11px/600 Brand Ink, “Modul n”; 12px Fluent Ink, “Lernpfad n”); module tabs stagger across four positions like the dividers of a real box. The row holds title and meta (“17 Zettel · 3 vorne”), an 8px split bar in the three Fach colours (2px gaps) and a small secondary “Lernen”. The whole module row opens its register page; a finished divider turns its tab brand with a check and shows “Alle vorne”. A brand “Nächste Runde” tag marks the registers the next mixed round deals from. The register head carries the legend of the three Fach colours.
- **Cards:** on a register page each card is a white 8px index card on shadow-2: a head with the kind (Begriff, Prüfungsfalle, Merksatz, Eigener Zettel), a Fach pill (Sunken Grey, Brand Tint, brand) and, for starter cards, a 40px “Aus dem Kasten nehmen” icon button, ruled off by a 1px Brand Soft line; then the question (15px/22px/600) and a disclosed “Antwort” (the right option beside a green check, then the lesson text). Own cards end with Bearbeiten and Löschen (Löschen asks first).
- **A round:** the session column shows the scope, the compact box (on phones a slim strip of three counters, so the card keeps the screen) and one card. The front reads “Vorderseite · Frage” over the question in 22px/30px display (18px/26px on phones) and the four options as the shared choice rows of the questions (A–D letter boxes, shuffled anew each time a card comes back). The bar says “Wähle eine Antwort.” and holds “Prüfen” (primary, disabled until an option is picked). Checking reveals in place, like a practice question: the label turns to “Rückseite · Antwort”, the options take the Correct, Wrong and missed states with each option's short reason beneath it, and a disclosure “Aus der Lektion” holds the lesson text; the bar takes the Correct or Wrong tint with the verdict (“Richtig!” or “Falsch” and where the card goes) and “Weiter”, which sends the card on its flight. Keys: 1–4 or A–D pick, Enter checks and continues. The picked option scrolls into view when it sits under the bar. The learner's own cards without options keep the turn-and-rate card: “Antwort zeigen”, then “Nicht gewusst · zurück in Fach 1” and “Gewusst · weiter in Fach n”. The progress bar counts the round's cards in Fach 3.
- **Motion:** the one authored moment of the surface. After “Weiter” (or a rating) the card flies into the compartment it now belongs to (460ms, cubic-bezier(0.55, 0, 0.2, 1): translate to the compartment's centre, scale 0.12, fade to 20%), and only on landing do the counts, the stack and the badge change while the compartment flashes once (640ms brand inset ring and 14% brand wash fading out) and its count settles from 1.22×. Turning a card without options rotates it in from -70° (320ms, ease-out); cards with options reveal in place. Reduced motion skips the flight and the turn; the card lands at once.
- **Editor:** inline, never a modal: Vorderseite · Frage and Rückseite · Antwort und warum as 16px textareas; a disclosure “Antwortoptionen wie in der Prüfung” (Quiet Wash, 8px) with the right option and three wrong ones, each beside its “Warum falsch?” (stacked on phones); a module select grouped by learning path, a hint that code goes in backticks, then “In Fach 1 legen” (primary) and Abbrechen. With the right option and at least two wrong ones the card is asked as multiple choice; a half-filled set names what is missing in Warn ink and keeps the save button disabled. After saving, the form stays open for the next card and confirms “Liegt in Fach 1.”
- **Home panel and lesson bridge:** the home panel sits under “Als Nächstes dran” with the compact box (a link to the overview), the tally of cards in Fach 3 (“n von m Zetteln vorne”), the rule in one line and secondary actions only (“Runde mit n Zetteln”, “Neuer Zettel”), so the next-step card keeps the single primary action. After “Merksätze” every lesson shows a Brand Tint bridge: how many of the lesson's cards are in the box and how many already in Fach 3, with “Zettel lernen”.

**The Front-and-Back Rule.** “Vorn” and “hinten” belong to the box: Fach 3 is vorne, Fach 1 hinten. A card has a Vorderseite (the question) and a Rückseite (the answer), and copy never calls them vorn and hinten.

**The Exact-Count Rule.** The box states every compartment's exact number; stacks only show proportion. Counts change when the card lands, never while it is still in the air.

### Questions
- **Meta row:** domain chip, type, difficulty and skill in 12px Tertiary Ink.
- **Stem:** 17px/26px at 54ch.
- **Choice:** white, Control Line border, 8px, 12px 14px padding, 15px/22px, with a 24px letter box. Hover is a brand border on Brand Wash; picked is a brand border with the inset ring on Brand Tint and a brand-filled letter. Revealed: correct is a green border, ring and Correct tint with a green letter; missed (correct but not picked) is a dashed green border; wrong is a red border, ring and Wrong tint; the rest turn Secondary Ink. A 20px check or dismiss circle sits at the right, and each option's explanation (14px/20px) follows at a 50px indent (14px on phones).
- **Feedback:** inline banners take the Correct or Wrong tint with its line colour and a 16px/600 title in the state ink, rising in over 280ms.
- **Session bar:** a fixed white bottom bar with a hairline. On reveal the whole bar takes the Correct or Wrong tint, the verdict (18px/24px bold plus a 13px sub) takes the state ink, and the large primary “Weiter” sits at the right.
- **Case study:** a sticky Quiet Wash panel beside the question (0.9fr to 1.4fr); static above it on phones.

### Exam
- A sticky exam header under the top bar: title, tabular position, and the clock pill (Brand Tint and Brand Ink at 700, the Wrong tint when time is low).
- The overview grid: 40px cells at 4px; answered is Brand Tint, marked an amber ring with a 12px filled flag, current a 2px brand outline.
- Results: a 14px score line with the 70% guide mark, domain report bars and expandable result items.

### Skills Map and Meters
- **Skills tiles:** 44×36px (40×34px on phones), 6px corners, 11px/700 tabular skill IDs. Nicht begonnen is white with a Firm Line border and Tertiary Ink; Gesehen, Sicher and Gemeistert follow the mastery ramp. Hover lifts a tile 1px to shadow-8 and shows an ink tooltip (white 12px/16px, 4px corners). Row icons sit on a 36px, 8px-corner square tinted 10% toward their domain colour.
- **Meters:** an 8px (12px large) Sunken Grey track with a fully rounded fill in the domain or brand colour; the 72×6px mastery bar steps Brand Soft, #479ef5, brand.
- **Leitner boxes:** five bars; box 1 in the Wrong line colour, boxes 2 and 3 Brand Tint Deep, box 4 #479ef5, box 5 brand.

### Code
Code blocks sit on #f7f7f7 inside a Hairline frame, under a white bar with a 12px/600 language label and a subtle Kopieren button; Cascadia 13.5px/21px, tab size 4, VS Code Light+ tokens, comments in italics. Inline code is 0.88em on Sunken Grey with 1px 5px padding and 4px corners, and may wrap anywhere.

### Feedback Links
Every place where content can be wrong carries a quiet “Feedback” link that opens a prefilled GitHub issue (question meta row, lesson section heads, diagram captions, lesson code bars, card heads in the register, the foot of a card in a round). The link is 12px/600 Tertiary Ink with the 16px person-feedback icon, right-aligned in its row (auto margin), Sunken Grey wash and brand ink on hover. Below 560px tight rows show the icon only; the accessible name always starts with “Feedback” and names the target (“zu dieser Frage”). On touch the target grows to 44px with negative vertical margins, so the row keeps its height. In running text (the footer) it is a plain brand link. It never takes button weight: it sits beside content, not in the learner's path.

### Tables
Rows at 14px/20px with 10px 12px padding and Soft Hairline dividers; heads 12px/16px/600 Tertiary Ink; row hover Quiet Wash. Comparison tables zebra-stripe in Quiet Wash. At 560px and below every table (`.stack-table`: lesson comparisons, coverage, module progress) restacks into one card per row: the row header on top, then a 12px/600 Tertiary Ink column label beside each value. The header row stays in the markup for screen readers, and explicit table roles keep VoiceOver reading a table.

## Do's and Don'ts

### Do:
- **Do** put content on white panels (8px, shadow-4) on the #f5f5f5 ground, 20px apart.
- **Do** keep brand blue for the next action and the current position, and use -ink text on -tint fills for every tinted label.
- **Do** pair every verdict colour with an icon and a word, and show it only after the answer is revealed.
- **Do** build every concept diagram from the nine typed tones and six shapes, with a legend, numbered steps, narration and the focus, context and dim states, and ship it only at 0 validator and render-audit errors in EN and DE.
- **Do** hold prose near 54ch (56ch for diagram narration and captions).
- **Do** draw interface icons from the generated Fluent set (20px viewBox, currentColor); `.icon` never shrinks in a flex row, so an icon keeps its size when the text beside it wraps. Diagram nodes take official Azure icons instead.
- **Do** keep the Wiederholen due count in the navigation (a dot on phones): it shows the next step.
- **Do** make sticky columns conditional on fitting the window, and let “Als Nächstes dran” lead when columns collapse.
- **Do** keep every question type keyboard-operable: radios behind the letters, up/down buttons for ordering, selects for matching.
- **Do** honour reduced motion: the build collapses every transition and animation, the flowing arrow and smooth scrolling included; a Zettelkasten card lands without its flight.
- **Do** ask before a reset: “Zurücksetzen” and “Alle zurück in Fach 1” first reveal a question with a Danger action and Abbrechen.
- **Do** name the destination on every Zettelkasten verdict and rating (“Der Zettel wandert in Fach 2.”, “zurück in Fach 1”), so the rule is where the learner acts.
- **Do** explain every option of a Zettelkasten card once it is checked, right or wrong, in one short sentence.

### Don't:
- **Don't** build the generic card-grid dashboard template; the home is a guided path beside a next-step column.
- **Don't** add achievement badges, streak pressure or confetti.
- **Don't** use domain hues for status or decoration, or green and red before an answer is revealed (the exam clock's last 10 minutes are the only exception).
- **Don't** use hard offset shadows or anything outside the Fluent shadow ramp, and don't shadow containers that rest inside a panel.
- **Don't** uppercase labels or track them out; the domain chip's +0.02em is the only positive tracking.
- **Don't** let colour carry meaning alone in a diagram; tones always come with text labels and a legend.
- **Don't** draw a thumbnail arrow where the diagram has no edge, hyphenate code tokens, or start a line with “·”.
- **Don't** route an arrow through a node or a group title, or sit an edge label on an arrow that would show less than 20px on either side.
- **Don't** dim diagram text below Receded Text Grey (#858585).
- **Don't** call a card's sides vorn and hinten; they are Vorderseite and Rückseite, and vorn and hinten mean the box.
- **Don't** use Microsoft logos or imply endorsement; the app's mark is the 103 square, and the footer says it is not an official Microsoft product. Official Azure icons appear only in diagrams, beside the name of the product or block they stand for.
