-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "nameCategory" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produk" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Produk_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Produk" ADD CONSTRAINT "Produk_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
