import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { Answers, AnswerType, Question } from "../constants/types"

const initialState: Answers = {}

const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    initialiseAnswers(_, action: PayloadAction<Question["id"][]>) {
      // Below is more perfomative O(N) while earlier solution where we use reduce + spreading was O(N^2)
      // return action.payload.reduce((answers, id) => ({ ...answers, [id]: undefined }), {})
      return Object.fromEntries(action.payload.map(id => [id, undefined]))
    },
    saveAnswer(state, action: PayloadAction<{ id: Question["id"]; answer: AnswerType }>) {
      state[action.payload.id] = action.payload.answer
    },
    replaceAnswers(_, action: PayloadAction<Answers>) {
      return action.payload
    },
  },
})

export const { initialiseAnswers, saveAnswer, replaceAnswers } = answersSlice.actions

export default answersSlice.reducer
