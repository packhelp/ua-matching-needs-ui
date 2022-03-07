import {
  TicketDetailsType,
  NeedTagType,
  LocationTag,
  TICKET_STATUS,
} from "./ticket.type"
import axios, { AxiosRequestConfig, AxiosInstance } from "axios"
import {
  LOCATION_HUB_FIELDS,
  TAG_FIELDS,
  TICKET_DETAILS_FIELDS,
} from "../utils/directus-fields"

// export function directusApiInstance(): AxiosInstance {
//   const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_URL
//   if (endpoint == "" || endpoint == null || typeof endpoint !== "string") {
//     console.error("endpoint val", endpoint)
//     throw new Error("DIRECTUS endpoint not is wrong")
//   }

//   const axiosInstance = axios.create({
//     baseURL: endpoint,
//   })
//   return axiosInstance
// }

interface getTicketQueryParams {
  mineOnly?: boolean
  ticketStatus: TICKET_STATUS
  tagId: number // id - relation
  page: number
  whereFromTagId: number // id - relation
  whereToTagId: number // id - relation
}

export class NextApiClient {
  constructor() {}

  public getTicket(params: getTicketQueryParams) {
    return axios
      .get(`/api/get-tickets`, {
        params: params,
      })
      .then((response) => {
        return response.data
      })
  }
}
