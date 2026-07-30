import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // 별도로 분리한 설정 파일을 불러옴

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };