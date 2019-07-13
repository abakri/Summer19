const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { requireAuthentication, requireAdmin } = require("../../config/auth");

// User Model
const User = require("../../models/User");

// @route GET api/users
// @desc Get all users
// @access requires login
router.get("/", requireAuthentication, (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then(users => res.json(users));
});

// @route POST api/users
// @desc register user
// @access public
router.post("/", (req, res) => {
  const { first, last, email, password } = req.body;
  if (!(first && last && email && password))
    res.status(400).json({ msg: "Missing field" });

  User.findOne({ email }).then(user => {
    if (user) return res.status(404).json({ msg: "User already exists" });

    const newUser = new User({
      first,
      last,
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          res.json(user.responseData());
        });
      });
    });
  });
});

module.exports = router;
