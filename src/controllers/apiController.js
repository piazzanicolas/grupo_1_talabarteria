const fs = require('fs');
const path = require('path');
const db = require('../database/models/');
const Users = db.users;
const Products = db.products;

// Controller Methods
const controller = {
	showAllUsers: (req, res) => {
        Users
            .findAll({
                attributes: ["id","firstName", "lastName","email"],
                raw: true
            })
            .then(users => {
                users.map((oneUser) => {
                    oneUser.detail = `http://localhost:3000/api/users/${oneUser.id}`
                })
                return res.status(200).json({
                    count: users.length,
                    users: users,
                });
            })
            .catch(error => res.send(error))
    },
    
    showOneUser: async (req, res) => {
        let user = await Users.findOne({where: {id: req.params.id}, attributes: ["id","firstName","lastName","email","avatar","isActive"]});
        if(user) {
            user.avatar = `http://localhost:3000/api/images/${user.avatar}`
			return res.status(302).json({
            user: user
        });
		} else {
            return res.status(404).json({
            msg: "No hay un usuario con ese ID"
            });
        }
    },


    userByEmail: async (req, res) => {
        let user = await Users.findOne({where: {email: req.params.email}, attributes: ["email"]});
        if(user) {
			return res.status(302).json({
            userFound: true,
            msg: "Email registrado",
            data: user
        });
		} else {
            return res.status(404).json({
            userFound: false,
            msg: "Email NO registrado"
            });
        }
    },

    showAllProducts: (req, res) => {
        Products
            .findAll({
                attributes: ["id", "name", "description"],
                raw: true
            })
            .then(products => {
                products.map((oneProduct) => {
                    oneProduct.detail = `http://localhost:3000/api/products/${oneProduct.id}`
                })
                return res.status(200).json({
                    total_results: products.length,
                    products: products
                });
            })
            .catch(error => res.send(error))
    },
    
    
    showOneProduct: async (req, res) => {
        let product = await Products.findOne({where: {id: req.params.id}, attributes: ["id","name", "description", "price", "category_id", "brand_id", "image"]});
        if(product) {
            product.image = `http://localhost:3000/api/images/${product.image}`
			return res.status(302).json({
            product: product
        });
		} else {
            return res.status(404).json({
            msg: "No hay un producto con ese ID"
            });
        }
    },


    showImage: (req, res) => {
        let route = path.join(__dirname, '../../public/images', req.params.name);
        return res.send(route)
    }
};

module.exports = controller