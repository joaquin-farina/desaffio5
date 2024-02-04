import { Router } from "express";
import ProductManagerMongo from "../daos/MongoDB/productManager.js";

const router = Router();
const managerMongo = new ProductManagerMongo();

router.get("/", async (req, res) => {
  try {
    const { limit, pageQuery, query, sort } = req.query;
    const result = await managerMongo.getProducts(
      limit,
      pageQuery,
      query,
      sort
    );
    res.render("products", {
      status: result.status,
      payload: result.payload,
      totalPages: result.totalPages,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.prevLink,
      nextLink: result.nextLink,
      page: result.page,
      style: "index.css",
    });
  } catch (error) {
    console.log(error);
    res.render("Error al obtener la lista de productos!");
    return;
  }
});

export default router;
