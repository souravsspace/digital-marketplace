"use client"

import { Loader2, XCircle } from "lucide-react"
import Image from "next/image"
import { buttonVariants } from "../../../../components/ui/button"
import Link from "next/link"
import { useQuery } from "react-query"
import axios from "axios"
import { useSearchParams } from "next/navigation"

export default function VerifyUserEmail() {
   const searchParams = useSearchParams()

   const token = searchParams.get("token") as string
   const email = searchParams.get("to") as string

   const { data, isLoading, isError, isSuccess } = useQuery({
      queryKey: ["verify-email", { token }],
      queryFn: async () => {
         const res = await axios.post("/api/auth/verify-email", {
            token,
            email,
         })
         return res.data
      },
      enabled: token ? true : false,
   })

   if (isError) {
      return (
         <div className="flex flex-col items-center gap-2">
            <XCircle className="h-8 w-8 text-red-600" />
            <h3 className="font-semibold text-xl">There was a problem</h3>
            <p className="text-muted-foreground text-sm text-center">
               This token is not valid or might be expired. <br />
               Please try again.
            </p>
         </div>
      )
   }

   if (data?.status === 200 && isSuccess) {
      return (
         <div className="flex h-full flex-col items-center justify-center">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
               <Image
                  src="/hippo-email-sent.png"
                  fill
                  alt="the email was sent"
               />
            </div>

            <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
            <p className="text-muted-foreground text-center mt-1">
               Thank you for verifying your email.
            </p>
            <Link
               className={buttonVariants({ className: "mt-4" })}
               href="/login"
            >
               Login
            </Link>
         </div>
      )
   }

   if (data?.status === 305) {
      return (
         <div className="flex h-full flex-col items-center justify-center">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
               <Image
                  src="/hippo-email-sent.png"
                  fill
                  alt="the email was sent"
               />
            </div>

            <p className="text-muted-foreground text-center">
               You&apos;ve already verified your email.
            </p>

            <Link
               className={buttonVariants({ className: "mt-4" })}
               href="/login"
            >
               Login
            </Link>
         </div>
      )
   }

   if (isLoading) {
      return (
         <div className="flex flex-col items-center gap-2">
            <Loader2 className="animate-spin h-8 w-8 text-zinc-300" />
            <h3 className="font-semibold text-xl">Verifying...</h3>
            <p className="text-muted-foreground text-sm">
               This won&apos;t take long.
            </p>
         </div>
      )
   }
}
