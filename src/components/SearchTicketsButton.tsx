import { useTranslations } from "../hooks/translations"
import { RouteDefinitions } from "../utils/routes"
import { SearchSVG } from "../assets/styled-svgs/search"

export const SearchTicketsButton = () => {
  const translations = useTranslations()

  return (
    <a
      href={RouteDefinitions.AllActiveTickets}
      className="w-full relative inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <SearchSVG />
      <span className="pl-2">{translations["pages"]["main"]["show-all-button"]}</span>
    </a>
  )
}