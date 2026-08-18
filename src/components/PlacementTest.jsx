import { useMemo, useState } from "react";
import { MultipleChoice } from "./exercises/MultipleChoice.jsx";
import { Translate } from "./exercises/Translate.jsx";
import { TiletDivider } from "./Tilet.jsx";
import { buildPlacementQuestions, scorePlacement } from "../data/placementTest.js";
import { computeProficiencyLevel } from "../context/ProgressContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";

const EXERCISE_COMPONENTS = { multiple_choice: MultipleChoice, translate: Translate };

// A short, auto-graded quiz sampled from the course's own exercises (see
// data/placementTest.js), used to estimate a starting proficiency level.
// Unlike LessonSession, this deliberately does NOT show the explanation
// panel between questions - showing "why" mid-assessment would just give
// the answer away, so it keeps a quick flash-then-advance between
// questions, which is the right call for a test even though lessons moved
// away from that pattern.
export function PlacementTest({ course, onExit, onDone }) {
  const { setProficiencyResult } = useProgress();
  const questions = useMemo(() => buildPlacementQuestions(course), [course]);

  const [phase, setPhase] = useState(questions.length ? "intro" : "empty");
  const [index, setIndex] = useState(0);
  const [correctQids, setCorrectQids] = useState([]);
  const [locked, setLocked] = useState(false);

  const question = questions[index];
  const isLast = index === questions.length - 1;

  function handleAnswer(correct) {
    if (locked) return;
    setLocked(true);
    if (correct) setCorrectQids((qs) => [...qs, question.qid]);
    setTimeout(() => {
      setLocked(false);
      if (isLast) {
        setPhase("result");
      } else {
        setIndex((i) => i + 1);
      }
    }, 550);
  }

  const pct = phase === "result" ? scorePlacement(questions, correctQids) : 0;
  const level = phase === "result" ? computeProficiencyLevel(pct) : null;

  function save() {
    setProficiencyResult(level.id, pct);
    onDone?.(level);
  }

  if (phase === "empty") {
    return (
      <div className="lesson-session placement-test">
        <div className="lesson-session-top">
          <button className="exit-btn" onClick={onExit} aria-label="ውጣ">✕</button>
        </div>
        <div className="placement-intro">
          <p>ይህ ኮርስ ገና ለደረጃ ፈተና በቂ ትምህርቶች የሉትም።</p>
          <button className="primary-btn" onClick={onExit}>ተመለስ</button>
        </div>
      </div>
    );
  }

  if (phase === "intro") {
    return (
      <div className="lesson-session placement-test">
        <div className="lesson-session-top">
          <button className="exit-btn" onClick={onExit} aria-label="ውጣ">✕</button>
        </div>
        <div className="placement-intro">
          <span className="placement-intro-emoji" aria-hidden="true">🎯</span>
          <h1 className="placement-intro-title">የቋንቋ ደረጃ ፈተና</h1>
          <TiletDivider height={10} color="var(--gold-500)" />
          <p className="placement-intro-body">
            ደረጃህን ለመለካት {questions.length} ጥያቄዎችን እንጠይቅሃለን። ትክክለኛውን መልስ ካላወቅህ ገምት እና ቀጥል -
            ውጤቱ የት እንደምትጀምር ብቻ ይረዳናል፣ አይቀጣህም።
          </p>
          <button className="primary-btn" onClick={() => setPhase("testing")}>ፈተናውን ጀምር</button>
        </div>
      </div>
    );
  }

  if (phase === "testing" && question) {
    const ExerciseComponent = EXERCISE_COMPONENTS[question.exercise.type];
    const progressPct = Math.round((index / questions.length) * 100);
    return (
      <div className="lesson-session placement-test">
        <div className="lesson-session-top">
          <button className="exit-btn" onClick={onExit} aria-label="ውጣ">✕</button>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="placement-question-count">{index + 1}/{questions.length}</span>
        </div>
        <div className="lesson-session-body">
          <ExerciseComponent key={question.qid} exercise={question.exercise} course={course} onAnswer={handleAnswer} />
        </div>
      </div>
    );
  }

  return (
    <div className="results-screen">
      <div className="results-card">
        <span className="results-emoji">🎯</span>
        <h2 className="results-title">ፈተናው ተጠናቋል!</h2>
        <TiletDivider height={12} color="var(--gold-500)" />
        <div className="placement-level-badge">
          <span className="text-amharic">{level.label}</span>
          <span lang="en">{level.sub}</span>
        </div>
        <p className="results-score">{Math.round(pct)}%</p>
        <p className="results-sub">
          ይህ ደረጃ ትምህርቱ ውስጥ ምን ያህል ማብራሪያ እንደሚታይህ ይወስናል። በማንኛውም ጊዜ ፈተናውን እንደገና መውሰድ ትችላለህ።
        </p>
        <button className="primary-btn" onClick={save}>ደረጃዬን አስቀምጥ</button>
        <button className="link-btn" onClick={onExit}>ግድ የለም</button>
      </div>
    </div>
  );
}
