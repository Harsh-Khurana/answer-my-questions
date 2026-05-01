import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { PageType, QuestionType } from "../types"

const initialState: {
  globalQuestionNumber: number
  globalQuestionType: QuestionType | "Mix"
  page: PageType
} = {
  globalQuestionNumber: 0,
  globalQuestionType: "Mix",
  page: PageType.Questionnaire,
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
    changePage(state, action: PayloadAction<PageType>) {
      state.page = action.payload
    },
  },
})

export const { changeQuestionNumber, changeQuestionType, changePage } = viewSlice.actions

export default viewSlice.reducer
