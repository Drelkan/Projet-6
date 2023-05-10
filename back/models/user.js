const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//Schéma qui definit les règles de validation
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("user", userSchema);
