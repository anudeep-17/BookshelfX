/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Avtar" TEXT,
ADD COLUMN     "favoriteCategories" TEXT[],
ALTER COLUMN "name" SET NOT NULL;
