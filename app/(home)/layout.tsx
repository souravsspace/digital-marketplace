import Navbar from "@/components/navbar"
import { cn } from "@/lib/utils"

export default async function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <main className={cn("relative h-full font-sans antialiased")}>
         <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex-1">{children}</div>
         </div>
      </main>
   )
}
