import React from "react"
import { useTranslations } from "../../../hooks/translations"
import { Organization } from "../../hero-icons/Organization"

export const DetailsSection = ({ need }) => {
  const dateFormatted = need.createdDateFormattedString
  const translations = useTranslations()

  return (
    <div>
      <div className="flex items-center text-xs justify-around mt-2">
        {need.requester.verified && (
          <div className="flex items-center">
            <Organization />
            {translations.pages.ticket.verifiedOrganisation}
          </div>
        )}
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-8">
        <div className="sm:col-span-1">
          <dt className="text-xs font-medium text-gray-400">
            {translations["pages"]["ticket"]["whoRequested"]}
          </dt>
          <dd className="flex items-center text-sm text-gray-900 truncate">
            <span className="truncate">{need.requester.name}</span>
          </dd>
        </div>

        <div className="sm:col-span-1">
          <dt className="text-xs font-medium text-gray-400">
            {translations["pages"]["ticket"]["added"]}
          </dt>
          <dd className="text-sm text-gray-900 ">{dateFormatted}</dd>
        </div>
      </dl>
    </div>
  )
}
