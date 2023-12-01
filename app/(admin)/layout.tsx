import { Metadata } from "next"
import AdminNavBar from "./admin/components/admin-navbar"

export const metadata: Metadata = {
   title: "Admin",
   description: "Admin page",
}

type Props = { children: React.ReactNode }

export default function AdminLayout({ children }: Props) {
   return (
      <main>
         <AdminNavBar />
         {children}
      </main>
   )
}
