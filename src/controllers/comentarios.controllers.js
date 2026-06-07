const { Comment, User } = require('../models')
const { Op } = require('sequelize');

const obtenerComentarios = async (req, res) => {
    /* #swagger.tags = ['Comentarios']
        #swagger.summary = 'Obtener todos los comentarios del sistema'
        #swagger.responses[200] = {
            description: 'Comentarios retornadas exitosamente.'
        }
    */


    try {
        const comentarios = await Comment.findAll()
        res.status(200).json(comentarios)
    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de obtener los comentarios: ${error.message}` })
    }
}

const obtenerComentario =  (req, res) => {
    /* #swagger.tags = ['Comentarios']
        #swagger.summary = 'Obtiene los detalles de un comentario por su ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID del comentario a buscar',
            required: true,
            type: 'integer'
        }
        #swagger.responses[200] = {
            description: 'Comentario encontrado exitosamente.'
        }
        #swagger.responses[404] = {
            description: 'Comentario no encontrado.'
        }
    */


    try {
        const comentario = req.comentario

        res.status(200).json(comentario)

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de obtener un comentario por id: ${error.message}` })
    }
}

const obtenerComentariosDeUnPost = async (req, res) => {
    /* #swagger.tags = ['Publicaciones']
    #swagger.summary = 'Obtener comentarios visibles de una publicación'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la publicación',
        required: true,
        type: 'integer'
    }
    #swagger.responses[200] = {
        description: 'Comentarios retornados exitosamente.'
    }
    #swagger.responses[404] = {
        description: 'Publicación no encontrada.'
    }
    */


    try {
        //Id de publicacion
        const {id} = req.publicacion

        const mesesLimite = parseInt(process.env.MESES_LIMITE) || 6; 
        const fechaLimite = new Date();
        fechaLimite.setMonth(fechaLimite.getMonth() - mesesLimite);

        const comentarios = await Comment.findAll({
            attributes: ["text"], 
            where: {
                post_id: id,
                is_visible: true,
                createdAt: { [Op.gte]: fechaLimite }
            },
            include: [{
                model: User,
                as: "user",
                attributes: ["nickname"]
            }]
        });

        const return_final = comentarios.map(c => ({
            text: c.text,
            nickname: c.user.nickname || "Usuario desconocido"
            })
        )

    res.status(200).json(return_final)

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de obtener comentarios de un post: ${error.message}` })
    }
}

const crearComentarioEnPost = async (req, res) => {
    /* #swagger.tags = ['Publicaciones']
    #swagger.summary = 'Crear un nuevo comentario en una publicación específica'
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
                schema: { "$ref": "#/components/schemas/ComentarioNuevo" }
            }
        }
    }
    #swagger.responses[201] = {
        description: 'Comentario creado exitosamente.'
    }
    #swagger.responses[400] = {
        description: 'El cuerpo de la solicitud es inválido.'
    }
    */


    try {
        //Id de publicacion
        const {id} = req.publicacion

        const comentario = await Comment.create({
            text: req.body.text,
            is_visible: req.body.is_visible,
            user_nickname:  req.body.user_nickname,
            post_id: id
        })

        res.status(201).json(comentario)

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de crear un comentario: ${error.message}` })
    }
}


const editarComentario = async (req, res) => {
    /* #swagger.tags = ['Comentarios']
        #swagger.summary = 'Editar los datos de un comentario por su ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID del comentario a buscar',
            required: true,
            type: 'integer'
        }
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ComentarioNuevo"
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'Comentario modificado con exito.'
        }
        #swagger.responses[400] = {
            description: 'El body no cumple con los requisitos.'
        }
        #swagger.responses[404] = {
            description: 'Comentario encontrado en la base de datos.'
        }
    */


    try {
        const {id} = req.comentario

        await Comment.update({
            text: req.body.text,
            is_visible: req.body.is_visible
        }, {
            where: {
                id:id
            }
        })

        res.status(200).json({ mensaje: `Comentario actualizado con exito` })

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de editar el comentario: ${error.message}` })
    }
}

const eliminarComentario = async (req, res) => {
    /* #swagger.tags = ['Comentarios']
        #swagger.summary = 'Elimina un comentario del sistema por su id'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID del comentario a eliminar',
            required: true,
            type: 'integer'
        }
        #swagger.responses[200] = {
            description: 'Comentario eliminado exitosamente.'
        }
        #swagger.responses[404] = {
            description: 'Comentario no encontrado.'
        }
    */
    

    try {
        const {id} = req.comentario

        await Comment.destroy({
            where: {
                id: id
            }
        })

        res.status(200).json({
            mensaje: 'Comentario eliminado'
        })

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de eliminar el comentario: ${error.message}` })
    }
}

const eliminarComentarioDeUnPost = async (req, res) => {
    /* #swagger.tags = ['Publicaciones']
        #swagger.summary = 'Elimina un comentario del sistema por su id'
        #swagger.parameters['postId'] = {
            in: 'path',
            description: 'ID de la publlicacion con el comentario a eliminar',
            required: true,
            type: 'integer'
        }
        #swagger.parameters['comentarioId'] = {
            in: 'path',
            description: 'ID del comentario a eliminar',
            required: true,
            type: 'integer'
        }
        #swagger.responses[200] = {
            description: 'Comentario eliminado exitosamente.'
        }
        #swagger.responses[404] = {
            description: 'Comentario no encontrado.'
        }
    */
    

    try {
        const {id} = req.comentario
        const postId = req.publicacion


        await Comment.destroy({
            where: {
                id: id,
                post_id: postId
            }
        })

        res.status(200).json({
            mensaje: 'Comentario eliminado'
        })

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de eliminar el comentario: ${error.message}` })
    }
}

module.exports = {
    obtenerComentarios,
    obtenerComentario,
    obtenerComentariosDeUnPost,
    crearComentarioEnPost,
    editarComentario,
    eliminarComentarioDeUnPost,
    eliminarComentario
}