const validarPublicacion = (req, res, next) => {
    const { user_nickname, text } = req.body

    if (!user_nickname) {
        return res.status(400).json({
            mensaje: 'El user_nickname es obligatorio'
        })
    }

    if (!text) {
        return res.status(400).json({
            mensaje: 'El texto de la publicación es obligatorio'
        })
    }

    next()
}

module.exports = validarPublicacion