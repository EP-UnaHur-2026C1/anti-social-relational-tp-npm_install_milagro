const { Follows } = require('../models');
const { schemaFollows } = require('../schema/follows.schema');

const validarFollow = (req, res, next) => {

    const {error} = schemaFollows.validate(req.body)
    if (error) {
        return res.status(400).json({error: `El body no cumple con los parametros solicitados: ${error.details[0].message}`})
    }

    next()
}

const validarFollow = (req, res, next) => {
    const {followingUser, followedUser} = req.params

    const seguidos = await Follows.findOne({
        where: {
            following_user_nickname : followingUser
        }
    })

    const seguido = await  User.findByPk(followedUser, {
        attributes: ["nickname"]
    })


    if (!seguidos) {
        return res.status(404).json({
            mensaje: 'Ususarios Seguidos no encontrados o Usuario inexistente'
        })
    }

    if (!seguido) {
        return res.status(404).json({
            mensaje: 'Usuario a seguir no encontrado'
        })
    }

    req.nicknameSeguidor = nicknameSeguidor
    req.nicknameSeguido = nicknameSeguido

    next()
}