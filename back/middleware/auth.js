const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1]
        const tokenDecoded = jwt.verify(token, "s545712f7-7811-4699-9445-f2f97654e153" )
        const userId = tokenDecoded.userId
        req.auth = {
            userId: userId
        }
        next()
    }catch(error){
        res.status(401).json({error})
    }
}