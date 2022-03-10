import { useSession } from "next-auth/react"

export const useUserIsLoggedIn = () => {
  const { data: authSession, status: authStatus } = useSession()

  return authSession?.user.name && authStatus === "authenticated"
}
