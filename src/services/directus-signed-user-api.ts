import { TICKET_STATUS } from "./ticket.type"
import axios from "axios"

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
}

export class NextApiClient {
  constructor() {
    // empty
  }

  public getTicket(params: getTicketQueryParams) {
    return axios
      .get(`/api/get-tickets`, {
        params: params,
      })
      .then((response) => {
        console.log(response.data)
        return response.data
      })
  }
}
