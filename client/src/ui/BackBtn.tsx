import { useNavigate } from "react-router"

import { DropdownArrowIcon } from "../assets/icons"

type BackBtnProps = {
  label?: string
  onBack?: () => void
}

export default function BackBtn({ label, onBack }: BackBtnProps) {
  const navigate = useNavigate()

  function handleBackClick() {
    if (onBack) {
      onBack()
    } else {
      navigate("/")
    }
  }

  return (
    <div className="back">
      <button className="back" onClick={handleBackClick}>
        <DropdownArrowIcon height={14} width={14} /> {label || "Back"}
      </button>
    </div>
  )
}
