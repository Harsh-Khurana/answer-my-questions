import { useState, type ChangeEvent, type SubmitEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAnimate } from "motion/react"

import QuestionInput from "./QuestionInput"
import QuestionFooter from "../QuestionAnswerFooter"
import { QuestionType, type DistributiveOmit, type SubjectiveQuestion } from "../../constants/types"
import {
  changeQuestionNumber,
  addQuestion,
  editQuestion,
  type AppDispatch,
  selectGlobalQuestionNumber,
  selectCurrentQuestion,
  selectIsAnsweringMandatory,
} from "../../store"

export default function SubjectiveQuestion() {
  const selectedQuestionNumber = useSelector(selectGlobalQuestionNumber)
  const selectedQuestion = useSelector(selectCurrentQuestion) as SubjectiveQuestion
  const isAnsweringMandatory = useSelector(selectIsAnsweringMandatory)

  const [questionValue, setQuestionValue] = useState(
    selectedQuestion ? selectedQuestion.question : "",
  )
  const [answerValue, setAnswerValue] = useState(selectedQuestion ? selectedQuestion.answer : "")
  const [errors, setErrors] = useState<{ question?: string; answer?: string }>({})
  const [hasQuestionChanges, setHasQuestionChanges] = useState(
    selectedQuestion?.answer === undefined,
  )

  const dispatch = useDispatch<AppDispatch>()

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

  function handleAnswerChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const newAnswerValue = e.target.value
    setErrors(prevErrors => ({
      ...prevErrors,
      answer:
        isAnsweringMandatory && !newAnswerValue.trim().length
          ? "Answer cannot be empty"
          : undefined,
    }))
    setAnswerValue(newAnswerValue)
    setHasQuestionChanges(true)
  }

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()

    const questionText = questionValue.trim()
    const answerText = (answerValue || "").trim()

    const hasAnswerError = isAnsweringMandatory && !answerText

    if (!questionText || hasAnswerError) {
      setErrors(prevErrors => ({
        ...prevErrors,
        question: !questionText ? "Question cannot be empty" : undefined,
        answer: hasAnswerError ? "Answer cannot be empty" : undefined,
      }))

      if (!questionText) {
        animate("#question-input", { x: [10, -10, 10, -10, 0] }, { duration: 0.5 })
      }
      if (hasAnswerError) {
        animate("#input-answer", { x: [10, -10, 10, -10, 0] }, { duration: 0.5 })
      }

      return
    }

    const question = {
      question: questionText,
      type: QuestionType.Subjective,
      answer: answerText ? answerText : undefined,
    } as DistributiveOmit<SubjectiveQuestion, "id">

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
        <label htmlFor="input-answer">Answer</label>
        <textarea
          name="input-answer"
          id="input-answer"
          placeholder="Fill in your answer"
          rows={10}
          value={answerValue}
          onChange={handleAnswerChange}
        />
        {errors.answer && <span className="input-error">{errors.answer}</span>}
      </div>
      <QuestionFooter hasChanges={hasQuestionChanges} />
    </form>
  )
}
