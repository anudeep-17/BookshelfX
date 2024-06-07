/*
  Warnings:

  - You are about to drop the column `Avtar` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Avtar",
ADD COLUMN     "Avatar" TEXT;
