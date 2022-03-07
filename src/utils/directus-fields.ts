export const TICKET_LIST_FIELDS = [
  "*",
  "organization_id.*",
  "need_tag_id.need_tag_id.*",
  "where_from_tag.id",
  "where_from_tag.name",
  "where_from_tag.location_type",
  "where_to_tag.id",
  "where_to_tag.name",

  // need responses
  "need_responses.id",
  "need_responses.date_created",
  "need_responses.comment",
]

export const TICKET_DETAILS_FIELDS = [
  "*",
  "need_tag_id.need_tag_id.*",
  "need_responses.*",
]

export const TAG_FIELDS = ["*"]

export const LOCATION_HUB_FIELDS = [
  "id",
  "name",
  "short_name",
  "location_type",
  "translation_uk_UA",
  "translation_en_US",
  "address",
]
