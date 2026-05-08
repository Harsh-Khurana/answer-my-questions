import { useEffect, useRef, type ReactNode } from "react"
import { createPortal } from "react-dom"

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
    <dialog ref={dialogRef} onClose={onClose}>
      <div id="dialog-content">{children}</div>
      <form method="dialog">
        <button aria-label="Close modal">X</button>
      </form>
    </dialog>,
    document.getElementById("modal")!,
  )
}
