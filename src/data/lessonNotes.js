// Short, topic-level usage notes shown in the answer feedback panel (see
// utils/feedback.js + LessonSession.jsx). Keyed by a unit's English
// `subtitle` (lowercased) rather than its id, so the same note works for
// any course that has a same-themed unit (e.g. both am-en's "greetings"
// and am-ar's greetings unit share the subtitle "Greetings").
//
// These are deliberately generic ("this word is used to greet someone")
// rather than grammar claims about the specific word/phrase on screen -
// that keeps them true for every exercise in the unit without hand-authoring
// per-exercise content.

const NOTES_BY_SUBTITLE = {
  "greetings": "ሰዎችን ስታገኝ ወይም ስትሰናበት የሚነገር ቃል ነው።",
  "i & you": "ሰውን ወይም ራስን ለመጥቀስ የሚያገለግል ተውላጠ ስም ነው።",
  "numbers": "ብዛትን፣ ዕድሜን ወይም መጠንን ለመግለጽ የሚያገለግል ቁጥር ነው።",
  "family": "የቤተሰብ አባልን ለመጥራት የሚያገለግል ቃል ነው።",
  "food & drink": "ስለ ምግብና መጠጥ ስትናገር የሚያገለግል ቃል ነው።",
  "common phrases": "ውይይት ለመጀመር ወይም ለመቀጠል የሚያገለግል የተለመደ ሐረግ ነው።",
  "colors": "የነገርን ቀለም ለመግለጽ የሚያገለግል ቅጽል ነው።",
  "days & time": "ቀንን ወይም ሰዓትን ለመግለጽ የሚያገለግል ቃል ነው።",
  "days": "የሳምንት ቀንን ለመግለጽ የሚያገለግል ቃል ነው።",
  "weather": "ስለ አየር ሁኔታ ለመናገር የሚያገለግል ቃል ነው።",
  "animals": "እንስሳን ለመጥራት የሚያገለግል ቃል ነው።",
  "body parts": "የሰውነት ክፍልን ለመጥራት የሚያገለግል ቃል ነው።",
  "common verbs": "በየቀኑ የሚደረግ ተግባርን ለመግለጽ የሚያገለግል ግስ ነው።",
  "adjectives": "ነገርን ወይም ሰውን ለመግለጽ የሚያገለግል ቅጽል ነው።",
  "house & home": "በቤት ውስጥ የሚገኝ ነገርን ለመጥራት የሚያገለግል ቃል ነው።",
  "clothing": "የሚለበስ ልብስን ለመጥራት የሚያገለግል ቃል ነው።",
  "shopping": "ግብይት ስታደርግ የሚያገለግል ቃል ነው።",
};

export function getUnitNote(subtitle) {
  if (!subtitle) return "ይህ ጠቃሚ ቃል/ሐረግ ነው።";
  const key = subtitle.trim().toLowerCase();
  return NOTES_BY_SUBTITLE[key] ?? `ይህ ከ"${subtitle}" ትምህርት የተገኘ ጠቃሚ ቃል/ሐረግ ነው።`;
}
