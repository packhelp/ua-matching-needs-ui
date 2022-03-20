import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import axios from "axios"
import { withSentry } from "@sentry/nextjs"
import _ceil from "lodash/ceil"
import { TICKET_LIST_FIELDS } from "../../src/utils/directus-fields"

const TICKETS_PER_PAGE = 60

const getTicketsUrl = ({
  mineOnly,
  tagId,
  phoneNumber,
  ticketStatus,
  page = 1,
}: {
  mineOnly: boolean
  tagId?: number
  phoneNumber: string
  ticketStatus: string
  page: number
}) => {
  const filters: { key: string; value: any }[] = []
  const baseUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need/`
  const fields = TICKET_LIST_FIELDS.join(",")
  const baseSettingsUrlPart = `&fields=${fields}&sort[]=-date_created`
  const paginationOffsetMultiplier = page - 1 || 0
  const paginationOffset = TICKETS_PER_PAGE * paginationOffsetMultiplier
  const paginationUrlPart = `&meta=filter_count&limit=${TICKETS_PER_PAGE}&offset=${paginationOffset}`

  if (ticketStatus) {
    filters.push({ key: "[ticket_status]", value: ticketStatus })
  }
  if (mineOnly) {
    filters.push({ key: "[phone]", value: phoneNumber })
  }
  if (tagId && tagId !== 0) {
    filters.push({ key: "[need_tag_id][need_tag_id][id]", value: tagId })
  }

  const filterUrlPart = filters
    .map((filter, index) => {
      const prefix = index > 0 ? "&" : ""
      const filterPrefix = filters.length > 1 ? "filter[_and][]" : "filter"

      return `${prefix}${filterPrefix}${filter.key}=${filter.value}`
    })
    .join("")

  const fullUrl = `${baseUrl}?${filterUrlPart}${baseSettingsUrlPart}${paginationUrlPart}`

  console.debug(fullUrl)

  return fullUrl
}

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const phoneNumber = session?.user?.name?.replace("+", "%2B")
  const { mineOnly, tagId, ticketStatus, page } = req.query

  if (mineOnly && (!session || !session.user)) {
    res.status(403)
    return
  }

  const url = getTicketsUrl({
    mineOnly: !!mineOnly,
    phoneNumber: phoneNumber as string,
    tagId: parseInt(tagId as string),
    ticketStatus: ticketStatus as string,
    page: parseInt(page as string),
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
  const results = await axios
    .get(url, requestOptions)
    .then((response) => response.data)

  console.debug(`🔸 Api : ${results.length}`)

  return res.status(200).json({
    tickets: results.data,
    meta: {
      ...results.meta,
      page_count: _ceil(results.meta.filter_count / TICKETS_PER_PAGE),
    },
  })
}

export default withSentry(handler)
