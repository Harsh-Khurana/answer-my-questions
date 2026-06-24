import type { QueryFunctionContext } from "@tanstack/react-query"

import type { Answers, Issue, Sessions } from "../constants/types"
import { API_BASE_URL } from "../constants/urls"

export async function fetchQuestions({ signal }: QueryFunctionContext) {
  const response = await fetch(`${API_BASE_URL}/questions`, {
    signal,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}

export async function postIssue(issue: Issue) {
  const response = await fetch(`${API_BASE_URL}/app-issues`, {
    method: "POST",
    body: JSON.stringify(issue),
    headers: {
      "Content-Type": "application/json",
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}

export async function createSession(
  session: Pick<Sessions[keyof Sessions], "isAnsweringMandatory" | "questions">,
) {
  const response = await fetch(`${API_BASE_URL}/sessions`, {
    method: "POST",
    body: JSON.stringify(session),
    headers: {
      "Content-Type": "application/json",
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}

export async function getSessionStatus({
  signal,
  sessionId,
}: QueryFunctionContext & { sessionId?: string }) {
  if (!sessionId) {
    throw new Error("Session ID is required to fetch a session.")
  }

  const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/status`, { signal })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}

export async function getSession({
  signal,
  sessionId,
}: QueryFunctionContext & { sessionId?: string }) {
  if (!sessionId) {
    throw new Error("Session ID is required to fetch a session.")
  }

  const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`, { signal })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}

export async function updateSession({
  sessionId,
  answers,
}: {
  sessionId: string
  answers: Answers
}) {
  const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`, {
    method: "PATCH",
    body: JSON.stringify(answers),
    headers: {
      "Content-Type": "application/json",
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}
