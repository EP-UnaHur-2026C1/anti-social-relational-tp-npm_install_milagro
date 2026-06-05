const { Post } = require('../models')

const validarPublicacion = (req, res, next) => {

    const { user_nickname, text } = req.body

    if (!user_nickname) {
        return res.status(400).json({
            mensaje: 'El user_nickname es obligatorio'
        })
    }

    if (!text) {
        return res.status(400).json({
            mensaje: 'El texto es obligatorio'
        })
    }

    next()
}

const validarPublicacionId = async (req, res, next) => {

    const { id } = req.params

    const publicacion = await Post.findByPk(id)

    if (!publicacion) {
        return res.status(404).json({
            mensaje: 'Publicación no encontrada'
        })
    }

    req.publicacion = publicacion

    next()
}

module.exports = {
    validarPublicacion,
    validarPublicacionId
}