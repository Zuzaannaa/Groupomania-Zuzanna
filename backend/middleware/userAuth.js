const jwt = require("jsonwebtoken");
const { User } = require("../models/index.js");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "token_dev");
    User.findOne({ where: { id: req.params.id } }).then((user) => {
      if (decodedToken.userId == user.id) {
      } else {
        return res.status(403).json({ error });
      }
      next();
    });
  } catch {
    res.status(401).json({ error: "access refused" });
  }
};
