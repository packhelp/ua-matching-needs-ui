import Everify from "everify"
import Error from "next/error"
import { withSentry } from "@sentry/nextjs"
import { parsePhoneNumberFromString } from "libphonenumber-js/max"
import { NextApiRequest, NextApiResponse } from "next"

const everifyAuthToken = `${process.env.EVERIFY_AUTH_TOKEN}`
const env: string = `${process.env.ENV}`.toUpperCase()

if (!everifyAuthToken) {
  // @ts-ignore
  throw new Error("Missing EVERIFY_AUTH_TOKEN env!")
}

const everify = new Everify(everifyAuthToken)

if (env !== "PRODUCTION") {
  everify.sandbox() // take this out to send real SMS
}

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  const { phoneNumber } = req.body

  const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber || "", "PL")

  console.log(`🔸 phoneNumber: ${phoneNumber}`)
  console.log(`🔸️ parsedPhoneNumber: ${parsedPhoneNumber?.format("NATIONAL")}`)

  if (!parsedPhoneNumber?.isValid()) {
    return res.status(403).send("Invalid credentials.")
  }

  await everify.startVerification({
    phoneNumber: phoneNumber,
    method: "SMS",
  })
  return res.status(200).send("Success")
}

export default withSentry(handler)
