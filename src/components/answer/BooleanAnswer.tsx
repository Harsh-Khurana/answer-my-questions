import { useState, type KeyboardEvent } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  saveAnswer,
  selectCurrentAnswer,
  selectCurrentQuestion,
  selectGlobalQuestionNumber,
  type AppDispatch,
} from "../../store"
import type { BooleanQuestion } from "../../types"

export default function BooleanAnswer() {
  const questionNumber = useSelector(selectGlobalQuestionNumber)
  const selectedQuestion = useSelector(selectCurrentQuestion) as BooleanQuestion
  const selectedAnswer = useSelector(selectCurrentAnswer) as boolean | undefined
  const dispatch = useDispatch<AppDispatch>()

  const [selectedAnswerOption, setSelectedAnswerOption] = useState<boolean | undefined>(
    selectedAnswer,
  )

  function handleAnswerSelect(value: boolean) {
    setSelectedAnswerOption(value)
    dispatch(saveAnswer({ id: selectedQuestion.id, answer: value }))
  }

  // Helper function to allow keyboard users to select option
  function handleOptionKeyDown(event: KeyboardEvent<HTMLSpanElement>, value: boolean) {
    // Standard behavior: Spacebar or Enter selects the item
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault() // Stops the page from scrolling on Spacebar
      handleAnswerSelect(value)
    }
  }

  return (
    <>
      <h3>
        Q{questionNumber + 1}. {selectedQuestion.question}
      </h3>
      <div className="input-wrapper">
        <label>Answer</label>
        <span
          className={`option${selectedAnswerOption === true ? " selected" : ""}`}
          onClick={() => handleAnswerSelect(true)}
          onKeyDown={e => handleOptionKeyDown(e, true)}
          tabIndex={0}
          aria-checked={selectedAnswerOption === true}
        >
          Yes
        </span>
        <span
          className={`option${selectedAnswerOption === false ? " selected" : ""}`}
          onClick={() => handleAnswerSelect(false)}
          onKeyDown={e => handleOptionKeyDown(e, true)}
          tabIndex={0}
          aria-checked={selectedAnswerOption === false}
        >
          No
        </span>
      </div>
    </>
  )
}
