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
    default: { user: true, admin: false }
  }
});

UserSchema.methods.addRole = function(role) {
  this.roles.set(role, true);
};

// so we don't send the hashed password and other stuff with
// our responses
UserSchema.methods.responseData = function() {
  return {
    id: this.id,
    email: this.email,
    first: this.first,
    last: this.last,
    roles: this.roles
  };
};

module.exports = User = mongoose.model("user", UserSchema);
