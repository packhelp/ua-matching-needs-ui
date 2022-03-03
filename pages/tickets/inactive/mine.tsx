import type { NextPage } from "next"
import { Tickets } from "../../../src/components/Tickets"
import { TICKET_STATUS } from "../add"

const MineInactiveTickets: NextPage = () => {
  return <Tickets mineOnly={true} status={TICKET_STATUS.EXPIRED} />
}

export default MineInactiveTickets
