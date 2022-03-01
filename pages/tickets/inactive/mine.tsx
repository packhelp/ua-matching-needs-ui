import type { NextPage } from "next"
import { MyTickets } from "../../../src/components/_my-tickets"
import { TICKET_STATUS } from "../add"
import { GetServerSidePropsContext } from "next"
import axios from "axios"
import { protectedRoutes } from "../active/mine"
import { ReactNode } from "react"

interface MineInactiveTicketsProps {
  tickets?: [any]
  children?: ReactNode
}

const MineInactiveTickets: NextPage = (props: MineInactiveTicketsProps) => {
  return <MyTickets status={TICKET_STATUS.EXPIRED} tickets={props.tickets} />
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await protectedRoutes(ctx)

  try {
    const phoneNumber = session?.user?.name?.replace("+", "%2B")
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need?filter[_and][][phone]=${phoneNumber}&filter[_and][][ticket_status]=EXPIRED`

    const tickets = await axios.get(url).then((response) =>
      response.data.data
    )

    return {
      props: { tickets },
    }
  } catch (e) {
    console.log(e)
    return {
      // @ts-ignore
      props: { error: e.message }
    }
  }
}

export default MineInactiveTickets
