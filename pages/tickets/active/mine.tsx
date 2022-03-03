import type { NextPage } from "next"
import { Tickets } from "../../../src/components/Tickets"
import { TICKET_STATUS } from "../add"


const MineActiveTickets: NextPage = () => {
  return <Tickets ticketStatus={TICKET_STATUS.ACTIVE} mineOnly={true}/>
}

export default MineActiveTickets
