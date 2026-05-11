import { useDispatch, useSelector } from "react-redux"
import {
  type AppDispatch,
  changePage,
  changeQuestionNumber,
  changeQuestionType,
  clearCategory,
  replaceQuestions,
  initialiseAnswers,
  selectQuestions,
  selectAnswers,
} from "../store"
import { PageType } from "../constants/types"
import ResultItem from "../components/ResultItem"

export default function Results() {
  const questions = useSelector(selectQuestions)
  const answers = useSelector(selectAnswers)

  const dispatch = useDispatch<AppDispatch>()

  function handleStartNew() {
    dispatch(changeQuestionNumber(0))
    dispatch(replaceQuestions([]))
    dispatch(initialiseAnswers([]))
    dispatch(clearCategory())
    dispatch(changeQuestionType("Mix"))
    dispatch(changePage(PageType.Home))
  }

  return (
    <>
      <header>
        <span>
          Questions: <strong>{questions.length}</strong>, Answered:{" "}
          <strong>
            {Object.values(answers).filter(answer => typeof answer !== "undefined").length}
          </strong>
        </span>
      </header>
      <main className="main-results">
        <h2>Here are your results</h2>
        {questions.map((question, idx) => (
          <ResultItem
            key={question.id}
            question={question}
            answer={answers[question.id]}
            index={idx}
          />
        ))}
        <button onClick={handleStartNew} className="big">
          Start a new game
        </button>
      </main>
    </>
  )
}
