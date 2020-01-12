// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/* GET - home page. */
router.get('/carga', productsController.cargaProducto);
router.post('/carga', productsController.guardar);
router.get('/detalle/:id', productsController.detalle);
router.get('/', productsController.listado);
router.get('/:id/edit', productsController.editar);
router.put('/:id', productsController.guardarCambios);
router.delete('/:id', productsController.borrar);

module.exports = router;
