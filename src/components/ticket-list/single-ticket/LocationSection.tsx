import React from "react"
import { LocationTagHtml } from "../../LocationTag"
import { NeedTransport } from "../../../services/ticket.class"
import truncate from "truncate"

type TicketsListSingleTicketProps = {
  trip: NeedTransport
}

export const LocationSection = ({ trip }: TicketsListSingleTicketProps) => {
  const from = trip.fromTag ? trip.fromTag.place_name : null
  const to = trip.toTag ? trip.toTag.place_name : null

  return (
    <div className="flex justify-around border-t border-b border-gray-200 bg-slate-50 px-4 py-5 p-1 flex-col items-center">
      {from && <LocationTagHtml bgColor="#dedcd6">{from}</LocationTagHtml>}
      <span> ↓ </span>
      {to && <LocationTagHtml bgColor="#dedcd6">{to} </LocationTagHtml>}
    </div>
  )
}
