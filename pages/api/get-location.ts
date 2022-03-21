import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import { withSentry } from "@sentry/nextjs"

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  const { lat, long } = req.query
  const location = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${long}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`
  )

  return res.status(200).json(location.data)
}

export default withSentry(handler)
