const { Follows, User } = require('../models');

const obtenerSeguidos = async (req, res) => {
    const Seguidos = follows.findAll({
        include: {
            model: User,
            as: 'following_user_nickname'
        }


    })
}

const crearFollow = async (req, res) => {
    try {

        const seguido = await Follow.create({
            following_user_nickname: req.body.following_user_nickname,
            followed_user_nickname: req.body.followed_user_nicname
        })

        res.status(201).json(seguido)

    } catch (error) {
        res.status(500).json({ error: `Hubo un error al registrar el seguimiento: ${error.message}` })
    }
}

const eliminarFollow = async (req, res) => {

    try {
        await Follow.destroy({
            where: {
                following_user_nickname: req.body.following_user_nickname,
                followed_user_nickname: req.body.followed_user_nickname
            }
        })
        res.status(201).json("seguimiento eliminado")
    } catch (error) {
        res.status(500).json({ error: `Hubo un error al eliminar el seguimiento: ${error.message}` })
    }
}

module.exports = {
    crearFollow, eliminarFollow
}