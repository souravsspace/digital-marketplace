import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export default async function Admin() {
   // TODO: Check if user is admin

   const session = await getServerSession(authOptions)

   return <div>Admin</div>
}
