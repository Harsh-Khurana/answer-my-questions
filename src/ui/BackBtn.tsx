import { useDispatch } from "react-redux"

import { DropdownArrowIcon } from "../assets/icons"
import { changePage, type AppDispatch } from "../store"
import { PageType } from "../constants/types"

type BackBtnProps = {
  label?: string
  onBack?: () => void
}

export default function BackBtn({ label, onBack }: BackBtnProps) {
  const dispatch = useDispatch<AppDispatch>()

  function handleBackClick() {
    if (onBack) {
      onBack()
    } else {
      dispatch(changePage(PageType.Home))
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
