import "./App.css"
import Home from "./pages/Home"
import Questionnaire from "./pages/Questionnaire"
import { PageType } from "./types"
import QuestionsReview from "./pages/QuestionsReview"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, AppState } from "./store"
import { changePage, changeQuestionNumber } from "./store/viewSlice"
import AnswerSheet from "./pages/AnswerSheet"
import { initialiseAnswers } from "./store/answersSlice"

function App() {
  const currentPage = useSelector((state: AppState) => state.view.page)
  const allQuestionIds = useSelector((state: AppState) => state.questions.map(q => q.id))
  const dispatch = useDispatch<AppDispatch>()

  function handleQuestionsSubmit() {
    dispatch(changeQuestionNumber(0))
    dispatch(initialiseAnswers(allQuestionIds))
    dispatch(changePage(PageType.AnswerSheet))
  }

  return (
    <>
      {currentPage === PageType.Home && <Home />}
      {currentPage === PageType.Questionnaire && (
        <Questionnaire onSubmit={() => dispatch(changePage(PageType.QuestionsReview))} />
      )}
      {currentPage === PageType.QuestionsReview && (
        <QuestionsReview onSubmit={handleQuestionsSubmit} />
      )}
      {currentPage === PageType.AnswerSheet && (
        <AnswerSheet onSubmit={() => dispatch(changePage(PageType.Result))} />
      )}
      {currentPage === PageType.Result && <div>Here are the results</div>}
    </>
  )
}

export default App
