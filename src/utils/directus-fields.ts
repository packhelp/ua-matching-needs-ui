export const TICKET_LIST_FIELDS = [
  "*",
  "organization_id.*",
  "need_tag_id.need_tag_id.*",
  "where_from_tag.id",
  "where_from_tag.name",
  "where_from_tag.location_type",
  "where_to_tag.id",
  "where_to_tag.name",
  "where_to_tag.location_type",
]

export const TICKET_DETAILS_FIELDS = ["*", "need_tag_id.need_tag_id.*"]

export const TAG_FIELDS = ["*"]

export const LOCATION_HUB_FIELDS = ["id, name, location_type"]
