import { useRouter } from "next/router"
import React, { FC, useState } from "react"
import { EnterPhoneNumber } from "./EnterPhoneNumber"
import { EnterVerificationCode } from "./EnterVerificationCode"
import { signIn } from "next-auth/react"

export const Login: FC = () => {
  const router = useRouter()
  const [hasStartedVerification, setHasStartedVerification] = useState(false)
  const [credentials, setCredentials] = useState({ phoneNumber: null })

  const startVerification = async ({ phoneNumber }) => {
    const response = await fetch("/api/auth/start-verification", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber
      }),
    })
    console.log(response)
    setCredentials({ phoneNumber })
    setHasStartedVerification(true)
  }

  const checkVerification = async ({ verificationCode }) => {
    await signIn("credentials", {
      phoneNumber: credentials.phoneNumber,
      verificationCode,
      callbackUrl: `/tickets/active/mine`, //${envs.applicationUrl}
      redirect: true,
    })
  }

  if (!hasStartedVerification) {
    return <EnterPhoneNumber onSubmit={startVerification} />
  } else {
    return <EnterVerificationCode onSubmit={checkVerification} />
  }
}
