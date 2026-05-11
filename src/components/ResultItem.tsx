import { useState } from "react"
import { DropdownArrowIcon } from "../assets/icons"
import type { AnswerType, Question } from "../constants/types"

type ResultItemProps = {
  question: Question
  answer?: AnswerType
  index: number
}

export default function ResultItem({ question, answer, index }: ResultItemProps) {
  const [showAnswer, setShowAnswer] = useState(true)

  let answer1 = question.answer
  let answer2 = answer ?? "-"

  if (question.type === "MCQ") {
    answer1 = question.options[question.answer!]
    answer2 = typeof answer === "number" ? question.options[answer] : answer2
  }
  if (question.type === "Boolean") {
    answer1 = question.answer ? "Yes" : "No"
    answer2 = typeof answer === "boolean" ? (answer ? "Yes" : "No") : answer2
  }

  return (
    <div key={question.id} className="result-item">
      <div className="question-wrapper">
        <span>Q{index + 1}.</span>
        <span className="question-card">
          <h3>{question.question}</h3>
          <button className="success" onClick={() => setShowAnswer(prevShow => !prevShow)}>
            <DropdownArrowIcon className={showAnswer ? "rotate180" : ""} height={16} width={16} />
          </button>
        </span>
      </div>
      {showAnswer && (
        <div className="answers-wrapper">
          <span>Q{index + 1}.</span>
          <div className="answers">
            <div>{answer1}</div>
            <div className={answer2 === "-" ? "danger" : ""}>{answer2}</div>
          </div>
        </div>
      )}
    </div>
  )
}
