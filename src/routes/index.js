import { Router } from "express";
import cartsRouter from "./carts.router.js";
import viewsRouter from "./views.router.js";
import messageRouter from "./message.router.js";
import productsRouter from "./products.router.js";
import sessionRouter from './session.router.js'
import usersRouter from './users.router.js'

const router = Router();

router.use("/", viewsRouter);
router.use('/api/sessions', sessionRouter)
router.use("/api/products", productsRouter);
router.use("/api/chat", messageRouter);
router.use("/api/carts", cartsRouter);
router.use('/api/users', usersRouter)

router.get('*', (req, res) => {
    res.send('Not Found.')
})

export default router;