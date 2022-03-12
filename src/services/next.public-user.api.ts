import axios from "axios"
import dayjs from "dayjs"
import { NeedHousingTypeFormData } from "./type.need"
import { TagConstIds } from "./types.tag"
import type { JsonObject } from "type-fest"

function toIso(dateString: string) {
  if (dateString != null) {
    const date = new Date(dateString)
    const iso = date.toISOString()
    return iso
  }
  console.error(dateString)
  throw "Date must be defined"
}

function toNumberOrUndefined(someNumber: any) {
  const parsed = Number.parseInt(someNumber)
  if (Number.isNaN(parsed)) {
    return undefined
  }
  if (parsed == 0) {
    return undefined
  }
  return parsed
}

function dateHoursFromNow(h = 72) {
  return dayjs().add(h, "hour").format()
}

export class NextPublicApi {
  private async postNeed(payload: JsonObject) {
    return axios.post(`/api/add-ticket`, payload)
  }

  public async sendHousingNeed(
    newTicket: NeedHousingTypeFormData
  ): Promise<NeedHousingTypeFormData> {
    const expirationTimestampSane = dateHoursFromNow(72)

    const newTicketData: NeedHousingTypeFormData = {
      // Contact
      who: newTicket.who,
      phone: newTicket.phone,

      // ppl
      adults: toNumberOrUndefined(newTicket.adults),
      children: toNumberOrUndefined(newTicket.children),

      // descriopption
      what: newTicket.what,
      description: newTicket.description,

      //  Old tags
      need_tag_id: [{ need_tag_id: { id: TagConstIds.housing } }],
      expirationTimestampSane: expirationTimestampSane,

      // Housing - core where
      need_type: "housing_v2",
      housing_where_location_tag: Number(newTicket.housing_where_location_tag),

      //  Housing - when
      housing_arrive_exact: newTicket.housing_arrive_exact,
      housing_when_arrive: toIso(newTicket.housing_when_arrive),

      housing_when_leave: newTicket.housing_when_leave,

      // // Housing - payments & pets
      housing_can_help_with_rent: newTicket.housing_can_help_with_rent,

      housing_pets: newTicket.housing_pets,
      housing_pets_description: newTicket.housing_pets_description,
    }

    console.log("Sending this need to the server", newTicketData)
    return this.postNeed(newTicketData) as any
  }
}
