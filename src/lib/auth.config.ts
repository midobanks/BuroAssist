import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
    error: "/sign-in",
    verifyRequest: "/verify-request",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      
      const isAuthRoute = nextUrl.pathname.startsWith("/sign-in") || 
                          nextUrl.pathname.startsWith("/sign-up") || 
                          nextUrl.pathname.startsWith("/verify-request");
      
      const isPublicRoute = nextUrl.pathname === "/" || 
                            nextUrl.pathname.startsWith("/workflows") || 
                            nextUrl.pathname.startsWith("/glossary") || 
                            nextUrl.pathname.startsWith("/resources") || 
                            nextUrl.pathname.startsWith("/about") || 
                            nextUrl.pathname.startsWith("/privacy") || 
                            nextUrl.pathname.startsWith("/terms") || 
                            nextUrl.pathname.startsWith("/disclaimer") ||
                            nextUrl.pathname.startsWith("/api/cities") ||
                            nextUrl.pathname.startsWith("/api/glossary") ||
                            nextUrl.pathname.startsWith("/api/resources") ||
                            nextUrl.pathname.startsWith("/api/feedback") ||
                            nextUrl.pathname.startsWith("/api/workflows");
      
      const isAdminRoute = nextUrl.pathname.startsWith("/admin") ||
                           nextUrl.pathname.startsWith("/api/admin");

      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      }

      if (isPublicRoute) {
        return true;
      }

      if (!isLoggedIn) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
          callbackUrl += nextUrl.search;
        }
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        return Response.redirect(
          new URL(`/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl)
        );
      }

      if (isAdminRoute) {
        const userRole = auth?.user?.role;
        if (userRole !== "admin") {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
