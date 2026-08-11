import { useState } from "react";
import { MultipleChoice } from "./exercises/MultipleChoice.jsx";
import { Translate } from "./exercises/Translate.jsx";
import { Match } from "./exercises/Match.jsx";
import { Listening } from "./exercises/Listening.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { TiletDivider } from "./Tilet.jsx";

const EXERCISE_COMPONENTS = {
  multiple_choice: MultipleChoice,
  translate: Translate,
  match: Match,
  listening: Listening,
};

export function LessonSession({ course, lesson, onExit, onComplete }) {
  const { hearts, loseHeart } = useProgress();
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState(null); // "correct" | "wrong" | null

  const exercise = lesson.exercises[index];
  const isLast = index === lesson.exercises.length - 1;
  const ExerciseComponent = EXERCISE_COMPONENTS[exercise.type];

  function handleAnswer(correct) {
    setFeedback(correct ? "correct" : "wrong");
    if (correct) {
      setCorrectCount((c) => c + 1);
    } else {
      loseHeart();
    }

    setTimeout(() => {
      setFeedback(null);
      const heartsLeft = correct ? hearts : hearts - 1;
      if (!correct && heartsLeft <= 0) {
        onComplete({ failed: true, score: 0 });
        return;
      }
      if (isLast) {
        const score = Math.round(((correctCount + (correct ? 1 : 0)) / lesson.exercises.length) * 100);
        onComplete({ failed: false, score });
      } else {
        setIndex((i) => i + 1);
      }
    }, 250);
  }

  const progressPct = Math.round((index / lesson.exercises.length) * 100);

  return (
    <div className="lesson-session">
      <div className="lesson-session-top">
        <button className="exit-btn" onClick={onExit} aria-label="ውጣ">
          ✕
        </button>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <span className="hearts-mini">♥ {hearts}</span>
      </div>

      <div className={`lesson-session-body ${feedback ? `flash-${feedback}` : ""}`}>
        <ExerciseComponent key={index} exercise={exercise} course={course} onAnswer={handleAnswer} />
      </div>

      {feedback && (
        <div className={`feedback-banner feedback-banner--${feedback}`} role="status" aria-live="polite">
          <TiletDivider height={8} color="var(--cream-100)" accent="var(--cream-100)" />
          <span>{feedback === "correct" ? "ትክክል ነው! 🎉" : "እንደገና ሞክር"}</span>
        </div>
      )}
    </div>
  );
}
