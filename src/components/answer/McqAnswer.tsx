import { useState, type KeyboardEvent, type SubmitEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAnimate } from "motion/react"

import {
  changeQuestionNumber,
  saveAnswer,
  selectCurrentAnswer,
  selectCurrentQuestion,
  selectGlobalQuestionNumber,
  selectIsAnsweringMandatory,
  type AppDispatch,
} from "../../store"
import type { MCQQuestion } from "../../constants/types"
import { default as AnswerFooter } from "../QuestionAnswerFooter"

export default function McqAnswer() {
  const selectedQuestionNumber = useSelector(selectGlobalQuestionNumber)
  const selectedQuestion = useSelector(selectCurrentQuestion) as MCQQuestion
  const selectedAnswer = useSelector(selectCurrentAnswer) as number | undefined
  const isAnsweringMandatory = useSelector(selectIsAnsweringMandatory)
  const dispatch = useDispatch<AppDispatch>()

  const [selectedAnswerOption, setSelectedAnswerOption] = useState<number | undefined>(
    selectedAnswer,
  )
  const [answerError, setAnswerError] = useState("")
  const [hasAnswerChanges, setHasAnswerChanges] = useState(selectedAnswer === undefined)

  const [scope, animate] = useAnimate()

  function handleAnswerSelect(idx: number) {
    setSelectedAnswerOption(idx)
    setHasAnswerChanges(true)
    setAnswerError("")
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

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()

    const hasAnswerError = isAnsweringMandatory && typeof selectedAnswerOption !== "number"

    if (hasAnswerError) {
      setAnswerError("Please choose an answer")
      animate(".options-list > li", { x: [10, -10, 10, -10, 0] }, { duration: 0.5 })

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
          <ul className="options-list">
            {selectedQuestion.options.map((option, idx) => (
              <li key={option}>
                <span
                  className={`option${selectedAnswerOption === idx ? " selected" : ""}`}
                  onClick={() => handleAnswerSelect(idx)}
                  onKeyDown={e => handleOptionKeyDown(e, idx)}
                  tabIndex={0}
                  aria-checked={selectedAnswerOption === idx}
                >
                  {option}
                </span>
              </li>
            ))}
            {answerError && <span className="input-error">{answerError}</span>}
          </ul>
        </div>
        <AnswerFooter hasChanges={hasAnswerChanges} />
      </form>
    </>
  )
}
