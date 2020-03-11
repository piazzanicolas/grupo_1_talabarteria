const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const Products = db.products;
const Op = db.Sequelize.Op;

//const toThousand = function (n) {
//	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//};

//const getProductos =  () => {
//	const url = path.join(__dirname, `/../db/dbProductos.json`);
//	return JSON.parse(fs.readFileSync(url, {encoding: 'utf-8'}));
//}

function filterCategory(req) {
	if (req.query.mustad) {
		return 2
	} else if (req.query.lamartina) {
		return 1
	} else if (req.query.lamartina == on && req.query.mustad == on) {
		return 2 //retornar todo
	} else {
		return 1 //retornar todo
	}
}

const controller = {
	root: (req, res) => {
		if (req.query.search || req.query.mustad || req.query.lamartina) { //el req.query no funciona en todos los casos
			Products
				.findAll({
					where: {
						name: {[Op.like]: `%${req.query.search}%`},
						category_id: filterCategory(req)
					}
				})
				.then(products => res.render('index', {products}))
				.catch(error => res.send(error));
		} else {
			Products
				.findAll()
				.then (products => res.render('index', {products}))
				.catch(error => res.send(error));
		};
	},

	contact: (req, res) => {
		return res.render('contacto')
	},

	faq: (req, res) => {
		return res.render('faq')
	}
};

module.exports = controller
