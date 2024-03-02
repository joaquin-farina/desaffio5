import { Router } from "express";
import UserManagerMongo from "../daos/MongoDB/userManager.js";
import { createHash, isValidPassword } from "../utils/hashBcrypt.js";
import generateToken, { authToken } from "../utils/jsonWebToken.js";
import { passportCall } from "../middleware/passportCall.js";
import { authorization } from "../middleware/authorization.middleware.js";

// import auth from "../middleware/authentication.middleware.js";
// import passport from "passport";

const router = Router();
const usersManager = new UserManagerMongo()

// router
//     .post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }), async (req, res) => {
//         res.send({ status: 'Success', message: 'Usuario registrado correctamente.' })
//     })

//     .get('/failregister', async (req, res) => {
//         res.send({ error: 'Fallo el registro de usuario.' })
//     })

//     .post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin' }), async (req, res) => {
//         if (!req.user) return res.status(401).send({ status: 'error', error: 'Usuario o clave incorrecta.' })

//         req.session.user = {
//             firstname: req.user.firstname,
//             lastname: req.user.lastname,
//             email: req.user.email,
//             id: req.user._id
//         }

//         res.send({ status: 'succes', message: req.user })
//     })

//     .get('/faillogin', async (req, res) => {
//         res.send({ error: 'Fallo el inicio de sesion.' })
//     })

//     .get('/github', passport.authenticate('github', { scope: ['user: email'] }), async (req, res) => { })
//     .get('/githubcallback', passport.authenticate('github', { failureRedirect: '/api/sessions/login' }), async (req, res) => {
//         req.session.user = req.user
//         res.redirect('/')
//     })

//     .get('/logout', (req, res) => {
//         req.session.destroy(error => {
//             if (error) return res.send('Logout error.')
//             res.send({ status: 'succes', message: 'Logout ok.' })
//         })
//     })

//     .get('/current', auth, (req, res) => {
//         res.send('Datos Sensibles')
//     })

////////////////////////////////////////////////////////////////////////////
router.post('/register', async (req, res) => {
    const { firstname, lastname, email, password } = req.body

    const userNew = {
        firstname,
        lastname,
        email,
        password: createHash(password)
    }

    const result = await usersManager.createUser(userNew)

    const token = generateToken({
        id: result._id
    })

    res.status(200).cookie('CookieToken', token, {
        maxAge: 60 * 60 * 1000 * 24,
        httpOnly: true
    }).send({
        status: 'success',
        usersCreate: result,
        token
    })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await usersManager.getUserBy({ email })

    if (!user) return res.status(401).send({ status: 'error', message: 'El email ingresado no existe.' })

    const hash = user.password

    if (!isValidPassword(password, hash)) return res.status(401).send({ status: 'error', message: 'No coincide las credenciales' })

    const token = generateToken({
        email: user.email,
        role: user.role
    })

    res.status(200).cookie('CookieToken', token, {
        maxAge: 60 * 60 * 1000 * 24,
        httpOnly: true
    }).send({
        status: 'success',
        usersCreate: 'login success'
    })

})

router.post('/logout', (req, res) => {
    res.send('logout')
})

router.get('/current', passportCall('jwt'), authorization('user'), async (req, res) => {
    res.send('Datos Sensibles session')
})

export default router;