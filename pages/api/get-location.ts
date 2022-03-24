import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import { withSentry } from "@sentry/nextjs"
import { getAdminContainer } from "../../src/services/_container.admin"

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  const { lat, long, needId, field } = req.query
  const location = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`
  )

  const features = location.data?.features
  const locationData =
    features && Array.isArray(features)
      ? features.find((feature) => feature.place_type.includes("place"))
      : null

  if (["where_destination", "where_from"].includes(field as string)) {
    const admin = getAdminContainer().containers
    const authToken = admin.nextEnv.directusAdminAuthToken

    const postData = {}
    postData[field as string] = locationData

    if (field === "where_destination") {
      postData["where_destination_lat"] = lat
      postData["where_destination_lng"] = long
    } else {
      postData["where_from_lat"] = lat
      postData["where_from_lng"] = long
    }

    await axios.patch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need/${needId}`,
      postData,
      authHeaders(authToken)
    )
  }

  return res.status(200).json(locationData)
}

const authHeaders = function (authToken) {
  return {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  }
}

export default withSentry(handler)
