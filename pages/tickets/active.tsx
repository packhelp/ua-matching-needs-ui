import type { NextPage } from "next"
import { TICKET_STATUS } from "./add"
import { Tickets } from "../../src/components/Tickets"
import { translations } from "../../src/utils/translations"

const ActiveTickets: NextPage = () => {
  return (
    <Tickets
      ticketStatus={TICKET_STATUS.ACTIVE}
      title={translations["pl-PL"]["pages"]["active"]["title"]}
    />
  )
}

export default ActiveTickets
