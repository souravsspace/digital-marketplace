import { cn } from "@/lib/utils"

interface WrapperProps {
   children: React.ReactNode
   className?: string
}

export default function Wrapper({ children, className }: WrapperProps) {
   return (
      <main
         className={cn("max-w-7xl w-full mx-auto px-2.5 md:px-20", className)}
      >
         {children}
      </main>
   )
}
