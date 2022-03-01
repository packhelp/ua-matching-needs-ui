import { Button, Flex, useBreakpointValue } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { useFinalLocale } from "../../hooks/final-locale"
import { getUserInfo, signOut } from "../../services/auth"
import { RouteDefinitions } from "../../utils/routes"
import { translations } from "../../utils/translations"
import { NavigationLink } from "./NavigationLink"

export const NavigationLinks = () => {
  const isLogged = getUserInfo()
  const finalLocale = useFinalLocale()
  const router = useRouter()
  const onSignOut = () => {
    if (signOut()) {
      router.push(RouteDefinitions.SignIn)
    }
  }

  return (
    <Flex
      flexDirection={useBreakpointValue({ base: "column", sm: undefined })}
      marginTop={useBreakpointValue({ base: "16px", sm: undefined })}
      justifyContent={ "space-between" }
    >
      <Flex flexDirection={useBreakpointValue({ base: "column", sm: undefined })}>
        <NavigationLink route={RouteDefinitions.AllActiveTickets} buttonType="primary" />
        <NavigationLink route={RouteDefinitions.AddTicket} buttonType="secondary" />
      </Flex>
      <Flex flexDirection={useBreakpointValue({ base: "column", sm: undefined })}>
        {isLogged && (
          <>
            <NavigationLink route={RouteDefinitions.MyActiveTickets} />
            <NavigationLink route={RouteDefinitions.MyInactiveTickets} />
          </>
        )}
        {!isLogged && <NavigationLink route={RouteDefinitions.SignIn} />}
        {isLogged && (
          <Button
            size="sm"
            variant={"ghost"}
            onClick={onSignOut}
          >
            {translations[finalLocale]["sign-out"]}
          </Button>
        )}
        <NavigationLink route={RouteDefinitions.Contact} />
      </Flex>
    </Flex>
  )
}
