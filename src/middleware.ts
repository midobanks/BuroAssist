import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // Run middleware on all paths except static assets, favicon, and NextAuth API endpoints
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
