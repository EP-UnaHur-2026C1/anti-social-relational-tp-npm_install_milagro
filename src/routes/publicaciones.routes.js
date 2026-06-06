const { Router } = require('express')
const publicacionesController = require('../controllers/publicaciones.controllers')
const postTagsController = require('../controllers/postTags.controllers')
const comentariosController = require("../controllers/comentarios.controllers")

//midlewares de Publicacion
const {
    validarPublicacion,
    validarPublicacionId
} = require("../middlewares/publicaciones.middleware")

//midleware de comentario
const {
    validarComentario
} = require("../middlewares/comentarios.middleware")

const router = Router()

router.get('/', publicacionesController.obtenerPublicaciones)
router.get('/:id', validarPublicacionId, publicacionesController.obtenerPublicacion)
router.post('/', validarPublicacion, publicacionesController.crearPublicacion)
router.put('/:id', validarPublicacionId, validarPublicacion, publicacionesController.editarPublicacion)
router.delete('/:id', validarPublicacionId, publicacionesController.eliminarPublicacion)

// Relación Post - Tag
router.post('/:postId/etiquetas/:tagId', postTagsController.agregarEtiqueta)

router.get('/:postId/etiquetas', postTagsController.obtenerEtiquetasDePost)

// Relacion Post - Comment

router.post('/:id/comentarios', validarPublicacionId, validarComentario, comentariosController.crearComentario)

module.exports = router