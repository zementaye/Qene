// Language-agnostic course format. Any new course (e.g. am -> ar, am -> de)
// is just another file shaped like this one, registered in courseLoader.js.
//
// Exercise types the engine understands:
//   multiple_choice { prompt, promptLang, options[], correctIndex, say? }
//   translate       { prompt, promptLang, answer, altAnswers?, say? }
//   match           { promptLang, pairs: [{a,b}] }   -- a is fromLanguage, b is toLanguage
//   listening       { say, options[] (fromLanguage), correctIndex }
//                     -- audio-first: toLanguage word/phrase is spoken aloud,
//                        learner picks its fromLanguage meaning. Falls back
//                        to showing `say` as text if TTS isn't available.
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
            { type: "listening", say: "Thank you", options: ["አመሰግናለሁ", "ደህና ሁን", "አዎ"], correctIndex: 0 },
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
        {
          id: "numbers-2",
          title: "ከ 11 እስከ 20",
          exercises: [
            { type: "multiple_choice", promptLang: "am", prompt: "አስራ አንድ", options: ["Twelve", "Eleven", "Ten"], correctIndex: 1, say: "Eleven" },
            { type: "multiple_choice", promptLang: "am", prompt: "አስራ ሁለት", options: ["Eleven", "Twelve", "Thirteen"], correctIndex: 1, say: "Twelve" },
            { type: "translate", promptLang: "am", prompt: "አስራ ሶስት", answer: "Thirteen", say: "Thirteen" },
            { type: "multiple_choice", promptLang: "am", prompt: "አስራ አራት", options: ["Fourteen", "Fifteen", "Forty"], correctIndex: 0, say: "Fourteen" },
            { type: "multiple_choice", promptLang: "en", prompt: "Fifteen", options: ["አስራ አምስት", "አስራ ስድስት", "አምስት"], correctIndex: 0 },
            { type: "translate", promptLang: "am", prompt: "አስራ ስድስት", answer: "Sixteen", say: "Sixteen" },
            { type: "multiple_choice", promptLang: "am", prompt: "አስራ ሰባት", options: ["Seventeen", "Seven", "Eighteen"], correctIndex: 0, say: "Seventeen" },
            { type: "translate", promptLang: "am", prompt: "ሃያ", answer: "Twenty", say: "Twenty" },
            { type: "listening", say: "Nineteen", options: ["አስራ ስምንት", "አስራ ዘጠኝ", "ሃያ"], correctIndex: 1 },
            {
              type: "match",
              promptLang: "am",
              pairs: [
                { a: "አስራ ስምንት", b: "Eighteen" },
                { a: "አስራ ዘጠኝ", b: "Nineteen" },
                { a: "ሃያ", b: "Twenty" },
                { a: "አስራ አምስት", b: "Fifteen" },
              ],
            },
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
            { type: "listening", say: "Water", options: ["ቡና", "ውሃ", "ዳቦ"], correctIndex: 1 },
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
    {
      id: "colors",
      title: "ቀለማት",
      subtitle: "Colors",
      lessons: [
        {
          id: "colors-1",
          title: "መሠረታዊ ቀለማት",
          exercises: [
            { type: "multiple_choice", promptLang: "am", prompt: "ቀይ", options: ["Blue", "Red", "Green"], correctIndex: 1, say: "Red" },
            { type: "multiple_choice", promptLang: "am", prompt: "ሰማያዊ", options: ["Blue", "Yellow", "Black"], correctIndex: 0, say: "Blue" },
            { type: "multiple_choice", promptLang: "am", prompt: "ቢጫ", options: ["Yellow", "White", "Orange"], correctIndex: 0, say: "Yellow" },
            { type: "translate", promptLang: "am", prompt: "አረንጓዴ", answer: "Green", say: "Green" },
            { type: "multiple_choice", promptLang: "en", prompt: "Black", options: ["ጥቁር", "ነጭ", "ቀይ"], correctIndex: 0 },
            { type: "multiple_choice", promptLang: "am", prompt: "ነጭ", options: ["Black", "White", "Pink"], correctIndex: 1, say: "White" },
            { type: "listening", say: "Orange", options: ["ብርቱካናማ", "ቢጫ", "ቀይ"], correctIndex: 0 },
            {
              type: "match",
              promptLang: "am",
              pairs: [
                { a: "ቀይ", b: "Red" },
                { a: "ሰማያዊ", b: "Blue" },
                { a: "አረንጓዴ", b: "Green" },
                { a: "ጥቁር", b: "Black" },
                { a: "ነጭ", b: "White" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "time",
      title: "ቀናትና ሰዓት",
      subtitle: "Days & Time",
      lessons: [
        {
          id: "time-1",
          title: "የሳምንት ቀናት",
          exercises: [
            { type: "multiple_choice", promptLang: "am", prompt: "ሰኞ", options: ["Monday", "Tuesday", "Sunday"], correctIndex: 0, say: "Monday" },
            { type: "multiple_choice", promptLang: "am", prompt: "ማክሰኞ", options: ["Wednesday", "Tuesday", "Thursday"], correctIndex: 1, say: "Tuesday" },
            { type: "multiple_choice", promptLang: "am", prompt: "ረቡዕ", options: ["Wednesday", "Thursday", "Friday"], correctIndex: 0, say: "Wednesday" },
            { type: "translate", promptLang: "am", prompt: "ዓርብ", answer: "Friday", say: "Friday" },
            { type: "multiple_choice", promptLang: "en", prompt: "Saturday", options: ["ቅዳሜ", "እሁድ", "ሐሙስ"], correctIndex: 0 },
            { type: "translate", promptLang: "am", prompt: "እሁድ", answer: "Sunday", say: "Sunday" },
            { type: "multiple_choice", promptLang: "am", prompt: "ዛሬ", options: ["Today", "Tomorrow", "Yesterday"], correctIndex: 0, say: "Today" },
            { type: "multiple_choice", promptLang: "am", prompt: "ነገ", options: ["Yesterday", "Today", "Tomorrow"], correctIndex: 2, say: "Tomorrow" },
            {
              type: "match",
              promptLang: "am",
              pairs: [
                { a: "ሰኞ", b: "Monday" },
                { a: "ማክሰኞ", b: "Tuesday" },
                { a: "ረቡዕ", b: "Wednesday" },
                { a: "ሐሙስ", b: "Thursday" },
                { a: "ዓርብ", b: "Friday" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "weather",
      title: "የአየር ሁኔታ",
      subtitle: "Weather",
      lessons: [
        {
          id: "weather-1",
          title: "ስለ አየር ሁኔታ መናገር",
          exercises: [
            { type: "multiple_choice", promptLang: "am", prompt: "ፀሐይ", options: ["Rain", "Sun", "Wind"], correctIndex: 1, say: "Sun" },
            { type: "multiple_choice", promptLang: "am", prompt: "ዝናብ", options: ["Rain", "Cloud", "Wind"], correctIndex: 0, say: "Rain" },
            { type: "multiple_choice", promptLang: "am", prompt: "ንፋስ", options: ["Wind", "Sun", "Cold"], correctIndex: 0, say: "Wind" },
            { type: "translate", promptLang: "am", prompt: "ደመና", answer: "Cloud", say: "Cloud" },
            { type: "multiple_choice", promptLang: "en", prompt: "Hot", options: ["ቅዝቃዜ", "ሙቀት", "ንፋስ"], correctIndex: 1 },
            { type: "translate", promptLang: "am", prompt: "ቅዝቃዜ", answer: "Cold", say: "Cold" },
            { type: "listening", say: "Rain", options: ["ንፋስ", "ፀሐይ", "ዝናብ"], correctIndex: 2 },
            {
              type: "match",
              promptLang: "am",
              pairs: [
                { a: "ፀሐይ", b: "Sun" },
                { a: "ዝናብ", b: "Rain" },
                { a: "ንፋስ", b: "Wind" },
                { a: "ደመና", b: "Cloud" },
                { a: "ሙቀት", b: "Hot" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "animals",
      title: "እንስሳት",
      subtitle: "Animals",
      lessons: [
        {
          id: "animals-1",
          title: "የቤት እንስሳት",
          exercises: [
            { type: "multiple_choice", promptLang: "am", prompt: "ውሻ", options: ["Cat", "Dog", "Cow"], correctIndex: 1, say: "Dog" },
            { type: "multiple_choice", promptLang: "am", prompt: "ድመት", options: ["Cat", "Dog", "Horse"], correctIndex: 0, say: "Cat" },
            { type: "multiple_choice", promptLang: "am", prompt: "ላም", options: ["Horse", "Cow", "Donkey"], correctIndex: 1, say: "Cow" },
            { type: "translate", promptLang: "am", prompt: "ፈረስ", answer: "Horse", say: "Horse" },
            { type: "multiple_choice", promptLang: "en", prompt: "Chicken", options: ["ዶሮ", "ዝሆን", "አንበሳ"], correctIndex: 0 },
            { type: "translate", promptLang: "am", prompt: "አንበሳ", answer: "Lion", say: "Lion" },
            { type: "multiple_choice", promptLang: "am", prompt: "ዝሆን", options: ["Elephant", "Lion", "Cow"], correctIndex: 0, say: "Elephant" },
            { type: "listening", say: "Dog", options: ["ድመት", "ውሻ", "ላም"], correctIndex: 1 },
            {
              type: "match",
              promptLang: "am",
              pairs: [
                { a: "ውሻ", b: "Dog" },
                { a: "ድመት", b: "Cat" },
                { a: "ላም", b: "Cow" },
                { a: "ፈረስ", b: "Horse" },
                { a: "ዶሮ", b: "Chicken" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "body",
      title: "የሰውነት ክፍሎች",
      subtitle: "Body Parts",
      lessons: [
        {
          id: "body-1",
          title: "የሰውነት ክፍሎች",
          exercises: [
            { type: "multiple_choice", promptLang: "am", prompt: "ራስ", options: ["Head", "Hand", "Leg"], correctIndex: 0, say: "Head" },
            { type: "multiple_choice", promptLang: "am", prompt: "ዓይን", options: ["Ear", "Eye", "Nose"], correctIndex: 1, say: "Eye" },
            { type: "multiple_choice", promptLang: "am", prompt: "ጆሮ", options: ["Ear", "Mouth", "Eye"], correctIndex: 0, say: "Ear" },
            { type: "translate", promptLang: "am", prompt: "አፍ", answer: "Mouth", say: "Mouth" },
            { type: "multiple_choice", promptLang: "en", prompt: "Hand", options: ["እግር", "እጅ", "አፍንጫ"], correctIndex: 1 },
            { type: "translate", promptLang: "am", prompt: "እግር", answer: "Leg", altAnswers: ["Foot"], say: "Leg" },
            { type: "multiple_choice", promptLang: "am", prompt: "አፍንጫ", options: ["Nose", "Mouth", "Ear"], correctIndex: 0, say: "Nose" },
            {
              type: "match",
              promptLang: "am",
              pairs: [
                { a: "ራስ", b: "Head" },
                { a: "ዓይን", b: "Eye" },
                { a: "ጆሮ", b: "Ear" },
                { a: "አፍ", b: "Mouth" },
                { a: "እጅ", b: "Hand" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "verbs",
      title: "መሠረታዊ ግሶች",
      subtitle: "Common Verbs",
      lessons: [
        {
          id: "verbs-1",
          title: "በየቀኑ የሚደረጉ ነገሮች",
          exercises: [
            { type: "multiple_choice", promptLang: "am", prompt: "መብላት", options: ["To drink", "To eat", "To sleep"], correctIndex: 1, say: "To eat" },
            { type: "multiple_choice", promptLang: "am", prompt: "መጠጣት", options: ["To drink", "To eat", "To go"], correctIndex: 0, say: "To drink" },
            { type: "multiple_choice", promptLang: "am", prompt: "መተኛት", options: ["To sleep", "To come", "To see"], correctIndex: 0, say: "To sleep" },
            { type: "translate", promptLang: "am", prompt: "መሄድ", answer: "To go", say: "To go" },
            { type: "multiple_choice", promptLang: "en", prompt: "To come", options: ["መሄድ", "መምጣት", "ማየት"], correctIndex: 1 },
            { type: "translate", promptLang: "am", prompt: "ማየት", answer: "To see", say: "To see" },
            { type: "multiple_choice", promptLang: "am", prompt: "መስማት", options: ["To hear", "To speak", "To see"], correctIndex: 0, say: "To hear" },
            { type: "translate", promptLang: "am", prompt: "መናገር", answer: "To speak", say: "To speak" },
            {
              type: "match",
              promptLang: "am",
              pairs: [
                { a: "መብላት", b: "To eat" },
                { a: "መጠጣት", b: "To drink" },
                { a: "መተኛት", b: "To sleep" },
                { a: "መሄድ", b: "To go" },
                { a: "ማየት", b: "To see" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
