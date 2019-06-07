module.exports = {
  requireAuthentication: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.json({ msg: "Log in to view this resource" });
  }
};
