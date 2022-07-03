module.exports.flashMessage=function(req,res,next){
    res.locals.flash={
        "message":req.flash("message"),
        "error":req.flash("error")
    }
    next();
}