import type { NextPage } from "next"
import { Tickets } from "../../src/components/Tickets"
import { useTranslations } from "../../src/hooks/translations"
import { TICKET_STATUS } from "../../src/services/ticket.type"

const ClaimedTickets: NextPage = () => {
  const translations = useTranslations()
  return (
    <Tickets
      ticketStatus={TICKET_STATUS.CLAIMED}
      title={translations["/tickets/claimed"]}
    />
  )
}

export default ClaimedTickets
