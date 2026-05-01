import "./App.css"
import Home from "./pages/Home"
import Questionnaire from "./pages/Questionnaire"
import { PageType } from "./types"
import QuestionsReview from "./pages/QuestionsReview"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, AppState } from "./store"
import { changePage, changeQuestionNumber } from "./store/viewSlice"
import AnswerSheet from "./pages/AnswerSheet"

function App() {
  const currentPage = useSelector((state: AppState) => state.view.page)
  const dispatch = useDispatch<AppDispatch>()

  function handleQuestionsSubmit() {
    dispatch(changeQuestionNumber(0))
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
      {currentPage === PageType.AnswerSheet && <AnswerSheet />}
    </>
  )
}

export default App
