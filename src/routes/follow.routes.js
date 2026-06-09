const { Router } = require('express')
const followController = require('../controllers/follow.controllers')

const {
    validarFollow,
    validarUser,
    validarFollowingUser,
    validarFollowedUser
} = require("../middlewares/follows.middlewares")

const router = Router()
router.get('/',followController.obtenerFollows)
router.get('/:user',validarUser, followController.obtenerFollowsDeUser)
router.post('/',validarFollow, validarFollowingUser, validarFollowedUser, followController.crearFollow)
router.delete('/',validarFollow, validarFollowingUser, validarFollowedUser, followController.eliminarFollow)

module.exports = router