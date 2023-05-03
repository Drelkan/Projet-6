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