export type Organization = {
  id: number
  name: string
}

export type NeedTagType = {
  id: number
  name: string
  translation_uk_UA?: string
}

export enum TICKET_STATUS {
  ACTIVE = "ACTIVE",
  SOLVED = "SOLVED",
  EXPIRED = "EXPIRED",
  DELETED = "DELETED",
  CANCELED = "CANCELED",
  HIDDEN = "HIDDEN",
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

export type TicketDetails = TicketPostData & TicketData
