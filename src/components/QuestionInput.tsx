import { useSelector } from "react-redux"
import type { AppState } from "../store"
import type { ComponentPropsWithRef } from "react"

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
      <label htmlFor="question">Q{currentQuestionNumber + 1}.</label>
      <input
        type="text"
        name="question"
        id="question"
        placeholder="Fill in your question"
        {...inputProps}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  )
}
