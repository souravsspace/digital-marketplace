"use client"

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuPortal,
   DropdownMenuSeparator,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import useUserSession from "@/hooks/use-session"
import Link from "next/link"
import { signOut } from "next-auth/react"
import toast from "react-hot-toast"
import {
   LayoutDashboard,
   LogOut,
   Settings,
   UserRoundX,
   FileLock2,
} from "lucide-react"

export default function UserAccountNav() {
   const { userData } = useUserSession()
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild className="overflow-visible">
            <Button size="sm" variant="ghost" className="relative">
               My Account
            </Button>
         </DropdownMenuTrigger>

         <DropdownMenuContent className="w-60 bg-white" align="start">
            <div className="flex items-center justify-start gap-2 p-2">
               <div className="flex flex-col space-y-0 5 leading-none">
                  <p className="font-medium text-black text-sm">
                     {userData?.email}
                  </p>
               </div>
            </div>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
               <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
               </Link>
            </DropdownMenuItem>

            <DropdownMenuSub>
               <DropdownMenuSubTrigger>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  {/* todo: user settings pass rest and delete account */}
               </DropdownMenuSubTrigger>
               <DropdownMenuPortal>
                  <DropdownMenuSubContent className="mr-1.5 w-40">
                     <DropdownMenuItem>
                        <FileLock2 className="mr-2 h-4 w-4" />
                        <span>Psssword Reset</span>
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <UserRoundX className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                     </DropdownMenuItem>
                  </DropdownMenuSubContent>
               </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuItem
               className="cursor-pointer"
               onClick={async () => {
                  await signOut()
                  toast.success("Logout successfully")
               }}
            >
               <LogOut className="mr-2 h-4 w-4" />
               Logout
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
