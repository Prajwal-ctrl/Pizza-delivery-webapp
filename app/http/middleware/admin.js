function admin (req,res,next){
    if (req.Authenticated () && req.user.role == 'admin'){
        return next ()
    }

    return res.redirect ('/')
}



module.exports = admin 