import {
  TICKET_STATUS,
  TicketDetailsType,
  NeedTagType,
  LocationTag,
} from "./ticket.type"
import axios, { AxiosRequestConfig, AxiosInstance } from "axios"
import {
  LOCATION_HUB_FIELDS,
  TAG_FIELDS,
  TICKET_DETAILS_FIELDS,
} from "../utils/directus-fields"
import { NextEnvVars } from "./next.env-variables"

export function directusAdminApiInstance(
  nextEnvVariables: NextEnvVars
): AxiosInstance {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_URL
  if (endpoint == "" || endpoint == null || typeof endpoint !== "string") {
    console.error("endpoint val", endpoint)
    throw new Error("DIRECTUS endpoint not is wrong")
  }

  const axiosInstance = axios.create({
    baseURL: endpoint,
  })
  return axiosInstance
}
