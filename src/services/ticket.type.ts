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
  extra_luggage?: boolean
  when?: string
}

export type TicketPostData = TicketFormData & {
  phone: string
  need_tag_id: {
    need_tag_id: Partial<NeedTagType>
  }[]
}

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
}

export type TicketDetailsType = TicketPostData & TicketData
