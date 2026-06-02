const { Router } = require('express')
const publicacionesController = require('../controllers/publicaciones.controllers')
const postTagsController = require('../controllers/postTags.controllers')
const validarPublicacion = require('../middlewares/validarPublicacion')
const validarPublicacionId = require('../middlewares/validarPublicacionId')
const router = Router()

router.get('/', publicacionesController.obtenerPublicaciones)
router.get('/:id', validarPublicacionId, publicacionesController.obtenerPublicacion)
router.post('/', validarPublicacion, publicacionesController.crearPublicacion)
router.put('/:id', validarPublicacionId, validarPublicacion, publicacionesController.editarPublicacion)
router.delete('/:id', validarPublicacionId, publicacionesController.eliminarPublicacion)

// Relación Post - Tag
router.post('/:postId/etiquetas/:tagId', postTagsController.agregarEtiqueta)

router.get('/:postId/etiquetas', postTagsController.obtenerEtiquetasDePost)

module.exports = router