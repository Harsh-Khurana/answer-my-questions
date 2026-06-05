import { QuestionType } from "../constants/types"

// The Type Guard
export function isQuestionType(value: string): value is QuestionType {
  // We cast to string[] here just to satisfy the .includes() parameter rules
  return (Object.values(QuestionType) as string[]).includes(value)
}
