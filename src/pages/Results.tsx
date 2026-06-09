import { useDispatch, useSelector } from "react-redux"
import { motion } from "motion/react"
import { useNavigate } from "react-router"

import {
  type AppDispatch,
  changeQuestionNumber,
  changeQuestionType,
  clearCategory,
  replaceQuestions,
  initialiseAnswers,
  selectQuestions,
  selectAnswers,
} from "../store"
import ResultItem from "../components/ResultItem"
import { ROUTES } from "../constants/routes"

export default function Results() {
  const questions = useSelector(selectQuestions)
  const answers = useSelector(selectAnswers)
  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate()

  function handleStartNew() {
    dispatch(changeQuestionNumber(0))
    dispatch(replaceQuestions([]))
    dispatch(initialiseAnswers([]))
    dispatch(clearCategory())
    dispatch(changeQuestionType("Mix"))
    navigate(ROUTES.home)
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
        <motion.button
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1, type: "tween" }}
          onClick={handleStartNew}
          className="big"
        >
          Start a new game
        </motion.button>
      </main>
    </>
  )
}
