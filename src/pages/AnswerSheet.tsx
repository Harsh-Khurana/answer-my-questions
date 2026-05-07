import { useState } from "react"
import { useSelector } from "react-redux"

import Modal from "../ui/Modal"
import Timer from "../ui/Timer"
import type { AppState } from "../store"
import { QuestionType } from "../types"
import McqAnswer from "../components/McqAnswer"
import SubjectiveAnswer from "../components/SubjectiveAnswer"
import BooleanAnswer from "../components/BooleanAnswer"
import AnswerFooter from "../components/QuestionAnswerFooter"

type AnswerSheetProps = {
  onSubmit: () => void
}

export default function AnswerSheet({ onSubmit }: AnswerSheetProps) {
  const questionNumber = useSelector((state: AppState) => state.view.globalQuestionNumber)
  const questionType = useSelector((state: AppState) => state.questions[questionNumber].type)
  const totalQuestions = useSelector((state: AppState) => state.questions.length)
  const totalAnswers = useSelector(
    (state: AppState) => Object.values(state.answers).filter(answer => answer !== undefined).length,
  )

  const [showSubmitDialog, setShowSubmitDialog] = useState(false)

  return (
    <>
      <header>
        <span>
          Questions answered:{" "}
          <strong>
            {totalAnswers} out of {totalQuestions}
          </strong>
        </span>
        <button onClick={() => setShowSubmitDialog(true)}>Submit answers</button>
      </header>
      <main>
        {questionType === QuestionType.MCQ && <McqAnswer />}
        {questionType === QuestionType.Subjective && <SubjectiveAnswer />}
        {questionType === QuestionType.Boolean && <BooleanAnswer />}
        <AnswerFooter />
      </main>
      <Modal isOpen={showSubmitDialog} onClose={() => setShowSubmitDialog(false)}>
        <p>Are you sure you want to submit your answers now?</p>
        <button onClick={onSubmit}>Yes, let's see the results</button>
        <p>
          Test will automatically close in <Timer onComplete={onSubmit} />
        </p>
      </Modal>
    </>
  )
}
