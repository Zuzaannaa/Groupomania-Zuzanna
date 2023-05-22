const jwt = require("jsonwebtoken");
const { Post } = require("../models/index.js");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "token_dev");
    Post.findOne({ where: { id: req.params.id } }).then((post) => {
      if (decodedToken.isAdmin) {
      } else if (decodedToken.userId == post.userId) {
      } else {
        return res.status(403);
      }
      next();
    });
  } catch {
    res.status(401).json({ error: "access refused" });
  }
};
