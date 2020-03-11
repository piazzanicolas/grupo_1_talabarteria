// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');
const guestMiddleware = require('../middlewares/guestMiddleware');

/* GET - home page. */
router.get('/', mainController.root);

/* GET - Contacto. */
router.get('/contact', mainController.contact);

/* GET - Preguntas frecuentes. */
router.get('/faq', mainController.faq);

/* GET - Buscador. */
//router.get('/search', mainController.search);

module.exports = router;


