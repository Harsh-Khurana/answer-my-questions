import path from "node:path"

import type { Sessions } from "../types.ts"
import { factory } from "./factory.ts"

// import.meta.dirname represents the folder this exact file is currently in.
// In our case, import.meta.dirname equals: "/home/.../server/src/store"

// We use path.join to safely navigate UP two folders, then INTO the data folder
const SESSIONS_FILE_PATH = path.join(import.meta.dirname, "../../data/sessions.json")

const {
  initializeData: initializeSessions,
  getData: getSessions,
  setData: setSessions,
} = factory<Sessions>(SESSIONS_FILE_PATH, {}, "sessions")

function addSession(newSession: Sessions) {
  const existingSessions = getSessions()

  setSessions({ ...existingSessions, ...newSession })
}

function updateSession(sessionId: string, sessionData: Partial<Sessions[string]>) {
  const existingSessions = getSessions()

  if (existingSessions[sessionId]) {
    setSessions({
      ...existingSessions,
      [sessionId]: { ...existingSessions[sessionId], ...sessionData },
    })
  }
}

function removeSession(sessionId: string) {
  const existingSessions = getSessions()
  const { [sessionId]: sessionToRemove, ...remainingSessions } = existingSessions

  setSessions(remainingSessions)
}

export { initializeSessions, getSessions, setSessions, addSession, updateSession, removeSession }
