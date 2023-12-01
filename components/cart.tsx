"use client"

import {
   Sheet,
   SheetContent,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

export default function Cart() {
   const [mounted, setMounted] = useState(false)

   useEffect(() => setMounted(true), [])

   if (!mounted) return null

   const itemCount = 0
   const fee = 1

   return (
      <Sheet>
         <SheetTrigger>
            <Button variant="link">
               <ShoppingCart className="h-5 w-5" />
               <span className="ml-2.5 font-medium">0</span>
            </Button>
         </SheetTrigger>
         <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
            <SheetHeader className="space-y-2.5 pr-6">
               <SheetTitle>Cart (0)</SheetTitle>
            </SheetHeader>

            {itemCount > 0 ? (
               <>
                  <div className="flex flex-col pr-6 w-full">
                     {/* Todo: card logic */}
                     Cart items
                  </div>

                  <div className="space-y-4 pr-6">
                     <Separator />

                     <div className="text-sm space-y-1.5">
                        <div className="flex justify-between">
                           <span>Shipping</span>
                           <span>Free</span>
                        </div>
                        <div className="flex justify-between">
                           <span>Transaction fee</span>
                           <span>{formatCurrency(fee)}</span>
                        </div>
                        <div className="flex justify-between">
                           <span>Total</span>
                           <span>{formatCurrency(fee)}</span>
                        </div>
                     </div>

                     <SheetFooter>
                        <SheetTrigger asChild>
                           <Link
                              href="/cart"
                              className={buttonVariants({
                                 className: "w-full",
                              })}
                           >
                              Continue to checkout
                           </Link>
                        </SheetTrigger>
                     </SheetFooter>
                  </div>
               </>
            ) : (
               <div className="h-full flex items-center justify-center flex-col space-y-1">
                  <div
                     aria-hidden="true"
                     className="relative mb-4 h-60 w-60 text-muted-foreground"
                  >
                     <Image src="/hippo-empty-cart.png" fill alt="Empty cart" />
                  </div>
                  <h2 className="text-xl font-semibold">Your cart is empty!</h2>

                  <SheetTrigger asChild>
                     <Link
                        href="/products"
                        className={buttonVariants({
                           size: "sm",
                           variant: "link",
                           className: "text-sm text-muted-foreground",
                        })}
                     >
                        Continue shopping
                     </Link>
                  </SheetTrigger>
               </div>
            )}
         </SheetContent>
      </Sheet>
   )
}
