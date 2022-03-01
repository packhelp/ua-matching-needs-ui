import Everify from "everify"

const everifyAuthToken: string = `${process.env.EVERIFY_AUTH_TOKEN}`
const secretAuthSalt: string = `${process.env.SECRET_AUTH_SALT}`

if (!everifyAuthToken) {
    // @ts-ignore
    throw new Error("Missing EVERIFY_AUTH_TOKEN env!")
}
if (!secretAuthSalt) {
    // @ts-ignore
    throw new Error("Missing SECRET_AUTH_SALT env!")
}

const everify = new Everify(everifyAuthToken)

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { NextApiRequest, NextApiResponse } from "next"
import Error from "next/error"
import { parsePhoneNumberFromString } from "libphonenumber-js/max"

export default function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider<{}>({
      name: "Credentials",
      credentials: {
        phoneNumber: { label: "Phone number", type: "text", placeholder: "+48 601 601 601" },
      },
      // @ts-ignore
      authorize: async ({ phoneNumber, verificationCode }) => {
        if (!phoneNumber) {
          return null
        }

        const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber || "", "PL")
        const onlyDigitsOfPhoneNumber = `${phoneNumber}`.match(/\d/g)?.join("")

        if (!parsedPhoneNumber?.isValid()) {
          return null
        }

        const { status } = await everify.checkVerification({
          phoneNumber: phoneNumber,
          code: verificationCode,
        })

        return status === "SUCCESS" ? { id: onlyDigitsOfPhoneNumber, name: phoneNumber } : null
      },
    }),
  ]


  const isDefaultSigninPage = req.method === "GET" && req.query.nextauth.includes("signin")

  if (isDefaultSigninPage) {
    providers.pop()
  }

  return NextAuth(req, res, {
    providers: providers,

    secret: secretAuthSalt,
    session: {
      // Use JSON Web Tokens for session instead of database sessions.
      // This option can be used with or without a database for users/accounts.
      // Note: `strategy` should be set to 'jwt' if no database is used.

      // @ts-ignore
      jwt: true,
      strategy: "jwt",

      // Seconds - How long until an idle session expires and is no longer valid.
      maxAge: 30 * 24 * 60 * 60, // 30 days

      // Seconds - Throttle how frequently to write to database to extend a session.
      // Use it to limit write operations. Set to 0 to always update the database.
      // Note: This option is ignored if using JSON Web Tokens
      updateAge: 5 * 24 * 60 * 60, // 5 days
    },

    // JSON Web tokens are only used for sessions if the `jwt: true` session
    // option is set - or by default if no database is specified.
    // https://next-auth.js.org/configuration/options#jwt
    jwt: {
      // A secret to use for key generation (you should set this explicitly)
      secret: secretAuthSalt,
      // Set to true to use encryption (default: false)
      // encryption: true,
      // You can define your own encode/decode functions for signing and encryption
      // if you want to override the default behaviour.
      // encode: async ({ secret, token, maxAge }) => {},
      // decode: async ({ secret, token, maxAge }) => {},
    },
  })
}
