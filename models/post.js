const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: "Untitled"
  },
  author: {
    type: String
  },
  body: {
    type: String,
    default: ""
  },
  published: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("post", PostSchema);
