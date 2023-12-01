export default function AuthLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <main className="h-screen flex justify-center items-center mx-auto">
         <div className="my-1.5">{children}</div>
      </main>
   )
}
