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

function filterBrand(req) {
	if (req.query.lamartina && req.query.mustad) {
		return [1,2]
	} else if (req.query.lamartina) {
		return [1]
	} else if (req.query.mustad) {
		return [2]
	} else {
		return [1,2]
	}
}

function filterPrice(req) {
	if (req.query.rango1 && req.query.rango2) {
		return {[Op.gt]: 0, [Op.lt]: 5000 }
	} else if (req.query.rango1) {
		return {[Op.gt]: 0, [Op.lte]: 1000 }
	} else if (req.query.rango2) {
		return {[Op.gt]: 1000, [Op.lt]: 5000 }
	} else {
		return {[Op.gt]: 0 }
	}
}

function filterCategory(req) {
	if (req.query.marroquineria && req.query.talabarteria) {
		return [1,2]
	} else if (req.query.marroquineria) {
		return [1]
	} else if (req.query.talabarteria) {
		return [2]
	} else {
		return [1,2]
	}
}


const controller = {
	root: (req, res) => {
		//Consulto en la url si se encuentra alguno de los parámetros
		if (req.query.search || req.query.mustad || req.query.lamartina || req.query.rango1 || req.query.rango2 || req.query.marroquineria || req.query.talabarteria) { //el req.query no funciona en todos los casos
			Products
				.findAll({
					where: {
						name: {[Op.like]: `%${req.query.search}%`},
						brand_id: {[Op.or]: filterBrand(req)},
						price: filterPrice(req),
						category_id: {[Op.or]: filterCategory(req)}
					}
				})
				.then(products => res.render('index', {products}))
				.catch(error => res.send(error));
		} else { //Si el usuario da a buscar sin poner nada o sin filtros trae todo
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
