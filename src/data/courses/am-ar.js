// Second course, proving out the "language-agnostic engine" claim in the
// README: this file is the *only* thing that changes to teach a completely
// different target language (Arabic instead of English) — no app code is
// touched. Lesson ids are prefixed `ar-` so progress never collides with
// the am-en course's ids in localStorage.
//
// Arabic text runs right-to-left; browsers handle bidi in inline text fine
// automatically, so no RTL-specific app code is needed either.

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
    {
      id: "ar-family",
      title: "ቤተሰብ",
      subtitle: "Family",
      lessons: [
        {
          id: "ar-family-1",
          title: "የቤተሰብ አባላት",
          exercises: [
            { type: "multiple_choice", promptLang: "am", prompt: "እናት", options: ["أب", "أم", "أخت"], correctIndex: 1, say: "أم" },
            { type: "multiple_choice", promptLang: "am", prompt: "አባት", options: ["أب", "أخ", "ابن"], correctIndex: 0, say: "أب" },
            { type: "multiple_choice", promptLang: "am", prompt: "እህት", options: ["أخ", "أخت", "عائلة"], correctIndex: 1, say: "أخت" },
            { type: "translate", promptLang: "am", prompt: "ወንድም", answer: "أخ", say: "أخ" },
            { type: "translate", promptLang: "am", prompt: "ቤተሰብ", answer: "عائلة", say: "عائلة" },
            { type: "listening", say: "أم", options: ["أخت", "أم", "أب"], correctIndex: 1 },
            {
              type: "match",
              promptLang: "am",
              pairs: [
                { a: "እናት", b: "أم" },
                { a: "አባት", b: "أب" },
                { a: "እህት", b: "أخت" },
                { a: "ወንድም", b: "أخ" },
                { a: "ቤተሰብ", b: "عائلة" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "ar-food",
      title: "ምግብና መጠጥ",
      subtitle: "Food & Drink",
      lessons: [
        {
          id: "ar-food-1",
          title: "መሠረታዊ ምግቦች",
          exercises: [
            { type: "multiple_choice", promptLang: "am", prompt: "ውሃ", options: ["قهوة", "ماء", "شاي"], correctIndex: 1, say: "ماء" },
            { type: "multiple_choice", promptLang: "am", prompt: "ቡና", options: ["شاي", "قهوة", "حليب"], correctIndex: 1, say: "قهوة" },
            { type: "multiple_choice", promptLang: "am", prompt: "ዳቦ", options: ["خبز", "طعام", "حليب"], correctIndex: 0, say: "خبز" },
            { type: "translate", promptLang: "am", prompt: "ምግብ", answer: "طعام", say: "طعام" },
            { type: "translate", promptLang: "am", prompt: "ሻይ", answer: "شاي", say: "شاي" },
            { type: "listening", say: "ماء", options: ["ቡና", "ውሃ", "ዳቦ"], correctIndex: 1 },
            {
              type: "match",
              promptLang: "am",
              pairs: [
                { a: "ውሃ", b: "ماء" },
                { a: "ቡና", b: "قهوة" },
                { a: "ዳቦ", b: "خبز" },
                { a: "ምግብ", b: "طعام" },
                { a: "ሻይ", b: "شاي" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "ar-colors",
      title: "ቀለማት",
      subtitle: "Colors",
      lessons: [
        {
          id: "ar-colors-1",
          title: "መሠረታዊ ቀለማት",
          exercises: [
            { type: "multiple_choice", promptLang: "am", prompt: "ቀይ", options: ["أزرق", "أحمر", "أخضر"], correctIndex: 1, say: "أحمر" },
            { type: "multiple_choice", promptLang: "am", prompt: "ሰማያዊ", options: ["أزرق", "أصفر", "أسود"], correctIndex: 0, say: "أزرق" },
            { type: "multiple_choice", promptLang: "am", prompt: "ቢጫ", options: ["أصفر", "أبيض", "أخضر"], correctIndex: 0, say: "أصفر" },
            { type: "translate", promptLang: "am", prompt: "አረንጓዴ", answer: "أخضر", say: "أخضر" },
            { type: "translate", promptLang: "am", prompt: "ጥቁር", answer: "أسود", say: "أسود" },
            { type: "listening", say: "أبيض", options: ["ጥቁር", "ነጭ", "ቀይ"], correctIndex: 1 },
            {
              type: "match",
              promptLang: "am",
              pairs: [
                { a: "ቀይ", b: "أحمر" },
                { a: "ሰማያዊ", b: "أزرق" },
                { a: "ቢጫ", b: "أصفر" },
                { a: "አረንጓዴ", b: "أخضر" },
                { a: "ጥቁር", b: "أسود" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "ar-phrases",
      title: "የተለመዱ ሐረጎች",
      subtitle: "Common Phrases",
      lessons: [
        {
          id: "ar-phrases-1",
          title: "ውይይት መጀመር",
          exercises: [
            { type: "translate", promptLang: "am", prompt: "እንዴት ነህ?", answer: "كيف حالك؟", say: "كيف حالك؟" },
            { type: "multiple_choice", promptLang: "am", prompt: "ስሜ ዮሐንስ ነው", options: ["اسمي يوهانس", "أنا من إثيوبيا", "تشرفنا"], correctIndex: 0, say: "اسمي يوهانس" },
            { type: "translate", promptLang: "am", prompt: "ትውውቅ ደስ ብሎኛል", answer: "تشرفنا", say: "تشرفنا" },
            { type: "multiple_choice", promptLang: "am", prompt: "የት ነው?", options: ["أين هو؟", "ما هذا؟", "من هذا؟"], correctIndex: 0, say: "أين هو؟" },
            { type: "translate", promptLang: "am", prompt: "በጣም አመሰግናለሁ", answer: "شكرا جزيلا", say: "شكرا جزيلا" },
            {
              type: "match",
              promptLang: "am",
              pairs: [
                { a: "እንዴት ነህ?", b: "كيف حالك؟" },
                { a: "ስሜ ... ነው", b: "اسمي ..." },
                { a: "የት ነው?", b: "أين هو؟" },
                { a: "በጣም አመሰግናለሁ", b: "شكرا جزيلا" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
