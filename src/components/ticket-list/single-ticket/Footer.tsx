import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslations } from "../../../hooks/translations"
import { Plausible } from "../../../services/plausible"
import { RouteDefinitions } from "../../../utils/routes"
import { ArrowRightIcon, PhoneIcon } from "./Icons"

export const SingleTicketFooter = ({ ticket }) => {
  const router = useRouter()
  const translations = useTranslations()
  const { locale } = router

  const ticketUrl = RouteDefinitions.TicketDetails.replace(
    ":id",
    String(ticket.id)
  )

  return (
    <div className="flex -mt-px divide-x divide-gray-200">
      <div className="flex flex-1 w-0">
        <Link href={ticketUrl} locale={locale}>
          <a className="relative inline-flex items-center justify-center flex-1 w-0 py-3 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500">
            <ArrowRightIcon />

            <span className="ml-3">
              {translations["pages"]["ticket"]["details"]}
            </span>
          </a>
        </Link>
      </div>

      {ticket.phone_public && (
        <div className="flex flex-1 w-0 -ml-px">
          <a
            href={`tel:${ticket.phone}`}
            onClick={Plausible.registerIntentionPhoneCall}
            className="relative inline-flex items-center justify-center flex-1 w-0 py-3 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg hover:text-gray-500"
          >
            <PhoneIcon />
            <span className="ml-3">{ticket.phone}</span>
          </a>
        </div>
      )}
    </div>
  )
}
