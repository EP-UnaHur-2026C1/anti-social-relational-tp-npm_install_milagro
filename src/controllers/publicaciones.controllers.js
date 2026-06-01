const { Post, User } = require('../models')

const obtenerPublicaciones = async (req, res) => {
    try {
        const publicaciones = await Post.findAll({
            include: {
                model: User,
                as: 'user'
            }
        })

        res.json(publicaciones)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const obtenerPublicacion = async (req, res) => {
    try {
        const publicacion = await Post.findByPk(req.params.id)

        if (!publicacion) {
            return res.status(404).json({
                mensaje: 'Publicación no encontrada'
            })
        }

        res.json(publicacion)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const crearPublicacion = async (req, res) => {
    try {
        const publicacion = await Post.create({
            user_nickname: req.body.user_nickname,
            text: req.body.text,
            description: req.body.description
        })

        res.status(201).json(publicacion)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const editarPublicacion = async (req, res) => {
    try {
        const publicacion = await Post.findByPk(req.params.id)

        if (!publicacion) {
            return res.status(404).json({
                mensaje: 'Publicación no encontrada'
            })
        }

        await publicacion.update({
            text: req.body.text,
            description: req.body.description
        })

        res.json(publicacion)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const eliminarPublicacion = async (req, res) => {
    try {
        const publicacion = await Post.findByPk(req.params.id)

        if (!publicacion) {
            return res.status(404).json({
                mensaje: 'Publicación no encontrada'
            })
        }

        await publicacion.destroy()

        res.json({
            mensaje: 'Publicación eliminada'
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    obtenerPublicaciones,
    obtenerPublicacion,
    crearPublicacion,
    editarPublicacion,
    eliminarPublicacion
}