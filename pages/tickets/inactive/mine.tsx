import type { NextPage } from "next"
import { Tickets } from "../../../src/components/Tickets"
import { TICKET_STATUS } from "../add"
import { translations } from "../../../src/utils/translations"

const MineInactiveTickets: NextPage = () => {
  return (
    <Tickets
      ticketStatus={TICKET_STATUS.EXPIRED}
      mineOnly={true}
      title={translations["pl-PL"]["/tickets/inactive/mine"]}
    />
  )
}

export default MineInactiveTickets
