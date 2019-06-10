const express = require("express");
const router = express.Router();
const Script = require("../../models/Script");
const { requireAuthentication } = require("../../config/auth");
const fetch = require("node-fetch");

//run compiler
router.get("/run", requireAuthentication, (req, res) => {
    Script.findOne({userId: req.user._id }).then(script => {
        console.log(script.script)
        fetch("https://api.jdoodle.com/execute", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                script : script.script,
                language : "python3",
                versionIndex :"0",
                clientId : "5b548d6ccbc8c1f507885e12480d0919",
                clientSecret : "7b52797110c9d5a48750a82e40d789b2f08fa83ce423748400f1f08e3b45d19a"
            })
        }).then (data => data.json().then(output => res.json({result:output.output})))

    })
})

//read python script
router.get("/python", requireAuthentication, (req, res) => {
    Script.find({ language: "python", userId: req.user._id }).then(scripts =>
        res.json(scripts))
});

module.exports = router;