import { useEffect, useRef, useState, type KeyboardEvent, type SubmitEvent } from "react"
import { useDispatch, useSelector } from "react-redux"

import QuestionFooter from "../QuestionAnswerFooter.tsx"
import QuestionInput from "./QuestionInput.tsx"
import { QuestionType, type DistributiveOmit, type MCQQuestion } from "../../types"
import {
  addQuestion,
  changeQuestionNumber,
  editQuestion,
  type AppDispatch,
  type AppState,
} from "../../store"

export default function McqQuestion() {
  const optionInputRef = useRef<HTMLInputElement>(null)
  const questionInputRef = useRef<HTMLInputElement>(null)
  const [options, setOptions] = useState<string[]>([])
  const [selectedAnswerOption, setSelectedAnswerOption] = useState<number | undefined>(undefined)
  const [errors, setErrors] = useState<{ question?: string; answer?: string; option?: string }>({})
  const [hasQuestionChanges, setHasQuestionChanges] = useState(false)

  const selectedQuestionNumber = useSelector((state: AppState) => state.view.globalQuestionNumber)
  const selectedQuestion = useSelector(
    (state: AppState) => state.questions[selectedQuestionNumber] as MCQQuestion,
  )
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (selectedQuestion && questionInputRef.current) {
      questionInputRef.current.value = selectedQuestion.question
      setSelectedAnswerOption(selectedQuestion.answer)
      setOptions(selectedQuestion.options)
    }
  }, [selectedQuestion])

  function handleAddOption() {
    const newOption = optionInputRef.current?.value.trim()

    if (!optionInputRef.current || !newOption) {
      setErrors(prevErrors => ({ ...prevErrors, option: "Option cannot be empty" }))
      return
    }

    if (options.length >= 8) {
      setErrors(prevErrors => ({ ...prevErrors, option: "Only a max of 8 options can be added" }))
      return
    }

    if (options.includes(newOption)) {
      setErrors(prevErrors => ({ ...prevErrors, option: "Option already exist" }))
      return
    }

    setHasQuestionChanges(true)
    setErrors(prevErrors => ({ ...prevErrors, option: undefined }))
    setOptions(prevOptions => [...prevOptions, newOption])
    optionInputRef.current.value = ""
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault()
      handleAddOption()
    }
  }

  function handleRemoveOption(idx: number) {
    setHasQuestionChanges(true)
    setOptions(prevOptions => prevOptions.filter((_, index) => index !== idx))
    if (idx === selectedAnswerOption) {
      setSelectedAnswerOption(undefined)
    }
  }

  function handleAnswerSelect(optionIdx: number) {
    setHasQuestionChanges(true)
    setSelectedAnswerOption(optionIdx)
    setErrors(prevErrors => ({ ...prevErrors, answer: undefined }))
  }

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()

    if (!questionInputRef.current) {
      return
    }

    const questionText = (questionInputRef.current?.value || "").trim()

    if (!questionText || typeof selectedAnswerOption !== "number" || options.length === 0) {
      setErrors(prevErrors => ({
        ...prevErrors,
        question: !questionText ? "Question cannot be empty" : undefined,
        answer:
          typeof selectedAnswerOption !== "number" && options.length > 0
            ? "Please choose an answer"
            : undefined,
        option: options.length === 0 ? "Please add an option first" : prevErrors.option,
      }))
      return
    }

    const question = {
      question: questionText,
      options,
      type: QuestionType.MCQ,
      answer: selectedAnswerOption,
    } as DistributiveOmit<MCQQuestion, "id">

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
        <label htmlFor="option">Create options</label>
        <input
          type="text"
          name="option"
          id="option"
          ref={optionInputRef}
          disabled={options.length >= 8}
          placeholder="Add valid options for your question"
          onKeyDown={handleKeyDown}
        />
        {errors.option && <span className="input-error">{errors.option}</span>}
        <button
          type="button"
          id="add-option"
          disabled={options.length >= 8}
          onClick={handleAddOption}
        >
          Add option {options.length + 1}
        </button>
      </div>

      <div className="input-wrapper">
        <ul className="options-list">
          {options.map((option, idx) => (
            <li key={option}>
              <span
                className={`option${selectedAnswerOption === idx ? " selected" : ""}`}
                onClick={() => handleAnswerSelect(idx)}
              >
                {option}
              </span>
              <button type="button" className="error" onClick={() => handleRemoveOption(idx)}>
                X
              </button>
            </li>
          ))}
          {errors.answer && <span className="input-error">{errors.answer}</span>}
        </ul>
      </div>

      <QuestionFooter hasChanges={hasQuestionChanges} />
    </form>
  )
}
