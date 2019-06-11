const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("post", PostSchema);