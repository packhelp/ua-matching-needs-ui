import React from "react"
import { useRouter } from "next/router"
import { LocationTagHtml } from "../../LocationTag"
import { NeedTransport } from "../../../services/ticket.class"
import { useTagTranslation } from "../../../hooks/useTagTranslation"

type TicketsListSingleTicketProps = {
  trip: NeedTransport
}

export const LocationSection = ({ trip }: TicketsListSingleTicketProps) => {
  const router = useRouter()
  const { getTranslation } = useTagTranslation()
  const from = trip.fromTag ? getTranslation(trip.fromTag) : null
  const to = trip.toTag ? getTranslation(trip.toTag) : null

  return (
    <div className="py-1">
      {from && <LocationTagHtml>{from} </LocationTagHtml>} {" -> "}
      {to && <LocationTagHtml>{to} </LocationTagHtml>}
    </div>
  )
}
