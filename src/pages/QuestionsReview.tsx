import { useDispatch, useSelector } from "react-redux"
import { DragDropProvider, DragOverlay, type DragEndEvent } from "@dnd-kit/react"

import type { AppDispatch, AppState } from "../store"
import { QuestionType } from "../types"
import Alert from "../components/Alert"
import ReviewQuestionCard from "../components/ReviewQuestionCard"
import SortableQuestionRow from "../components/SortableQuestionRow"
import { move } from "@dnd-kit/helpers"
import { replaceQuestions } from "../store/questionsSlice"

type QuestionsReviewProps = {
  onSubmit: () => void
}

export default function QuestionsReview({ onSubmit }: QuestionsReviewProps) {
  const questions = useSelector((state: AppState) => state.questions)
  const dispatch = useDispatch<AppDispatch>()

  const questionByTypeCount = questions.reduce(
    (acc, question) => {
      if (acc[question.type]) {
        acc[question.type]++
      } else {
        acc[question.type] = 1
      }
      return acc
    },
    {} as Record<QuestionType, number>,
  )
  const totalQuestions = questions.length

  function handleDragEnd(event: DragEndEvent) {
    // setActiveQuestion(null)
    const reorderedQuestions = move(questions, event)
    dispatch(replaceQuestions(reorderedQuestions))
  }

  return (
    <>
      <header>
        <span>Total questions: {totalQuestions}</span>
        <button onClick={onSubmit}>Submit questions</button>
      </header>
      {/* @todo maybe this alert feels too much to just display the questions count. Think of alternative */}
      <Alert>
        {(Object.keys(questionByTypeCount) as QuestionType[])
          .map(questionType => `${questionType}: ${questionByTypeCount[questionType]}`)
          .join(", ")}
      </Alert>
      <DragDropProvider onDragEnd={handleDragEnd}>
        <main className="review-questions-list">
          {questions.map((question, idx) => (
            <SortableQuestionRow key={question.id} question={question} index={idx} />
          ))}
        </main>
        <DragOverlay dropAnimation={null}>
          {source => {
            const draggedItem = questions.find(q => q.id === source?.id)!
            return <ReviewQuestionCard question={draggedItem} />
          }}
        </DragOverlay>
      </DragDropProvider>
    </>
  )
}
