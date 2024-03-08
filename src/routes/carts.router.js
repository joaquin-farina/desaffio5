import { Router } from "express";
import CartController from "../controllers/carts.controller.js";

const router = Router();
const {
  getCart,
  createCart,
  addProductToCart,
  updateQuantity,
  deleteProducts,
  deleteProductToCart
} = new CartController()

router
  .get("/:cid", getCart)

  .post("/", createCart)

  .put("/:cid/product/:pid", addProductToCart)

  .put("/:cid/products/:pid", updateQuantity)

  .delete("/:cid", deleteProducts)

  .delete("/:cid/products/:pid", deleteProductToCart);

export default router;