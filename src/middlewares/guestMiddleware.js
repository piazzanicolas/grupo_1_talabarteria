function guestMiddleware (req,res,next) {
    if(req.session.userId != undefined){
        return res.redirect('/user/profile');
    }
    next();
}

module.exports = guestMiddleware;