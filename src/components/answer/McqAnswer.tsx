import { useState, type KeyboardEvent } from "react"
import { useDispatch, useSelector } from "react-redux"

import { saveAnswer, type AppDispatch, type AppState } from "../../store"
import type { MCQQuestion } from "../../types"

export default function McqAnswer() {
  const questionNumber = useSelector((state: AppState) => state.view.globalQuestionNumber)
  const selectedQuestion = useSelector(
    (state: AppState) => state.questions[questionNumber],
  ) as MCQQuestion
  const selectedAnswer = useSelector((state: AppState) => state.answers?.[selectedQuestion.id]) as
    | number
    | undefined
  const dispatch = useDispatch<AppDispatch>()

  const [selectedAnswerOption, setSelectedAnswerOption] = useState<number | undefined>(
    selectedAnswer,
  )

  function handleAnswerSelect(idx: number) {
    setSelectedAnswerOption(idx)
    dispatch(saveAnswer({ id: selectedQuestion.id, answer: idx }))
  }

  // Helper function to allow keyboard users to select options
  function handleOptionKeyDown(event: KeyboardEvent<HTMLSpanElement>, optionIdx: number) {
    // Standard behavior: Spacebar or Enter selects the item
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault() // Stops the page from scrolling on Spacebar
      handleAnswerSelect(optionIdx)
    }
  }

  return (
    <>
      <h3>
        Q{questionNumber + 1}. {selectedQuestion.question}
      </h3>
      <ul className="options-list">
        {selectedQuestion.options.map((option, idx) => (
          <li key={option}>
            <span
              className={`option${selectedAnswerOption === idx ? " selected" : ""}`}
              onClick={() => handleAnswerSelect(idx)}
              onKeyDown={e => handleOptionKeyDown(e, idx)}
            >
              {option}
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}
