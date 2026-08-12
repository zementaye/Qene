import { useMemo } from "react";
import { useProgress } from "../context/ProgressContext.jsx";
import { NavIcon } from "../components/layout/NavIcon.jsx";
import { TiletDivider } from "../components/Tilet.jsx";

function formatCountdown(ms) {
  const totalMin = Math.max(1, Math.ceil(ms / 60000));
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h <= 0) return `${m} ደቂቃ`;
  return `${h} ሰዓት ${m} ደቂቃ`;
}

export function HomePage({ course, flatLessons, onSelectLesson, onGoLearn }) {
  const { streak, xp, hearts, maxHearts, completedLessons, msUntilNextHeart } = useProgress();

  const doneCount = flatLessons.filter((l) => completedLessons[l.id]).length;
  const totalLessons = flatLessons.length;
  const pct = totalLessons ? Math.round((doneCount / totalLessons) * 100) : 0;
  const outOfHearts = hearts <= 0;
  const nextHeartMs = msUntilNextHeart();

  const nextLesson = useMemo(() => {
    const firstIncomplete = flatLessons.find((l) => !completedLessons[l.id]);
    return firstIncomplete ?? flatLessons[flatLessons.length - 1];
  }, [flatLessons, completedLessons]);

  const unitSummaries = useMemo(
    () =>
      course.units.map((unit) => {
        const total = unit.lessons.length;
        const done = unit.lessons.filter((l) => completedLessons[l.id]).length;
        return { ...unit, total, done };
      }),
    [course, completedLessons]
  );

  return (
    <div className="page page--home">
      <section className="home-hero">
        <div className="home-hero-text">
          <p className="home-hero-eyebrow">{course.fromLanguage.name} → {course.toLanguage.name}</p>
          <h1 className="home-hero-title">
            እንኳን ደህና መጣህ<span className="home-hero-title-mark text-amharic"> ቅኔ</span> ላይ
          </h1>
          <p className="home-hero-sub">
            {doneCount === 0
              ? "የመጀመሪያ ትምህርትህን ጀምር እና ጉዞህን ጀምር።"
              : `${doneCount} ከ ${totalLessons} ትምህርቶች ጨርሰሃል — ${pct}%`}
          </p>
          {!outOfHearts ? (
            <button className="primary-btn" onClick={() => nextLesson && onSelectLesson(nextLesson)} disabled={!nextLesson}>
              {doneCount === 0 ? "ትምህርት ጀምር" : "ትምህርት ቀጥል"}
              <NavIcon name="chevron" size={18} />
            </button>
          ) : (
            <div className="hearts-empty-banner" role="status">
              <span>💔 ልቦችህ አልቀዋል።</span>
              {nextHeartMs != null && <span>ቀጣይ ልብ በ{formatCountdown(nextHeartMs)} ውስጥ ይመለሳል።</span>}
            </div>
          )}
        </div>
        <div className="home-hero-progress" role="img" aria-label={`${pct}% complete`}>
          <svg viewBox="0 0 120 120" className="progress-ring">
            <circle cx="60" cy="60" r="52" className="progress-ring-track" />
            <circle
              cx="60"
              cy="60"
              r="52"
              className="progress-ring-fill"
              strokeDasharray={`${(pct / 100) * 326.7} 326.7`}
            />
          </svg>
          <span className="progress-ring-label">{pct}%</span>
        </div>
      </section>

      <div className="stat-card-row">
        <div className="stat-card">
          <NavIcon name="streak" size={26} className="stat-card-icon" />
          <span className="stat-card-value">{streak}</span>
          <span className="stat-card-label">ተከታታይ ቀናት</span>
        </div>
        <div className="stat-card">
          <NavIcon name="xp" size={26} className="stat-card-icon" />
          <span className="stat-card-value">{xp}</span>
          <span className="stat-card-label">ጠቅላላ ነጥብ</span>
        </div>
        <div className="stat-card">
          <NavIcon name="heart" size={26} className="stat-card-icon" />
          <span className="stat-card-value">{hearts}/{maxHearts}</span>
          <span className="stat-card-label">ልብ</span>
        </div>
        <div className="stat-card">
          <NavIcon name="book" size={26} className="stat-card-icon" />
          <span className="stat-card-value">{doneCount}/{totalLessons}</span>
          <span className="stat-card-label">ትምህርቶች</span>
        </div>
      </div>

      <div className="home-section-head">
        <TiletDivider height={10} color="var(--gold-400)" />
        <h2 className="home-section-title">የትምህርት ክፍሎች</h2>
        <button className="text-link" onClick={onGoLearn}>ሁሉንም ይመልከቱ →</button>
      </div>

      <div className="unit-card-grid">
        {unitSummaries.map((unit) => (
          <button key={unit.id} className="unit-card" onClick={onGoLearn}>
            <div className="unit-card-top">
              <span className="unit-card-title">{unit.title}</span>
              <span className="unit-card-subtitle">{unit.subtitle}</span>
            </div>
            <div className="unit-card-progress-track">
              <div
                className="unit-card-progress-fill"
                style={{ width: `${unit.total ? (unit.done / unit.total) * 100 : 0}%` }}
              />
            </div>
            <span className="unit-card-count">{unit.done}/{unit.total} ትምህርቶች</span>
          </button>
        ))}
      </div>
    </div>
  );
}
