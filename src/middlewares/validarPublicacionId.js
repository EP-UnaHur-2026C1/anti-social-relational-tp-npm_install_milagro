const validarPublicacionId = (req, res, next) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            mensaje: 'Debe indicar un id de publicación'
        })
    }

    if (isNaN(id)) {
        return res.status(400).json({
            mensaje: 'El id debe ser numérico'
        })
    }

    next()
}

module.exports = validarPublicacionId