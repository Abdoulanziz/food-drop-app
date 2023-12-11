const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please, enter your full name"],
    },
    emailPrimary: {
      type: String,
      required: [true, "Please, enter your primary email"],
      unique: true,
      match: /^\S+@\S+\.\S+$/
    },
    emailSecondary: {
      type: String,
      required: [false, "Please, enter your secondary email"],
      match: /^\S+@\S+\.\S+$/
    },
    password: {
      type: String,
      required: [true, "Please, enter your password"],
      minlength: 8
    },
    phone01: {
      type: String,
      required: [false, "Please, enter your phone number1"],
    },
    phone02: {
      type: String,
      required: [false, "Please, enter your phone number2"],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
