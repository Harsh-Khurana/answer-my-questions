import { useEffect, useRef, useState, type SubmitEvent } from "react"
import { useDispatch, useSelector } from "react-redux"

import QuestionInput from "./QuestionInput"
import QuestionFooter from "./QuestionAnswerFooter"
import { QuestionType, type DistributiveOmit, type BooleanQuestion } from "../types"
import { addQuestion, editQuestion } from "../store/questionsSlice"
import type { AppDispatch, AppState } from "../store"
import { changeQuestionNumber } from "../store/viewSlice"

export default function BooleanQuestion() {
  const questionInputRef = useRef<HTMLInputElement>(null)
  const [selectedAnswerOption, setSelectedAnswerOption] = useState<boolean | undefined>(undefined)
  const [errors, setErrors] = useState<{ question?: string; answer?: string }>({})
  const [hasQuestionChanges, setHasQuestionChanges] = useState(false)

  const selectedQuestionNumber = useSelector((state: AppState) => state.view.globalQuestionNumber)
  const selectedQuestion = useSelector(
    (state: AppState) => state.questions[selectedQuestionNumber] as BooleanQuestion,
  )
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (selectedQuestion && questionInputRef.current) {
      setSelectedAnswerOption(selectedQuestion.answer)
      questionInputRef.current.value = selectedQuestion.question
    }
  }, [selectedQuestion])

  function handleAnswerSelect(value: boolean) {
    setHasQuestionChanges(true)
    setSelectedAnswerOption(value)
    setErrors(prevErrors => ({ ...prevErrors, answer: undefined }))
  }

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()

    if (!questionInputRef.current) {
      return
    }

    const questionText = (questionInputRef.current?.value || "").trim()

    if (!questionText || typeof selectedAnswerOption !== "boolean") {
      setErrors(prevErrors => ({
        ...prevErrors,
        question: !questionText ? "Question cannot be empty" : undefined,
        answer: typeof selectedAnswerOption !== "boolean" ? "Choose any one option" : undefined,
      }))
      return
    }

    const question = {
      question: questionText,
      type: QuestionType.Boolean,
      answer: selectedAnswerOption,
    } as DistributiveOmit<BooleanQuestion, "id">

    setErrors({})
    if (selectedQuestion) {
      dispatch(editQuestion({ ...question, id: selectedQuestion.id }))
    } else {
      dispatch(addQuestion(question))
    }
    dispatch(changeQuestionNumber(selectedQuestionNumber + 1))
  }

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      <QuestionInput
        ref={questionInputRef}
        error={errors.question}
        onChange={() => setHasQuestionChanges(true)}
      />
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
        {errors.answer && <span className="input-error">{errors.answer}</span>}
      </div>
      <QuestionFooter hasChanges={hasQuestionChanges} />
    </form>
  )
}
