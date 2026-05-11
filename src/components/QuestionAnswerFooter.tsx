import { useDispatch, useSelector } from "react-redux"

import { PageType } from "../constants/types"
import {
  changeQuestionNumber,
  selectCurrentPage,
  selectGlobalQuestionNumber,
  selectTotalQuestions,
  type AppDispatch,
} from "../store"

type QuestionAnswerFooterProps = {
  hasChanges?: boolean
}

export default function QuestionAnswerFooter({ hasChanges }: QuestionAnswerFooterProps) {
  const selectedQuestionNumber = useSelector(selectGlobalQuestionNumber)
  const totalQuestions = useSelector(selectTotalQuestions)
  const currentPage = useSelector(selectCurrentPage)
  const dispatch = useDispatch<AppDispatch>()

  // if doesn't have any changes AND you're on an existing question number
  const isMoveToNextAllowed = !hasChanges && selectedQuestionNumber < totalQuestions

  const hideNextButton =
    currentPage === PageType.AnswerSheet && selectedQuestionNumber + 1 === totalQuestions

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
          {isMoveToNextAllowed ? "Next" : "Save"}
        </button>
      )}
    </div>
  )
}
