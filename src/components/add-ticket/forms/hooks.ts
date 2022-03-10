import { useQuery } from "@chakra-ui/react"
import axios from "axios"
import dayjs from "dayjs"
import { useMutation } from "react-query"
import {
    NeedHousingPostData,
    NeedTripPostData,
} from "../../../services/ticket.type"
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
        NeedHousingPostData,
        Error,
        NeedHousingPostData
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
                where_tag,
                housing_how_long_text,
            } = newTicket
            const expirationTimestampSane = dayjs().add(24, "hour").format()

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

                // This is housing request, so hardcore a trip tag
                need_tag_id: [{ need_tag_id: { id: TagConstIds.housing } }],

                // tripe specific
                need_type: "trip",
                where_tag,
                housing_how_long_text,
            }

            return axios.post(`/api/add-ticket`, newTicketData)
        },
        {
            onSuccess,
        }
    )

    return addTicketMutation
}

