import { useDispatch, useSelector } from "react-redux"
import { Fragment, useState } from "react"
import { DragDropProvider, DragOverlay, type DragEndEvent, PointerSensor } from "@dnd-kit/react"
import { PointerActivationConstraints } from "@dnd-kit/dom"
import { RestrictToWindow } from "@dnd-kit/dom/modifiers"
import { move } from "@dnd-kit/helpers"

import { SixDotsIcon } from "../assets"
import { Alert, Modal, Timer } from "../ui"
import { ReviewQuestionCard, SortableQuestionRow } from "../components"
import { PageType, QuestionType } from "../types"
import { changePage, replaceQuestions, selectQuestions, type AppDispatch } from "../store"

type QuestionsReviewProps = {
  onSubmit: () => void
}

export default function QuestionsReview({ onSubmit }: QuestionsReviewProps) {
  const questions = useSelector(selectQuestions)
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

  function handleAddMore() {
    dispatch(changePage(PageType.Questionnaire))
  }

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
              <Fragment key={type}>
                , {type}: <strong>{questionByTypeCount[type]}</strong>
              </Fragment>
            ) : (
              ""
            ),
          )}
        </p>
        <div className="flex">
          <button className="mr-8" onClick={handleAddMore}>
            Add more questions
          </button>
          <button onClick={() => setShowSubmitDialog(true)}>Submit questions</button>
        </div>
      </header>
      <Alert>
        <span>
          Review your questions below. <SixDotsIcon height={14} width={10} /> Hold & drag to
          reorder, or click to reveal actions.
        </span>
      </Alert>
      <DragDropProvider
        onDragEnd={handleDragEnd}
        sensors={defaults => [
          ...defaults,
          PointerSensor.configure({
            activationConstraints: [
              new PointerActivationConstraints.Distance({ value: 10 }),
              new PointerActivationConstraints.Delay({ value: 500, tolerance: { x: 10, y: 5 } }),
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
      <Modal isOpen={showSubmitDialog} onClose={() => setShowSubmitDialog(false)}>
        <p>All set! You can now pass the device to the person answering the questions.</p>
        <button onClick={onSubmit}>Answer now</button>
        <p>
          Test will automatically start in {showSubmitDialog && <Timer onComplete={onSubmit} />}
        </p>
      </Modal>
    </>
  )
}
