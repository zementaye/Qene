import { SkillPath } from "../components/SkillPath.jsx";

export function LearnPage({ course, flatLessons, onSelectLesson }) {
  return (
    <div className="page page--learn">
      <SkillPath course={course} flatLessons={flatLessons} onSelectLesson={onSelectLesson} />
    </div>
  );
}
