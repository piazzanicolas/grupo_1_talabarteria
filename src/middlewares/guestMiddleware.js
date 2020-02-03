function guestMiddleware (req, res, next) {
	// Si no existe nada en la prop user de session
	if(req.session.user == undefined) {
		return next();
	}
	return res.redirect('/user/profile');
}

module.exports = guestMiddleware;