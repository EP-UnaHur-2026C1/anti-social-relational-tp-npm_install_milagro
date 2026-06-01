const { Router } = require('express')
const etiquetasController = require('../controllers/etiquetas.controllers')

const router = Router()

router.get('/', etiquetasController.obtenerEtiquetas)
router.get('/:id', etiquetasController.obtenerEtiqueta)
router.post('/', etiquetasController.crearEtiqueta)
router.put('/:id', etiquetasController.editarEtiqueta)
router.delete('/:id', etiquetasController.eliminarEtiqueta)

module.exports = router