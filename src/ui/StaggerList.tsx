import { Fragment, useEffect, useRef, useState, type ReactNode } from "react"

type StaggerListProps = {
  label: ReactNode
  children: ReactNode[]
}

export default function StaggerList({ label, children }: StaggerListProps) {
  const [showItems, setShowItems] = useState(false)
  const listRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        setShowItems(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <span className="relative-wrapper" ref={listRef}>
      <span onClick={() => setShowItems(prevShow => !prevShow)}>{label}</span>
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
