import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { QuestionType } from "../types"

const initialState: {
  globalQuestionNumber: number
  globalQuestionType: QuestionType | "Mix"
} = {
  globalQuestionNumber: 0,
  globalQuestionType: "Mix",
}

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    changeQuestionNumber(state, action: PayloadAction<number>) {
      state.globalQuestionNumber = action.payload
    },
    changeQuestionType(state, action: PayloadAction<QuestionType>) {
      state.globalQuestionType = action.payload
    },
  },
})

export const { changeQuestionNumber, changeQuestionType } = viewSlice.actions

export default viewSlice.reducer
