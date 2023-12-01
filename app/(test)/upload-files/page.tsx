import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { join } from "path"
import { writeFile } from "fs/promises"

export default function UploadFiles() {
   const upload = async (data: FormData) => {
      "use server"

      const selectedFile = data.get("file") as unknown as File
      if (!selectedFile) {
         console.log("No file selected")
      }

      const uploadedDir = join(process.cwd(), "uploads")

      const bytes = await selectedFile.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const path = join(uploadedDir, selectedFile.name)

      await writeFile(path, buffer)
      console.log(`File uploaded on path - ${path}`, buffer)

      return {
         success: true,
      }
   }

   return (
      <form
         action={upload}
         className="h-screen flex justify-center items-center"
      >
         <div className="max-w-sm mx-auto space-y-2">
            <Input type="file" name="file" accept=".zip" required />
            <Button type="submit">Upload</Button>
         </div>
      </form>
   )
}
