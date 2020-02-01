// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const userController = require('../controllers/userController');

// Middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const upload = require('../middlewares/upload');
const registerValidation = require('../middlewares/registerValidatorMiddleware')

/* GET - home page. */
router.get('/registro', userController.registroForm);

router.post('/registro', upload.single('avatar'), registerValidation, userController.saveUser);

router.get('/login', userController.login);

router.post('/login', userController.processLogin);

router.get('/profile', authMiddleware, userController.profile);

router.get('/logout', userController.logout);

module.exports = router;