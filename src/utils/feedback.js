// Builds the "why" behind an answer for the lesson feedback panel (see
// LessonSession.jsx). Deliberately reuses the exercise's own curated
// prompt/answer/pairs text as the example - it never invents new Amharic
// or target-language phrases, so nothing shown here can be linguistically
// wrong, only ever a real line pulled from the course data.
//
// How much is shown scales with the learner's proficiency level (from the
// placement test, see PlacementTest.jsx / ProgressContext.jsx): beginners
// get the bare word pair, higher levels get the usage note and a second
// example pulled from elsewhere in the same lesson.

import { getUnitNote } from "../data/lessonNotes.js";

const ETHIOPIC_RE = /[\u1200-\u137F]/;

function isAmharicText(str) {
  return typeof str === "string" && ETHIOPIC_RE.test(str);
}

// Given two candidate strings (in no particular language order), figures
// out which is the Amharic side and which is the target-language side by
// looking at the actual characters, falling back to `promptLang` only
// when neither string contains Ethiopic script (e.g. a target-language
// prompt whose "answer" is a number or name).
function classify(candidateA, candidateB, fallbackPromptLang) {
  const aIsAm = isAmharicText(candidateA);
  const bIsAm = isAmharicText(candidateB);
  if (aIsAm && !bIsAm) return { amharic: candidateA, target: candidateB };
  if (bIsAm && !aIsAm) return { amharic: candidateB, target: candidateA };
  return fallbackPromptLang === "am"
    ? { amharic: candidateA, target: candidateB }
    : { amharic: candidateB, target: candidateA };
}

// Returns { amharic, target } for one exercise, or null if the exercise
// type doesn't carry a clean single word/phrase pair.
function pairFromExercise(exercise) {
  if (!exercise) return null;
  switch (exercise.type) {
    case "multiple_choice":
      return classify(exercise.prompt, exercise.options[exercise.correctIndex], exercise.promptLang);
    case "translate":
      return classify(exercise.prompt, exercise.answer, exercise.promptLang);
    case "listening":
      return classify(exercise.options[exercise.correctIndex], exercise.say, "am");
    case "match":
      if (!exercise.pairs?.length) return null;
      return { amharic: exercise.pairs[0].a, target: exercise.pairs[0].b };
    default:
      return null;
  }
}

// A second pair for higher levels: for `match` exercises there's usually
// more than one pair on screen already, so reuse the next one; otherwise
// look at the other exercises in the same lesson for another clean pair.
function secondaryPair(exercise, lesson) {
  if (exercise.type === "match" && exercise.pairs?.length > 1) {
    return { amharic: exercise.pairs[1].a, target: exercise.pairs[1].b };
  }
  const others = lesson?.exercises?.filter((e) => e !== exercise) ?? [];
  for (const other of others) {
    const pair = pairFromExercise(other);
    if (pair && pair.amharic && pair.target) return pair;
  }
  return null;
}

// level: one of PROFICIENCY_LEVELS ids ("beginner" | "elementary" |
// "intermediate" | "advanced"), or null/undefined before the learner has
// taken the placement test (treated the same as "beginner" - simplest
// view until we know more).
export function buildAnswerFeedback({ exercise, lesson, level }) {
  const primary = pairFromExercise(exercise);
  const note = getUnitNote(lesson?.unitSubtitle);
  const showNote = level && level !== "beginner";
  const showSecondary = level === "intermediate" || level === "advanced";
  const secondary = showSecondary ? secondaryPair(exercise, lesson) : null;

  return {
    primary,
    note: showNote ? note : null,
    secondary,
    tip: level === "advanced" ? "ራስህ ተመሳሳይ ዓረፍተ ነገር ለመሥራት ሞክር።" : null,
  };
}
