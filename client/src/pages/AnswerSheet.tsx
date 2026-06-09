import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

import { Alert, Modal, Timer } from "../ui"
import { McqAnswer, SubjectiveAnswer, BooleanAnswer } from "../components"
import { QuestionType } from "../constants/types"
import {
  selectCurrentQuestion,
  selectGlobalQuestionNumber,
  selectIsAnsweringMandatory,
  selectTotalAnswers,
  selectTotalQuestions,
} from "../store"
import { ROUTES } from "../constants/routes"

export default function AnswerSheet() {
  const questionNumber = useSelector(selectGlobalQuestionNumber)
  const selectedQuestion = useSelector(selectCurrentQuestion)
  const totalQuestions = useSelector(selectTotalQuestions)
  const totalAnswers = useSelector(selectTotalAnswers)
  const isAnsweringMandatory = useSelector(selectIsAnsweringMandatory)

  const [prevQuestionNum, setPrevQuestionNum] = useState(questionNumber)
  const [showMissingAnswersAlert, setShowMissingAnswersAlert] = useState(false)
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)

  const navigate = useNavigate()

  function handleSubmitClick() {
    if (isAnsweringMandatory && totalAnswers < totalQuestions) {
      setShowMissingAnswersAlert(true)
    } else {
      setShowSubmitDialog(true)
    }
  }

  function handleSubmit() {
    navigate(ROUTES.results)
  }

  if (questionNumber !== prevQuestionNum) {
    setPrevQuestionNum(questionNumber)
    setShowMissingAnswersAlert(false)
  }

  return (
    <>
      <header>
        <span>
          Questions answered:{" "}
          <strong>
            {totalAnswers} out of {totalQuestions}
          </strong>
        </span>
        <button onClick={handleSubmitClick}>Submit answers</button>
      </header>
      {totalAnswers === totalQuestions && (
        <Alert type="success">
          Great! You have answered all the questions. Now either review them by navigating between
          them or submit to see the results.
        </Alert>
      )}
      {showMissingAnswersAlert && totalAnswers !== totalQuestions && (
        <Alert type="danger">
          Cannot submit, {totalAnswers < totalQuestions && "Some questions are unanswered."}
        </Alert>
      )}
      <main key={questionNumber}>
        {selectedQuestion.type === QuestionType.MCQ && <McqAnswer />}
        {selectedQuestion.type === QuestionType.Subjective && <SubjectiveAnswer />}
        {selectedQuestion.type === QuestionType.Boolean && <BooleanAnswer />}
      </main>
      <Modal isOpen={showSubmitDialog} onClose={() => setShowSubmitDialog(false)}>
        <p>Are you sure you want to submit your answers now?</p>
        <button onClick={handleSubmit}>Yes, let's see the results</button>
        <p>
          Test will automatically close in{" "}
          {showSubmitDialog && <Timer seconds={10} onComplete={handleSubmit} />}
        </p>
      </Modal>
    </>
  )
}
