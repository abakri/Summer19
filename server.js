const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// get env vars
require("dotenv").config();

// api imports
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const scripts = require("./routes/api/scripts");
const python = require("./routes/api/python");
const jDoodle= require ("./routes/api/jDoodle");

// init express
const app = express();

// passport config
require("./config/passport")(passport);

// init db
const db = process.env.MONGO_URI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => "MongoDB Connected...")
  .catch(err => console.log(err));

// middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

// API endpoints
app.use("/api/users", users);
app.use("/auth", auth);
app.use("/api/scripts", scripts);
app.use("/api/python", python);
app.use("/api/jDoodle", jDoodle);

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
