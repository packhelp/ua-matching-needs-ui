import { useRouter } from "next/router"
import { useEffect } from "react"

export const useRouteChanged = (callbacks: Array<() => void>) => {
  const router = useRouter()

  useEffect(() => {
    return router.events.on("routeChangeStart", () => {
      callbacks.forEach((callback) => callback())
    })
  }, [callbacks, router.events])
}
