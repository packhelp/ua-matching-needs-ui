import type { NextPage } from "next"
import { Tickets } from "../../../src/components/_tickets"
import { TICKET_STATUS } from "../add"

const MineActiveTickets: NextPage = () => {
  return <Tickets mineOnly={true} status={TICKET_STATUS.ACTIVE} />
}

export default MineActiveTickets
