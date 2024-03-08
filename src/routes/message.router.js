import { Router } from "express";
import MessageController from "../controllers/message.controller.js";

const router = Router();
const { getMessage } = new MessageController

router.get("/", getMessage);

export default router;