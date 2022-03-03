import Error from "next/error"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { Session } from "next-auth"
import axios from "axios"

const getTicketsUrl = ({ mineOnly, tagId, phoneNumber, ticketStatus }) => {
  const filters: { key: string, value: any }[] = []
  const baseUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need/`
  const baseSettingsUrlPart = `&fields=*.*.*&sort[]=-date_created`

  if (ticketStatus) {
    filters.push({ key: "[ticket_status]", value: ticketStatus })
  }
  if (mineOnly) {
    filters.push({ key: "[phone]", value: phoneNumber })
  }
  if (tagId && tagId !== "0") {
    filters.push({ key: "[need_tag_id][need_tag_id][id]", value: tagId })
  }

  const filterUrlPart = filters.map((filter, index) => {
    const prefix = index > 0 ? "&" : ""
    const filterPrefix = filters.length > 1 ? "filter[_and][]" : "filter"

    return `${prefix}${filterPrefix}${filter.key}=${filter.value}`
  }).join("")

  const fullUrl = `${baseUrl}?${filterUrlPart}${baseSettingsUrlPart}`

  console.debug(fullUrl)

  return fullUrl
}

export async function getCurrentUser(req: NextApiRequest): Promise<Session["user"]> {
  const session = await getSession({ req })

  if (!session || !session.user) {
    // @ts-ignore
    throw new Error("Session does not exist")
  }

  return session.user
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const user = await getCurrentUser(req)
  const { mineOnly, tagId, ticketStatus } = req.query

  console.debug(req.query)

  const phoneNumber = user.name?.replace("+", "%2B")
  const url = getTicketsUrl({ mineOnly, phoneNumber, tagId, ticketStatus })

  const tickets = await axios.get(url).then((response) =>
    response.data.data
  )

  console.debug(`🔸 Api : ${tickets.length}`)

  return res.status(200).json(tickets)
}
