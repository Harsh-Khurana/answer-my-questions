import { createBrowserRouter, RouterProvider } from "react-router"

import "./App.css"
import { Home, Questionnaire, QuestionsReview, AnswerSheet, Results, ReportIssues } from "./pages"
import { ROUTES } from "./constants/routes"
import { routeValidatorLoader, timingMiddleware } from "./utils"

const router = createBrowserRouter([
  {
    path: "",
    middleware: [timingMiddleware],
    children: [
      { index: true, Component: Home },
      { path: ROUTES.questionnaire, Component: Questionnaire },
      { path: ROUTES.questionsReview, Component: QuestionsReview, loader: routeValidatorLoader },
      { path: ROUTES.answerSheet, Component: AnswerSheet, loader: routeValidatorLoader },
      { path: ROUTES.results, Component: Results, loader: routeValidatorLoader },
      { path: ROUTES.issues, Component: ReportIssues, loader: routeValidatorLoader },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
