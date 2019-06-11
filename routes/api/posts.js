const express = require("express");
const router = express.Router();
const { requireAuthentication, requireAdmin } = require("../../config/auth");
// import models

const Post = require("../../models/Post");

// @route POST api/posts/submit
// @desc submit a post
// @access only for admin
router.post("/submit", requireAuthentication, requireAdmin, (req, res) => {
    userId = req.user._id
    const { content, language } = req.body;
    if (!userId || !content || !language) {
      res.status(400).json({ msg: "Missing field" });
    }
  
    const newPost = new Post({
      userId: userId,
      content: content,
      language: language  
    });
  
    newPost.save().then(post => {
      res.json(post);
    });
  });
  
  
  module.exports = router;