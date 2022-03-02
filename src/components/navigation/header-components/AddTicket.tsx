import { useTranslations } from "../../../hooks/translations"
import { RouteDefinitions } from "../../../utils/routes"
import { PlusSVG } from "./styled-svgs/plus"

export const AddTicket = () => {
  const translations = useTranslations()

  return (
    <div className="flex-shrink-0">
      <a
        href={RouteDefinitions.AddTicket}
        className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-amber-300 shadow-sm hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PlusSVG />
        <span>{translations["/tickets/add"]}</span>
      </a>
    </div>
  )
}
