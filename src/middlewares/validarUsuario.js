const validarUsuario = (req, res, next) => {
    const { nickname } = req.body

    if (!nickname) {
        return res.status(400).json({
            mensaje: 'El nickname es obligatorio'
        })
    }

    if (nickname.trim() === '') {
        return res.status(400).json({
            mensaje: 'El nickname no puede estar vacío'
        })
    }

    next()
}

module.exports = validarUsuario