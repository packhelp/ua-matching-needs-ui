import Everify from "everify"
import NextAuth from "next-auth"
import CredentialsProvider, {
  CredentialInput,
} from "next-auth/providers/credentials"
import { NextApiRequest, NextApiResponse } from "next"
import Error from "next/error"
import { parsePhoneNumberFromString } from "libphonenumber-js/max"
import axios from "axios"

const everifyAuthToken = `${process.env.EVERIFY_AUTH_TOKEN}`
const secretAuthSalt = `${process.env.SECRET_AUTH_SALT}`
const directusApiToken = `${process.env.DIRECTUS_API_AUTH}`
const env: string = `${process.env.ENV}`.toUpperCase()
import { withSentry } from "@sentry/nextjs"
import type { JWT } from "next-auth/jwt"

if (!everifyAuthToken) {
  // @ts-ignore
  throw new Error("Missing EVERIFY_AUTH_TOKEN env!")
}
if (!secretAuthSalt) {
  // @ts-ignore
  throw new Error("Missing SECRET_AUTH_SALT env!")
}
if (!directusApiToken) {
  // @ts-ignore
  throw new Error("Missing DIRECTUS_API_AUTH env!")
}
if (!env) {
  // @ts-ignore
  throw new Error("Missing ENV env!")
}

const everify = new Everify(everifyAuthToken)

interface DirectusAuthResponse {
  accessToken: string
  refreshToken: string
  expires: number
  id: string
}

async function refreshToken(token: JWT) {
  try {
    const refreshToken = token.directusRefreshToken
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/auth/refresh`,
      { refresh_token: refreshToken },
      {
        headers: {
          Authorization: `Bearer ${token.directusAccessToken}`,
          "Content-Type": "application/json",
        },
      }
    )

    token.directusAccessToken = response.data.data.access_token
    token.directusRefreshToken = response.data.data.refresh_token
    token.directusAccessTokenExpire = response.data.data.expires
  } catch (error: any) {
    token.error = "RefreshAccessTokenError"
    token.message = error.response.data.errors
  }

  return token
}

const handler = function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider<Record<string, CredentialInput>>({
      name: "Credentials",
      credentials: {
        phoneNumber: {
          label: "Phone number",
          type: "text",
          placeholder: "+48 601 601 601",
        },
      },
      // @ts-ignore
      authorize: async ({ phoneNumber, verificationCode }) => {
        if (!phoneNumber) {
          return null
        }

        const parsedPhoneNumber = parsePhoneNumberFromString(
          phoneNumber || "",
          "PL"
        )
        const onlyDigitsOfPhoneNumber = `${phoneNumber}`.match(/\d/g)?.join("")

        if (!parsedPhoneNumber?.isValid()) {
          return null
        }

        let phoneVerificationStatus
        if (env === "PRODUCTION") {
          const { status } = await everify.checkVerification({
            phoneNumber: phoneNumber,
            code: verificationCode,
          })
          phoneVerificationStatus = status
        } else {
          phoneVerificationStatus = "SUCCESS"
        }

        if (phoneVerificationStatus === "SUCCESS") {
          const directusUserAuthResponse =
            await axios.post<DirectusAuthResponse>(
              `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/api/auth-user`,
              {
                phone: phoneNumber,
              },
              {
                headers: {
                  Authorization: `Bearer ${process.env.DIRECTUS_API_AUTH}`,
                  "Content-Type": "application/json",
                },
              }
            )

          if (directusUserAuthResponse?.data?.accessToken) {
            return {
              id: onlyDigitsOfPhoneNumber,
              name: phoneNumber,
              directusAccessToken: directusUserAuthResponse?.data?.accessToken,
              directusRefreshToken:
                directusUserAuthResponse?.data?.refreshToken,
              directusAccessTokenExpire:
                directusUserAuthResponse?.data?.expires + Date.now(),
              phoneNumber: phoneNumber,
            }
          }
        }

        // Failed to login
        return null
      },
    }),
  ]

  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth.includes("signin")

  if (isDefaultSigninPage) {
    providers.pop()
  }

  return NextAuth(req, res, {
    providers: providers,
    pages: {
      signIn: "/sign-in",
      signOut: "/",
      error: "/sign-in", // Error code passed in query string as ?error=
      verifyRequest: "/auth/verify-request", // (used for check email message)
      newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    callbacks: {
      async jwt({ token, user }) {
        // the user object is what returned from the Credentials login, it has `directusAccessToken` from the server `/login` endpoint
        // assign the directusAccessToken to the `token` object, so it will be available on the `session` callback
        if (user) {
          token.directusAccessToken = user.directusAccessToken
          token.directusRefreshToken = user.directusRefreshToken
          token.directusAccessTokenExpire = user.directusAccessTokenExpire
          token.phoneNumber = user.phoneNumber
        }

        if (
          token.directusAccessTokenExpire === undefined ||
          // @ts-expect-error
          Date.now() >= token.directusAccessTokenExpire
        ) {
          return refreshToken(token)
        }

        return token
      },

      async session({ session, token }) {
        // the token object is what returned from the `jwt` callback, it has the `directusAccessToken` that we assigned before
        // Assign the directusAccessToken to the `session` object, so it will be available on our app through `useSession` hooks
        if (token) {
          session.directusAccessToken = token.directusAccessToken
          session.directusRefreshToken = token.directusRefreshToken
          session.directusAccessTokenExpire = token.directusAccessTokenExpire
          // @ts-ignore
          session.phoneNumber = token.phoneNumber
        }
        return session
      },
    },
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

export default withSentry(handler)
