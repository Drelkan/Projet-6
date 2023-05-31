const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Fonction pour l'inscription d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const newUser = new User({
        email: req.body.email,
        password: hash,
      });
      newUser
        .save()
        .then(() =>
          res
            .status(200)
            .json({ message: "La création de l'utilisateur c'est bien passer" })
        )
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

//Fonction utilisée pour gérer la connexion d'un utilisateur
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res
          .status(401)
          .json({ message: "L'email ou le mot de passe ne sont pas corrects" });
        return;
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((validation) => {
          if (!validation) {
            res.status(401).json({
              message: "L'email ou le mot de passe ne sont pas corrects",
            });
            return;
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.DATABASE_NAME, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
