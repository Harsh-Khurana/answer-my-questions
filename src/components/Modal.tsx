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
    if (isOpen) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [isOpen])

  return createPortal(
    <dialog ref={dialogRef} onClose={onClose}>
      <div id="dialog-content">{children}</div>
      <form method="dialog">
        <button>X</button>
      </form>
    </dialog>,
    document.getElementById("modal")!,
  )
}
