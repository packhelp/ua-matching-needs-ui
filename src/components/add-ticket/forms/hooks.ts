import axios from "axios"
import dayjs from "dayjs"
import { useMemo } from "react"
import { useMutation, useQuery } from "react-query"
import {
  NextPublicApi,
  toIso,
  toIsoOrUndefined,
  toNumberOrUndefined,
} from "../../../services/next.public-user.api"
import { NeedTripPostData } from "../../../services/ticket.type"
import { NeedHousingTypeFormData } from "../../../services/type.need"
import { TagConstIds } from "../../../services/types.tag"
import { getRootContainer } from "../../../services/_root-container"

export const useAddTransportTicket = ({ onSuccess }) => {
  const addTicketMutation = useMutation<
    NeedTripPostData,
    Error,
    NeedTripPostData
  >(
    (newTicket) => {
      const {
        phone,
        who,
        what,
        description,
        adults,
        children,
        has_pets,
        trip_when_text,
        trip_when_date, // TODO:
        trip_extra_luggage,
        where_from_tag,
        where_to_tag,
      } = newTicket
      const expirationTimestampSane = dayjs().add(24, "hour").format()

      let when_date: string | undefined = undefined
      if (trip_when_date != null) {
        const date = new Date(trip_when_date)
        when_date = date.toISOString()
      }

      const newTicketData = {
        what,
        description,
        expirationTimestampSane,
        phone,
        who,
        adults: adults ? adults : 0,
        children: children ? children : 0,
        has_pets: !has_pets ? "0" : "1",

        // This is trip, so hardcore a trip tag
        need_tag_id: [{ need_tag_id: { id: TagConstIds.transport } }],

        // tripe specific
        need_type: "trip",
        where_to_tag,
        where_from_tag,
        trip_when_text,
        trip_when_date: when_date,
        trip_extra_luggage,
      }

      return axios.post(`/api/add-ticket`, newTicketData)
    },
    {
      onSuccess,
    }
  )

  return addTicketMutation
}

/**
 * Boolean("false") // true
 * Boolean("0") // true
 *
 * Hence this manual check
 */
export function toBool(t: any): boolean {
  if (typeof t === "boolean") return t
  if (t === 0) return false
  if (t === "0") return false
  if (t === "false") return false
  if (t === 1) return true
  if (t === "1") return true
  if (t === "true") return true
  return Boolean(t)
}

function fmtString(s: any): string | undefined {
  if (s === "") return undefined
  if (typeof s !== "string") return undefined
  return s
}

export const useAddHousingTicket = ({ onSuccess }) => {
  const addTicketMutation = useMutation<
    NeedHousingTypeFormData,
    Error,
    NeedHousingTypeFormData
  >(
    //@ts-ignore
    (newTicket) => {
      const api = new NextPublicApi()

      newTicket.housing_arrive_exact = toBool(newTicket.housing_arrive_exact)
      newTicket.housing_leave_exact = toBool(newTicket.housing_leave_exact)
      newTicket.housing_pets = toBool(newTicket.housing_pets)
      newTicket.housing_can_help_with_rent = toBool(
        newTicket.housing_can_help_with_rent
      )

      newTicket.housing_pets_number = toNumberOrUndefined(
        newTicket.housing_pets_number
      )
      newTicket.adults = toNumberOrUndefined(newTicket.adults)
      newTicket.children = toNumberOrUndefined(newTicket.children)

      // Dates
      newTicket.housing_when_arrive = toIso(newTicket.housing_when_arrive)
      newTicket.housing_when_leave = toIsoOrUndefined(
        newTicket.housing_when_leave
      )

      // What
      newTicket.who = fmtString(newTicket.who)
      newTicket.what = fmtString(newTicket.what)
      newTicket.description = fmtString(newTicket.description)

      return api.sendHousingNeed(newTicket)
    },
    {
      onSuccess,
    }
  )

  return addTicketMutation
}

export const useLocations = () => {
  const ticketService = getRootContainer().containers.ticketService

  const { data: locationTags = [] } = useQuery(`location-tags`, () =>
    ticketService.locationTagsForHousing()
  )

  const mappedLocationTags = locationTags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }))

  return { mappedLocationTags, locationTags }
}
