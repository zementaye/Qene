import { NAV_ITEMS } from "./navItems.js";
import { NavIcon } from "./NavIcon.jsx";

export function BottomNav({ current, onNavigate }) {
  return (
    <nav className="bottom-nav" aria-label="ዋና ዝርዝር">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          className={`bottom-nav-item ${current === item.id ? "bottom-nav-item--active" : ""}`}
          onClick={() => onNavigate(item.to)}
        >
          <NavIcon name={item.icon} size={22} />
          <span className="text-amharic">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
