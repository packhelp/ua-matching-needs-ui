import React from "react"
import { useTranslations } from "../../hooks/translations"
import { TicketDetailsType } from "../../services/ticket.type"
import styles from "./SingleTicketHeader.module.scss"
import {
  LocationSection,
  SingleLocationSection,
} from "../ticket-list/single-ticket/LocationSection"
import { Ticket } from "../../services/ticket.class"
import { LocationTagHtml } from "../LocationTag"

type SingleTicketHeaderProps = {
  ticket: TicketDetailsType
}

export const SingleTicketHeader = (props: SingleTicketHeaderProps) => {
  const { ticket } = props
  const need = new Ticket(ticket)
  const translations = useTranslations()
  return (
    <>
      <div className={styles.header}>
        <div className={styles.info}>
          <span className="text-xs font-medium text-gray-500">
            {translations["pages"]["ticket"]["needNumber"]} #{ticket.id}
          </span>
          {ticket.organization_id && (
            <div className={styles.verified}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs font-medium">
                {translations["pages"]["ticket"]["verifiedOrganisation"]}
              </span>
            </div>
          )}
        </div>
        <h2
          id="applicant-information-title"
          className="leading-9 font-medium truncate"
        >
          {need.title}
        </h2>
      </div>

      {need.isTrip && (
        <LocationSection clickable={true} trip={need.trip} needId={need.id} />
      )}

      {!need.isTrip && need.whereDestination && (
        <SingleLocationSection
          location={need.whereDestination}
          needId={need.id}
          clickable={true}
        />
      )}

      <div>
        {!need.isActive && (
          <div className="rounded-md mt-4 bg-red-200 p-4">
            <div className="flex">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="rgb(153 27 27)"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-sm font-medium text-red-800 uppercase">
                {translations["pages"]["ticket"]["warningTicketExpired"]}
              </h3>
            </div>
            <div className="ml-3">
              <div className="mt-2 text-sm text-red-800">
                <ul role="list" className="list-disc pl-5 space-y-1">
                  <li>
                    {
                      translations["pages"]["ticket"][
                        "ticketExpiresAfterSetTime"
                      ]
                    }
                  </li>
                  <li>
                    {
                      translations["pages"]["ticket"][
                        "requesterCanExpireTicketAtAnyTime"
                      ]
                    }
                  </li>
                  <li>
                    {
                      translations["pages"]["ticket"][
                        "lookForAnotherTicketThanksForHelp"
                      ]
                    }
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
