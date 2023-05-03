const passwordValidator = require("password-validator")
const schema = new passwordValidator()

schema
.is().min(8)
.is().max(100)
.has().uppercase(1)
.has().lowercase()
.has().digits(2)
.has().not().spaces() 
.is().not().oneOf(['Passw0rd', 'Password123'])

module.exports = (req, res, next) => {
    if(schema.validate(req.body.password)){
        next()
    }else{
        return res.status(400).json({
            message: "mots de pass trop faible:" + schema.validate("erreurs", {list: true})
        })
    }
}