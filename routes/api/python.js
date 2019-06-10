// let {PythonShell} = require('python-shell');
const express = require("express");
const router = express.Router();
var request = require('request');

const Script = require("../../models/Script");
const { requireAuthentication } = require("../../config/auth");

router.get("/", requireAuthentication, (req, res) => {
    Script.find({ language: "python", userId: req.user._id }).then(scripts =>
        res.json(scripts))
});


module.exports = router;
