import { useEffect, useRef, useState, type KeyboardEvent, type SubmitEvent } from "react"
import { useDispatch, useSelector } from "react-redux"

import QuestionInput from "./QuestionInput"
import QuestionFooter from "../QuestionAnswerFooter"
import { QuestionType, type DistributiveOmit, type BooleanQuestion } from "../../constants/types"
import {
  addQuestion,
  changeQuestionNumber,
  editQuestion,
  selectCurrentQuestion,
  selectGlobalQuestionNumber,
  type AppDispatch,
} from "../../store"

export default function BooleanQuestion() {
  const selectedQuestionNumber = useSelector(selectGlobalQuestionNumber)
  const selectedQuestion = useSelector(selectCurrentQuestion) as BooleanQuestion
  const dispatch = useDispatch<AppDispatch>()

  const questionInputRef = useRef<HTMLInputElement>(null)
  const [selectedAnswerOption, setSelectedAnswerOption] = useState<boolean | undefined>(undefined)
  const [errors, setErrors] = useState<{ question?: string; answer?: string }>({})
  const [hasQuestionChanges, setHasQuestionChanges] = useState(
    selectedQuestion?.answer === undefined,
  )

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
          onKeyDown={e => handleOptionKeyDown(e, false)}
          tabIndex={0}
          aria-checked={selectedAnswerOption === false}
        >
          No
        </span>
        {errors.answer && <span className="input-error">{errors.answer}</span>}
      </div>
      <QuestionFooter hasChanges={hasQuestionChanges} />
    </form>
  )
}
