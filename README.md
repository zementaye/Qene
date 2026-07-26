# Qene (ቅኔ) — a Duolingo-style app for Habesha learners

A language-learning web app whose interface is in Amharic, built for
Amharic speakers learning other languages. Named after "qene" (ቅኔ), the
classical Ethiopian art of poetic wordplay taught for centuries in church
schools — "wax and gold," layered meaning built word by word. The woven
"tilet" pattern from habesha textiles is still used throughout as the
recurring visual motif (the path between lessons, section dividers).

The demo course teaches **English**, but the engine is language-agnostic:
adding Arabic, French, Italian, etc. is just adding another content file —
no app code changes needed.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
```

To build a static production bundle you can host anywhere (Netlify,
Vercel, GitHub Pages, or your own server):

```bash
npm run build      # outputs to dist/
npm run preview    # sanity-check the production build locally
```

## What's in the demo course

6 units / lessons, ~48 exercises total, Amharic → English:
**Greetings**, **I & You** (pronouns), **Numbers 1–10**, **Family**,
**Food & Drink**, **Common Phrases**. Three exercise types are wired up:
multiple choice, type-the-translation, and match-the-pairs.

⚠️ The Amharic content is a solid starting point but hasn't been reviewed
by a native speaker for register/dialect (e.g. አንተ vs አንቺ gendered forms
in "you") — worth a pass before this goes in front of real learners.

## How the engine works

- **`src/data/courses/am-en.js`** — the actual course content (units →
  lessons → exercises). This is the file to hand-edit or generate more of.
- **`src/data/courseLoader.js`** — registry. Add a new course file, add one
  line here, done. Nothing else needs to change to support e.g. `am-ar.js`.
- **`src/context/ProgressContext.jsx`** — hearts (5, regenerate 1 every 4h),
  XP, daily streak, and per-lesson completion, all persisted to
  `localStorage` so progress survives closing the tab/browser.
- **`src/utils/speech.js`** — pronunciation via the browser's built-in
  Web Speech API (`speechSynthesis`) instead of recorded audio files, so
  there are zero audio assets to produce or host. Quality depends on the
  voices installed on the learner's device/OS.
- **`src/components/exercises/`** — one file per exercise type. Adding a
  new type (e.g. listening, sentence-building, speaking-with-mic) means
  adding a component here and registering it in `LessonSession.jsx`'s
  `EXERCISE_COMPONENTS` map.

## Design notes

Palette and motif are drawn from the coffee ceremony and habesha textile
weaving rather than the Ethiopian flag or generic app-template colors:
roasted coffee brown, unbleached cotton cream, meskel-flower gold, berbere
clay-red, gesho-leaf green. Headers use Fraunces (serif), Amharic text uses
Noto Sans Ethiopic (the only free web font with full Ge'ez script coverage
at this quality), UI chrome uses DM Sans.

## Roadmap / good next additions

- **Android/iOS wrap** — this is a plain web app today; wrapping it with
  Capacitor would get you real app-store APKs/IPAs reusing 100% of this
  code, with push notifications for streak reminders (very on-brand after
  the reminder app we built earlier).
- **More courses** — Arabic and a couple of European languages are the
  most requested by the diaspora; same content-file pattern as `am-en.js`.
- **Audio quality** — Web Speech API voices vary by device; recorded audio
  clips (or a TTS API) would sound more natural, at the cost of needing
  real audio assets.
- **Accounts/sync** — right now progress is local-only per browser. A
  backend (even something lightweight like Supabase) would let progress
  follow a learner across devices.
- **Listening & speaking exercises** — the exercise-type system is built
  to make this a drop-in addition once you're ready.
