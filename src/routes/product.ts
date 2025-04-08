import express from "express";
import { Router } from "express";
import { createProduct, getProduct } from "../controllers/product";

const router = express.Router();

router.get("/product", getProduct);
router.post("/product", createProduct);

export default router;
