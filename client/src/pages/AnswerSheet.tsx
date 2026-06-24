import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router"
import { useMutation } from "@tanstack/react-query"

import { Alert, Modal, Timer } from "../ui"
import { McqAnswer, SubjectiveAnswer, BooleanAnswer } from "../components"
import { QuestionType } from "../constants/types"
import {
  selectAnswers,
  selectCurrentQuestion,
  selectGlobalQuestionNumber,
  selectIsAnsweringMandatory,
  selectTotalAnswers,
  selectTotalQuestions,
} from "../store"
import { ROUTES } from "../constants/routes"
import { updateSession } from "../utils"

export default function AnswerSheet() {
  const questionNumber = useSelector(selectGlobalQuestionNumber)
  const selectedQuestion = useSelector(selectCurrentQuestion)
  const totalQuestions = useSelector(selectTotalQuestions)
  const totalAnswers = useSelector(selectTotalAnswers)
  const isAnsweringMandatory = useSelector(selectIsAnsweringMandatory)
  const allAnswers = useSelector(selectAnswers)

  const [prevQuestionNum, setPrevQuestionNum] = useState(questionNumber)
  const [showMissingAnswersAlert, setShowMissingAnswersAlert] = useState(false)
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const activeSessionId = searchParams.get("sessionId")!

  const { isPending, mutate, isError, error } = useMutation({
    mutationFn: updateSession,
    onSuccess: () => {
      navigate(`${ROUTES.results}?sessionId=${activeSessionId}`)
    },
  })

  function handleSubmitClick() {
    if (isAnsweringMandatory && totalAnswers < totalQuestions) {
      setShowMissingAnswersAlert(true)
    } else {
      setShowSubmitDialog(true)
    }
  }

  function handleSubmit() {
    mutate({ sessionId: activeSessionId, answers: allAnswers })
    setShowSubmitDialog(false)
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
          Great! {isAnsweringMandatory ? "You have answered" : "That's"} all the questions. Now
          either review them by navigating between them or submit to see the results.
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
        {isError && (
          <div className="mb-32">
            <Alert type="danger">{error.message}</Alert>
          </div>
        )}
        <p>Are you sure you want to submit your answers now?</p>
        <button disabled={isPending} onClick={handleSubmit}>
          {isPending ? (
            <span className="loading-dots">Submitting</span>
          ) : (
            "Yes, let's see the results"
          )}
        </button>
        <p>
          Test will automatically close in{" "}
          {showSubmitDialog && <Timer seconds={10} onComplete={handleSubmit} />}
        </p>
      </Modal>
    </>
  )
}
