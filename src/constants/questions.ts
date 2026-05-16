import { QuestionCategories, QuestionType, type Question } from "./types"

export const BOLLYWOOD_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What is the name of Basanti's iconic horse in the epic movie 'Sholay'?",
    type: QuestionType.MCQ,
    options: ["Chetak", "Badal", "Dhanno", "Rani"],
  },
  {
    id: 2,
    question:
      "Which iconic Bollywood song famously features Shah Rukh Khan and Malaika Arora dancing on top of a moving train?",
    type: QuestionType.MCQ,
    options: ["Dard-E-Disco", "Chaiyya Chaiyya", "Ruk Ja O Dil Deewane", "Ek Pal Ka Jeena"],
  },
  {
    id: 3,
    question:
      "In the movie '3 Idiots', what is Rancho's (Aamir Khan) actual real name revealed at the end?",
    type: QuestionType.MCQ,
    options: [
      "Phunsukh Wangdu",
      "Chatur Ramalingam",
      "Ranchoddas Shamaldas Chanchad",
      "Viru Sahastrabudhhe",
    ],
  },
  {
    id: 4,
    question:
      "Which movie features the legendary dialogue: 'Bade bade deshon mein aisi chhoti chhoti baatein hoti rehti hai'?",
    type: QuestionType.MCQ,
    options: [
      "Kuch Kuch Hota Hai",
      "Dilwale Dulhania Le Jayenge",
      "Kabhi Khushi Kabhie Gham",
      "Mohabbatein",
    ],
  },
  {
    id: 5,
    question:
      "In 'Zindagi Na Milegi Dobara', what is the name of the festival where the three friends throw tomatoes at each other?",
    type: QuestionType.MCQ,
    options: ["La Tomatina", "Holi", "Festa del Redentore", "San Fermín"],
  },
  {
    id: 6,
    question:
      "Who holds the record for winning the most Filmfare Awards for Best Actor (tied at 8 wins each)?",
    type: QuestionType.MCQ,
    options: [
      "Amitabh Bachchan & Rajesh Khanna",
      "Shah Rukh Khan & Dilip Kumar",
      "Salman Khan & Aamir Khan",
      "Hrithik Roshan & Ranbir Kapoor",
    ],
  },
  {
    id: 7,
    question:
      "In 'Jab We Met', what is the name of Geet's imaginary lover who she plans to run away with?",
    type: QuestionType.MCQ,
    options: ["Aditya", "Anshuman", "Roop", "Manjit"],
  },
  {
    id: 8,
    question:
      "Which legendary playback singer has actually lent her voice to generations of actresses, from Madhubala to Kajol?",
    type: QuestionType.MCQ,
    options: ["Alka Yagnik", "Shreya Ghoshal", "Lata Mangeshkar", "Asha Bhosle"],
  },
  {
    id: 9,
    question: "Who is the richest bollywood actor?",
    type: QuestionType.MCQ,
    options: ["Sharukh Khan", "Salman Khan", "Akshay Kumar", "Amitabh Bachan", "Ranbir Kapoor"],
  },
  {
    id: 10,
    question: "Do you like watching bollywood movies or shows?",
    type: QuestionType.Boolean,
  },
  {
    id: 11,
    question:
      "Have you ever tried to confidently recreate a classic Bollywood dance step at a wedding?",
    type: QuestionType.Boolean,
  },
  {
    id: 12,
    question:
      "Do you genuinely believe that the 90s era of Bollywood music is better than today's music?",
    type: QuestionType.Boolean,
  },
  {
    id: 13,
    question:
      "True or False: 'Lagaan' was the very first Indian movie to be nominated for an Oscar.",
    type: QuestionType.Boolean, // False! It was Mother India (1957)
  },
  {
    id: 14,
    question:
      "Would you happily sit through a 3-hour long Bollywood family drama without skipping any of the songs?",
    type: QuestionType.Boolean,
  },
  {
    id: 15,
    question:
      "Have you ever successfully used a famous Bollywood dialogue in a real-life conversation?",
    type: QuestionType.Boolean,
  },
  {
    id: 16,
    question:
      "True or False: Amitabh Bachchan made his Hollywood debut acting alongside Leonardo DiCaprio in 'The Great Gatsby'.",
    type: QuestionType.Boolean, // True!
  },
  {
    id: 17,
    question:
      "Do you agree with the famous Kuch Kuch Hota Hai rule that 'Pyaar Dosti Hai' (Love is Friendship)?",
    type: QuestionType.Boolean,
  },
]

export const LOVE_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Would you still love me if I was an insect?",
    type: QuestionType.Boolean,
  },
  {
    id: 2,
    question: "What is your favorite time of the day? Why?",
    type: QuestionType.Subjective,
  },
  {
    id: 3,
    question: "What is your biggest goal this year?",
    type: QuestionType.MCQ,
    options: [
      "Levelling up in career",
      "Travel a new country",
      "Get married",
      "Get fit",
      "Something else",
    ],
  },
  {
    id: 4,
    question: "If you could rid yourself of one bad habit, what would it be?",
    type: QuestionType.Subjective,
  },
  {
    id: 5,
    question: "Is money a determining factor in relationship?",
    type: QuestionType.Boolean,
  },
  {
    id: 6,
    question: "Are you a spender or a saver?",
    type: QuestionType.MCQ,
    options: ["Spender", "Saver"],
  },
  {
    id: 7,
    question: "If finances weren’t a factor, what would you do for a living?",
    type: QuestionType.Subjective,
  },
  {
    id: 8,
    question: "What is one moment that you’d like to relive again and why?",
    type: QuestionType.Subjective,
  },
  {
    id: 9,
    question: "How do you feel most loved when we are apart?",
    type: QuestionType.MCQ,
    options: [
      "A surprise thoughtful text or phone call just to hear my voice",
      "Physical mementos or gifts that remind you of me",
      "Knowing you are my priority and the first to know when things happen",
      "Quality time scheduled as soon as we reunite",
    ],
  },
  {
    id: 10,
    question: "What is your absolute favorite way to spend a romantic evening?",
    type: QuestionType.MCQ,
    options: [
      "Getting dressed up and trying a brand-new, fancy restaurant",
      "Cooking a meal together at home while listening to a record",
      "Ordering takeout and binge-watching a TV show on the couch",
      "An unplanned, spontaneous drive to a nearby town or lookout spot",
    ],
  },
  {
    id: 11,
    question: "If you had to describe our connection as a movie genre, it would be:",
    type: QuestionType.MCQ,
    options: [
      "A sweeping, dramatic romantic comedy",
      "A slow-burn, emotionally intense drama",
      "A lighthearted, fun adventure full of inside jokes",
      "A comforting, slice-of-life story",
    ],
  },
  {
    id: 12,
    question: "When we have a disagreement, your preferred immediate approach is:",
    type: QuestionType.MCQ,
    options: [
      "Let’s pause, take space, and talk about it once we’ve both cooled off",
      "Sit down right then and there, and hash it out until we fix it",
      "Receive gentle physical reassurance (like a hug) before diving into the issue",
      "Focus on 'us against the problem' rather than pointing fingers.",
    ],
  },
]

export const NOSTALGIA_QUESTIONS: Question[] = [
  {
    id: 0,
    question:
      "Before WhatsApp and AirDrop existed, what was the ultimate, painfully slow way to send a ringtone to your friend's phone?",
    type: QuestionType.MCQ,
    options: ["Infrared (IR) beam", "Floppy Disk", "Emailing it", "Faxing it"],
  },
  {
    id: 1,
    question: "What was the absolute ultimate flex you could have in your school pencil box?",
    type: QuestionType.MCQ,
    options: [
      "Pop-out hidden compartments",
      "A built-in calculator",
      "Those bendy pencils that couldn't actually write",
      "Scented fruit erasers",
    ],
  },
  {
    id: 2,
    question:
      "Which of these terrifying childhood myths did almost everyone believe at some point?",
    type: QuestionType.MCQ,
    options: [
      "Swallowing a watermelon seed grows a tree in your stomach",
      "Sitting too close to the TV makes your eyes square",
      "Turning on the car's inside light is illegal",
      "All of the above",
    ],
  },
  {
    id: 3,
    question:
      "In the early days of computer class, what was the most elite game you could play when the teacher wasn't looking?",
    type: QuestionType.MCQ,
    options: ["Space Cadet Pinball", "Minesweeper", "Solitaire", "Purble Place"],
  },
  {
    id: 4,
    question:
      "If your video game cartridge froze or wouldn't load, what was the universal, scientifically unproven way to fix it?",
    type: QuestionType.MCQ,
    options: [
      "Blowing aggressively into the bottom of it",
      "Putting it in the freezer",
      "Tapping it exactly three times",
      "Wiping it with a wet tissue",
    ],
  },
  {
    id: 5,
    question:
      "Did you ever use a standard wooden pencil to manually rewind a tangled cassette tape?",
    type: QuestionType.Boolean,
  },
  {
    id: 6,
    question:
      "Have you ever successfully faked a stomach ache just so you could stay home and watch morning cartoons?",
    type: QuestionType.Boolean,
  },
  {
    id: 7,
    question:
      "True or False: You used to blindly mash every single button on the controller when playing fighting games like Tekken or Mortal Kombat.",
    type: QuestionType.Boolean,
  },
  {
    id: 8,
    question:
      "Did you ever own (or desperately want to own) a pair of shoes that lit up every time you took a step?",
    type: QuestionType.Boolean,
  },
  {
    id: 9,
    question:
      "When you used to draw a sun in elementary school art class, did you always put it exactly in the top corner of the paper?",
    type: QuestionType.Boolean,
  },
  {
    id: 10,
    question:
      "True or False: You still remember the exact dial-up internet sound playing in your head right now.",
    type: QuestionType.Boolean,
  },
]

export const ALL_CATEGORY_QUESTIONS = {
  [QuestionCategories.Love]: LOVE_QUESTIONS,
  [QuestionCategories.Brains]: [],
  [QuestionCategories.Bollywood]: BOLLYWOOD_QUESTIONS,
  [QuestionCategories.Opinions]: [],
  [QuestionCategories.Nostalgia]: NOSTALGIA_QUESTIONS,
}
