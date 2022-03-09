import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import { withSentry } from "@sentry/nextjs"
import { TicketDetailsType } from "../../src/services/ticket.type"
import { getAdminAuthToken } from "../../src/services/admin-auth-token"
import dayjs from "dayjs"

const authHeaders = function (authToken) {
  return {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  }
}

const extendTicket = async function (authToken, need) {
  const id = need.id
  const newDate = dayjs().add(1, "day")
  console.log(`Extending need[${id}] with new date: ${newDate}`)
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need/${id}`,
    {
      extend_token: null,
      expiry_notified: false,
      expirationTimestampSane: newDate.format("YYYY-MM-DD HH:mm:ss"),
    },
    authHeaders(authToken)
  )
  return response.data
}

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  const extend_token = req.query.t
  const authToken = getAdminAuthToken()

  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need?filter[extend_token]=${extend_token}`
  const requestOptions = {}

  const response = await axios
    .get(url, requestOptions)
    .then((response) => response.data)
    .catch((err) => console.error(err))
  let needs: TicketDetailsType[] = response.data
  if (needs.length === 0) {
    return res.status(404).send("ticket not found")
  }
  const need = needs[0]
  await extendTicket(authToken, need)
  res.redirect(307, `/extended-ticket/${need.id}/`)
}

export default withSentry(handler)
