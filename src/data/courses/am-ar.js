// Second course, added to prove out the "language-agnostic engine" claim
// in the README: this file is the *only* thing that changed to teach a
// completely different target language (Arabic instead of English) — no
// app code was touched. Lesson ids are prefixed `ar-` so progress never
// collides with the am-en course's ids in localStorage.
//
// Arabic text runs right-to-left; browsers handle bidi in inline text
// fine automatically, so no RTL-specific app code was needed either.

export const amArCourse = {
  id: "am-ar",
  fromLanguage: { code: "am", name: "አማርኛ", label: "Amharic" },
  toLanguage: { code: "ar-SA", name: "العربية", label: "Arabic" },
  title: "ዓረብኛ ተማር",
  units: [
    {
      id: "ar-greetings",
      title: "ሰላምታ",
      subtitle: "Greetings",
      lessons: [
        {
          id: "ar-greetings-1",
          title: "መሠረታዊ ሰላምታ",
          exercises: [
            { type: "multiple_choice", promptLang: "am", prompt: "ሰላም", options: ["مرحبا", "مع السلامة", "شكرا"], correctIndex: 0, say: "مرحبا" },
            { type: "multiple_choice", promptLang: "am", prompt: "ደህና ሁን", options: ["نعم", "مع السلامة", "من فضلك"], correctIndex: 1, say: "مع السلامة" },
            { type: "translate", promptLang: "am", prompt: "አመሰግናለሁ", answer: "شكرا", say: "شكرا" },
            { type: "multiple_choice", promptLang: "am", prompt: "አዎ", options: ["لا", "نعم", "من فضلك"], correctIndex: 1, say: "نعم" },
            { type: "multiple_choice", promptLang: "am", prompt: "አይ", options: ["لا", "نعم", "مع السلامة"], correctIndex: 0, say: "لا" },
            { type: "listening", say: "شكرا", options: ["ደህና ሁን", "አመሰግናለሁ", "አዎ"], correctIndex: 1 },
            {
              type: "match",
              promptLang: "am",
              pairs: [
                { a: "ሰላም", b: "مرحبا" },
                { a: "ደህና ሁን", b: "مع السلامة" },
                { a: "እባክህ", b: "من فضلك" },
                { a: "አመሰግናለሁ", b: "شكرا" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "ar-numbers",
      title: "ቁጥሮች",
      subtitle: "Numbers",
      lessons: [
        {
          id: "ar-numbers-1",
          title: "ከ 1 እስከ 5",
          exercises: [
            { type: "multiple_choice", promptLang: "am", prompt: "አንድ", options: ["اثنان", "واحد", "ثلاثة"], correctIndex: 1, say: "واحد" },
            { type: "multiple_choice", promptLang: "am", prompt: "ሁለት", options: ["اثنان", "أربعة", "خمسة"], correctIndex: 0, say: "اثنان" },
            { type: "multiple_choice", promptLang: "am", prompt: "ሶስት", options: ["ستة", "ثلاثة", "تسعة"], correctIndex: 1, say: "ثلاثة" },
            { type: "translate", promptLang: "am", prompt: "አራት", answer: "أربعة", say: "أربعة" },
            { type: "listening", say: "خمسة", options: ["أربعة", "ثلاثة", "خمسة"], correctIndex: 2 },
            {
              type: "match",
              promptLang: "am",
              pairs: [
                { a: "አንድ", b: "واحد" },
                { a: "ሁለት", b: "اثنان" },
                { a: "ሶስት", b: "ثلاثة" },
                { a: "አራት", b: "أربعة" },
                { a: "አምስት", b: "خمسة" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
