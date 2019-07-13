const express = require("express");
const passport = require("passport");
const router = express.Router();

const { requireAuthentication } = require("../../config/auth");
// @route POST auth/login
// @desc login user
// @access public
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user.responseData());
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
  res.json(req.user.responseData());
});

module.exports = router;
