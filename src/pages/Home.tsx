import { StaggerList } from "../ui"

export default function Home() {
  return (
    <main>
      <h1>Answer my questions</h1>
      <p>
        A simple question and answer game that can be played with anyone be it your partner,
        friends, or family.
      </p>
      <StaggerList label={<button>Create Questions</button>}>
        <button>MCQ</button>
        <button>Subjective</button>
        <button>Yes & No</button>
        <button>Mix</button>
      </StaggerList>
    </main>
  )
}
