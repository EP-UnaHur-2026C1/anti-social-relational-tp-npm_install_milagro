const { Post, Tag } = require('../models')

const agregarEtiqueta = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.postId)
        const tag = await Tag.findByPk(req.params.tagId)

        if (!post || !tag) {
            return res.status(404).json({
                mensaje: 'Post o etiqueta no encontrada'
            })
        }

        await post.addTag(tag)

        res.json({
            mensaje: 'Etiqueta asociada correctamente'
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const obtenerEtiquetasDePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.postId)

        if (!post) {
            return res.status(404).json({
                mensaje: 'Post no encontrado'
            })
        }

        const etiquetas = await post.getTags()

        res.json(etiquetas)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    agregarEtiqueta,
    obtenerEtiquetasDePost
}