/*
  Warnings:

  - Added the required column `expectedReturnDate` to the `BookRentalDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userInitiatedReturn` to the `BookRentalDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookRentalDetails" ADD COLUMN     "expectedReturnDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userInitiatedReturn" BOOLEAN NOT NULL,
ALTER COLUMN "returnDate" DROP NOT NULL;
