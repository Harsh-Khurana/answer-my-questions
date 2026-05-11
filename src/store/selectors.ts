import { createSelector } from "@reduxjs/toolkit"
import type { AppState } from "."

/*********************** QUESTIONS SLICE RELEATED SELECTORS ***********************/
export const selectQuestions = (state: AppState) => state.questions

export const selectTotalQuestions = createSelector(selectQuestions, questions => questions.length)

export const selectTotalAnsweredQuestions = createSelector(
  selectQuestions,
  questions => questions.filter(q => q.answer !== undefined).length,
)

export const selectHasSavedQuestions = (state: AppState) => !!selectTotalQuestions(state)

/*********************** ANSWERS SLICE RELEATED SELECTORS ***********************/
export const selectAnswers = (state: AppState) => state.answers

export const selectTotalAnswers = createSelector(
  selectAnswers,
  answers => Object.values(answers).filter(answer => answer !== undefined).length,
)

/*********************** VIEW SLICE RELEATED SELECTORS ***********************/
export const selectCurrentPage = (state: AppState) => state.view.page

export const selectGlobalQuestionNumber = (state: AppState) => state.view.globalQuestionNumber

export const selectGlobalQuestionType = (state: AppState) => state.view.globalQuestionType

export const selectGlobalQuestionCategory = (state: AppState) => state.view.globalQuestionCategory

/***********************  MIX SELECTORS *******************************/
export const selectCurrentQuestion = createSelector(
  selectQuestions,
  selectGlobalQuestionNumber,
  (questions, selectedQuestionNumber) => questions[selectedQuestionNumber],
)

export const selectCurrentAnswer = createSelector(
  selectAnswers,
  selectCurrentQuestion,
  (answers, selectedQuestionNumber) => answers?.[selectedQuestionNumber.id],
)
