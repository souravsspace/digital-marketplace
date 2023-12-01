"use client"

import UserAccountNav from "@/components/nav-user-account"
import { buttonVariants } from "@/components/ui/button"
import Wrapper from "@/components/custom/wrapper"
import { Icons } from "@/components/custom/icons"
import NavItems from "@/components/nav-items"
import Cart from "@/components/cart"
import Link from "next/link"
import useUserSession from "@/hooks/use-session"

export default function Navbar() {
   const { isLogin: user } = useUserSession()

   return (
      <div className="bg-white z-50 sticky top-0 inset-x-0">
         <header className="relative bg-white">
            <Wrapper>
               <div className="border-b border-gray-200">
                  <div className="flex items-center h-16">
                     {/* Todo - mobile nav */}

                     <div className="ml-4 flex lg:ml-0">
                        <Link href="/">
                           <Icons.logo className="h-10 w-10" />
                        </Link>
                     </div>

                     <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                        <NavItems />
                     </div>

                     <div className="ml-auto flex items-center">
                        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                           {user ? (
                              <UserAccountNav />
                           ) : (
                              <>
                                 <Link
                                    href="/login"
                                    className={buttonVariants({
                                       variant: "ghost",
                                    })}
                                 >
                                    Login
                                 </Link>
                                 <hr
                                    className="h-6 w-px bg-gray-200"
                                    aria-hidden="true"
                                 />
                                 <Link
                                    href="/register"
                                    className={buttonVariants({
                                       variant: "ghost",
                                    })}
                                 >
                                    Register
                                 </Link>
                              </>
                           )}
                           <hr
                              className="h-6 w-px bg-gray-200"
                              aria-hidden="true"
                           />
                           <Cart />
                        </div>
                     </div>
                  </div>
               </div>
            </Wrapper>
         </header>
      </div>
   )
}
