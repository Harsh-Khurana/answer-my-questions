export enum QuestionType {
  MCQ,
  Subjective,
  Boolean,
}

export type MCQQuestion = {
  id: number
  question: string
  type: QuestionType.MCQ
  options: string[]
  answer: number
}

export type SubjectiveQuestion = {
  id: number
  question: string
  type: QuestionType.Subjective
  answer: string
}

export type BooleanQuestion = {
  id: number
  question: string
  type: QuestionType.Boolean
  answer: boolean
}

export type Question = MCQQuestion | SubjectiveQuestion | BooleanQuestion

// Distributive Omit helper
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never

export type AnswerType = number | string | boolean

export type Answer = {
  id: number
  answer: AnswerType
}
