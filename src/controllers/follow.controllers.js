const { Follows, User } = require('../models');
const follows = require('../models/follows');

const obtenerFollows = async (req, res) => {
    /* #swagger.tags = ['Follows']
        #swagger.summary = 'Obtener todos los seguimientos registrados en el sistema'
        #swagger.responses[200] = {
            description: 'Lista de todos los seguimientos obtenida exitosamente.'
        }
        #swagger.responses[500] = {
            description: 'Error interno del servidor.'
        }
    */

    try {
        const follows = await Follows.findAll()

        const followsMapeados = follows.map(follow => {
            return {
                id: follow.id,
                followingUserNickname: follow.following_user_nickname,
                followedUserNickname: follow.followed_user_nickname
            }
        })

        res.status(200).json(followsMapeados)
    }
    catch(error) {
        res.status(500).json({ error: `Hubo un error al obtener los follows: ${error.message}` })
    }
}

const obtenerFollowsDeUser = async (req, res) => {
    /* #swagger.tags = ['Follows']
        #swagger.summary = 'Obtener lista de usuarios a los que sigue un usuario específico'
        #swagger.parameters['user'] = {
            in: 'path',
            description: 'Nickname del usuario seguidor',
            required: true,
            type: 'string'
        }
        #swagger.responses[200] = {
            description: 'Lista de seguidos obtenida exitosamente.'
        }
        #swagger.responses[404] = {
            description: 'Usuario inexistente.'
        }
    */


    try {
        const follows = await Follows.findAll({
            where: {
                following_user_nickname : req.user
            }
        })
        
        const followsMapeados = follows.map(follow => {
            return {
                id: follow.id ,
                followed_user_nickname: follow.followed_user_nickname
            }
        })

        res.status(200).json(followsMapeados)
    }
    catch (error) {
            res.status(500).json({ error: `Hubo un error al obtener los follows: ${error.message}` })
    }
}

const crearFollow = async (req, res) => {
    /* #swagger.tags = ['Follows']
        #swagger.summary = 'Hacer que un usuario siga a otro'
        #swagger.parameters['user'] = {
            in: 'path',
            description: 'Nickname del usuario que va a seguir a otro (seguidor)',
            required: true,
            type: 'string'
        }
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { 
                        type: "object",
                        properties: {
                            followed_user_nickname: { type: "string", example: "amigo123" }
                        },
                        required: ["followed_user_nickname"]
                    }
                }
            }
        }
        #swagger.responses[201] = {
            description: 'Seguimiento creado exitosamente.'
        }
        #swagger.responses[400] = {
            description: 'El body no cumple con los parámetros solicitados.'
        }
        #swagger.responses[404] = {
            description: 'Usuario a seguir inexistente.'
        }
    */


    try {

        const seguido = await Follows.create({
            following_user_nickname: req.user,
            followed_user_nickname: req.followed_user_nickname
        })

        res.status(201).json(seguido)

    } catch (error) {
        res.status(500).json({ error: `Hubo un error al registrar el follow: ${error.message}` })
    }
}

const eliminarFollow = async (req, res) => {
    /* #swagger.tags = ['Follows']
        #swagger.summary = 'Dejar de seguir a un usuario'
        #swagger.parameters['user'] = {
            in: 'path',
            description: 'Nickname del usuario que quiere dejar de seguir a otro',
            required: true,
            type: 'string'
        }
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { 
                        type: "object",
                        properties: {
                            followed_user_nickname: { type: "string", example: "amigo123" }
                        },
                        required: ["followed_user_nickname"]
                    }
                }
            }
        }
        #swagger.responses[201] = {
            description: 'Seguimiento eliminado exitosamente.'
        }
        #swagger.responses[400] = {
            description: 'No existe el seguimiento para eliminar.'
        }
        #swagger.responses[404] = {
            description: 'Usuario a seguir inexistente.'
        }
    */


    try {
        await Follows.destroy({
            where: {
                following_user_nickname: req.user,
                followed_user_nickname: req.followed_user_nickname
            }
        })
        res.status(201).json("seguimiento eliminado")
    } catch (error) {
        res.status(500).json({ error: `Hubo un error al eliminar el follow: ${error.message}` })
    }
}

module.exports = {
    crearFollow,obtenerFollows ,eliminarFollow, obtenerFollowsDeUser
}