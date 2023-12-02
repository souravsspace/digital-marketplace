/*
  Warnings:

  - You are about to drop the column `testDataId` on the `TestImage` table. All the data in the column will be lost.
  - You are about to drop the `TestData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TestImage" DROP CONSTRAINT "TestImage_testDataId_fkey";

-- AlterTable
ALTER TABLE "TestImage" DROP COLUMN "testDataId",
ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "TestData";

-- AddForeignKey
ALTER TABLE "TestImage" ADD CONSTRAINT "TestImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
