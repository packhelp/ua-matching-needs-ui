import React from "react"
import { useQuery } from "react-query"
import axios from "axios"
import { RouteDefinitions } from "../utils/routes"
import { isTicketActive } from "../../pages/ticket/[id]"
import { TICKET_STATUS } from "../../pages/tickets/add"
import { getUserInfo } from "../services/auth"
import { Tag } from "./_tag"

const isMineTicket = (item, userInfo) => {
  if (!userInfo) {
    return true
  } else {
    return item.phone === userInfo.phone
  }
}

export const Tickets = ({
  mineOnly,
  status,
}: {
  mineOnly: boolean
  status: TICKET_STATUS
}) => {
  const userInfo = getUserInfo()

  const { data: tickets, isLoading } = useQuery(
    `tickets-${status}-${mineOnly ? "mine" : "all"}`,
    () => {
      const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need?filter[ticket_status][_eq]=${TICKET_STATUS.ACTIVE}&fields=*.*.*&sort[]=-date_created`

      return axios.get(url).then((response) =>
        response.data.data
          .filter((item) => {
            if (status === TICKET_STATUS.ACTIVE) {
              return isTicketActive(item)
            } else {
              return !isTicketActive(item)
            }
          })
          .filter((item) => {
            if (mineOnly) {
              return isMineTicket(item, userInfo)
            } else {
              return item
            }
          })
      )
    }
  )

  return (
    <>
      <h1 className="my-4 text-3xl font-semibold text-center">
        Aktualne Zapotrzebowanie
        {tickets && <span className="ml-2">({tickets.length})</span>}
      </h1>
      <div className="py-2 mx-auto max-w-7xl sm:px-6 xl:px-0">
        <ul
          role="list"
          className="my-4 grid align-center grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {tickets &&
            tickets.map((ticket) => {
              const dateFormatted = new Date(
                ticket.date_created
              ).toLocaleString("pl-PL")
              const ticketUrl = RouteDefinitions.TicketDetails.replace(
                ":id",
                ticket.id
              )

              return (
                <a key={ticket.id} href={ticketUrl}>
                  <li className="bg-white rounded-lg shadow hover:outline-2 outline-blue-200 hover:outline col-span-1 divide-y divide-gray-200">
                    <div className="px-4 py-5 border-gray-200 sm:px-6">
                      <div className="mb-2">
                        <p className="flex max-w-2xl mb-1 text-sm text-gray-400 space-x-2">
                          <span>#{ticket.id}</span>
                          <span className="">
                            {ticket.need_tag_id.map((tag) => {
                              if (
                                !tag ||
                                !tag.need_tag_id ||
                                !tag.need_tag_id.id
                              ) {
                                return null
                              }

                              return (
                                <Tag
                                  key={tag.need_tag_id.id}
                                  tag={tag.need_tag_id}
                                />
                              )
                            })}
                          </span>
                        </p>
                      </div>
                      <div className="py-1">
                        <p className="text-xl font-medium text-gray-900 truncate">
                          {ticket.what || ticket.description}
                        </p>
                        {ticket.where ? (
                          <div className="flex items-center text-sm font-medium text-gray-400 truncate space-x-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <span>{ticket.where}</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-sm font-medium text-gray-400 truncate space-x-1">
                            -
                          </div>
                        )}
                      </div>

                      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-8">
                        {ticket.who && (
                          <div className="sm:col-span-1">
                            <dt className="text-xs font-medium text-gray-400">
                              Kto zgłosił?
                            </dt>
                            <dd className="text-sm text-gray-900 truncate">
                              {ticket.who}
                            </dd>
                          </div>
                        )}
                        <div className="sm:col-span-1">
                          <dt className="text-xs font-medium text-gray-400">
                            Dodano
                          </dt>
                          <dd className="text-sm text-gray-900 ">
                            {dateFormatted}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div>
                      <div className="flex -mt-px divide-x divide-gray-200">
                        <div className="flex flex-1 w-0">
                          <a
                            href={ticketUrl}
                            className="relative inline-flex items-center justify-center flex-1 w-0 py-3 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="ml-3">Szczegóły</span>
                          </a>
                        </div>
                        <div className="flex flex-1 w-0 -ml-px">
                          <a
                            href={`tel:${ticket.phone}`}
                            className="relative inline-flex items-center justify-center flex-1 w-0 py-3 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg hover:text-gray-500"
                          >
                            <svg
                              className="w-5 h-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span className="ml-3">{ticket.phone}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                </a>
              )
            })}
        </ul>
      </div>
    </>
  )
}
