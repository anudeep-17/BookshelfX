-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "favoriteCategories" TEXT[],
    "Avatar" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookDetails" (
    "id" SERIAL NOT NULL,
    "ISBN" TEXT NOT NULL,
    "coverimage" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT[],
    "description" TEXT NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "category" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "publishedDate" TIMESTAMP(3) NOT NULL,
    "pagecount" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "isFeaturedBook" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookRentalDetails" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rentalDate" TIMESTAMP(3) NOT NULL,
    "expectedReturnDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3),
    "userInitiatedReturn" BOOLEAN NOT NULL,
    "returned" BOOLEAN NOT NULL,
    "isOverdue" BOOLEAN NOT NULL,
    "librarianId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookRentalDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookReview" (
    "bookId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "review" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookReview_pkey" PRIMARY KEY ("userId","bookId")
);

-- CreateTable
CREATE TABLE "FavoriteBook" (
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "FavoriteBook_pkey" PRIMARY KEY ("userId","bookId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BookDetails_title_authors_key" ON "BookDetails"("title", "authors");

-- CreateIndex
CREATE UNIQUE INDEX "BookReview_userId_bookId_key" ON "BookReview"("userId", "bookId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteBook_userId_bookId_key" ON "FavoriteBook"("userId", "bookId");

-- AddForeignKey
ALTER TABLE "BookRentalDetails" ADD CONSTRAINT "BookRentalDetails_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "BookDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookRentalDetails" ADD CONSTRAINT "BookRentalDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookRentalDetails" ADD CONSTRAINT "BookRentalDetails_librarianId_fkey" FOREIGN KEY ("librarianId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookReview" ADD CONSTRAINT "BookReview_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "BookDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookReview" ADD CONSTRAINT "BookReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteBook" ADD CONSTRAINT "FavoriteBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteBook" ADD CONSTRAINT "FavoriteBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "BookDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
