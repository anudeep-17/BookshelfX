-- AlterTable
ALTER TABLE "BookRentalDetails" ADD COLUMN     "librarianId" INTEGER;

-- AddForeignKey
ALTER TABLE "BookRentalDetails" ADD CONSTRAINT "BookRentalDetails_librarianId_fkey" FOREIGN KEY ("librarianId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
