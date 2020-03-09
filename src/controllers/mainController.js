const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const Products = db.products;

const toThousand = function (n) {
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

//const getProductos =  () => {
//	const url = path.join(__dirname, `/../db/dbProductos.json`);
//	return JSON.parse(fs.readFileSync(url, {encoding: 'utf-8'}));
//}

const controller = {
	root: (req, res) => {
		Products
			.findAll()
			.then (products => res.render('index', {products}))
			.catch(error => res.send(error));
	},

	contact: (req, res) => {
		return res.render('contacto')
	},

	faq: (req, res) => {
		return res.render('faq')
	},
	
};

module.exports = controller
