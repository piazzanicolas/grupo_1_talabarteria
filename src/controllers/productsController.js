const fs = require('fs');
const path = require('path');

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
		res.render('carga');
	},
	detalle: (req, res) => {
		let id = req.params.id;
		producto = getProductos().filter(prod => prod.id == id)[0];
		res.render('detalle', {producto, toThousand});
	},
	listado: (req, res) => {
		let productos = getProductos();
		res.render('lista-productos', {productos, toThousand});
	},
	guardar: (req, res, next) => {
		let productos = getProductos();
		if (productos == '' ){
			productos = []
		}

		let producto = {
			id: generateId(),
			nombre: req.body.nombre,
			descripcion: req.body.descripcion,
			precio: req.body.precio,
			imagen: req.file.filename,
			categoria: req.body.categoria,
			color: req.body.color,
		}

		productos = [
			...productos,
			producto,
		];
		saveProductos(productos);
		return res.status(201).redirect('/', {toThousand});
		
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
		let todos = getProductos()
		let producto = getProductos().find( prod => prod.id == req.params.id );
		let pos = todos.findIndex(prod => prod.id == producto.id);
		todos.splice(pos,1);
		saveProductos(todos);
		return res.redirect('/products', {toThousand});
	}
};

module.exports = controller;