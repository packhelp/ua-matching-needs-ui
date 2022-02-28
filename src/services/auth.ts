const AUTH_ITEM_NAME = "user_info"

export const signIn = (phone: string): boolean => {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_ITEM_NAME, JSON.stringify({ phone }))
  }
  return true
}

export const signOut = (): boolean => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_ITEM_NAME)
  }
  return true
}

export const getUserInfo = () => {
  if (typeof window !== "undefined") {
    const authItem = localStorage.getItem(AUTH_ITEM_NAME)
    if (authItem) {
      return JSON.parse(authItem)
    }
  }
  return null
}
