import type { NextPage } from "next"
import { Tickets } from "../../../src/components/Tickets"
import { useTranslations } from "../../../src/hooks/translations"
import { TICKET_STATUS } from "../../../src/services/ticket.type"

const MineActiveTickets: NextPage = () => {
  const translations = useTranslations()
  return (
    <Tickets
      ticketStatus={TICKET_STATUS.ACTIVE}
      mineOnly={true}
      title={translations["/tickets/active/mine"]}
    />
  )
}

export default MineActiveTickets
