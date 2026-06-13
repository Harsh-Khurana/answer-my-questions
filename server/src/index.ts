import fs from "node:fs/promises"
import bodyParser from "body-parser"
import express, { type Request, type Response, type NextFunction } from "express"

import type { Question, QuestionCategories, Sessions } from "./types.ts"
import { initSessionCleanup } from "./utils.ts"
import {
  initializeIssues,
  initializeQuestions,
  initializeSessions,
  getQuestions,
  getSessions,
  updateSession,
  addIssue,
  addSession,
} from "./store/index.ts"

// INITIALIZING DATA TO READ AND WRITE QUICKLY
initializeIssues()
initializeSessions()
initializeQuestions()

const app = express()

app.use(bodyParser.json())
app.use(express.static("public"))

// Add NextFunction, Request, and Response types to middleware
app.use((_: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  next()
})

interface QuestionsRequestParams {
  category?: QuestionCategories
}

/******************************* QUESTIONS ******************************/
// Get category questions
app.get("/questions{/:category}", async (req: Request<QuestionsRequestParams>, res: Response) => {
  try {
    let questions: Record<string, Question[]> | Question[] = getQuestions()

    const { category } = req.params

    if (category) {
      questions = questions[category[0]?.toUpperCase() + category.slice(1, category.length)] || []
    }
    res.json(questions)
  } catch (error) {
    res.status(500).json({ message: "Could not read questions." })
  }
})

/********************************* SESSIONS ********************************/
interface SessionRequestParams {
  sessionId: string
}

// Get session status - whether is completed or not
app.get(
  "/sessions/:sessionId/status",
  async (req: Request<SessionRequestParams>, res: Response) => {
    try {
      const { sessionId } = req.params
      const sessions = getSessions()

      if (!sessionId || !sessions[sessionId]) {
        return res.status(404).json({ message: "Invalid or expired session." })
      }

      return res.json({ sessionCompleted: sessions[sessionId].completed })
    } catch (error) {
      res.status(500).json({ message: "Could not read session." })
    }
  },
)

// Get a particular session based on sessionId
app.get("/sessions/:sessionId", async (req: Request<SessionRequestParams>, res: Response) => {
  try {
    const { sessionId } = req.params
    const sessions = getSessions()

    if (!sessionId || !sessions[sessionId]) {
      return res.status(404).json({ message: "Invalid or expired session." })
    }

    res.json(sessions[sessionId])
  } catch (error) {
    res.status(500).json({ message: "Could not read session." })
  }
})

type SessionPostRequestBody = Pick<Sessions[keyof Sessions], "isAnsweringMandatory" | "questions">

// Create a new session
app.post("/sessions", async (req: Request<{}, {}, SessionPostRequestBody>, res: Response) => {
  const { questions } = req.body

  if (!questions.length) {
    return res.status(400).json({ message: "No questions were submitted." })
  }

  const sessions = getSessions()

  try {
    const existingSessionIds = Object.keys(sessions)

    const newSessionId = existingSessionIds.length
      ? parseInt(existingSessionIds[existingSessionIds.length - 1]!) + 1
      : 1
    const newSession: Sessions = {
      [newSessionId]: {
        ...req.body,
        answers: {},
        createdAt: Date.now(),
        completed: false,
      },
    }

    addSession(newSession)

    res.status(201).json({ newSessionId })
  } catch (error) {
    res.status(500).json({ message: "Could not create your AMQ session." })
  }
})

type SessionPatchRequestBody = Pick<Sessions[keyof Sessions], "answers">

// Update a particular session based on sessionId
app.patch(
  "/sessions/:sessionId",
  async (req: Request<SessionRequestParams, {}, SessionPatchRequestBody>, res: Response) => {
    const { answers } = req.body
    const { sessionId } = req.params

    if (!answers) {
      return res.status(400).json({ message: "Missing answers data." })
    }

    const sessions = getSessions()

    try {
      if (!sessionId || !sessions[sessionId]) {
        return res.status(404).json({ message: "Invalid or expired session." })
      }

      updateSession(sessionId, { answers: answers, completed: true })

      res.status(201).json(sessions[sessionId])
    } catch (error) {
      res.status(500).json({ message: "Could not update your AMQ session." })
    }
  },
)

/********************************* ISSUES/IMPROVEMENTS ********************************/
interface AppIssueRequestBody {
  title: string
  description: string
}

// Add a new issue/improvement suggested by a user
app.post("/app-issues", async (req: Request<{}, {}, AppIssueRequestBody>, res: Response) => {
  const issue = req.body

  if (!issue.title || !issue.description) {
    return res.status(400).json({ message: "Missing data for an issue." })
  }

  try {
    addIssue(issue)
    res.status(201).json({ message: "Issue added successfully." })
  } catch (error) {
    res.status(500).json({ message: "Could not save issue." })
  }
})

// Fallback route
app.use((req: Request, res: Response) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200)
  }

  res.status(404).json({ message: "Not found" })
})

app.listen(3000, () => {
  console.log("Server listening on port 3000")

  initSessionCleanup()
})
