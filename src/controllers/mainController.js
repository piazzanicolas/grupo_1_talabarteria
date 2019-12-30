const fs = require('fs');
const path = require('path');

// ************ Function to Read an HTML File ************
// function readHTML (fileName) {
// 	let filePath = path.join(__dirname, `/../views/${fileName}.html`);
// 	let htmlFile = fs.readFileSync(filePath, 'utf-8');
// 	return htmlFile;
// }

const getProductos =  () => {
	const url = path.join(__dirname, `/../db/dbProductos.json`);
	return JSON.parse(fs.readFileSync(url, {encoding: 'utf-8'}));
}

const controller = {
	root: (req, res) => {
		const productos = getProductos();
		res.render('index', {productos});
	},
	registro: (req, res) => {
		res.render('registro');
	},
	cargaProducto: (req, res) => {
		res.render('carga');
	},
	detalle: (req, res) => {
		let id = req.params.id;
		producto = getProductos().filter(prod => prod.id == id)[0];
		res.render('detalle', {producto});
	},
};

module.exports = controller
