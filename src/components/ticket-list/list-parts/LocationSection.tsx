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
    <div className="flex justify-around border-t border-b border-gray-200 bg-slate-50 px-4 py-5 p-1">
      {from && <LocationTagHtml bgColor="#dedcd6">{from} </LocationTagHtml>}
      <span> ➜ </span>
      {to && <LocationTagHtml bgColor="#dedcd6">{to} </LocationTagHtml>}
    </div>
  )
}
