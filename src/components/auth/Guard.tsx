import React, { FC } from "react"
import { useRouter } from "next/router"
import { getUserInfo } from "../../services/auth"
import { RouteDefinitions } from "../../utils/routes"

export const GUARDED_PATHS = [
  RouteDefinitions.AddTicket,
  RouteDefinitions.MyActiveTickets,
  RouteDefinitions.MyInactiveTickets,
]
export const Guard: FC = ({ children }) => {
  const isLogged = getUserInfo()
  const router = useRouter()

  if (
    typeof window !== "undefined" &&
    !isLogged &&
    GUARDED_PATHS.includes(router.pathname as unknown as RouteDefinitions)
  ) {
    router.push(RouteDefinitions.SignIn)
  }

  return <>{children}</>
}
