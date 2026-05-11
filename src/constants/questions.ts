import { QuestionCategories, QuestionType, type Question } from "./types"

export const BOLLYWOOD_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Who is the richest bollywood actor?",
    type: QuestionType.MCQ,
    options: ["Sharukh Khan", "Salman Khan", "Akshay Kumar", "Amitabh Bachan", "Ranbir Kapoor"],
  },
]

export const LOVE_QUESTIONS = [
  {
    id: 1,
    question: "Would you still love me if I was an insect?",
    type: QuestionType.Boolean,
  },
]

export const ALL_CATEGORY_QUESTIONS = {
  [QuestionCategories.Love]: LOVE_QUESTIONS,
  [QuestionCategories.Brains]: [],
  [QuestionCategories.Bollywood]: BOLLYWOOD_QUESTIONS,
  [QuestionCategories.Opinions]: [],
  [QuestionCategories.Nostalgia]: [],
}
