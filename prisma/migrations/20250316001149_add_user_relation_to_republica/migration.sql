/*
  Warnings:

  - Added the required column `userId` to the `Republica` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Republica" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Republica" ADD CONSTRAINT "Republica_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
