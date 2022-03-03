import Everify from "everify"
import Error from "next/error"
import { parsePhoneNumberFromString } from "libphonenumber-js/max"

const everifyAuthToken: string = `${process.env.EVERIFY_AUTH_TOKEN}`
const env: string = `${process.env.ENV}`.toUpperCase()

if (!everifyAuthToken) {
  // @ts-ignore
  throw new Error("Missing EVERIFY_AUTH_TOKEN env!")
}

const everify = new Everify(everifyAuthToken)

if (env !== "PRODUCTION") {
  everify.sandbox() // take this out to send real SMS
}

export default async function (req, res) {
  const { phoneNumber } = req.body

  const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber || "", "PL")

  console.log(`🔸 phoneNumber: ${phoneNumber}`)
  console.log(`🔸️ parsedPhoneNumber: ${parsedPhoneNumber?.format('NATIONAL')}`)

  if (!parsedPhoneNumber?.isValid()) {
    return res.status(403).send("Invalid credentials.")
  }

  await everify.startVerification({
    phoneNumber: phoneNumber,
    method: "SMS"
  })
  return res.status(200).send("Success")
}
