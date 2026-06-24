import { redirect, type LoaderFunctionArgs } from "react-router"
import store, {
  changeQuestionNumber,
  initialiseAnswers,
  replaceAnswers,
  replaceQuestions,
  setIsAnsweringMandatory,
} from "../store"
import type { Sessions } from "../constants/types"
import { ROUTES } from "../constants/routes"
import { API_BASE_URL } from "../constants/urls"

export async function timingMiddleware(_: unknown, next: () => Promise<unknown>) {
  const start = performance.now()
  await next()
  const duration = performance.now() - start
  console.log(`Navigation took ${duration}ms`)
}

export async function routeValidatorLoader({ url }: LoaderFunctionArgs) {
  const sessionId = url.searchParams.get("sessionId")

  if (store.getState().questions.length) {
    return null
  }

  if (!sessionId) {
    return redirect("/?invalidated=true")
  }

  try {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`)

    if (!response.ok) {
      if (response.status === 404) {
        return redirect("/?expired=true")
      }
      return redirect("/?error=true")
    }

    const session: Sessions[number] = await response.json()

    store.dispatch(changeQuestionNumber(0))
    store.dispatch(replaceQuestions(session.questions))
    store.dispatch(setIsAnsweringMandatory(session.isAnsweringMandatory))

    if (session.completed) {
      const additionalCompletedParam = url.pathname.includes(ROUTES.answerSheet)
        ? "&completed=true"
        : ""
      store.dispatch(replaceAnswers(session.answers))
      return redirect(`${ROUTES.results}/?sessionId=${sessionId}${additionalCompletedParam}`)
    } else {
      const additionalCompletedParam = url.pathname.includes(ROUTES.results)
        ? "&completed=false"
        : ""
      store.dispatch(initialiseAnswers(session.questions.map(q => q.id)))
      return redirect(`${ROUTES.answerSheet}/?sessionId=${sessionId}${additionalCompletedParam}`)
    }
  } catch (error) {
    console.error("Session verification failed:", error)
    return redirect("/?error=true")
  }
}
