const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScriptSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  script: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("script", ScriptSchema);
