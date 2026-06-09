const { Follows, User } = require('../models');
const follows = require('../models/follows');

const obtenerFollows = async (req, res) => {
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