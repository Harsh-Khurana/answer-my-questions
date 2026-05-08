import { useSelector } from "react-redux"
import type { ComponentPropsWithRef } from "react"

import type { AppState } from "../../store"

type QuestionInputProps = {
  error?: string
}

export default function QuestionInput({
  error,
  ...inputProps
}: QuestionInputProps & ComponentPropsWithRef<"input">) {
  const currentQuestionNumber = useSelector((state: AppState) => state.view.globalQuestionNumber)

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
