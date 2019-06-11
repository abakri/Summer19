const express = require("express");
const router = express.Router();
const { requireAuthentication, requireAdmin } = require("../../config/auth");

// models
const User = require("../../models/User");

router.post("/makeadmin", requireAuthentication, requireAdmin, (req, res) => {
  const { id } = req.body;
  User.findById(id).then(user => {
    if (!user) return res.status(404).json({ msg: "User doesn't exist" });
    user.addRole(User.userRoles.ADMIN);
    user.save().then(user => res.json({ msg: "User successfully made admin" }));
  });
});

module.exports = router;
