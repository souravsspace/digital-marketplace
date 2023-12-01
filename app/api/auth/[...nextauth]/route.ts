import prisma from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import nextAuth, { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
   providers: [
      CredentialsProvider({
         name: "credentials",
         credentials: {
            email: {
               label: "Email",
               type: "text",
               placeholder: "email",
            },
            password: {
               label: "Password",
               type: "password",
            },
         },

         async authorize(credentials) {
            const email = credentials?.email as string
            const password = credentials?.password as string

            if (!email || !password) return null

            const user = await prisma.user.findUnique({
               where: {
                  email,
               },
            })

            if (!user) return null

            const comparePassword = await bcrypt.compare(
               password,
               user.password
            )

            if (!comparePassword) return null

            if (!user.isEmailVerified) {
               return null
            }

            const { password: _, ...rest } = user

            return user
         },
      }),
   ],
   adapter: PrismaAdapter(prisma) as any, // TODO: Fix this
   secret: process.env.NEXTAUTH_SECRET,
   pages: {
      signIn: "/login",
   },
   session: {
      strategy: "jwt",
   },
   jwt: {
      secret: process.env.NEXTAUTH_SECRET,
   },
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.id = user.id
            token.role = user.role
         }
         return token
      },
      async session({ session, token }) {
         if (session?.user) {
            session.user.id = token.id
            session.user.role = token.role
         }
         return session
      },
   },
}

const handler = nextAuth(authOptions)

export { handler as GET, handler as POST }
