-- CreateTable
CREATE TABLE "Sheet" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isEmpty" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Sheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contents" (
    "id" SERIAL NOT NULL,
    "sheetId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "contents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sheet" ADD CONSTRAINT "Sheet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "Sheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
