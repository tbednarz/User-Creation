const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isAlpha(value)) {
        throw new Error("Only letters");
      }
    }
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password", "12345")) {
        throw new Error('Password cannon cotain "password" or "12345"');
      }
    }
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "cybershot");
  await user.save();
  return token;
};

userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
