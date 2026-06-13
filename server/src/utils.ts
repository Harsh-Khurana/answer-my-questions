import cron from "node-cron"

import { getSessions, setSessions } from "./store/sessions.ts"

export function initSessionCleanup() {
  // The cron expression "0 */12 * * *" means: "Run at minute 0, past every 12th hour."
  cron.schedule("0 */12 * * *", async () => {
    console.log("🧹 Running scheduled session cleanup...")

    try {
      const sessions = getSessions()

      // Calculate the cutoff time (12 hours ago in milliseconds)
      // 12 hours * 60 minutes * 60 seconds * 1000 milliseconds
      const twelveHoursAgo = Date.now() - 12 * 60 * 60 * 1000

      const validSessions = Object.entries(sessions).reduce((acc, [sessionId, session]) => {
        if (session.createdAt > twelveHoursAgo) {
          return { ...acc, [sessionId]: session }
        }
        return acc
      }, {})

      setSessions(validSessions)

      const removedCount = Object.keys(sessions).length - Object.keys(validSessions).length
      console.log(`✅ Cleanup complete. Removed ${removedCount} expired sessions.`)
    } catch (error) {
      console.error("❌ Failed to run session cleanup:", error)
    }
  })
}
