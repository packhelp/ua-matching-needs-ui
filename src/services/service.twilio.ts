import { TwilioEnvVars } from "./next.env-variables"

export function getTwilioInstance(conf: TwilioEnvVars) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const client = require("twilio")(
    conf.TWILIO_ACCOUNT_SID,
    conf.TWILIO_AUTH_TOKEN
  )

  return client
}
