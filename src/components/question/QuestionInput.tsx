import { useSelector } from "react-redux"

import { selectGlobalQuestionNumber } from "../../store"
import { type ComponentPropsWithRef } from "react"
import AutoResizeTextArea from "../../ui/AutoResizeTextArea"

type QuestionInputProps = {
  error?: string
}

export default function QuestionInput({
  error,
  ...inputProps
}: QuestionInputProps & ComponentPropsWithRef<"textarea">) {
  const currentQuestionNumber = useSelector(selectGlobalQuestionNumber)

  return (
    <AutoResizeTextArea
      id="question-input"
      label={`Q${currentQuestionNumber + 1}.`}
      placeholder="Fill in your question"
      error={error}
      {...inputProps}
    />
  )
}
