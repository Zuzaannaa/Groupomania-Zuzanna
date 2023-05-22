const { User } = require("../models/index.js");
const { Post } = require("../models/index.js");
const { Like } = require("../models/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 8)
    .then((hash) => {
      const user = new User({
        ...req.body,
        password: hash,
      });
      let { firstname, lastname, email, password } = user;
      User.create({ firstname, lastname, email, password })
        .then((newUser) => {
          console.log(
            "new user signup",
            newUser.firstname,
            newUser.lastname,
            "userId:",
            newUser.id
          );
          res.status(201).json();
        })
        .catch((error) => res.status(400).json(error));
    })
    .catch((error) => res.status(500).json(error));
};

exports.login = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not found!" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Incorrect password!" });
          }
          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            token: jwt.sign(
              { userId: user.id, isAdmin: user.isAdmin },
              "token_dev",
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(400).json(error));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.editUser = (req, res) => {
  req.file
    ? (req.body.profile = req.file.filename)
    : console.log("same photo was saved");
  if (req.file) {
    User.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (user.profile !== "defaultUserProfile.png") {
          fs.unlink(`images/${user.profile}`, (error) => {
            if (error) throw err;
          });
        } else {
          console.log("Error");
        }
      })
      .catch((error) => res.status(400).json(error));
  }
  if (req.body.password) {
    bcrypt
      .hash(req.body.password, 8)
      .then((hash) => {
        req.body.password = hash;
        User.update(req.body, { where: { id: req.params.id } })
          .then((user) => {
            res.status(201).json({ message: "Profile updated" });
          })
          .catch((error) => res.status(400).json(error));
      })
      .catch((error) => res.status(500).json(error));
  } else {
    User.update(req.body, { where: { id: req.params.id } })
      .then(() => res.status(201).json({ message: "Profile updated" }))
      .catch((error) => res.status(400).json(error));
  }
};
exports.getAllUsers = (req, res) => {
  try {
    User.findAll({ include: { model: Post, include: { model: Like } } })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => res.status(400).json(error));
  } catch {
    (error) => res.status(500).json(error);
  }
};

exports.getOneUser = (req, res) => {
  try {
    User.findOne({ where: { id: req.params.id } })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => res.status(400).json(error));
  } catch {
    (error) => res.status(500).json(error);
  }
};

exports.deleteUser = (req, res) => {
  req.params.id;
  try {
    User.destroy({ where: { id: req.params.id } })
      .then(() => {
        res.status(200);
      })
      .catch((error) => res.status(400).json(error));
  } catch {
    (error) => res.status(500).json(error);
  }
};
