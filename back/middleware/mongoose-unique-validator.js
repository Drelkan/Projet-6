const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-valisator");

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, index: true, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);
