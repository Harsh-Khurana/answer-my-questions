import { useState } from "react"
import { useSelector } from "react-redux"

import { Alert } from "../ui"
import { McqQuestion, SubjectiveQuestion, BooleanQuestion } from "../components"
import { QuestionType } from "../types"
import { type AppState } from "../store"
import { DropdownArrowIcon } from "../assets"

type QuestionnaireProps = {
  onSubmit: () => void
  onBack: () => void
}

export default function Questionnaire({ onSubmit, onBack }: QuestionnaireProps) {
  const globalQuestionType = useSelector((state: AppState) => state.view.globalQuestionType)
  const selectedQuestionNumber = useSelector((state: AppState) => state.view.globalQuestionNumber)
  const selectedQuestion = useSelector((state: AppState) => state.questions[selectedQuestionNumber])
  const totalQuestions = useSelector((state: AppState) => state.questions.length)

  const [chosenQuestionType, setChosenQuestionType] = useState<QuestionType>(
    globalQuestionType === "Mix" ? QuestionType.MCQ : globalQuestionType,
  )
  const [prevQuestionNum, setPrevQuestionNum] = useState(selectedQuestionNumber)
  const [showMissingQuestionsAlert, setShowMissingQuestionsAlert] = useState(false)

  function handleReviewAndSubmit() {
    if (totalQuestions === 0) {
      setShowMissingQuestionsAlert(true)
    } else {
      onSubmit()
    }
  }

  // Hiding the alert when user saves a question and moves to next one
  if (selectedQuestionNumber !== prevQuestionNum) {
    setPrevQuestionNum(selectedQuestionNumber)
    setShowMissingQuestionsAlert(false)
  }

  const questionType = selectedQuestion?.type ?? chosenQuestionType

  return (
    <>
      <header>
        <button className="back" onClick={onBack}>
          <DropdownArrowIcon height={14} width={14} /> Back
        </button>
        <span className="flex">
          Question type:{" "}
          <select
            name="question-type"
            id="question-type"
            onChange={e => setChosenQuestionType(e.target.value as QuestionType)}
            value={questionType}
            disabled={!!selectedQuestion || globalQuestionType !== "Mix"}
          >
            <option value={QuestionType.MCQ}>Multiple choice question</option>
            <option value={QuestionType.Subjective}>Subjective</option>
            <option value={QuestionType.Boolean}>Yes or No</option>
          </select>
        </span>
        <button onClick={handleReviewAndSubmit}>Review & Submit questions</button>
      </header>
      {showMissingQuestionsAlert && (
        <Alert type="danger">Cannot submit, No questions were saved.</Alert>
      )}
      <main className="flex" key={selectedQuestionNumber}>
        {questionType === QuestionType.MCQ && <McqQuestion />}
        {questionType === QuestionType.Subjective && <SubjectiveQuestion />}
        {questionType === QuestionType.Boolean && <BooleanQuestion />}
      </main>
    </>
  )
}
