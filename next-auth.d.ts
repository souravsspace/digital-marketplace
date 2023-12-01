import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
   interface Session extends DefaultSession {
      user: {
         id: string
         role: string
      } & DefaultUser
   }
   interface User extends DefaultUser {
      id: string
      role: string
   }
}

declare module "next-auth/jwt" {
   interface JWT extends DefaultJWT {
      id: string
      role: string
   }
}
