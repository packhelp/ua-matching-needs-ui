import { useDisclosure } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useFinalLocale } from "../../hooks/final-locale"
import { getUserInfo, signOut } from "../../services/auth"
import { getRouteNameForLocale, RouteDefinitions } from "../../utils/routes"
import { translations } from "../../utils/translations"

export const UserInfo = () => {
  const isLogged = getUserInfo()
  const router = useRouter()
  const finalLocale = useFinalLocale()

  const { isOpen = false, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const unsubscribe = router.events.on(
      "routeChangeStart",
      (url, { shallow }) => {
        onClose()
      }
    )
  }, [])
  const onSignOut = () => {
    if (signOut()) {
      router.push(RouteDefinitions.SignIn)
    }
  }
  if (!isLogged) {
    return null
  }

  return (
    <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
      <div className="ml-3 relative">
        <div>
          <button
            onClick={isOpen ? onClose : onOpen}
            type="button"
            className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabindex="-1"
          >
            <a
              href={RouteDefinitions.MyActiveTickets}
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-0"
            >
              {getRouteNameForLocale(RouteDefinitions.MyActiveTickets)}
            </a>
            <a
              href={RouteDefinitions.MyInactiveTickets}
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-1"
            >
              {getRouteNameForLocale(RouteDefinitions.MyInactiveTickets)}
            </a>
            <a
              onClick={onSignOut}
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-2"
            >
              {translations[finalLocale]["sign-out"]}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
