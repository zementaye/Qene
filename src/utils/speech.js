// Uses the browser's built-in speech synthesis so lessons don't need any
// recorded audio assets. Quality depends on the device's installed voices.
export function speak(text, lang = "en-US") {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

export function speechAvailable() {
  return typeof window !== "undefined" && !!window.speechSynthesis;
}
