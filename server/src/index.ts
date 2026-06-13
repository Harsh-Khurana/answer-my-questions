import fs from "node:fs/promises"
import bodyParser from "body-parser"
import express, { type Request, type Response, type NextFunction } from "express"

import type { QuestionCategories, Sessions } from "./types.ts"
import { initSessionCleanup } from "./utils.ts"

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
    const questionsJSON = await fs.readFile("./data/questions.json", "utf8")
    let questions = JSON.parse(questionsJSON)

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
      const sessionsJSON = await fs.readFile("./data/sessions.json", "utf8")
      const sessions = JSON.parse(sessionsJSON) as Sessions

      const { sessionId } = req.params

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
    const sessionsJSON = await fs.readFile("./data/sessions.json", "utf8")
    const sessions = JSON.parse(sessionsJSON) as Sessions

    const { sessionId } = req.params

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

  try {
    const existingSessionsJSON = await fs.readFile("./data/sessions.json", "utf8")
    const existingSessions = JSON.parse(existingSessionsJSON) as Sessions
    const existingSessionIds = Object.keys(existingSessions)

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

    await fs.writeFile(
      "./data/sessions.json",
      JSON.stringify({ ...existingSessions, ...newSession }, null, 2),
    )

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

    try {
      const sessionsJSON = await fs.readFile("./data/sessions.json", "utf8")
      const sessions = JSON.parse(sessionsJSON) as Sessions

      if (!sessionId || !sessions[sessionId]) {
        return res.status(404).json({ message: "Invalid or expired session." })
      }

      sessions[sessionId].answers = answers
      sessions[sessionId].completed = true

      await fs.writeFile("./data/sessions.json", JSON.stringify(sessions, null, 2))

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
    const existingIssuesJSON = await fs.readFile("./data/issues.json", "utf8")
    const existingIssues = JSON.parse(existingIssuesJSON)
    await fs.writeFile("./data/issues.json", JSON.stringify([...existingIssues, issue], null, 2))
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
