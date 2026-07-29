// src/middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  // /admin으로 시작하는 모든 것을 보호
  matcher: ["/admin/:path*"], 
};