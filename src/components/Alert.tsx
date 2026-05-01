import type { ReactNode } from "react"
import AttentionIcon from "../assets/Attention"
import ErrorIcon from "../assets/Error"
import InfoIcon from "../assets/Info"
import SuccessIcon from "../assets/Success"

type AlertProps = {
  type?: "info" | "warning" | "success" | "danger"
  children: ReactNode
}

const iconMap = {
  info: InfoIcon,
  warning: AttentionIcon,
  success: SuccessIcon,
  danger: ErrorIcon,
}

export default function Alert({ type = "info", children }: AlertProps) {
  const Icon = iconMap[type]

  return (
    <div className={`flex alert ${type}`}>
      <Icon height={32} width={32} />
      {children}
    </div>
  )
}
