import { useSelector } from "react-redux"
import { motion, type HTMLMotionProps } from "motion/react"

import { selectGlobalQuestionNumber } from "../../store"

type QuestionInputProps = {
  error?: string
}

export default function QuestionInput({
  error,
  ...inputProps
}: QuestionInputProps & HTMLMotionProps<"input">) {
  const currentQuestionNumber = useSelector(selectGlobalQuestionNumber)

  return (
    <div className="input-wrapper">
      <label htmlFor="question-input">Q{currentQuestionNumber + 1}.</label>
      <motion.input
        type="text"
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
