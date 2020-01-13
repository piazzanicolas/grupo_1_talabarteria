// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const userController = require('../controllers/userController');

/* GET - home page. */
router.get('/registro', userController.registroForm);
router.post('/registro', userController.saveUser);


module.exports = router;