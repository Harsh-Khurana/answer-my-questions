import { useState } from "react"
import "./App.css"
import Home from "./pages/Home"
import Questionnaire from "./pages/Questionnaire"
import { PageType } from "./types"
import QuestionsReview from "./pages/QuestionsReview"

function App() {
  const [page, setPage] = useState<PageType>(PageType.Questionnaire)

  return (
    <>
      {page === PageType.Home && <Home />}
      {page === PageType.Questionnaire && (
        <Questionnaire onSubmit={() => setPage(PageType.QuestionsReview)} />
      )}
      {page === PageType.QuestionsReview && (
        <QuestionsReview onSubmit={() => setPage(PageType.AnswerSheet)} />
      )}
    </>
  )
}

export default App
