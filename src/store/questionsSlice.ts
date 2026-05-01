import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { DistributiveOmit, Question } from "../types"

let id = -1
function nextId() {
  id = id + 1
  return id
}

const initialState: Question[] = []

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestion(state, action: PayloadAction<DistributiveOmit<Question, "id">>) {
      state.push({ id: nextId(), ...action.payload })
    },
    editQuestion(state, action: PayloadAction<Question>) {
      const selectedQuestionIndex = state.findIndex(question => question.id === action.payload.id)!
      if (selectedQuestionIndex !== -1) {
        state[selectedQuestionIndex] = action.payload
      }
    },
    deleteQuestion(state, action: PayloadAction<Question["id"]>) {
      const selectedQuestionIndex = state.findIndex(question => question.id === action.payload)!
      if (selectedQuestionIndex !== -1) {
        state.splice(selectedQuestionIndex, 1)
      }
    },
    replaceQuestions(_, action: PayloadAction<Question[]>) {
      return action.payload
    },
  },
})

export const { addQuestion, editQuestion, deleteQuestion, replaceQuestions } =
  questionsSlice.actions

export default questionsSlice.reducer
