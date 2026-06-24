import { useState } from "react"

interface CopierProps {
  textToCopy: string
  label?: string
}

export default function Copier({ textToCopy, label = "Copy" }: CopierProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy)

      setIsCopied(true)

      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy to clipboard:", error)
      alert("Unable to copy to clipboard. Please copy manually.")
    }
  }

  return (
    <div className="input-wrapper copier">
      <textarea
        className="auto-resize-textarea"
        name="copy-link"
        contentEditable={false}
        defaultValue={textToCopy}
      />
      <button className={`bordered${isCopied ? " success" : ""}`} onClick={handleCopy}>
        {isCopied ? "✅ Copied!" : `📋 ${label}`}
      </button>
    </div>
  )
}
