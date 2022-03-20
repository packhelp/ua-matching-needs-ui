import axios from "axios"
import dayjs from "dayjs"
import { useMutation } from "react-query"
import {
  NextPublicApi,
  toIso,
  toIsoOrUndefined,
  toNumberOrUndefined,
} from "../../../services/next.public-user.api"
import { NeedTripPostData } from "../../../services/ticket.type"
import { NeedHousingTypeFormData } from "../../../services/type.need"
import { TagConstIds } from "../../../services/types.tag"
import { toBool, fmtString } from "./helpers"

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
        where_from,
        where_destination,
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
        where_from,
        where_destination,
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

export const useAddHousingTicket = ({ onSuccess }) => {
  const addTicketMutation = useMutation<
    NeedHousingTypeFormData,
    Error,
    NeedHousingTypeFormData
  >(
    //@ts-ignore
    (newTicket) => {
      console.log(newTicket)
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
