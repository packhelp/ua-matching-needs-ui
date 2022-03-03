import "next-auth";

declare module "next-auth" {
  interface User {
    directusAuthToken: string;
  }

  interface Session {
    user: User;
  }
}
