import { Router } from 'express'
import jwt from 'jsonwebtoken'

class RouterClass {
    constructor() {
        this.router = Router
    }

    getRouter = () => {
        return this.router
    }

    init() { }

    applyCallback(callbacks) {
        return callbacks.map(callback => async (...params) => {
            try {
                await callback.apply(this, params)
            } catch (error) {
                console.log(error);
                params[1].status(500)
            }
        })
    }

    generateCustomResponses = (req, res, next) => {
        res.sendSuccess = payload => res.send({ status: 'Success', payload })
        res.sendServerError = error => res.send({ status: 'Error', error })
        res.sendUserError = error => res.send({ status: 'Error', error })
    }

    handlePolicies = policies => (req, res, next) => {
        if (policies[0] === 'public') next()
        const authHeaders = req.headers.authorization
        const token = authHeaders.split(' ')[1]
        let user = jwt.verify(token, 'palabrasecretaparatoken')
        if (!policies.includes(user.role.toUpperCase())) res.status(403).send({ status: 'Error', error: 'Not permissions' })
        req.user = user
        next()
    }

    get(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies, this.generateCustomResponses, this.applyCallback(callbacks))
    }
    post() { }
    put() { }
    delete() { }
}

export default RouterClass