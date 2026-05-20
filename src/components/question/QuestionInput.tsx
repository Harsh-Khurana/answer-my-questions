import { useSelector } from "react-redux"

import { selectGlobalQuestionNumber } from "../../store"
import { useCallback, useEffect, useRef, type ComponentPropsWithRef } from "react"

type QuestionInputProps = {
  error?: string
}

export default function QuestionInput({
  error,
  ref: externalRef,
  ...inputProps
}: QuestionInputProps & ComponentPropsWithRef<"textarea">) {
  const currentQuestionNumber = useSelector(selectGlobalQuestionNumber)
  const localRef = useRef<HTMLTextAreaElement>(null)

  const mergedRef = useCallback(
    (element: HTMLTextAreaElement | null) => {
      localRef.current = element

      if (externalRef) {
        if (typeof externalRef === "function") {
          externalRef(element)
        } else {
          externalRef.current = element
        }
      }
    },
    [externalRef],
  )

  useEffect(() => {
    const textarea = localRef.current

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
        ref={mergedRef}
        {...inputProps}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  )
}
