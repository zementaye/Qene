import { useProgress } from "../context/ProgressContext.jsx";

export function TopBar() {
  const { streak, hearts, maxHearts, xp } = useProgress();
  return (
    <header className="topbar">
      <div className="topbar-brand">
        <span className="topbar-brand-mark text-amharic" aria-hidden="true">ቅ</span>
        <span className="topbar-brand-name">Qene</span>
      </div>
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
              ♥
            </span>
          ))}
        </span>
      </div>
    </header>
  );
}
