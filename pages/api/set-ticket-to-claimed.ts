import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import axios from "axios"
import { withSentry } from "@sentry/nextjs"
import { TICKET_STATUS } from "../../src/services/ticket.type"

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const { id, date_claimed } = req.body

  if (!session || session.directusAccessToken == null) {
    res.send(403)
    return
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need/${id}`,
      {
        ticket_status: TICKET_STATUS.CLAIMED,
        date_claimed: date_claimed,
        //   user_claiming: ""
      },
      {
        headers: {
          Authorization: `Bearer ${session?.directusAccessToken}`,
          "Content-Type": "application/json",
        },
      }
    )

    return res.status(200).json(response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data)
    }

    return res.status(403).send("Something went wrong")
  }
}

export default withSentry(handler)
