import path from "node:path"
import { factory } from "./factory.ts"
import type { Question } from "../types.ts"

const QUESTIONS_FILE_PATH = path.join(import.meta.dirname, "../../data/questions.json")

const { initializeData: initializeQuestions, getData: getQuestions } = factory<
  Record<string, Question[]>
>(QUESTIONS_FILE_PATH, {}, "questions")

export { initializeQuestions, getQuestions }
