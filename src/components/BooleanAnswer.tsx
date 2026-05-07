import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import type { AppDispatch, AppState } from "../store"
import type { BooleanQuestion } from "../types"
import { saveAnswer } from "../store/answersSlice"

export default function BooleanAnswer() {
  const questionNumber = useSelector((state: AppState) => state.view.globalQuestionNumber)
  const selectedQuestion = useSelector(
    (state: AppState) => state.questions[questionNumber],
  ) as BooleanQuestion
  const selectedAnswer = useSelector((state: AppState) => state.answers?.[selectedQuestion.id]) as
    | boolean
    | undefined
  const dispatch = useDispatch<AppDispatch>()

  const [selectedAnswerOption, setSelectedAnswerOption] = useState<boolean | undefined>(
    selectedAnswer,
  )

  function handleAnswerSelect(value: boolean) {
    setSelectedAnswerOption(value)
    dispatch(saveAnswer({ id: selectedQuestion.id, answer: value }))
  }

  return (
    <>
      <h3>
        Q{questionNumber + 1}. {selectedQuestion.question}
      </h3>
      <div className="input-wrapper">
        <label htmlFor="answer">Answer</label>
        <span
          className={`option${selectedAnswerOption === true ? " selected" : ""}`}
          onClick={() => handleAnswerSelect(true)}
        >
          Yes
        </span>
        <span
          className={`option${selectedAnswerOption === false ? " selected" : ""}`}
          onClick={() => handleAnswerSelect(false)}
        >
          No
        </span>
      </div>
    </>
  )
}
