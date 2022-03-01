import React from "react"
import Link from "next/link"
import { Button } from "@chakra-ui/react"
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
  buttonType?: "show-all" | "add-new"
}
// <Link href={RouteDefinitions.AllActiveTickets}>
//   <Button
//     leftIcon={<SearchIcon />}
//     variant="solid"
//     size="lg"
//     colorScheme="blue"
//   >
//     {pageTranslations["show-all-button"]}
//   </Button>
// </Link>
export const NavigationLink = (props: NavigationLinkProps) => {
  const { route, buttonType } = props
  const { locale, asPath } = useRouter()

  const currentLocale = locale as Locale

  const isRouteActive = asPath === route

  const colorScheme =
    buttonType === "add-new" ? "yellow" :
    buttonType === "show-all" ? "blue" :
    route === RouteDefinitions.Contact ? "blue" :
      undefined

  const icon =
    buttonType === "add-new" ? <AddIcon /> :
      buttonType === "show-all" ? <SearchIcon /> :
        undefined

  return (
    <Link href={route}>
      <Button
        colorScheme={colorScheme}
        size="sm"
        variant={isRouteActive || buttonType ? "solid" : "ghost"}
        mr="10px"
        leftIcon={icon}
      >
        {getRouteNameForLocale(route, currentLocale)}
      </Button>
    </Link>
  )
}
