const { Comment } = require('../models')

const validarComentario = (req, res, next) => {

    const { text } = req.body

    if (!text) {
        return res.status(400).json({
            mensaje: 'El texto es obligatorio'
        })
    }

    next()
}

const validarComentarioId = async (req, res, next) => {

    const { id } = req.params

    const comentario = await Comment.findByPk(id)

    if (!comentario) {
        return res.status(404).json({
            mensaje: 'Comentario no encontrado'
        })
    }

    req.comentario = comentario

    next()
}

module.exports = {
    validarComentario,
    validarComentarioId
}