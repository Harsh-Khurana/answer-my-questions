import type { ComponentPropsWithoutRef } from "react"

export type CommonSvgProps = {
  height?: number | string
  width?: number | string
  title?: string
  color?: string
}

export type SvgProps = CommonSvgProps & ComponentPropsWithoutRef<"svg">
