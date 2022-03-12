import React from "react"
import { LocationTagHtml } from "../../LocationTag"
import { NeedTransport } from "../../../services/ticket.class"
import { useTagTranslation } from "../../../hooks/useTagTranslation"
import truncate from "truncate"

type TicketsListSingleTicketProps = {
  trip: NeedTransport
}

export const LocationSection = ({ trip }: TicketsListSingleTicketProps) => {
  const { getTranslation } = useTagTranslation()
  const from = trip.fromTag ? getTranslation(trip.fromTag) : null
  const to = trip.toTag ? getTranslation(trip.toTag) : null

  return (
    <div className="flex justify-around border-t border-b border-gray-200 bg-slate-50 px-4 py-5 p-1">
      {from && (
        <LocationTagHtml bgColor="#dedcd6">
          {truncate(from, 15)}
        </LocationTagHtml>
      )}
      <span> ➜ </span>
      {to && (
        <LocationTagHtml bgColor="#dedcd6">{truncate(to, 15)} </LocationTagHtml>
      )}
    </div>
  )
}
