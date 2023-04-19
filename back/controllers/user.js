const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  console.log(req.body);
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

exports.login = (req, res, next) => {
  console.log(req.body);
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res
          .status(401)
          .json({ message: "L'email ou le mot de pass ne sont pas correct" });
      }
      console.log(user);
      bcrypt
        .compare(req.body.password, user.password)
        .then((validation) => {
          if (!validation) {
            res
              .status(401)
              .json({
                message: "L'email ou le mot de pass ne sont pas correct",
              });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              "s545712f7-7811-4699-9445-f2f97654e153",
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
