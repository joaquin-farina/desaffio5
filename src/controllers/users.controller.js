import UserManagerMongo from "../daos/MongoDB/userManager.js";

class UserController {
    constructor() {
        this.service = new UserManagerMongo()
    }

    getUsers = async (req, res) => {
        try {
            const users = await this.service.get()
            
            res.send(users)
            // res.render('users', { users })
        } catch (error) {
            res.send({status: 'error', message: error})
        }
    }
}

export default UserController