import { NAV_ITEMS } from "./navItems.js";
import { NavIcon } from "./NavIcon.jsx";
import { TiletDivider } from "../Tilet.jsx";

export function Sidebar({ current, onNavigate, course }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-mark text-amharic" aria-hidden="true">ቅ</span>
        <div className="sidebar-brand-text">
          <span className="sidebar-brand-name">Qene</span>
          <span className="sidebar-brand-tagline">ቅኔ · wax &amp; gold</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="ዋና ዝርዝር">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`sidebar-nav-item ${current === item.id ? "sidebar-nav-item--active" : ""}`}
            onClick={() => onNavigate(item.to)}
          >
            <NavIcon name={item.icon} />
            <span className="sidebar-nav-label">
              <span className="text-amharic">{item.label}</span>
              <span className="sidebar-nav-sub">{item.sub}</span>
            </span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <TiletDivider height={10} color="var(--gold-400)" />
        {course && (
          <p className="sidebar-current-course">
            <span className="text-amharic">{course.fromLanguage.name}</span>
            <span className="sidebar-course-arrow">→</span>
            <span>{course.toLanguage.label ?? course.toLanguage.name}</span>
          </p>
        )}
      </div>
    </aside>
  );
}
