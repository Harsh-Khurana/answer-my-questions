import type { Question } from "../types"
import { useSortable } from "@dnd-kit/react/sortable"
import ReviewQuestionCard from "./ReviewQuestionCard"

type SortableQuestionRowProps = {
  question: Question
  index: number
}

export default function SortableQuestionRow({ question, index }: SortableQuestionRowProps) {
  const { ref, handleRef, isDragging } = useSortable({
    id: question.id,
    index,
  })

  return (
    <div
      ref={ref}
      key={question.id}
      className={`review-question-wrapper${isDragging ? " drag-active" : ""}`}
    >
      <span>Q{index + 1}.</span>
      <ReviewQuestionCard question={question} handleRef={handleRef} />
    </div>
  )
}
