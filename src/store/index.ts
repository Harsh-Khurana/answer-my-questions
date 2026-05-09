import { configureStore } from "@reduxjs/toolkit"

import viewReducer from "./viewSlice"
import questionsReducer from "./questionsSlice"
import answersReducer from "./answersSlice"

const store = configureStore({
  reducer: {
    view: viewReducer,
    questions: questionsReducer,
    answers: answersReducer,
  },
})

export default store

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>

export * from "./answersSlice"
export * from "./questionsSlice"
export * from "./viewSlice"
export * from "./selectors"
