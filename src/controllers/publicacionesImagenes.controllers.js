const { Post_image } = require('../models')

const agregarImagenAPost = async (req, res) => {
    /* #swagger.tags = ['Publicaciones']
    #swagger.summary = 'Agregar una imagen a una publicación'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la publicación',
        required: true,
        type: 'integer'
    }
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { "$ref": "#/components/schemas/ImagenNueva" }
            }
        }
    }
    #swagger.responses[201] = {
        description: 'Imagen agregada exitosamente.'
    }
    #swagger.responses[400] = {
        description: 'El parametro url de la imagen es incorrecto'
    }
    #swagger.responses[404] = {
        description: 'Publicacion no encontrada.'
    }
*/


    try {

        const {id} = req.publicacion

        const imagen = await Post_image.create({
            url: req.body.url,
            post_id: id
        })

        res.status(201).json(imagen)

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de crear la imagen: ${error.message}` })
    }
}

const obtenerImagenesDeUnPost = async (req, res) => {
    /* #swagger.tags = ['Publicaciones']
    #swagger.summary = 'Obtener todas las imágenes de una publicación'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la publicación',
        required: true,
        type: 'integer'
    }
    #swagger.responses[200] = {
        description: 'Imágenes retornadas exitosamente.'
    }
    #swagger.responses[404] = {
        description: 'Publicacion no encontrada.'
    }
    */


    try {

        const {id} = req.publicacion

        const imagenes = await Post_image.findAll({
            attributes: ["url"],
            where: {
                post_id: id
            }
        })

        const return_final = {
            publicacion_id: id,
            imagenes: imagenes
        }

        res.status(200).json(return_final)

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de crear la imagen: ${error.message}` })
    }
}

const eliminarImagen = async (req, res) => {
    /* #swagger.tags = ['Publicaciones']
    #swagger.summary = 'Eliminar una imagen de una publicación'
    #swagger.parameters['postId'] = {
        in: 'path',
        description: 'ID de la publicación',
        required: true,
        type: 'integer'
    }
    #swagger.parameters['imageId'] = {
        in: 'path',
        description: 'ID de la imagen',
        required: true,
        type: 'integer'
    }
    #swagger.responses[200] = {
        description: 'Imagen eliminada exitosamente.'
    }
    #swagger.responses[404] = {
        description: 'Imagen no encontrada.'
    }
    */

    try {

        const {id} = req.imagen

        await Post_image.destroy({
            where: {
                id: id
            }
        })

        res.status(200).json("Imagen eliminada con exito")

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de crear la imagen: ${error.message}` })
    }
}


module.exports = {
    agregarImagenAPost,
    obtenerImagenesDeUnPost,
    eliminarImagen
}