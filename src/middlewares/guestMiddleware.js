function guestMiddleware (req,res,next) {
    if(req.session.user != undefined){
        return res.redirect('/user/profile');
    }
    next();
}

module.exports = guestMiddleware;