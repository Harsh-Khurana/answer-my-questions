import { useState, type ChangeEvent } from "react"
import { Alert, BackBtn } from "../ui"
import AutoResizeTextArea from "../ui/AutoResizeTextArea"
import { useAnimate } from "motion/react"

type Issue = {
  title: string
  description: string
}

export default function ReportIssues() {
  const [errors, setErrors] = useState<{
    title: string | undefined
    description: string | undefined
  }>({ title: undefined, description: undefined })

  const [scope, animate] = useAnimate()

  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const name = e.target.name
    const value = e.target.value
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: !value.trim().length ? `${name} cannot be empty` : undefined,
    }))
  }

  function handleSubmit(formData: FormData) {
    const data = Object.fromEntries(formData.entries()) as Issue

    const title = data.title.trim()
    const description = data.description.trim()

    if (!title || !description) {
      setErrors(prevErrors => ({
        ...prevErrors,
        title: !title ? "title cannot be empty" : undefined,
        description: !description ? "description cannot be empty" : undefined,
      }))

      if (!title) {
        animate("#title", { x: [10, -10, 10, -10, 0] }, { duration: 0.5 })
      }
      if (!description) {
        animate("#description", { x: [10, -10, 10, -10, 0] }, { duration: 0.5 })
      }

      return
    }

    // @todo handle issue submit
    console.log(data)
  }

  return (
    <>
      <header>
        <BackBtn label="Back to main menu" />
      </header>
      <main id="main-report-issues">
        <Alert>
          Tell us what's bothering you or if you just have some suggestions for us. And we'll try to
          incorporate that as soon as possible.
        </Alert>
        <form action={handleSubmit} ref={scope}>
          <AutoResizeTextArea
            id="title"
            label="Issue/Suggestion"
            error={errors.title || ""}
            onChange={handleInputChange}
          />
          <div className="input-wrapper">
            <label htmlFor="description">Describe your issue/suggestion in detail</label>
            <textarea name="description" id="description" rows={10} onChange={handleInputChange} />
            {errors?.description && <span className="input-error">{errors.description}</span>}
          </div>
          <button>Submit</button>
        </form>
      </main>
    </>
  )
}
