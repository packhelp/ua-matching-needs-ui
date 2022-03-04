import type { NextPage } from "next"
import { Tickets } from "../../../src/components/Tickets"
import { TICKET_STATUS } from "../add"
import { useTranslations } from "../../../src/hooks/translations"

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
