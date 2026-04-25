import { useState } from "react"

export default function Home() {
  // @todo set initial value to false when project finalised
  const [showQuestionTypes, setShowQuestionTypes] = useState(true)

  function handleCreateQuestionClick() {
    setShowQuestionTypes(prevShow => !prevShow)
  }

  return (
    <main>
      <h1>Answer my questions</h1>
      <p>
        A simple question and answer game that can be played with anyone be it your partner,
        friends, or family.
      </p>
      <span className="relative-wrapper">
        <button onClick={handleCreateQuestionClick}>Create Questions</button>
        {showQuestionTypes && (
          <div className="absolute-wrapper">
            <button>MCQ</button>
            <button>Subjective</button>
            <button>Yes & No</button>
            <button>Mix</button>
          </div>
        )}
      </span>
    </main>
  )
}
