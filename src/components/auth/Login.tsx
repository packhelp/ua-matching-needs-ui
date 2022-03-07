import { useRouter } from "next/router"
import React, { FC, useState } from "react"
import { EnterPhoneNumber } from "./EnterPhoneNumber"
import { EnterVerificationCode } from "./EnterVerificationCode"
import { signIn } from "next-auth/react"
import { getRoutePathForLocale } from "../../utils/routes"
import { Locale } from "../../translations/definitions"

export const Login: FC = () => {
  const router = useRouter()
  const { error: errorInUrlQuery } = router.query
  const [hasStartedVerification, setHasStartedVerification] = useState(false)
  const [credentials, setCredentials] = useState({ phoneNumber: null })
  const [error, setError] = useState<string>()
  const errorMessage =
    "Nie udało się autoryzować twojego telefonu. Spróbuj jeszcze raz!"

  errorInUrlQuery && !error && setError(errorMessage)

  const startVerification = async ({ phoneNumber }) => {
    const response = await fetch("/api/auth/start-verification", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
      }),
    })
    console.log(response)
    setCredentials({ phoneNumber })
    setHasStartedVerification(true)
  }

  const checkVerification = async ({ verificationCode }) => {
    const forcedReturnPath = router.query.returnPath as string
    const defaultReturnPath = `/tickets/active/mine`
    const returnPath = forcedReturnPath || defaultReturnPath

    try {
      await signIn("credentials", {
        phoneNumber: credentials.phoneNumber,
        verificationCode,
        callbackUrl: getRoutePathForLocale(returnPath, router.locale as Locale),
        redirect: true,
      })
    } catch (e) {
      setError(errorMessage)
      setHasStartedVerification(false)
    }
  }

  if (!hasStartedVerification) {
    return <EnterPhoneNumber onSubmit={startVerification} error={error} />
  } else {
    return <EnterVerificationCode onSubmit={checkVerification} />
  }
}
