import { useProgress } from "../../context/ProgressContext.jsx";
import { NavIcon } from "./NavIcon.jsx";

export function AppHeader({ title, subtitle }) {
  const { streak, hearts, maxHearts, xp } = useProgress();

  return (
    <header className="app-header">
      <div className="app-header-titles">
        {title && <h1 className="app-header-title">{title}</h1>}
        {subtitle && <p className="app-header-subtitle">{subtitle}</p>}
      </div>
      <div className="app-header-stats">
        <span className="stat stat-streak" title="ተከታታይ ቀናት">
          <NavIcon name="streak" size={18} />
          {streak}
        </span>
        <span className="stat stat-xp" title="ነጥብ">
          <NavIcon name="xp" size={18} />
          {xp}
        </span>
        <span className="stat stat-hearts" title="ልብ">
          <NavIcon name="heart" size={18} />
          {hearts}/{maxHearts}
        </span>
      </div>
    </header>
  );
}
