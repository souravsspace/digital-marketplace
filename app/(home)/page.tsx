import { Button, buttonVariants } from "@/components/ui/button"
import Wrapper from "@/components/custom/wrapper"
import { PERKS } from "@/lib/constant"
import Link from "next/link"

export default function Home() {
   return (
      <>
         <Wrapper>
            <div className="flex flex-col items-center max-w-3xl w-full text-center py-20 mx-auto">
               <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-gray-900">
                  Your marketplace for high-quality{" "}
                  <span className="text-primary">digital assets</span>
               </h1>
               <p className="mt-6 text-lg max-w-prose text-muted-foreground">
                  Welcome to DigitalGarden. Every asset on our platform is
                  verified by our team to ensure our highest quality standards.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Link href="/products" className={buttonVariants()}>
                     Browse Trending
                  </Link>
                  <Button variant="ghost">Our quality promise &rarr;</Button>
               </div>
            </div>

            {/* Todo List Products */}
         </Wrapper>

         <section className="border-t border-gray-200 bg-gray-50">
            <Wrapper className="py-20">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 sm:gap-x-6 lg:gap-x-8 lg:gap-y-0">
                  {PERKS.map(({ name, Icon, description }) => (
                     <div
                        key={name}
                        className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                     >
                        <div className="md:flex-shrink-0 flex justify-center">
                           <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                              {<Icon className="w-1/3 h-1/3" />}
                           </div>
                        </div>

                        <div className="mt-6 lg:mt-6 md:ml-4 lg:ml-0">
                           <h3 className="text-base font-medium text-gray-900">
                              {name}
                           </h3>
                           <p className="mt-3 text-sm text-muted-foreground">
                              {description}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </Wrapper>
         </section>
      </>
   )
}
