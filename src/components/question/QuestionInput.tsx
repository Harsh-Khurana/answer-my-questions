import { useSelector } from "react-redux"
import { motion, type HTMLMotionProps } from "motion/react"

import { selectGlobalQuestionNumber } from "../../store"
import { useEffect } from "react"

type QuestionInputProps = {
  error?: string
}

export default function QuestionInput({
  error,
  ...inputProps
}: QuestionInputProps & HTMLMotionProps<"textarea">) {
  const currentQuestionNumber = useSelector(selectGlobalQuestionNumber)

  useEffect(() => {
    // @todo use ref instead of direclty accessing from DOM
    const textarea = document.getElementById("question-input")!
    function autoResize() {
      textarea.style.height = "auto" // Reset
      textarea.style.height = textarea.scrollHeight + "px" // Set to actual height
    }

    // 2. Run the function every time the user types
    textarea.addEventListener("input", autoResize)
    autoResize()

    return () => textarea.removeEventListener("input", autoResize)
  })

  return (
    <div className="input-wrapper">
      <label htmlFor="question-input">Q{currentQuestionNumber + 1}.</label>
      <motion.textarea
        name="question-input"
        id="question-input"
        placeholder="Fill in your question"
        {...inputProps}
        // @todo need to add this animation to all input components on error
        initial={{ x: 0 }}
        animate={{ x: error ? [10, -10, 10, -10, 0] : 0, transition: { duration: 0.5 } }}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  )
}
