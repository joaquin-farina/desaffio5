import { Router } from "express";
import ProductManagerMongo from "../daos/MongoDB/productManager.js";

const router = Router();
const managerMongo = new ProductManagerMongo();

router
  .get("/", async (req, res) => {
    try {
      const { limit, pageQuery, query, sort } = req.query;
      const result = await managerMongo.getProducts(
        limit,
        pageQuery,
        query,
        sort
      );
      res.render("realtimeproducts", {
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
  })

  .get("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await managerMongo.getProductById(pid);
      res.render("realtimeproducts", { product, style: "index.css" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al obtener al intentar obtener el producto.");
      return;
    }
  })

  .post("/", async (req, res) => {
    try {
      const { product } = req.body;
      const result = await managerMongo.create(product);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  })

  .put("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const { prop, value } = req.body;

      await ProductManagerMongo.updateProduct(pid, prop, value);

      res.status(201).send({
        status: "succes",
        message: "Producto actualizado correctamente.",
      });
    } catch (error) {
      console.error("Error al intentar actualizar el producto:", error);
      res.status(500).json({
        error: "Error interno del servidor al actualizar el producto.",
      });
    }
  })

  .delete("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      await managerMongo.deleteProduct(pid);
      res.status(201).send({
        status: "succes",
        message: "Producto eliminado correctamente.",
      });
    } catch (error) {
      console.log(error);
    }
  });

export default router;
