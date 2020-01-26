function authMiddleware(req, res, next) {
    if (req.session.userId == undefined){
        return res.redirect('/');
    }
    next();
}

module.exports = authMiddleware;