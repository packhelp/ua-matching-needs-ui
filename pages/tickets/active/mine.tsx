import type { NextPage } from "next"
import { Tickets } from "../../../src/components/Tickets"
import { TICKET_STATUS } from "../add"
import { GetServerSidePropsContext } from "next"
import { Session } from "next-auth"
import { getSession } from "next-auth/react"
import axios from "axios"
import { ReactNode } from "react"

interface MineActiveTicketsProps {
  tickets?: [any]
  children?: ReactNode
}

const MineActiveTickets: NextPage = (props: MineActiveTicketsProps) => {
  return <Tickets status={TICKET_STATUS.ACTIVE} tickets={props.tickets}/>
}

export async function protectedRoutes(
  context: GetServerSidePropsContext,
): Promise<Session | null> {
  const session = await getSession(context)
  const { cookie } = context.req.headers

  if (!session || !cookie || !session.user) {
    context.res.setHeader(
      "Location",
      `/sign-in`,
    )
    context.res.statusCode = 302
  }

  return session
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await protectedRoutes(ctx)

  try {
    const phoneNumber = session?.user?.name?.replace("+", "%2B")
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need?filter[_and][][phone]=${phoneNumber}&filter[_and][][ticket_status]=ACTIVE`

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


export default MineActiveTickets
