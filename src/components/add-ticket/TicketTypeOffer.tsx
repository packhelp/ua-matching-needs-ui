import React from "react"
import { useTranslations } from "../../hooks/translations"
import { SearchTicketsButton } from "../SearchTicketsButton"

export const TicketTypeOffer = () => {
  const translations = useTranslations()
  return (
    <div className="my-8">
      <h4 className="pt-8 mb-4 text-center b-4 text-md font-semibold text-gray-900 dark:text-black">
        {translations["addTicket"]["offer"]["title"]}
      </h4>
      <div className="pb-8 w-64 my-0 mx-auto">
        <SearchTicketsButton />
      </div>
    </div>
  )
}
