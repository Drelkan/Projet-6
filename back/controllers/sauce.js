const Sauce = require("../models/sauce");
const fs = require("fs");

exports.createSauce = (req, res, next) => {
  console.log(req.body);
  const sauceBody = JSON.parse(req.body.sauce);
  delete sauceBody._id;

  const sauce = new Sauce({
    ...sauceBody,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Votre sauce est bien enregistrée" });
    })
    .catch((error) => res.status(400).json({ error: error }));
};

exports.getAllSauces = (req, res, next) => {
  console.log(req.body);
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => res.status(400).json({ error: error }));
};

exports.getOneSauce = (req, res, next) => {
  console.log(req.body);
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => res.status(400).json({ error: error }));
};

//test modifcation produit
exports.modifySauce = (req, res, next) => {
  const sauceBody = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Sauce.updateOne({ _id: req.params.id }, { ...sauceBody, _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "Sauce modifiée avec succès" });
    })
    .catch((error) => res.status(400).json({ error: error }));
};
//

//Test Suppression produit
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId !== req.auth.userId) {
        res.status(401).json({ message: "Suppression non autoriser" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Sauce supprimée avec succès" });
            })
            .catch((error) => res.status(400).json({ error: error }));
        });
      }
    })
    .catch((error) => res.status(400).json({ error: error }));
};
//

exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (req.body.like === 1) {
        sauce.usersLiked.push(req.body.userId);
      } else if (req.body.like === -1) {
        sauce.usersDisliked.push(req.body.userId);
      } else if (req.body.like === 0) {
        if (sauce.usersLiked.includes(req.body.userId)) {
          const usersLikeIndex = sauce.usersLiked.indexOf(req.body.userId);
          sauce.usersLiked.splice(usersLikeIndex, 1);
        }
        if (sauce.usersDisliked.includes(req.body.userId)) {
          const usersDislikeIndex = sauce.usersDisliked.indexOf(
            req.body.userId
          );
          sauce.usersDisliked.splice(usersDislikeIndex, 1);
        }
      }
      sauce.likes = sauce.usersLiked.length;
      sauce.dislikes = sauce.usersDisliked.length;
      sauce
        .save()
        .then(() => res.status(200).json({ message: "mise à jour des likes" }))
        .catch((error) => res.status(400).json({ error: error }));
    })
    .catch((error) => res.status(400).json({ error: error }));
};
