const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      (email, password, done) => {
        if (!email || !password)
          return done(null, false, { msg: "Missing fields" });
        User.findOne({ email }, (err, user) => {
          if (err) return done(err);
          if (!user) return done(null, false, { msg: "User doesn't exist" });

          bcrypt.compare(password, user.password, (err, success) => {
            if (err) throw err;
            if (!success)
              return done(null, false, { msg: "Incorrect password" });
            return done(null, user);
          });
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
