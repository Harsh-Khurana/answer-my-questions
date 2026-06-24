import { createBrowserRouter, RouterProvider } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import "./App.css"
import {
  Home,
  Questionnaire,
  QuestionsReview,
  AnswerSheet,
  Results,
  ReportIssues,
  GuardLayout,
  Loader,
} from "./pages"
import { ROUTES } from "./constants/routes"
import { routeValidatorLoader } from "./utils"

const router = createBrowserRouter([
  {
    path: "",
    // middleware: [timingMiddleware],
    children: [
      { index: true, Component: Home },
      { path: ROUTES.questionnaire, Component: Questionnaire },
      {
        Component: GuardLayout,
        loader: routeValidatorLoader,
        children: [
          { path: ROUTES.questionsReview, Component: QuestionsReview },
          { path: ROUTES.answerSheet, Component: AnswerSheet },
          { path: ROUTES.results, Component: Results },
        ],
      },
      { path: ROUTES.issues, Component: ReportIssues },
    ],
    hydrateFallbackElement: <Loader />,
  },
])

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
