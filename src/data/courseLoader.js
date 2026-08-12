import { amEnCourse } from "./courses/am-en.js";
import { amArCourse } from "./courses/am-ar.js";

// Add a new language by dropping another file in ./courses that follows the
// same shape as am-en.js, then registering it here. The rest of the app
// (skill path, exercise runner, progress tracking) needs zero changes.
export const COURSES = {
  "am-en": amEnCourse,
  "am-ar": amArCourse,
};

export const DEFAULT_COURSE_ID = "am-en";

export function getCourse(courseId) {
  return COURSES[courseId];
}

export function listCourses() {
  return Object.values(COURSES);
}

// Flatten a course into an ordered list of lessons, each carrying its unit info.
export function flattenLessons(course) {
  const out = [];
  for (const unit of course.units) {
    for (const lesson of unit.lessons) {
      out.push({ ...lesson, unitId: unit.id, unitTitle: unit.title, unitSubtitle: unit.subtitle });
    }
  }
  return out;
}

// Total exercise count across every lesson in a course — used by the
// dashboard/profile pages to show "how much is in here" at a glance.
export function countExercises(course) {
  return flattenLessons(course).reduce((sum, l) => sum + l.exercises.length, 0);
}

// Courses that aren't built yet but are worth showing as a preview on the
// Courses page, so the catalog reads as a living roadmap rather than just
// the two shipped courses. Not registered in COURSES — nothing to select.
export const UPCOMING_COURSES = [
  { id: "am-fr", fromLabel: "አማርኛ", toLabel: "Français", toName: "French" },
  { id: "am-de", fromLabel: "አማርኛ", toLabel: "Deutsch", toName: "German" },
  { id: "am-sw", fromLabel: "አማርኛ", toLabel: "Kiswahili", toName: "Swahili" },
];
