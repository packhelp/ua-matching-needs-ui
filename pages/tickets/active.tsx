import type { NextPage } from "next"
import { TICKET_STATUS } from "./add"
import { Tickets } from "../../src/components/Tickets"

const ActiveTickets: NextPage = () => {
  return <Tickets ticketStatus={TICKET_STATUS.ACTIVE} />
}

export default ActiveTickets
