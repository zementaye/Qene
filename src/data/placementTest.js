// Builds a proficiency placement test out of a course's own exercises -
// no separate test content to author or keep in sync. Only auto-gradable,
// no-setup types (multiple_choice, translate) are used, since the test
// should measure recall without listening/matching interactions getting
// in the way of a quick assessment.
//
// Difficulty is approximated by position: earlier units are assumed
// easier than later ones (true by construction - every course file is
// written in that order), so an even sample across the whole course spans
// easy -> hard, and each picked question is tagged with the tier that
// position falls into for weighted scoring.

import { flattenLessons } from "./courseLoader.js";

const GRADABLE_TYPES = new Set(["multiple_choice", "translate"]);

export const TIER_WEIGHT = { easy: 1, medium: 1.5, hard: 2 };

export function buildPlacementQuestions(course, countTarget = 12) {
  const flat = flattenLessons(course);
  const pool = [];
  flat.forEach((lesson) => {
    lesson.exercises.forEach((exercise, exIdx) => {
      if (!GRADABLE_TYPES.has(exercise.type)) return;
      pool.push({
        exercise,
        unitId: lesson.unitId,
        unitTitle: lesson.unitTitle,
        unitSubtitle: lesson.unitSubtitle,
        lessonId: lesson.id,
        qid: `${lesson.id}-${exIdx}`,
      });
    });
  });
  if (pool.length === 0) return [];

  const n = Math.min(countTarget, pool.length);
  const step = pool.length / n;
  const picked = [];
  for (let i = 0; i < n; i++) {
    picked.push(pool[Math.floor(i * step)]);
  }

  return picked.map((q, i) => {
    const tier = i < n / 3 ? "easy" : i < (2 * n) / 3 ? "medium" : "hard";
    return { ...q, tier, weight: TIER_WEIGHT[tier] };
  });
}

// Weighted percentage (0-100) from a list of { weight } questions and a
// Set/array of the qids answered correctly.
export function scorePlacement(questions, correctQids) {
  const correct = new Set(correctQids);
  let earned = 0;
  let total = 0;
  for (const q of questions) {
    total += q.weight;
    if (correct.has(q.qid)) earned += q.weight;
  }
  return total > 0 ? (earned / total) * 100 : 0;
}
