import React from "react"
import { RouteDefinitions } from "../../utils/routes"
import { NavigationLink } from "./NavigationLink"

export const NavigationLinks = () => {
  return (
    <>
      <NavigationLink route={RouteDefinitions.AllActiveTickets} />
      <NavigationLink route={RouteDefinitions.AddTicket} />
      <NavigationLink route={RouteDefinitions.MyActiveTickets} />
      <NavigationLink route={RouteDefinitions.MyInactiveTickets} />
    </>
  )
}
