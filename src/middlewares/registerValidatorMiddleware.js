const {check} = require('express-validator');
const path = require('path');
const db = require('../database/models/');
const Users = db.users;

module.exports = [
    check('email')
        .notEmpty().withMessage('El email es necesario').bail()
        .isEmail().withMessage('Dirección de email inválida').bail()
        .custom(function (value){
            return Users.findOne({ where: {email: value} }).then(user => {
                if (user) {
                    return Promise.reject('El email ya se encuentra registrado');
                }
            });
        }),

    check('password')
        .notEmpty().withMessage('Escribí una contraseña').bail()
        .isLength({min:8}).withMessage('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial !@#$%^&*?').bail()
        .custom( function (value){
            let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*?])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
            if (!value.match(passwordRegex)){
                throw new Error('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial !@#$%^&*?');
            }
            return true;
        }),

    check('re_password')
        .notEmpty().withMessage('Repetí la contraseña').bail()
        .custom((value,{req, loc, path}) => {
            if (value !== req.body.password) {
                throw new Error("Las contraseñas deben ser iguales");
            } else {
                return value;
            }
        }),

    check('firstName','El nombre es necesario')
        .notEmpty().bail()
        .isLength({min:2}).withMessage('El nombre debe tener más de 2 caracteres'),

    check('dob')
        .notEmpty().withMessage('La fecha de nacimiento es necesaria'),

    check('lastName')
        .notEmpty().withMessage('El apellido es necesario').bail()
        .isLength({min:2}).withMessage('El apellido debe tener más de 2 caracteres'),

    check('phone')
        .notEmpty().withMessage('El teléfono es necesario'),

    check('street')
        .notEmpty().withMessage('La dirección es necesaria'),

    check('address_number')
        .notEmpty().withMessage('El número de calle es necesario'),

    check('floor')
        .notEmpty().withMessage('El piso-departamento es necesario'),

    check('zip_code')
        .notEmpty().withMessage('El código postal es necesario'),

    check('province')
        .notEmpty().withMessage('La provincia es necesaria'),

    check('countryId')
        .notEmpty().withMessage('El país es necesario'),

    check('avatar')
        .custom((value, { req }) => {
            let acceptedExtensions = ['.jpg', '.jpeg', '.png'];
            if (typeof req.file == 'undefined') {
                throw new Error('Elegí una imagen de perfil');
            } else if (req.file.originalname) {
                let fileExtension = path.extname(req.file.originalname);
                let extensionIsOk = acceptedExtensions.includes(fileExtension);
                if (!extensionIsOk) {
                    throw new Error('Los formatos válidos son JPG, JPEG y PNG');
                }
            }
            return true;
        })
];