const express = require("express");
const passport = require("passport");
const router = express.Router();

const { requireAuthentication } = require("../../config/auth");

// @route POST auth/login
// @desc login user
// @access public
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json(userResponseData(req.user));
});

// @route POST auth/logout
// @desc logout user
// @access private
router.post("/logout", (req, res) => {
  req.logout();
  res.json({ msg: "Logout successful" });
});

// @route POST auth/user
// @desc check user is authenticated
// @access private
router.get("/user", requireAuthentication, (req, res) => {
  res.json(userResponseData(req.user));
});

// so we don't send the hashed password and other stuff with
// our responses
const userResponseData = userData => {
  return {
    id: userData.id,
    email: userData.email,
    first: userData.first,
    last: userData.last
  };
};

module.exports = router;
