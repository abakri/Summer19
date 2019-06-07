const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const session = require("express-session");

// get env vars
require("dotenv").config();

// api imports
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

// init express
const app = express();

// passport config
require("./config/passport")(passport);

// middleware
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

// init db
const db = process.env.MONGO_URI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => "MongoDB Connected...")
  .catch(err => console.log(err));

// API endpoints
app.use("/api/users", users);
app.use("/auth", auth);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
