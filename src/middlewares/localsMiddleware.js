function localsMiddleware (req, res, next) {

    // res.locals.mensajes = req.flash();
    res.locals.user = req.session.user || null;
    next();
}

module.exports = localsMiddleware;