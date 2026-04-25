import { useState } from "react"
import { useSelector } from "react-redux"

import McqQuestion from "../components/McqQuesion"
import SubjectiveQuestion from "../components/SubjectiveQuestion"
import BooleanQuestion from "../components/BooleanQuestion"
import { QuestionType } from "../types"
import type { AppState } from "../store"

export default function Questionnaire() {
  const globalQuestionType = useSelector((state: AppState) => state.view.globalQuestionType)
  const selectedQuestionNumber = useSelector((state: AppState) => state.view.globalQuestionNumber)
  const selectedQuestion = useSelector((state: AppState) => state.questions[selectedQuestionNumber])

  const [chosenQuestionType, setChosenQuestionType] = useState<QuestionType>(
    globalQuestionType === "Mix" ? QuestionType.MCQ : globalQuestionType,
  )

  const questionType = selectedQuestion?.type ?? chosenQuestionType

  return (
    <>
      <header>
        <span>
          Question type:{" "}
          <select
            name="question-type"
            id="question-type"
            onChange={e => setChosenQuestionType(+e.target.value as unknown as QuestionType)}
            value={questionType}
            disabled={!!selectedQuestion || globalQuestionType !== "Mix"}
          >
            <option value={QuestionType.MCQ}>Multiple choice question</option>
            <option value={QuestionType.Subjective}>Subjective</option>
            <option value={QuestionType.Boolean}>Yes or No</option>
          </select>
        </span>
        <button>Submit questions</button>
      </header>
      <main className="flex" key={selectedQuestionNumber}>
        {questionType === QuestionType.MCQ && <McqQuestion />}
        {questionType === QuestionType.Subjective && <SubjectiveQuestion />}
        {questionType === QuestionType.Boolean && <BooleanQuestion />}
      </main>
    </>
  )
}
