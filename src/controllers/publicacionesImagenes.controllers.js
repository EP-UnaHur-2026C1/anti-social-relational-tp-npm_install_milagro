const { Post_image } = require('../models')

const agregarImagenAPost = async (req, res) => {

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