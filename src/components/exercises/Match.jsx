import { useMemo, useState } from "react";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function Match({ exercise, onAnswer }) {
  const leftItems = useMemo(() => shuffle(exercise.pairs.map((p, i) => ({ id: `a${i}`, text: p.a, pairIndex: i }))), [exercise]);
  const rightItems = useMemo(() => shuffle(exercise.pairs.map((p, i) => ({ id: `b${i}`, text: p.b, pairIndex: i }))), [exercise]);

  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matched, setMatched] = useState(new Set());
  const [shakePair, setShakePair] = useState(null);
  const [mistakes, setMistakes] = useState(0);

  function pickLeft(item) {
    if (matched.has(item.pairIndex)) return;
    setSelectedLeft(item);
  }

  function pickRight(item) {
    if (!selectedLeft || matched.has(item.pairIndex)) return;
    if (selectedLeft.pairIndex === item.pairIndex) {
      const next = new Set(matched);
      next.add(item.pairIndex);
      setMatched(next);
      setSelectedLeft(null);
      if (next.size === exercise.pairs.length) {
        setTimeout(() => onAnswer(mistakes === 0), 500);
      }
    } else {
      setMistakes((m) => m + 1);
      setShakePair(item.pairIndex);
      setTimeout(() => setShakePair(null), 400);
      setSelectedLeft(null);
    }
  }

  return (
    <div className="exercise">
      <p className="exercise-hint">የሚዛመዱትን አጣምር</p>
      <div className="match-grid">
        <div className="match-col">
          {leftItems.map((item) => (
            <button
              key={item.id}
              className={`match-chip text-amharic ${matched.has(item.pairIndex) ? "match-chip--done" : ""} ${
                selectedLeft?.id === item.id ? "match-chip--selected" : ""
              }`}
              onClick={() => pickLeft(item)}
              disabled={matched.has(item.pairIndex)}
            >
              {item.text}
            </button>
          ))}
        </div>
        <div className="match-col">
          {rightItems.map((item) => (
            <button
              key={item.id}
              className={`match-chip ${matched.has(item.pairIndex) ? "match-chip--done" : ""} ${
                shakePair === item.pairIndex ? "match-chip--shake" : ""
              }`}
              onClick={() => pickRight(item)}
              disabled={matched.has(item.pairIndex)}
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
