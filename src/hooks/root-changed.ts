import { useRouter } from "next/router"
import { useEffect } from "react"

export const useRouteChanged = (callbacks: Array<() => void>) => {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = router.events.on(
      "routeChangeStart",
      (url, { shallow }) => {
        callbacks.forEach((callback) => callback())
      }
    )
  }, [])
}
