import type { Question } from "../types"
import ReviewQuestionCard from "./ReviewQuestionCard"

type ReviewQuestionListProps = {
  questions: Question[]
}

export default function ReviewQuestionList({ questions }: ReviewQuestionListProps) {
  return (
    <main className="review-questions-list">
      {questions.map((question, idx) => (
        <ReviewQuestionCard question={question} index={idx} />
      ))}
    </main>
  )
}
