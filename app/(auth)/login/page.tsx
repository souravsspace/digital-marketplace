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
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export const loginFormSchema = z.object({
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

export type LoginFormType = z.infer<typeof loginFormSchema>

export default function Login() {
   const router = useRouter()

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginFormType>({
      defaultValues: {
         email: "",
         password: "",
      },
      resolver: zodResolver(loginFormSchema),
   })

   const onSubmit = async (data: LoginFormType) => {
      try {
         await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
         }).then((response) => {
            if (response?.error) {
               toast.error("Invalid credentials")
            }
            if (response?.ok) {
               toast.success("Logged in successfully")
               router.push("/")
            }
         })
      } catch (error) {
         toast.error("Something went wrong")
      }
   }

   return (
      <>
         <div className="container relative flex items-center justify-center pt-6 sm:pt-10 md:pt-20 md:pb-6 lg:px-0">
            <div className="mx-auto w-full flex flex-col justify-center space-y-6 sm:w-[350px]">
               <div className="flex flex-col items-center space-y-2 text-center">
                  <Icons.logo className="w-20 h-20" />
                  <h1 className="text-2xl font-bold">Login to your account</h1>
                  <Link
                     href="/register"
                     className={buttonVariants({
                        variant: "link",
                     })}
                  >
                     <span>Don&apos;t have an account? Create here</span>
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

                        <Button type="submit">Login</Button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </>
   )
}
