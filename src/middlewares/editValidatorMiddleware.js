const {check} = require('express-validator');
const path = require('path');

module.exports = [
    check('name')
        .notEmpty().withMessage('El nombre es necesario').bail()
        .isLength({min:5}).withMessage('El nombre debe tener más de 5 caracteres'),

    check('category_id')
        .notEmpty().withMessage('La categoría es necesaria'),

    check('price')
        .notEmpty().withMessage('El precio es necesario'),

    check('brand_id')
        .notEmpty().withMessage('La marca es necesaria'),

    check('description')
        .notEmpty().withMessage('La descripción es necesaria').bail()
        .isLength({min:20}).withMessage('La descripción debe tener más de 20 caracteres'),

    check('color')
        .notEmpty().withMessage('Los colores son necesarios'),
];