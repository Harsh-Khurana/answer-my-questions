import { useSelector } from "react-redux"
import type { ComponentPropsWithRef } from "react"

import { selectGlobalQuestionNumber } from "../../store"

type QuestionInputProps = {
  error?: string
}

export default function QuestionInput({
  error,
  ...inputProps
}: QuestionInputProps & ComponentPropsWithRef<"input">) {
  const currentQuestionNumber = useSelector(selectGlobalQuestionNumber)

  return (
    <div className="input-wrapper">
      <label htmlFor="question-input">Q{currentQuestionNumber + 1}.</label>
      <input
        type="text"
        name="question-input"
        id="question-input"
        placeholder="Fill in your question"
        {...inputProps}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  )
}
