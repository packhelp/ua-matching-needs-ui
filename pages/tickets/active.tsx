import type { NextPage } from "next"
import { Tickets } from "../../src/components/ticket-list/Tickets"
import { useTranslations } from "../../src/hooks/translations"
import { TICKET_STATUS } from "../../src/services/ticket.type"
import {
  TicketsListPageProps,
  ticketsListServerSideProps,
} from "../../src/services/tickets-list-server-side-props"

export async function getServerSideProps(context) {
  const data = await ticketsListServerSideProps(context)

  return { props: data }
}
const ActiveTickets: NextPage<TicketsListPageProps> = ({
  tags,
  locationTags,
  currentTag,
}) => {
  const translations = useTranslations()
  return (
    <Tickets
      ticketStatus={TICKET_STATUS.ACTIVE}
      title={translations.pages.active.title}
      tags={tags}
      locationTags={locationTags}
      currentTag={currentTag}
    />
  )
}

export default ActiveTickets
