import { useCallback, useEffect, useState } from "react"
import { getUserInfo } from "../services/auth"
import { useRouteChanged } from "./root-changed"

export const useIsLogged = () => {
  const [logged, setLogged] = useState(false)

  const setLoggedCb = useCallback(() => {
    /* hax to do it real time instead of ssr */
    if (typeof window !== "undefined") {
      setLogged(!!getUserInfo())
    }
  }, [setLogged])

  useRouteChanged([setLoggedCb])

  useEffect(() => {
    setLoggedCb()
  }, [])

  return logged
}
