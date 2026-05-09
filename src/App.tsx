import { useDispatch, useSelector } from "react-redux"

import "./App.css"
import { Home, Questionnaire, QuestionsReview, AnswerSheet, Results } from "./pages"
import { PageType } from "./types"
import {
  initialiseAnswers,
  changePage,
  changeQuestionNumber,
  type AppDispatch,
  selectCurrentPage,
  selectQuestions,
} from "./store"

function App() {
  const currentPage = useSelector(selectCurrentPage)
  const allQuestions = useSelector(selectQuestions)
  const dispatch = useDispatch<AppDispatch>()

  function handleQuestionsSubmit() {
    dispatch(changeQuestionNumber(0))
    dispatch(initialiseAnswers(allQuestions.map(q => q.id)))
    dispatch(changePage(PageType.AnswerSheet))
  }

  return (
    <>
      {currentPage === PageType.Home && (
        <Home onSubmit={() => dispatch(changePage(PageType.Questionnaire))} />
      )}
      {currentPage === PageType.Questionnaire && (
        <Questionnaire onSubmit={() => dispatch(changePage(PageType.QuestionsReview))} />
      )}
      {currentPage === PageType.QuestionsReview && (
        <QuestionsReview onSubmit={handleQuestionsSubmit} />
      )}
      {currentPage === PageType.AnswerSheet && (
        <AnswerSheet onSubmit={() => dispatch(changePage(PageType.Result))} />
      )}
      {currentPage === PageType.Result && <Results />}
    </>
  )
}

export default App
