"use client"

import { Icons } from "@/components/custom/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export const registerFormSchema = z.object({
   email: z.string().email({
      message: "Please enter a valid email address",
   }),
   password: z
      .string()
      .min(8, {
         message: "Password must be at least 8 characters long",
      })
      .max(20, {
         message: "Password must be less than 20 characters long",
      }),
})

export type RegisterFormType = z.infer<typeof registerFormSchema>

export default function Register() {
   const router = useRouter()
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<RegisterFormType>({
      defaultValues: {
         email: "",
         password: "",
      },
      resolver: zodResolver(registerFormSchema),
   })

   const onSubmit = async (data: RegisterFormType) => {
      try {
         const res = await axios.post("/api/auth/register", data)
         if (res.status === 200) {
            toast.success("Email sent to verify your account!")
            router.push(`/verify-email?to=${data.email}`)
         }
      } catch (error) {
         toast.error("Something went wrong!")
      }
   }

   return (
      <>
         <div className="container relative flex items-center justify-center pt-6 sm:pt-10 md:pt-20 md:pb-6 lg:px-0">
            <div className="mx-auto w-full flex flex-col justify-center space-y-6 sm:w-[350px]">
               <div className="flex flex-col items-center space-y-2 text-center">
                  <Icons.logo className="w-20 h-20" />
                  <h1 className="text-2xl font-bold">Create an account</h1>
                  <Link
                     href="/login"
                     className={buttonVariants({
                        variant: "link",
                     })}
                  >
                     <span>Already have an account? Login</span>
                     <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
               </div>

               <div className="grid gap-6">
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <div className="grid gap-2">
                        <div className="grid gap-1 py-2">
                           <Label htmlFor="email">Email</Label>
                           <Input
                              className={cn({
                                 "focus-visible:ring-red-500": errors.email,
                              })}
                              id="email"
                              type="email"
                              placeholder="your@example.com"
                              {...register("email")}
                           />
                        </div>

                        <div className="grid gap-1 py-2">
                           <Label htmlFor="password">Password</Label>
                           <Input
                              className={cn({
                                 "focus-visible:ring-red-500": errors.password,
                              })}
                              id="password"
                              type="password"
                              placeholder="Password"
                              {...register("password")}
                           />
                        </div>

                        <Button type="submit">Register</Button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </>
   )
}
