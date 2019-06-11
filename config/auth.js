module.exports = {
  requireAuthentication: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ msg: "Authorization denied" });
  },

  requireAdmin: (req, res, next) => {
    if (req.user.roles.get("admin")) {
      return next();
    }
    res.status(401).json({ msg: "Authorization denied" });
  }
};
