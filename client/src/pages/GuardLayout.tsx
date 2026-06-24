import { Outlet, useNavigation } from "react-router"

import Loader from "./Loader"
import { SnackbarAlert } from "../ui"

export default function GuardLayout() {
  const navigation = useNavigation()

  if (navigation.state === "loading") {
    return <Loader />
  }

  return (
    <>
      <SnackbarAlert searchParam="completed" searchParamValue="true" type="success">
        Yipee!! You have reached the end.
      </SnackbarAlert>
      <SnackbarAlert searchParam="completed" searchParamValue="false" type="warning">
        Can only access results once following questions have been submitted.
      </SnackbarAlert>
      <Outlet />
    </>
  )
}
