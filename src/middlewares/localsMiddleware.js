function localsMiddleware (req, res, next) {

    // res.locals.mensajes = req.flash();
    res.locals.user = req.session.user ? req.session.user : undefined;
    next();
}

module.exports = localsMiddleware;