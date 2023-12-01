"use client"

import { PRODUCT_CATEGORIES } from "@/lib/constant"
import NavItem from "@/components/nav-item"

import { useEffect, useRef, useState } from "react"
import { useOnClickOutside } from "@/hooks/use-click-outside"

export default function NavItems() {
   const [activeIndex, setActiveIndex] = useState<Number | null>(null)

   useEffect(() => {
      const handler = (e: KeyboardEvent) => {
         if (e.key === "Escape") {
            setActiveIndex(null)
         }
      }

      document.addEventListener("keydown", handler)

      return () => document.removeEventListener("keydown", handler)
   }, [])

   const isAnyOpen = activeIndex !== null

   const navRef = useRef<HTMLDivElement | null>(null)

   useOnClickOutside(navRef, () => setActiveIndex(null))

   return (
      <div className="flex gap-4 h-full" ref={navRef}>
         {PRODUCT_CATEGORIES.map((category, index) => {
            const handleOpen = () => {
               if (index === activeIndex) {
                  setActiveIndex(null)
               } else {
                  setActiveIndex(index)
               }
            }

            const isOpen = activeIndex === index

            return (
               <NavItem
                  key={category.value}
                  category={category}
                  handleOpen={handleOpen}
                  isOpen={isOpen}
                  isAnyOpen={isAnyOpen}
               />
            )
         })}
      </div>
   )
}
