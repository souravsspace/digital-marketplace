"use client"

import { useSession } from "next-auth/react"

export default function useUserSession() {
   const { data: session, status, update } = useSession()

   enum RoleEnum {
      USER = "USER",
      ADMIN = "ADMIN",
      SELLER = "SELLER",
   }

   const isLogin = status === "authenticated"
   const isLoading = status === "loading"
   const userData = session?.user

   const role = userData?.role

   return {
      session,
      status,
      update,
      isLogin,
      isLoading,
      userData,
      role,
      RoleEnum,
   }
}
