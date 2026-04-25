import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Answer } from "../types"

const initialState: Answer[] = []

const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    changeQuestionNumber(state, action: PayloadAction<Answer>) {
      state.push(action.payload)
    },
    changeQuestionType(state, action: PayloadAction<Answer>) {
      const selectedAnswerIndex = state.findIndex(answer => answer.id === action.payload.id)!
      if (selectedAnswerIndex !== -1) {
        state[selectedAnswerIndex] = action.payload
      }
    },
  },
})

export const { changeQuestionNumber, changeQuestionType } = answersSlice.actions

export default answersSlice.reducer
