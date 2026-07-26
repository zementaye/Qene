import { TiletDivider, TiletRing } from "./Tilet.jsx";
import { useProgress } from "../context/ProgressContext.jsx";

// Nodes alternate left/right offset to read as a winding path, the way a
// real footpath (or a line of tilet embroidery) would meander down a page,
// rather than a rigid straight column.
const OFFSETS = [0, 46, 78, 46, 0, -46, -78, -46];

export function SkillPath({ course, flatLessons, onSelectLesson }) {
  const { completedLessons } = useProgress();

  // A lesson unlocks once the lesson immediately before it (in course order)
  // has been completed. The very first lesson is always open.
  const unlocked = new Set();
  flatLessons.forEach((lesson, i) => {
    if (i === 0 || completedLessons[flatLessons[i - 1].id]) {
      unlocked.add(lesson.id);
    }
  });

  return (
    <div className="skillpath">
      <div className="skillpath-header">
        <p className="skillpath-eyebrow">{course.fromLanguage.name} → {course.toLanguage.name}</p>
        <h1 className="skillpath-title">{course.title}</h1>
      </div>

      {course.units.map((unit) => (
        <section key={unit.id} className="unit-block">
          <div className="unit-label">
            <TiletDivider height={10} color="var(--gold-400)" />
            <div className="unit-label-text">
              <span className="unit-title">{unit.title}</span>
              <span className="unit-subtitle">{unit.subtitle}</span>
            </div>
            <TiletDivider height={10} color="var(--gold-400)" />
          </div>

          <div className="unit-lessons">
            {unit.lessons.map((lesson, i) => {
              const done = !!completedLessons[lesson.id];
              const locked = !unlocked.has(lesson.id);
              const offset = OFFSETS[i % OFFSETS.length];
              const state = done ? "done" : locked ? "locked" : "current";
              return (
                <button
                  key={lesson.id}
                  className={`lesson-node lesson-node--${state}`}
                  style={{ "--offset": `${offset}px` }}
                  disabled={locked}
                  onClick={() => onSelectLesson(lesson)}
                  aria-label={lesson.title}
                >
                  <span className="lesson-node-ring">
                    <TiletRing size={72} color={done ? "var(--gesho-500)" : locked ? "var(--coffee-700)" : "var(--gold-500)"} />
                    <span className="lesson-node-icon">{done ? "✓" : locked ? "🔒" : "▶"}</span>
                  </span>
                  <span className="lesson-node-title">{lesson.title}</span>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
