/*
  Warnings:

  - You are about to drop the `categories_on_books` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories_on_books" DROP CONSTRAINT "categories_on_books_book_id_fkey";

-- DropForeignKey
ALTER TABLE "categories_on_books" DROP CONSTRAINT "categories_on_books_categoryId_fkey";

-- DropTable
DROP TABLE "categories_on_books";

-- CreateTable
CREATE TABLE "CategoriesOnBooks" (
    "book_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "CategoriesOnBooks_pkey" PRIMARY KEY ("book_id","category_id")
);

-- AddForeignKey
ALTER TABLE "CategoriesOnBooks" ADD CONSTRAINT "CategoriesOnBooks_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnBooks" ADD CONSTRAINT "CategoriesOnBooks_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
