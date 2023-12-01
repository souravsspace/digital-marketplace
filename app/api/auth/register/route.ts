import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import prisma from "@/lib/db"
import { RegisterFormType } from "@/app/(auth)/register/page"

export async function POST(request: Request) {
   const body = await request.json()

   const { email, password }: Partial<RegisterFormType> = body

   if (!email || !password) {
      return NextResponse.json(
         { message: "Some fields are missing" },
         { status: 400 }
      )
   }

   const existingUser = await prisma.user.findUnique({
      where: { email },
   })

   if (existingUser)
      return NextResponse.json(
         { message: "User with this email already exists" },
         { status: 400 }
      )

   const hashedPassword = await bcrypt.hash(password, 10)

   try {
      const user = await prisma.user.create({
         data: {
            email,
            password: hashedPassword,
         },
      })
      return NextResponse.json({ user }, { status: 200 })
   } catch (error) {
      return NextResponse.json(
         { message: "Something went wrong" },
         { status: 500 }
      )
   }
}
