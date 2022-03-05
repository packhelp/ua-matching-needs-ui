import { Link } from "@chakra-ui/react"
import type { NextPage } from "next"
import NextError from "next/error"
import "dayjs/locale/pl"
import "dayjs/plugin/relativeTime"
import { RouteDefinitions } from "../../src/utils/routes"
import React from "react"
import { useTranslations } from "../../src/hooks/translations"
import {
  TICKET_STATUS,
  TicketDetailsType,
} from "../../src/services/ticket.type"
import { getRootContainer } from "../../src/services/_root-container"
import { SingleTicketMetaData } from "../../src/components/single-ticket/SingleTicketMetaData"
import { SingleTicketHeader } from "../../src/components/single-ticket/SingleTicketHeader"
import { SingleTicketDetails } from "../../src/components/single-ticket/SingleTicketDetails"
import { SingleTicketFooter } from "../../src/components/single-ticket/SingleTicketFooter"

export const isTicketActive = (ticket: TicketDetailsType): boolean => {
  return ticket.ticket_status === TICKET_STATUS.ACTIVE
}

const root = getRootContainer()
const ticketService = root.containers.ticketService

export async function getServerSideProps(context) {
  const { id } = context.query
  const ticket = await ticketService.ticketWithNestedData(Number(id))

  return { props: { ticket } }
}

const TicketDetails: NextPage<{ ticket: TicketDetailsType }> = ({ ticket }) => {
  const translations = useTranslations()

  if (!ticket) {
    return (
      <NextError statusCode={404}>
        {translations["pages"]["ticket"]["ticketNotFound"]}
        <Link href={RouteDefinitions.AllActiveTickets}>
          {translations["pages"]["ticket"]["here"]}
        </Link>
      </NextError>
    )
  }

  return (
    <div className="bg-white shadow rounded-lg max-w-2xl mx-auto">
      <SingleTicketMetaData ticket={ticket} />

      <section aria-labelledby="applicant-information-title">
        <SingleTicketHeader ticket={ticket} />
        <SingleTicketDetails ticket={ticket} />
        <SingleTicketFooter ticket={ticket} />
      </section>
    </div>
  )
}

export default TicketDetails
