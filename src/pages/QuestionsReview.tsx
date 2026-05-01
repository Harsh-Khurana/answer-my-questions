import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { DragDropProvider, DragOverlay, type DragEndEvent, PointerSensor } from "@dnd-kit/react"
import { PointerActivationConstraints } from "@dnd-kit/dom"
import { RestrictToWindow } from "@dnd-kit/dom/modifiers"

import type { AppDispatch, AppState } from "../store"
import { QuestionType } from "../types"
import Alert from "../ui/Alert"
import ReviewQuestionCard from "../components/ReviewQuestionCard"
import SortableQuestionRow from "../components/SortableQuestionRow"
import { move } from "@dnd-kit/helpers"
import { replaceQuestions } from "../store/questionsSlice"
import Modal from "../ui/Modal"
import Timer from "../ui/Timer"

type QuestionsReviewProps = {
  onSubmit: () => void
}

export default function QuestionsReview({ onSubmit }: QuestionsReviewProps) {
  const questions = useSelector((state: AppState) => state.questions)
  const dispatch = useDispatch<AppDispatch>()

  const [showSubmitDialog, setShowSubmitDialog] = useState(false)

  const questionByTypeCount = questions.reduce(
    (acc, question) => {
      acc[question.type]++
      return acc
    },
    {
      [QuestionType.MCQ]: 0,
      [QuestionType.Subjective]: 0,
      [QuestionType.Boolean]: 0,
    },
  )
  const totalQuestions = questions.length

  function handleDragEnd(event: DragEndEvent) {
    const reorderedQuestions = move(questions, event)
    dispatch(replaceQuestions(reorderedQuestions))
  }

  return (
    <>
      <header>
        <p>
          <span>
            Total questions: <strong>{totalQuestions}</strong>
          </span>
          {(Object.keys(questionByTypeCount) as QuestionType[]).map(type =>
            questionByTypeCount[type] ? (
              <>
                , {type}: <strong>{questionByTypeCount[type]}</strong>
              </>
            ) : (
              ""
            ),
          )}
        </p>
        <button onClick={() => setShowSubmitDialog(true)}>Submit questions</button>
      </header>
      <Alert>
        Review your questions below. Drag to reorder, or use the buttons to edit and delete.
      </Alert>
      <DragDropProvider
        onDragEnd={handleDragEnd}
        sensors={defaults => [
          ...defaults,
          PointerSensor.configure({
            activationConstraints: [
              new PointerActivationConstraints.Distance({ value: 5 }),
              new PointerActivationConstraints.Delay({ value: 200, tolerance: { x: 10, y: 5 } }),
            ],
          }),
        ]}
        modifiers={defaults => [...defaults, RestrictToWindow]}
      >
        <main className="review-questions-list">
          {questions.map((question, idx) => (
            <SortableQuestionRow key={question.id} question={question} index={idx} />
          ))}
        </main>
        <DragOverlay dropAnimation={null}>
          {source => {
            const draggedItem = questions.find(q => q.id === source?.id)!
            return <ReviewQuestionCard question={draggedItem} hideActions />
          }}
        </DragOverlay>
      </DragDropProvider>
      {showSubmitDialog && (
        <Modal isOpen={showSubmitDialog} onClose={() => setShowSubmitDialog(false)}>
          <p>All set! You can now pass the device to the person answering the questions.</p>
          <button onClick={onSubmit}>Answer now</button>
          <p>
            Test will automatically start in <Timer onComplete={onSubmit} />
          </p>
        </Modal>
      )}
    </>
  )
}
