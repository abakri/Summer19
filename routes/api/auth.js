const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ msg: info.msg });
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json({ msg: "Login successful" });
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout();
  res.json({ msg: "Logout successful" });
});

module.exports = router;
