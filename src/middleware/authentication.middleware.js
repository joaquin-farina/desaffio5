function auth(req, res, next) {
    if (req.session?.username === 'joaquin' && req.session?.admin) {
        return next()
    }
    return res.status(401).send('Error de authentication')
}

export default auth