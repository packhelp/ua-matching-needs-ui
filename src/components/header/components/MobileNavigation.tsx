import { Box, useDisclosure } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useCallback, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { userIsLoggedIn } from "../../../hooks/is-logged"
import { useRouteChanged } from "../../../hooks/root-changed"
import { useTranslations } from "../../../hooks/translations"
import Link from "next/link"
import { getRouteNameForLocale, RouteDefinitions } from "../../../utils/routes"
import {
  Locale,
  LocaleFlags,
  LocaleNames,
  locales,
} from "../../../translations/definitions"
import { CloseSVG } from "../../../assets/styled-svgs/close"
import { HamburgerSVG } from "../../../assets/styled-svgs/hamburger"
import { signOut } from "next-auth/react"
import { Image, Flex } from "@chakra-ui/react"

interface MobileNavigationElementProps {
  route: RouteDefinitions
}
interface MobileActiveNavigationElementProps {
  route: RouteDefinitions
  label: string
}
type MobileInactiveNavigationElementProps = MobileActiveNavigationElementProps

export const MobileNavigation = () => {
  const { isOpen = false, onOpen, onClose } = useDisclosure()
  const translations = useTranslations()

  useRouteChanged([onClose])

  const onClick = useCallback(() => {
    if (isOpen) {
      return onClose()
    }
    onOpen()
  }, [isOpen])

  return (
    <>
      <div className="flex items-center md:hidden">
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
          aria-controls="mobile-menu"
          aria-expanded="false"
          onClick={onClick}
        >
          <span className="sr-only">{translations.menu.open}</span>
          {!isOpen && <CloseSVG />}
          {isOpen && <HamburgerSVG />}
        </button>
      </div>
      <MobilePopup isOpen={isOpen} />
    </>
  )
}

const MobilePopup = ({ isOpen }: { isOpen: boolean }) => {
  const isLogged = userIsLoggedIn()
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
    <MobilePopupPortal>
      <div className="md:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          {!isLogged && (
            <MobileNavigationElement route={RouteDefinitions.SignIn} />
          )}
          <MobileNavigationElement route={RouteDefinitions.AllActiveTickets} />
          {isLogged && (
            <>
              <MobileNavigationElement
                route={RouteDefinitions.MyActiveTickets}
              />
              <MobileNavigationElement
                route={RouteDefinitions.MyInactiveTickets}
              />
            </>
          )}
          <MobileNavigationElement route={RouteDefinitions.Contact} />
          <MobileNavigationElement route={RouteDefinitions.Faq} />

          {isLogged && (
            <button
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6 text-left"
              onClick={onSignOut}
            >
              {translations["sign-out"]}
            </button>
          )}

          <Box borderTop="1px solid #dedede" paddingTop={1}>
            {locales.map((locale) => (
              <Link key={locale} href={router.asPath} locale={locale}>
                <a className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6">
                  <Flex>
                    <Box minWidth={"100px"}> {LocaleNames[locale]} </Box>
                    <Image
                      src={LocaleFlags[locale]}
                      alt={LocaleNames[locale]}
                      width={22}
                    />
                  </Flex>
                </a>
              </Link>
            ))}
          </Box>
        </div>
      </div>
    </MobilePopupPortal>
  )
}

const MobileNavigationElement = ({ route }: MobileNavigationElementProps) => {
  const { locale, asPath } = useRouter()

  const isActive = useMemo(() => asPath === route, [asPath, route])
  const label = useMemo(
    () => getRouteNameForLocale(route, locale as Locale),
    [route, locale]
  )

  if (isActive) {
    return <MobileActiveNavigationElement route={route} label={label} />
  }

  return <MobileInactiveNavigationElement route={route} label={label} />
}

const MobileActiveNavigationElement = ({
  route,
  label,
}: MobileActiveNavigationElementProps) => {
  return (
    <a
      href={route}
      className="bg-sky-100 border-sky-500 text-sky-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
    >
      {" "}
      {label}{" "}
    </a>
  )
}

const MobileInactiveNavigationElement = ({
  route,
  label,
}: MobileInactiveNavigationElementProps) => {
  return (
    <a
      href={route}
      className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
    >
      {" "}
      {label}{" "}
    </a>
  )
}

const MobilePopupPortal = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return mounted
    ? createPortal(children, document.querySelector("#mobile-menu-portal"))
    : null
}
