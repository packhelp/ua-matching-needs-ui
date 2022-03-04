import Link from "next/link"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { userIsLoggedIn } from "../../../hooks/is-logged"
import {
  getRouteNameForLocale,
  Locale,
  RouteDefinitions,
} from "../../../utils/routes"

interface DesktopNavigationElementProps {
  route: RouteDefinitions
}
interface DesktopActiveNavigationElementProps {
  route: RouteDefinitions
  label: string
}
type DesktopInactiveNavigationElementProps = DesktopActiveNavigationElementProps

export const DesktopNavigation = () => {
  return (
    <div className="hidden md:ml-6 md:flex md:space-x-8 h-full">
      <DesktopNavigationElement route={RouteDefinitions.AllActiveTickets} />
      <DesktopNavigationElement route={RouteDefinitions.Contact} />
      {/*<DesktopNavigationElement route={RouteDefinitions.Faq} />*/}
    </div>
  )
}

export const DesktopNavigationElement = ({
  route,
}: DesktopNavigationElementProps) => {
  const { locale, asPath } = useRouter()

  const isActive = useMemo(() => asPath === route, [asPath, route])
  const label = useMemo(
    () => getRouteNameForLocale(route, locale as Locale),
    [route, locale]
  )

  if (isActive) {
    return <DesktopActiveNavigationElement route={route} label={label} />
  }

  return <DesktopInactiveNavigationElement route={route} label={label} />
}

const DesktopActiveNavigationElement = ({
  route,
  label,
}: DesktopActiveNavigationElementProps) => {
  const { locale } = useRouter()
  return (
    <Link href={route} locale={locale}>
      <a
        href={route}
        className="border-sky-500 text-gray-900 inline-flex items-center px-2 pt-1 text-sm font-medium border-b-2 px-4"
      >
        {" "}
        {label}{" "}
      </a>
    </Link>
  )
}

const DesktopInactiveNavigationElement = ({
  route,
  label,
}: DesktopInactiveNavigationElementProps) => {
  const { locale } = useRouter()

  return (
    <Link href={route} locale={locale}>
      <a className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-2 pt-1 border-b-2 text-sm font-medium">
        {" "}
        {label}{" "}
      </a>
    </Link>
  )
}
