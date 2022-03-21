import React from "react"
import Link from "next/link"
import { Ticket } from "../../../services/ticket.class"
import { useRouter } from "next/router"
import { TicketDetailsType } from "../../../services/ticket.type"

import { HeaderSection } from "./HeaderSection"
import { LocationSection, SingleLocationSection } from "./LocationSection"
import { HousingSection } from "./HousingSection"
import { TitleSection } from "./TitleSection"
import { DetailsSection } from "./DetailsSection"
import { FooterSection } from "./FooterSection"

type TicketsListSingleTicketProps = {
  ticket: TicketDetailsType
}

export const TicketsListSingleTicket = (
  props: TicketsListSingleTicketProps
) => {
  const { ticket } = props
  const router = useRouter()
  const { locale } = router

  const need = new Ticket(ticket)
  const isTrip = need.isTrip
  const isHousing = need.isHousing
  return (
    <li
      key={ticket.id}
      className="flex flex-col justify-between bg-white rounded-lg shadow outline-blue-200  col-span-1 divide-y divide-gray-200 ticket-item"
    >
      <Link href={need.url} locale={locale} passHref>
        <div className="p-4 border-gray-200 cursor-pointer h-full flex flex-col justify-between">
          <div>
            <HeaderSection need={need} />
            <TitleSection need={need} />
            {isTrip && (
              <LocationSection
                clickable={false}
                trip={need.trip}
                needId={need.id}
                s
              />
            )}

            {!need.isTrip && need.whereDestination && (
              <SingleLocationSection
                location={need.whereDestination}
                needId={need.id}
              />
            )}
            {isHousing && <HousingSection need={need.getHousing} />}
          </div>
          <DetailsSection need={need} />
        </div>
      </Link>
      <FooterSection need={need} />
    </li>
  )
}
