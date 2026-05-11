import { useEffect, useRef, useState, type SubmitEvent } from "react"
import { useDispatch, useSelector } from "react-redux"

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
} from "../../store"

export default function SubjectiveQuestion() {
  const selectedQuestionNumber = useSelector(selectGlobalQuestionNumber)
  const selectedQuestion = useSelector(selectCurrentQuestion) as SubjectiveQuestion

  const questionInputRef = useRef<HTMLInputElement>(null)
  const answerInputRef = useRef<HTMLTextAreaElement>(null)
  const [errors, setErrors] = useState<{ question?: string; answer?: string }>({})
  const [hasQuestionChanges, setHasQuestionChanges] = useState(
    selectedQuestion?.answer === undefined,
  )

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (
      selectedQuestion &&
      selectedQuestion.answer &&
      questionInputRef.current &&
      answerInputRef.current
    ) {
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
        <label htmlFor="input-answer">Answer</label>
        <textarea
          name="input-answer"
          id="input-answer"
          ref={answerInputRef}
          placeholder="Fill in your answer"
          rows={10}
          onChange={() => setHasQuestionChanges(true)}
        />
        {errors.answer && <span className="input-error">{errors.answer}</span>}
      </div>
      <QuestionFooter hasChanges={hasQuestionChanges} />
    </form>
  )
}
