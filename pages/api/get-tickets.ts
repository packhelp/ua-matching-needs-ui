import Error from "next/error"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import axios from "axios"
import { withSentry } from "@sentry/nextjs"
import { TICKET_LIST_FIELDS } from "../../src/utils/directus-fields"

const getTicketsUrl = ({
  mineOnly,
  tagId,
  whereFromTag,
  whereToTag,
  phoneNumber,
  ticketStatus,
}) => {
  const filters: { key: string; value: any }[] = []
  const baseUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need/`
  const fields = TICKET_LIST_FIELDS.join(",")
  const baseSettingsUrlPart = `&fields=${fields}&sort[]=-date_created&limit=-1`

  if (ticketStatus) {
    filters.push({ key: "[ticket_status]", value: ticketStatus })
  }
  if (mineOnly) {
    filters.push({ key: "[phone]", value: phoneNumber })
  }
  if (tagId && tagId !== "0") {
    filters.push({ key: "[need_tag_id][need_tag_id][id]", value: tagId })
  }

  if (whereFromTag && whereFromTag !== "0") {
    filters.push({
      key: "[where_from_tag][id]",
      value: whereFromTag,
    })
  }
  if (whereToTag && whereToTag !== "0") {
    filters.push({
      key: "[where_to_tag][id]",
      value: whereToTag,
    })
  }

  const filterUrlPart = filters
    .map((filter, index) => {
      const prefix = index > 0 ? "&" : ""
      const filterPrefix = filters.length > 1 ? "filter[_and][]" : "filter"

      return `${prefix}${filterPrefix}${filter.key}=${filter.value}`
    })
    .join("")

  const fullUrl = `${baseUrl}?${filterUrlPart}${baseSettingsUrlPart}`

  console.debug(fullUrl)

  return fullUrl
}

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const phoneNumber = session?.user?.name?.replace("+", "%2B")
  let { mineOnly, tagId, ticketStatus, whereFromTag, whereToTag } = req.query

  console.debug(req.query)

  if (mineOnly && (!session || !session.user)) {
    res.status(403)
    return
  }

  const url = getTicketsUrl({
    mineOnly,
    phoneNumber,
    tagId,
    whereFromTag,
    whereToTag,
    ticketStatus,
  })
  const authRequestOptions = {
    headers: {
      Authorization: `Bearer ${session?.directusAccessToken}`,
      "Content-Type": "application/json",
    },
  }
  const requestOptions = session?.user.directusAuthToken
    ? authRequestOptions
    : {}
  const tickets = await axios
    .get(url, requestOptions)
    .then((response) => response.data.data)

  console.debug(`🔸 Api : ${tickets.length}`)

  return res.status(200).json(tickets)
}

export default withSentry(handler)
