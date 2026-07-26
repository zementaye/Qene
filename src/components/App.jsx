import { useMemo, useState } from "react";
import { getCourse, flattenLessons } from "../data/courseLoader.js";
import { ProgressProvider, useProgress } from "../context/ProgressContext.jsx";
import { TopBar } from "./TopBar.jsx";
import { SkillPath } from "./SkillPath.jsx";
import { LessonSession } from "./LessonSession.jsx";
import { ResultScreen } from "./ResultScreen.jsx";

function AppInner() {
  const course = useMemo(() => getCourse("am-en"), []);
  const flatLessons = useMemo(() => flattenLessons(course), [course]);
  const { touchStreak, addXp, completeLesson, refillHearts } = useProgress();

  const [screen, setScreen] = useState("path"); // path | lesson | results
  const [activeLesson, setActiveLesson] = useState(null);
  const [lastResult, setLastResult] = useState(null);

  function startLesson(lesson) {
    setActiveLesson(lesson);
    setScreen("lesson");
  }

  function handleLessonComplete(result) {
    setLastResult(result);
    setScreen("results");
    if (!result.failed) {
      touchStreak();
      addXp(Math.max(10, Math.round(result.score / 5)));
      completeLesson(activeLesson.id, result.score);
    }
  }

  function handleContinue() {
    setScreen("path");
    setActiveLesson(null);
  }

  function handleRetry() {
    refillHearts();
    setScreen("lesson");
  }

  return (
    <div className="app-shell">
      {screen !== "lesson" && <TopBar />}
      <main className="app-main">
        {screen === "path" && <SkillPath course={course} flatLessons={flatLessons} onSelectLesson={startLesson} />}
        {screen === "lesson" && activeLesson && (
          <LessonSession course={course} lesson={activeLesson} onExit={handleContinue} onComplete={handleLessonComplete} />
        )}
        {screen === "results" && activeLesson && (
          <ResultScreen result={lastResult} lesson={activeLesson} onContinue={handleContinue} onRetry={handleRetry} />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <AppInner />
    </ProgressProvider>
  );
}
