import { amEnCourse } from "./courses/am-en.js";

// Add a new language by dropping another file in ./courses that follows the
// same shape as am-en.js, then registering it here. The rest of the app
// (skill path, exercise runner, progress tracking) needs zero changes.
export const COURSES = {
  "am-en": amEnCourse,
};

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
