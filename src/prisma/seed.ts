import { prisma } from "./client";

async function main() {
  // bersihkan data lama dahuku
  await prisma.produk.deleteMany();
  await prisma.category.deleteMany();


  const category = await prisma.category.createMany({
    data:[
        {nameCategory: "Makanan"}, {nameCategory:"Minuman"}, {nameCategory:"Camilan"}
    ]
})

const produk = await prisma.produk.createMany({
    data:[
        // Kategori Minuman (5 produk)
        { name: 'Nasi Goreng', price: 25000, stock: 50, categoryId: 1 },
        { name: 'Mie Ayam', price: 20000, stock: 30, categoryId: 1 },
        { name: 'Sate Ayam', price: 30000, stock: 40, categoryId: 1 },
        { name: 'Soto Ayam', price: 22000, stock: 35, categoryId: 1 },
        { name: 'Gado-gado', price: 28000, stock: 25, categoryId: 1 },
        // Kategori Minuman (5 produk)
        { name: 'Es Teh', price: 5000, stock: 100, categoryId: 2 },
        { name: 'Kopi Hitam', price: 8000, stock: 80, categoryId: 2 },
        { name: 'Jus Jeruk', price: 10000, stock: 70, categoryId: 2 },
        { name: 'Es Cokelat', price: 12000, stock: 65, categoryId: 2 },
        { name: 'Air Mineral', price: 3000, stock: 150, categoryId: 2 },
        // Kategori Cemilan (5 produk)
        { name: 'Keripik Kentang', price: 15000, stock: 60, categoryId: 3 },
        { name: 'Cokelat Batangan', price: 12000, stock: 75, categoryId: 3 },
        { name: 'Kacang Goreng', price: 10000, stock: 90, categoryId: 3 },
        { name: 'Permen Lolipop', price: 2000, stock: 200, categoryId: 3 },
        { name: 'Biskuit Cokelat', price: 8000, stock: 120, categoryId: 3 },
    ]
})
}

main()
  .then(() => {
    console.log("Sendding Complite ");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
