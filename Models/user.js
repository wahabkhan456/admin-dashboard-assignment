const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  userId: {
    type: String,
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: Object,
  },
  userType: {
    type: String,
  },
  isAuthenticated: {
    type: Number,
    default: 1,
  },
});

const User = mongoose.model("User", user);

module.exports = User;
