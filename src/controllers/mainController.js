const fs = require('fs');
const path = require('path');

const toThousand = function (n) {
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const getProductos =  () => {
	const url = path.join(__dirname, `/../db/dbProductos.json`);
	return JSON.parse(fs.readFileSync(url, {encoding: 'utf-8'}));
}

const controller = {
	root: (req, res) => {
		const productos = getProductos();
		
		res.render('index', {productos, toThousand});
	},
	
};

module.exports = controller
