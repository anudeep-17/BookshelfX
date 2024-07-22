/*
  Warnings:

  - Added the required column `description` to the `BookDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookDetails" ADD COLUMN     "description" TEXT NOT NULL;
