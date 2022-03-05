import Link from "next/link"
import { useTranslations } from "../hooks/translations"
import { RouteDefinitions } from "../utils/routes"
import { PlusSVG } from "../assets/styled-svgs/plus"
import { useRouter } from "next/router"

export const AddTicketButton = () => {
  const translations = useTranslations()
  const { locale } = useRouter()

  return (
    <Link href={RouteDefinitions.AddTicket} locale={locale}>
      <a className="w-full relative inline-flex justify-center items-center ml-auto px-2 py-2 border border-transparent text-xs font-medium rounded-md text-black bg-amber-300 shadow-sm hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <PlusSVG />
        <span>{translations["/tickets/add"]}</span>
      </a>
    </Link>
  )
}
