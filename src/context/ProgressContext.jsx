import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "qene.progress.v1";
const MAX_HEARTS = 5;
const HEART_REGEN_MS = 4 * 60 * 60 * 1000; // one heart back every 4 hours

function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    /* corrupt or unavailable storage - fall through to defaults */
  }
  return {
    hearts: MAX_HEARTS,
    lastHeartLostAt: null,
    xp: 0,
    streak: 0,
    lastActiveDate: null,
    completedLessons: {}, // lessonId -> { bestScore, timesCompleted }
  };
}

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [state, setState] = useState(loadInitial);

  // regenerate hearts over time
  useEffect(() => {
    if (state.hearts >= MAX_HEARTS || !state.lastHeartLostAt) return;
    const elapsed = Date.now() - state.lastHeartLostAt;
    const regenCount = Math.floor(elapsed / HEART_REGEN_MS);
    if (regenCount > 0) {
      setState((s) => ({
        ...s,
        hearts: Math.min(MAX_HEARTS, s.hearts + regenCount),
        lastHeartLostAt: s.hearts + regenCount >= MAX_HEARTS ? null : Date.now(),
      }));
    }
    const interval = setInterval(() => {
      setState((s) => {
        if (s.hearts >= MAX_HEARTS || !s.lastHeartLostAt) return s;
        if (Date.now() - s.lastHeartLostAt >= HEART_REGEN_MS) {
          const next = Math.min(MAX_HEARTS, s.hearts + 1);
          return { ...s, hearts: next, lastHeartLostAt: next >= MAX_HEARTS ? null : Date.now() };
        }
        return s;
      });
    }, 60 * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* storage full or unavailable - progress just won't persist this session */
    }
  }, [state]);

  const api = useMemo(
    () => ({
      ...state,
      maxHearts: MAX_HEARTS,

      // ms until the next heart regenerates, or null if hearts are full /
      // no timer is running. Lets the UI show "next heart in 12m" instead
      // of just silently blocking the learner.
      msUntilNextHeart() {
        if (state.hearts >= MAX_HEARTS || !state.lastHeartLostAt) return null;
        const remaining = HEART_REGEN_MS - (Date.now() - state.lastHeartLostAt);
        return Math.max(0, remaining);
      },

      loseHeart() {
        setState((s) => {
          if (s.hearts <= 0) return s;
          const hearts = s.hearts - 1;
          return { ...s, hearts, lastHeartLostAt: s.lastHeartLostAt ?? Date.now() };
        });
      },

      refillHearts() {
        setState((s) => ({ ...s, hearts: MAX_HEARTS, lastHeartLostAt: null }));
      },

      addXp(amount) {
        setState((s) => ({ ...s, xp: s.xp + amount }));
      },

      touchStreak() {
        setState((s) => {
          const today = todayKey();
          if (s.lastActiveDate === today) return s;
          const yesterday = todayKey(new Date(Date.now() - 86400000));
          const streak = s.lastActiveDate === yesterday ? s.streak + 1 : 1;
          return { ...s, streak, lastActiveDate: today };
        });
      },

      completeLesson(lessonId, score) {
        setState((s) => {
          const prev = s.completedLessons[lessonId];
          const bestScore = prev ? Math.max(prev.bestScore, score) : score;
          const timesCompleted = (prev?.timesCompleted ?? 0) + 1;
          return {
            ...s,
            completedLessons: { ...s.completedLessons, [lessonId]: { bestScore, timesCompleted } },
          };
        });
      },
    }),
    [state]
  );

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
