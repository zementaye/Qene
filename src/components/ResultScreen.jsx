import { TiletDivider } from "./Tilet.jsx";

export function ResultScreen({ result, lesson, onContinue, onRetry }) {
  const { failed, score } = result;

  return (
    <div className="results-screen">
      <div className="results-card">
        <span className="results-emoji">{failed ? "💔" : score === 100 ? "🏆" : "🎉"}</span>
        <h2 className="results-title">{failed ? "ልብ አልቀረም" : "ትምህርቱ ተጠናቀቀ!"}</h2>
        <TiletDivider height={12} color="var(--gold-500)" />
        {!failed && (
          <>
            <p className="results-score">{score}%</p>
            <p className="results-lesson-name">{lesson.title}</p>
            <p className="results-xp">+{Math.max(10, Math.round(score / 5))} ⭐ ነጥብ</p>
          </>
        )}
        {failed && <p className="results-sub">ልቦችህ አልቀዋል። ትንሽ ካረፍክ በኋላ እንደገና ሞክር።</p>}

        <button className="primary-btn" onClick={failed ? onRetry : onContinue}>
          {failed ? "እንደገና ሞክር" : "ቀጥል"}
        </button>
      </div>
    </div>
  );
}
