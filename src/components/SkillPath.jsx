import { useEffect, useState } from "react";
import { TiletDivider, TiletRing } from "./Tilet.jsx";
import { useProgress } from "../context/ProgressContext.jsx";

// Nodes alternate left/right offset to read as a winding path, the way a
// real footpath (or a line of tilet embroidery) would meander down a page,
// rather than a rigid straight column.
const OFFSETS = [0, 46, 78, 46, 0, -46, -78, -46];

function formatCountdown(ms) {
  const totalMin = Math.max(1, Math.ceil(ms / 60000));
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h <= 0) return `${m} ደቂቃ`; // "m minutes"
  return `${h} ሰዓት ${m} ደቂቃ`; // "h hours m minutes"
}

export function SkillPath({ course, flatLessons, onSelectLesson }) {
  const { completedLessons, hearts, msUntilNextHeart } = useProgress();
  const [, forceTick] = useState(0);

  // Hearts regenerate in the background; re-render once a minute so the
  // "next heart in..." countdown and the out-of-hearts lock stay accurate
  // even if the learner just sits on this screen.
  useEffect(() => {
    const id = setInterval(() => forceTick((n) => n + 1), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  // A lesson unlocks once the lesson immediately before it (in course order)
  // has been completed. The very first lesson is always open.
  const unlocked = new Set();
  flatLessons.forEach((lesson, i) => {
    if (i === 0 || completedLessons[flatLessons[i - 1].id]) {
      unlocked.add(lesson.id);
    }
  });

  const totalLessons = flatLessons.length;
  const doneCount = flatLessons.filter((l) => completedLessons[l.id]).length;
  const courseComplete = totalLessons > 0 && doneCount === totalLessons;
  const outOfHearts = hearts <= 0;
  const nextHeartMs = msUntilNextHeart();

  return (
    <div className="skillpath">
      <div className="skillpath-header">
        <p className="skillpath-eyebrow">{course.fromLanguage.name} → {course.toLanguage.name}</p>
        <h1 className="skillpath-title">{course.title}</h1>
        <p className="skillpath-progress-summary">
          {doneCount} / {totalLessons} ትምህርቶች ተጠናቀዋል
        </p>
      </div>

      {courseComplete && (
        <div className="course-complete-banner" role="status">
          <span className="course-complete-emoji">🏆</span>
          <span>ይህን ትምህርት ሙሉ በሙሉ ጨርሰሃል! ነጥብህን ለማሻሻል ማንኛውንም ትምህርት እንደገና መድገም ትችላለህ።</span>
        </div>
      )}

      {outOfHearts && (
        <div className="hearts-empty-banner" role="status">
          <span>💔 ልቦችህ አልቀዋል።</span>
          {nextHeartMs != null && <span>ቀጣይ ልብ በ{formatCountdown(nextHeartMs)} ውስጥ ይመለሳል።</span>}
        </div>
      )}

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
              const disabled = locked || (outOfHearts && !done);
              const offset = OFFSETS[i % OFFSETS.length];
              const state = done ? "done" : locked ? "locked" : "current";
              return (
                <button
                  key={lesson.id}
                  className={`lesson-node lesson-node--${state}`}
                  style={{ "--offset": `${offset}px` }}
                  disabled={disabled}
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
