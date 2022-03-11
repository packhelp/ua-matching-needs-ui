import { TicketDetailsType, NeedTagType, LocationTag } from "./ticket.type"
import axios, { AxiosInstance } from "axios"
import {
  LOCATION_HUB_FIELDS,
  TAG_FIELDS,
  TICKET_DETAILS_FIELDS,
} from "../utils/directus-fields"
import { LocationTagConstIds } from "./types.tag"

export function directusApiInstance(): AxiosInstance {
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

export class TicketService {
  constructor(private api: AxiosInstance) {}

  public async ticket(id: number): Promise<TicketDetailsType | null> {
    try {
      const response = await this.api.get(`/items/need/${id}`)
      const { data } = response.data
      return data
    } catch (e: any) {
      // it's a Directus' bug
      // https://github.com/directus/directus/blob/962af79dbcd773e4c00c2c6cd0b89a14155320b5/api/src/services/items.ts#L322
      if (e.response.status === 403) {
        return null
      }
      throw new Error(e.message)
    }
  }

  public async update(
    id: number,
    patch: Partial<TicketDetailsType>
  ): Promise<TicketDetailsType | null> {
    const response = await this.api.patch(`/items/need/${id}`, patch)
    const { data } = response.data
    return data
  }

  public async ticketWithNestedData(
    id: number
  ): Promise<TicketDetailsType | null> {
    const fields = TICKET_DETAILS_FIELDS.join(",")
    const url = `/items/need/${id}?fields=${fields}`

    try {
      const response = await this.api.get(url)
      const { data } = response.data
      return data
    } catch (e: any) {
      // it's a Directus' bug
      // https://github.com/directus/directus/blob/962af79dbcd773e4c00c2c6cd0b89a14155320b5/api/src/services/items.ts#L322
      if (e.response.status === 403) {
        return null
      }
      throw new Error(e.message)
    }
  }

  public async mainTags(): Promise<NeedTagType[]> {
    const fields = TAG_FIELDS.join(",")
    const response = await this.api.get(
      `/items/need_tag?filter[main_category][_eq]=1&fields=${fields}`
    )
    return response.data.data
  }

  public async allTags(): Promise<NeedTagType[]> {
    const fields = TAG_FIELDS.join(",")
    const response = await this.api.get(`/items/need_tag?fields=${fields}`)
    return response.data.data
  }

  public async locationTags(): Promise<LocationTag[]> {
    const fields = LOCATION_HUB_FIELDS.join(",")
    const response = await this.api.get(`/items/location_hub?fields=${fields}`)
    return response.data.data
  }

  public async locationTagsForHousing(): Promise<LocationTag[]> {
    const locationTags = await this.locationTags()
    // Step 1 get tags
    const anywhere = locationTags.find(
      (tag) => (tag.id = LocationTagConstIds.anywhere)
    )
    const citiesAndGeneralLocations = locationTags.filter((tag) => {
      return (
        tag.location_type !== "help_center" &&
        tag.location_type !== "border_crossing"
      )
    })

    // Step 2 concat
    let finalTags: LocationTag[] = []
    if (anywhere) {
      finalTags.push(anywhere)
    }

    finalTags = finalTags.concat(citiesAndGeneralLocations)

    // Step 3 sort and ui  / Establish "ui" name
    finalTags = finalTags.map((tag) => {
      let name = tag.name
      if (tag.short_name != null) {
        name = tag.short_name
      }
      return tag
    })

    finalTags.sort((a, b) => a.name.localeCompare(b.name))

    return finalTags
  }
}
