import { useEffect, useRef, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { motion } from "motion/react"

type ModalProps = {
  isOpen?: boolean
  onClose?: () => void
  children: ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const modal = dialogRef.current

    if (isOpen) {
      modal?.showModal()
    } else {
      modal?.close()
    }

    return () => modal?.close()
  }, [isOpen])

  return createPortal(
    <motion.dialog
      ref={dialogRef}
      onClose={onClose}
      variants={{
        show: { y: 0, opacity: 1 },
        hide: { y: -100, opacity: 0 },
      }}
      animate={isOpen ? "show" : "hide"}
    >
      <div className="dialog-content">{children}</div>
      <form method="dialog">
        <button aria-label="Close modal">X</button>
      </form>
    </motion.dialog>,
    document.getElementById("modal")!,
  )
}
