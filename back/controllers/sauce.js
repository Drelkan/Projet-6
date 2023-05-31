const Sauce = require("../models/sauce");
const fs = require("fs");

//Création d'une sauce
exports.createSauce = (req, res, next) => {
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

//Récupération de toutes les sauces existantes dans la base de données
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => res.status(400).json({ error: error }));
};

//Récupération d'une sauce à partir de son Id
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => res.status(400).json({ error: error }));
};

//Modification d'une sauce existante à condition que l'utilisateur authentifié corresponde a l'utilisateur ayant créé la sauce
exports.modifySauce = (req, res, next) => {
  const sauceBody = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.findOne({ _id: req.params.id})
    .then((sauce) => {
      if (sauce.userId !== req.auth.userId) {
        res.status(401).json({ message: "Suppression non autorisée" });
      } else {
        Sauce.updateOne(
          { _id: req.params.id                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                },
          { ...sauceBody, _id: req.params.id}
        )
          .then(() => {
            res.status(200).json({ message: "Sauce modifiée avec succès" });
          })
          .catch((error) => res.status(400).json({ error: error }));
      }
    })
    .catch((error) => res.status(400).json({ error: error }));
};

//Suppression d'une sauce à condition que l'utilisateur authentifié corresponde à l'utilisateur ayant créé la sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId !== req.auth.userId) {
        res.status(401).json({ message: "Suppression non autorisée" });
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

//Fonction utilisée pour gérer les likes et dislikes d'une sauce
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
        .then(() => res.status(200).json({ message: "Mise à jour des likes" }))
        .catch((error) => res.status(400).json({ error: error }));
    })
    .catch((error) => res.status(400).json({ error: error }));
};
