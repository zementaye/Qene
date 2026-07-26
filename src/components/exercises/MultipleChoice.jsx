import { useState } from "react";
import { speak, speechAvailable } from "../../utils/speech.js";

export function MultipleChoice({ exercise, course, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);

  const promptLangCode = exercise.promptLang === "am" ? course.fromLanguage.code : course.toLanguage.code;

  function choose(i) {
    if (locked) return;
    setSelected(i);
    setLocked(true);
    const correct = i === exercise.correctIndex;
    setTimeout(() => onAnswer(correct), 550);
  }

  return (
    <div className="exercise">
      <div className="exercise-prompt-row">
        <p className={`exercise-prompt ${exercise.promptLang === "am" ? "text-amharic" : ""}`}>{exercise.prompt}</p>
        {exercise.say && speechAvailable() && (
          <button className="sound-btn" onClick={() => speak(exercise.say, course.toLanguage.code)} aria-label="ድምጽ አጫውት">
            🔊
          </button>
        )}
      </div>
      <div className="options-grid">
        {exercise.options.map((opt, i) => {
          let cls = "option-btn";
          if (locked && i === exercise.correctIndex) cls += " option-btn--correct";
          else if (locked && i === selected) cls += " option-btn--wrong";
          return (
            <button key={i} className={cls} onClick={() => choose(i)} disabled={locked}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
