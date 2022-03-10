import React from "react"
import { useTranslations } from "../../hooks/translations"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { useMutation } from "react-query"
import NextError from "next/error"
import axios from "axios"
import { RouteDefinitions } from "../../utils/routes"
import { TicketDetailsType } from "../../services/ticket.type"
import { ReportTicket } from "./ReportTicket"
import { useUserIsLoggedIn } from "../../hooks/is-logged"
import { Ticket } from "../../services/ticket.class"
import { Hand } from "../hero-icons/Hand"

type SingleTicketFooterProps = {
  ticket: TicketDetailsType
}

export const SingleTicketFooter = (props: SingleTicketFooterProps) => {
  const { ticket } = props
  const { data: authSession } = useSession()
  const router = useRouter()
  const translations = useTranslations()
  const isLogged = useUserIsLoggedIn()

  const { id } = router.query

  const removeTicketMutation = useMutation<number, NextError, number>(
    (id: number) => {
      return axios.post(`/api/remove-ticket`, { id: id })
    },
    {
      onSuccess: () => {
        toast.success(translations["pages"]["ticket"]["ticketRemovedAddNew"])
        return router.push(RouteDefinitions.AddTicket)
      },
    }
  )

  const markSolvedTicketMutation = useMutation<number, NextError, number>(
    (id: number) => {
      return axios.patch(`/api/set-ticket-to-solved`, {
        id: id,
      })
    },
    {
      onSuccess: () => {
        toast.success(translations["pages"]["ticket"]["ticketSolvedAddNew"])
        return router.push(RouteDefinitions.AddTicket)
      },
    }
  )

  const markClaimedTicketMutation = useMutation<number, NextError, number>(
    (id: number) => {
      return axios.post(`/api/add-need-response`, {
        id: id,
        date_claimed: Date.now(),
      })
    },
    {
      onSuccess: () => {
        toast.success(translations["pages"]["ticket"]["ticketClaimed"])
        return router.push(
          RouteDefinitions.TicketDetails.replace(":id", String(id))
        )
      },
      onError: () => {
        toast.error(translations["pages"]["ticket"]["errorOnClaim"])
      },
    }
  )

  const markAsSolvedTicket = () => {
    if (id) {
      markSolvedTicketMutation.mutate(Number(id))
    } else {
      toast.error(translations["pages"]["ticket"]["errorOnRemove"])
    }
  }

  const removeTicket = () => {
    if (id) {
      removeTicketMutation.mutate(Number(id))
    } else {
      toast.error(translations["pages"]["ticket"]["errorOnRemove"])
    }
  }

  const markAsCalimedTicket = () => {
    if (id) {
      markClaimedTicketMutation.mutate(Number(id))
    } else {
      toast.error(translations["pages"]["ticket"]["errorOnClaim"])
    }
  }

  const claimTicket = () => {
    if (isLogged) {
      markAsCalimedTicket()
    } else {
      router.push({
        pathname: RouteDefinitions.SignIn,
        query: {
          returnPath: RouteDefinitions.TicketDetails.replace(":id", String(id)),
        },
      })
    }
  }

  const isOwner = authSession?.phoneNumber === ticket.phone
  const need = new Ticket(ticket)
  const isActive = need.isActive

  /**
   *
   * HErere we shoudl add a new Extend button
   * pages/api/notify-deactivated.ts
   *
  const url = `${process.env.SERVER_URL}/api/extend-ticket?t=${token}`
  const shortenedUrl = await shortenUrl(url)
  // 94 symbold text + 36 symbols for URL
  const body = `[potrzeby-ua.org]: Twoje ogłoszenie #${id} się przedawniło, wejdź na stronę aby je przedłużyć: ${shortenedUrl}`
   extend_token: null,
      expiry_notified: false,

    expiry_notified: true,
      ticket_status: TICKET_STATUS.EXPIRED,
   *
   *
   */

  return (
    <div className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg">
      {isActive && (
        <>
          {ticket.phone_public && (
            <a
              href={`tel:${ticket.phone}`}
              className="inline-flex items-center w-full place-content-center
                rounded-md py-4 border border-transparent shadow-sm text-xl
                font-medium text-white bg-blue-600 hover:bg-blue-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                text-white"
            >
              {translations["pages"]["ticket"]["call"]} {ticket.phone}{" "}
              <svg
                className="ml-3 -mr-1 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.924 2.617a.997.997 0 00-.215-.322l-.004-.004A.997.997 0 0017 2h-4a1 1 0 100 2h1.586l-3.293 3.293a1 1 0 001.414 1.414L16 5.414V7a1 1 0 102 0V3a.997.997 0 00-.076-.383z" />
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </a>
          )}

          {!isOwner && (
            <div className="flex space-x-1 my-2 items-center justify-center">
              <button
                type="button"
                className="inline-flex items-center w-full place-content-center
                rounded-md py-4 border border-transparent shadow-sm text-xl
                font-medium text-white bg-green-600 hover:bg-green-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                text-white"
                onClick={claimTicket}
              >
                {translations["pages"]["ticket"]["claim"]}
              </button>
            </div>
          )}

          {isOwner && (
            <div className="px-2 py-4 text-center">
              <span className="text-sm mr-2 text-gray-500 font-medium">
                {translations["pages"]["ticket"]["areYouTheAuthorOfThisTicket"]}
              </span>
              <div className="flex space-x-1 justify-center mt-2">
                <button
                  onClick={removeTicket}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {translations["pages"]["ticket"]["remove"]}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
                <button
                  onClick={markAsSolvedTicket}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {translations["pages"]["ticket"]["problemSolved"]}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {need.responsesLength > 0 && (
            <div
              className={
                "inline-flex gap-1 cursor-pointer align-middle items-center"
              }
            >
              <Hand em="1.3em" /> {need.responsesLength}{" "}
              {translations["pages"]["ticket"]["claimedToHelp"]}
            </div>
          )}

          <div
            className={"flex gap-1 cursor-pointer align-middle items-center"}
          >
            {need.hasResponses && (
              <div>{translations["pages"]["ticket"]["hasResponses"]}</div>
            )}
          </div>
        </>
      )}

      <ReportTicket ticket={ticket} />
    </div>
  )
}
