import fs from "node:fs/promises"

// Create a store
export function factory<T>(absoluteFilePath: string, initalData: T, dataName: string = "data") {
  // 1. The In-Memory Cache (Instant reads & writes)
  let inMemorydata: T = initalData

  // 2. The Lock Variables
  let isWriting = false
  let isWritePending = false

  // Create a temporary file path (e.g., sessions.json.tmp)
  const tempFilePath = `${absoluteFilePath}.tmp`

  // 3. Boot-up function (Call this ONCE in index.ts before app.listen)
  async function initializeData() {
    try {
      const data = await fs.readFile(absoluteFilePath, "utf8")
      inMemorydata = JSON.parse(data)
      console.log(`✅ ${dataName} loaded into memory.`)
    } catch (error) {
      console.log(`⚠️ No ${dataName} file found, starting fresh.`)
      inMemorydata = initalData
    }
  }

  // 4. The Magic Lock Function
  async function flushToDisk() {
    // If we are already writing to the hard drive, leave a sticky note and exit!
    if (isWriting) {
      isWritePending = true
      return
    }

    // Lock the file
    isWriting = true
    isWritePending = false

    try {
      // Stringify is synchronous, so it instantly captures the current state of memory
      const snapshot = JSON.stringify(inMemorydata, null, 2)

      // Safely writing to file using ATOMIC WRITE
      await fs.writeFile(tempFilePath, snapshot, "utf-8")

      await fs.rename(tempFilePath, absoluteFilePath)
    } catch (error) {
      console.error(`❌ Failed to write ${dataName} to disk:`, error)
    } finally {
      // Unlock the file
      isWriting = false

      // Check the sticky note! If memory changed while we were writing, run it again.
      if (isWritePending) {
        flushToDisk()
      }
    }
  }

  return {
    initializeData,
    getData: () => inMemorydata,
    setData: (newData: T) => {
      inMemorydata = newData
      flushToDisk()
    },
  }
}
