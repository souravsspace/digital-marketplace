import { NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function POST(request: Request) {
   const body = await request.json()
   const { email, token } = body

   if (!email || !token) {
      return NextResponse.json(
         { message: "Some fields are missing" },
         { status: 400 }
      )
   }

   const user = await prisma.user.findUnique({
      where: { email, email_verificationToken: token },
   })

   if (!user) {
      return NextResponse.json(
         { message: "User with this email does not exist" },
         { status: 400 }
      )
   }

   if (user.isEmailVerified) {
      return NextResponse.json(
         { message: "Email already verified" },
         { status: 305 }
      )
   }

   if (user.verificationToken !== token) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 })
   }

   try {
      await prisma.user.update({
         where: { email },
         data: {
            isEmailVerified: true,
         },
      })
      return NextResponse.json({ message: "Email verified" }, { status: 200 })
   } catch (error) {
      return NextResponse.json(
         { message: "Something went wrong" },
         { status: 500 }
      )
   }
}
