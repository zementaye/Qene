// Language-agnostic course format. Any new course (e.g. am -> ar, am -> de)
// is just another file shaped like this one, registered in courseLoader.js.
//
// Exercise types the engine understands:
//   multiple_choice { prompt, promptLang, options[], correctIndex, say? }
//   translate       { prompt, promptLang, answer, altAnswers?, say? }
//   match           { promptLang, pairs: [{a,b}] }   -- a is fromLanguage, b is toLanguage
//
// `say` (optional) is the string spoken aloud via the browser's TTS when the
// exercise loads / on tap of the sound icon. Use the toLanguage word/phrase.

export const amEnCourse = {
  id: "am-en",
  fromLanguage: { code: "am", name: "አማርኛ", label: "Amharic" },
  toLanguage: { code: "en-US", name: "English", label: "English" },
  title: "እንግሊዝኛ ተማር",
  units: [
    {
      id: "greetings",
      title: "ሰላምታ",
      subtitle: "Greetings",
      lessons: [
        {
          id: "greetings-1",
          title: "መሠረታዊ ሰላምታ",
          exercises: [
            { type: "multiple_choice", promptLang: "am", prompt: "ሰላም", options: ["Hello", "Goodbye", "Please"], correctIndex: 0, say: "Hello" },
            { type: "multiple_choice", promptLang: "am", prompt: "ደህና ሁን", options: ["Thank you", "Goodbye", "Yes"], correctIndex: 1, say: "Goodbye" },
            { type: "multiple_choice", promptLang: "en", prompt: "Please", options: ["አመሰግናለሁ", "እባክህ", "አዎ"], correctIndex: 1 },
            { type: "translate", promptLang: "am", prompt: "አመሰግናለሁ", answer: "Thank you", say: "Thank you" },
            { type: "multiple_choice", promptLang: "am", prompt: "አዎ", options: ["No", "Yes", "Please"], correctIndex: 1, say: "Yes" },
            { type: "multiple_choice", promptLang: "am", prompt: "አይ", options: ["No", "Yes", "Goodbye"], correctIndex: 0, say: "No" },
            {
              type: "match",
              promptLang: "am",
              pairs: [
                { a: "ሰላም", b: "Hello" },
                { a: "ደህና ሁን", b: "Goodbye" },
                { a: "እባክህ", b: "Please" },
                { a: "አመሰግናለሁ", b: "Thank you" },
              ],
            },
            { type: "translate", promptLang: "en", prompt: "ደህና ሁን", answer: "Goodbye", say: "Goodbye" },
          ],
        },
      ],
    },
    {
      id: "basics",
      title: "እኔ እና አንተ",
      subtitle: "I & You",
      lessons: [
        {
          id: "basics-1",
          title: "ተውላጠ ስሞች",
          exercises: [
            { type: "multiple_choice", promptLang: "am", prompt: "እኔ", options: ["You", "I", "We"], correctIndex: 1, say: "I" },
            { type: "multiple_choice", promptLang: "am", prompt: "አንተ / አንቺ", options: ["You", "He", "They"], correctIndex: 0, say: "You" },
            { type: "multiple_choice", promptLang: "am", prompt: "እሱ", options: ["She", "He", "We"], correctIndex: 1, say: "He" },
            { type: "multiple_choice", promptLang: "am", prompt: "እሷ", options: ["She", "He", "It"], correctIndex: 0, say: "She" },
            { type: "translate", promptLang: "am", prompt: "እኛ", answer: "We", say: "We" },
            { type: "multiple_choice", promptLang: "am", prompt: "እነሱ", options: ["We", "They", "You"], correctIndex: 1, say: "They" },
            { type: "translate", promptLang: "am", prompt: "እኔ ተማሪ ነኝ", answer: "I am a student", altAnswers: ["I'm a student"], say: "I am a student" },
            {
              type: "match",
              promptLang: "am",
              pairs: [
                { a: "እኔ", b: "I" },
                { a: "አንተ", b: "You" },
                { a: "እሱ", b: "He" },
                { a: "እሷ", b: "She" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "numbers",
      title: "ቁጥሮች",
      subtitle: "Numbers",
      lessons: [
        {
          id: "numbers-1",
          title: "ከ 1 እስከ 10",
          exercises: [
            { type: "multiple_choice", promptLang: "am", prompt: "አንድ", options: ["Two", "One", "Three"], correctIndex: 1, say: "One" },
            { type: "multiple_choice", promptLang: "am", prompt: "ሁለት", options: ["Two", "Four", "Five"], correctIndex: 0, say: "Two" },
            { type: "multiple_choice", promptLang: "am", prompt: "ሶስት", options: ["Six", "Three", "Nine"], correctIndex: 1, say: "Three" },
            { type: "multiple_choice", promptLang: "am", prompt: "አራት", options: ["Four", "Seven", "Ten"], correctIndex: 0, say: "Four" },
            { type: "translate", promptLang: "am", prompt: "አምስት", answer: "Five", say: "Five" },
            { type: "multiple_choice", promptLang: "en", prompt: "Seven", options: ["ስድስት", "ሰባት", "ስምንት"], correctIndex: 1 },
            {
              type: "match",
              promptLang: "am",
              pairs: [
                { a: "ስድስት", b: "Six" },
                { a: "ሰባት", b: "Seven" },
                { a: "ስምንት", b: "Eight" },
                { a: "ዘጠኝ", b: "Nine" },
                { a: "አስር", b: "Ten" },
              ],
            },
            { type: "translate", promptLang: "am", prompt: "አስር", answer: "Ten", say: "Ten" },
          ],
        },
      ],
    },
    {
      id: "family",
      title: "ቤተሰብ",
      subtitle: "Family",
      lessons: [
        {
          id: "family-1",
          title: "የቤተሰብ አባላት",
          exercises: [
            { type: "multiple_choice", promptLang: "am", prompt: "እናት", options: ["Father", "Mother", "Sister"], correctIndex: 1, say: "Mother" },
            { type: "multiple_choice", promptLang: "am", prompt: "አባት", options: ["Father", "Brother", "Child"], correctIndex: 0, say: "Father" },
            { type: "multiple_choice", promptLang: "am", prompt: "እህት", options: ["Brother", "Sister", "Family"], correctIndex: 1, say: "Sister" },
            { type: "translate", promptLang: "am", prompt: "ወንድም", answer: "Brother", say: "Brother" },
            { type: "multiple_choice", promptLang: "am", prompt: "ልጅ", options: ["Child", "Parent", "Family"], correctIndex: 0, say: "Child" },
            { type: "translate", promptLang: "am", prompt: "ቤተሰብ", answer: "Family", say: "Family" },
            {
              type: "match",
              promptLang: "am",
              pairs: [
                { a: "እናት", b: "Mother" },
                { a: "አባት", b: "Father" },
                { a: "እህት", b: "Sister" },
                { a: "ወንድም", b: "Brother" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "food",
      title: "ምግብና መጠጥ",
      subtitle: "Food & Drink",
      lessons: [
        {
          id: "food-1",
          title: "በቤት ውስጥ",
          exercises: [
            { type: "multiple_choice", promptLang: "am", prompt: "ውሃ", options: ["Water", "Coffee", "Bread"], correctIndex: 0, say: "Water" },
            { type: "multiple_choice", promptLang: "am", prompt: "ቡና", options: ["Tea", "Coffee", "Milk"], correctIndex: 1, say: "Coffee" },
            { type: "multiple_choice", promptLang: "am", prompt: "ዳቦ", options: ["Bread", "Rice", "Meat"], correctIndex: 0, say: "Bread" },
            { type: "translate", promptLang: "am", prompt: "ምግብ", answer: "Food", say: "Food" },
            { type: "multiple_choice", promptLang: "en", prompt: "To eat", options: ["መጠጣት", "መብላት", "መተኛት"], correctIndex: 1 },
            { type: "translate", promptLang: "am", prompt: "እንጀራ እበላለሁ", answer: "I eat injera", say: "I eat injera" },
            {
              type: "match",
              promptLang: "am",
              pairs: [
                { a: "ውሃ", b: "Water" },
                { a: "ቡና", b: "Coffee" },
                { a: "ዳቦ", b: "Bread" },
                { a: "ምግብ", b: "Food" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "phrases",
      title: "የተለመዱ ሐረጎች",
      subtitle: "Common Phrases",
      lessons: [
        {
          id: "phrases-1",
          title: "ውይይት መጀመር",
          exercises: [
            { type: "translate", promptLang: "am", prompt: "እንዴት ነህ?", answer: "How are you?", say: "How are you?" },
            { type: "multiple_choice", promptLang: "am", prompt: "ስሜ ዮሐንስ ነው", options: ["My name is Yohannes", "I am from Ethiopia", "Nice to meet you"], correctIndex: 0, say: "My name is Yohannes" },
            { type: "translate", promptLang: "am", prompt: "ትውውቅ ደስ ብሎኛል", answer: "Nice to meet you", say: "Nice to meet you" },
            { type: "multiple_choice", promptLang: "am", prompt: "የት ነው?", options: ["Where is it?", "What is it?", "Who is it?"], correctIndex: 0, say: "Where is it?" },
            { type: "translate", promptLang: "am", prompt: "በጣም አመሰግናለሁ", answer: "Thank you very much", say: "Thank you very much" },
            {
              type: "match",
              promptLang: "am",
              pairs: [
                { a: "እንዴት ነህ?", b: "How are you?" },
                { a: "ስሜ ... ነው", b: "My name is ..." },
                { a: "የት ነው?", b: "Where is it?" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
