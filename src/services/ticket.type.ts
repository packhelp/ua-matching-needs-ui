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
  translation_uk_UA: string
  translation_en_US: null
  // user_created: string
  // date_created: string
  // user_updated: string
  // date_updated: string
}

export enum TICKET_STATUS {
  ACTIVE = "ACTIVE",
  SOLVED = "SOLVED",
  EXPIRED = "EXPIRED",
  DELETED = "DELETED",
  CANCELED = "CANCELED",
  HIDDEN = "HIDDEN",
  CLAIMED = "CLAIMED",
}

export type TicketFormData = {
  what?: string
  count?: number
  where?: string
  who?: string
  phone_public: boolean
  adults: number
  children: number
  has_pets: boolean
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
