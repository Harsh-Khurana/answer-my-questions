import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { saveAnswer, type AppDispatch, type AppState } from "../../store"
import type { SubjectiveQuestion } from "../../types"

export default function SubjectiveAnswer() {
  const questionNumber = useSelector((state: AppState) => state.view.globalQuestionNumber)
  const selectedQuestion = useSelector(
    (state: AppState) => state.questions[questionNumber],
  ) as SubjectiveQuestion
  const selectedAnswer = useSelector((state: AppState) => state.answers?.[selectedQuestion.id]) as
    | string
    | undefined
  const dispatch = useDispatch<AppDispatch>()

  const answerInputRef = useRef<HTMLTextAreaElement>(null)
  const timeoutId = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    if (answerInputRef.current && selectedAnswer) {
      answerInputRef.current.value = selectedAnswer
    }
  }, [selectedAnswer])

  function handleAnswerSelect() {
    if (timeoutId.current) {
      clearTimeout(timeoutId?.current)
    }
    if (answerInputRef.current) {
      const answer = answerInputRef.current.value
      timeoutId.current = setTimeout(() => {
        dispatch(saveAnswer({ id: selectedQuestion.id, answer }))
      }, 1000)
    }
  }

  return (
    <>
      <h3>
        Q{questionNumber + 1}. {selectedQuestion.question}
      </h3>
      <textarea
        name="answer"
        id="answer"
        ref={answerInputRef}
        placeholder="Fill in your answer"
        rows={10}
        onChange={handleAnswerSelect}
      />
    </>
  )
}
