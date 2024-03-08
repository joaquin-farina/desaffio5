import { Router } from "express";
import ProductManagerMongo from "../daos/MongoDB/productManager.js";
import ProductController from "../controllers/products.controller.js";

const router = Router();
const managerMongo = new ProductManagerMongo();
const { getProducts } = new ProductController()

router.get("/", getProducts);

export default router;