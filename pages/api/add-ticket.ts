import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import axios from "axios"
import { withSentry } from "@sentry/nextjs"

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req })

    console.debug(req.body)

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${session?.directusAccessToken}`,
          "Content-Type": "application/json",
        },
      }
    )

    return res.status(200).json(response.data)
  } catch (e: any) {
    console.error(e)
    return res.status(500).json(e?.message)
  }
}

export default withSentry(handler)
