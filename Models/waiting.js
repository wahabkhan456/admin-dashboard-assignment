const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const waiting = new Schema({
  fullName: {
    type: String,
  },
  companyName: {
    type: String,
  },
  userId: {
    type: String,
  },
});

const Waiting = mongoose.model("Waiting", waiting);

module.exports = Waiting;
