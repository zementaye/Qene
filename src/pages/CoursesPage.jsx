import { countExercises, flattenLessons, UPCOMING_COURSES } from "../data/courseLoader.js";
import { NavIcon } from "../components/layout/NavIcon.jsx";

export function CoursesPage({ courses, courseId, onChangeCourse }) {
  return (
    <div className="page page--courses">
      <div className="app-header-titles" style={{ marginBottom: "var(--space-6)" }}>
        <h1 className="app-header-title">ኮርሶች</h1>
        <p className="app-header-subtitle">የምትማረውን ቋንቋ ምረጥ</p>
      </div>

      <div className="course-grid">
        {courses.map((course) => {
          const lessonCount = flattenLessons(course).length;
          const exerciseCount = countExercises(course);
          const active = course.id === courseId;
          return (
            <button
              key={course.id}
              className={`course-card ${active ? "course-card--active" : ""}`}
              onClick={() => onChangeCourse(course.id)}
            >
              <div className="course-card-top">
                <NavIcon name="globe" size={28} />
                {active && <span className="course-card-badge">የአሁኑ</span>}
              </div>
              <h3 className="course-card-title">{course.toLanguage.label ?? course.toLanguage.name}</h3>
              <p className="course-card-sub">
                <span className="text-amharic">{course.fromLanguage.name}</span> → {course.toLanguage.name}
              </p>
              <p className="course-card-stats">
                {course.units.length} ክፍሎች · {lessonCount} ትምህርቶች · {exerciseCount} ልምምዶች
              </p>
            </button>
          );
        })}

        {UPCOMING_COURSES.map((c) => (
          <div key={c.id} className="course-card course-card--locked">
            <div className="course-card-top">
              <NavIcon name="lock" size={26} />
              <span className="course-card-badge course-card-badge--muted">በቅርቡ</span>
            </div>
            <h3 className="course-card-title">{c.toName}</h3>
            <p className="course-card-sub">
              <span className="text-amharic">{c.fromLabel}</span> → {c.toLabel}
            </p>
            <p className="course-card-stats">በቅርቡ ይመጣል · Coming soon</p>
          </div>
        ))}
      </div>
    </div>
  );
}
