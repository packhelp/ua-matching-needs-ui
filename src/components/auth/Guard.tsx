import React, { FC, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { getUserInfo, signIn } from "../../services/auth"
import { RouteDefinitions } from "../../utils/routes"
import { useSession } from "next-auth/react"

export const GUARDED_PATHS = [
  RouteDefinitions.AddTicket,
  RouteDefinitions.MyActiveTickets,
  RouteDefinitions.MyInactiveTickets,
]

const isRestricted = (routerPathName) =>
    typeof window !== "undefined" &&
    GUARDED_PATHS.includes(routerPathName as unknown as RouteDefinitions)


export const Guard: FC = ({ children }) => {
  const [rerender, setRerender] = useState(false);
  const { data: authSession, status: authStatus } = useSession()
  const router = useRouter()
  const user = getUserInfo()

  useEffect(() => {
    if (isRestricted(router.pathname) && !authSession && authStatus === "unauthenticated") {
      router.push(RouteDefinitions.SignIn)
    }

    if (authSession?.user?.name && !user) {
      signIn(authSession?.user?.name)
      setRerender(true)
    }

    if (rerender) {
      setRerender(false)
      // @ts-ignore
      router.reload(window.location.pathname)
    }

    // TODO(m) Add Sentry
    // if (session?.user?.email) {
    //   try {
    //     Sentry.setUser({ email: session.user.email });
    //   } catch (e) {}
    // }
  }, [authSession, authStatus, rerender])

  if (authStatus === "loading") {
    return <div>loading</div>
  }

  if (isRestricted(router.pathname) && (!authSession || authStatus === "unauthenticated")) {
    router.push(RouteDefinitions.SignIn)
    return <div>Brak autoryzacji - przenoszę na stronę logowania...</div>
  }

  return <>{children}</>
}
