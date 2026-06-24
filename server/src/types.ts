// @todo make these types from a common package @shared or something
// TYPES COPIED FROM FRONTEND

export const QuestionType = {
  MCQ: "MCQ",
  Subjective: "Subjective",
  Boolean: "Boolean",
} as const

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType]

export type MCQQuestion = {
  id: number
  question: string
  type: typeof QuestionType.MCQ
  options: string[]
  answer?: number
}

export type SubjectiveQuestion = {
  id: number
  question: string
  type: typeof QuestionType.Subjective
  answer?: string
}

export type BooleanQuestion = {
  id: number
  question: string
  type: typeof QuestionType.Boolean
  answer?: boolean
}

export type Question = MCQQuestion | SubjectiveQuestion | BooleanQuestion

// Distributive Omit helper
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never

export type AnswerType = number | string | boolean

export type Answers = Record<string, AnswerType>

export const QuestionCategories = {
  Love: "Love",
  Brains: "Brains",
  Bollywood: "Bollywood",
  Opinions: "Opinions",
  Nostalgia: "Nostalgia",
} as const

export type QuestionCategories = (typeof QuestionCategories)[keyof typeof QuestionCategories]

export type Issue = { title: string; description: string }

export type Sessions = Record<
  string,
  {
    isAnsweringMandatory: boolean
    questions: Question[]
    answers: Answers
    createdAt: number
    completed: boolean
  }
>
