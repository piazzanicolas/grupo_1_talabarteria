// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const apiController = require('../controllers/apiController');

/* GET - All Users */
router.get('/users', apiController.showAllUsers);

/* GET - User detail by ID */
router.get('/users/:id', apiController.showOneUser);

/* GET - User detail by Email */
router.get('/users/email/:email', apiController.userByEmail);

/* GET - All Products */
router.get('/products', apiController.showAllProducts);

/* GET - Product detail*/
router.get('/products/:id', apiController.showOneProduct);

/* GET - Images*/
router.get('/images/:name', apiController.showImage);

module.exports = router;