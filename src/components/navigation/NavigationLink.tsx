import React, { useEffect, useMemo } from "react"
import Link from "next/link"
import { Button, useBreakpointValue } from "@chakra-ui/react"
import {
  getRouteNameForLocale,
  Locale,
  RouteDefinitions,
  Routes,
} from "../../utils/routes"
import { useRouter } from "next/router"
import { AddIcon, SearchIcon } from "@chakra-ui/icons"

type NavigationLinkProps = {
  route: Routes
  key?: string
  isMobile?: boolean
  buttonType?: "primary" | "secondary"
}

export const NavigationLink = (props: NavigationLinkProps) => {
  const { route, buttonType, isMobile, key } = props
  const { locale, asPath } = useRouter()

  const currentLocale = locale as Locale

  const isRouteActive = asPath === route

  const colorScheme =
    buttonType === "secondary"
      ? "yellow"
      : buttonType === "primary"
      ? "blue"
      : route === RouteDefinitions.Contact
      ? "blue"
      : undefined

  const icon =
    buttonType === "secondary" ? (
      <AddIcon />
    ) : buttonType === "primary" ? (
      <SearchIcon />
    ) : undefined

  const classList = useMemo(() => {
    if (isRouteActive) {
      if (isMobile) {
        return "bg-sky-100 border-sky-500 text-sky-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
      }
      return "border-sky-500 text-gray-900 inline-flex items-center px-2 pt-1 text-sm font-medium border-b-2 px-4"
    }
    if (isMobile) {
      return "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
    }
    return "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-2 pt-1 border-b-2 text-sm font-medium"
  }, [isRouteActive, isMobile])

  return (
    <a href={route} className={classList} key={key}>
      {" "}
      {getRouteNameForLocale(route, currentLocale)}{" "}
    </a>
  )
}
