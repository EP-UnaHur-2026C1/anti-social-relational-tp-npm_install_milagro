const { Router } = require('express')
const publicacionesController = require('../controllers/publicaciones.controllers')
const postTagsController = require('../controllers/postTags.controllers')
const comentariosController = require("../controllers/comentarios.controllers")

//midlewares de Publicacion
const {
    validarPublicacion,
    validarPublicacionId
} = require("../middlewares/publicaciones.middlewares")

//midleware de realacion publicacion-etiquetas
const validarPublicacionIdYEtiquetaId = require("../middlewares/postTags.midlewares")


//midleware de comentario
const {
    validarComentario
} = require("../middlewares/comentarios.middlewares")

const router = Router()

router.get('/', publicacionesController.obtenerPublicaciones)
router.get('/:id', validarPublicacionId, publicacionesController.obtenerPublicacion)
router.post('/', validarPublicacion, publicacionesController.crearPublicacion)
router.put('/:id', validarPublicacionId, validarPublicacion, publicacionesController.editarPublicacion)
router.delete('/:id', validarPublicacionId, publicacionesController.eliminarPublicacion)

// Relación Post - Tag
router.get('/:id/etiquetas', validarPublicacionId, postTagsController.obtenerEtiquetasDePost)
router.post('/:postId/etiquetas/:tagId', validarPublicacionIdYEtiquetaId, postTagsController.agregarEtiqueta)



// Relacion Post - Comment
//router.get('/:id/comentarios', validarPublicacionId, comentariosController.obtener)
//router.post('/:id/comentarios', validarPublicacionId, validarComentario, comentariosController.crearComentario)

module.exports = router