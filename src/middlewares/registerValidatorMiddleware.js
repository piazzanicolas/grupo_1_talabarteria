const {check} = require('express-validator');
const path = require('path');

module.exports = [
    check('email').notEmpty().withMessage('El email es necesario').bail().isEmail().withMessage('Dirección de email inválida'),
    check('password').notEmpty().withMessage('Escribí una contraseña').bail().isLength({min:5}).withMessage('La contraseña debe tener más de 5 caracteres'),
    check('re_password').notEmpty().withMessage('Escribí una contraseña').bail().isLength({min:5}).withMessage('La contraseña debe tener más de 5 caracteres'),
    check('nombre','El nombre es necesario').notEmpty(),
    check('apellido','El apellido es necesario').notEmpty(),
    check('telefono','El teléfono es necesario').notEmpty(),
    check('calle','La dirección es necesaria').notEmpty(),
    check('calleNumero','El número de calle es necesario').notEmpty(),
    check('piso','El piso-departamento es necesario').notEmpty(),
    check('postal','El código postal es necesario').notEmpty(),
    check('provincia','La provincia es necesaria').notEmpty(),
    check('pais','El país es necesario').notEmpty(),
    check('avatar').custom((value, { req }) => {
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