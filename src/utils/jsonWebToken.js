import jwt from 'jsonwebtoken'

export const private_key = 'palabrasecretaparatoken'
const generateToken = (user) => jwt.sign(user, private_key, { expiresIn: '24h' })

export const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if (!authHeader) return res.status(401).send({ status: 'error', message: 'No token.' })

    const token = authHeader.split(' ')[1]

    jwt.verify(token, private_key, (error, decodeUser) => {
        if (error) return res.status(401).send({ status: 'error', message: 'No authorizated.' })

        req.user = decodeUser
        next()
    })
}

export default generateToken