import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

import { DropdownArrowIcon, PencilIcon, SixDotsIcon } from "../../assets"
import { StaggerList } from "../../ui"
import { PageType, type Question } from "../../types"
import {
  deleteQuestion,
  changePage,
  changeQuestionNumber,
  type AppDispatch,
  type AppState,
} from "../../store"

type ReviewQuestionCardProps = {
  question: Question | null
  handleRef?: (element: Element | null) => void
  hideActions?: boolean
}

export default function ReviewQuestionCard({
  question,
  handleRef,
  hideActions = false,
}: ReviewQuestionCardProps) {
  const questions = useSelector((state: AppState) => state.questions)
  const dispatch = useDispatch<AppDispatch>()

  const [showAnswer, setShowAnswer] = useState(false)

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

  function handleAnswerToggle() {
    setShowAnswer(prevShow => !prevShow)
  }

  let answer = question.answer

  if (question.type === "MCQ") {
    answer = question.options[question.answer]
  }
  if (question.type === "Boolean") {
    answer = question.answer ? "Yes" : "No"
  }

  return (
    <div className="review-question-card">
      <div className="question">
        <h3>{question.question}</h3>
        {!hideActions && (
          <span className="actions">
            <StaggerList
              label={
                <button title="Drag question or Reveal actions" ref={handleRef}>
                  <SixDotsIcon height={12} width={12} />
                </button>
              }
            >
              <button
                className="warning bordered"
                title="Edit question"
                onClick={handleEditQuestion}
              >
                Edit <PencilIcon height={12} width={12} />
              </button>
              <button
                className="error bordered"
                title="Delete question"
                onClick={handleDeleteQuestion}
              >
                Delete <span>X</span>
              </button>
              <button
                className="bordered"
                title={showAnswer ? "Hide answer" : "Show answer"}
                onClick={handleAnswerToggle}
              >
                {showAnswer ? "Hide" : "Show"} answer{" "}
                <DropdownArrowIcon
                  height={12}
                  width={12}
                  className={showAnswer ? "rotate180" : ""}
                />
              </button>
            </StaggerList>
          </span>
        )}
      </div>
      {showAnswer && (
        <div className="answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  )
}
