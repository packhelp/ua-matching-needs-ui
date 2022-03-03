import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import axios from "axios"
import { TICKET_STATUS } from "../tickets/add"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  console.debug(req.body)

  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need/${req.body.id}`,
    {
      ticket_status: TICKET_STATUS.DELETED,
    },
    {
      headers: {
        Authorization: `Bearer ${session?.directusAccessToken}`,
        "Content-Type": "application/json",
      },
    }
  )

  return res.status(200).json(response.data)
}
