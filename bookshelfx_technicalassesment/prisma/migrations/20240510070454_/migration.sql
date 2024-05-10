/*
  Warnings:

  - You are about to drop the column `author` on the `BookDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BookDetails" DROP COLUMN "author",
ADD COLUMN     "authors" TEXT[];
