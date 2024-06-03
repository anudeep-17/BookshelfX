/*
  Warnings:

  - Added the required column `isOverdue` to the `BookRentalDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookRentalDetails" ADD COLUMN     "isOverdue" BOOLEAN NOT NULL;
