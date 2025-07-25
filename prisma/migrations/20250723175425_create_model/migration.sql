/*
  Warnings:

  - You are about to drop the column `clearkUserId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerkUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkUserId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_clearkUserId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "clearkUserId",
ADD COLUMN     "clerkUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");
