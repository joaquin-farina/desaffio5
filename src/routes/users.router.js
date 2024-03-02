import { Router } from "express";
import UserManagerMongo from "../daos/MongoDB/userManager.js";
import { passportCall } from "../middleware/passportCall.js";
import { authorization } from "../middleware/authorization.middleware.js";

const router = Router()
const userManager = new UserManagerMongo()

router.get('/', passportCall('jwt'), authorization(['user','admin']), async (req, res) => {
    try {
        const users = await userManager.getUsers()
        console.log(users);
        
        res.json({status: 'succes', result: users})
    } catch (error) {
        res.render(error)
        return
    }
})

export default router