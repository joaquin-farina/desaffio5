import { Router } from "express";
import { passportCall } from "../middleware/passportCall.js";
import { authorization } from "../middleware/authorization.middleware.js";
import SessionController from "../controllers/sessions.controller.js";

// import auth from "../middleware/authentication.middleware.js";
// import passport from "passport";

const router = Router();
const { register, login, logout, current } = new SessionController()

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

// router.get('/github', passport.authenticate('github', { scope: ['user: email'] }), async (req, res) => { })
// router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/api/sessions/login' }), async (req, res) => {
//     req.session.user = req.user
//     res.redirect('/')
// })

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

router.post('/register', register)

router.post('/login', login)

router.get('/logout', logout)

router.get('/current', passportCall('jwt'), authorization('admin'), current)

export default router;