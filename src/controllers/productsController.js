const fs = require('fs');
const path = require('path');

const getProductos =  () => {
	const url = path.join(__dirname, `/../db/dbProductos.json`);
	return JSON.parse(fs.readFileSync(url, {encoding: 'utf-8'}));
}

const saveProductos = (productos) => {
	const url = path.join(__dirname, `/../db/dbProductos.json`);
	fs.writeFileSync(url, JSON.stringify(productos, null, ' '));
}

const controller = {
	cargaProducto: (req, res) => {
		res.render('carga');
	},
	detalle: (req, res) => {
		let id = req.params.id;
		producto = getProductos().filter(prod => prod.id == id)[0];
		res.render('detalle', {producto});
	},
	listado: (req, res) => {

	},
	guardar: (req, res) => {
		let productos = getProductos();

		let producto = {
			id: productos.length + 1,
			nombre: req.body.nombre,
			descripcion: req.body.descripcion,
			precio: req.body.precio,
			imagen: null,
			categoria: req.body.categoria,
			color: req.body.color,
		}

		productos = [
			...productos,
			producto,
		];
		saveProductos(productos);
		res.status(200).redirect('/products/carga');
	},
	editar: (req, res) => {

	},
	guardarCambios: (req, res) => {

	},
	borrar: (req, res) => {

	}
};

module.exports = controller