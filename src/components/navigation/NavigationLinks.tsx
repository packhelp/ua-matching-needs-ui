import {
  Button,
  Flex,
  HStack,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react"
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
    <>
      <HStack
        justifyContent="space-between"
        display={{ base: "none", lg: "flex" }}
      >
        <HStack spacing={2} alignItems="center">
          <NavigationLink
            route={RouteDefinitions.AllActiveTickets}
            buttonType="primary"
          />
          <NavigationLink
            route={RouteDefinitions.AddTicket}
            buttonType="secondary"
          />
        </HStack>
        <HStack spacing={2} alignItems="center">
          {isLogged && (
            <>
              <NavigationLink route={RouteDefinitions.MyActiveTickets} />
              <NavigationLink route={RouteDefinitions.MyInactiveTickets} />
            </>
          )}
          {!isLogged && <NavigationLink route={RouteDefinitions.SignIn} />}
          {isLogged && (
            <Button size="sm" variant={"ghost"} onClick={onSignOut}>
              {translations[finalLocale]["sign-out"]}
            </Button>
          )}
          <NavigationLink route={RouteDefinitions.Contact} />
        </HStack>
      </HStack>
      <Flex
        flexDirection="column"
        marginTop="16px"
        justifyContent={"space-between"}
        display={{ base: "flex", lg: "none" }}
      >
        <Flex flexDirection="column">
          <NavigationLink
            route={RouteDefinitions.AllActiveTickets}
            buttonType="primary"
          />
          <NavigationLink
            route={RouteDefinitions.AddTicket}
            buttonType="secondary"
          />
        </Flex>
        <Flex flexDirection="column">
          {isLogged && (
            <>
              <NavigationLink route={RouteDefinitions.MyActiveTickets} />
              <NavigationLink route={RouteDefinitions.MyInactiveTickets} />
            </>
          )}
          {!isLogged && <NavigationLink route={RouteDefinitions.SignIn} />}
          {isLogged && (
            <Button size="sm" variant={"ghost"} onClick={onSignOut}>
              {translations[finalLocale]["sign-out"]}
            </Button>
          )}
          <NavigationLink route={RouteDefinitions.Contact} />
        </Flex>
      </Flex>
    </>
  )
}
