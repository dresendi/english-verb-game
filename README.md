# Verb Quest

A playful, English-only Next.js application for a sixth-grade learner. All 100 irregular verbs from the supplied worksheet are included, with AI-generated illustrations.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. To use another port: `npm run dev -- --port 3127`.

```sh
npm test
npm run build
npm start
```

The production build is a static export in `out/`; it can be hosted by any static hosting provider. No database, account, API key, or server-side service is required. `npm start` serves the production export locally.

## Games

- **Spooky Sentence Lab.** A worksheet of 10 Halloween-themed sentences with the base verb in parentheses and a requested tense. Type the complete missing phrase, including auxiliaries when necessary. Practices present simple, past simple, present/past continuous, present perfect, and will-future. Check all answers together for individual explanations, a score out of ten, and 10 XP per correct answer. Answers remain while switching sections during the visit; reloading starts a fresh worksheet. Worksheet XP and completed missions persist, but worksheet answers do not change verb-form mastery or the picture-game review queue.
- **Picture it. Name it.** An illustration and meaning clue identify a verb. Type its requested base, past simple, or past participle form. Select a particular form or mix all three. The supplied visual reference informs the picture-first concept; answers remain open text rather than multiple choice.
- **One verb. Three powers.** The same illustration and the base form appear; type the past simple and past participle in two separate fields.
- Missions contain up to 10 distinct verbs. Choose all verbs or one of ten groups. Mistakes and hint-assisted answers enter an extra-practice queue.
- Responses ignore case and surrounding spaces. Valid alternatives are accepted; answers containing an incorrect alternative are rejected.
- Feedback teaches all three forms. Optional pronunciation uses the device's English speech-synthesis voice; availability and pronunciation depend on the browser.

## Progress

Correct answers earn 10 XP, or 15 XP with an unassisted combo of at least three. Hint-assisted answers earn 5 XP and do not increase mastery. Three unassisted successes master a verb; an error decreases mastery by one. Levels advance every 200 XP. Six badges celebrate milestones.

Progress lives in browser localStorage under `verb-quest-v1`. It is specific to the browser and origin; it does not sync across devices or between localhost and the published site. Clearing browser data removes progress. The achievements screen offers an explicit reset confirmation.

## Content and assets

- `lib/verbs.mjs`: all 100 entries, meaning clues, accepted variants, and round/answer logic.
- `public/art/verbs-1.png` through `verbs-4.png`: four generated 5×5 atlases with one scene per verb, displayed using CSS crops. Images are bundled and never generated during play.
- `docs/image-prompts.md`: complete prompts and generation provenance (built-in ImageGen).
- `app/page.tsx`: game flow, collection, achievements, and local progress.
- `app/globals.css`: responsive desktop/mobile design and reduced-motion support.
- `tests/verbs.test.mjs`: dataset, alternatives, spelling normalization, corrected forms, and round integrity tests.

The worksheet's `awake–awoke–awaken` is corrected to `awake–awoke–awoken`, with valid `awaked` variants accepted. Both British and American variants are supported where listed. `Lie` means recline (`lay/lain`), not tell an untruth; `hang` uses the ordinary `hung` sense. `Strike` includes the worksheet's `stricken` alongside the common `struck`. Abstract or overlapping verbs include definition clues to make their intended meaning clear.

The application does not collect personal data or use analytics. Google Fonts supplies the optional display fonts; system fonts are used as fallback.
