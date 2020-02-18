const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const db = require('../database/models/');
const Users = db.users;
const Countries = db.countries;


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
		Countries.findAll()
			.then(countries => {
				return res.render('registro', {
					countries
				}
				);
			})
			.catch(error => res.send(error));

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
<<<<<<< HEAD
			Countries.findAll()
			.then(countries => {
			return res.render('registro', {errors: errorsResult.array(), hasErrorGetMessage: hasErrorGetMessage, OldData: req.body, countries});
		})
=======
			Countries
				.findAll()
				.then(countries => {
					return res.render('registro', {errors: errorsResult.array(), hasErrorGetMessage: hasErrorGetMessage, OldData: req.body, countries});
				})
			
>>>>>>> c262ccced9aab6a9e1ca9087a33fa6d25307fc97
		} else {
			req.body.password = bcrypt.hashSync(req.body.password, 11);
			delete req.body.re_password;
			req.body.avatar = req.file.filename;
			req.body.isActive = 1;
			//let user = storeUser(req.body);
			
			req.session.user = req.body;
			res.locals.user = req.body;
			res.cookie('userCookie', req.body.id, { maxAge: 60000 * 60 });
			
			Users.create(req.body)
				.then(user => {
					return res.redirect('/user/profile');

				})
				.catch(error => res.send(error));

		
		}}
	,
	login: (req, res) => {
		return res.redirect('/');
	},
	processLogin: (req, res) => {
		Users.findOne({
			where: {
				email: req.body.email
			}
		})
		.then( (user) => {
		if (user != undefined) {
			if (bcrypt.compareSync(req.body.password, user.password)){
				
				req.session.user = user;
				res.locals.user = user;
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
	})
	.catch( error => res.send(error))
	}
	,
	profile: (req, res) => {
		//let userLogged = getUserById(req.session.user.id);
		res.locals.user = req.session.user;
		Users
			.findByPk(req.session.user.id, {
				include: ['country']
			})
			.then(user => {
				return res.render('profile', { userLogged: res.locals.user });
				
			})
			.catch(error => res.send(error));

	},
	logout: (req, res) => {
		req.session.destroy();
		res.locals.user = undefined;
		res.cookie('userCookie',null,{ maxAge: -1 });
		return res.redirect('/');
	}

};

module.exports = controller