// const { Router } = require('express')
// const followController = require('../controllers/follow.controllers')

<<<<<<< HEAD
 const {
    validarEsquemaFollow,
    validarUsuarioExistente,
    validarFollowedUser,
    validarConexionExistente,
    validarConexionInexistente
} = require("../middlewares/follows.middlewares")

const router = Router()
router.get('/',followController.obtenerFollows)
router.get('/:user',validarUsuarioExistente, followController.obtenerFollowsDeUser)
router.post('/:user',validarUsuarioExistente, validarEsquemaFollow, validarFollowedUser, validarConexionExistente, followController.crearFollow)
router.delete('/:user',validarUsuarioExistente, validarEsquemaFollow, validarFollowedUser, validarConexionInexistente, followController.eliminarFollow)
=======
// const {
//     validarFollow,
//     validarFollowUsers
// } = require("../middlewares/comentarios.middlewares")

// const router = Router()
// router.get('/:user', validarFollowingUser, followController.obtenerFollows)
// router.post('/:user',validarFollow, validarFollowingUser, validarFollowedUser, followController.crearFollow)
// router.delete('/:user',validarFollow, validarFollowingUser, validarFollowedUser, followController.eliminarFollow)
>>>>>>> main

// module.exports = router