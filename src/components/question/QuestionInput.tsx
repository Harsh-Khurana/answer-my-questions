import { useSelector } from "react-redux"

import { selectGlobalQuestionNumber } from "../../store"
import { useEffect, useRef, type ComponentPropsWithRef } from "react"

type QuestionInputProps = {
  error?: string
}

export default function QuestionInput({
  error,
  ...inputProps
}: QuestionInputProps & ComponentPropsWithRef<"textarea">) {
  const currentQuestionNumber = useSelector(selectGlobalQuestionNumber)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textAreaRef.current

    if (!textarea) return

    function autoResize() {
      if (!textarea) return

      textarea.style.height = "auto" // Reset
      textarea.style.height = textarea.scrollHeight + "px" // Set to actual height
    }

    // Run the function every time the user types
    textarea.addEventListener("input", autoResize)
    autoResize()

    return () => textarea.removeEventListener("input", autoResize)
  }, [])

  return (
    <div className="input-wrapper">
      <label htmlFor="question-input">Q{currentQuestionNumber + 1}.</label>
      <textarea
        name="question-input"
        id="question-input"
        placeholder="Fill in your question"
        ref={textAreaRef}
        {...inputProps}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  )
}
