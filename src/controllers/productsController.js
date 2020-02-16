const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const Products = db.products;
const Categories = db.categories;
const Brands = db.brands;
const Colors = db.colors;

const toThousand = function (n) {
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const getProductos =  () => {
	const url = path.join(__dirname, `/../db/dbProductos.json`);
	return JSON.parse(fs.readFileSync(url, {encoding: 'utf-8'}));
}

const saveProductos = (productos) => {
	const url = path.join(__dirname, `/../db/dbProductos.json`);
	fs.writeFileSync(url, JSON.stringify(productos, null, ' '));
}

const generateId = () => {
	let products = getProductos();
	if (products.length == 0) {
		return 1;
	}
	let lastProduct = products.pop();
	return lastProduct.id + 1;
}

const controller = {
	cargaProducto: (req, res) => {
		Categories
			.findAll()
			.then(categories => {
				Brands
					.findAll()
					.then(brands => {
						Colors
							.findAll()
							.then(colors => {
								return res.render('carga', {categories, brands, colors});
							})
							.catch(error => res.send(error));	
					})
					.catch(error => res.send(error));			
		})
			.catch(error => res.send(error));
	},
	detalle: (req, res) => {
		Products
			.findByPk(req.params.id,{
				include: ['brand', 'category','colors']
			})
			.then (product => res.render('detalle', {product}))
			.catch(error => res.send(error));
	},
	listado: (req, res) => {
		Products
			.findAll({
				include: ['brand', 'category','colors']
			})
			.then (products => res.render('lista-productos', {products}))
			.catch(error => res.send(error));
	},
	guardar: (req, res, next) => {
		Products
			.create(req.body)
			.then (product => {
				product.addColors(req.body.color);
				res.redirect('/')
			})
			.catch(error => res.send(error));	
	},
	editar: (req, res) => {
		let producto = getProductos().find( prod => prod.id == req.params.id );
		res.render('editar-producto', {producto, toThousand});
	},
	editarCambios: (req, res) => {	
		let producto = getProductos().find( prod => prod.id == req.params.id );
		producto.imagen = req.file ? req.file.filename : producto.imagen;
		producto.nombre = req.body.nombre;
		producto.descripcion =  req.body.descripcion;
		producto.precio =  req.body.precio;
		producto.categoria =  req.body.categoria;
		producto.color =  req.body.color;
	
		let todos = getProductos();
		let pos = todos.findIndex(prod => prod.id == producto.id)
		todos[pos] = producto;
		saveProductos(todos);
		
		return res.redirect('/products', {toThousand})

	}, 
	borrar: (req, res) => {
		Products
			.findByPk(req.params.id, {
				include: ['colors']
			})
			.then (product => {
				product.removeColors(product.colors);
				product.destroy();
				return res.redirect('/');
		})
			.catch(error => res.send(error));
	}
};

module.exports = controller;