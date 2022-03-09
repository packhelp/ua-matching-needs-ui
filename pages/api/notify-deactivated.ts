import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import { withSentry } from "@sentry/nextjs"
import { TicketDetailsType } from "../../src/services/ticket.type"
import { getAdminAuthToken } from "../../src/services/admin-auth-token"

const authHeaders = function (authToken) {
  return {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  }
}

const isProduction: boolean = process.env.ENV?.toUpperCase() === "PRODUCTION"

const notifyBySMS = async function (need, token) {
  const id = need.id
  let phone = need.phone

  if (!isProduction) {
    phone = process.env.SMS_DEV_NUMBER
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const senderNumber = process.env.TWILIO_SENDER_NUMBER
  const client = require("twilio")(accountSid, authToken)
  const url = `${process.env.SERVER_URL}/api/extend-ticket?t=${token}`
  const body = `[potrzeby-ua.org]: Twoje ogłoszenie się przedawniło, wejdź na stronę aby przedłużyć je o 24h: ${url}`

  console.log(
    `Sending sms for need[${id}]: ${need.what}, phone: ${phone} with body: ${body}`
  )

  if (!phone) {
    console.log(
      "Process env is not production, SMS_DEV_NUMBER is empty, skipping sending sms"
    )
    return
  }

  client.messages
    .create({ body: body, from: senderNumber, to: phone })
    .then((message) => console.log(message.sid))
}

const markAsNotified = async function (authToken, need) {
  const id = need.id
  console.log(`Marking need[${id}] as notified: ${need.what}`)

  return await axios.patch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need/${id}`,
    {
      expiry_notified: true,
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
const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  const authToken = getAdminAuthToken()
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need?filter[ticket_status]=active&filter[expirationTimestampSane][_lt]=now&filter[expiry_notified]=false`
  const requestOptions = {}

  const response = await axios
    .get(url, requestOptions)
    .then((response) => response.data)
    .catch((err) => console.error(err))

  let needs: TicketDetailsType[] = response.data
  const notifiedNeeds: TicketDetailsType[] = []
  needs = [needs[0]]

  for (let i in needs) {
    const need = needs[i]
    const token = generateToken()
    await setExtendToken(authToken, need, token)
    await notifyBySMS(need, token)
    await markAsNotified(authToken, need)
    notifiedNeeds.push(need)
  }

  return res.status(200).json(notifiedNeeds)
}

export default withSentry(handler)
