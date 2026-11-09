# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Vite + React + TypeScript static single-page app (hash routing), no backend, no accounts, progress persisted in `localStorage`. Runs locally with one command and can be hosted as static files. The kickoff brief suggested a static SPA and left the exact choice open.

## Users

A single learner preparing for Exam AI-103 (Developing AI Apps and Agents on Azure). Little hands-on experience with Microsoft Foundry, Foundry Agent Service and Foundry Tools, so concepts are explained from the ground up. Strongly visual learner. Studies in longer sessions on a laptop/desktop and in short question rounds on a smartphone.

## Product Purpose

Prepare the learner to pass AI-103 (scaled score 700 of 1000) by covering every skills-outline bullet (skills measured as of April 16, 2026) and every module of the official course AI-103T00 (4 learning paths, 31 modules) with illustrated lessons, an original question bank, a timed exam simulation, spaced repetition of mistakes and a progress view. Success: no uncovered bullet or module, facts that match current Microsoft Learn documentation, and the learner always knows what to do next.

## Positioning

A guided, illustrated path through the official AI-103 scope. Every lesson is built around a step-through diagram; every question is original, mapped to a skills-outline bullet and a module, and backed by a current learn.microsoft.com source. It is not a dump and does not copy Learn knowledge checks or the official Practice Assessment; it links to them instead.

## Operating Context

- Exam facts: five domains weighted 25–30 / 30–35 / 10–15 / 10–15 / 10–15 %. Associate role-based exams without labs run 100 minutes and typically contain 40–60 questions. Scaled score 1–1000, 700 to pass; one point per correct component, no penalty for guessing. Microsoft Learn can be opened during role-based exams.
- Official companions the app links to: study guide, course AI-103T00 with its learning paths and modules (module knowledge checks), Practice Assessment on AI Skills Navigator (aka.ms/AI103-PA), exam sandbox (aka.ms/examdemo), exam prep video (aka.ms/AI103-ExamPrep). Community: John Savill's AI-103 Study Cram, linked as a non-official review; points taken from it enter the content only after current Learn confirms them, in the app's own words.
- Study loop: the home screen shows what is next in a guided path: lesson → questions → review of mistakes. Beside it, the Zettelkasten offers short flashcard rounds.

## Capabilities and Constraints

- Lesson and question content switchable between German and English; UI chrome in German; product, API and SDK names stay English in both languages.
- Question types: single choice, multiple select, ordering, matching (drag-and-drop style with a keyboard alternative), Python code completion, short case studies. Every question carries domain, skills-outline bullet, module, difficulty, an explanation per option, at least one current learn.microsoft.com source and a lastVerified date.
- Modes: learning mode with instant feedback, timed exam simulation weighted by domain, review of wrong answers with spaced repetition, filters by domain/module/difficulty, progress per domain and module.
- Zettelkasten (user request, 2026-11-09): a Leitner card box with three compartments, prominent on the home screen. The question is on the front of a card and the answer on the back. Known → the card moves one compartment forward; not known → back to compartment 1; the goal is every card two compartments forward, in compartment 3. No time intervals: a round cycles until all of its cards reach the front. Prefilled with one card per concept, exam trap and takeaway of every lesson (original question fronts, backs from the lesson text), plus the learner's own cards; starter cards can be taken out of the box. Separate from the question review, which keeps its five timed boxes.
- Content policy: no exam dumps or brain-dump sites; no copying or close paraphrasing of Learn knowledge checks or Practice Assessment items; only current documentation; renamed or retired products never appear under outdated names.
- A content validator fails on a missing correct answer, option explanation, source URL, domain/skill mapping, or any skills-outline bullet or module without questions, and on any lesson concept, trap or takeaway without exactly one Zettelkasten card.

## Brand Commitments

Use current Microsoft product names (Microsoft Foundry, Foundry Tools, Foundry Agent Service, Azure Language / Speech / Translator / Content Understanding / Document Intelligence in Foundry Tools, Azure AI Search). This is a personal study tool, not a Microsoft product, and must not imply endorsement.

Visual direction (user choice, 2026-11-06): the category standard, played straight and executed at full craft — a clean learning dashboard in the Microsoft Learn style. The craft bar is set by Microsoft Learn, Khan Academy and Duolingo without gamification (no badges, streak pressure or confetti). The user explicitly does not want it to look like a generic dashboard template, so craft lives in the guided path, the diagrams and the precision of every state.

## Evidence on Hand

- Course structure pulled from the Microsoft Learn Catalog API: course.ai-103t00, 4 learning paths, 31 modules, 244 units.
- Study guide skills outline: 5 domains, 13 skill groups, 64 bullets.
- No testimonials, pass rates or usage statistics exist; none may be invented.

## Product Principles

1. Always show the next step: the learner never has to wonder what to study now.
2. Picture first: every concept gets a diagram or comparison before prose.
3. Exam-true: weights, timing, scoring and terminology mirror the real exam and current docs.
4. Traceable: every fact links to a current Learn source and every question is original.
5. Honest progress: progress reflects retained knowledge (spaced repetition), not clicks.

## Accessibility & Inclusion

Diagrams carry text labels and step captions, never color alone. Every question type is keyboard-operable, including matching and ordering. Motion respects reduced-motion preferences. Layouts work down to smartphone width for short question rounds.
