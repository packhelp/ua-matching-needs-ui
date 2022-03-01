import React, { useEffect } from "react"
import {
  chakra,
  Flex,
  IconButton,
  Box,
  Stack,
  useColorModeValue,
  useDisclosure,
  Link,
} from "@chakra-ui/react"
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { NavigationLinks } from "./NavigationLinks"
import { Logo } from "./Logo"
import { RouteDefinitions } from "../../utils/routes"
import { useRouter } from "next/router"
import { UserInfo } from "./UserInfo"

export const HeaderNavigation = () => {
  const bg = useColorModeValue("white", "blue.500")

  const { isOpen = false, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = router.events.on(
      "routeChangeStart",
      (url, { shallow }) => {
        onClose()
      }
    )
  }, [])

  return (
    <>
      <nav className="bg-white shadow sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="-ml-2 mr-2 flex items-center md:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  onClick={isOpen ? onClose : onOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen && (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                  {isOpen && (
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <div className="flex-shrink-0 flex items-center">
                <Logo />
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <NavigationLinks type={"desktop"} />
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a
                  href={RouteDefinitions.AddTicket}
                  className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-amber-300 shadow-sm hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Zgłoś potrzebę</span>
                </a>
              </div>
              <UserInfo />
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="pt-2 pb-3 space-y-1">
              <NavigationLinks type={"mobile"} />
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

const Desktop = () => {
  return (
    <Flex
      justifyContent={"strech"}
      alignContent={"center"}
      alignItems={"center"}
      textAlign={"center"}
      display={{ base: "none", sm: "none", lg: "flex" }}
    >
      <Link href={RouteDefinitions.Main}>
        <Logo />
      </Link>
      <div style={{ flex: 1, margin: "0 16px" }}>
        <NavigationLinks />
      </div>
    </Flex>
  )
}
