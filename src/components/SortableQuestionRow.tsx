import type { Question } from "../types"
import { useSortable } from "@dnd-kit/react/sortable"
import ReviewQuestionCard from "./ReviewQuestionCard"

type SortableQuestionRowProps = {
  question: Question
  index: number
}

export default function SortableQuestionRow({ question, index }: SortableQuestionRowProps) {
  const { ref, isDragging } = useSortable({
    id: question.id,
    index,
  })

  return (
    <div ref={ref} key={question.id} className="review-question-wrapper">
      <span>Q{index + 1}.</span>
      <div style={{ flex: 1, opacity: isDragging ? 0 : 1 }}>
        <ReviewQuestionCard question={question} />
      </div>
    </div>
  )
}
