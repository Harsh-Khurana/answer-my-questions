import { useState } from "react"
import { useSelector } from "react-redux"

import { Alert, BackBtn } from "../ui"
import { McqQuestion, SubjectiveQuestion, BooleanQuestion } from "../components"
import { QuestionType } from "../constants/types"
import {
  selectCurrentQuestion,
  selectGlobalQuestionCategory,
  selectGlobalQuestionNumber,
  selectGlobalQuestionType,
  selectTotalAnsweredQuestions,
  selectTotalQuestions,
} from "../store"

type QuestionnaireProps = {
  onSubmit: () => void
}

export default function Questionnaire({ onSubmit }: QuestionnaireProps) {
  const globalQuestionType = useSelector(selectGlobalQuestionType)
  const selectedQuestionNumber = useSelector(selectGlobalQuestionNumber)
  const selectedQuestion = useSelector(selectCurrentQuestion)
  const totalAnsweredQuestions = useSelector(selectTotalAnsweredQuestions)
  const totalQuestions = useSelector(selectTotalQuestions)
  const selectedQuestionCategory = useSelector(selectGlobalQuestionCategory)

  const [chosenQuestionType, setChosenQuestionType] = useState<QuestionType>(
    globalQuestionType === "Mix" ? QuestionType.MCQ : globalQuestionType,
  )
  const [prevQuestionNum, setPrevQuestionNum] = useState(selectedQuestionNumber)
  const [showMissingQAAlert, setShowMissingQAAlert] = useState(false)

  function handleReviewAndSubmit() {
    if (totalAnsweredQuestions === 0 || totalAnsweredQuestions < totalQuestions) {
      setShowMissingQAAlert(true)
    } else {
      onSubmit()
    }
  }

  // Hiding the alert when user saves a question and moves to next one
  if (selectedQuestionNumber !== prevQuestionNum) {
    setPrevQuestionNum(selectedQuestionNumber)
    setShowMissingQAAlert(false)
  }

  const questionType = selectedQuestion?.type ?? chosenQuestionType

  return (
    <>
      <header>
        <BackBtn />
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
      {selectedQuestionCategory && totalAnsweredQuestions === totalQuestions && (
        <Alert type="success">
          Great! You have answered all the questions. Now either you can submit these questions or
          can add more questions yourself.
        </Alert>
      )}
      {showMissingQAAlert && (
        <Alert type="danger">
          Cannot submit,{" "}
          {totalAnsweredQuestions === 0 &&
            totalQuestions === 0 &&
            "No questions & answers were saved."}
          {totalAnsweredQuestions < totalQuestions && "Some questions are unanswered."}
        </Alert>
      )}
      <main className="flex" key={selectedQuestionNumber}>
        {questionType === QuestionType.MCQ && <McqQuestion />}
        {questionType === QuestionType.Subjective && <SubjectiveQuestion />}
        {questionType === QuestionType.Boolean && <BooleanQuestion />}
      </main>
    </>
  )
}
