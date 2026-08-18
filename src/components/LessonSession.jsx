import { useRef, useState, useEffect } from "react";
import { MultipleChoice } from "./exercises/MultipleChoice.jsx";
import { Translate } from "./exercises/Translate.jsx";
import { Match } from "./exercises/Match.jsx";
import { Listening } from "./exercises/Listening.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { TiletDivider } from "./Tilet.jsx";
import { buildAnswerFeedback } from "../utils/feedback.js";
import { speak, speechAvailable } from "../utils/speech.js";

const EXERCISE_COMPONENTS = {
  multiple_choice: MultipleChoice,
  translate: Translate,
  match: Match,
  listening: Listening,
};

export function LessonSession({ course, lesson, onExit, onComplete }) {
  const { hearts, loseHeart, proficiencyLevel } = useProgress();
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState(null); // { correct, content } | null
  const continueBtnRef = useRef(null);

  const exercise = lesson.exercises[index];
  const isLast = index === lesson.exercises.length - 1;
  const ExerciseComponent = EXERCISE_COMPONENTS[exercise.type];

  // Focus the "Continue" button as soon as the panel appears so a
  // keyboard/switch-device learner can advance with Enter/Space right
  // away instead of having to tab to find it.
  useEffect(() => {
    if (feedback && continueBtnRef.current) continueBtnRef.current.focus();
  }, [feedback]);

  function handleAnswer(correct) {
    const content = buildAnswerFeedback({ exercise, lesson, level: proficiencyLevel });
    setFeedback({ correct, content });
    if (correct) {
      setCorrectCount((c) => c + 1);
    } else {
      loseHeart();
    }
  }

  // Advancing only happens once the learner taps "Continue" - no more
  // auto-dismiss timer, so the explanation panel stays up as long as they
  // need it instead of flashing by.
  function handleContinue() {
    const correct = feedback?.correct;
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

      <div className={`lesson-session-body ${feedback ? `flash-${feedback.correct ? "correct" : "wrong"}` : ""}`}>
        <ExerciseComponent key={index} exercise={exercise} course={course} onAnswer={handleAnswer} />
      </div>

      {feedback && (
        <AnswerFeedbackPanel
          correct={feedback.correct}
          content={feedback.content}
          course={course}
          isLast={isLast}
          onContinue={handleContinue}
          continueBtnRef={continueBtnRef}
        />
      )}
    </div>
  );
}

function AnswerFeedbackPanel({ correct, content, course, isLast, onContinue, continueBtnRef }) {
  const { primary, note, secondary, tip } = content;
  const canSpeak = speechAvailable();

  return (
    <div
      className={`answer-feedback-panel answer-feedback-panel--${correct ? "correct" : "wrong"}`}
      role="status"
      aria-live="polite"
    >
      <TiletDivider height={8} color="var(--cream-100)" accent="var(--cream-100)" />
      <div className="answer-feedback-head">
        <span className="answer-feedback-icon" aria-hidden="true">
          {correct ? "✓" : "✕"}
        </span>
        <span className="answer-feedback-title">{correct ? "ትክክል ነው! 🎉" : "እንደገና ሞክር"}</span>
      </div>

      {primary && (primary.amharic || primary.target) && (
        <div className="answer-feedback-example">
          <div className="answer-feedback-example-row">
            <span className="text-amharic">{primary.amharic}</span>
            <span className="answer-feedback-example-sep">→</span>
            <span lang={course.toLanguage.code?.split("-")[0]}>{primary.target}</span>
            {canSpeak && primary.target && (
              <button
                type="button"
                className="answer-feedback-sound-btn"
                onClick={() => speak(primary.target, course.toLanguage.code)}
                aria-label="ድምጽ አጫውት"
              >
                🔊
              </button>
            )}
          </div>
          {note && <p className="answer-feedback-note">{note}</p>}
        </div>
      )}

      {secondary && (secondary.amharic || secondary.target) && (
        <div className="answer-feedback-secondary">
          <span className="answer-feedback-secondary-label">ተጨማሪ ምሳሌ</span>
          <div className="answer-feedback-example-row answer-feedback-example-row--secondary">
            <span className="text-amharic">{secondary.amharic}</span>
            <span className="answer-feedback-example-sep">→</span>
            <span lang={course.toLanguage.code?.split("-")[0]}>{secondary.target}</span>
          </div>
        </div>
      )}

      {tip && <p className="answer-feedback-tip">{tip}</p>}

      <button ref={continueBtnRef} type="button" className="answer-feedback-continue" onClick={onContinue}>
        {isLast ? "ጨርስ" : "ቀጥል"}
      </button>
    </div>
  );
}
