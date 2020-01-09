// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const userController = require('../controllers/userController');

/* GET - home page. */
router.get('/registro', userController.registro);


module.exports = router;