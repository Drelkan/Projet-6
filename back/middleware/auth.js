const jwt = require("jsonwebtoken");

//Vérification de la validité du token d'authentification
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const tokenDecoded = jwt.verify(token, process.env.DATABASE_NAME);
    const userId = tokenDecoded.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
