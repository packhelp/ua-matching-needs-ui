import type { NextPage } from "next"
import { useRouter } from "next/router"
import { Login } from "../src/components/auth/Login"
import { RouteDefinitions } from "../src/utils/routes"
import { useSession } from "next-auth/react"

const SignIn: NextPage = () => {
  const router = useRouter()
  const { data: authSession, status: authStatus } = useSession()

  if (typeof window !== "undefined" && authSession?.user && authStatus === "authenticated") {
    router.push(RouteDefinitions.AddTicket)
  }

  return <Login />
}

export default SignIn
