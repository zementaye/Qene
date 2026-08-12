import { ResultScreen } from "../components/ResultScreen.jsx";

export function ResultsPage({ result, lesson, onContinue, onRetry }) {
  return (
    <div className="page page--results">
      <ResultScreen result={result} lesson={lesson} onContinue={onContinue} onRetry={onRetry} />
    </div>
  );
}
