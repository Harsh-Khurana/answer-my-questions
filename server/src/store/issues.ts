import path from "node:path"

import { factory } from "./factory.ts"
import type { Issue } from "../types.ts"

const ISSUES_FILE_PATH = path.join(import.meta.dirname, "../../data/issues.json")

let {
  initializeData: initializeIssues,
  getData: getIssues,
  setData: setIssues,
} = factory<Issue[]>(ISSUES_FILE_PATH, [], "issues")

async function addIssue(issue: Issue) {
  const existingIssues = getIssues()
  setIssues([...existingIssues, issue])
}

export { initializeIssues, getIssues, addIssue }
