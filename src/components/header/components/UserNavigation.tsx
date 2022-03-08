import Link from "next/link"
import { useDisclosure } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useCallback, useMemo } from "react"
import { DesktopNavigationElement } from "./DesktopNavigation"
import { userIsLoggedIn } from "../../../hooks/is-logged"
import { useRouteChanged } from "../../../hooks/root-changed"
import { useTranslations } from "../../../hooks/translations"
import { getRouteNameForLocale, RouteDefinitions } from "../../../utils/routes"
import { UserSVG } from "../../../assets/styled-svgs/user"
import { signOut } from "next-auth/react"

interface UserNavigationElementPropsWithRoute {
  route: RouteDefinitions
  label: string
}
interface UserNavigationElementPropsWithOnClick {
  onClick: () => void
  label: string
}
type UserNavigationElementProps =
  | UserNavigationElementPropsWithRoute
  | UserNavigationElementPropsWithOnClick

export const UserNavigation = () => {
  const isLogged = userIsLoggedIn()
  const { isOpen = false, onOpen, onClose } = useDisclosure()

  useRouteChanged([onClose])

  const onClick = useCallback(() => {
    if (isOpen) {
      return onClose()
    }
    onOpen()
  }, [isOpen])

  return (
    <div className="hidden md:flex-shrink-0 md:flex md:items-center h-full">
      <div className="ml-3 relative h-full flex">
        {isLogged ? (
          <button
            onClick={onClick}
            type="button"
            className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <UserSVG />
          </button>
        ) : (
          <DesktopNavigationElement route={RouteDefinitions.SignIn} />
        )}
        <UserPopup isOpen={isOpen} />
      </div>
    </div>
  )
}

const UserPopup = ({ isOpen }: { isOpen: boolean }) => {
  const translations = useTranslations()
  const router = useRouter()

  const onSignOut = async () => {
    if (await signOut()) {
      await router.push(RouteDefinitions.SignIn)
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="origin-top-right absolute top-12 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
    >
      <UserNavigationElement
        route={RouteDefinitions.MyActiveTickets}
        label={getRouteNameForLocale(
          RouteDefinitions.MyActiveTickets,
          router.locale as any
        )}
      />
      <UserNavigationElement
        route={RouteDefinitions.MyInactiveTickets}
        label={getRouteNameForLocale(
          RouteDefinitions.MyInactiveTickets,
          router.locale as any
        )}
      />
      <UserNavigationElement
        route={RouteDefinitions.MyClaimedTickets}
        label={getRouteNameForLocale(
          RouteDefinitions.MyClaimedTickets,
          router.locale as any
        )}
      />
      <UserNavigationElement
        onClick={onSignOut}
        label={translations["sign-out"]}
      />
    </div>
  )
}

const UserNavigationElement = (props: UserNavigationElementProps) => {
  const { locale } = useRouter()

  const { route, onClick } = useMemo(() => {
    if ({}.hasOwnProperty.call(props, "route")) {
      return {
        ...(props as UserNavigationElementPropsWithRoute),
        onClick: undefined,
      }
    }

    return {
      ...(props as UserNavigationElementPropsWithOnClick),
      route: "#",
    }
  }, [props])

  return (
    <Link href={route} locale={locale}>
      <a
        onClick={onClick}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        role="menuitem"
      >
        {props.label}
      </a>
    </Link>
  )
}
