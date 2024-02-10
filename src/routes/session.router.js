import { Router } from "express";
import auth from "../middleware/authentication.middleware.js";

const router = Router();

router
    .post('/login', (req, res) => {
        const { username, password } = req.body
        if (username !== 'joaquin' || password !== '1234') return res.send('Login Failed')

        req.session.username = 'joaquin'
        req.session.admin = true

        res.send('Login success')
    })

    .post('/register', (req, res) => {
        const { firtsname, lastname, email, age, password } = req.body
        if (email === '' || password === '') return res.send('Todos los campos deben ser obligatorios.')
   
        req.session.username = 'joaquin'
        req.session.admin = true

        res.send('Login success')
    })

    .post('/logout', (req, res) => {
        req.session.destroy(error => {
            if (error) return res.send('Logout error.')
            res.send({ status: 'succes', message: 'Logout ok.' })
        })
    })

    .get('/current', auth, (req, res) => {
        res.send('Datos Sensibles')
    })

    .get('/session', (req, res) => {
        if (req.session.counter) {
            req.session.counter++
            res.send(`Ud a visitado el sitio ${req.session.counter} veces.`)
        } else {
            req.session.counter = 1
            res.send('Bienvenido a la pagina.')
        }
    })
    .get("/setCookie", (req, res) => {
        res
            .cookie("CoderC", "Esto es un cookie", { maxAge: 100000 })
            .send("Seteando cookie");
    })

    .get("/getCookie", (req, res) => {
        console.log(req.cookies);
        res.send(req.cookies);
    })

    .get("/setCookieSigned", (req, res) => {
        res
            .cookie("CoderC", "Esto es un cookie firmada", {
                maxAge: 100000,
                signed: true,
            })
            .send("Seteando cookie");
    })

    .get("/getCookieSigned", (req, res) => {
        console.log(req.cookies);
        console.log(req.signedCookies);
        res.send(req.cookies);
    })

    .get("/deleteCookie", (req, res) => {
        res.clearCookie("CoderC").send("Cookie borrado.");
    })

export default router;