import QueryProvider from "@/components/providers/query-client-provider"
import ToastProvider from "@/components/providers/toast-provider"
import AuthProvider from "@/components/providers/auth-provider"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { cn } from "@/lib/utils"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
   title: "Digital Garden",
   description: "A digital garden by souravukil",
}

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html lang="en">
         <AuthProvider>
            <QueryProvider>
               <body
                  className={cn(
                     "relative h-full font-sans antialiased",
                     inter.className
                  )}
               >
                  <ToastProvider />
                  {children}
               </body>
            </QueryProvider>
         </AuthProvider>
      </html>
   )
}
