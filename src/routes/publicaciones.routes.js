const { Router } = require('express')
const publicacionesController = require('../controllers/publicaciones.controllers')
const postTagsController = require('../controllers/postTags.controllers')
const postImagesController = require("../controllers/publicacionesImagenes.controllers")
const comentariosController = require("../controllers/comentarios.controllers")

//midlewares de Publicacion
const {
    validarPublicacion,
    validarPublicacionId
} = require("../middlewares/publicaciones.middlewares")

//midleware de realacion publicacion-etiquetas
const validarPublicacionIdYEtiquetaId = require("../middlewares/postTags.midlewares")

// midlewares de imagenes
const {
    validarImagen,
    validarPublicacionEImagenId
} = require("../middlewares/postImages.middlewares")

//midleware de comentario
const {
    validarComentario,
    validarPublicacionYComentarioId
} = require("../middlewares/comentarios.middlewares")

const { validarUsuarioExistenteEnBody } = require("../middlewares/usuarios.middlewares");

const router = Router()

router.get('/', publicacionesController.obtenerPublicaciones)
router.get('/:id', validarPublicacionId, publicacionesController.obtenerPublicacion)
router.post('/', validarUsuarioExistenteEnBody, validarPublicacion, publicacionesController.crearPublicacion)
router.put('/:id', validarPublicacionId, validarPublicacion, publicacionesController.editarPublicacion)
router.delete('/:id', validarPublicacionId, publicacionesController.eliminarPublicacion)

// Relación Post - Tag
router.get('/:id/etiquetas', validarPublicacionId, postTagsController.obtenerEtiquetasDePost)
router.post('/:postId/etiquetas/:tagId', validarPublicacionIdYEtiquetaId, postTagsController.agregarEtiqueta)

// Relacion Post - Post_Image
router.get('/:id/imagenes', validarPublicacionId, postImagesController.obtenerImagenesDeUnPost)
router.post('/:id/imagenes', validarPublicacionId, validarImagen, postImagesController.agregarImagenAPost)
router.delete('/:postId/imagenes/:imageId', validarPublicacionEImagenId, postImagesController.eliminarImagen);


// Relacion Post - Comment
router.get('/:id/comentarios', validarPublicacionId, comentariosController.obtenerComentariosDeUnPost)
router.post('/:id/comentarios', validarPublicacionId, validarComentario, comentariosController.crearComentarioEnPost)
router.delete('/:postId/comentarios/:comentarioId',validarPublicacionYComentarioId, comentariosController.eliminarComentarioDeUnPost);

module.exports = router