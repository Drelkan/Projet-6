const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true }, // heat : Number — nombre entre 1 et 10 décrivant la sauce
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: [String] }, // [ "String <userId>" ]
  usersDisliked: { type: [String] }, // [ "String <userId>" ]
  userId: { type: String, required: true },
});

module.exports = mongoose.model("sauce", sauceSchema);