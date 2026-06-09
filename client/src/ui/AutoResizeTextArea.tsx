import { useEffect, useRef, type ComponentPropsWithoutRef } from "react"

type AutoResizeTextAreaProps = {
  id: string
  label: string
  error?: string
} & ComponentPropsWithoutRef<"textarea">

export default function AutoResizeTextArea({
  id,
  label,
  error,
  ...inputProps
}: AutoResizeTextAreaProps) {
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
      <label htmlFor={id}>{label}</label>
      <textarea
        name={id}
        id={id}
        className="auto-resize-textarea"
        ref={textAreaRef}
        {...inputProps}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  )
}
