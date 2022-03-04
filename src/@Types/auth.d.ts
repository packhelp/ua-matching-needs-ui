import "next-auth";

declare module "next-auth" {
  interface User {
    directusAuthToken: string;
    phoneNumber: string;
  }

  interface Session {
    user: User;
  }
}
