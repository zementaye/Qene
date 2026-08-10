import { useState } from "react";
import { speak, speechAvailable } from "../../utils/speech.js";

function normalize(str) {
  return str.trim().toLowerCase().replace(/[.?!]/g, "");
}

export function Translate({ exercise, course, onAnswer }) {
  const [value, setValue] = useState("");
  const [locked, setLocked] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);

  function submit() {
    if (locked || !value.trim()) return;
    const candidates = [exercise.answer, ...(exercise.altAnswers ?? [])].map(normalize);
    const correct = candidates.includes(normalize(value));
    setWasCorrect(correct);
    setLocked(true);
    setTimeout(() => onAnswer(correct), 700);
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
      <p className="exercise-hint">የ{course.toLanguage.name} ትርጉም ጻፍ</p>
      <input
        className={`translate-input ${locked ? (wasCorrect ? "translate-input--correct" : "translate-input--wrong") : ""}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        disabled={locked}
        placeholder={`Type the ${course.toLanguage.label ?? course.toLanguage.name} translation...`}
        autoFocus
      />
      {locked && !wasCorrect && (
        <p className="exercise-correction">
          ትክክለኛ መልስ: <strong>{exercise.answer}</strong>
        </p>
      )}
      <button className="submit-btn" onClick={submit} disabled={locked || !value.trim()}>
        አረጋግጥ
      </button>
    </div>
  );
}
