export function getTwilioSMS_envVariables() {
  const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
  const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
  const TWILIO_SENDER_NUMBER = process.env.TWILIO_SENDER_NUMBER
  const SMS_DEV_NUMBER = process.env.SMS_DEV_NUMBER

  if (!TWILIO_ACCOUNT_SID) throw "TWILIO_ACCOUNT_SID not defined"
  if (!TWILIO_AUTH_TOKEN) throw "TWILIO_AUTH_TOKEN not defined"
  if (!TWILIO_SENDER_NUMBER) throw "TWILIO_SENDER_NUMBER not defined"

  const envVars = {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_SENDER_NUMBER,
    SMS_DEV_NUMBER,
  }

  console.log("twilio env vars", envVars)

  return envVars
}

export type TwilioEnvVars = ReturnType<typeof getTwilioSMS_envVariables>

export function getNextEnvVariables() {
  const adminTokenDanger = process.env.DIRECTUS_API_AUTH

  if (!adminTokenDanger) throw "DIRECTUS_API_AUTH not defined"

  // what about NODE_ENV=production ....Yeah, staging is also production
  // not sure how we use this thing honestly
  const isProduction = process.env.ENV?.toUpperCase() === "PRODUCTION"

  return {
    directusAdminAuthToken: adminTokenDanger,
    isProduction: isProduction,
  }
}

export type NextEnvVars = ReturnType<typeof getNextEnvVariables>
