const validarUsuarioId = (req, res, next) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            mensaje: 'Debe indicar un id de usuario'
        })
    }

    next()
}

module.exports = validarUsuarioId