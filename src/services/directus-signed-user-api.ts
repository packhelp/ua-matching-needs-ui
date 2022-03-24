import { TICKET_STATUS } from "./ticket.type"
import axios from "axios"
import maplibregl from "maplibre-gl"

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
  mapBounds?: maplibregl.LngLatBounds
}

export class NextApiClient {
  public getTicket(params: getTicketQueryParams) {
    const mapBoundsParams = {
      ne_lng: params.mapBounds?._ne.lng,
      ne_lat: params.mapBounds?._ne.lat,
      sw_lng: params.mapBounds?._sw.lng,
      sw_lat: params.mapBounds?._sw.lat,
    }

    return axios
      .get(`/api/get-tickets`, {
        params: { ...params, ...mapBoundsParams },
      })
      .then((response) => response.data)
  }
}
