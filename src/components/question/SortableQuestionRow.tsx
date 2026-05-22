import { useSortable } from "@dnd-kit/react/sortable"
import { motion } from "motion/react"

import type { Question } from "../../constants/types"
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
    <motion.div
      ref={ref}
      key={question.id}
      className={`review-question-wrapper${isDragging ? " drag-active" : ""}`}
      initial={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
    >
      <span>Q{index + 1}.</span>
      <ReviewQuestionCard question={question} handleRef={handleRef} />
    </motion.div>
  )
}
