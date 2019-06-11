module.exports = {
  requireAuthentication: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ msg: "Authorization denied" });
  }
};

module.exports ={
  requireAdmin: (req, res, next) => {
    if (req.users.role == 'admin') {
      return next();
    }
    res.status(401).json({ msg: "Authorization denied" });
  }
};