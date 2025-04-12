import express from "express";
import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { error, log } from "console";
import { equal } from "assert";

export const fullProduct = async (req: Request, res: Response) => {
  
}


export const getProduct = async (req: Request, res: Response) => {
  const { kategori,
    sortBy,
    order,
    minPrice,
    maxPrice,
    minStock=0,
    maxStock=300,
    limit = 10,
    offset = 0,
    name,
  } = req.query;
  console.log(req.query);
  

  const filter: any = {};
  if (name) {
    filter.name = { contains: String(name), mode: 'insensitive' };
  }

  //filter price
  if (minPrice) filter.price = { gte: parseFloat(minPrice as string) };
  if (maxPrice)
    filter.price = {
      ...(filter.price || {}),
      lte: parseFloat(maxPrice as string),
    };

  //filter stock
  if (minStock) filter.stock = { gte: parseFloat(minStock as string) };
  if (maxStock)
    filter.stock = {
      ...(filter.stock || {}),
      lte: parseFloat(maxStock as string),
    };

  
  console.log(filter);

  try {
if(name){
  const produk = await prisma.produk.findMany({
    where: filter,
    orderBy: {
      [sortBy as string]: order as "asc" | "desc",
    },
    take: Number(limit as string) ,
    skip: Number(offset),
    include:{
      history:{
        select:{
          stock:true,
        }
      }
    }
  })
  const total = await prisma.produk.count({ where: filter });
  res.json({ data: produk, total });
}else{
  const produk = await prisma.produk.findMany({
    where: filter,
    orderBy: {
      [sortBy as string]: order as "asc" | "desc",
    },
    take: Number(limit as string) ,
    skip: Number(offset),
    include:{
      history:{
        select:{
          stock:true,
        }
      }
    }
  })
  const total = await prisma.produk.count({ where: filter });
  res.json({ data: produk, total });
}

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// update produck

export const updateProduct = async (req: Request, res: Response) =>{

  try {

      const id = Number(req.params.id);
      const { name, price, stock, categoryId } = req.body;
  
      const data: any = {};
      if (name !== undefined) data.name = name;
      if (price !== undefined) data.price = price;
      if (stock !== undefined) data.stock = stock;
      if (categoryId !== undefined) data.categoryId = categoryId;

      const updated = await prisma.produk.update({
        where: { id },
       data,
      });
  
      res.json(updated);
    
  } catch (error) {
    res.status(500).json({ error: "Failed to update products" });
  }

}

// delete product

  export const deleteProduct = async (req:Request, res:Response)=>{
     const categoryId = parseInt(req.params.id);
    try {
      const hapus = await prisma.produk.delete({
        where:{id:categoryId}
      })
      res.json("Data successfully deleted")
    } catch (error) {
      res.status(500).json({ error: "Failed to delete products" });
    }
  }

  //deailproduks
  export const DetailProduct = async (req:Request, res:Response)=>{
    const idproduct = parseInt(req.params.id);
    try {
      const detailProduct = await prisma.produk.findMany({
        where:{id:idproduct},
      });
      res.json(detailProduct)
    } catch (error) {
      res.status(500).json({ error: "Failed to get products" });
    }
  }

  //isi ualgn produk
export const RestockProduct = async (req:Request, res:Response)=> {
  const productId = parseInt(req.params.id);
  const {quantity} = req.body;
  console.log(quantity);
  
  
  if(isNaN(quantity) || quantity <= 0){
    res.status(400).json({error: 'Jumlah stok yang ditambahkan harus berupa angka positif.'})
  };
try {
  const cekidproduk = await prisma.produk.findUnique({
    where:{id : productId}
  });
  if(!cekidproduk){
    throw res.status(400).json({error: 'Produk tidak Ketemu'})
  }
  const updateProduk = await prisma.produk.update({
    where:{id : productId},
    data:{
      stock: {increment:quantity},
    }
  })
  const addToHistory = await prisma.history.create({
    data:{
      produkId:productId,
      stock:quantity,
    }
  })
  
  console.log(updateProduk);
  res.json("Stock berhasil di-update")
} catch (error) {
  res.status(500).json("Failed to update stock products")
}
}

export const createProduk = async (req:Request, res:Response)=>{
  const {name, price, stock, categoryId} =  req.body

  try {
    const createProduk = await prisma.produk.create({
      data:{
        name:name,
        price:price,
        stock:stock,
        categoryId:categoryId
      }
    })
    res.json("Produk baru berhasil di buat")
  } catch (error) {
    res.status(500).json("Failed to update create products")
  }
}