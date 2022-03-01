import type { NextPage } from "next"
import { TICKET_STATUS } from "./add"
import { AllTickets } from "../../src/components/_all-tickets"

const ActiveTickets: NextPage = () => {
  return <AllTickets status={TICKET_STATUS.ACTIVE} />
}

export default ActiveTickets
