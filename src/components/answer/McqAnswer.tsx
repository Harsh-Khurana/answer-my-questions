import { useState } from "react"
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
            >
              {option}
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}
