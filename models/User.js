const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first: {
    type: String,
    required: true
  },
  last: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  roles:{
    type:String,
    default:'user',
    required: true
  }
});

module.exports = User = mongoose.model("user", UserSchema);
