import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  res.render("chat", { style: "index.css" });
});

export default router;
