import React from "react"
import { useTranslations } from "../../hooks/translations"
import { SearchTicketsButton } from "../SearchTicketsButton"

export const TicketTypeOffer = () => {
  const translations = useTranslations()
  return (
    <div>
      <h4 className="mt-16 mb-4 text-center b-4 text-md font-semibold text-gray-900 dark:text-white">
        {translations["addTicket"]["offer"]["title"]}
      </h4>
      <div className="pb-8 w-64 my-0 mx-auto">
        <SearchTicketsButton />
      </div>
      <div>
        <p className="text-sm font-semibold my-4">
          {translations["addTicket"]["offer"]["howToFilter"]}
        </p>
        <p className="text-sm font-semibold my-4">
          {translations["addTicket"]["offer"]["chooseCategory"]}
        </p>
        <p className="text-sm font-semibold my-4">
          {translations["addTicket"]["offer"]["youCanAlsoApply"]}
        </p>
      </div>
    </div>
  )
}