import { useDispatch, useSelector } from "react-redux"

import { PageType } from "../types"
import { changeQuestionNumber, type AppDispatch, type AppState } from "../store"

type QuestionAnswerFooterProps = {
  hasChanges?: boolean
}

export default function QuestionAnswerFooter({ hasChanges }: QuestionAnswerFooterProps) {
  const selectedQuestionNumber = useSelector((state: AppState) => state.view.globalQuestionNumber)
  const totalQuestions = useSelector((state: AppState) => state.questions.length)
  const isAnswerView = useSelector((state: AppState) => state.view.page === PageType.AnswerSheet)
  const dispatch = useDispatch<AppDispatch>()

  // if doesn't have any changes AND you're on an existing question number
  const isMoveToNextAllowed = !hasChanges && selectedQuestionNumber < totalQuestions

  const hideNextButton = isAnswerView && selectedQuestionNumber + 1 === totalQuestions

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
    <footer>
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
    </footer>
  )
}
