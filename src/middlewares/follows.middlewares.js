const { Follows, User } = require('../models');
const  schemaFollows  = require('../schema/follows.schema');

const validarEsquemaFollow = (req, res, next) => {

    const {error} = schemaFollows.validate(req.body)

    if (error) {
        return res.status(400).json({error: `El body no cumple con los parametros solicitados: ${error.details[0].message}`})
    }

    next()
}

const validarUsuarioExistente = async (req, res, next) => {
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

const validarFollowedUser = async (req, res, next) => {
    const {followed_user_nickname } = req.body

    const seguido = await User.findByPk(followed_user_nickname, {
        attributes: ["nickname"]
    })

    if (!seguido) {
        return res.status(404).json({
            mensaje: 'Usuario a seguir inexistente'
        })
    }
    
    req.followed_user_nickname = followed_user_nickname

    next()
}

const validarConexionExistente = async (req, res, next) => {
    const { followed_user_nickname } = req.body;
    const following_user_nickname = req.user;

    const conexion = await Follows.findOne({
        where: {
            following_user_nickname,
            followed_user_nickname
        }
    });

    if (conexion) {
        return res.status(400).json({ mensaje: "El seguimiento ya existe." });
    }
    else {
        next();
    }
};


const validarConexionInexistente = async (req, res, next) => {
    const { followed_user_nickname } = req.body;
    const following_user_nickname = req.user;

    const conexion = await Follows.findOne({
        where: {
            following_user_nickname,
            followed_user_nickname
        }
    });

    if (!conexion) {
        return res.status(400).json({ mensaje: "No existe el seguimiento para eliminar" });
    }
    else {
        next();
    }
};

module.exports = {
    validarEsquemaFollow,
    validarUsuarioExistente,
    validarFollowedUser,
    validarConexionExistente,
    validarConexionInexistente
}