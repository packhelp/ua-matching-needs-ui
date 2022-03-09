import { NextApiRequest, NextApiResponse } from "next"
import { withSentry } from "@sentry/nextjs"
import { directusApiInstance as directusApiInstanceInitiator, TicketService } from "../../src/services/directus-api"

let directusApiInstance: TicketService
const getDirectusApiInstance = (): TicketService => {
  if (!directusApiInstance) {
    directusApiInstance = new TicketService(directusApiInstanceInitiator())
  }
  return directusApiInstance
}

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  const directusApi = getDirectusApiInstance()

  if (req.headers.authorization !== `Bearer ${process.env.TWILIO_PHONE_PROXY_TOKEN}`) {
    return res.status(401).json({ error: "Unauthorized!" })
  }

  if (!req.body.id && !req.query.id) {
    return res.status(404).json({ error: "Missing required id!" })
  }

  const id = Number(req.body.id || req.query.id) // Changes "00032" to 32
  const ticket = await directusApi.ticket(id)

  return res.status(200).json({ phone: ticket?.phone })
}

export default withSentry(handler)
