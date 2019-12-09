const fs = require('fs');
const path = require('path');

// ************ Function to Read an HTML File ************
function readHTML (fileName) {
	let filePath = path.join(__dirname, `/../views/${fileName}.html`);
	let htmlFile = fs.readFileSync(filePath, 'utf-8');
	return htmlFile;
}

const controller = {
	root: (req, res) => {
		let html = readHTML('index');
		res.send(html);
	},
	registro: (req, res) => {
		let html = readHTML('registro');
		res.send(html);
	},
	cargaProducto: (req, res) => {
		let html = readHTML('carga');
		res.send(html);
	},
	detalle: (req, res) => {
		let html = readHTML('detalle');
		res.send(html);
	},
};

module.exports = controller
