const {Post_image} = require("../models")
const schemaImagen = require("../schema/publicacionImagen.schema")


const validarImagen = (req, res, next) => {
    const {error} = schemaImagen.validate(req.body)
    if (error) {
        return res.status(400).json({error: `El body no cumple con los parametros solicitados: ${error.details[0].message}`})
    }

    next()
}

const validarPublicacionEImagenId = async (req, res, next) => {
    const {imageId, postId} = req.params

    const imagen = await Post_image.findOne({
        attributes: ["id", "url"],
        where: {
            id: imageId,
            post_id: postId
        }
    });
    
    if (!imagen) {
        return res.status(404).json({
            mensaje: 'Imagen no encontrada o no pertenece a esta publicacion'
        })
    }

    req.imagen = imagen

    next()
}

module.exports = {
    validarImagen,
    validarPublicacionEImagenId
}