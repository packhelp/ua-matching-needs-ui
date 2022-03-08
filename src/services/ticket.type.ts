import { Nullable } from "tsdef"

export type Organization = {
  id: number
  name: string
}

// export type SingleTagTranslation =

export interface NeedTagType {
  id: number
  name: string // PL
  main_category: boolean
  background_color: string | null
  sort: number

  // Human names
  translation_uk_UA: Nullable<string>
  translation_en_US: Nullable<string>
  // user_created: string
  // date_created: string
  // user_updated: string
  // date_updated: string
}

export interface LocationTag {
  id: number
  name: string
  location_type: "city" | "border_crossing" | "generic" | "help_center"
  translation_uk_UA: string | null
  translation_en_US: string | null
  short_name: string | null

  need_to: number[]
  need_from: number[]
}

export enum TICKET_STATUS {
  ACTIVE = "active",
  SOLVED = "solved",
  EXPIRED = "expired",
  DELETED = "deleted",
  CANCELED = "canceled",
  HIDDEN = "hidden",
  // CLAIMED = "claimed", <-- WE DON"T HAVE CLAIMED STATUS. Check responses field insted!!!
}

export type TicketFormData = {
  what?: string
  description?: string
  count?: number
  where?: string
  who?: string
  phone_public: boolean
  adults: number
  children: number
  has_pets: boolean
}

export type NeedTripTypeDTO = {
  need_type: "trip"

  where_to_tag: number // LocationTag
  where_from_tag: number // LocationTag
  trip_when_text?: string
  trip_when_date?: string // Date
  trip_extra_luggage: boolean
}

export type PostDataDefaults = {
  phone: string
  need_tag_id: {
    need_tag_id: Partial<NeedTagType>
  }[]
}

export type NeedTripPostData = TicketFormData &
  PostDataDefaults &
  NeedTripTypeDTO

export type GenericTicketPostData = TicketFormData & PostDataDefaults

export type TicketData = TicketFormData & {
  id: number
  expirationTimestampSane: string
  date_created: number
  ticket_status: TICKET_STATUS
  organization_id?: Organization
  description: string
  need_tag_id: {
    need_tag_id: NeedTagType
  }[]
  visits: number
  need_responses: NeedResponse[]
}

export interface NeedResponse {
  id: number
  user_created: string
  date_created: Date
  comment: string
  // need_id: number
}

export type TicketDetailsType = GenericTicketPostData & TicketData
