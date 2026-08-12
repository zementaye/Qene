import { useEffect, useMemo, useState } from "react";
import { getCourse, listCourses, flattenLessons, DEFAULT_COURSE_ID } from "../data/courseLoader.js";
import { ProgressProvider, useProgress } from "../context/ProgressContext.jsx";
import { useHashRoute, routeParts } from "../router.jsx";
import { Sidebar } from "./layout/Sidebar.jsx";
import { BottomNav } from "./layout/BottomNav.jsx";
import { AppHeader } from "./layout/AppHeader.jsx";
import { HomePage } from "../pages/HomePage.jsx";
import { LearnPage } from "../pages/LearnPage.jsx";
import { LessonPage } from "../pages/LessonPage.jsx";
import { ResultsPage } from "../pages/ResultsPage.jsx";
import { ProfilePage } from "../pages/ProfilePage.jsx";
import { CoursesPage } from "../pages/CoursesPage.jsx";

const COURSE_STORAGE_KEY = "qene.course.v1";

const PAGE_TITLES = {
  home: { title: "መነሻ", subtitle: "Home" },
  learn: { title: "ተማር", subtitle: "Learn" },
  profile: { title: "የእኔ መገለጫ", subtitle: "Profile" },
  courses: { title: "ኮርሶች", subtitle: "Courses" },
};

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

  const [route, navigate] = useHashRoute();
  const [lastResult, setLastResult] = useState(null);
  const [lastLessonId, setLastLessonId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(COURSE_STORAGE_KEY, courseId);
    } catch (e) {
      /* storage unavailable - selection just won't persist this session */
    }
  }, [courseId]);

  function changeCourse(nextId) {
    if (nextId !== courseId) setCourseId(nextId);
    navigate("/learn");
  }

  const parts = routeParts(route);
  const page = parts[0] || "home";
  const activeLesson = page === "lesson" ? flatLessons.find((l) => l.id === parts[1]) : null;
  const resultLesson = lastLessonId ? flatLessons.find((l) => l.id === lastLessonId) : null;
  const isImmersive = page === "lesson" && !!activeLesson;

  function startLesson(lesson) {
    navigate(`/lesson/${lesson.id}`);
  }

  function handleLessonComplete(lesson, result) {
    setLastResult(result);
    setLastLessonId(lesson.id);
    if (!result.failed) {
      touchStreak();
      addXp(Math.max(10, Math.round(result.score / 5)));
      completeLesson(lesson.id, result.score);
    }
    navigate("/results");
  }

  function handleRetry() {
    refillHearts();
    if (lastLessonId) navigate(`/lesson/${lastLessonId}`);
    else navigate("/learn");
  }

  function handleContinue() {
    navigate("/learn");
  }

  const headerInfo = PAGE_TITLES[page];

  return (
    <div className={`app-shell ${isImmersive ? "app-shell--immersive" : ""}`}>
      {!isImmersive && <Sidebar current={page} onNavigate={navigate} course={course} />}
      <div className="app-content">
        {!isImmersive && headerInfo && <AppHeader title={headerInfo.title} subtitle={headerInfo.subtitle} />}
        <main className="app-main">
          {page === "home" && (
            <HomePage course={course} flatLessons={flatLessons} onSelectLesson={startLesson} onGoLearn={() => navigate("/learn")} />
          )}

          {page === "learn" && <LearnPage course={course} flatLessons={flatLessons} onSelectLesson={startLesson} />}

          {page === "lesson" && activeLesson && (
            <LessonPage
              course={course}
              lesson={activeLesson}
              onExit={() => navigate("/learn")}
              onComplete={(result) => handleLessonComplete(activeLesson, result)}
            />
          )}
          {page === "lesson" && !activeLesson && (
            <LearnPage course={course} flatLessons={flatLessons} onSelectLesson={startLesson} />
          )}

          {page === "results" && lastResult && (
            <ResultsPage result={lastResult} lesson={resultLesson} onContinue={handleContinue} onRetry={handleRetry} />
          )}
          {page === "results" && !lastResult && (
            <HomePage course={course} flatLessons={flatLessons} onSelectLesson={startLesson} onGoLearn={() => navigate("/learn")} />
          )}

          {page === "profile" && <ProfilePage />}

          {page === "courses" && <CoursesPage courses={listCourses()} courseId={courseId} onChangeCourse={changeCourse} />}
        </main>
      </div>
      {!isImmersive && <BottomNav current={page} onNavigate={navigate} />}
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
