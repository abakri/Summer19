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
  roles: {
    type: Map,
    of: Boolean,
    default: { user: true }
  }
});

UserSchema.methods.addRole = function(role) {
  this.roles.set(role, true);
};

UserSchema.statics.userRoles = {
  USER: "user",
  ADMIN: "admin"
};

module.exports = User = mongoose.model("user", UserSchema);
