import { useEffect, useRef, useState, type SubmitEvent } from "react"
import { useDispatch, useSelector } from "react-redux"

import QuestionInput from "./QuestionInput"
import QuestionFooter from "./QuestionFooter"
import { QuestionType, type DistributiveOmit, type SubjectiveQuestion } from "../types"
import { addQuestion } from "../store/questionsSlice"
import type { AppDispatch, AppState } from "../store"
import { changeQuestionNumber } from "../store/viewSlice"

export default function SubjectiveQuestion() {
  const questionInputRef = useRef<HTMLInputElement>(null)
  const answerInputRef = useRef<HTMLTextAreaElement>(null)
  const [errors, setErrors] = useState<{ question?: string; answer?: string }>({})
  const [hasQuestionChanges, setHasQuestionChanges] = useState(false)

  const selectedQuestionNumber = useSelector((state: AppState) => state.view.globalQuestionNumber)
  const selectedQuestion = useSelector(
    (state: AppState) => state.questions[selectedQuestionNumber] as SubjectiveQuestion,
  )
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (selectedQuestion && questionInputRef.current && answerInputRef.current) {
      answerInputRef.current.value = selectedQuestion.answer
      questionInputRef.current.value = selectedQuestion.question
    }
  }, [selectedQuestion])

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()

    if (!questionInputRef.current || !answerInputRef.current) {
      return
    }

    const questionText = (questionInputRef.current?.value || "").trim()
    const answerText = (answerInputRef.current?.value || "").trim()

    if (!questionText || !answerText) {
      setErrors(prevErrors => ({
        ...prevErrors,
        question: !questionText ? "Question cannot be empty" : undefined,
        answer: !answerText ? "Answer cannot be empty" : undefined,
      }))
      return
    }

    const question = {
      question: questionText,
      type: QuestionType.Subjective,
      answer: answerText,
    } as DistributiveOmit<SubjectiveQuestion, "id">

    setErrors({})
    dispatch(addQuestion(question))
    dispatch(changeQuestionNumber(selectedQuestionNumber + 1))
  }

  return (
    <form onSubmit={handleSubmit}>
      <QuestionInput
        ref={questionInputRef}
        error={errors.question}
        onChange={() => setHasQuestionChanges(true)}
      />
      <div className="input-wrapper">
        <label htmlFor="answer">Answer</label>
        <textarea
          name="answer"
          id="answer"
          ref={answerInputRef}
          placeholder="Fill in your answer"
          rows={10}
          onChange={() => setHasQuestionChanges(true)}
        />
        {errors.answer && <span className="input-error">{errors.answer}</span>}
      </div>
      <QuestionFooter hasQuestionChanges={hasQuestionChanges} />
    </form>
  )
}
