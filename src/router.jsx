import { useCallback, useEffect, useState } from "react";

// A tiny hash-based router. No react-router dependency: the whole app only
// needs "go to this page" / "which page am I on", and a hash route gives
// that plus real, bookmarkable, back-button-friendly URLs (#/learn,
// #/lesson/food-1, #/profile...) for free with zero build config.

function currentPath() {
  const h = window.location.hash.replace(/^#/, "");
  return h || "/home";
}

export function useHashRoute() {
  const [route, setRoute] = useState(currentPath);

  useEffect(() => {
    function onHashChange() {
      setRoute(currentPath());
    }
    window.addEventListener("hashchange", onHashChange);
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#/home");
    }
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback((path) => {
    if (currentPath() === path) {
      // hashchange doesn't fire for a no-op assignment, but callers still
      // expect state (e.g. re-picking the same lesson) to register.
      setRoute(path);
      return;
    }
    window.location.hash = path;
  }, []);

  return [route, navigate];
}

// Splits "/lesson/food-1" into ["lesson", "food-1"].
export function routeParts(route) {
  return route.split("/").filter(Boolean);
}
