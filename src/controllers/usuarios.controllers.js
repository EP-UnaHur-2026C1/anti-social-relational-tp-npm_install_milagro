const { User } = require('../models')

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await User.findAll()
        res.json(usuarios)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const obtenerUsuario = async (req, res) => {
    try {
        const usuario = await User.findByPk(req.params.id)

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            })
        }

        res.json(usuario)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const crearUsuario = async (req, res) => {
    try {
        const usuario = await User.create({
            nickname: req.body.nickname
        })

        res.status(201).json(usuario)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const editarUsuario = async (req, res) => {
    try {
        const usuario = await User.findByPk(req.params.id)

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            })
        }

        await usuario.update({
            nickname: req.body.nickname
        })

        res.json(usuario)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const eliminarUsuario = async (req, res) => {
    try {
        const usuario = await User.findByPk(req.params.id)

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            })
        }

        await usuario.destroy()

        res.json({
            mensaje: 'Usuario eliminado'
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    editarUsuario,
    eliminarUsuario
}