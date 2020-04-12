// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const apiController = require('../controllers/apiController');

/* GET - Main */
router.get('/', apiController.main);

/* GET - All Users */
router.get('/users', apiController.showAllUsers);

/* GET - User detail by ID */
router.get('/users/:id', apiController.showOneUser);

/* GET - User detail by Email */
router.get('/users/email/:email', apiController.userByEmail);

/* GET - All Products */
router.get('/products', apiController.showAllProducts);

/* GET - Last Product*/
router.get('/products/last', apiController.lastProduct);

/* GET - Product detail*/
router.get('/products/:id', apiController.showOneProduct);

/* GET - Images*/
router.get('/images/:name', apiController.showImage);

router.get('/categories', apiController.categories);

router.get('/metrics', apiController.metrics);


module.exports = router;