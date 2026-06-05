import { useState, type ChangeEvent, type KeyboardEvent, type SubmitEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAnimate } from "motion/react"

import QuestionInput from "./QuestionInput"
import QuestionFooter from "../QuestionAnswerFooter"
import { QuestionType, type DistributiveOmit, type BooleanQuestion } from "../../constants/types"
import {
  addQuestion,
  changeQuestionNumber,
  editQuestion,
  selectCurrentQuestion,
  selectGlobalQuestionNumber,
  selectIsAnsweringMandatory,
  type AppDispatch,
} from "../../store"

export default function BooleanQuestion() {
  const selectedQuestionNumber = useSelector(selectGlobalQuestionNumber)
  const selectedQuestion = useSelector(selectCurrentQuestion) as BooleanQuestion
  const isAnsweringMandatory = useSelector(selectIsAnsweringMandatory)
  const dispatch = useDispatch<AppDispatch>()

  const [questionValue, setQuestionValue] = useState(
    selectedQuestion ? selectedQuestion.question : "",
  )
  const [selectedAnswerOption, setSelectedAnswerOption] = useState<boolean | undefined>(
    selectedQuestion ? selectedQuestion.answer : undefined,
  )
  const [errors, setErrors] = useState<{ question?: string; answer?: string }>({})
  const [hasQuestionChanges, setHasQuestionChanges] = useState(
    selectedQuestion?.answer === undefined,
  )

  const [scope, animate] = useAnimate()

  function handleQuestionChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const newQuestionValue = e.target.value
    setErrors(prevErrors => ({
      ...prevErrors,
      question: !newQuestionValue.trim().length ? "Question cannot be empty" : undefined,
    }))
    setQuestionValue(newQuestionValue)
    setHasQuestionChanges(true)
  }

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

    const questionText = questionValue.trim()
    const hasAnswerError = isAnsweringMandatory && typeof selectedAnswerOption !== "boolean"

    if (!questionText || hasAnswerError) {
      setErrors(prevErrors => ({
        ...prevErrors,
        question: !questionText ? "Question cannot be empty" : undefined,
        answer: hasAnswerError ? "Choose any one option" : undefined,
      }))

      if (!questionText) {
        animate("#question-input", { x: [10, -10, 10, -10, 0] }, { duration: 0.5 })
      }
      if (hasAnswerError) {
        animate(".input-wrapper > span", { x: [10, -10, 10, -10, 0] }, { duration: 0.5 })
      }

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
    <form className="question-form" onSubmit={handleSubmit} ref={scope}>
      <QuestionInput
        error={errors.question}
        value={questionValue}
        onChange={handleQuestionChange}
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
