import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { Answer, AnswerType, Question } from "../constants/types"

const initialState: Record<Question["id"], AnswerType | undefined> = {}

const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    initialiseAnswers(_, action: PayloadAction<Question["id"][]>) {
      return action.payload.reduce((answers, id) => ({ ...answers, [id]: undefined }), {})
    },
    saveAnswer(state, action: PayloadAction<Answer>) {
      state[action.payload.id] = action.payload.answer
    },
  },
})

export const { initialiseAnswers, saveAnswer } = answersSlice.actions

export default answersSlice.reducer
