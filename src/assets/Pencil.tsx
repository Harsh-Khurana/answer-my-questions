import type { SvgProps } from "./svgProps"

export default function PencilIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 734 734" height={24} width={24} {...props}>
      <path
        d="M633.333 500V633.333C633.333 651.014 626.309 667.971 613.807 680.474C601.305 692.976 584.348 700 566.667 700H100C82.3189 700 65.3619 692.976 52.8595 680.474C40.3571 667.971 33.3333 651.014 33.3333 633.333V166.667C33.3333 148.986 40.3571 132.029 52.8595 119.526C65.3619 107.024 82.3189 100 100 100H233.333"
        stroke="currentColor"
        fill="none"
        strokeWidth="66.6667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M383.333 493.333L700 173.333L560 33.3333L243.333 350L233.333 500L383.333 493.333Z"
        stroke="currentColor"
        fill="none"
        strokeWidth="66.6667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
