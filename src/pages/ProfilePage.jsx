import { useMemo } from "react";
import { useProgress, getProficiencyLevel } from "../context/ProgressContext.jsx";
import { listCourses, flattenLessons } from "../data/courseLoader.js";
import { NavIcon } from "../components/layout/NavIcon.jsx";
import { TiletDivider } from "../components/Tilet.jsx";

function computeAchievements({ streak, xp, completedLessons, courseProgress }) {
  const totalDone = Object.keys(completedLessons).length;
  const anyCourseComplete = courseProgress.some((c) => c.total > 0 && c.done === c.total);
  const perfectLessons = Object.values(completedLessons).filter((c) => c.bestScore === 100).length;

  return [
    { id: "first-lesson", label: "የመጀመሪያ ትምህርት", sub: "First lesson", icon: "book", earned: totalDone >= 1 },
    { id: "streak-3", label: "3 ቀን ተከታታይ", sub: "3-day streak", icon: "streak", earned: streak >= 3 },
    { id: "streak-7", label: "7 ቀን ተከታታይ", sub: "7-day streak", icon: "streak", earned: streak >= 7 },
    { id: "xp-100", label: "100 ነጥብ", sub: "100 XP", icon: "xp", earned: xp >= 100 },
    { id: "xp-500", label: "500 ነጥብ", sub: "500 XP", icon: "xp", earned: xp >= 500 },
    { id: "perfect-5", label: "5 ፍጹም ትምህርቶች", sub: "5 perfect scores", icon: "trophy", earned: perfectLessons >= 5 },
    { id: "course-complete", label: "ኮርስ ጨረስክ", sub: "Completed a course", icon: "trophy", earned: anyCourseComplete },
  ];
}

export function ProfilePage({ onStartPlacementTest }) {
  const { streak, xp, hearts, maxHearts, completedLessons, proficiencyLevel, proficiencyScore } = useProgress();
  const proficiency = getProficiencyLevel(proficiencyLevel);

  const courseProgress = useMemo(
    () =>
      listCourses().map((course) => {
        const lessons = flattenLessons(course);
        const done = lessons.filter((l) => completedLessons[l.id]).length;
        return { id: course.id, course, total: lessons.length, done };
      }),
    [completedLessons]
  );

  const achievements = useMemo(
    () => computeAchievements({ streak, xp, completedLessons, courseProgress }),
    [streak, xp, completedLessons, courseProgress]
  );
  const earnedCount = achievements.filter((a) => a.earned).length;

  return (
    <div className="page page--profile">
      <section className="profile-hero">
        <div className="profile-avatar" aria-hidden="true">
          <span className="text-amharic">ቅ</span>
        </div>
        <div>
          <h1 className="profile-name">የእኔ መገለጫ</h1>
          <p className="profile-sub">{earnedCount} / {achievements.length} ሽልማቶች ተገኝተዋል</p>
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
      </div>

      <div className="home-section-head">
        <TiletDivider height={10} color="var(--gold-400)" />
        <h2 className="home-section-title">የቋንቋ ደረጃ</h2>
      </div>
      <div className="placement-card">
        {proficiency ? (
          <>
            <div className="placement-card-current">
              <span className="placement-card-badge">
                <span className="text-amharic">{proficiency.label}</span>
                <span lang="en">{proficiency.sub}</span>
              </span>
              <span className="placement-card-score">{proficiencyScore}%</span>
            </div>
            <p className="placement-card-hint">
              ትምህርት ስትሰራ የሚታይህ ማብራሪያ በዚህ ደረጃ ላይ የተመሠረተ ነው። ደረጃህ ካደገ እንደገና ፈትን።
            </p>
          </>
        ) : (
          <p className="placement-card-hint">
            ትምህርት ላይ የበለጠ ተስማሚ ማብራሪያ እንዲታይህ አጭር የደረጃ ፈተና ውሰድ።
          </p>
        )}
        <button className="secondary-btn" onClick={onStartPlacementTest}>
          {proficiency ? "እንደገና ፈትን" : "የደረጃ ፈተና ውሰድ"}
        </button>
      </div>

      <div className="home-section-head">
        <TiletDivider height={10} color="var(--gold-400)" />
        <h2 className="home-section-title">የኮርስ እድገት</h2>
      </div>
      <div className="profile-course-list">
        {courseProgress.map(({ id, course, total, done }) => (
          <div key={id} className="profile-course-row">
            <div className="profile-course-label">
              <span className="text-amharic">{course.fromLanguage.name}</span>
              <span className="sidebar-course-arrow">→</span>
              <span>{course.toLanguage.label ?? course.toLanguage.name}</span>
            </div>
            <div className="unit-card-progress-track">
              <div className="unit-card-progress-fill" style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
            </div>
            <span className="unit-card-count">{done}/{total}</span>
          </div>
        ))}
      </div>

      <div className="home-section-head">
        <TiletDivider height={10} color="var(--gold-400)" />
        <h2 className="home-section-title">ሽልማቶች</h2>
      </div>
      <div className="achievement-grid">
        {achievements.map((a) => (
          <div key={a.id} className={`achievement-card ${a.earned ? "achievement-card--earned" : "achievement-card--locked"}`}>
            <NavIcon name={a.earned ? a.icon : "lock"} size={24} />
            <span className="achievement-label text-amharic">{a.label}</span>
            <span className="achievement-sub">{a.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
