import Link from "next/link"
import { useTranslations } from "../hooks/translations"
import {
  getRouteNameForLocale,
  Locale,
  RouteDefinitions,
} from "../utils/routes"
import { PlusSVG } from "../assets/styled-svgs/plus"
import { useRouter } from "next/router"
import { useMemo } from "react"

export const AddTicketButton = () => {
  const translations = useTranslations()
  const { locale } = useRouter()

  return (
    <Link href={RouteDefinitions.AddTicket} locale={locale}>
      <a className="w-full relative inline-flex justify-center items-center ml-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-amber-300 shadow-sm hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <PlusSVG />
        <span>{translations["/tickets/add"]}</span>
      </a>
    </Link>
  )
}
