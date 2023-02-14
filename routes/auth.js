const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const ActiveSession = require("../models/activeSessions.js");
const jwt = require("jsonwebtoken");
const crypt = require("bcryptjs");
require("dotenv").config();

router.post("/login", async (req, res) => {
  console.log("fost apelata");
  let query = await User.findOne(
    {
      email: req.body.email
    },
    "email password"
  ).catch((err) => {
    console.log(err);
    if (err) {
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  });
  if (!query) {
    return res.status(403).json({ msg: "Unouthorized" });
  } else {
    let response = await crypt
      .compare(req.body.password, query.password)
      .catch((err) => {
        return res.status(500).json({ msg: "Internal Server Error" });
      });
    if (response) {
      let token = jwt.sign(
        {
          user_id: query._id,
          time: Date()
        },
        process.env.JWT_SECRET_KEY
      );

      await ActiveSession.create({
        user: query._id,
        token: token
      }).catch((err) => {
        return res.status(500).json({ msg: "Internal Server Error" });
      });

      return res.status(201).json({ msg: "OK", Authorization: token });
    } else {
      return res.status(403).json({ msg: "Unauthorized" });
    }
  }
});

router.post("/register", async (req, res) => {
  let query = await User.findOne({
    email: req.body.email
  }).catch((err) => {
    return res.status(500).json({ msg: "Internal Server Error" });
  });
  if (query) {
    return res.status(403).json({
      msg: "Unauthorized" // works
    });
  } else {
    let hashPassword = crypt.hashSync(req.body.password, crypt.genSaltSync(11));
    let user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword
    }).catch((err) => {
      return res.status(500).json({ msg: "Internal Server Error" });
    });
    if (user) {
      return res.status(201).json({ msg: "OK" }); //works
    }
  }
});

module.exports = router;
