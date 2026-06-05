import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

import { DropdownArrowIcon, PencilIcon, SixDotsIcon } from "../../assets/icons"
import { StaggerList } from "../../ui"
import { PageType, type Question } from "../../constants/types"
import {
  deleteQuestion,
  changePage,
  changeQuestionNumber,
  type AppDispatch,
  selectQuestions,
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
  const questions = useSelector(selectQuestions)
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
      dispatch(changeQuestionNumber(questions.length - 1))
      dispatch(deleteQuestion(question.id))
      if (questions.length === 1) {
        dispatch(changePage(PageType.Questionnaire))
      }
    }
  }

  function handleAnswerToggle() {
    setShowAnswer(prevShow => !prevShow)
  }

  let answer = question.answer ?? "-"

  if (question.type === "MCQ") {
    answer = typeof question.answer === "number" ? question.options[question.answer!] : "-"
  }
  if (question.type === "Boolean") {
    answer = typeof question.answer === "boolean" ? (question.answer ? "Yes" : "No") : "-"
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
              <button className="bordered" title="Edit question" onClick={handleEditQuestion}>
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
                className="success bordered"
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
