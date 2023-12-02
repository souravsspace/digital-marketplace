-- CreateTable
CREATE TABLE "TestData" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TestData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "testDataId" TEXT,

    CONSTRAINT "TestImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestImage" ADD CONSTRAINT "TestImage_testDataId_fkey" FOREIGN KEY ("testDataId") REFERENCES "TestData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
