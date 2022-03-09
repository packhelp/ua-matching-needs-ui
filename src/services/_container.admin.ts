import { makeRoot } from "iti"
import { getAdminAuthToken } from "./admin-auth-token"
import { directusApiInstance, TicketService } from "./directus-api"
import {
  getNextEnvVariables,
  getTwilioSMS_envVariables,
} from "./next.env-variables"
import { getTwilioInstance } from "./service.twilio"

export function getAdminContainer() {
  return makeRoot()
    .add({
      nextEnv: () => getNextEnvVariables(),
      twilioEnv: () => getTwilioSMS_envVariables(),
    })
    .add((ctx) => ({
      twilioInstance: () => getTwilioInstance(ctx.twilioEnv),
    }))
  // .add((ctx) => ({
  //   directusAdminAxios: () => new TicketService(ctx.nextEnvVariables),
  // }))
  // .add((ctx) => ({
  //   directusAdminInstance: (ctx) => new TicketService(ctx.directuInstance),
  // }))
}
