import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useSearchParams } from "react-router"

import type { AlertProps } from "./Alert"
import Alert from "./Alert"

type CustomProps = {
  searchParam: string
  searchParamValue: string
}

type SnackbarAlertProps = CustomProps & AlertProps

export default function SnackbarAlert({
  searchParam,
  searchParamValue,
  ...alertProps
}: SnackbarAlertProps) {
  const [searchParams] = useSearchParams()
  const [showAlert, setShowAlert] = useState(searchParams.get(searchParam) === searchParamValue)

  useEffect(() => {
    if (showAlert) {
      const cleanUrl = new URL(window.location.href)
      cleanUrl.searchParams.delete(searchParam)

      // FIRE AND FORGET: Replace the URL purely visually using native history API, instead of
      // setSearchParams which would trigger a re-render!
      window.history.replaceState({}, "", cleanUrl)

      const timeoutId = setTimeout(() => setShowAlert(false), 2000)
      return () => clearTimeout(timeoutId)
    }
  }, [showAlert, searchParam])

  return (
    <AnimatePresence>
      {showAlert && (
        <motion.span
          variants={{
            show: { y: 10, opacity: 1 },
            hide: { y: -40, opacity: 0 },
          }}
          transition={{ duration: 0.5 }}
          initial="hide"
          animate="show"
          exit="hide"
        >
          <Alert {...alertProps} />
        </motion.span>
      )}
    </AnimatePresence>
  )
}
