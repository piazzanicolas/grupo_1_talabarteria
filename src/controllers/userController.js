const fs = require('fs');
const path = require('path');

// ************ Function to Read an HTML File ************
// function readHTML (fileName) {
// 	let filePath = path.join(__dirname, `/../views/${fileName}.html`);
// 	let htmlFile = fs.readFileSync(filePath, 'utf-8');
// 	return htmlFile;
// }
const url = path.join(__dirname, `/../db/dbUsuarios.json`);

function readJSON () {
	let dataJSON = fs.readFileSync(url, 'utf-8');
	let arrayUsers;
	if (dataJSON == '') {
		arrayUsers = [];
	} else {
		arrayUsers = JSON.parse(dataJSON);
	}
	return arrayUsers;
}

function storeUser (dataFromUserToSave) {
	let allUsers = readJSON();
	allUsers.push(dataFromUserToSave);
	fs.writeFileSync(url, JSON.stringify(allUsers, null, ' '));
}

function generateUserId () {
	let allUsers = readJSON();
	return allUsers == '' ? 1 : allUsers.pop().usuario_id + 1;
}

const controller = {
	
	registroForm: (req, res) => {
		res.render('registro');
	},

	saveUser: (req,res,next) => {
		res.send('Usuario guardado');
		let dataFromUser = {
			usuario_id: generateUserId(),
			...req.body,
		};
		storeUser(dataFromUser);
		res.redirect('/');
	}
};

module.exports = controller