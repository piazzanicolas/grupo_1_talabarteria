// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');
const guestMiddleware = require('../middlewares/guestMiddleware');

/* GET - home page. */
router.get('/', guestMiddleware , mainController.root);


module.exports = router;


