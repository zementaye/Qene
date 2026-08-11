import { useProgress } from "../context/ProgressContext.jsx";

export function TopBar({ courses = [], courseId, onChangeCourse }) {
  const { streak, hearts, maxHearts, xp } = useProgress();
  return (
    <header className="topbar">
      <div className="topbar-brand">
        <span className="topbar-brand-mark text-amharic" aria-hidden="true">ቅ</span>
        <span className="topbar-brand-name">Qene</span>
      </div>
      {courses.length > 1 && (
        <label className="course-switcher">
          <span className="sr-only">ትምህርት ምረጥ</span>
          <select
            className="course-switcher-select"
            value={courseId}
            onChange={(e) => onChangeCourse(e.target.value)}
            aria-label="ትምህርት ምረጥ"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.fromLanguage.name} → {c.toLanguage.name}
              </option>
            ))}
          </select>
        </label>
      )}
      <div className="topbar-stats">
        <span className="stat stat-streak" title="ተከታታይ ቀናት">
          🔥 {streak}
        </span>
        <span className="stat stat-xp" title="ነጥብ">
          ⭐ {xp}
        </span>
        <span className="stat stat-hearts" title="ልብ">
          {Array.from({ length: maxHearts }).map((_, i) => (
            <span key={i} className={i < hearts ? "heart heart-full" : "heart heart-empty"}>
              {i < hearts ? "♥" : "♡"}
            </span>
          ))}
        </span>
      </div>
    </header>
  );
}
