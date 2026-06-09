import { redirect } from "react-router"
import store from "../store"

export async function timingMiddleware(_: unknown, next: () => Promise<unknown>) {
  const start = performance.now()
  await next()
  const duration = performance.now() - start
  console.log(`Navigation took ${duration}ms`)
}

export async function routeValidatorLoader() {
  const state = store.getState()

  if (!state.questions.length) {
    return redirect("/?invalidated=true")
  }

  return null
}
