const fs = require('fs');
const path = require('path');

const getProductos =  () => {
	const url = path.join(__dirname, `/../db/dbProductos.json`);
	return JSON.parse(fs.readFileSync(url, {encoding: 'utf-8'}));
}

const controller = {
	root: (req, res) => {
		const productos = getProductos();
		res.render('index', {productos});
	},
	
};

module.exports = controller
