import Link from "next/link"
import { Tooltip } from "@chakra-ui/react"
import { Tag } from "../../Tag"
import { Hand } from "../../hero-icons/Hand"
import React from "react"
import { RouteDefinitions } from "../../../utils/routes"
import { Ticket } from "../../../services/ticket.class"
import { useTranslations } from "../../../hooks/translations"
import { useRouter } from "next/router"
import { TicketDetailsType } from "../../../services/ticket.type"
import { LocationSection } from "./LocationSection"
import { SingleTicketFooter } from "./Footer"
import { LocationIcon, OrganizationIcon } from "./Icons"

type TicketsListSingleTicketProps = {
  ticket: TicketDetailsType
}

export const TicketsListSingleTicket = (
  props: TicketsListSingleTicketProps
) => {
  const { ticket } = props
  const router = useRouter()
  const translations = useTranslations()
  const { locale } = router

  const need = new Ticket(ticket)
  const dateFormatted = need.createdDateFormattedString

  const ticketUrl = RouteDefinitions.TicketDetails.replace(
    ":id",
    String(ticket.id)
  )

  console.log(need)

  return (
    <li
      key={ticket.id}
      className={`flex flex-col justify-between bg-white rounded-lg shadow outline-blue-200  col-span-1 divide-y divide-gray-200 ticket-item ${
        ticket.organization_id ? "verified" : ""
      }`}
    >
      <Link href={ticketUrl} locale={locale} passHref>
        <div className="px-4 py-5 border-gray-200 sm:px-6 cursor-pointer">
          <div className="mb-2 flex justify-between">
            <div className="flex items-center max-w-2xl mb-1 text-sm text-gray-400 space-x-1">
              {ticket.organization_id ? (
                <>
                  <Tooltip
                    label={translations.pages.ticket.verifiedOrganisation}
                  >
                    <OrganizationIcon />
                  </Tooltip>
                  <span className="ticket-item__number pr-1 text-blue-400 font-medium">
                    #{ticket.id}
                  </span>
                </>
              ) : (
                <span className="pr-1 my-1 font-medium">#{ticket.id}</span>
              )}
              <span className="">
                {need.tags.map((tag) => {
                  // TODO: move to ticket class
                  if (!tag || !tag.need_tag_id || !tag.need_tag_id.id) {
                    return null
                  }

                  return <Tag key={tag.need_tag_id.id} tag={tag.need_tag_id} />
                })}
              </span>
            </div>
            <div>
              {/* RESPONSES */}
              <span className="inline-flex">
                <Hand em="1.2em" /> {need.responsesLength}
              </span>
            </div>
          </div>

          {need.isTrip && <LocationSection trip={need.trip}></LocationSection>}

          <div className="py-1">
            {!need.isTrip && (
              <p className="text-xl font-medium text-gray-900 truncate">
                {need.title}
              </p>
            )}

            {ticket.where && !need.isTrip ? (
              <div className="flex items-center text-sm font-medium text-gray-400 truncate space-x-1">
                <LocationIcon />
                <span>{ticket.where}</span>
              </div>
            ) : (
              <div className="flex items-center text-sm font-medium text-gray-400 truncate space-x-1">
                {need.isTrip && <span className="w-5 h-5">{need.title}</span>}
              </div>
            )}
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-8">
            <div className="sm:col-span-1">
              <dt className="text-xs font-medium text-gray-400">
                {translations["pages"]["ticket"]["whoRequested"]}
              </dt>
              <dd className="flex items-center text-sm text-gray-900 truncate">
                {ticket.organization_id ? (
                  <span className="truncate">
                    {ticket.organization_id.name}
                  </span>
                ) : (
                  <span className="truncate">{ticket.who}</span>
                )}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="text-xs font-medium text-gray-400">
                {translations["pages"]["ticket"]["added"]}
              </dt>
              <dd className="text-sm text-gray-900 ">{dateFormatted}</dd>
            </div>
          </dl>
        </div>
      </Link>
      <SingleTicketFooter ticket={ticket} />
    </li>
  )
}
