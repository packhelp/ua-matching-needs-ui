import { Nullable } from "tsdef"

export type Ticket = {
  id: number
  adults: Nullable<number>
  children: Nullable<number>
  count: number
  description: string
  date_created: string
  date_updated: Nullable<string>
  expirationTimestamp: Nullable<string>
  expirationTimestampSane: string
  has_pets: boolean
  location: Nullable<any>
  location_to: Nullable<any>
  need_tag_id: NeedTag[] | []
  need_type: Nullable<string>
  organization_id: Nullable<Organization>
  phone: string
  phone_public: boolean
  ticket_status: string
  user_created: Nullable<string>
  user_updated: Nullable<string>
  visits: number
  what: string
  where: string
  where_from_tag: Nullable<string>
  where_to: Nullable<string>
  where_to_tag: Nullable<string>
  who: string
}

export type NeedTagId = {
  [key: number]: {
    need_tag_id: NeedTag
  }
}

export type NeedTag = {
  background_color: Nullable<string>
  date_created: string
  date_updated: string
  id: number
  main_category: boolean
  name: string
  sort: number
  translation_en_US: Nullable<string>
  translation_uk_UA: Nullable<string>
  user_created: string
  user_updated: string
}

export type LocationTag = {
  id: number
  location_type: string
  name: string
  translation_en_US: Nullable<string>
  translation_uk_UA: Nullable<string>
}

type Organization = {
  id: number
  name: string
}
