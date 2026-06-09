import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import { PageType, QuestionCategories, QuestionType } from "../constants/types"

const initialState: {
  globalQuestionNumber: number
  globalQuestionType: QuestionType | "Mix"
  globalQuestionCategory?: QuestionCategories
  page: PageType
  isAnsweringMandatory: boolean
} = {
  globalQuestionNumber: 0,
  globalQuestionType: "Mix",
  page: PageType.Home,
  isAnsweringMandatory: (() => {
    try {
      return localStorage.getItem("isAnsweringMandatory") === "true"
    } catch {
      return false // Safe fallback if localStorage is blocked/broken
    }
  })(),
}

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    changeQuestionNumber(state, action: PayloadAction<number>) {
      state.globalQuestionNumber = action.payload
    },
    changeQuestionType(state, action: PayloadAction<QuestionType | "Mix">) {
      state.globalQuestionType = action.payload
    },
    changeQuestionCategory(state, action: PayloadAction<QuestionCategories>) {
      state.globalQuestionCategory = action.payload
      state.globalQuestionType = "Mix"
    },
    clearCategory(state) {
      state.globalQuestionNumber = 0
      state.globalQuestionCategory = undefined
    },
    changePage(state, action: PayloadAction<PageType>) {
      state.page = action.payload
    },
    setIsAnsweringMandatory(state, action: PayloadAction<boolean>) {
      state.isAnsweringMandatory = action.payload
    },
  },
})

export const {
  changeQuestionNumber,
  changeQuestionType,
  changeQuestionCategory,
  clearCategory,
  changePage,
  setIsAnsweringMandatory,
} = viewSlice.actions

export default viewSlice.reducer
