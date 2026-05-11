import { useState } from "react"
import { useSelector } from "react-redux"

import { Modal, Timer } from "../ui"
import {
  McqAnswer,
  SubjectiveAnswer,
  BooleanAnswer,
  QuestionAnswerFooter as AnswerFooter,
} from "../components"
import { QuestionType } from "../constants/types"
import {
  selectCurrentQuestion,
  selectGlobalQuestionNumber,
  selectTotalAnswers,
  selectTotalQuestions,
} from "../store"

type AnswerSheetProps = {
  onSubmit: () => void
}

export default function AnswerSheet({ onSubmit }: AnswerSheetProps) {
  const questionNumber = useSelector(selectGlobalQuestionNumber)
  const selectedQuestion = useSelector(selectCurrentQuestion)
  const totalQuestions = useSelector(selectTotalQuestions)
  const totalAnswers = useSelector(selectTotalAnswers)

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
      <main key={questionNumber}>
        {selectedQuestion.type === QuestionType.MCQ && <McqAnswer />}
        {selectedQuestion.type === QuestionType.Subjective && <SubjectiveAnswer />}
        {selectedQuestion.type === QuestionType.Boolean && <BooleanAnswer />}
        <AnswerFooter />
      </main>
      <Modal isOpen={showSubmitDialog} onClose={() => setShowSubmitDialog(false)}>
        <p>Are you sure you want to submit your answers now?</p>
        <button onClick={onSubmit}>Yes, let's see the results</button>
        <p>
          Test will automatically close in{" "}
          {showSubmitDialog && <Timer seconds={10} onComplete={onSubmit} />}
        </p>
      </Modal>
    </>
  )
}
