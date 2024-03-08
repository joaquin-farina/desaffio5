import { Router } from "express";
import { passportCall } from "../middleware/passportCall.js";
import { authorization } from "../middleware/authorization.middleware.js";
import UserController from "../controllers/users.controller.js";

const router = Router()
const { getUsers } = new UserController()

router.get('/', passportCall('jwt'), authorization(['user', 'admin']), getUsers)

export default router