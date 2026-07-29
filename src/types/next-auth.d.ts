import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userId: string;
      name: string;
      role: string;
      level: number;
    };
  }
}