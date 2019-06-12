const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { requireAuthentication, requireAdmin } = require("../../config/auth");
// import models

const Post = require("../../models/Post");

// @route GET api/posts/
// @desc get all posts in most recent order
// @access public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts));
});

// @route GET api/posts/user
// @desc get all posts in most recent order
// @access public
router.get("/user", (req, res) => {
  userId = req.user._id;
  Post.find({ userId }).then(posts => {
    return res.json(posts);
  });
});

// @route GET api/posts/:id
// @desc get single post
// @access public
router.get("/:id", (req, res) => {
  const postId = req.params.id;

  Post.findById(postId).then(post => {
    if (!post) return res.status(400).json({ msg: "Post doesn't exist" });
    res.json(post);
  });
});

// @route POST api/posts/submit
// @desc submit a post
// @access admin
router.post("/submit", requireAuthentication, requireAdmin, (req, res) => {
  userId = req.user._id;
  const { body, title } = req.body;
  if (!userId || !body || !title) {
    return res.status(400).json({ msg: "Missing field" });
  }

  const newPost = new Post({
    userId: userId,
    title: title,
    body: body,
    author: `${req.user.first} ${req.user.last}`
  });

  newPost.save().then(post => {
    res.json(post);
  });
});

// @route POST api/posts/update
// @desc update a post
// @access admin
router.post("/update/:id", requireAuthentication, requireAdmin, (req, res) => {
  userId = req.user._id;
  const { body, title } = req.body;
  if (!userId || !body || !title) {
    return res.status(400).json({ msg: "Missing field" });
  }

  Post.findById(req.params.id).then(post => {
    // make sure post exists / belongs to user (use 404 bc we don't want them to know post exists if it does)
    if (!post || userId.toString() !== post.userId)
      return res.status(404).json({ msg: "Unable to update resource" });

    post.title = title;
    post.body = body;
    post.save().then(post => {
      res.json({ msg: "Post successfully saved" });
    });
  });
});

module.exports = router;
