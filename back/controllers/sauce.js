const Sauce = require("../models/sauce")

exports.createSauce = (req, res, next) => {
    console.log(req.body)
    const sauceBody = JSON.parse(req.body.sauce)
    delete sauceBody._id
    
    const sauce = new Sauce({
        ...sauceBody,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    })
    sauce.save()
    .then(() => {
        res.status(201).json({message:"Votre sauce est bien enregistrée"})
    })
    .catch((error) => res.status(400).json({error:error}))
}

exports.getAllSauces = (req, res, next) => {
    console.log(req.body)
    Sauce.find()
    .then((sauces) => {
        res.status(200).json(sauces)
    })
    .catch((error) => res.status(400).json({error:error}))
}

exports.getOneSauce = (req, res, next) => {
    console.log(req.body)
    Sauce.findOne({_id:req.params.id})
    .then((sauce) => {
        res.status(200).json(sauce)
    })
    .catch((error) => res.status(400).json({error:error}))
}