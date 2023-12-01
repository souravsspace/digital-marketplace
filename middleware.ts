import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { JWT } from "next-auth/jwt"

export default withAuth(
   function middleware(request: NextRequestWithAuth) {
      const notAdmin = request.nextauth.token?.role !== "ADMIN"
      const notSeller = request.nextauth.token?.role !== "SELLER"

      const adminPagePath = request.nextUrl.pathname.startsWith("/admin")
      const sellerPagePath = request.nextUrl.pathname.startsWith("/dashboard")

      if (adminPagePath && notAdmin) {
         return NextResponse.redirect(process.env.NEXT_PUBLIC_URL!)
      }

      if (notSeller && sellerPagePath) {
         return NextResponse.redirect(process.env.NEXT_PUBLIC_URL!)
      }

      return NextResponse.next()
   },
   {
      callback: {
         authorized: ({ token }: { token: JWT }) => !!token,
      },
   }
)

export const config = {
   matcher: ["/admin", "/dashboard"],
}
