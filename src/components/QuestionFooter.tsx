import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, AppState } from "../store"
import { changeQuestionNumber } from "../store/viewSlice"

type QuestionFooterProps = {
  hasQuestionChanges?: boolean
}

export default function QuestionFooter({ hasQuestionChanges }: QuestionFooterProps) {
  const selectedQuestionNumber = useSelector((state: AppState) => state.view.globalQuestionNumber)
  const totalQuestions = useSelector((state: AppState) => state.questions.length)
  const dispatch = useDispatch<AppDispatch>()

  const hasNextQuestion = !hasQuestionChanges && totalQuestions > selectedQuestionNumber

  function handleMoveToPreviousQuestion() {
    dispatch(changeQuestionNumber(selectedQuestionNumber - 1))
  }

  function handleMoveToNextQuestion() {
    if (hasNextQuestion) {
      dispatch(changeQuestionNumber(selectedQuestionNumber + 1))
    }
  }

  return (
    <footer>
      {selectedQuestionNumber && selectedQuestionNumber > 0 ? (
        <button type="button" onClick={handleMoveToPreviousQuestion}>
          Previous question
        </button>
      ) : (
        <span></span>
      )}
      <button onClick={handleMoveToNextQuestion}>
        {hasNextQuestion ? "Next" : "Save"} Question
      </button>
    </footer>
  )
}
