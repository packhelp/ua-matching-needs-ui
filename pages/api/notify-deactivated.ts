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

  /**
   * 41 vs 52 symbols
   * https://potrzeby-ua.org/api/extend-ticket?t=d45e90fa
   * https://potrzeby-ua.org/extend?t=d45e90fa
   *
   * /extend?t=123 -> redirects to `/api/extend-ticket?t=123` via next.config.js
   */
  const url = `${process.env.SERVER_URL}/extend?t=${token}`

  /**
   * SMS Body Size
   *
   * ~ 96 symbols for the body
   * 41 symbols for the URL
   *
   * 147 / 160 symbols
   */
  const body = `[potrzeby-ua.org]: Twoje ogłoszenie #${id} się przedawniło, wejdź na stronę aby je przedłużyć: ${url}`

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
/**
 * ID length: 6
 * Speed: 100 IDs per hour
 * ~15 days needed, in order to have a 1% probability of at least one collision.
 */
const generateToken = function () {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { nanoid } = require("nanoid")
  return nanoid(6) //=> "xSuZ1p"
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

  const needs: TicketDetailsType[] = response.data
  const notifiedNeeds: TicketDetailsType[] = []
  for (const i in needs) {
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
