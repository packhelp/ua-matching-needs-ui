import type { NextPage } from "next"
import { TICKET_STATUS } from "./add"
import { Tickets } from "../../src/components/Tickets"
import { useTranslations } from "../../src/hooks/translations"

const ActiveTickets: NextPage = () => {
  const translations = useTranslations()
  return (
    <Tickets
      ticketStatus={TICKET_STATUS.ACTIVE}
      title={translations["pages"]["active"]["title"]}
    />
  )
}

export default ActiveTickets
