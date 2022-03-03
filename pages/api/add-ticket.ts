import Error from "next/error"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { Session } from "next-auth"
import axios from "axios"

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

  console.debug(req.body)

  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need`, req.body)

  return res.status(200).json(response.data)
}
