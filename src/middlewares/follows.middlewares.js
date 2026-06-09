const { Follows, User } = require('../models');
const { schemaFollows } = require('../schema/follows.schema');

const validarFollow = (req, res, next) => {

    const {error} = schemaFollows.validate(req.body)

    if (error) {
        return res.status(400).json({error: `El body no cumple con los parametros solicitados: ${error.details[0].message}`})
    }

    next()
}

const validarUser = async (req, res, next) => {
    const { user } = req.params

    const seguido = await User.findByPk(user, {
        attributes: ["nickname"]
    })

    if (!seguido) {
        return res.status(404).json({
            mensaje: 'Usuario inexistente'
        })
    }
    
    req.user = user

    next()
}

const validarFollowingUser = async (req, res, next) => {
    const { followingUserNickname  } = req.body


    const seguidos = await Follows.findOne({
        where: {
            following_user_nickname : followingUserNickname
        }
    })

    const seguidor = await  User.findByPk(followingUserNickname , {
        attributes: ["nickname"]
    })


    if (!seguidor || !seguidos) {
        return res.status(404).json({
            mensaje: 'Ususarios Seguidos no encontrados o Usuario inexistente'
        })
    }
    
    req.followingUserNickname  = followingUserNickname 

    next()
}

const validarFollowedUser = async (req, res, next) => {
    const {followedUserNickname } = req.body

    const seguido = await User.findByPk(followedUserNickname, {
        attributes: ["nickname"]
    })

    if (!seguido) {
        return res.status(404).json({
            mensaje: 'Usuario a seguir inexistente'
        })
    }
    
    req.followedUserNickname = followedUserNickname

    next()
}


module.exports = {
    validarFollow,
    validarUser,
    validarFollowingUser,
    validarFollowedUser
}