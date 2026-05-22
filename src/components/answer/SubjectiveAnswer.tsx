import { useState, type ChangeEvent, type SubmitEvent } from "react"
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
import type { SubjectiveQuestion } from "../../constants/types"
import { default as AnswerFooter } from "../QuestionAnswerFooter"

export default function SubjectiveAnswer() {
  const selectedQuestionNumber = useSelector(selectGlobalQuestionNumber)
  const selectedQuestion = useSelector(selectCurrentQuestion) as SubjectiveQuestion
  const selectedAnswer = useSelector(selectCurrentAnswer) as string | undefined
  const dispatch = useDispatch<AppDispatch>()

  const [answerValue, setAnswerValue] = useState(selectedAnswer || "")
  const [answerError, setAnswerError] = useState("")
  const [hasAnswerChanges, setHasAnswerChanges] = useState(selectedAnswer === undefined)

  const [scope, animate] = useAnimate()

  function handleAnswerChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const newAnswerValue = e.target.value

    setAnswerError(!newAnswerValue.trim().length ? "Answer cannot be empty" : "")
    setAnswerValue(newAnswerValue)
    setHasAnswerChanges(true)
  }

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()

    const hasAnswerError = !answerValue.trim().length

    if (hasAnswerError) {
      setAnswerError("Answer cannot be empty")
      animate("#input-answer", { x: [10, -10, 10, -10, 0] }, { duration: 0.5 })

      return
    }

    dispatch(saveAnswer({ id: selectedQuestion.id, answer: answerValue }))
    dispatch(changeQuestionNumber(selectedQuestionNumber + 1))
  }

  return (
    <>
      <h3>
        Q{selectedQuestionNumber + 1}. {selectedQuestion.question}
      </h3>
      <form onSubmit={handleSubmit} ref={scope}>
        <div className="input-wrapper">
          <label htmlFor="input-answer">Answer</label>
          <textarea
            name="input-answer"
            id="input-answer"
            placeholder="Fill in your answer"
            rows={10}
            value={answerValue}
            onChange={handleAnswerChange}
          />
          {answerError && <span className="input-error">{answerError}</span>}
        </div>
        <AnswerFooter hasChanges={hasAnswerChanges} />
      </form>
    </>
  )
}
