import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  // 1. 세션 만료 시간 설정 (30분)
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30분 (초 단위)
  },
  jwt: {
    maxAge: 30 * 60, // 30분
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userId: { label: "UserId", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.userId || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.userId },
          include: { permissionLevel: true },
        });

        // 비밀번호 확인 (실제 운영 시에는 bcrypt 등으로 암호화 비교를 권장합니다)
        if (!user || credentials.password !== "dldmaxhdtls!") return null;

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          level: user.level,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      // 로그인 시점에 user 정보를 토큰에 저장
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.level = user.level;
      }
      return token;
    },
    async session({ session, token }: any) {
      // 토큰 정보를 세션 객체로 전달
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.level = token.level;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};