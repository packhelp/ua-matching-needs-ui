import "next-auth"

declare module "next-auth" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface User {}

  interface Session {
    user: User
    directusAuthToken: string
    phoneNumber: string
  }
}
