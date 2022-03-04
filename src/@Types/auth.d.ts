import "next-auth"

declare module "next-auth" {
  interface User {}

  interface Session {
    user: User
    directusAuthToken: string
    phoneNumber: string
  }
}
