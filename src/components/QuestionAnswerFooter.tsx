import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"

import {
  changeQuestionNumber,
  selectGlobalQuestionNumber,
  selectTotalQuestions,
  type AppDispatch,
} from "../store"
import { ROUTES } from "../constants/routes"

type QuestionAnswerFooterProps = {
  hasChanges?: boolean
}

export default function QuestionAnswerFooter({ hasChanges }: QuestionAnswerFooterProps) {
  const selectedQuestionNumber = useSelector(selectGlobalQuestionNumber)
  const totalQuestions = useSelector(selectTotalQuestions)
  const dispatch = useDispatch<AppDispatch>()

  const location = useLocation()

  // if doesn't have any changes AND you're on an existing question number
  const isMoveToNextAllowed = !hasChanges && selectedQuestionNumber < totalQuestions

  const hideNextButton =
    location.pathname === ROUTES.answerSheet && selectedQuestionNumber + 1 === totalQuestions

  function handleMoveToPreviousQuestion() {
    dispatch(changeQuestionNumber(selectedQuestionNumber - 1))
  }

  function handleMoveToNextQuestion() {
    if (isMoveToNextAllowed) {
      dispatch(changeQuestionNumber(selectedQuestionNumber + 1))
    }
    // else button click would cause form submit in question forms
  }

  return (
    <div className="question-answer-footer">
      {selectedQuestionNumber && selectedQuestionNumber > 0 ? (
        <button type="button" onClick={handleMoveToPreviousQuestion}>
          Previous
        </button>
      ) : (
        <span></span>
      )}
      {!hideNextButton && (
        <button type={isMoveToNextAllowed ? "button" : "submit"} onClick={handleMoveToNextQuestion}>
          {isMoveToNextAllowed ? "Next" : "Save & Next"}
        </button>
      )}
    </div>
  )
}
