// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controller Require ************
const productsController = require('../controllers/productsController');

//  *********** Middlewares ***********
const upload = require('../middlewares/upload');
const authMiddleware = require('../middlewares/authMiddleware');
const editValidation = require('../middlewares/editValidatorMiddleware')
const cargaValidation = require('../middlewares/cargaValidatorMiddleware')

/* GET - home page. */
router.get('/carga', authMiddleware, productsController.cargaProducto);
router.post('/carga', upload.single('image'), cargaValidation, productsController.guardar);
router.get('/detalle/:id', productsController.detalle);
router.get('/', productsController.listado);
router.get('/:id/edit', authMiddleware, productsController.editar);
router.put('/:id/edit',  upload.single('image'), editValidation, productsController.editarCambios);
router.delete('/:id/delete', productsController.borrar);

module.exports = router;
