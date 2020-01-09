const fs = require('fs');
const path = require('path');

// ************ Function to Read an HTML File ************
// function readHTML (fileName) {
// 	let filePath = path.join(__dirname, `/../views/${fileName}.html`);
// 	let htmlFile = fs.readFileSync(filePath, 'utf-8');
// 	return htmlFile;
// }

const getUsuarios =  () => {
	const url = path.join(__dirname, `/../db/dbUsuarios.json`);
	return JSON.parse(fs.readFileSync(url, {encoding: 'utf-8'}));
}

const controller = {
	
	registro: (req, res) => {
		res.render('registro');
	},
	
};

module.exports = controller
