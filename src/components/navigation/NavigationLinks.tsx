import { Button, Flex, useBreakpointValue } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { useMemo } from "react"
import { useFinalLocale } from "../../hooks/final-locale"
import { getUserInfo, signOut } from "../../services/auth"
import { RouteDefinitions } from "../../utils/routes"
import { translations } from "../../utils/translations"
import { NavigationLink } from "./NavigationLink"

export interface NavigationLinksProps {
  type: "desktop" | "mobile"
}

export const NavigationLinks = ({ type }: NavigationLinksProps) => {
  const isLogged = getUserInfo()
  const finalLocale = useFinalLocale()
  const router = useRouter()
  const onSignOut = () => {
    if (signOut()) {
      router.push(RouteDefinitions.SignIn)
    }
  }

  const isMobileMenu = useMemo(() => type === "mobile", [type])

  return (
    <div className={!isMobileMenu ? "flex" : ""}>
      {!isLogged && (
        <NavigationLink
          route={RouteDefinitions.SignIn}
          isMobile={isMobileMenu}
        />
      )}
      <NavigationLink
        route={RouteDefinitions.AllActiveTickets}
        isMobile={isMobileMenu}
      />
      {isLogged && isMobileMenu && (
        <>
          <NavigationLink
            route={RouteDefinitions.MyActiveTickets}
            isMobile={isMobileMenu}
          />
          <NavigationLink
            route={RouteDefinitions.MyInactiveTickets}
            isMobile={isMobileMenu}
          />
        </>
      )}
      <NavigationLink
        route={RouteDefinitions.Contact}
        isMobile={isMobileMenu}
      />
      {isLogged && isMobileMenu && (
        <button
          className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6 text-left"
          onClick={onSignOut}
        >
          {translations[finalLocale]["sign-out"]}
        </button>
      )}
    </div>
  )
}
