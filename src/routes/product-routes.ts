import express from "express";
import { Router } from "express";

import { getProduct,
    updateProduct,
    deleteProduct,
    DetailProduct,
    RestockProduct,
    createProduk
} from "../controllers/product";

import { 
    CreateCategory,
    UpdateCategory,
    deleteCategory,
    detailCategory,

 } from "../controllers/category";
import { getAllCategory } from "../controllers/category";
import { create } from "domain";

const router = express.Router();

// router.get("/product", getAllproduct);
router.get("/produk", getProduct);
router.post("/produk", createProduk);
router.post("/produk/:id", updateProduct);
router.get("/produk/:id", DetailProduct);
router.delete("/produk/:id", deleteProduct);
router.put("/produk/:id", RestockProduct);


router.get("/category", getAllCategory);
router.get("/category/:id", detailCategory);
router.post("/category", CreateCategory);
router.post("/category/:id", UpdateCategory);
router.delete("/category/:id", deleteCategory);
export default router;
