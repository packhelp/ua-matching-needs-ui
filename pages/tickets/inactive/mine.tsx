import type { NextPage } from "next"
import { Tickets } from "../../../src/components/Tickets"
import { TICKET_STATUS } from "../add"

const MineInactiveTickets: NextPage = () => {
  return <Tickets ticketStatus={TICKET_STATUS.EXPIRED} mineOnly={true} />
}

export default MineInactiveTickets
