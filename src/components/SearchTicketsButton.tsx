import { useTranslations } from "../hooks/translations"
import { RouteDefinitions } from "../utils/routes"
import { SearchSVG } from "../assets/styled-svgs/search"
import { useRouter } from "next/router"
import Link from "next/link"

export const SearchTicketsButton = () => {
  const { locale } = useRouter()
  const translations = useTranslations()
  return (
    <Link href={RouteDefinitions.AllActiveTickets} locale={locale}>
      <a className="w-full relative inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <SearchSVG />
        <span className="pl-2">
          {translations["pages"]["main"]["show-all-button"]}
        </span>
      </a>
    </Link>
  )
}
