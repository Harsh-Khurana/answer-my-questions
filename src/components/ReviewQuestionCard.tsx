import { useDispatch, useSelector } from "react-redux"
import PencilIcon from "../assets/Pencil"
import { PageType, type Question } from "../types"
import type { AppDispatch, AppState } from "../store"
import { changePage, changeQuestionNumber } from "../store/viewSlice"
import { deleteQuestion } from "../store/questionsSlice"
import SixDotsIcon from "../assets/SixDots"
import DropdownArrowIcon from "../assets/DropdownArrow"
// import StaggerList from "../ui/StaggerList"

type ReviewQuestionCardProps = {
  question: Question | null
  showAnswer?: boolean
  hideActions?: boolean
}

export default function ReviewQuestionCard({
  question,
  showAnswer,
  hideActions = false,
}: ReviewQuestionCardProps) {
  const questions = useSelector((state: AppState) => state.questions)
  const dispatch = useDispatch<AppDispatch>()

  if (!question) return null

  function handleEditQuestion() {
    const questionNumber = questions.findIndex(q => q === question)

    dispatch(changeQuestionNumber(questionNumber))
    dispatch(changePage(PageType.Questionnaire))
  }

  function handleDeleteQuestion() {
    if (question) {
      dispatch(deleteQuestion(question.id))
    }
  }

  return (
    <div className="review-question-card">
      <div className="question">
        <h3>{question.question}</h3>
        {!hideActions && (
          <div className="actions">
            {/* <StaggerList
              label={
                <button title="Drag question">
                  <SixDotsIcon height={12} width={12} />
                </button>
              }
            >
              <button className="warning" title="Edit question" onClick={handleEditQuestion}>
                <span>Edit</span>
                <PencilIcon height={12} width={12} />
              </button>
              <button className="error" title="Delete question" onClick={handleDeleteQuestion}>
                Delete X
              </button>
              <button className="success">
                Show answer
                <DropdownArrowIcon height={12} width={12} />
              </button>
            </StaggerList> */}
            <button title="Drag question">
              <SixDotsIcon height={12} width={12} />
            </button>
            <button className="warning" title="Edit question" onClick={handleEditQuestion}>
              <PencilIcon height={12} width={12} />
            </button>
            <button className="error" title="Delete question" onClick={handleDeleteQuestion}>
              X
            </button>
            <button className="success">
              <DropdownArrowIcon height={12} width={12} />
            </button>
          </div>
        )}
      </div>
      <div className={`answer${showAnswer ? " show" : ""}`}>
        <p>{question.answer}</p>
      </div>
    </div>
  )
}
