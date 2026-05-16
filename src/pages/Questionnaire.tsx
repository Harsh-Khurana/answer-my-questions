import { useState } from "react"
import { useSelector } from "react-redux"

import { Alert, BackBtn } from "../ui"
import { McqQuestion, SubjectiveQuestion, BooleanQuestion } from "../components"
import { QuestionType } from "../constants/types"
import {
  selectCurrentQuestion,
  selectGlobalQuestionNumber,
  selectGlobalQuestionType,
  selectTotalAnsweredQuestions,
} from "../store"

type QuestionnaireProps = {
  onSubmit: () => void
}

export default function Questionnaire({ onSubmit }: QuestionnaireProps) {
  const globalQuestionType = useSelector(selectGlobalQuestionType)
  const selectedQuestionNumber = useSelector(selectGlobalQuestionNumber)
  const selectedQuestion = useSelector(selectCurrentQuestion)
  // @todo allow first user to also not answer questions if they have selecte a category instead of creating their own questions
  // @todo and maybe we add a check in create your own questions review page that whether the user wants to allow
  // questions to be answered always or it's fine leaving empty?
  const totalAnsweredQuestions = useSelector(selectTotalAnsweredQuestions)

  const [chosenQuestionType, setChosenQuestionType] = useState<QuestionType>(
    globalQuestionType === "Mix" ? QuestionType.MCQ : globalQuestionType,
  )
  const [prevQuestionNum, setPrevQuestionNum] = useState(selectedQuestionNumber)
  const [showMissingQuestionsAlert, setShowMissingQuestionsAlert] = useState(false)

  function handleReviewAndSubmit() {
    if (totalAnsweredQuestions === 0) {
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
