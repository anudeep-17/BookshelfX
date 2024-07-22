/*
  Warnings:

  - You are about to drop the column `customerReviews` on the `BookDetails` table. All the data in the column will be lost.
  - The primary key for the `BookReview` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `BookReview` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,bookId]` on the table `BookReview` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,bookId]` on the table `FavoriteBook` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BookDetails" DROP COLUMN "customerReviews";

-- AlterTable
ALTER TABLE "BookReview" DROP CONSTRAINT "BookReview_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "BookReview_pkey" PRIMARY KEY ("userId", "bookId");

-- CreateIndex
CREATE UNIQUE INDEX "BookReview_userId_bookId_key" ON "BookReview"("userId", "bookId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteBook_userId_bookId_key" ON "FavoriteBook"("userId", "bookId");
