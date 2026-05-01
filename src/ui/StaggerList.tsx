import { Fragment, useState, type ReactNode } from "react"

type StaggerListProps = {
  label: ReactNode
  children: ReactNode[]
}

export default function StaggerList({ label, children }: StaggerListProps) {
  const [showItems, setShowItems] = useState(false)

  function handleToggleShow() {
    setShowItems(prevShow => !prevShow)
  }

  return (
    <span className="relative-wrapper" onBlur={() => setShowItems(false)}>
      <span onClick={handleToggleShow}>{label}</span>
      {showItems && (
        <div className="absolute-wrapper">
          {children.map((item, idx) => (
            <Fragment key={idx}>{item}</Fragment>
          ))}
        </div>
      )}
    </span>
  )
}
