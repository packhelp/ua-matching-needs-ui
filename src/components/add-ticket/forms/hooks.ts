import axios from "axios"
import dayjs from "dayjs"
import { useMutation } from "react-query"
import {
  NeedHousingPostData,
  NeedTripPostData,
} from "../../../services/ticket.type"
import { NeedHousingTypeFormData } from "../../../services/type.need"
import { TagConstIds } from "../../../services/types.tag"

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
        count: 0,
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

export const useAddHousingTicket = ({ onSuccess }) => {
  const addTicketMutation = useMutation<
    NeedHousingTypeFormData,
    Error,
    NeedHousingTypeFormData
  >(
    (newTicket) => {
      const expirationTimestampSane = dayjs().add(72, "hour").format()

      function toIso(dateString: string) {
        if (dateString != null) {
          const date = new Date(dateString)
          const iso = date.toISOString()
          return iso
        }
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

      const newTicketData = {
        // Contact
        who: newTicket.who,
        phone: newTicket.phone,

        // ppl
        adults: toNumberOrUndefined(newTicket.adults),
        children: toNumberOrUndefined(newTicket.children),

        // descriopption
        what: newTicket.what,
        description: newTicket.description,

        // // // Old tags
        need_tag_id: [{ need_tag_id: { id: TagConstIds.housing } }],
        expirationTimestampSane: expirationTimestampSane,

        // Housing - core where
        need_type: "housing",
        housing_where_location_tag: Number(
          newTicket.housing_where_location_tag
        ),

        // // // Housing - when
        housing_arrive_exact: newTicket.housing_arrive_exact,
        housing_when_arrive: toIso(newTicket.housing_when_arrive),

        housing_leave_exact: newTicket.housing_leave_exact,
        housing_when_leave: toIso(newTicket.housing_when_leave),

        // // Housing - payments & pets
        housing_can_help_with_rent: newTicket.housing_can_help_with_rent,

        //works

        housing_pets: newTicket.housing_pets,
        housing_pets_description: newTicket.housing_pets_description,
      }

      console.log("sfsdfs", newTicketData)
      return axios.post(`/api/add-ticket`, newTicketData)
    },
    {
      onSuccess,
    }
  )

  return addTicketMutation
}
