import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      uid: string;
    } & DefaultSession["user"];
  }
}
