const jwt = require('jsonwebtoken')

module.exports = function(req,res,next) {
    try {
        console.log("data",req)
        let token = req.headers['authorization']
        console.log("data",token)
       let t
        if(!token){
            return res.status(400).json({error:'token not found'})
        }else{
            t = token.split(' ')[1]
        }
        let decode = jwt.verify(t,'jwtSecret')
        req.user = decode.user
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:'Invalid token'})
    }
}