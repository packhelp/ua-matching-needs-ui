import React from "react"
import { useTranslations } from "../../hooks/translations"

export const TicketTypeOffer = () => {
  const translations = useTranslations()
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
        {translations["addTicket"]["offer"]["title"]}
      </h4>
      <p>
        {translations["addTicket"]["offer"]["howToFilter"]}
      </p>
      <p>
        {translations["addTicket"]["offer"]["chooseCategory"]}
      </p>
      <p>
        {translations["addTicket"]["offer"]["youCanAlsoApply"]}
      </p>
    </div>
  )
}