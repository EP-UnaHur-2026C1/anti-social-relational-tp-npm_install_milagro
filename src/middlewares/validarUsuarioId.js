const validarUsuarioId = (req, res, next) => {
    const { id } = req.params

    if (!id) {
        return res.status(404).json({
            mensaje: 'Usuario no encontrado'
        })
    }

    next()
}

module.exports = validarUsuarioId