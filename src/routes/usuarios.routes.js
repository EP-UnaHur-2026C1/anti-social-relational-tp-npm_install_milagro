const { Router } = require('express')
const usuariosController = require('../controllers/usuarios.controllers')
const validarUsuario = require('../middlewares/validarUsuario')
const validarUsuarioId = require('../middlewares/validarUsuarioId')
const router = Router()

router.get('/', usuariosController.obtenerUsuarios)
router.get('/:id', validarUsuarioId, usuariosController.obtenerUsuario)
router.post('/', validarUsuario, usuariosController.crearUsuario)
router.put('/:id', validarUsuarioId, validarUsuario, usuariosController.editarUsuario)
router.delete('/:id', validarUsuarioId, usuariosController.eliminarUsuario)


module.exports = router