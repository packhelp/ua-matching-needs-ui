import type { NextPage } from "next"
import { useRouter } from "next/router"
import { Login } from "../src/components/auth/Login"
import { getUserInfo } from "../src/services/auth"
import { RouteDefinitions } from "../src/utils/routes"

const SignIn: NextPage = () => {
  const router = useRouter()
  const isLogged = getUserInfo()

  if (typeof window !== "undefined" && isLogged) {
    router.push(RouteDefinitions.AddTicket)
  }

  return <Login />
}

export default SignIn
