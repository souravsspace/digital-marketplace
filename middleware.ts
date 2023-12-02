import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
   function middleware(request: NextRequestWithAuth) {
      const notAuthenticated = !request.nextauth.token

      const adminPagePath = request.nextUrl.pathname.startsWith("/admin")
      const dashboardPagePath =
         request.nextUrl.pathname.startsWith("/dashboard")

      if (adminPagePath && notAuthenticated) {
         return NextResponse.redirect(process.env.NEXT_PUBLIC_URL! + "/login")
      }

      if (dashboardPagePath && notAuthenticated) {
         return NextResponse.redirect(process.env.NEXT_PUBLIC_URL! + "/login")
      }

      return NextResponse.next()
   },
   {
      callbacks: {
         authorized: ({ token }) => !!token,
      },
   }
)

export const config = {
   matcher: ["/admin", "/dashboard"],
}
