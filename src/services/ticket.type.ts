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
  where?: string
  who?: string
  phone_public: boolean
  adults: number
  children: number
  has_pets: boolean
  housing_pets_description?: string
}

export type NeedTripTypeDTO = {
  need_type: "trip"

  where_to_tag: number // LocationTag
  where_from_tag: number // LocationTag
  trip_when_text?: string
  trip_when_date?: string // Date
  trip_extra_luggage: boolean
}

export type NeedHousingTypeDTO = {
  need_type: "trip"

  where_tag: number // LocationTag
  housing_how_long_text?: string
  petsNumber: number
  rentHelp?: boolean
}

export type NeedTripTypeDTONested = {
  need_type: "trip"

  where_to_tag: LocationTag // LocationTag
  where_from_tag: LocationTag // LocationTag
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

/**
 * @deprecated
 */
export type NeedHousingPostData = TicketFormData &
  PostDataDefaults &
  NeedHousingTypeDTO

export type GenericTicketPostData = TicketFormData & PostDataDefaults

export type TicketData = TicketFormData & {
  id: number
  expirationTimestampSane: string
  need_type: "trip" | "housing" | "generic" | "housing_v2" | null
  ticket_status: TICKET_STATUS
  organization_id?: Organization
  description: string
  need_tag_id: {
    need_tag_id: NeedTagType
  }[]

  need_responses: NeedResponse[]

  // SMS and Ticket Extend Token el
  expiry_notified: boolean
  extend_token: string
}

/**
 * Raw response, not model yet
 */
type TicketDTO = {
  user_created: string
  date_created: string
  user_updated: string
  date_updated: string
}

export interface NeedResponse {
  id: number
  user_created: string
  date_created: Date
  comment: string
  // need_id: number
}

export type TicketDetailsType = TicketDTO & GenericTicketPostData & TicketData
export type TicketTripDetailsType = GenericTicketPostData &
  TicketData &
  NeedTripTypeDTONested
