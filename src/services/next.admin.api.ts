import axios, { AxiosInstance } from "axios"

export function directusAdminApiInstance(): AxiosInstance {
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
