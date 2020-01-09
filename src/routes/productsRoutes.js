// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/* GET - home page. */
router.get('/carga', productsController.cargaProducto);
router.get('/detalle/:id', productsController.detalle);

module.exports = router;
