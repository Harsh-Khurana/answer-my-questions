import { useState, type KeyboardEvent, type SubmitEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAnimate } from "motion/react"

import {
  changeQuestionNumber,
  saveAnswer,
  selectCurrentAnswer,
  selectCurrentQuestion,
  selectGlobalQuestionNumber,
  type AppDispatch,
} from "../../store"
import type { BooleanQuestion } from "../../constants/types"
import { default as AnswerFooter } from "../QuestionAnswerFooter"

export default function BooleanAnswer() {
  const selectedQuestionNumber = useSelector(selectGlobalQuestionNumber)
  const selectedQuestion = useSelector(selectCurrentQuestion) as BooleanQuestion
  const selectedAnswer = useSelector(selectCurrentAnswer) as boolean | undefined
  const dispatch = useDispatch<AppDispatch>()

  const [selectedAnswerOption, setSelectedAnswerOption] = useState<boolean | undefined>(
    selectedAnswer,
  )
  const [answerError, setAnswerError] = useState("")
  const [hasAnswerChanges, setHasAnswerChanges] = useState(selectedAnswer === undefined)

  const [scope, animate] = useAnimate()

  function handleAnswerSelect(value: boolean) {
    setSelectedAnswerOption(value)
    setHasAnswerChanges(true)
    setAnswerError("")
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

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()

    const hasAnswerError = typeof selectedAnswerOption !== "boolean"

    if (hasAnswerError) {
      setAnswerError("Please choose an answer")
      animate(".input-wrapper > span", { x: [10, -10, 10, -10, 0] }, { duration: 0.5 })

      return
    }

    dispatch(changeQuestionNumber(selectedQuestionNumber + 1))
  }

  return (
    <>
      <h3>
        Q{selectedQuestionNumber + 1}. {selectedQuestion.question}
      </h3>
      <form onSubmit={handleSubmit} ref={scope}>
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
          {answerError && <span className="input-error">{answerError}</span>}
        </div>
        <AnswerFooter hasChanges={hasAnswerChanges} />
      </form>
    </>
  )
}
