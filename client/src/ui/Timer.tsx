import { useEffect, useState } from "react"

type TimerProps = {
  seconds?: number
  onComplete?: () => void
}

export default function Timer({ seconds = 60, onComplete }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds)

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onComplete) onComplete()
      return
    }

    const timeoutId = setTimeout(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [timeLeft, onComplete])

  const remainingMinutes = Math.trunc(timeLeft / 60)
  const remainingSeconds = timeLeft - remainingMinutes * 60

  return (
    <strong>
      {remainingMinutes > 9 ? remainingMinutes : `0${remainingMinutes}`}:
      {remainingSeconds > 9 ? remainingSeconds : `0${remainingSeconds}`}
    </strong>
  )
}
