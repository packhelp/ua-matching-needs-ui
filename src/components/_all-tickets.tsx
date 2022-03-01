import React from "react"
import { useQuery } from "react-query"
import axios from "axios"
import { isTicketActive } from "../../pages/ticket/[id]"
import { TICKET_STATUS } from "../../pages/tickets/add"
import { Tickets } from "./Tickets"

export const AllTickets = ({
  status,
}: {
  status: TICKET_STATUS
}) => {
  const { data: tickets, isLoading } = useQuery(
    `tickets-${status}-all`,
    () => {
      const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need?filter[ticket_status][_eq]=${TICKET_STATUS.ACTIVE}`

      return axios.get(url).then((response) =>
        response.data.data
          .filter((item) => {
            if (status === TICKET_STATUS.ACTIVE) {
              return isTicketActive(item)
            } else {
              return !isTicketActive(item)
            }
          })
      )
    },
  )

  return (
    <Tickets status={status} tickets={tickets} isLoading={isLoading} />
  )
}
