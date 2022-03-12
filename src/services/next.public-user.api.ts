import axios from "axios"
import dayjs from "dayjs"
import { NeedHousingTypeFormData } from "./type.need"
import { TagConstIds } from "./types.tag"
import type { JsonObject } from "type-fest"

export function toIsoOrUndefined(
  dateString: string | undefined | null
): string | undefined {
  if (dateString != null) {
    try {
      const date = new Date(dateString)
      const iso = date.toISOString()
      return iso
    } catch (e) {
      return undefined
    }
  }
  return undefined
}

export function toIso(dateString: string): string {
  const date = dateString != null ? new Date(dateString) : new Date()
  return date.toISOString()
}

export function toNumberOrUndefined(someNumber: any) {
  if (typeof someNumber === "number" && !Number.isNaN(someNumber)) {
    return someNumber
  }

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
      housing_when_arrive: toIso(newTicket.housing_when_arrive),
      housing_arrive_exact: newTicket.housing_arrive_exact,

      // If this is undefined, this means
      housing_when_leave: toIsoOrUndefined(newTicket.housing_when_leave),
      housing_leave_exact: newTicket.housing_leave_exact,

      // // Housing - payments & pets
      housing_can_help_with_rent: newTicket.housing_can_help_with_rent,

      housing_pets: newTicket.housing_pets,
      housing_pets_number: newTicket.housing_pets_number,
      housing_pets_description: newTicket.housing_pets_description,
    }

    console.info("Sending need to the server", newTicketData)
    return this.postNeed(newTicketData) as any
  }
}
