"use client"

import { useSession } from "next-auth/react"

export default function useUserSession() {
   const { data: session, status, update } = useSession()

   const isLogin = status === "authenticated"
   const isLoading = status === "loading"
   const userData = session?.user

   return { session, status, update, isLogin, isLoading, userData }
}
