/*
  Warnings:

  - Added the required column `isFeaturedBook` to the `BookDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookDetails" ADD COLUMN     "isFeaturedBook" BOOLEAN NOT NULL;
