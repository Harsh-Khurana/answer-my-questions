import cron from "node-cron"
import fs from "node:fs/promises"
import type { Question, Sessions } from "./types.ts"

export function initSessionCleanup() {
  // The cron expression "0 */12 * * *" means: "Run at minute 0, past every 12th hour."
  cron.schedule("0 */12 * * *", async () => {
    console.log("🧹 Running scheduled session cleanup...")

    try {
      const sessionsJSON = await fs.readFile("./data/sessions.json", "utf8")
      const sessions: Sessions = JSON.parse(sessionsJSON)

      // Calculate the cutoff time (12 hours ago in milliseconds)
      // 12 hours * 60 minutes * 60 seconds * 1000 milliseconds
      const twelveHoursAgo = Date.now() - 12 * 60 * 60 * 1000

      const validSessions = Object.entries(sessions).reduce((acc, [sessionId, session]) => {
        if (session.createdAt > twelveHoursAgo) {
          return { ...acc, [sessionId]: session }
        }
        return acc
      }, {} as Sessions)

      await fs.writeFile("./data/sessions.json", JSON.stringify(validSessions, null, 2))

      const removedCount = Object.keys(sessions).length - Object.keys(validSessions).length
      console.log(`✅ Cleanup complete. Removed ${removedCount} expired sessions.`)
    } catch (error) {
      console.error("❌ Failed to run session cleanup:", error)
    }
  })
}
