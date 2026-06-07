const { Tag } = require('../models')

const obtenerEtiquetas = async (req, res) => {
    /* #swagger.tags = ['Etiquetas']
        #swagger.summary = 'Obtener todas las etiquetas del sistema'
        #swagger.responses[200] = {
            description: 'Etiquetas retornadas exitosamente.'
        }
    */


    try {
        const etiquetas = await Tag.findAll()
        res.status(200).json(etiquetas)
    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de obtener las etiquetas: ${error.message}` })
    }
}

const obtenerEtiqueta = (req, res) => {
    /* #swagger.tags = ['Etiquetas']
        #swagger.summary = 'Obtiene los detalles de una etiqueta por su ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID cadena de texto de la etiqueta a buscar',
            required: true,
            type: 'integer'
        }
        #swagger.responses[200] = {
            description: 'Etiqueta encontrado exitosamente.'
        }
        #swagger.responses[404] = {
            description: 'Etiqueta no encontrado.'
        }
    */


    try {

        // a traves de middleware
        const etiqueta = req.etiqueta

        res.status(200).json(etiqueta)

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de obtener una etiqueta por id: ${error.message}` })
    }
}

const crearEtiqueta = async (req, res) => {
    /* #swagger.tags = ['Etiquetas']
        #swagger.summary = 'Crea una nueva etiquetas en el sistema'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/EtiquetaNueva"
                    }
                }
            }
        }
        #swagger.responses[201] = {
            description: 'Etiqueta creada exitosamente.'
        }
        #swagger.responses[400] = {
            description: 'El campo name es obligatorio o está vacío.'
        }
    */


    try {
        const etiqueta = await Tag.create({
            name: req.body.name
        })

        res.status(201).json(etiqueta)

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de crear una etiqueta: ${error.message}` })
    }
}

const editarEtiqueta = async (req, res) => {
    /* #swagger.tags = ['Etiquetas']
        #swagger.summary = 'Editar los datos de una etiqueta por su ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID cadena de texto de la etiqueta a buscar',
            required: true,
            type: 'integer'
        }
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/EtiquetaNueva"
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'Etiqueta modificada con exito.'
        }
        #swagger.responses[400] = {
            description: 'El campo name es obligatorio o está vacío.'
        }
        #swagger.responses[404] = {
            description: 'Etiqueta no encontrada en la base de datos.'
        }
    */


    try {
        const {id} = req.etiqueta

        await Tag.update({
            name: req.body.name
        }, {
            where: {
                id: id
            }
        })

        res.status(200).json({mensaje: "Etiqueta actualizada exitosamente"})

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de editar una etiqueta: ${error.message}` })
    }
}

const eliminarEtiqueta = async (req, res) => {
    /* #swagger.tags = ['Etiquetas']
        #swagger.summary = 'Elimina una etiqueta del sistema por su id'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID cadena de texto de la etiqueta a eliminar',
            required: true,
            type: 'integer'
        }
        #swagger.responses[200] = {
            description: 'Etiqueta eliminado exitosamente.'
        }
        #swagger.responses[404] = {
            description: 'Etiqueta no encontrado.'
        }
    */


    try {
        const {id} = req.etiqueta

        await Tag.destroy({
            where: {
                id: id
            }
        })

        res.status(200).json({ mensaje: 'Etiqueta eliminada exitosamente'})

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de eliminar las etiquetas: ${error.message}` })
    }
}

module.exports = {
    obtenerEtiquetas,
    obtenerEtiqueta,
    crearEtiqueta,
    editarEtiqueta,
    eliminarEtiqueta
}