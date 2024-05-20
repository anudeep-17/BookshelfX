/*
  Warnings:

  - A unique constraint covering the columns `[title,authors]` on the table `BookDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BookDetails_title_authors_key" ON "BookDetails"("title", "authors");
