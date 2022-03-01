import React from "react"
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
  buttonType?: "primary" | "secondary"
}

export const NavigationLink = (props: NavigationLinkProps) => {
  const { route, buttonType } = props
  const { locale, asPath } = useRouter()

  const currentLocale = locale as Locale

  const isRouteActive = asPath === route

  const colorScheme =
    buttonType === "secondary" ? "yellow" :
    buttonType === "primary" ? "blue" :
    route === RouteDefinitions.Contact ? "blue" :
      undefined

  const icon =
    buttonType === "secondary" ? <AddIcon /> :
      buttonType === "primary" ? <SearchIcon /> :
        undefined

  return (
    <Link href={route}>
      <Button
        colorScheme={colorScheme}
        size="sm"
        variant={isRouteActive || buttonType ? "solid" : "ghost"}
        leftIcon={icon}
        margin={useBreakpointValue({ base: "8px 0 0 0", sm: "0 8px 0 0" })}
      >
        {getRouteNameForLocale(route, currentLocale)}
      </Button>
    </Link>
  )
}
