import { NextApiRequest, NextApiResponse } from "next"
import { withSentry } from "@sentry/nextjs"
import { getRootContainer } from "../../src/services/_root-container"

const root = getRootContainer()
const ticketService = root.containers.ticketService

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.headers.authorization !== `Bearer ${process.env.TWILIO_PHONE_PROXY_TOKEN}`) {
    return res.status(401).json({ error: "Unauthorized!" })
  }

  if (!req.body.id && !req.query.id) {
    return res.status(404).json({ error: "Missing required id!" })
  }

  const id = Number(req.body.id || req.query.id) // Changes "00032" to 32
  const ticket = await ticketService.ticket(id)

  return res.status(200).json({ phone: ticket?.phone })
}

export default withSentry(handler)
