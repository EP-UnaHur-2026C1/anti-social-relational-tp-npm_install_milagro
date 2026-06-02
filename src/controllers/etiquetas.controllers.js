const { Tag } = require('../models')

const obtenerEtiquetas = async (req, res) => {
    try {
        const etiquetas = await Tag.findAll()
        res.json(etiquetas)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const obtenerEtiqueta = async (req, res) => {
    try {
        const etiqueta = await Tag.findByPk(req.params.id)

        if (!etiqueta) {
            return res.status(404).json({
                mensaje: 'Etiqueta no encontrada'
            })
        }

        res.json(etiqueta)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const crearEtiqueta = async (req, res) => {
    try {
        const etiqueta = await Tag.create({
            name: req.body.name
        })

        res.status(201).json(etiqueta)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const editarEtiqueta = async (req, res) => {
    try {
        const etiqueta = await Tag.findByPk(req.params.id)

        if (!etiqueta) {
            return res.status(404).json({
                mensaje: 'Etiqueta no encontrada'
            })
        }

        await etiqueta.update({
            name: req.body.name
        })

        res.json(etiqueta)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const eliminarEtiqueta = async (req, res) => {
    try {
        const etiqueta = await Tag.findByPk(req.params.id)

        if (!etiqueta) {
            return res.status(404).json({
                mensaje: 'Etiqueta no encontrada'
            })
        }

        await etiqueta.destroy()

        res.json({
            mensaje: 'Etiqueta eliminada'
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    obtenerEtiquetas,
    obtenerEtiqueta,
    crearEtiqueta,
    editarEtiqueta,
    eliminarEtiqueta
}