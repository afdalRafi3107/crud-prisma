import { Request, Response } from "express";
import { prisma } from "../models/client";

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findMany();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json("cannot get data");
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    // await prisma.product.create({
    //   data: { name, cost },
    // });
    // res.status(201).json("data berhasil di-input");
  } catch (error) {
    res.status(500).json("tidak bisa masukkan data");
  }
};
