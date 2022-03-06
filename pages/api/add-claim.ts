import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import axios from "axios"
import { withSentry } from "@sentry/nextjs"

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session || session.directusAccessToken == null) {
    res.send(403)
    return
  }

  const { id } = req.body

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need_reply`,
    { need: id, comment: "test" },
    {
      headers: {
        Authorization: `Bearer ${session?.directusAccessToken}`,
        "Content-Type": "application/json",
      },
    }
  )

  return res.status(200).json(response.data)
}

export default withSentry(handler)
