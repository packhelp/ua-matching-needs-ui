import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import { withSentry } from "@sentry/nextjs"
import {
  TICKET_STATUS,
  TicketDetailsType,
} from "../../src/services/ticket.type"
import dayjs from "dayjs"
import { getAdminContainer } from "../../src/services/_container.admin"

const authHeaders = function (authToken) {
  return {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  }
}

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  console.log("migrate-locations handler")
  try {
    const admin = getAdminContainer().containers
    const authToken = admin.nextEnv.directusAdminAuthToken

    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need?filter[ticket_status]=active&filter[where_destination_lat][_null]=true&filter[where_destination][_nnull]=true`

    const response = await axios
      .get(url)
      .then((response) => response.data)
      .catch((err) => console.error(err))
    console.log("response :>>", response)
    const needs: TicketDetailsType[] = response.data
    if (needs.length === 0) {
      return res.status(404).send("ticket not found")
    }

    let migrated = 0
    for (const need of needs) {
      if (!!need.where_destination && !need.where_destination_lat) {
        await migrateLocation(authToken, need)
        migrated++
      }
    }

    res.status(200).json({ status: "OK", migrated })
  } catch (e: any) {
    console.log("e :>>", e)
    console.error("Error while migrating location")
    res.status(500).json({ error: e.message })
  }
}

const migrateLocation = async (authToken: string, need: TicketDetailsType) => {
  // @ts-ignore
  const destCoordinates = need.where_destination?.geometry?.coordinates
  // @ts-ignore
  const fromCoordinates = need.where_from?.geometry?.coordinates

  const patchData: any = {}

  if (destCoordinates) {
    patchData["where_destination_lng"] = destCoordinates[0]
    patchData["where_destination_lat"] = destCoordinates[1]
  }

  if (fromCoordinates) {
    patchData["where_from_lng"] = fromCoordinates[0]
    patchData["where_from_lat"] = fromCoordinates[1]
  }

  return await axios.patch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need/${need.id}`,
    {
      ...patchData,
    },
    authHeaders(authToken)
  )
}

export default withSentry(handler)
