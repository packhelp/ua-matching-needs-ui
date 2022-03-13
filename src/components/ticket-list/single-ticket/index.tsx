import React from "react"
import Link from "next/link"
import { Ticket } from "../../../services/ticket.class"
import { useRouter } from "next/router"
import { TicketDetailsType } from "../../../services/ticket.type"

import { HeaderSection } from "./HeaderSection"
import { LocationSection } from "./LocationSection"
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
      className={`flex flex-col justify-between bg-white rounded-lg shadow outline-blue-200  col-span-1 divide-y divide-gray-200 ticket-item ${
        need.requester.verified ? "verified" : ""
      }`}
    >
      <Link href={need.url} locale={locale} passHref>
        <div className="px-4 py-5 border-gray-200 sm:px-6 cursor-pointer">
          <HeaderSection need={need} />
          {isTrip && <LocationSection trip={need.trip} />}
          {isHousing && <HousingSection need={need.getHousing} />}
          <TitleSection need={need} />
          <DetailsSection need={need} />
        </div>
      </Link>
      <FooterSection need={need} />
    </li>
  )
}
