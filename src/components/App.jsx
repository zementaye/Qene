import { useEffect, useMemo, useState } from "react";
import { getCourse, listCourses, flattenLessons, DEFAULT_COURSE_ID } from "../data/courseLoader.js";
import { ProgressProvider, useProgress } from "../context/ProgressContext.jsx";
import { TopBar } from "./TopBar.jsx";
import { SkillPath } from "./SkillPath.jsx";
import { LessonSession } from "./LessonSession.jsx";
import { ResultScreen } from "./ResultScreen.jsx";

const COURSE_STORAGE_KEY = "qene.course.v1";

function loadInitialCourseId() {
  try {
    const saved = localStorage.getItem(COURSE_STORAGE_KEY);
    if (saved && getCourse(saved)) return saved;
  } catch (e) {
    /* storage unavailable - fall back to default */
  }
  return DEFAULT_COURSE_ID;
}

function AppInner() {
  const [courseId, setCourseId] = useState(loadInitialCourseId);
  const course = useMemo(() => getCourse(courseId), [courseId]);
  const flatLessons = useMemo(() => flattenLessons(course), [course]);
  const { touchStreak, addXp, completeLesson, refillHearts } = useProgress();

  const [screen, setScreen] = useState("path"); // path | lesson | results
  const [activeLesson, setActiveLesson] = useState(null);
  const [lastResult, setLastResult] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(COURSE_STORAGE_KEY, courseId);
    } catch (e) {
      /* storage unavailable - selection just won't persist this session */
    }
  }, [courseId]);

  function changeCourse(nextId) {
    if (nextId === courseId) return;
    setCourseId(nextId);
    setScreen("path");
    setActiveLesson(null);
  }

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
      {screen !== "lesson" && (
        <TopBar courses={listCourses()} courseId={courseId} onChangeCourse={changeCourse} />
      )}
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
