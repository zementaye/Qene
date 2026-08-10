import { useEffect, useState } from "react";
import { speak, speechAvailable } from "../../utils/speech.js";

// Listening exercise: { type: "listening", say, options[], correctIndex }
// `say` is spoken in course.toLanguage; `options` are shown/answered in
// course.fromLanguage (Amharic) so the learner picks the meaning of what
// they heard rather than reading the target-language text up front.
export function Listening({ exercise, course, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const canSpeak = speechAvailable();

  useEffect(() => {
    if (canSpeak) {
      // Small delay so the exercise transition animation isn't fighting
      // with speech synthesis kicking off.
      const t = setTimeout(() => {
        speak(exercise.say, course.toLanguage.code);
        setHasPlayed(true);
      }, 300);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise]);

  function replay() {
    speak(exercise.say, course.toLanguage.code);
    setHasPlayed(true);
  }

  function choose(i) {
    if (locked) return;
    setSelected(i);
    setLocked(true);
    const correct = i === exercise.correctIndex;
    setTimeout(() => onAnswer(correct), 550);
  }

  if (!canSpeak) {
    // No Web Speech API on this device/browser: fail gracefully by
    // revealing the text instead of asking the learner to hear something
    // that can't be played, rather than showing a dead audio button.
    return (
      <div className="exercise">
        <p className="exercise-hint">ድምጽ በዚህ መሣሪያ ላይ አይገኝም — ጽሑፉን አንብብ</p>
        <p className="exercise-prompt">{exercise.say}</p>
        <div className="options-grid">
          {exercise.options.map((opt, i) => {
            let cls = "option-btn text-amharic";
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

  return (
    <div className="exercise">
      <p className="exercise-hint">ምን እንደሰማህ ምረጥ</p>
      <button className="listen-btn" onClick={replay} aria-label="ድምጽ እንደገና አጫውት">
        <span className="listen-btn-icon">{hasPlayed ? "🔊" : "🔈"}</span>
        <span>እንደገና አዳምጥ</span>
      </button>
      <div className="options-grid">
        {exercise.options.map((opt, i) => {
          let cls = "option-btn text-amharic";
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
