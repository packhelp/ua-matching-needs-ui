import React from "react"
import { useRouter } from "next/router"
import { LocationTagHtml } from "../../LocationTag"
import { NeedTransport } from "../../../services/ticket.class"

type TicketsListSingleTicketProps = {
  trip: NeedTransport
}

export const LocationSection = ({ trip }: TicketsListSingleTicketProps) => {
  const router = useRouter()

  return (
    <div className="py-1">
      <LocationTagHtml>{trip.fromTag?.name} </LocationTagHtml> {" -> "}
      <LocationTagHtml>{trip.toTag?.name} </LocationTagHtml>
    </div>
  )
}
