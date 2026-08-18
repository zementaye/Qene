import { PlacementTest } from "../components/PlacementTest.jsx";

export function PlacementTestPage({ course, onExit, onDone }) {
  return <PlacementTest course={course} onExit={onExit} onDone={onDone} />;
}
