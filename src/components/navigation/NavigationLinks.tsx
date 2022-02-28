import React from "react"
import { getUserInfo } from "../../services/auth"
import { RouteDefinitions } from "../../utils/routes"
import { NavigationLink } from "./NavigationLink"

export const NavigationLinks = () => {
  const isLogged = getUserInfo()
  return (
    <>
      <NavigationLink route={RouteDefinitions.AllActiveTickets} />
      {isLogged && (
        <>
          <NavigationLink route={RouteDefinitions.AddTicket} />
          <NavigationLink route={RouteDefinitions.MyActiveTickets} />
          <NavigationLink route={RouteDefinitions.MyInactiveTickets} />
        </>
      )}
      {!isLogged && <NavigationLink route={RouteDefinitions.SignIn} />}
    </>
  )
}
