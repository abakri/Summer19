const express = require("express");
const router = express.Router();

const Script = require("../../models/Script");

// @route POST api/scripts/submit
// @desc submit a script
// @access only for users (later)
router.post("/submit", (req, res) => {
  const { userId, script, language } = req.body;
  if (!userId || !script || !language) {
    res.status(400).json({ msg: "Missing field" });
  }

  const newScript = new Script({
    userId: userId,
    script: script,
    language: language
  });

  newScript.save().then(script => {
    res.json(script);
  });
});

module.exports = router;
