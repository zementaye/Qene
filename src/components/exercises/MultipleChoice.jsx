import { useState } from "react";
import { speak, speechAvailable } from "../../utils/speech.js";

export function MultipleChoice({ exercise, course, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);

  // When the prompt is shown in the target language, the answer options
  // are Amharic (and vice versa) — see am-en.js / am-ar.js. Options in
  // Amharic need the Ethiopic-capable font, or Ge'ez glyphs fall back to
  // whatever font the browser picks, inconsistent with the rest of the UI.
  const optionsAreAmharic = exercise.promptLang !== "am";

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
          let cls = optionsAreAmharic ? "option-btn text-amharic" : "option-btn";
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
