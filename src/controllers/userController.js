const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

const usersPath = path.join(__dirname, `/../db/dbUsuarios.json`);


// Helper Functions
function getUsuarios () {
	let usersDataFile = fs.readFileSync(usersPath, 'utf-8');
	let arrayUsers = usersDataFile == '' ? [] : JSON.parse(usersDataFile);
	return arrayUsers;
}

function storeUser (dataFromUserToSave) {
	let allUsers = getUsuarios();
	dataFromUserToSave = {
		id: generateUserId(),
		...dataFromUserToSave
	};
	allUsers.push(dataFromUserToSave);
	fs.writeFileSync(usersPath, JSON.stringify(allUsers, null, ' '));
	return dataFromUserToSave;
}

function generateUserId () {
	let allUsers = getUsuarios();
	return allUsers == '' ? 1 : allUsers.pop().id + 1;
}

function getUserByEmail(email){
	let users = getUsuarios();
	let userByEmail = users.find( user => user.email == email );
	return userByEmail;
}

function getUserById(id){
	let users = getUsuarios();
	let userById = users.find( user => user.id == id);
	return userById;
}

// Controller Methods
const controller = {
	registroForm: (req, res) => {
		res.render('registro');
	},

	saveUser: (req,res) => {

		const hasErrorGetMessage = (field, errorsView) => {
			for (const oneError of errorsView) {
				if (oneError.param == field) {
					return oneError.msg;
				}
			}
			return false;
		}

		let errorsResult = validationResult(req);
		if (!errorsResult.isEmpty()){
			return res.render('registro', {errors: errorsResult.array(), hasErrorGetMessage: hasErrorGetMessage, OldData: req.body});
		} else {
			req.body.password = bcrypt.hashSync(req.body.password, 11);
			delete req.body.password;
			delete req.body.re_password;
			req.body.avatar = req.file.filename;
			let user = storeUser(req.body);
			req.session.userId = user.id;
			res.cookie('userCookie', user.id, { maxAge: 60000 * 60 });
			return res.redirect('/user/profile');
		}
	},
	login: (req, res) => {
		return res.redirect('/');
	},
	processLogin: (req, res) => {
		let user = getUserByEmail(req.body.email);
		if (user != undefined) {
			if (bcrypt.compareSync(req.body.password, user.password)){
				delete user.password;
				req.session.userId = user.id;
				if (req.body.remember_user){
					res.cookie('userCookie', user.id, { maxAge: 60000 * 60 });
				}
				return res.redirect('/user/profile');
			} else {
				res.send('Alguno de los datos es incorrecto.');
			}

		} else {
			res.send('Alguno de los datos es incorrecto.')
		}
	},
	profile: (req, res) => {
		let userLogged = getUserById(req.session.userId);
		res.render('profile', { userLogged });
	},
	logout: (req, res) => {
		req.session.destroy();
		res.cookie('userCookie',null,{ maxAge: -1 });
		return res.redirect('/');
	}

};

module.exports = controller