import { LessonSession } from "../components/LessonSession.jsx";

export function LessonPage({ course, lesson, onExit, onComplete }) {
  return <LessonSession course={course} lesson={lesson} onExit={onExit} onComplete={onComplete} />;
}
