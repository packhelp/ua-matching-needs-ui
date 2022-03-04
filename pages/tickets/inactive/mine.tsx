import type { NextPage } from "next"
import { Tickets } from "../../../src/components/Tickets"
import { TICKET_STATUS } from "../add"
import { useTranslations } from "../../../src/hooks/translations"

const MineInactiveTickets: NextPage = () => {
  const translations = useTranslations()
  return (
    <Tickets
      ticketStatus={TICKET_STATUS.EXPIRED}
      mineOnly={true}
      title={translations["/tickets/inactive/mine"]}
    />
  )
}

export default MineInactiveTickets
