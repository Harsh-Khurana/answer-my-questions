import { useEffect, useRef, useState, type ReactNode } from "react"
import { AnimatePresence, motion, stagger } from "motion/react"

type StaggerListProps = {
  label: ReactNode
  children: ReactNode[]
  staggerDirectionFrom?: "left" | "right"
}

export default function StaggerList({
  label,
  children,
  staggerDirectionFrom = "right",
}: StaggerListProps) {
  const [showItems, setShowItems] = useState(false)
  const listRef = useRef<HTMLSpanElement>(null)

  const listVariant = {
    hidden: { height: 0, transition: { when: "afterChildren" } },
    visible: {
      height: "auto",
      transition: { when: "beforeChildren", delayChildren: stagger(0.2) },
    },
    remove: {
      height: 0,
      transition: { when: "afterChildren", delayChildren: stagger(0.2) },
    },
  }

  const itemVariant = {
    hidden: { x: staggerDirectionFrom === "right" ? 100 : -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    remove: (index: number) => ({ y: -40 * index, opacity: 0 }),
  }

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
      <AnimatePresence>
        {showItems && (
          <motion.div
            variants={listVariant}
            initial="hidden"
            animate="visible"
            exit="remove"
            className="absolute-wrapper"
          >
            {children.map((item, idx) => (
              <motion.span key={idx} variants={itemVariant} custom={idx}>
                {item}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}
