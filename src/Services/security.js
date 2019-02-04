let jwt = require('jsonwebtoken')
module.exports = {
    ensuretoken: (req,res,next) => {
        const bearerHeader = req.headers["authorization"];
        if(bearerHeader !== undefined){
            const bearer = bearerHeader.split(" ");
            const bearertoken = bearer[1]
            req.token =bearertoken;
            jwt.verify(bearertoken,'my_secret_key',function(err,data){
                if(err){
                    res.sendStatus(403)
                }
                req.user = data,
                req.token = bearertoken
                next();
            })
            
        }else{
            res.sendStatus(403);
        }
    },
    getUserInfoWithToken: (response) => jwt.sign({user:response},"my_secret_key")
}


