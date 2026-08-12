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

## Deploy (Render)

The repo includes `render.yaml`, so Render can deploy it with no manual
config:

1. Push this repo to GitHub (or GitLab).
2. In the Render dashboard: **New → Blueprint**, point it at the repo.
   Render reads `render.yaml` and creates a free static site with
   `npm install && npm run build` as the build command, serving `dist/`.
3. First deploy takes a couple minutes; after that it's a normal
   auto-deploy-on-push static site with a Render-provided `.onrender.com`
   URL (custom domains are free to add in the dashboard).

There's nothing running server-side today — progress lives entirely in
`localStorage` — so a static site is the whole deployment. When the
accounts/sync backend lands, that'll be a second service added to the same
`render.yaml`, not a new deploy target.

## What's in the app

The app is now a real multi-page web app — Home, Learn, Profile, and
Courses each have their own URL (`#/home`, `#/learn`, `#/profile`,
`#/courses`) via a small built-in hash router (`src/router.jsx`), with a
sidebar on desktop and a bottom tab bar on mobile. No page-management
dependency was added; it's ~40 lines of React on top of the browser's own
`hashchange` event, so `npm install` still only pulls in React + Vite.

- **Home** — a dashboard: streak/XP/hearts at a glance, a "continue where
  you left off" card, and unit-progress tiles.
- **Learn** — the skill path (unchanged mechanic: a winding tilet-motif
  trail of lesson nodes, locked until the one before it is done).
- **Lesson** — the immersive, distraction-free exercise runner (no
  sidebar/nav while a lesson is active).
- **Profile** — per-course progress bars and an achievements grid (first
  lesson, streak milestones, XP milestones, perfect scores, course
  completion — all computed from existing progress data, nothing new to
  persist).
- **Courses** — browse and switch the active course, with "coming soon"
  cards for languages not built yet (French, German, Swahili) so the
  catalog reads as a roadmap, not just two options in a dropdown.

Two courses ship with content (progress, XP, streak, and hearts are shared
across courses; lesson completion is tracked per course so switching never
overwrites the other course's progress):

- **Amharic → English** — 12 units / 13 lessons / 107 exercises:
  **Greetings**, **I & You** (pronouns), **Numbers 1–20**, **Family**,
  **Food & Drink**, **Common Phrases**, **Colors**, **Days & Time**,
  **Weather**, **Animals**, **Body Parts**, **Common Verbs**.
- **Amharic → Arabic** — 6 units / 6 lessons / 40 exercises:
  **Greetings**, **Numbers 1–5**, **Family**, **Food & Drink**,
  **Colors**, **Common Phrases**. Proves out the "just drop in a content
  file" claim below — see `src/data/courses/am-ar.js`.

Four exercise types are wired up: multiple choice, type-the-translation,
match-the-pairs, and listening (audio-first — the target-language word is
spoken aloud and the learner picks its Amharic meaning; falls back to
showing the text if the browser has no speech synthesis voice installed).

⚠️ The Amharic and Arabic content are a solid starting point but haven't
been reviewed by a native speaker for register/dialect (e.g. አንተ vs አንቺ
gendered forms in "you") — worth a pass before this goes in front of real
learners.

## How the engine works

- **`src/router.jsx`** — the hash router. `useHashRoute()` returns the
  current path and a `navigate(path)` function; that's the whole API.
- **`src/components/App.jsx`** — the shell: reads the route, decides which
  page to render, and hides the sidebar/bottom-nav during an active lesson.
- **`src/pages/*.jsx`** — one file per page (Home, Learn, Lesson, Results,
  Profile, Courses). Adding a new page is: create the file, add a nav
  entry in `src/components/layout/navItems.js`, add a case in `App.jsx`.
- **`src/data/courses/*.js`** — the actual course content (units → lessons
  → exercises), one file per course. This is the file to hand-edit or
  generate more of.
- **`src/data/courseLoader.js`** — registry. Add a new course file, add one
  line here, done. Nothing else needs to change.
- **`src/context/ProgressContext.jsx`** — hearts (5, regenerate 1 every 4h,
  with a countdown shown once you run out), XP, daily streak, and
  per-lesson completion, all persisted to `localStorage` so progress
  survives closing the tab/browser.
- **`src/utils/speech.js`** — pronunciation via the browser's built-in
  Web Speech API (`speechSynthesis`) instead of recorded audio files, so
  there are zero audio assets to produce or host. Quality depends on the
  voices installed on the learner's device/OS.
- **`src/components/exercises/`** — one file per exercise type
  (`multiple_choice`, `translate`, `match`, `listening`). Adding a new type
  (e.g. sentence-building, speaking-with-mic) means adding a component here
  and registering it in `LessonSession.jsx`'s `EXERCISE_COMPONENTS` map.

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
- **More courses** — a couple of European languages are the next most
  requested by the diaspora; same content-file pattern as `am-en.js` /
  `am-ar.js` (Arabic is done — see above).
- **Audio quality** — Web Speech API voices vary by device; recorded audio
  clips (or a TTS API) would sound more natural, at the cost of needing
  real audio assets.
- **Accounts/sync** — right now progress is local-only per browser. A
  backend (even something lightweight like Supabase) would let progress
  follow a learner across devices.
- **Speaking exercises** — mic input + pronunciation scoring is the one
  exercise type not yet built; listening is done (see above).
