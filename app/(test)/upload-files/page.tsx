import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { join } from "path"
import { writeFile } from "fs/promises"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Image from "next/image"

export default async function UploadFiles() {
   const session = await getServerSession(authOptions)
   const userId = session?.user.id

   const upload = async (data: FormData) => {
      "use server"

      const selectedFile = data.get("file") as unknown as File

      if (!selectedFile || !userId) return

      const uploadedDir = join(process.cwd(), "public/uploads")
      const bytes = await selectedFile.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const fileName =
         crypto.randomUUID() + "." + selectedFile.name.split(".").pop()

      const path = join(uploadedDir, fileName)

      try {
         await prisma.testImage.create({
            data: {
               url: `/uploads/${fileName}`,
               userId,
            },
         })
         await writeFile(path, buffer)
      } catch (error) {
         console.log(error)
      }

      return {
         success: true,
      }
   }

   const testImages = await prisma.testImage.findMany()
   console.log(testImages)

   return (
      <form
         action={upload}
         className="h-screen flex flex-col gap-8 justify-center items-center"
      >
         <div className="max-w-sm mx-auto space-y-2">
            <Input type="file" name="file" accept=".jpg, .png, .svg" required />
            <Button type="submit">Upload</Button>
         </div>

         <div>
            <h1>Upload files</h1>
            <div className="max-w-md">
               {testImages.map((image) => (
                  <Image
                     key={image.id}
                     src={image.url}
                     alt="test"
                     width={200}
                     height={200}
                  />
               ))}
            </div>
         </div>
      </form>
   )
}
