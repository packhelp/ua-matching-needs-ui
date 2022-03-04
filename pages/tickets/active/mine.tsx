import type { NextPage } from "next"
import { Tickets } from "../../../src/components/Tickets"
import { TICKET_STATUS } from "../add"
import { translations } from "../../../src/utils/translations"


const MineActiveTickets: NextPage = () => {
  return <Tickets ticketStatus={TICKET_STATUS.ACTIVE} mineOnly={true} title={translations["pl-PL"]["/tickets/active/mine"]}/>
}

export default MineActiveTickets
