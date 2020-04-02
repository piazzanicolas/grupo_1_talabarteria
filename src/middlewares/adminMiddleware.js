function adminMiddleware (req, res, next) {
	// Si existe algo en la prop user de session
	if(req.session.user.admin == 1) {
		return next();
	}
	return res.redirect('/');
}

module.exports = adminMiddleware;