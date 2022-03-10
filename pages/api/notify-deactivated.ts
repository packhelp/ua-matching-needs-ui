import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import { withSentry } from "@sentry/nextjs"
import {
  TICKET_STATUS,
  TicketDetailsType,
} from "../../src/services/ticket.type"
import { getAdminContainer } from "../../src/services/_container.admin"

const authHeaders = function (authToken) {
  return {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  }
}

const adminContainer = getAdminContainer().containers
const isProduction = adminContainer.nextEnv.isProduction
const twilioEnv = adminContainer.twilioEnv

const shortenUrl = async function (url) {
  const endpoint = "https://u-6228-dev.twil.io/create"
  const response = await axios
    .post(endpoint, {
      url: url,
    })
    .then((response) => response.data)
    .catch((err) => console.error(err))
  console.log("rs", response)
  return response.shortUrl
}

const notifyBySMS = async function (need, token) {
  const id = need.id

  // Find phone
  let phone = need.phone
  if (!isProduction) {
    phone = twilioEnv.SMS_DEV_NUMBER
  }
  if (!phone) {
    console.log(
      "Process env is not production, SMS_DEV_NUMBER is empty, skipping sending sms"
    )
    return
  }

  // Prepare and send SMS
  const senderNumber = twilioEnv.TWILIO_SENDER_NUMBER
  const client = adminContainer.twilioInstance

  const url = `${process.env.SERVER_URL}/api/extend-ticket?t=${token}`
  const shortenedUrl = await shortenUrl(url)
  // 94 symbold text + 36 symbols for URL
  const body = `[potrzeby-ua.org]: Twoje ogłoszenie #${id} się przedawniło, wejdź na stronę aby je przedłużyć: ${shortenedUrl}`

  console.log(
    `Sending sms for need[${id}]: ${need.what}, phone: ${phone} with body: ${body}`
  )

  client.messages
    .create({ body: body, from: senderNumber, to: phone })
    .then((message) => console.log(message.sid))
}

const markAsNotifiedAndExpired = async function (authToken, need) {
  const id = need.id
  console.log(`Marking need[${id}] as notified: ${need.what}`)

  return await axios.patch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need/${id}`,
    {
      expiry_notified: true,
      ticket_status: TICKET_STATUS.EXPIRED,
    },
    authHeaders(authToken)
  )
}

const setExtendToken = async function (authToken, need, extendToken) {
  const id = need.id
  console.log(`Setting need[${id}] extend token: ${extendToken}`)
  return await axios.patch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need/${id}`,
    {
      extend_token: extendToken,
    },
    authHeaders(authToken)
  )
}

const generateToken = function () {
  return require("crypto").randomBytes(16).toString("hex")
}

const admin = getAdminContainer().containers

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  const authToken = admin.nextEnv.directusAdminAuthToken
  let limit = 1
  if (req.query.limit) {
    limit = Number(req.query.limit)
  }
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need?filter[ticket_status]=active&filter[expirationTimestampSane][_lt]=now&filter[expiry_notified]=false&limit=${limit}`
  const requestOptions = {}

  const response = await axios
    .get(url, requestOptions)
    .then((response) => response.data)
    .catch((err) => console.error(err))

  let needs: TicketDetailsType[] = response.data
  const notifiedNeeds: TicketDetailsType[] = []
  for (let i in needs) {
    const need = needs[i]
    const token = generateToken()
    await setExtendToken(authToken, need, token)
    await notifyBySMS(need, token)
    await markAsNotifiedAndExpired(authToken, need)
    notifiedNeeds.push(need)
  }

  return res.status(200).json(notifiedNeeds)
}

export default withSentry(handler)
