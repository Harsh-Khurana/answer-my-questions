import type { Question } from "../types"

type ReviewQuestionCardProps = {
  question: Question | null
}

export default function ReviewQuestionCard({ question }: ReviewQuestionCardProps) {
  if (!question) return null

  return (
    <div className="review-question-card">
      <h3>{question.question}</h3>
      <p>{question.answer}</p>
    </div>
  )
}
